import type { TransportEvent, TransportEventHandler } from "./types";

const FAKE_REPLIES = [
  "That works for me!",
  "Sounds good 👍",
  "Let me check and get back to you.",
  "Haha true",
  "On my way!",
  "Can we push it to tomorrow?"
];

export interface MockWebSocketOptions {
  contactIds: string[];
  /** Range for how often a fake incoming message arrives */
  minIntervalMs?: number;
  maxIntervalMs?: number;
}

/**
 * Entirely self-contained on the client — no real backend. Exposes an
 * event-emitter-style API (`onmessage`, `open`, `close`, `send`) that
 * mirrors a real WebSocket's shape closely enough that swapping this
 * out for a real connection later would mean changing this ONE file,
 * not every component that talks to it.
 */
export class MockWebSocket {
  private handlers = new Set<TransportEventHandler>();
  private pushTimer: ReturnType<typeof setTimeout> | null = null;
  private typingTimer: ReturnType<typeof setTimeout> | null = null;
  private isOpen = false;
  private readonly contactIds: string[];
  private readonly minIntervalMs: number;
  private readonly maxIntervalMs: number;

  constructor(options: MockWebSocketOptions) {
    this.contactIds = options.contactIds;
    this.minIntervalMs = options.minIntervalMs ?? 4000;
    this.maxIntervalMs = options.maxIntervalMs ?? 9000;
  }

  /** Subscribe to events; returns an unsubscribe function. */
  onmessage(handler: TransportEventHandler): () => void {
    this.handlers.add(handler);
    return () => this.handlers.delete(handler);
  }

  private emit(event: TransportEvent): void {
    this.handlers.forEach((handler) => handler(event));
  }

  open(): void {
    if (this.isOpen) return;
    this.isOpen = true;
    this.scheduleNextIncoming();
  }

  close(): void {
    this.isOpen = false;
    if (this.pushTimer) clearTimeout(this.pushTimer);
    if (this.typingTimer) clearTimeout(this.typingTimer);
  }

  private randomInterval(): number {
    return this.minIntervalMs + Math.random() * (this.maxIntervalMs - this.minIntervalMs);
  }

  private pickRandomContact(): string {
    return this.contactIds[Math.floor(Math.random() * this.contactIds.length)];
  }

  private scheduleNextIncoming(): void {
    if (!this.isOpen) return;
    this.pushTimer = setTimeout(() => {
      this.pushIncomingMessage();
      this.scheduleNextIncoming();
    }, this.randomInterval());
  }

  /** Typing indicator fires first, then the message a beat later — mimics a real person composing a reply. */
  private pushIncomingMessage(): void {
    const contactId = this.pickRandomContact();
    this.emit({ type: "typing", payload: { contactId, isTyping: true } });

    this.typingTimer = setTimeout(
      () => {
        this.emit({ type: "typing", payload: { contactId, isTyping: false } });
        this.emit({
          type: "message",
          payload: {
            contactId,
            id: `srv-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            text: FAKE_REPLIES[Math.floor(Math.random() * FAKE_REPLIES.length)],
            timestamp: Date.now()
          }
        });
      },
      1200 + Math.random() * 1200
    );
  }

  /**
   * Simulates sending an outgoing message over the wire. Instead of
   * resolving delivery/read state instantly, it waits a realistic
   * artificial delay for each step — this is what makes the read
   * receipts in Phase 3's UI actually feel like a network round-trip.
   */
  send(contactId: string, messageId: string): void {
    const deliveredDelay = 300 + Math.random() * 600; // 300–900ms
    setTimeout(() => {
      this.emit({ type: "delivery-update", payload: { contactId, id: messageId, status: "delivered" } });

      const readDelay = 800 + Math.random() * 1500;
      setTimeout(() => {
        this.emit({ type: "delivery-update", payload: { contactId, id: messageId, status: "read" } });
      }, readDelay);
    }, deliveredDelay);
  }
}
