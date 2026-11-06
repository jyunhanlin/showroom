// A huge frame may take seconds: stop anyway, and the row shows how few samples it got.
export const MEASURE_LIMIT_MS = 30_000;
export const REFRESH_SAMPLES = 30;
// A frame is dropped once it takes noticeably longer than one display interval. Half an
// interval of slack keeps ordinary timer jitter from counting.
const DROPPED_FRAME_FACTOR = 1.5;

export type Summary = { samples: number; median: number; p95: number; max: number };

function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  return sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * p))];
}

export function summarize(values: number[]): Summary {
  const sorted = values.toSorted((a, b) => a - b);
  return {
    samples: sorted.length,
    median: percentile(sorted, 0.5),
    p95: percentile(sorted, 0.95),
    max: sorted.at(-1) ?? 0,
  };
}

/** The share of frame intervals that missed the display's refresh, or null with no samples. */
export function dropPercent(intervals: number[], refreshMs: number): number | null {
  if (intervals.length === 0) return null;
  const dropped = intervals.filter((interval) => interval > refreshMs * DROPPED_FRAME_FACTOR).length;
  return (dropped / intervals.length) * 100;
}

/** The next frame's timestamp, or the current time if frames stop, as they do in a hidden tab. */
export function nextFrame(): Promise<number> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      cancelAnimationFrame(frame);
      resolve(performance.now());
    }, MEASURE_LIMIT_MS);
    const frame = requestAnimationFrame((timestamp) => {
      clearTimeout(timer);
      resolve(timestamp);
    });
  });
}

export async function sampleFrameIntervals(samples: number, shouldStop: () => boolean): Promise<number[]> {
  const intervals: number[] = [];
  const startedAt = performance.now();
  let last = await nextFrame();
  for (let i = 0; i < samples; i++) {
    const now = await nextFrame();
    if (shouldStop() || performance.now() - startedAt >= MEASURE_LIMIT_MS) return intervals;
    intervals.push(now - last);
    last = now;
  }
  return intervals;
}

/** Records anything that makes a measurement untrustworthy, from the last reset onward. */
export function watchDisturbances() {
  let scrolled = false;
  let hidden = document.visibilityState !== 'visible';
  const onScroll = () => {
    scrolled = true;
  };
  const onVisibility = () => {
    if (document.visibilityState !== 'visible') hidden = true;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('visibilitychange', onVisibility);
  return {
    reset() {
      scrolled = false;
      hidden = document.visibilityState !== 'visible';
    },
    wasHidden: () => hidden,
    invalidNote() {
      const problems = [hidden ? '頁面曾隱藏' : '', scrolled ? '量測中捲動' : ''].filter(Boolean);
      return problems.length > 0 ? ` 數字無效：${problems.join('、')}` : '';
    },
    dispose() {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
    },
  };
}
