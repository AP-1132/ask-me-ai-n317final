"use client";

import { useEffect, useState, useRef } from "react";
import ChatList from "./ChatList";
import ChatInput from "./ChatInput";
import EmptyState from "./EmptyState";

export default function ChatContainer({ sessionId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`chat_${sessionId}`);
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    } else {
      setMessages([]);
      setInput("");
    }
  }, [sessionId]);

  const saveToStorage = (id, newMessages) => {
    localStorage.setItem(`chat_${id}`, JSON.stringify(newMessages));
    window.dispatchEvent(new Event("storage-update"));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { role: "user", content: input, createdAt: new Date() };
    const newHistory = [...messages, userMsg];

    setMessages(newHistory);
    saveToStorage(sessionId, newHistory);
    setInput("");
    setIsLoading(true);

    try {
      const aiMsgPlaceholder = {
        role: "assistant",
        content: "",
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, aiMsgPlaceholder]);

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newHistory }),
      });

      if (!response.ok) throw new Error("API request failed");
      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let aiContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });
        aiContent += text;

        setMessages((prev) => {
          const updated = [...prev];
          const lastIndex = updated.length - 1;
          updated[lastIndex] = { ...updated[lastIndex], content: aiContent };
          return updated;
        });
      }

      const finalHistory = [
        ...newHistory,
        { role: "assistant", content: aiContent, createdAt: new Date() },
      ];
      saveToStorage(sessionId, finalHistory);
    } catch (err) {
      console.error("Stream Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full relative bg-white">
      <div className="flex-1 overflow-y-auto pt-4 pb-4">
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          <ChatList messages={messages} isLoading={isLoading} />
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
