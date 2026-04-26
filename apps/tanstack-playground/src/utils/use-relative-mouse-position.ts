import { throttle } from 'lodash-es';
import { useEffect, useMemo, useState, type RefObject } from 'react';

type MousePosition = { x: number | null; y: number | null };

export function useRelativeMousePosition<T extends HTMLElement>(
  ref: RefObject<T | null>,
  throttleDuration = 500,
): readonly [MousePosition, DOMRect | null] {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: null, y: null });
  const [boundingBox, setBoundingBox] = useState<DOMRect | null>(null);

  const getThrottledBoundingBox = useMemo(
    () =>
      throttle(() => {
        if (!ref.current) return null;
        return ref.current.getBoundingClientRect();
      }, throttleDuration),
    [ref, throttleDuration],
  );

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      const bb = getThrottledBoundingBox();
      if (!bb) return;
      setMousePosition({
        x: event.clientX - bb.left - bb.width / 2,
        y: event.clientY - bb.top - bb.height / 2,
      });
      setBoundingBox(bb);
    }
    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [getThrottledBoundingBox]);

  return [mousePosition, boundingBox] as const;
}
