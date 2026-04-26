/**
 * Two View-Transitions exercises from WHAM 03.07.03.
 *
 * Toast stack: dismissing one toast triggers VT so the surviving siblings
 * slide down rather than snap. z-index reversed so the dismissed toast
 * fades behind the kept ones, not in front.
 *
 * Action-driven dialog: cancel vs confirm pick different exit animations
 * by mutating `viewTransitionName` on the dialog right before unmount —
 * different name → different `::view-transition-old(name)` rules apply.
 *
 * Both demos: graceful fallback when `document.startViewTransition` is
 * missing OR the user prefers reduced motion (skip VT, just unmount).
 */

import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

// --------------------------------------------------------------------------
// Shared: prefers-reduced-motion hook (mirrors wipe-effects.tsx pattern)

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(query.matches);
    const handle = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    query.addEventListener('change', handle);
    return () => query.removeEventListener('change', handle);
  }, []);
  return prefersReducedMotion;
}

function startVT(callback: () => void, skip: boolean) {
  if (skip || typeof document === 'undefined' || !document.startViewTransition) {
    callback();
    return;
  }
  document.startViewTransition(() => {
    flushSync(callback);
  });
}

// --------------------------------------------------------------------------
// Demo 1 — Toast stack
// Each toast gets a unique `view-transition-name`. When one is dismissed,
// the others' positions change → VT animates the slide-down. The dismissed
// toast's old snapshot fades out via the default cross-fade.
// `isolation: isolate` + reversed z-index keeps the dismissed toast fading
// BEHIND its surviving siblings, not on top of them.

const TOAST_STACK_CSS = `
  .toast-stack {
    isolation: isolate;
  }
  .toast-stack-item {
    contain: layout;
  }
  @media (prefers-reduced-motion: reduce) {
    ::view-transition-old(*),
    ::view-transition-new(*) {
      animation: none !important;
    }
  }
`;

type Toast = { id: number; tone: 'info' | 'success' | 'warning'; title: string; body: string };

const INITIAL_TOASTS: Toast[] = [
  { id: 1, tone: 'success', title: 'Saved', body: 'Draft synced to the cloud.' },
  { id: 2, tone: 'info', title: 'New comment', body: 'Mei replied on “Q3 roadmap”.' },
  { id: 3, tone: 'warning', title: 'Low storage', body: '92% of your quota is used.' },
  { id: 4, tone: 'success', title: 'Deploy ready', body: 'Preview build passed checks.' },
];

const TONE_ICON: Record<Toast['tone'], string> = {
  success: '✓',
  info: '!',
  warning: '!',
};

const TONE_BG: Record<Toast['tone'], string> = {
  success: 'bg-emerald-500',
  info: 'bg-sky-500',
  warning: 'bg-amber-500',
};

