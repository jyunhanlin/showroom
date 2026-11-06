'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { Fallback } from './Fallback';
import {
  createSeatLayout,
  RENDERING_MODE_IDS,
  RENDERING_MODES,
  seatCenter,
  visibleSeats,
  type RenderingModeId,
  type SeatRenderer,
} from './seat-renderers';
import type { Support } from './support';
import { useCanvasGrid } from './use-canvas-grid';

const WARMUP_FRAMES = 5;
const TARGET_FRAMES = 300;
const MIN_FRAMES = 20;
const TARGET_MS = 6_000;
// A huge frame may take seconds: stop anyway, and the row shows how few samples it got.
const LIMIT_MS = 30_000;
const REFRESH_SAMPLES = 30;
// A frame is dropped once it takes noticeably longer than one display interval. Half an
// interval of slack keeps ordinary timer jitter from counting.
const DROPPED_FRAME_FACTOR = 1.5;

type TestId = 'pan' | 'simulatedHover' | 'realHover';
const TEST_LABELS: Record<TestId, string> = {
  pan: '平移',
  simulatedHover: '模擬 hover',
  realHover: '真實 hover 延遲',
};

type Summary = { samples: number; median: number; p95: number; max: number };

type Row = {
  id: string;
  runId: number;
  modeId: RenderingModeId;
  count: number;
  testId: TestId;
  summary: Summary;
  dropPct: number | null;
  drawMedian: number | null;
  note: string;
};

type BenchmarkRun = { id: number; modeId: RenderingModeId; count: number; refreshMs: number; refreshHidden: boolean };

function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  return sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * p))];
}

function summarize(values: number[]): Summary {
  const sorted = values.toSorted((a, b) => a - b);
  return {
    samples: sorted.length,
    median: percentile(sorted, 0.5),
    p95: percentile(sorted, 0.95),
    max: sorted.at(-1) ?? 0,
  };
}

/** The next frame's timestamp, or the current time if frames stop, as they do in a hidden tab. */
function nextFrame(): Promise<number> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      cancelAnimationFrame(frame);
      resolve(performance.now());
    }, LIMIT_MS);
    const frame = requestAnimationFrame((timestamp) => {
      clearTimeout(timer);
      resolve(timestamp);
    });
  });
}

async function sampleFrameIntervals(samples: number, shouldStop: () => boolean): Promise<number[]> {
  const intervals: number[] = [];
  const startedAt = performance.now();
  let last = await nextFrame();
  for (let i = 0; i < samples; i++) {
    const now = await nextFrame();
    if (shouldStop() || performance.now() - startedAt >= LIMIT_MS) return intervals;
    intervals.push(now - last);
    last = now;
  }
  return intervals;
}

