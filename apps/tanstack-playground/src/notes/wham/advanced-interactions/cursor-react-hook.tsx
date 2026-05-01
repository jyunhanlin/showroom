import { useRef } from 'react';
import { clampedNormalize } from '~/utils/canvas';
import { useRelativeMousePosition } from '~/utils/use-relative-mouse-position';

const COLOR = 'oklch(0.7 0.2 200)';

export function HookDebugDisplay() {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, box] = useRelativeMousePosition(ref);

  return (
    <div className="flex flex-col items-center gap-3">
      <div ref={ref} className="flex h-48 w-72 items-center justify-center rounded-md bg-slate-900">
        <div className="text-center font-mono text-xs text-gray-500">aim within</div>
      </div>
      <div className="grid w-full max-w-md grid-cols-1 gap-2 sm:grid-cols-2">
        <div className="rounded bg-slate-100 p-2 font-mono text-xs">
          <div className="font-bold">mouse 相對中心</div>
          <div>x: {mouse.x?.toFixed(0) ?? 'null'}</div>
          <div>y: {mouse.y?.toFixed(0) ?? 'null'}</div>
        </div>
        <div className="rounded bg-slate-100 p-2 font-mono text-xs">
          <div className="font-bold">bounding box</div>
          <div>w: {box?.width.toFixed(0) ?? 'null'}</div>
          <div>h: {box?.height.toFixed(0) ?? 'null'}</div>
          <div>top: {box?.top.toFixed(0) ?? 'null'}</div>
          <div>left: {box?.left.toFixed(0) ?? 'null'}</div>
        </div>
      </div>
    </div>
  );
}

export function HookFollowingBall() {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, box] = useRelativeMousePosition(ref, 250);

  const halfW = (box?.width ?? 0) / 2;
  const halfH = (box?.height ?? 0) / 2;

  const distance = mouse.x !== null && mouse.y !== null ? Math.sqrt(mouse.x * mouse.x + mouse.y * mouse.y) : 0;
  const scale = clampedNormalize(distance, 0, Math.min(halfW, halfH), 1.4, 0.8);

  const offsetX = mouse.x !== null ? Math.max(-halfW + 32, Math.min(halfW - 32, mouse.x)) : 0;
  const offsetY = mouse.y !== null ? Math.max(-halfH + 32, Math.min(halfH - 32, mouse.y)) : 0;

  return (
    <div className="flex flex-col items-center gap-3">
      <div ref={ref} className="relative flex h-48 w-72 items-center justify-center rounded-md bg-slate-900">
        <div
          className="absolute h-12 w-12 rounded-full transition-transform"
          style={{
            backgroundColor: COLOR,
            transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale.toFixed(2)})`,
          }}
        />
      </div>
      <p className="text-xs text-gray-500">
        ball 跟隨滑鼠相對位置;遠離中心會縮小。`useRelativeMousePosition` 自動處理 throttle / cleanup。
      </p>
    </div>
  );
}
