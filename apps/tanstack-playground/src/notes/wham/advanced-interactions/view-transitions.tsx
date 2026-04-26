/**
 * View Transitions API demos.
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
import { useState } from 'react';
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
