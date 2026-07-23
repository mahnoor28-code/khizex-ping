import { useCallback, useEffect, useRef, useState } from "react";

const NEAR_BOTTOM_THRESHOLD_PX = 80;

export interface AutoScrollControls {
  containerRef: React.RefObject<HTMLDivElement>;
  hasNewMessages: boolean;
  scrollToBottom: (behavior?: ScrollBehavior) => void;
}

/**
 * `messageCount` is passed in (rather than the message array itself) as
 * the effect dependency — a plain number is a cheap comparison on every
 * render, and it's all this hook actually needs to know: "did a message
 * just get added."
 */
export function useAutoScroll(messageCount: number): AutoScrollControls {
  const containerRef = useRef<HTMLDivElement>(null);
  // A ref (not state) for "is the user near the bottom right now" —
  // this gets read inside a scroll handler that fires very frequently;
  // routing it through setState would trigger unnecessary re-renders on
  // every scroll pixel.
  const isNearBottomRef = useRef(true);
  const [hasNewMessages, setHasNewMessages] = useState(false);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
    isNearBottomRef.current = true;
    setHasNewMessages(false);
  }, []);

  // Track the user's own scroll position as they manually scroll.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function handleScroll(): void {
      if (!el) return;
      const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
      const nearBottom = distanceFromBottom < NEAR_BOTTOM_THRESHOLD_PX;
      isNearBottomRef.current = nearBottom;
      if (nearBottom) setHasNewMessages(false);
    }

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // Whenever the message count changes (sent OR received), decide:
  // auto-scroll if the user was already at the bottom, otherwise just
  // surface the "new messages" affordance instead of yanking them down.
  useEffect(() => {
    if (messageCount === 0) return;
    if (isNearBottomRef.current) {
      scrollToBottom("smooth");
    } else {
      setHasNewMessages(true);
    }
  }, [messageCount, scrollToBottom]);

  return { containerRef, hasNewMessages, scrollToBottom };
}
