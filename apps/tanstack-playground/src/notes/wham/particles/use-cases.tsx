import { useState } from 'react';

const COLOR = 'oklch(0.7 0.18 200)';

export function UseCaseSpinner() {
  return (
    <div className="flex flex-col items-center gap-2">
      <style>{`
        @keyframes wham-uc-spin { to { transform: rotate(360deg) } }
      `}</style>
      <div className="rounded-md bg-slate-900 p-4">
        <div
          className="h-10 w-10 rounded-full border-4 border-slate-700"
          style={{
            borderTopColor: COLOR,
            animation: 'wham-uc-spin 750ms linear infinite',
          }}
        />
      </div>
      <p className="font-mono text-xs text-gray-500">linear · `spin 750ms linear infinite`</p>
    </div>
  );
}

export function UseCaseExit() {
  const [runId, setRunId] = useState(0);
  return (
    <div className="flex flex-col items-center gap-2">
      <style>{`
        @keyframes wham-uc-runAway { to { transform: translateX(180px); opacity: 0 } }
      `}</style>
      <div className="overflow-hidden rounded-md bg-slate-900 p-4" style={{ width: 240 }}>
        <div
          key={runId}
          className="h-10 w-10 rounded-full"
          style={{
            backgroundColor: COLOR,
            animation: 'wham-uc-runAway 500ms ease-in forwards',
          }}
        />
      </div>
      <button
        type="button"
        onClick={() => setRunId((id) => id + 1)}
        className="rounded bg-slate-800 px-3 py-1 font-mono text-xs text-white hover:bg-slate-700"
      >
        replay · ease-in
      </button>
    </div>
  );
}

export function UseCaseEnter() {
  const [runId, setRunId] = useState(0);
  return (
    <div className="flex flex-col items-center gap-2">
      <style>{`
        @keyframes wham-uc-enter { from { transform: translateX(-180px); opacity: 0 } }
      `}</style>
      <div className="overflow-hidden rounded-md bg-slate-900 p-4" style={{ width: 240 }}>
        <div
          key={runId}
          className="h-10 w-10 rounded-full"
          style={{
            backgroundColor: COLOR,
            animation: 'wham-uc-enter 500ms ease-out',
          }}
        />
      </div>
      <button
        type="button"
        onClick={() => setRunId((id) => id + 1)}
        className="rounded bg-slate-800 px-3 py-1 font-mono text-xs text-white hover:bg-slate-700"
      >
        replay · ease-out
      </button>
    </div>
  );
}

export function UseCaseOscillate() {
  return (
    <div className="flex flex-col items-center gap-2">
      <style>{`
        @keyframes wham-uc-oscillate { to { transform: translateX(180px) } }
      `}</style>
      <div className="rounded-md bg-slate-900 p-4" style={{ width: 240 }}>
        <div
          className="h-10 w-10 rounded-full"
          style={{
            backgroundColor: COLOR,
            animation: 'wham-uc-oscillate 1500ms ease-in-out infinite alternate',
          }}
        />
      </div>
      <p className="font-mono text-xs text-gray-500">ease-in-out · alternate infinite</p>
    </div>
  );
}

export function UseCaseToggle() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="rounded-md bg-slate-900 p-4" style={{ width: 240 }}>
        <div
          className="h-10 w-10 rounded-full"
          style={{
            backgroundColor: COLOR,
            transform: `translateX(${open ? 180 : 0}px)`,
            transition: 'transform 500ms ease',
          }}
        />
      </div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded bg-slate-800 px-3 py-1 font-mono text-xs text-white hover:bg-slate-700"
      >
        toggle · ease (default)
      </button>
    </div>
  );
}
