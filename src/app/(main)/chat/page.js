import { redirect } from "next/navigation";

export default function NewChatPage() {
  const newSessionId = Date.now().toString();

  redirect(`/chat/${newSessionId}`);
}
