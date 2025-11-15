import os
from flask import Flask, request, jsonify
from pymongo import MongoClient
from openai import OpenAI
import ollama
from dotenv import load_dotenv
import json
from datetime import datetime
from math import sqrt

# Load environment variables from .env file
load_dotenv()

# Initialize Flask App
app = Flask(__name__)

# Initialize OpenAI Client
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Initialize Ollama Client with a custom base URL
ollama_client = ollama.Client(host=os.getenv("OLLAMA_API_URL")) # Replace with your custom Ollama URL if needed

# Initialize MongoDB Client
mongo_client = MongoClient(os.getenv("MONGODB_URI"))
db = mongo_client.mental_wellness_db
chat_history_collection = db.chat_history
ltm_collection = db.long_term_memories
stm_collection = db.short_term_memories

# --- Helper Functions ---

def get_embedding(text, model="text-embedding-ada-002"):
    """Generates an embedding for the given text using OpenAI."""
    text = text.replace("\n", " ")
    return openai_client.embeddings.create(input=[text], model=model).data[0].embedding

def extract_memories(user_message):
    """
    Uses the master agent to extract long-term and short-term memories
    from a user's message. This acts as a "tool-call".
    """
    try:
        # NOTE: Replace 'gpt-4' with 'gpt-5-mini' when it becomes available.
        response = openai_client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are MemoryExtractor, a precision tool-call whose only job is to read the supplied user "
                        "message and emit structured memories for downstream agents. "
                        "TASK: Analyse the message, break it into distinct facts, and label each fact as either a long-term memory (LTM) "
                        "or a short-term memory (STM). "
                        "LTM = enduring traits, identities, relationships, pivotal events, or beliefs that may matter weeks or months later. "
                        "STM = time-bound actions, feelings, or intentions that help for only the next few interactions. "
                        "RULES: Keep each memory concise and in the user's voice, avoid duplicates, skip pleasantries, "
                        "and emit [] for both arrays when nothing qualifies. "
                        "Always respond via the save_memories function call with two arrays: `ltm` and `stm`."
                    )
                },
                {
                    "role": "user",
                    "content": f"Extract LTM and STM from the following message: '{user_message}'"
                }
            ],
            functions=[
                {
                    "name": "save_memories",
                    "description": "Saves the extracted long-term and short-term memories.",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "ltm": {
                                "type": "array",
                                "items": {
                                    "type": "string"
                                },
                                "description": "A list of long-term memories."
                            },
                            "stm": {
                                "type": "array",
                                "items": {
                                    "type": "string"
                                },
                                "description": "A list of short-term memories."
                            }
                        },
                        "required": ["ltm", "stm"]
                    }
                }
            ],
            function_call={"name": "save_memories"}
        )

        message = response.choices[0].message
        if message.function_call:
            arguments = json.loads(message.function_call.arguments)
            ltm = arguments.get("ltm", [])
            stm = arguments.get("stm", [])
            return ltm, stm
    except Exception as e:
        print(f"Error in memory extraction: {e}")
    return [], []

def cosine_similarity(vec_a, vec_b):
    """Compute cosine similarity without relying on database vector indexes."""
    if not vec_a or not vec_b:
        return 0.0
    dot = sum(a * b for a, b in zip(vec_a, vec_b))
    norm_a = sqrt(sum(a * a for a in vec_a))
    norm_b = sqrt(sum(b * b for b in vec_b))
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return dot / (norm_a * norm_b)


def manual_vector_search(collection, user_embedding, top_k):
    """Fetch memories and rank by cosine similarity entirely in Python."""
    scored_docs = []
    for doc in collection.find({}, {"memory": 1, "embedding": 1}):
        doc_embedding = doc.get("embedding")
        if not doc_embedding:
            continue
        score = cosine_similarity(user_embedding, doc_embedding)
        scored_docs.append((score, doc))
    scored_docs.sort(key=lambda item: item[0], reverse=True)
    return [doc for _, doc in scored_docs[:top_k]]


def manual_text_search(collection, query_text, top_k):
    """Very small BM25-style scoring that scans documents instead of using text indexes."""
    tokens = [token for token in query_text.lower().split() if token]
    if not tokens:
        return []
    scored_docs = []
    for doc in collection.find({}, {"memory": 1}):
        memory_text = doc.get("memory", "").lower()
        score = sum(memory_text.count(token) for token in tokens)
        if score > 0:
            scored_docs.append((score, doc))
    scored_docs.sort(key=lambda item: item[0], reverse=True)
    return [doc for _, doc in scored_docs[:top_k]]


def hybrid_search(user_message_embedding, query_text, top_k=3):
    """
    Performs a hybrid search by combining vector search (cosine similarity)
    and text search (simulating BM25) to retrieve relevant memories.
    """
    # Vector Search for LTM and STM (manual to avoid index requirements)
    ltm_vector_results = manual_vector_search(ltm_collection, user_message_embedding, top_k)
    stm_vector_results = manual_vector_search(stm_collection, user_message_embedding, top_k)

    # Text Search (manual scan + scoring to avoid relying on MongoDB text indexes)
    ltm_text_results = manual_text_search(ltm_collection, query_text, top_k)
    stm_text_results = manual_text_search(stm_collection, query_text, top_k)

    # Combine and re-rank results (a simple approach)
    combined_ltm = {str(doc['_id']): doc for doc in ltm_vector_results}
    for doc in ltm_text_results:
        combined_ltm[str(doc['_id'])] = doc

    combined_stm = {str(doc['_id']): doc for doc in stm_vector_results}
    for doc in stm_text_results:
        combined_stm[str(doc['_id'])] = doc

    relevant_ltm = [doc['memory'] for doc in combined_ltm.values()]
    relevant_stm = [doc['memory'] for doc in combined_stm.values()]

    return relevant_ltm, relevant_stm


