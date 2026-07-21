import React from "react";
import MessageBubble from "./MessageBubble";

const DUMMY_MESSAGES = [
  { id: "1", text: "Hey! Are we still on for Friday?", isOwn: false, time: "10:02 AM" },
  { id: "2", text: "Yes, definitely 🙌", isOwn: true, time: "10:03 AM" },
  { id: "3", text: "Great, see you then!", isOwn: false, time: "10:03 AM" }
];

/**
 * Phase 2: static dummy conversation, just to prove the layout works.
 * Phase 3+ replaces this with the real reducer-driven message list, the
 * mock transport, auto-scroll logic, and typing indicators.
 */
export default function MessageFeed(): React.ReactElement {
  return (
    <div className="message-feed" role="log" aria-label="Conversation">
      {DUMMY_MESSAGES.map((msg) => (
        <MessageBubble key={msg.id} text={msg.text} isOwn={msg.isOwn} time={msg.time} />
      ))}
    </div>
  );
}
