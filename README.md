# Aasha AI

Aasha AI is a compassionate mental wellness assistant combining empathetic chat, habit tracking, and memory‑aware context.

## Core Features

- Empathetic AI chat (obvix-wellness-v3 model)
- Mood tracking & daily check-ins
- Journaling, goals, nudges, breathing guide
- Memory system (STM + LTM) with embedding similarity
- Task/reminder extraction
- Mentor session scheduling (UI placeholder)

## Architecture

- Frontend: Next.js + React (client/)
- UI Components: Reusable card/grid system
- Backend: Multiple experimental Flask/Python agents (backend/)
- Persistence: MongoDB (history, memory, scheduler)
- Retrieval: Local cosine similarity (no vector index) + structured memory extraction
- Models: OpenAI / custom base URL endpoints / Ollama compatibility

## Tech Stack

React, Next.js, TypeScript, Tailwind, Flask, MongoDB, LangChain, OpenAI, Ollama.

## Setup

Prerequisites: Node 18+, Python 3.10+, MongoDB URI, OpenAI keys.

## Key Backend Files

- v1.py: Simple chat API with system prompt.
- v2.py: Hybrid memory (manual vector + text scan) + Ollama chat.
- v7.py: Memory extraction + embedding storage.
- v8.py: Unified routing (task vs chat) + memory retrieval.

## API (Representative)

POST /chat { "message": "text" } → { "response": "..." }
GET /tasks → { "tasks": [...] }

## Memory Flow

1. User message → classify (STM/LTM + store flag).
2. If store=true → embed + persist.
3. Query embeds prompt → cosine similarity over stored embeddings.
4. Top relevant memories injected into system context.
5. Recent history appended before model invocation.

## Task Extraction

Messages with reminder intent routed to task model → JSON { phrase, timestamp } → stored in scheduler.

## Safety & Boundaries

Assistant offers emotional support, not clinical advice. Crisis intent should be redirected externally (add in future guardrails).

## Frontend Highlights

- Dynamic dashboard (/home)
- Chat window with local history persistence
- Conditional widget hiding after chat start

## Testing

Manual: Run backend, curl /chat. Extend with Jest/pytest (not included).

## Roadmap

- Add authentication
- Structured mentor booking backend
- Crisis phrase detection + escalation
- Vector index optimization
- Export user data / privacy panel
- Streaming responses

## License

Proprietary (update if needed).

## Disclaimer

Not a substitute for professional mental health care.
