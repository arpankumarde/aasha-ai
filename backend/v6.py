from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from pymongo import MongoClient
import os
import json
from datetime import datetime, timezone

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

print(f"Connected to MongoDB collection: {MONGO_COLLECTION_NAME}")

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
        model="gpt-4o",
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


def call_chat_model(prompt: str) -> str:
    """Use chat model for normal conversations.

    Args:
        prompt (str): The prompt to send to the model.

    Returns:
        str: The model's response.
    """
    # print("Calling chat model with prompt:", prompt)
    sorted_mem = extract_memory(prompt)
    if sorted_mem["store"]:
        try:
            mem_doc = {
                "type": sorted_mem.get("type"),
                "phrase": sorted_mem.get("phrase"),
                "source_prompt": prompt,
                "created_at": datetime.now(timezone.utc).isoformat(),
            }
            memory_collection = db["memory"]
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
        temperature=0.7,
    )
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
        {"role": "user", "content": prompt},
    ]
    response = model.invoke(messages)
    return response.content


def extract_memory(prompt: str):
    model = ChatOpenAI(
        model="gpt-4o",
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
        return call_chat_model(prompt)


# Test the routing
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


# result = route_and_respond("I feel depressed and anxious.")
# print("Chat request result:", result)
# Ask Karan for date tomorrow at 5 PM
# extract_memory("I ate a delicious pizza today.")
