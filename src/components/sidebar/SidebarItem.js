"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageSquare, Trash2, Pencil } from "lucide-react";

export default function SidebarItem({
  id,
  title,
  isActive,
  onDelete,
  onRename,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);

  useEffect(() => {
    setDraftTitle(title);
  }, [title]);

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) {
      onDelete(id);
    }
  };

  const handleRenameClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(true);
  };

  const finishRename = () => {
    if (onRename) {
      onRename(id, draftTitle);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      finishRename();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsEditing(false);
      setDraftTitle(title);
    }
  };

  return (
    <div className="group flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
      {isEditing ? (
        <input
          type="text"
          className="flex-1 mr-2 text-sm bg-white border border-gray-300 rounded px-2 py-1 text-gray-800 outline-none"
          value={draftTitle}
          onChange={(e) => setDraftTitle(e.target.value)}
          onBlur={finishRename}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <Link
          href={`/chat/${id}`}
          className={`flex items-center gap-3 text-sm font-medium truncate ${
            isActive
              ? "text-orange-700"
              : "text-gray-700 group-hover:text-gray-900"
          }`}
        >
          <MessageSquare
            className={`w-4 h-4 ${
              isActive
                ? "text-orange-600"
                : "text-gray-400 group-hover:text-gray-600"
            }`}
          />
          <span className="truncate">{title}</span>
        </Link>
      )}

      {!isEditing && (
        <div className="flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={handleRenameClick}
            className="text-gray-300 hover:text-blue-600"
            aria-label="Rename conversation"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleDeleteClick}
            className="text-gray-300 hover:text-red-600"
            aria-label="Delete conversation"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
