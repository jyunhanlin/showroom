/**
 * View Transitions API demos for both VT notes in this chapter:
 * - `view-transitions.mdx` uses `VtWordShuffle` and `VtSlideshow`
 * - `view-transition-actions.mdx` uses `ToastStack` and `ActionDrivenDialog`
 *
 * Both demo sets live in this single file on purpose. `flushSync` (`react-dom`)
 * is wrapped by rolldown as a CJS factory; if 2+ note chunks each statically
 * import it, rolldown hoists the factory into the shared `index` chunk. That
 * collides with the registry's eager MDX glob (index → note-chunk for
 * `frontmatter`) → ESM cycle → the note chunk's top-level `h = o()` runs
 * against an uninitialised binding and throws `TypeError: o is not a function`.
 * Keeping every `flushSync` user in one .tsx keeps it as a single consumer,
 * which rolldown then inlines into this chunk — no shared factory, no cycle.
 *
 * `document.startViewTransition(cb)` snapshots the page → runs cb (DOM mutation)
 * → snapshots again → cross-fades or runs custom keyframes between old/new.
 *
 * React state updates are async, so we need `flushSync` from react-dom inside
 * the VT callback — otherwise the browser snapshots the UI BEFORE React has
 * committed the new state, and we get a no-op transition.
 *
 * Custom keyframes can't go in inline style — they live in a `<style>` block
 * scoped by a unique class name (one demo wires its own slideshow CSS).
 */

import { shuffle } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

const WORDS = [
  'Aurora',
  'Bloom',
  'Tide',
  'Ember',
  'Drift',
  'Glow',
  'Hush',
  'Ivy',
  'Lantern',
  'Marrow',
  'Nimbus',
  'Onyx',
  'Pearl',
  'Quartz',
  'Reverie',
  'Sable',
];

const TILE_PALETTE = [
  'bg-cyan-500 text-cyan-50',
  'bg-rose-500 text-rose-50',
  'bg-amber-500 text-amber-50',
  'bg-violet-500 text-violet-50',
  'bg-emerald-500 text-emerald-50',
  'bg-sky-500 text-sky-50',
  'bg-orange-500 text-orange-50',
  'bg-pink-500 text-pink-50',
];

const SHUFFLE_CSS = `
  /* Each tile gets a unique view-transition-name via match-element keyword,
     plus a shared class so we can style ALL of them at once.            */
  .vt-shuffle-tile {
    view-transition-name: match-element;
    view-transition-class: vt-shuffle-tile;
  }
  ::view-transition-group(.vt-shuffle-tile) {
    animation-duration: 600ms;
    animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
  }
  @media (prefers-reduced-motion: reduce) {
    ::view-transition-group(.vt-shuffle-tile),
    ::view-transition-old(.vt-shuffle-tile),
    ::view-transition-new(.vt-shuffle-tile) {
      animation: none !important;
    }
  }
`;

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function supportsViewTransitions() {
  return typeof document !== 'undefined' && 'startViewTransition' in document;
}

