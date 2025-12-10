"use client";

import { useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import ChatList from "./ChatList";
import ChatInput from "./ChatInput";
import EmptyState from "./EmptyState";

export default function ChatContainer({ sessionId }) {
  const {
    messages,
    setMessages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useChat({
    api: "/api/chat",
    onFinish: (message) => {
      const allMessages = [...messages, message];
      localStorage.setItem(`chat_${sessionId}`, JSON.stringify(allMessages));
      window.dispatchEvent(new Event("storage-update"));
    },
  });

  useEffect(() => {
    const saved = localStorage.getItem(`chat_${sessionId}`);
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([]);
    }
  }, [sessionId, setMessages]);

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto w-full relative">
      <div className="flex-1 overflow-y-auto p-4 pb-20">
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          <ChatList messages={messages} isLoading={isLoading} />
        )}
      </div>

      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={(e) => {
          const userMsg = { role: "user", content: input };
          localStorage.setItem(
            `chat_${sessionId}`,
            JSON.stringify([...messages, userMsg])
          );
          handleSubmit(e);
        }}
        isLoading={isLoading}
      />
    </div>
  );
}
