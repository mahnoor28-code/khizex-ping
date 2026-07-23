import React from "react";
import type { Contact } from "../../types/contact";

interface ChatHeaderProps {
  contact: Contact;
  isTyping: boolean;
}

export default function ChatHeader({ contact, isTyping }: ChatHeaderProps): React.ReactElement {
  return (
    <header className="chat-header">
      <span className="chat-header__avatar">{contact.initials}</span>
      <div>
        <p className="chat-header__name">{contact.name}</p>
        <p className="chat-header__status">
          {isTyping ? "typing…" : contact.isOnline ? "Online" : "Offline"}
        </p>
      </div>
    </header>
  );
}
