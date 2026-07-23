import React from "react";
import type { ChatMessage, MessageStatus } from "../../types/message";

interface MessageBubbleProps {
  message: ChatMessage;
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/** ✓ sent, ✓✓ delivered, ✓✓ (colored) read — classic messaging-app convention */
function StatusTicks({ status }: { status: MessageStatus }): React.ReactElement {
  if (status === "sent") return <span className="message-bubble__ticks">✓</span>;
  if (status === "delivered") return <span className="message-bubble__ticks">✓✓</span>;
  return <span className="message-bubble__ticks message-bubble__ticks--read">✓✓</span>;
}

export default function MessageBubble({ message }: MessageBubbleProps): React.ReactElement {
  const isOwn = message.direction === "outgoing";

  return (
    <div className={`message-bubble${isOwn ? " message-bubble--own" : ""}`}>
      <p className="message-bubble__text">{message.text}</p>
      <span className="message-bubble__time">
        {formatTime(message.timestamp)}
        {message.direction === "outgoing" ? <StatusTicks status={message.status} /> : null}
      </span>
    </div>
  );
}