/** Records anything that makes a measurement untrustworthy, from the last reset onward. */
function watchDisturbances() {
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

/**
 * One benchmark run. Every seat is redrawn on every draw, with no culling, in all modes.
 * Frame time comes from requestAnimationFrame timestamps, so it bottoms out at the display
 * interval and GPU work only shows up once it holds back the main thread.
 */
function StressCanvas({
  run,
  onRow,
  onStatus,
  onFinished,
}: {
  run: BenchmarkRun;
  onRow: (row: Row) => void;
  onStatus: (status: string) => void;
  onFinished: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const grid = useCanvasGrid(canvasRef, true);
  const mode = RENDERING_MODES[run.modeId];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    const disturbances = watchDisturbances();
    const label = `${mode.label} ${run.count} 個`;
    const refresh = `螢幕更新間隔 ${run.refreshMs.toFixed(1)} ms`;
    const refreshNote = run.refreshHidden ? ' 掉幀 % 無效：量測螢幕更新間隔時頁面隱藏' : '';
    const dropPct = (intervals: number[]) => {
      if (intervals.length === 0) return null;
      const dropped = intervals.filter((interval) => interval > run.refreshMs * DROPPED_FRAME_FACTOR).length;
      return (dropped / intervals.length) * 100;
    };
    const rowBase = { runId: run.id, modeId: run.modeId, count: run.count };

    let drawSamples: number[] | null = null;
    let resolveFirstDraw = () => {};
    const firstDraw = new Promise<void>((resolve) => {
      resolveFirstDraw = resolve;
    });

    let recordingRealHover = false;
    let pendingMove: { at: number; seat: number } | null = null;
    let lastSeat: number | null = null;
    const moveLatencies: number[] = [];
    const moveDraws: number[] = [];
    let moveHits = 0;

    const recordRealHover = (latency: number, drawMs: number, shown: boolean) => {
      moveLatencies.push(latency);
      moveDraws.push(drawMs);
      if (shown) moveHits += 1;
      onRow({
        ...rowBase,
        id: `${run.id}-realHover`,
        testId: 'realHover',
        summary: summarize(moveLatencies),
        dropPct: null,
        drawMedian: summarize(moveDraws).median,
        note: `hover 命中 ${moveHits}/${moveLatencies.length}。${disturbances.invalidNote()}`,
      });
    };

    const onDrawn = (drawMs: number) => {
      drawSamples?.push(drawMs);
      resolveFirstDraw();
      if (!pendingMove) return;
      const { at, seat } = pendingMove;
      pendingMove = null;
      // Ends at the next frame in every mode. It still cannot see GPU time after that.
      requestAnimationFrame((timestamp) => {
        // Safe to use `renderer` here and below: renderers only draw from a later frame or
        // paint event, after createRenderer has returned and assigned it.
        if (!cancelled) recordRealHover(timestamp - at, drawMs, renderer.showsHover(seat));
      });
    };

    const pan = { x: 0, y: 0 };
    const layout = createSeatLayout(run.count);
    let renderer: SeatRenderer;
    try {
      renderer = mode.create({ canvas, layout, grid, pan, onDrawn });
    } catch (err) {
      console.error(err);
      onStatus(`${label} 建立失敗：${err instanceof Error ? err.message : String(err)}`);
      onFinished();
      return () => disturbances.dispose();
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!recordingRealHover) return;
      const seat = renderer.seatAt(event.clientX, event.clientY);
      if (seat === lastSeat) return;
      lastSeat = seat;
      if (seat === null) {
        pendingMove = null;
        return;
      }
      // Scrolling before the first sample, such as to reach the canvas, does not count.
      if (moveLatencies.length === 0 && !pendingMove) disturbances.reset();
      // A slow frame can coalesce several moves: latency runs from the oldest one waiting.
      const at = pendingMove?.at ?? event.getCoalescedEvents()[0]?.timeStamp ?? event.timeStamp;
      pendingMove = { at, seat };
    };
    const onPointerLeave = () => {
      pendingMove = null;
      lastSeat = null;
    };
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);

    const measure = async (testId: TestId, perFrame: (frame: number) => void, note: () => string): Promise<void> => {
      const intervals: number[] = [];
      const draws: number[] = [];
      drawSamples = draws;
      disturbances.reset();
      const startedAt = performance.now();
      let last = await nextFrame();
      for (let frame = 0; ; frame++) {
        const now = await nextFrame();
        if (cancelled) return;
        if (frame >= WARMUP_FRAMES) intervals.push(now - last);
        last = now;
        perFrame(frame);
        const elapsed = performance.now() - startedAt;
        const enoughSamples = intervals.length >= MIN_FRAMES;
        if (intervals.length >= TARGET_FRAMES || (elapsed >= TARGET_MS && enoughSamples) || elapsed >= LIMIT_MS) break;
      }
      drawSamples = null;
      const noSamples = intervals.length === 0 ? ' 數字無效：沒有樣本' : '';
      onRow({
        ...rowBase,
        id: `${run.id}-${testId}`,
        testId,
        summary: summarize(intervals),
        dropPct: dropPct(intervals),
        drawMedian: draws.length > 0 ? summarize(draws).median : null,
        note: `繪製 ${draws.length} 次。${note()}${disturbances.invalidNote()}${noSamples}${refreshNote}`,
      });
    };

    // The hit tests need the canvas on screen, and their coordinates need its current position.
    const centerCanvas = async () => {
      canvas.scrollIntoView({ block: 'center' });
      await nextFrame();
      return canvas.getBoundingClientRect();
    };

    const benchmark = async () => {
      onStatus(`${label}：首次繪製中`);
      renderer.requestDraw();
      const drewInTime = await Promise.race([
        firstDraw.then(() => true),
        new Promise<boolean>((resolve) => setTimeout(() => resolve(false), LIMIT_MS)),
      ]);
      if (cancelled) return;
      if (!drewInTime) {
        onStatus(`${label}：${LIMIT_MS / 1000} 秒內沒有畫出第一幀，已停止。`);
        onFinished();
        return;
      }

      await centerCanvas();
      if (cancelled) return;
      const { cssWidth, cssHeight, scaleX } = grid.current;
      onStatus(
        `${label}：平移中。DPR ${window.devicePixelRatio}，canvas ${Math.round(cssWidth)}×${Math.round(cssHeight)} CSS px，scale ${scaleX.toFixed(2)}，${refresh}`,
      );
      await measure(
        'pan',
        (frame) => {
          pan.x = -150 * (1 - Math.cos(frame * 0.05));
          pan.y = -60 * (1 - Math.cos(frame * 0.03));
          renderer.requestDraw();
        },
        () => '',
      );
      if (cancelled) return;

      pan.x = 0;
      pan.y = 0;
      renderer.requestDraw();
      // One frame to draw at pan 0, one more so the seats' new positions are hit-testable.
      await nextFrame();
      await nextFrame();
      if (cancelled) return;

      onStatus(`${label}：模擬 hover 中。${refresh}`);
      const rect = await centerCanvas();
      if (cancelled) return;
      const targets = visibleSeats(layout, cssWidth, cssHeight);
      const hitTests: number[] = [];
      let correct = 0;
      await measure(
        'simulatedHover',
        (frame) => {
          // One seat per frame, so every frame has a hit test and a style change. With no
          // seats, the same hit test and a plain redraw make this the control row.
          const index = targets.length > 0 ? targets[frame % targets.length] : null;
          const center = index === null ? { x: 0, y: 0 } : seatCenter(layout, index);
          const start = performance.now();
          const seat = renderer.seatAt(rect.left + center.x, rect.top + center.y);
          hitTests.push(performance.now() - start);
          if (seat === index) correct += 1;
          if (index === null) renderer.requestDraw();
          else renderer.highlight(index);
        },
        () => `hit test 中位 ${summarize(hitTests).median.toFixed(2)} ms，命中 ${correct}/${hitTests.length}。`,
      );
      if (cancelled) return;
      renderer.highlight(null);

      recordingRealHover = true;
      onStatus(`${label}：完成。${refresh}。滑鼠移過座位會記錄真實 hover 延遲，按「關閉」還原其他段。`);
      onFinished();
    };

    benchmark().catch((err: unknown) => {
      console.error(err);
      onStatus(`${label} 壓測失敗：${err instanceof Error ? err.message : String(err)}`);
      onFinished();
    });

    return () => {
      cancelled = true;
      disturbances.dispose();
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      renderer.dispose();
    };
  }, [run, mode, grid, onRow, onStatus, onFinished]);

  return (
    <canvas
      ref={canvasRef}
      content={mode.needsHtmlInCanvas ? 'drawable' : undefined}
      className="relative block h-[360px] w-full rounded-lg bg-slate-100"
    />
  );
}

