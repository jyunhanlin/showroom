import { animated, useSpring, useTrail } from '@react-spring/web';
import { random } from 'lodash-es';
import { useState } from 'react';

const COLOR = 'oklch(0.7 0.2 30)';

export function PathSpringDemo() {
  const [hover, setHover] = useState(false);

  const spring = useSpring({
    d: hover ? 'M 4,16 Q 16,28 28,16' : 'M 4,16 Q 16,16 28,16',
    config: { tension: 250, friction: hover ? 28 : 6 },
  });

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        className="flex h-20 w-32 items-center justify-center rounded-md bg-slate-900 hover:bg-slate-800"
      >
        <svg viewBox="0 0 32 32" width={80} height={80}>
          <animated.path d={spring.d} fill="none" stroke={COLOR} strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <p className="text-xs text-gray-500">react-spring 把 friction 釘小,放開時會多彈兩下;hover 時切大值穩定。</p>
    </div>
  );
}

export function NumberRollSpring() {
  const [target, setTarget] = useState(50);

  const spring = useSpring({
    value: target,
    config: { tension: 150, friction: 50 },
  });

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={() => setTarget(random(0, 100))}
        className="flex h-20 w-32 items-center justify-center rounded-md bg-slate-900 hover:bg-slate-800"
      >
        <animated.span style={{ color: COLOR, fontFamily: 'monospace', fontSize: '2rem' }}>
          {spring.value.to((v) => Math.round(v).toString())}
        </animated.span>
      </button>
      <p className="text-xs text-gray-500">點按鈕跳到隨機數字;`spring.value.to(round)` 取出當下插值。</p>
    </div>
  );
}

export function ClampToggleDemo() {
  const [open, setOpen] = useState(false);
  const [clampOn, setClampOn] = useState(true);

  const spring = useSpring({
    transform: `scale(${open ? 1 : 0})`,
    config: { tension: 250, friction: 10, clamp: clampOn && !open },
  });

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex h-32 w-32 items-center justify-center rounded-md bg-slate-900">
        <animated.div
          style={{
            ...spring,
            width: 80,
            height: 80,
            backgroundColor: COLOR,
            borderRadius: 12,
          }}
        />
      </div>
      <div className="flex gap-2 font-mono text-sm">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded bg-slate-800 px-3 py-1 text-white hover:bg-slate-700"
        >
          {open ? 'hide' : 'show'}
        </button>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={clampOn} onChange={(e) => setClampOn(e.target.checked)} />
          dismiss 時 clamp
        </label>
      </div>
      <p className="text-xs text-gray-500">沒 clamp 時,scale 會穿過 0 變負(看到 box 翻面)。clamp 把消失動畫鎖在 0。</p>
    </div>
  );
}

export function TrailDemo() {
  const [up, setUp] = useState(false);

  const trails = useTrail(5, {
    transform: `translateY(${up ? -36 : 0}px)`,
    config: { tension: 250, friction: up ? 10 : 30 },
  });

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex h-24 items-end gap-2 rounded-md bg-slate-900 p-3">
        {trails.map((style, i) => (
          <animated.div key={i} style={{ ...style, width: 24, height: 24, borderRadius: 12, backgroundColor: COLOR }} />
        ))}
      </div>
      <button
        type="button"
        onClick={() => setUp((v) => !v)}
        className="rounded bg-slate-800 px-3 py-1 font-mono text-sm text-white hover:bg-slate-700"
      >
        toggle
      </button>
      <p className="text-xs text-gray-500">`useTrail(N, ...)` 自動把 N 個 spring 串起來,每個比前一個慢一點。</p>
    </div>
  );
}
