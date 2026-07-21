import React from "react";
import type { Contact } from "../../types/contact";

interface SidebarProps {
  contacts: Contact[];
  activeContactId: string;
}

export default function Sidebar({ contacts, activeContactId }: SidebarProps): React.ReactElement {
  return (
    <nav className="sidebar" aria-label="Conversations">
      <div className="sidebar__header">
        <span className="sidebar__title">Ping</span>
      </div>
      <ul className="sidebar__list">
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              type="button"
              className={`sidebar__contact${contact.id === activeContactId ? " sidebar__contact--active" : ""}`}
              aria-current={contact.id === activeContactId ? "true" : undefined}
            >
              <span className="sidebar__avatar">
                {contact.initials}
                {contact.isOnline ? <span className="sidebar__online-dot" aria-hidden="true" /> : null}
              </span>
              <span className="sidebar__contact-text">
                <span className="sidebar__contact-name">{contact.name}</span>
                <span className="sidebar__contact-preview">{contact.lastMessagePreview}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