export function ToastStack() {
  const [toasts, setToasts] = useState<Toast[]>(INITIAL_TOASTS);
  const prefersReducedMotion = usePrefersReducedMotion();

  function dismiss(id: number) {
    startVT(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, prefersReducedMotion);
  }

  function reset() {
    startVT(() => setToasts(INITIAL_TOASTS), prefersReducedMotion);
  }

  return (
    <>
      <style>{TOAST_STACK_CSS}</style>
      <div className="flex flex-col items-stretch gap-3 bg-slate-50 p-4">
        <div className="flex items-center justify-between">
          <p className="m-0 text-xs text-slate-500">
            {toasts.length === 0 ? 'All clear.' : `${toasts.length} notification${toasts.length === 1 ? '' : 's'}`}
          </p>
          <button
            type="button"
            onClick={reset}
            className="cursor-pointer rounded-md bg-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-300"
          >
            Reset
          </button>
        </div>
        <ul aria-live="polite" className="toast-stack m-0 flex list-none flex-col gap-2 p-0">
          {toasts.map((toast, index) => (
            <li
              key={toast.id}
              className="toast-stack-item relative flex items-center gap-3 rounded-md border border-slate-200 bg-white p-3 shadow-sm"
              style={{
                viewTransitionName: `toast-${toast.id}`,
                // Reverse z-index: first toast highest, last lowest.
                // So when toast N is dismissed, its fade-out happens BEHIND
                // toasts 1..N-1, instead of covering them.
                zIndex: toasts.length - index,
              }}
            >
              <span
                aria-hidden="true"
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${TONE_BG[toast.tone]}`}
              >
                {TONE_ICON[toast.tone]}
              </span>
              <div className="min-w-0 flex-1">
                <p className="m-0 text-sm font-semibold text-slate-900">{toast.title}</p>
                <p className="m-0 text-xs text-slate-500">{toast.body}</p>
              </div>
              <button
                type="button"
                aria-label={`Dismiss ${toast.title}`}
                onClick={() => dismiss(toast.id)}
                className="cursor-pointer rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <span aria-hidden="true">✕</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

// --------------------------------------------------------------------------
// Demo 2 — Action-driven dialog
// One dialog element, two exit animations. The action ("cancel" | "confirm")
// rewrites `viewTransitionName` on the dialog node moments before unmount,
// so the matching `::view-transition-old(name)` keyframes apply.
//
// Crucial: target `::view-transition-old(name)` not `::view-transition-group(name)`.
// `group` controls position/size transitions — overriding it makes the dialog
// "fly to top". We just want to replace the visual fade-out.

const DIALOG_CSS = `
  .vt-dialog {
    view-transition-name: vt-dialog;
  }
  ::view-transition-old(vt-dialog-cancel) {
    animation-name: vt-dialog-cancel;
    animation-duration: 600ms;
    animation-timing-function: cubic-bezier(0.54, -0.8, 1, 0.9);
    animation-fill-mode: forwards;
  }
  ::view-transition-old(vt-dialog-confirm) {
    animation-name: vt-dialog-confirm;
    animation-duration: 400ms;
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    animation-fill-mode: forwards;
  }
  @keyframes vt-dialog-cancel {
    to {
      filter: blur(10px);
      transform: translateY(100%) rotate(-20deg);
      opacity: 0;
    }
  }
  @keyframes vt-dialog-confirm {
    to {
      transform: translateY(100%);
      opacity: 0;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    ::view-transition-old(vt-dialog-cancel),
    ::view-transition-old(vt-dialog-confirm) {
      animation: none;
    }
  }
`;

type DialogAction = 'cancel' | 'confirm';

export function ActionDrivenDialog() {
  const [open, setOpen] = useState(false);
  const [lastAction, setLastAction] = useState<DialogAction | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  function dismiss(action: DialogAction) {
    setLastAction(action);
    const dialog = dialogRef.current;
    // Swap the view-transition-name to the per-action variant. The cross-fade
    // pseudo-element will pick up `::view-transition-old(vt-dialog-{action})`
    // rules instead of the default.
    if (dialog) {
      dialog.style.viewTransitionName = `vt-dialog-${action}`;
    }
    startVT(() => setOpen(false), prefersReducedMotion);
  }

  return (
    <>
      <style>{DIALOG_CSS}</style>
      <div className="relative flex h-72 flex-col items-center justify-center gap-3 overflow-hidden rounded-md bg-slate-900 p-6">
        <button
          type="button"
          onClick={() => setOpen(true)}
          disabled={open}
          className="cursor-pointer rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Open dialog
        </button>
        <p className="m-0 text-xs text-slate-400">
          {lastAction === 'cancel'
            ? 'Cancel: fall + rotate + blur'
            : lastAction === 'confirm'
              ? 'Confirm: slide down'
              : 'Pick an action to see the exit animation'}
        </p>

        {open && (
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="vt-dialog-title"
            className="vt-dialog absolute top-1/2 left-1/2 w-72 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-5 shadow-xl"
          >
            <h3 id="vt-dialog-title" className="m-0 text-base font-semibold text-slate-900">
              Discard draft?
            </h3>
            <p className="mt-2 mb-4 text-sm text-slate-600">
              Your unsaved changes will be lost. This can&rsquo;t be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => dismiss('cancel')}
                className="cursor-pointer rounded-md bg-rose-100 px-3 py-1.5 text-sm font-semibold text-rose-700 hover:bg-rose-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => dismiss('confirm')}
                className="cursor-pointer rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400"
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
