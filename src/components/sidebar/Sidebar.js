"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Plus, LayoutGrid } from "lucide-react";
import { getChatHistory } from "@/lib/storage";
import SidebarItem from "./SidebarItem";

export default function Sidebar({ className }) {
  const [history, setHistory] = useState([]);
  const params = useParams();

  const loadHistory = () => {
    const data = getChatHistory();
    setHistory(data);
  };

  useEffect(() => {
    loadHistory();

    window.addEventListener("storage-update", loadHistory);

    return () => window.removeEventListener("storage-update", loadHistory);
  }, []);

  return (
    <aside
      className={`flex flex-col h-full bg-gray-50 border-r border-gray-200 ${className}`}
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-6 text-gray-800 font-bold text-xl px-2">
          <LayoutGrid className="w-6 h-6 text-orange-600" />
          <span>AskMe AI</span>
        </div>

        <Link
          href="/chat"
          className="flex items-center justify-center gap-2 w-full bg-orange-600 hover:bg-orange-700 text-white py-2.5 px-4 rounded-lg font-medium transition-all shadow-sm"
        >
          <Plus className="w-5 h-5" />
          <span>New Chat</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
          Your Chats
        </div>

        {history.length === 0 ? (
          <div className="text-sm text-gray-400 px-3 py-2 italic">
            No history yet. Start a conversation!
          </div>
        ) : (
          history.map((chat) => (
            <SidebarItem
              key={chat.id}
              id={chat.id}
              title={chat.title}
              isActive={params.sessionId === chat.id}
            />
          ))
        )}
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-center text-gray-400">
          Powered by Gemini AI
        </div>
      </div>
    </aside>
  );
}
