export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ChatRequest {
  prompt: string;
  history: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
}

export interface ChatResponse {
  prompt: string;
  response: string;
}

export interface ChatError {
  message: string;
  code?: string;
}
