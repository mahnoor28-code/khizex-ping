import React from "react";

interface MessageBubbleProps {
  text: string;
  isOwn: boolean;
  time: string;
}

/**
 * Phase 2: purely presentational, fed static dummy props. From Phase 3
 * onward this renders real messages coming out of the reducer, plus a
 * read-receipt indicator (sent/delivered/read) for own messages.
 */
export default function MessageBubble({ text, isOwn, time }: MessageBubbleProps): React.ReactElement {
  return (
    <div className={`message-bubble${isOwn ? " message-bubble--own" : ""}`}>
      <p className="message-bubble__text">{text}</p>
      <span className="message-bubble__time">{time}</span>
    </div>
  );
}
