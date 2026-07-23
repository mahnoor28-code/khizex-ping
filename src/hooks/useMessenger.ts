import { useEffect, useReducer, useRef } from "react";
import { messengerReducer, createInitialState } from "../state/messageReducer";
import type { MessengerState, MessengerAction } from "../state/messageReducer";
import { buildSeedActions } from "../data/seedMessages";

export function useMessenger(): [MessengerState, React.Dispatch<MessengerAction>] {
  const [state, dispatch] = useReducer(messengerReducer, undefined, createInitialState);
  const hasSeeded = useRef(false);

  useEffect(() => {
    // React.StrictMode intentionally mounts, cleans up, and re-mounts
    // effects once in development to surface exactly this kind of bug.
    // Without this guard, the seed actions would dispatch twice and
    // duplicate the demo conversation. This ref persists across that
    // double-invocation (refs aren't reset between it), so the second
    // run sees hasSeeded.current === true and skips.
    if (hasSeeded.current) return;
    hasSeeded.current = true;

    buildSeedActions().forEach((action) => dispatch(action));
  }, []);

  return [state, dispatch];
}
