import { motion } from 'motion/react';
import { useState } from 'react';

const SPRING = { type: 'spring', stiffness: 200, damping: 40 } as const;

function ToggleButton({ isMaximized, onClick }: { isMaximized: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="self-center rounded-md bg-slate-200 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
    >
      {isMaximized ? 'Minimize' : 'Maximize'}
    </button>
  );
}

const wrapperBase =
  'flex items-start justify-center rounded-md bg-emerald-400 p-3 text-base font-semibold text-emerald-950';
const wrapperMinimized = 'm-3 h-24 w-32';
const wrapperMaximized = 'absolute inset-3';

export function LayoutMaximize() {
  const [isMaximized, setIsMaximized] = useState(false);
  const wrapperClass = `${wrapperBase} ${isMaximized ? wrapperMaximized : wrapperMinimized}`;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <figure className="m-0 flex flex-col gap-2">
          <div className="relative h-[260px] w-full overflow-hidden rounded-md bg-slate-900">
            <motion.div layout transition={SPRING} className={wrapperClass}>
              Hello world
            </motion.div>
          </div>
          <figcaption className="text-center text-sm text-slate-300">No nested fix — text warps</figcaption>
        </figure>
        <figure className="m-0 flex flex-col gap-2">
          <div className="relative h-[260px] w-full overflow-hidden rounded-md bg-slate-900">
            <motion.div layout transition={SPRING} className={wrapperClass}>
              <motion.p layout="position" transition={SPRING} className="m-0">
                Hello world
              </motion.p>
            </motion.div>
          </div>
          <figcaption className="text-center text-sm text-slate-300">Nested motion.p — clean</figcaption>
        </figure>
      </div>
      <ToggleButton isMaximized={isMaximized} onClick={() => setIsMaximized(!isMaximized)} />
    </div>
  );
}

type ColorItem = { id: string; label: string; bg: string; text: string };

const COLOR_ITEMS: ColorItem[] = [
  { id: 'sun', label: 'Sun', bg: 'bg-amber-400', text: 'text-amber-950' },
  { id: 'sea', label: 'Sea', bg: 'bg-cyan-400', text: 'text-cyan-950' },
  { id: 'moss', label: 'Moss', bg: 'bg-emerald-400', text: 'text-emerald-950' },
  { id: 'berry', label: 'Berry', bg: 'bg-fuchsia-400', text: 'text-fuchsia-950' },
  { id: 'sky', label: 'Sky', bg: 'bg-sky-400', text: 'text-sky-950' },
];

function MoveButton({
  direction,
  disabled,
  onClick,
}: {
  direction: 'up' | 'down';
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="rounded bg-white/30 px-2 py-1 text-xs font-medium text-current transition hover:bg-white/50 disabled:cursor-not-allowed disabled:opacity-30"
      aria-label={direction === 'up' ? 'Move up' : 'Move down'}
    >
      {direction === 'up' ? '↑' : '↓'}
    </button>
  );
}

export function LayoutReorder() {
  const [items, setItems] = useState<ColorItem[]>(COLOR_ITEMS);

  function swap(i: number, j: number) {
    const next = [...items];
    [next[i], next[j]] = [next[j]!, next[i]!];
    setItems(next);
  }

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          layout
          transition={SPRING}
          className={`flex items-center justify-between rounded-md px-4 py-3 font-semibold ${item.bg} ${item.text}`}
        >
          <span>{item.label}</span>
          <div className="flex gap-1">
            <MoveButton direction="up" disabled={index === 0} onClick={() => swap(index - 1, index)} />
            <MoveButton direction="down" disabled={index === items.length - 1} onClick={() => swap(index, index + 1)} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
