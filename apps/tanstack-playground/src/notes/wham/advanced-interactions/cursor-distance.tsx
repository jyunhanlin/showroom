import { useRef } from 'react';
import { clampedNormalize } from '~/utils/canvas';
import { useRelativeMousePosition } from '~/utils/use-relative-mouse-position';

const MAX_DISTANCE = 100;
const DEAD_ZONE = 10;

export function CursorDistanceBallSocket() {
  const socketRef = useRef<HTMLDivElement>(null);
  const [mousePosition] = useRelativeMousePosition(socketRef);

  let scale = 1;
  if (mousePosition.x !== null && mousePosition.y !== null) {
    const distance = Math.sqrt(mousePosition.x ** 2 + mousePosition.y ** 2);
    scale = clampedNormalize(distance, DEAD_ZONE, MAX_DISTANCE, 1, 0);
  }

  const hasMouse = mousePosition.x !== null;

  return (
    <div className="relative flex h-64 items-center justify-center bg-slate-50">
      <p className="absolute top-3 left-1/2 -translate-x-1/2 text-xs text-slate-500">
        {hasMouse ? `scale: ${scale.toFixed(2)}` : 'Move cursor near the socket'}
      </p>
      <div
        ref={socketRef}
        className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-200 ring-1 ring-slate-300"
      >
        <div className="h-20 w-20 rounded-full bg-amber-400 shadow-md" style={{ transform: `scale(${scale})` }} />
      </div>
    </div>
  );
}
