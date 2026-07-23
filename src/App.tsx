import React from "react";
import Sidebar from "./components/layout/Sidebar";
import ChatHeader from "./components/chat/ChatHeader";
import MessageFeed from "./components/chat/MessageFeed";
import ChatInputBar from "./components/input/ChatInputBar";
import { CONTACTS, ACTIVE_CONTACT_ID } from "./data/contacts";
import { useMessenger } from "./hooks/useMessenger";
import { useMockTransport } from "./hooks/useMockTransport";

export default function App(): React.ReactElement {
  const activeContact = CONTACTS.find((c) => c.id === ACTIVE_CONTACT_ID) ?? CONTACTS[0];
  const [state, dispatch] = useMessenger();
  const socketRef = useMockTransport(dispatch);
  const messages = state.messagesByContact[activeContact.id] ?? [];
  const isContactTyping = state.typingByContact[activeContact.id] ?? false;

  function handleSend(text: string): void {
    const id = `local-${Date.now()}`;
    dispatch({
      type: "SEND_MESSAGE",
      payload: { contactId: activeContact.id, id, text, timestamp: Date.now() }
    });
    // Hand off to the mock transport to resolve delivered -> read over
    // a realistic delay, instead of updating status instantly.
    socketRef.current?.send(activeContact.id, id);
  }

  return (
    <div className="app-shell">
      <Sidebar contacts={CONTACTS} activeContactId={ACTIVE_CONTACT_ID} />
      <section className="chat-window" aria-label={`Conversation with ${activeContact.name}`}>
        <ChatHeader contact={activeContact} isTyping={isContactTyping} />
        <MessageFeed messages={messages} />
        <ChatInputBar onSend={handleSend} />
      </section>
    </div>
  );
}
