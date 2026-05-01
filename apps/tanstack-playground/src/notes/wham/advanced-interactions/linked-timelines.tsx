import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const SQUARE_FILL = 'oklch(0.78 0.18 90)';

export function LinkedTimelinesDemo() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    container: scrollerRef,
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const radius = useTransform(scrollYProgress, [0, 1], ['8%', '50%']);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.15, 1]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="grid w-full max-w-2xl grid-cols-2 gap-2">
        <div className="sticky top-0 flex h-72 items-center justify-center self-start rounded-md bg-slate-900">
          <motion.div
            className="h-32 w-32"
            style={{ backgroundColor: SQUARE_FILL, borderRadius: radius, rotate, scale }}
          />
        </div>
        <div ref={scrollerRef} className="h-72 overflow-y-auto rounded-md bg-slate-100 p-4 text-sm">
          <p className="mb-4 text-gray-500">捲動我 ↓</p>
          <p className="mb-32 text-gray-500">…</p>
          <div ref={targetRef} className="rounded border border-dashed border-slate-400 p-3 text-slate-700">
            根據這段在視窗中的進度,左邊方塊從正方形變圓、轉一圈、中段放大。
          </div>
          <p className="mt-32 text-gray-500">繼續捲到底就重置。</p>
          <p className="mb-4 text-gray-500">…</p>
          <p className="text-gray-500">底</p>
        </div>
      </div>
      <p className="text-xs text-gray-500">
        左邊方塊不被自己的位置驅動,而是被右邊那段虛線框的「在 scroller 內的可見進度」驅動 — linked timeline。
      </p>
    </div>
  );
}
