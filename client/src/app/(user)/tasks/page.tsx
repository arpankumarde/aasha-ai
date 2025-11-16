"use client";

import React, { useState, useEffect } from "react";
import { chatApi } from "@/lib/axios";
import type { TasksResponse, Task } from "@/types/task";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Calendar, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await chatApi.get<TasksResponse>("/tasks");
      setTasks(data.tasks);
    } catch (err: any) {
      console.error("Tasks fetch error:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch tasks. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-180px)]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#C7A896] mx-auto mb-4" />
          <p className="text-[#6B4F4F] font-medium">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-[#6B4F4F]">My Tasks</h1>
          <Button
            onClick={fetchTasks}
            variant="outline"
            size="sm"
            className="border-[#D9C8BA] text-[#6B4F4F] hover:bg-[#F1E6DD]"
          >
            Refresh
          </Button>
        </div>
        <p className="text-sm text-[#A68B7C]">
          Your reminders and tasks extracted from conversations
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-800">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-medium">Error loading tasks</p>
            <p className="text-sm">{error}</p>
          </div>
          <Button
            onClick={fetchTasks}
            variant="outline"
            size="sm"
            className="border-red-300 text-red-700 hover:bg-red-100"
          >
            Retry
          </Button>
        </div>
      )}

      {/* Tasks List */}
      <ScrollArea className="h-[calc(100vh-280px)]">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C7A896] to-[#8C6D5A] flex items-center justify-center mb-4">
              <Calendar className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-[#6B4F4F] mb-2">
              No tasks yet
            </h3>
            <p className="text-sm text-[#A68B7C] max-w-md">
              Your tasks and reminders from chat conversations will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3 pr-4">
            {tasks.map((task, index) => (
              <Card
                key={index}
                className="border-[#D9C8BA] bg-white hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C7A896] to-[#B08F7A] flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#4B3A34] font-medium mb-2">
                        {task.phrase}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-[#A68B7C]">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(task.timestamp)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{formatTime(task.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Tasks Count */}
      {tasks.length > 0 && (
        <div className="mt-4 text-center text-sm text-[#A68B7C]">
          Showing {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </div>
      )}
    </div>
  );
};

export default Page;