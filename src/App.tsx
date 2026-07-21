import React from "react";
import Sidebar from "./components/layout/Sidebar";
import ChatHeader from "./components/chat/ChatHeader";
import MessageFeed from "./components/chat/MessageFeed";
import ChatInputBar from "./components/input/ChatInputBar";
import { CONTACTS, ACTIVE_CONTACT_ID } from "./data/contacts";

export default function App(): React.ReactElement {
  const activeContact = CONTACTS.find((c) => c.id === ACTIVE_CONTACT_ID) ?? CONTACTS[0];

  return (
    <div className="app-shell">
      <Sidebar contacts={CONTACTS} activeContactId={ACTIVE_CONTACT_ID} />
      <section className="chat-window" aria-label={`Conversation with ${activeContact.name}`}>
        <ChatHeader contact={activeContact} />
        <MessageFeed />
        <ChatInputBar />
      </section>
    </div>
  );
}
