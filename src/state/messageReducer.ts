import type { ChatMessage, MessageStatus } from "../types/message";

export interface MessengerState {
  messagesByContact: Record<string, ChatMessage[]>;
  typingByContact: Record<string, boolean>;
}

/**
 * Every state change goes through one of these — a discriminated union
 * keyed on `type`, same pattern as the message shape above. Adding a
 * new kind of state change later (Phase 8's typing indicator, Phase 7's
 * status progression) means adding one more case here, not scattering
 * `setState` calls across components.
 */
export type MessengerAction =
  | { type: "SEND_MESSAGE"; payload: { contactId: string; id: string; text: string; timestamp: number } }
  | { type: "RECEIVE_MESSAGE"; payload: { contactId: string; id: string; text: string; timestamp: number } }
  | { type: "UPDATE_STATUS"; payload: { contactId: string; id: string; status: MessageStatus } }
  | { type: "SET_TYPING"; payload: { contactId: string; isTyping: boolean } };

export function messengerReducer(state: MessengerState, action: MessengerAction): MessengerState {
  switch (action.type) {
    case "SEND_MESSAGE": {
      const { contactId, id, text, timestamp } = action.payload;
      const newMessage: ChatMessage = {
        id,
        contactId,
        text,
        timestamp,
        direction: "outgoing",
        status: "sent"
      };
      const existing = state.messagesByContact[contactId] ?? [];
      return {
        ...state,
        messagesByContact: {
          ...state.messagesByContact,
          [contactId]: [...existing, newMessage]
        }
      };
    }

    case "RECEIVE_MESSAGE": {
      const { contactId, id, text, timestamp } = action.payload;
      const newMessage: ChatMessage = {
        id,
        contactId,
        text,
        timestamp,
        direction: "incoming"
      };
      const existing = state.messagesByContact[contactId] ?? [];
      return {
        ...state,
        messagesByContact: {
          ...state.messagesByContact,
          [contactId]: [...existing, newMessage]
        }
      };
    }

    case "UPDATE_STATUS": {
      const { contactId, id, status } = action.payload;
      const existing = state.messagesByContact[contactId] ?? [];
      return {
        ...state,
        messagesByContact: {
          ...state.messagesByContact,
          [contactId]: existing.map((msg) =>
            msg.id === id && msg.direction === "outgoing" ? { ...msg, status } : msg
          )
        }
      };
    }

    case "SET_TYPING": {
      const { contactId, isTyping } = action.payload;
      return {
        ...state,
        typingByContact: {
          ...state.typingByContact,
          [contactId]: isTyping
        }
      };
    }

    default: {
      const _exhaustive: never = action;
      return _exhaustive;
    }
  }
}

export function createInitialState(): MessengerState {
  return { messagesByContact: {}, typingByContact: {} };
}
