"use client";

import React, { useState, useRef, useEffect } from "react";
import { chatApi } from "@/lib/axios";
import type { ChatMessage, ChatRequest, ChatResponse } from "@/types/chat";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send, AlertCircle } from "lucide-react";

const Page = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      // Format conversation history for the API
      const conversationHistory = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const requestData: ChatRequest = {
        prompt: userMessage.content,
        history: conversationHistory,
      };

      const { data } = await chatApi.post<ChatResponse>(
        "/generate",
        requestData
      );

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error("Chat error:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to get response. Please try again.";
      setError(errorMessage);

      // Optionally add error as a system message
      const errorSystemMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Sorry, I encountered an error: ${errorMessage}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorSystemMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#D9C8BA]">
        <div>
          <h1 className="text-2xl font-bold text-[#6B4F4F]">
            Aashaa Chat Assistant
          </h1>
          <p className="text-sm text-[#A68B7C]">
            Share your thoughts and feelings
          </p>
        </div>
        {messages.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearChat}
            className="border-[#D9C8BA] text-[#6B4F4F] hover:bg-[#F1E6DD]"
          >
            Clear Chat
          </Button>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Messages Area */}
      <ScrollArea
        ref={scrollRef}
        className="flex-1 mb-4 pr-4 bg-[#FEF4D6]/30 rounded-lg p-4"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C7A896] to-[#8C6D5A] flex items-center justify-center mb-4">
              <span className="text-3xl">💬</span>
            </div>
            <h3 className="text-lg font-semibold text-[#6B4F4F] mb-2">
              Start a conversation
            </h3>
            <p className="text-sm text-[#A68B7C] max-w-md">
              Share how you're feeling today. I'm here to listen and support you
              on your mental wellness journey.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <Card
                  className={`max-w-[80%] py-2 ${
                    message.role === "user"
                      ? "bg-[#E6D4C3] border-[#D9C8BA]"
                      : "bg-white border-[#D9C8BA]"
                  }`}
                >
                  <CardContent className="px-4 py-0">
                    <p className="text-sm text-[#4B3A34] whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                    <span className="text-xs text-[#A68B7C] mt-2 block">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </CardContent>
                </Card>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <Card className="border-[#D9C8BA] py-2">
                  <CardContent className="py-0">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-[#6B4F4F]" />
                      <span className="text-sm text-[#6B4F4F]">Typing...</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      {/* Input Area */}
      <div className="flex gap-2 items-end">
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share how you're feeling..."
            disabled={isLoading}
            rows={2}
            className="w-full px-4 py-2 pr-12 rounded-xl border-2 border-[#D9C8BA] bg-white text-[#4B3A34] placeholder:text-[#A68B7C] focus:outline-none focus:border-[#C7A896] resize-none disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <div className="absolute bottom-3 right-3 text-xs text-[#A68B7C]">
            {input.length}/500
          </div>
        </div>
        <Button
          onClick={sendMessage}
          disabled={!input.trim() || isLoading}
          className="size-12 bg-gradient-to-r from-[#C7A896] to-[#B08F7A] hover:from-[#B08F7A] hover:to-[#8C6D5A] text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default Page;
