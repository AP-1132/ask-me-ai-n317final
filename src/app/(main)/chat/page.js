import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function NewChatPage() {
  const newSessionId = Date.now().toString();

  redirect(`/chat/${newSessionId}`);
}
