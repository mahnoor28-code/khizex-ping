import { useEffect, useRef } from "react";
import type { Dispatch, RefObject } from "react";
import { MockWebSocket } from "../transport/mockWebSocket";
import type { MessengerAction } from "../state/messageReducer";
import { CONTACTS } from "../data/contacts";

/**
 * Mounts one MockWebSocket for the whole app's lifetime, translates its
 * transport-level events into reducer actions, and returns a ref to the
 * socket itself so components (the input bar's send handler) can call
 * `.send()` on it directly.
 */
export function useMockTransport(dispatch: Dispatch<MessengerAction>): RefObject<MockWebSocket | null> {
  const socketRef = useRef<MockWebSocket | null>(null);

  useEffect(() => {
    const socket = new MockWebSocket({ contactIds: CONTACTS.map((c) => c.id) });
    socketRef.current = socket;

    const unsubscribe = socket.onmessage((event) => {
      switch (event.type) {
        case "message":
          dispatch({ type: "RECEIVE_MESSAGE", payload: event.payload });
          return;
        case "delivery-update":
          dispatch({ type: "UPDATE_STATUS", payload: event.payload });
          return;
        case "typing":
          dispatch({ type: "SET_TYPING", payload: event.payload });
          return;
        default: {
          const _exhaustive: never = event;
          void _exhaustive;
        }
      }
    });

    socket.open();

    return () => {
      unsubscribe();
      socket.close();
    };
  }, [dispatch]);

  return socketRef;
}