function formatMs(row: Row, value: number) {
  return row.summary.samples === 0 ? '無' : value.toFixed(1);
}

/**
 * Section 4. Nothing runs until a count is chosen, and `onActiveChange` unmounts the other
 * sections while it runs: their animation loops would otherwise be measured too.
 */
export function StressDemo({
  support,
  onActiveChange,
}: {
  support: Support;
  onActiveChange: (active: boolean) => void;
}) {
  const [selectedMode, setSelectedMode] = useState<RenderingModeId>('drawable');
  const [run, setRun] = useState<BenchmarkRun | null>(null);
  const [running, setRunning] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);
  const [status, setStatus] = useState('');
  const nextRunId = useRef(1);
  const startAttempt = useRef(0);

  const onRow = useCallback((row: Row) => {
    setRows((previous) => {
      const index = previous.findIndex((candidate) => candidate.id === row.id);
      if (index === -1) return [...previous, row];
      return previous.with(index, row);
    });
  }, []);
  const onFinished = useCallback(() => setRunning(false), []);

  if (support === 'unknown') return <Fallback support="unknown">{null}</Fallback>;

  const isAvailable = (id: RenderingModeId) => support === 'yes' || !RENDERING_MODES[id].needsHtmlInCanvas;
  const modeId = isAvailable(selectedMode) ? selectedMode : 'canvas2d';

  const start = async (count: number) => {
    startAttempt.current += 1;
    const attempt = startAttempt.current;
    setRunning(true);
    setRun(null);
    setStatus('量測螢幕更新間隔');
    onActiveChange(true);
    // Before any seat exists, so "dropped" means missed frames on this display, not 60Hz.
    const disturbances = watchDisturbances();
    const intervals = await sampleFrameIntervals(REFRESH_SAMPLES, () => attempt !== startAttempt.current);
    const refreshHidden = disturbances.wasHidden();
    disturbances.dispose();
    if (attempt !== startAttempt.current) return;
    setRun({ id: nextRunId.current, modeId, count, refreshMs: summarize(intervals).median, refreshHidden });
    nextRunId.current += 1;
  };
  const close = () => {
    startAttempt.current += 1;
    setRun(null);
    setRunning(false);
    setStatus('');
    onActiveChange(false);
  };

  return (
    <div className="space-y-3">
      {support === 'no' && <p className="text-sm">這個瀏覽器不支援 HTML-in-Canvas，只能跑純 Canvas 2D 和 WebGL2。</p>}
      <fieldset className="flex flex-wrap items-center gap-4 text-sm" disabled={running}>
        {RENDERING_MODE_IDS.map((id) => (
          <label key={id} className="flex cursor-pointer items-center gap-1">
            <input
              type="radio"
              name="stress-mode"
              value={id}
              checked={modeId === id}
              disabled={!isAvailable(id)}
              onChange={() => setSelectedMode(id)}
            />
            {RENDERING_MODES[id].label}
          </label>
        ))}
      </fieldset>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {RENDERING_MODES[modeId].counts.map((count) => (
          <button
            key={count}
            type="button"
            disabled={running}
            onClick={() => void start(count)}
            className="cursor-pointer rounded-md border border-slate-400 px-3 py-1 hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-slate-600"
          >
            {count === 0 ? '0（對照組）' : `${count.toLocaleString('en-US')} 個`}
          </button>
        ))}
        <button
          type="button"
          disabled={!run && !running}
          onClick={close}
          className="cursor-pointer rounded-md border border-slate-400 px-3 py-1 hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-slate-600"
        >
          關閉
        </button>
      </div>
      {run && <StressCanvas key={run.id} run={run} onRow={onRow} onStatus={setStatus} onFinished={onFinished} />}
      {status && (
        <p data-testid="stress-status" className="text-sm">
          {status}
        </p>
      )}
      {rows.length > 0 && (
        <div className="overflow-x-auto">
          <table data-testid="stress-results" className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-400">
                <th className="py-1 pr-3">輪</th>
                <th className="py-1 pr-3">方式</th>
                <th className="py-1 pr-3">數量</th>
                <th className="py-1 pr-3">測項</th>
                <th className="py-1 pr-3">樣本</th>
                <th className="py-1 pr-3">中位 ms</th>
                <th className="py-1 pr-3">p95 ms</th>
                <th className="py-1 pr-3">最大 ms</th>
                <th className="py-1 pr-3">掉幀 %</th>
                <th className="py-1 pr-3">繪製 JS ms</th>
                <th className="py-1">備註</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-slate-200 dark:border-slate-600">
                  <td className="py-1 pr-3">{row.runId}</td>
                  <td className="py-1 pr-3">{RENDERING_MODES[row.modeId].label}</td>
                  <td className="py-1 pr-3">{row.count}</td>
                  <td className="py-1 pr-3">{TEST_LABELS[row.testId]}</td>
                  <td className="py-1 pr-3">{row.summary.samples}</td>
                  <td className="py-1 pr-3">{formatMs(row, row.summary.median)}</td>
                  <td className="py-1 pr-3">{formatMs(row, row.summary.p95)}</td>
                  <td className="py-1 pr-3">{formatMs(row, row.summary.max)}</td>
                  <td className="py-1 pr-3">{row.dropPct === null ? '' : row.dropPct.toFixed(1)}</td>
                  <td className="py-1 pr-3">{row.drawMedian === null ? '' : row.drawMedian.toFixed(1)}</td>
                  <td className="py-1">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
