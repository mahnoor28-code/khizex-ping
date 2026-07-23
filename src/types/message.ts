export type MessageStatus = "sent" | "delivered" | "read";

interface BaseMessage {
  id: string;
  contactId: string;
  text: string;
  /** epoch milliseconds — kept as a number, not a Date, so messages stay
   * plain-serializable (matters once the mock transport starts "sending"
   * these across an event-emitter boundary in Phase 4). */
  timestamp: number;
}

/**
 * Discriminated union on `direction`. Only an OUTGOING message carries a
 * `status` — an incoming message doesn't have a sent/delivered/read
 * lifecycle from this client's point of view, it's just received. This
 * makes `incomingMessage.status` a compile-time error rather than an
 * `undefined` runtime bug.
 */
export type ChatMessage =
  | (BaseMessage & { direction: "outgoing"; status: MessageStatus })
  | (BaseMessage & { direction: "incoming" });