# --- Flask API Endpoint ---

@app.route('/chat', methods=['POST'])
def chat():
    """
    The main endpoint for the chatbot orchestrator.
    """
    data = request.json
    user_message = data.get("message")

    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    # 1. Save user message to chat history and generate embedding
    user_message_embedding = get_embedding(user_message)
    chat_history_collection.insert_one({
        "role": "user",
        "content": user_message,
        "embedding": user_message_embedding,
        "timestamp": datetime.utcnow()
    })

    # 2. Extract and save memories
    ltm_list, stm_list = extract_memories(user_message)
    if ltm_list:
        for memory in ltm_list:
            ltm_collection.insert_one({
                "memory": memory,
                "embedding": get_embedding(memory),
                "timestamp": datetime.utcnow()
            })
    if stm_list:
        for memory in stm_list:
            stm_collection.insert_one({
                "memory": memory,
                "embedding": get_embedding(memory),
                "timestamp": datetime.utcnow()
            })

    # 3. Fetch relevant memories using hybrid search
    relevant_ltm, relevant_stm = hybrid_search(user_message_embedding, user_message)

    # 4. Fetch the last 5 chat history turns for context
    recent_history = list(chat_history_collection.find().sort("timestamp", -1).limit(5))
    recent_history.reverse() # To have the oldest message first
    chat_context = [{"role": msg["role"], "content": msg["content"]} for msg in recent_history]


    # 5. Construct the system prompt for the main chat LLM
    system_prompt = (
       """
       You are a compassionate and grounded emotional support companion. Your role is to help people navigate emotionally challenging moments with warmth, clarity, and genuine care.

**Your Core Responsibilities:**

1. **Listen and Reflect**: Hear what the person is truly saying. Reflect their emotions back with warmth and validation—show that their feelings matter. Use phrases like "It sounds like..." or "What I'm hearing is..." to demonstrate genuine understanding.

2. **Create Safety**: Your presence should feel calm and steady. When someone shares vulnerability, respond with consistency and non-judgment. Never dismiss or minimize their experience.

3. **Encourage Self-Discovery**: Ask open-ended questions that help them explore their own thoughts and feelings (Socratic style). Instead of jumping to answers, help them uncover their own clarity. Examples:
   - "What do you think might be contributing to this feeling?"
   - "How have you handled similar situations before?"
   - "What would it mean if you allowed yourself to feel this?"

4. **Offer Gentle Challenge**: When their thinking seems distorted, self-critical, or potentially harmful, respond with compassion—not judgment. Frame it as curiosity: "I wonder if there's another way to look at this?" or "I notice you're being quite hard on yourself—is that helping?"

5. **Ground in Evidence-Based Practices**: Weave in gentle, practical strategies from CBT and DBT when appropriate:
   - Grounding exercises (5 senses technique)
   - Thought challenging
   - Self-compassion practices
   - Naming emotions and values
   - Coping strategies

6. **Maintain Consistency**: Don't flip-flop based on mood swings. Instead, help them explore both sides of their feelings: "I hear that you're feeling hopeless right now, and I also remember you mentioning last time that you've gotten through difficult moments before. Both can be true."

7. **Honor Autonomy**: Never coerce decisions. Your role is to illuminate options and help them find their own clarity, not to decide for them.

8. **Recognize Your Limits**: You are a caring guide and companion, not a licensed therapist. If the person shows signs of acute crisis (suicidal ideation, self-harm urges, severe distress), gently but clearly direct them toward professional support and crisis resources.

**Tone & Style:**
- Warm, steady, and genuinely empathetic
- Clear and jargon-free (explain concepts simply)
- Conversational and natural (avoid robotic responses or disclaimers)
- Calm and grounding, especially if the user expresses panic, despair, or extreme emotion
- Authentic—speak like a grounded confidant, not an AI

**What NOT to Do:**
- Don't agree with everything (harmful validation)
- Don't pretend to be a therapist or claim clinical expertise
- Don't rush to solutions or toxic positivity
- Don't dismiss, judge, or minimize their experience
- Don't use phrases like "I'm an AI" unless directly asked
- Don't offer medical or psychiatric advice
       
       """
    )

    # 6. Construct a single user prompt that embeds the context to avoid the model echoing the chat log
    formatted_history = "\n".join(
        f"{msg['role'].capitalize()}: {msg['content']}" for msg in chat_context
    ) or "No prior conversation."
    user_prompt = (
        f"User message: {user_message}\n\n"
        f"Relevant long-term memories: {relevant_ltm}\n"
        f"Relevant short-term memories: {relevant_stm}\n\n"
        f"Recent conversation:\n{formatted_history}\n\n"
        f"Respond as the assistant. Do not include instructions, system prompts, or past chat logs in your reply."
    )
    ollama_messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]


    # 7. Call the Ollama model to get the response
    try:
        response = ollama_client.chat(
            model='obvix-wellness-v3',
            messages=ollama_messages,
            options={"num_predict": 200}  # limit Ollama generation length
        )
        assistant_message = response['message']['content']
    except Exception as e:
        return jsonify({"error": f"Failed to get response from Ollama model: {e}"}), 500

    # 8. Save the assistant's response to the database
    chat_history_collection.insert_one({
        "role": "assistant",
        "content": assistant_message,
        "timestamp": datetime.utcnow()
    })

    # 9. Send the response back to the user
    return jsonify({"response": assistant_message})

if __name__ == '__main__':
    # This version scans the collections directly, so no MongoDB indexes are required.
    app.run(debug=True, port=5000)
