import { Sparkles } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
        <Sparkles className="w-8 h-8 text-blue-500" />
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        How can I help you today?
      </h1>
      <p className="text-gray-500 max-w-md">
        Ask me anything—I can help you learn new things, write code, or just
        chat.
      </p>
    </div>
  );
}
