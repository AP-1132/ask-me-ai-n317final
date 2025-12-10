import Link from "next/link";
import { MessageSquare } from "lucide-react";

export default function SidebarItem({ id, title, isActive }) {
  return (
    <Link
      href={`/chat/${id}`}
      className={`group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
        isActive
          ? "bg-blue-100 text-blue-700"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      <MessageSquare
        className={`w-4 h-4 ${
          isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
        }`}
      />
      <span className="truncate">{title}</span>
    </Link>
  );
}
