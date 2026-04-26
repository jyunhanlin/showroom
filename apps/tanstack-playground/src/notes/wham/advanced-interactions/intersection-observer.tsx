import { throttle } from 'lodash-es';
import { useEffect, useMemo, useRef, useState } from 'react';

type ObserverOptions = {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | Document | null;
};

function useIntersectionObserver(ref: React.RefObject<Element | null>, options: ObserverOptions = {}): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const { threshold, rootMargin, root } = options;

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold, rootMargin, root: root ?? null },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin, root]);

  return isIntersecting;
}

const FADE_BOXES = [
  { id: 'a', label: 'Box A', bg: 'bg-indigo-500' },
  { id: 'b', label: 'Box B', bg: 'bg-emerald-500' },
  { id: 'c', label: 'Box C', bg: 'bg-amber-500' },
  { id: 'd', label: 'Box D', bg: 'bg-rose-500' },
];

function FadeInBox({
  scrollerRef,
  label,
  bg,
}: {
  scrollerRef: React.RefObject<HTMLDivElement | null>;
  label: string;
  bg: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, {
    threshold: 0.5,
    rootMargin: '-16px',
    root: scrollerRef.current,
  });

  return (
    <div
      ref={ref}
      className={`flex h-28 items-center justify-center rounded-lg text-white shadow-md transition-all duration-700 ease-out ${bg}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
      }}
    >
      <span className="text-sm font-semibold">
        {label} — {isVisible ? 'visible' : 'waiting'}
      </span>
    </div>
  );
}

export function FadeInOnScroll() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-slate-50 p-4">
      <p className="mb-2 text-xs text-slate-500">
        Scroll inside the box to trigger fade-in (threshold 0.5, rootMargin -16px).
      </p>
      <div ref={scrollerRef} className="relative h-[280px] overflow-y-auto rounded-lg ring-1 ring-slate-200">
        <div className="flex flex-col gap-6 p-4">
          <p className="text-sm text-slate-600">Keep scrolling — boxes below fade in once half of each is on screen.</p>
          <div className="h-32 rounded-lg bg-slate-100 ring-1 ring-slate-200" />
          {FADE_BOXES.map((box) => (
            <FadeInBox key={box.id} scrollerRef={scrollerRef} label={box.label} bg={box.bg} />
          ))}
          <div className="h-32 rounded-lg bg-slate-100 ring-1 ring-slate-200" />
        </div>
      </div>
    </div>
  );
}

export function ScrollPercentageDemo() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const handleScroll = useMemo(
    () =>
      throttle(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return;
        const totalHeight = scroller.scrollHeight;
        const innerHeight = scroller.clientHeight;
        const denominator = totalHeight - innerHeight;
        if (denominator <= 0) {
          setScrollPercentage(0);
          return;
        }
        const next = (scroller.scrollTop / denominator) * 100;
        setScrollPercentage(Math.max(0, Math.min(100, next)));
      }, 100),
    [],
  );

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.addEventListener('scroll', handleScroll);
    return () => {
      scroller.removeEventListener('scroll', handleScroll);
      handleScroll.cancel();
    };
  }, [handleScroll]);

  return (
    <div className="bg-slate-50 p-4">
      <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
        <span>Throttled scroll listener (100ms) — same data as scroll-timeline, JS edition.</span>
        <span className="font-mono text-slate-700">{scrollPercentage.toFixed(0)}%</span>
      </div>
      <div className="relative">
        <div className="sticky top-0 z-10 h-1.5 w-full bg-slate-200">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-[width] duration-75"
            style={{ width: `${scrollPercentage}%` }}
          />
        </div>
        <div ref={scrollerRef} className="h-[280px] overflow-y-auto rounded-b-lg ring-1 ring-slate-200">
          <div className="flex flex-col gap-3 p-4">
            {Array.from({ length: 24 }).map((_, i) => (
              <p key={i} className="text-sm leading-relaxed text-slate-600">
                Paragraph {i + 1}. Scroll to drive the bar above. The percentage is computed from
                <code className="mx-1 rounded bg-slate-100 px-1 text-xs">scrollTop</code>
                divided by
                <code className="mx-1 rounded bg-slate-100 px-1 text-xs">scrollHeight - clientHeight</code>, clamped to
                0–100 and throttled to 10Hz.
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
