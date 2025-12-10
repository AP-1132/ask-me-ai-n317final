import ChatContainer from "@/components/chat/ChatContainer";

export default function ChatSessionPage({ params }) {
  return <ChatContainer sessionId={params.sessionId} />;
}
