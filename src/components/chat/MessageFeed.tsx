import React from "react";
import type { ChatMessage } from "../../types/message";
import MessageBubble from "./MessageBubble";
import { useAutoScroll } from "../../hooks/useAutoScroll";

interface MessageFeedProps {
  messages: ChatMessage[];
}

export default function MessageFeed({ messages }: MessageFeedProps): React.ReactElement {
  const { containerRef, hasNewMessages, scrollToBottom } = useAutoScroll(messages.length);

  return (
    <div className="message-feed-wrap">
      <div className="message-feed" role="log" aria-label="Conversation" ref={containerRef}>
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>
      {hasNewMessages ? (
        <button
          type="button"
          className="new-messages-affordance"
          onClick={() => scrollToBottom()}
        >
          New messages ↓
        </button>
      ) : null}
    </div>
  );
}
