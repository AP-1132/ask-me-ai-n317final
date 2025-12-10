import { Bot } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="h-full flex items-center justify-center px-6">
      <div className="max-w-md text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center border border-orange-200">
            <Bot className="w-6 h-6 text-orange-600" />
          </div>
        </div>

        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Welcome to AskMe AI
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Start a conversation by asking anything you&apos;re curious about.
            Your chats will be saved in the sidebar so you can revisit them
            later.
          </p>
        </div>

        <div className="text-xs text-gray-400">
          Tip: Press <span className="font-semibold">Enter</span> to send and{" "}
          <span className="font-semibold">Shift + Enter</span> for a new line.
        </div>
      </div>
    </div>
  );
}
