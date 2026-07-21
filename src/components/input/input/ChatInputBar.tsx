import React from "react";

/**
 * Phase 2: static shell only. Auto-expanding behavior, Enter/Shift+Enter
 * handling, and actually sending messages are built in Phase 9 — for
 * now this just proves the layout has a proper input bar at the bottom.
 */
export default function ChatInputBar(): React.ReactElement {
  return (
    <form className="chat-input-bar" onSubmit={(e) => e.preventDefault()}>
      <textarea
        className="chat-input-bar__textarea"
        placeholder="Type a message…"
        rows={1}
        aria-label="Message input"
      />
      <button type="submit" className="chat-input-bar__send">
        Send
      </button>
    </form>
  );
}