export function VtWordShuffle() {
  const [words, setWords] = useState(WORDS);
  const [useVt, setUseVt] = useState(true);

  function applyShuffle() {
    setWords((prev) => shuffle(prev));
  }

  function handleShuffle() {
    if (!useVt || !supportsViewTransitions() || prefersReducedMotion()) {
      applyShuffle();
      return;
    }
    document.startViewTransition(() => {
      // flushSync is the load-bearing line: VT needs the DOM mutation to be
      // synchronous so the post-snapshot captures the new state.
      flushSync(() => applyShuffle());
    });
  }

  return (
    <div className="flex flex-col gap-3 bg-slate-50 p-4">
      <style>{SHUFFLE_CSS}</style>
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs text-slate-600">
          <input
            type="checkbox"
            checked={useVt}
            onChange={(event) => setUseVt(event.target.checked)}
            className="h-3.5 w-3.5"
          />
          Use <code className="rounded bg-slate-200 px-1">startViewTransition</code>
        </label>
        <button
          type="button"
          onClick={handleShuffle}
          className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Shuffle
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {words.map((word, index) => (
          <div
            key={word}
            className={`vt-shuffle-tile flex h-16 items-center justify-center rounded-md text-sm font-semibold shadow-sm ${TILE_PALETTE[index % TILE_PALETTE.length]}`}
          >
            {word}
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500">
        Toggle off to see the snap-without-VT baseline. With VT on, browser auto-generates
        <code className="mx-1 rounded bg-slate-200 px-1">transform: matrix()</code> keyframes that slide each tile from
        its old box to its new one.
      </p>
    </div>
  );
}

type Slide = {
  id: string;
  label: string;
  caption: string;
  gradient: string;
};

const SLIDES: Slide[] = [
  {
    id: 'aurora',
    label: 'Aurora',
    caption: 'Polar light painted on a winter sky.',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)',
  },
  {
    id: 'bloom',
    label: 'Bloom',
    caption: 'First color after the thaw.',
    gradient: 'linear-gradient(135deg, #f43f5e 0%, #f59e0b 100%)',
  },
  {
    id: 'tide',
    label: 'Tide',
    caption: 'The moon pulling the shoreline back and forth.',
    gradient: 'linear-gradient(135deg, #1d4ed8 0%, #0f766e 100%)',
  },
  {
    id: 'ember',
    label: 'Ember',
    caption: 'Held warmth before the dark settles in.',
    gradient: 'linear-gradient(135deg, #ea580c 0%, #b91c1c 100%)',
  },
  {
    id: 'quartz',
    label: 'Quartz',
    caption: 'Crystal clarity carved out of stone.',
    gradient: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
  },
];

const SLIDESHOW_CSS = `
  .vt-slideshow-slide {
    view-transition-name: vt-slideshow;
  }
  ::view-transition-old(vt-slideshow) {
    animation: 450ms cubic-bezier(0.65, 0, 0.35, 1) both vt-slideshow-exit-left;
  }
  ::view-transition-new(vt-slideshow) {
    animation: 450ms cubic-bezier(0.65, 0, 0.35, 1) both vt-slideshow-enter-right;
  }
  .vt-slideshow-back ::view-transition-old(vt-slideshow) {
    animation-name: vt-slideshow-exit-right;
  }
  .vt-slideshow-back ::view-transition-new(vt-slideshow) {
    animation-name: vt-slideshow-enter-left;
  }
  @keyframes vt-slideshow-exit-left {
    to { transform: translateX(-100%); opacity: 0; }
  }
  @keyframes vt-slideshow-enter-right {
    from { transform: translateX(100%); opacity: 0; }
  }
  @keyframes vt-slideshow-exit-right {
    to { transform: translateX(100%); opacity: 0; }
  }
  @keyframes vt-slideshow-enter-left {
    from { transform: translateX(-100%); opacity: 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    ::view-transition-old(vt-slideshow),
    ::view-transition-new(vt-slideshow) {
      animation: none !important;
    }
  }
`;

export function VtSlideshow() {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];

  function go(delta: number) {
    const next = (index + delta + SLIDES.length) % SLIDES.length;
    if (!supportsViewTransitions() || prefersReducedMotion()) {
      setIndex(next);
      return;
    }
    // Direction marker: when going back we swap the keyframes so the slide
    // exits to the right and the new one enters from the left.
    const direction = delta < 0 ? 'vt-slideshow-back' : '';
    document.documentElement.classList.toggle('vt-slideshow-back', direction !== '');
    const transition = document.startViewTransition(() => {
      flushSync(() => setIndex(next));
    });
    transition.finished.finally(() => {
      document.documentElement.classList.remove('vt-slideshow-back');
    });
  }

  return (
    <div className="flex flex-col gap-3 bg-slate-50 p-4">
      <style>{SLIDESHOW_CSS}</style>
      <div className="relative h-56 overflow-hidden rounded-lg ring-1 ring-slate-200">
        <div
          key={slide.id}
          className="vt-slideshow-slide absolute inset-0 flex flex-col justify-end p-5 text-white"
          style={{ background: slide.gradient }}
        >
          {/* Geometric flourish — pure SVG, no photos. */}
          <svg
            aria-hidden="true"
            className="absolute top-4 right-4 opacity-70"
            width="80"
            height="80"
            viewBox="0 0 80 80"
          >
            <circle cx="40" cy="40" r="28" fill="none" stroke="white" strokeWidth="2" />
            <circle cx="40" cy="40" r="14" fill="white" fillOpacity="0.25" />
          </svg>
          <h3 className="m-0 text-2xl font-bold drop-shadow-sm">{slide.label}</h3>
          <p className="m-0 mt-1 text-sm text-white/90 drop-shadow-sm">{slide.caption}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => go(-1)}
          className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white hover:bg-slate-800"
        >
          ← Prev
        </button>
        <div className="flex gap-1.5">
          {SLIDES.map((s, i) => (
            <span key={s.id} className={`h-1.5 w-6 rounded-full ${i === index ? 'bg-slate-900' : 'bg-slate-300'}`} />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Next →
        </button>
      </div>
      <p className="text-xs text-slate-500">
        Same DOM node, the slide just re-keys. Custom
        <code className="mx-1 rounded bg-slate-200 px-1">::view-transition-old/new(vt-slideshow)</code>
        keyframes turn the default cross-fade into a horizontal slide.
      </p>
    </div>
  );
}

// --------------------------------------------------------------------------
// Demos for `view-transition-actions.mdx` (toast stack + action-driven dialog)
//
// Two View-Transitions exercises from WHAM 03.07.03.
//
// Toast stack: dismissing one toast triggers VT so the surviving siblings
// slide down rather than snap. z-index reversed so the dismissed toast
// fades behind the kept ones, not in front.
//
// Action-driven dialog: cancel vs confirm pick different exit animations
// by mutating `viewTransitionName` on the dialog right before unmount —
// different name → different `::view-transition-old(name)` rules apply.
//
// Both demos: graceful fallback when `document.startViewTransition` is
// missing OR the user prefers reduced motion (skip VT, just unmount).

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
// Demo — Toast stack
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
// Demo — Action-driven dialog
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
