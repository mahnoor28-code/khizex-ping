import React, { useState } from "react";

interface ChatInputBarProps {
  onSend: (text: string) => void;
}

export default function ChatInputBar({ onSend }: ChatInputBarProps): React.ReactElement {
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed.length === 0) return; // guard against empty/whitespace-only sends
    onSend(trimmed);
    setValue("");
  }

  return (
    <form className="chat-input-bar" onSubmit={handleSubmit}>
      <textarea
        className="chat-input-bar__textarea"
        placeholder="Type a message…"
        rows={1}
        aria-label="Message input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="chat-input-bar__send" disabled={value.trim().length === 0}>
        Send
      </button>
    </form>
  );
}
