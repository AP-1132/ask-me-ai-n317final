"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Plus, LayoutGrid, Trash2 } from "lucide-react";
import {
  getChatHistory,
  deleteChat,
  clearAllChats,
  renameChat,
} from "@/lib/storage";
import SidebarItem from "./SidebarItem";

export default function Sidebar({ className }) {
  const [history, setHistory] = useState([]);
  const params = useParams();
  const router = useRouter();

  const loadHistory = () => {
    const data = getChatHistory();
    setHistory(data);
  };

  useEffect(() => {
    loadHistory();
    window.addEventListener("storage-update", loadHistory);

    return () => window.removeEventListener("storage-update", loadHistory);
  }, []);

  const handleDeleteChat = (id) => {
    const ok = window.confirm(
      "Delete this conversation? This cannot be undone."
    );
    if (!ok) return;

    deleteChat(id);
    loadHistory();
    window.dispatchEvent(new Event("storage-update"));

    if (params.sessionId === id) {
      router.push("/chat");
    }
  };

  const handleClearAllChats = () => {
    if (history.length === 0) return;

    const ok = window.confirm(
      "Clear all conversations? This will delete your entire chat history."
    );
    if (!ok) return;

    clearAllChats();
    loadHistory();
    window.dispatchEvent(new Event("storage-update"));
    router.push("/chat");
  };

  const handleRenameChat = (id, newTitle) => {
    renameChat(id, newTitle);
    loadHistory();
    window.dispatchEvent(new Event("storage-update"));
  };

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
        <div className="flex items-center justify-between mb-2 px-3">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Your Chats
          </span>

          {history.length > 0 && (
            <button
              type="button"
              onClick={handleClearAllChats}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear all</span>
            </button>
          )}
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
              onDelete={handleDeleteChat}
              onRename={handleRenameChat}
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
