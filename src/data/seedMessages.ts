import type { MessengerAction } from "../state/messageReducer";
import { ACTIVE_CONTACT_ID } from "./contacts";

/**
 * Same conversation that was hardcoded directly into MessageFeed back
 * in Phase 2 — now expressed as a sequence of actions dispatched
 * through the real reducer, so the UI is reading from actual state
 * instead of static props.
 */
export function buildSeedActions(): MessengerAction[] {
  const base = Date.now() - 1000 * 60 * 30; // 30 minutes ago

  return [
    {
      type: "RECEIVE_MESSAGE",
      payload: { contactId: ACTIVE_CONTACT_ID, id: "seed-1", text: "Hey! Are we still on for Friday?", timestamp: base }
    },
    {
      type: "SEND_MESSAGE",
      payload: { contactId: ACTIVE_CONTACT_ID, id: "seed-2", text: "Yes, definitely 🙌", timestamp: base + 60_000 }
    },
    {
      type: "UPDATE_STATUS",
      payload: { contactId: ACTIVE_CONTACT_ID, id: "seed-2", status: "read" }
    },
    {
      type: "RECEIVE_MESSAGE",
      payload: { contactId: ACTIVE_CONTACT_ID, id: "seed-3", text: "Great, see you then!", timestamp: base + 90_000 }
    }
  ];
}
