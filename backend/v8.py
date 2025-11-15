from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from pymongo import MongoClient
import os
import json
from datetime import datetime, timezone
import numpy as np
from langchain_openai import OpenAIEmbeddings
from langchain_mongodb import MongoDBAtlasVectorSearch
from flask import Flask, jsonify, request
import argparse

# from transformers import pipeline
import requests

load_dotenv()

# MongoDB connection
MONGO_URI = os.getenv("MONGO_URI")
MONGO_DATABASE_NAME = os.getenv("MONGO_DATABASE_NAME")
MONGO_COLLECTION_NAME = os.getenv("MONGO_COLLECTION_NAME")

mongo_client = MongoClient(MONGO_URI)
db = mongo_client[MONGO_DATABASE_NAME]
collection = db["scheduler"]
history_collection = db["history"]
memory_collection = db["memory"]

embedder = OpenAIEmbeddings(model="text-embedding-3-small")
app = Flask(__name__)

# try:
#     sent_clf = pipeline(
#         "text-classification", model="cardiffnlp/twitter-roberta-base-sentiment-latest"
#     )
# except Exception:
#     sent_clf = None

# try:
#     emo_clf = pipeline(
#         "text-classification",
#         model="j-hartmann/emotion-english-distilroberta-base",
#         return_all_scores=True,
#     )
# except Exception:
#     emo_clf = None

# try:
#     sarc_clf = pipeline(
#         "text-classification", model="helinivan/english-sarcasm-detector"
#     )
# except Exception:
#     sarc_clf = None


def call_task_model(prompt: str) -> str:
    """Task model for scheduling reminders and tasks.

    Args:
        prompt (str): The prompt to send to the model.

    Returns:
        str: The model's response.
    """
    # Add current timestamp to the prompt for context
    current_timestamp = datetime.now().isoformat() + "Z"
    prompt_with_context = f"{prompt}\n\n[Current Timestamp: {current_timestamp}]"

    # Extract task details from the prompt
    print("Extracting task details from prompt:", prompt_with_context)
    model = ChatOpenAI(
        model="gpt-4o-mini",
        max_completion_tokens=200,
        temperature=0.2,
    )
    messages = [
        {
            "role": "system",
            "content": """
You are a task extraction assistant. Your job is to extract the task phrase and the timestamp from the user's prompt and return them in a structured JSON format. If no timestamp is explicitly mentioned, infer it based on the context.
The phrase should be a concise message to be sent to be user. It should be in 3rd person format. example: "Call john about the meeting" instead of "Remind me to call John".
Example Output:
{
    "phrase": "Call john about the meeting",
    "timestamp": "2023-10-01T17:00:00Z"
}
""",
        },
        {"role": "user", "content": prompt_with_context},
    ]

    response = model.invoke(messages)
    task_data = response.content
    print("Task model response:", task_data)

    # Parse the response and save to MongoDB
    try:
        task_dict = json.loads(
            task_data
        )  # Assuming the model returns a valid JSON string
        if "phrase" in task_dict and "timestamp" in task_dict:
            collection.insert_one(task_dict)
            try:
                notify_payload = {
                    "phrase": task_dict["phrase"],
                    "timestamp": task_dict["timestamp"],
                }
                requests.post(
                    "https://script.google.com/macros/s/AKfycbz9YuevYm2ny0DcCUZgPtyjyieMSAFxp9WX2_bJhN8MZs9V4opeFh4-Un0cJOI93591/exec",
                    json=notify_payload,
                )
            except Exception as notify_error:
                print("Notification error:", notify_error)
            print("Task saved to MongoDB:", task_dict)
            return f"TASK CREATED: {task_dict['phrase']} at {task_dict['timestamp']}"
        else:
            return "Failed to extract task details."
    except Exception as e:
        print("Error processing task data:", e)
        return "Error creating task."


def cosine_similarity(vec1, vec2) -> float:
    """Compute cosine similarity between two embedding vectors."""

    v1 = np.array(vec1, dtype=float)
    v2 = np.array(vec2, dtype=float)
    denom = np.linalg.norm(v1) * np.linalg.norm(v2)
    if denom == 0:
        return 0.0
    return float(np.dot(v1, v2) / denom)


SIMILARITY_THRESHOLD = 0.5


