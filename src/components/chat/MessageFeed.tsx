import React from "react";
import type { ChatMessage } from "../../types/message";
import MessageBubble from "./MessageBubble";

interface MessageFeedProps {
  messages: ChatMessage[];
}

export default function MessageFeed({ messages }: MessageFeedProps): React.ReactElement {
  return (
    <div className="message-feed" role="log" aria-label="Conversation">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
}
