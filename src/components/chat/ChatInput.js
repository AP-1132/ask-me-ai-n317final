import TextareaAutosize from "react-textarea-autosize";
import { SendHorizontal } from "lucide-react";

export default function ChatInput({
  input = "",
  handleInputChange,
  handleSubmit,
  isLoading,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-end gap-2 w-full max-w-4xl mx-auto"
    >
      <div className="relative flex-1 bg-gray-50 rounded-2xl border border-gray-200 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all overflow-hidden">
        <TextareaAutosize
          minRows={1}
          maxRows={6}
          placeholder="Message AskMe AI..."
          className="w-full bg-transparent border-none px-4 py-3.5 focus:outline-none text-gray-800 resize-none"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={isLoading || !input?.trim()}
          className="absolute right-2 bottom-2 p-1.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 transition-colors"
        >
          <SendHorizontal className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
