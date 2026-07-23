export type TransportEvent =
  | { type: "message"; payload: { contactId: string; id: string; text: string; timestamp: number } }
  | { type: "delivery-update"; payload: { contactId: string; id: string; status: "delivered" | "read" } }
  | { type: "typing"; payload: { contactId: string; isTyping: boolean } };

export type TransportEventHandler = (event: TransportEvent) => void;
