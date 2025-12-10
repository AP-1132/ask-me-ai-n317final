"use client";

import { useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";
import Spinner from "@/components/ui/Spinner";
import { RefreshCcw } from "lucide-react";

export default function ChatList({ messages, isLoading, error, reload }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col gap-6 px-4 md:px-8">
      {messages.map((msg, index) => (
        <ChatBubble key={index} message={msg} />
      ))}

      {isLoading && (
        <div className="flex justify-start animate-pulse">
          <div className="bg-gray-100 rounded-2xl px-4 py-3 flex items-center gap-2">
            <Spinner className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500">Thinking...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="flex justify-center my-4">
          <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm flex items-center gap-2 border border-red-200">
            <span>Something went wrong.</span>
            <button
              onClick={() => reload()}
              className="font-semibold underline hover:text-red-800 flex items-center gap-1"
            >
              <RefreshCcw className="w-3 h-3" /> Retry
            </button>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
