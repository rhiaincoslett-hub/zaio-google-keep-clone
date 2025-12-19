function id() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

export function createNote({ title, body, reminder = null, now = Date.now() }) {
  return {
    id: id(),
    title,
    body,
    pinned: false,
    reminder,
    createdAt: now,
    updatedAt: now
  };
}


