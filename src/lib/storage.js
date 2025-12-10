export function getChatHistory() {
  if (typeof window === "undefined") return [];

  const chats = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;

    if (!key.startsWith("chat_") || key.startsWith("chat_title_")) {
      continue;
    }

    try {
      const id = key.replace("chat_", "");
      const messages = JSON.parse(localStorage.getItem(key));

      if (Array.isArray(messages) && messages.length > 0) {
        const firstUserMsg = messages.find((m) => m.role === "user");

        const customTitle = localStorage.getItem(`chat_title_${id}`);

        let title = customTitle;
        if (!title) {
          title = firstUserMsg
            ? firstUserMsg.content.slice(0, 40)
            : "New Conversation";
        }

        const lastMsg = messages[messages.length - 1];
        const createdAt = lastMsg.createdAt || Date.now();

        chats.push({ id, title, createdAt });
      }
    } catch (e) {
      console.error("Failed to parse chat:", key);
    }
  }

  return chats.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function deleteChat(id) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(`chat_${id}`);
  localStorage.removeItem(`chat_title_${id}`);
}

export function clearAllChats() {
  if (typeof window === "undefined") return;

  const keysToRemove = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;

    if (key.startsWith("chat_") || key.startsWith("chat_title_")) {
      keysToRemove.push(key);
    }
  }

  keysToRemove.forEach((key) => localStorage.removeItem(key));
}

export function renameChat(id, newTitle) {
  if (typeof window === "undefined") return;

  const trimmed = newTitle.trim();
  if (!trimmed) {
    localStorage.removeItem(`chat_title_${id}`);
  } else {
    localStorage.setItem(`chat_title_${id}`, trimmed);
  }
}
