export function getChatHistory() {
  if (typeof window === "undefined") return [];

  const chats = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key.startsWith("chat_")) {
      try {
        const id = key.replace("chat_", "");
        const messages = JSON.parse(localStorage.getItem(key));

        if (Array.isArray(messages) && messages.length > 0) {
          const firstUserMsg = messages.find((m) => m.role === "user");
          const title = firstUserMsg
            ? firstUserMsg.content.slice(0, 40)
            : "New Conversation";

          const lastMsg = messages[messages.length - 1];
          const createdAt = lastMsg.createdAt || Date.now();

          chats.push({ id, title, createdAt });
        }
      } catch (e) {
        console.error("Failed to parse chat:", key);
      }
    }
  }

  return chats.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}