def fetch_relevant_memories(query_embedding, top_k: int = 3):
    """Return the most relevant memories comparing cosine similarity."""

    if not query_embedding:
        return []
    scored_memories = []
    try:
        for memory_doc in memory_collection.find({"embedding": {"$exists": True}}):
            embedding = memory_doc.get("embedding")
            if not embedding:
                continue
            similarity = cosine_similarity(query_embedding, embedding)
            scored_memories.append((similarity, memory_doc))
    except Exception as fetch_err:
        print("Error fetching memories:", fetch_err)
        return []
    scored_memories.sort(key=lambda x: x[0], reverse=True)
    top_memories = [
        doc for score, doc in scored_memories[:top_k] if score >= SIMILARITY_THRESHOLD
    ]
    return top_memories


def format_memory_context(memories):
    if not memories:
        return ""
    lines = ["Relevant memory context:"]
    for idx, mem in enumerate(memories, 1):
        mem_type = mem.get("type", "STM")
        phrase = mem.get("phrase", "")
        lines.append(f"{idx}. ({mem_type}) {phrase}")
    return "\n".join(lines)


def fetch_recent_history(limit: int = 5):
    """Fetch the most recent chat turns for context."""

    history_docs = (
        history_collection.find().sort("timestamp", -1).limit(limit)
    )
    history_list = list(history_docs)
    history_list.reverse()  # oldest first for the prompt context
    return history_list


def store_chat_turn(role: str, message: str):
    """Persist a chat turn in MongoDB."""

    history_collection.insert_one(  # store each turn with timestamp and role
        {
            "role": role,
            "message": message,
            "timestamp": datetime.now(timezone.utc),
        }
    )


def call_chat_model(prompt: str) -> str:
    """Use chat model for normal conversations.

    Args:
        prompt (str): The prompt to send to the model.

    Returns:
        str: The model's response.
    """
    # print("Calling chat model with prompt:", prompt)
    try:
        query_embedding = embedder.embed_query(prompt)
    except Exception as embed_err:
        print("Error embedding prompt for retrieval:", embed_err)
        query_embedding = None
    sorted_mem = extract_memory(prompt)
    if sorted_mem["store"]:
        try:
            embeddings = embedder.embed_query(sorted_mem.get("phrase", ""))
            mem_doc = {
                "type": sorted_mem.get("type"),
                "phrase": sorted_mem.get("phrase"),
                "source_prompt": prompt,
                "embedding": embeddings,
                "created_at": datetime.now(timezone.utc).isoformat(),
            }
            memory_collection.insert_one(mem_doc)

            send_type = sorted_mem.get("type", "")
            if send_type == "STM":
                send_type_short = "ST"
            elif send_type == "LTM":
                send_type_short = "LT"
            else:
                send_type_short = send_type

            notify_payload = {
                "type": send_type_short,
                "phrase": sorted_mem.get("phrase", ""),
            }

            try:
                requests.post(
                    "https://script.google.com/macros/s/AKfycbxAuwCrWuUNvmEm3RKG3kONW5i3xniZAtITqqzT_bm0LLMlPp4QtqZeJHkx57egE3V9Lg/exec",
                    json=notify_payload,
                    timeout=5,
                )
            except Exception as notify_err:
                print("Notification error:", notify_err)
        except Exception as e:
            print("Error storing memory:", e)
    model = ChatOpenAI(
        model="obvix-wellness-v3",
        openai_api_base="https://llm.apps.growsoc.com/v1",
        max_completion_tokens=200,
        temperature=0.4,
        top_p=0.9
    )
    relevant_memories = fetch_relevant_memories(query_embedding)
    memory_context = format_memory_context(relevant_memories)
    context_messages = (
        [{"role": "system", "content": memory_context}] if memory_context else []
    )

    history_messages = [
        {"role": turn.get("role", "user"), "content": turn.get("message", "")}
        for turn in fetch_recent_history()
    ]
    messages = [
        {
            "role": "system",
            "content": """
You are a Aasha, a compassionate and grounded emotional support companion. Your role is to help people navigate emotionally challenging moments with warmth, clarity, and genuine care.

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
""",
        },
        *context_messages,
        *history_messages,
        {"role": "user", "content": prompt},
    ]
    try:
        print("LLM request messages:", json.dumps(messages, ensure_ascii=False))
    except Exception as log_err:
        print("Failed to log LLM request:", log_err)
    response = model.invoke(messages)
    return response.content


