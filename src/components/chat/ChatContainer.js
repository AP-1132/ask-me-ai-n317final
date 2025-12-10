"use client";

import { useEffect, useState, useRef } from "react";
import ChatList from "./ChatList";
import ChatInput from "./ChatInput";
import EmptyState from "./EmptyState";

export default function ChatContainer({ sessionId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const lastRequestRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem(`chat_${sessionId}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(parsed);
      } catch (e) {
        console.error("Failed to parse history", e);
        setMessages([]);
      }
    } else {
      setMessages([]);
      setInput("");
    }

    setError(null);
  }, [sessionId]);

  const saveToStorage = (id, newMessages) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(`chat_${id}`, JSON.stringify(newMessages));
    window.dispatchEvent(new Event("storage-update"));
  };

  const sendToAI = async (history) => {
    setIsLoading(true);
    setError(null);
    lastRequestRef.current = history;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!response.ok) {
        let message = "Something went wrong while talking to the AI.";
        try {
          const data = await response.json();
          if (data && data.error) message = data.error;
        } catch {}
        throw new Error(message);
      }

      const aiContent = await response.text();

      const finalHistory = [
        ...history,
        {
          role: "assistant",
          content: aiContent,
          createdAt: new Date().toISOString(),
        },
      ];

      setMessages(finalHistory);
      saveToStorage(sessionId, finalHistory);
    } catch (err) {
      console.error("Chat API error:", err);
      setError(err.message || "Sorry, something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = {
      role: "user",
      content: input.trim(),
      createdAt: new Date().toISOString(),
    };

    const newHistory = [...messages, userMsg];

    setMessages(newHistory);
    saveToStorage(sessionId, newHistory);
    setInput("");
    setError(null);

    await sendToAI(newHistory);
  };

  const handleRetry = () => {
    if (!lastRequestRef.current || isLoading) return;
    setError(null);
    sendToAI(lastRequestRef.current);
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full relative bg-white">
      <div className="flex-1 overflow-y-auto pt-4 pb-4">
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          <ChatList
            messages={messages}
            isLoading={isLoading}
            error={error}
            reload={handleRetry}
          />
        )}
      </div>

      <div className="p-4 bg-white/80 backdrop-blur-md border-t border-gray-100">
        <ChatInput
          input={input}
          handleInputChange={(e) => setInput(e.target.value)}
          handleSubmit={handleFormSubmit}
          isLoading={isLoading}
        />
        <div className="text-center text-xs text-gray-400 mt-2">
          AskMe AI can make mistakes. Check important info.
        </div>
      </div>
    </div>
  );
}
