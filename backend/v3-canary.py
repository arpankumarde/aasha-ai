from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

load_dotenv()


def call_task_model(prompt: str) -> str:
    """Task model for scheduling reminders and tasks"""
    return "TASK CREATED BY #234"


def call_chat_model(prompt: str) -> str:
    """Use chat model for normal tasks"""
    model = ChatOpenAI(
        model="obvix-wellness-v3",
        openai_api_base="https://llm.apps.growsoc.com/v1",
        max_completion_tokens=200,
    )
    response = model.invoke(prompt)
    return response


class ModelRouterAgent:
    """Deterministic router: keyword-based task vs chat classification"""

    def __init__(self):
        self.task_keywords = [
            "remind",
            "reminder",
            "task",
            "todo",
            "to-do",
            "schedule",
            "appointment",
            "set a reminder",
            "add a reminder",
            "due",
            "deadline",
            "follow up",
            "follow-up",
        ]

    def _is_task(self, text: str) -> bool:
        """Check if text contains task-related keywords"""
        text = (text or "").lower()
        return any(k in text for k in self.task_keywords)

    def invoke(self, payload: dict) -> str:
        """Route messages to appropriate model"""
        messages = payload.get("messages", [])
        outputs = []

        for msg in messages:
            content = msg.get("content", "")
            try:
                if self._is_task(content):
                    output = call_task_model(content)
                else:
                    output = call_chat_model(content)
                outputs.append(str(output))
            except Exception as e:
                outputs.append(f"Error: {e}")

        return "\n".join(outputs)


# Initialize and use
agent = ModelRouterAgent()

result = agent.invoke(
    {"messages": [{"role": "user", "content": "I feel depressed and anxious."}]}
)
print(result)