def extract_memory(prompt: str):
    model = ChatOpenAI(
        model="gpt-4o-mini",
        max_completion_tokens=120,
        temperature=0.1,
    )
    messages = [
        {
            "role": "system",
            "content": """
You are a memory classification agent.  
Your task is to process a user's message and output a JSON object representing what type of memory it should be stored as.  
The JSON must contain exactly the following fields:
{
  "type": "LTM or STM",
  "store": true or false,
  "phrase": "short summary with high keyword density, or empty string"
}

Definitions:
- "LTM" (Long Term Memory): Any information deeply tied to user identity, recurring themes, life-changing events, trauma, relationships, values, or long-held preferences.
  Example: "I feel anxious whenever I travel by train" → {"type":"LTM", "store":true, "phrase":"user has train-related trauma"}

- "STM" (Short Term Memory): Temporary or day-to-day context such as current actions, moods, achievements, recent events, or short-lived plans.
  Example: "I finally completed my project today!" → {"type":"STM", "store":true, "phrase":"user completed project today"}

Rules:
1. Always output **only** a JSON object, without explanation or extra text.  
2. Set `"store": true` only if the statement reveals something significant, meaningful, or actionable about the user's state, experience, or identity.  
3. If the message is trivial, vague, or lacks contextual importance, set `"store": false` and make `"phrase": ""`.  
4. Maintain brevity in `"phrase"`; focus on key concepts and use concise phrasing with high keyword density.  
5. Do not copy the user's entire sentence. Summarize semantically.  

Output format example:
{"type":"LTM","store":true,"phrase":"user has fear associated with trains"}
""",
        },
        {"role": "user", "content": prompt},
    ]

    response = model.invoke(messages).content
    response = json.loads(response)
    return response


def is_task_request(prompt: str) -> bool:
    """Classify if the prompt is a task/reminder request.

    Args:
        prompt (str): User's prompt

    Returns:
        bool: True if task/reminder request, False otherwise
    """
    prompt_lower = prompt.lower()
    task_keywords = [
        "remind",
        "reminder",
        "task",
        "todo",
        "to-do",
        "schedule",
        "appointment",
        "meeting",
        "deadline",
        "due",
        "follow up",
        "set a",
        "create a",
        "add a",
    ]
    return any(keyword in prompt_lower for keyword in task_keywords)


def route_and_respond(prompt: str) -> str:
    """Route the prompt to appropriate model and return response.

    Args:
        prompt (str): User's prompt

    Returns:
        str: Model's response
    """
    if is_task_request(prompt):
        return call_task_model(prompt)
    else:
        response = call_chat_model(prompt)
        store_chat_turn("user", prompt)
        store_chat_turn("assistant", response)
        return response


@app.post("/chat")
def chat_endpoint():
    """HTTP endpoint for chat interactions with history persistence."""
    payload = request.get_json(silent=True) or {}
    message = payload.get("message", "").strip()
    if not message:
        return jsonify({"error": "message is required"}), 400
    try:
        response = route_and_respond(message)
    except Exception as err:
        print("Error handling /chat request:", err)
        return jsonify({"error": "failed to generate response"}), 500
    return jsonify({"response": response})


def run_cli():
    """Command-line interaction loop for manual testing."""
    try:
        while True:
            user_input = input("\nYou: ").strip()
            if not user_input:
                continue
            if user_input.lower() in {"exit", "quit"}:
                print("Goodbye.")
                break
            try:
                response = route_and_respond(user_input)
            except Exception as e:
                print("Error handling request:", e)
                continue
            print("Aasha:", response)
    except KeyboardInterrupt:
        print("\nSession ended.")


def run_flask():
    """Start the Flask server."""
    port = int(os.getenv("PORT", 5001))
    app.run(host="0.0.0.0", port=port)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Aasha AI backend interface")
    parser.add_argument(
        "--flask",
        action="store_true",
        help="Run the Flask server instead of the interactive CLI.",
    )
    args = parser.parse_args()
    if args.flask:
        run_flask()
    else:
        run_cli()


# result = route_and_respond("I feel depressed and anxious.")
# print("Chat request result:", result)
# Ask Karan for date tomorrow at 5 PM
# extract_memory("I ate a delicious pizza today.")
