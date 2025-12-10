import ReactMarkdown from "react-markdown";
import { User, Bot } from "lucide-react";

export default function ChatBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex w-full gap-4 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 border border-blue-200">
          <Bot className="w-5 h-5 text-blue-600" />
        </div>
      )}

      <div
        className={`relative max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm ${
          isUser
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        <div className="prose prose-sm max-w-none break-words dark:prose-invert">
          <ReactMarkdown
            components={{
              code: ({ node, ...props }) => (
                <code className="bg-black/10 rounded px-1 py-0.5" {...props} />
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 border border-gray-300">
          <User className="w-5 h-5 text-gray-600" />
        </div>
      )}
    </div>
  );
}
