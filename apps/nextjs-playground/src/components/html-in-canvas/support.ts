import { useSyncExternalStore } from 'react';

let cached: boolean | undefined;

/** Feature detection from the Chrome concepts page. */
export function supportsHtmlInCanvas(): boolean {
  if (typeof document === 'undefined') return false;
  if (cached === undefined) {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('content', 'drawable');
    cached = canvas.content === 'drawable';
  }
  return cached;
}

const noopSubscribe = () => () => {};

/** 'unknown' on the server and during hydration, so the static export and the client agree. */
export function useHtmlInCanvasSupport(): Support {
  return useSyncExternalStore(
    noopSubscribe,
    () => (supportsHtmlInCanvas() ? 'yes' : 'no'),
    () => 'unknown',
  );
}

export function supportsWebGPU(): boolean {
  if (typeof navigator === 'undefined') return false;
  return (navigator as Navigator & { gpu?: unknown }).gpu != null;
}

export type Support = 'unknown' | 'yes' | 'no';
