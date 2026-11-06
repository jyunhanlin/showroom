'use client';

import { useEffect, useRef, useState, type Ref } from 'react';

import { createDrawableTexture } from './drawable-texture';
import { Fallback } from './Fallback';
import {
  dropPercent,
  MEASURE_LIMIT_MS,
  nextFrame,
  REFRESH_SAMPLES,
  sampleFrameIntervals,
  summarize,
  watchDisturbances,
  type Summary,
} from './frame-sampling';
import { supportsWebGPU, type Support } from './support';

const TRANSITION_MS = 900;
const BENCHMARK_PERIOD_MS = 1_200;
const WARMUP_FRAMES = 5;
const TARGET_FRAMES = 240;
const MIN_FRAMES = 20;
const TARGET_MS = 4_000;
const REPEATS = 3;

const NOISE_SIZE = 256;
const NOISE_CELLS = [32, 16, 8, 4];
// three compiles the alpha test only while alphaTest > 0, so it never goes back to 0. The
// noise stays above this floor, which keeps a page at the floor fully visible.
const ALPHA_FLOOR = 0.001;
const NOISE_FLOOR = 0.02;

type PageIndex = 0 | 1;

const PAGES = [
  {
    eyebrow: '第 1 頁',
    title: '活動列表',
    body: '兩頁都是真的 DOM，一直留在 canvas 裡。溶解時，這頁的像素依雜訊圖逐步丟棄，露出後面那頁。',
    items: ['週五爵士夜', '河岸市集', '夏日電影院'],
    action: '看活動詳情 →',
    background: 'linear-gradient(135deg, #312e81, #0369a1)',
    foreground: '#ffffff',
  },
  {
    eyebrow: '第 2 頁',
    title: '活動詳情',
    body: '轉場結束後，舊頁會變成 inert，離開 hit test 和無障礙樹。這頁的按鈕可以直接點。',
    items: ['週五 19:30 開場', '河岸廣場主舞台', '免費入場'],
    action: '← 回活動列表',
    background: 'linear-gradient(135deg, #fef3c7, #fca5a5)',
    foreground: '#450a0a',
  },
] as const;

type ScopeId = 'block' | 'viewport';
const SCOPE_LABELS: Record<ScopeId, string> = { block: '區塊', viewport: '全螢幕' };
type CaptureId = 'once' | 'everyFrame';
const CAPTURE_LABELS: Record<CaptureId, string> = { once: '只擷取一次', everyFrame: '每 frame 重新擷取' };

type TextureSetup = { width: number; height: number; captureMs: number; queueWaitMs: number };
type Measurement = { frameIntervals: number[]; captures: Summary; queueWait: Summary };

type Stage = {
  show(page: PageIndex): void;
  play(from: PageIndex, to: PageIndex, durationMs: number): Promise<void>;
  /** Replaces both textures and captures into them, so the cost of a first capture is measurable. */
  recreateTextures(): Promise<TextureSetup>;
  measure(captureEveryFrame: boolean): Promise<Measurement>;
};

type Row = {
  id: string;
  repeat: number;
  scope: ScopeId;
  capture: CaptureId;
  setup: TextureSetup;
  frame: Summary;
  dropPct: number | null;
  captureMedian: number | null;
  queueWaitMedian: number;
  note: string;
};

const smooth = (t: number) => t * t * (3 - 2 * t);

/** Periodic value noise, normalized to the full range above NOISE_FLOOR, in every RGBA channel. */
function createNoisePixels(): Uint8Array<ArrayBuffer> {
  const values = new Float32Array(NOISE_SIZE * NOISE_SIZE);
  for (const cells of NOISE_CELLS) {
    const lattice = Float32Array.from({ length: cells * cells }, () => Math.random());
    const cellSize = NOISE_SIZE / cells;
    const at = (column: number, row: number) => lattice[(row % cells) * cells + (column % cells)];
    for (let y = 0; y < NOISE_SIZE; y++) {
      const row = Math.floor(y / cellSize);
      const ty = smooth(y / cellSize - row);
      for (let x = 0; x < NOISE_SIZE; x++) {
        const column = Math.floor(x / cellSize);
        const tx = smooth(x / cellSize - column);
        const top = at(column, row) * (1 - tx) + at(column + 1, row) * tx;
        const bottom = at(column, row + 1) * (1 - tx) + at(column + 1, row + 1) * tx;
        // Larger cells weigh more, which gives blotches with a rough edge.
        values[y * NOISE_SIZE + x] += (top * (1 - ty) + bottom * ty) / cells;
      }
    }
  }
  const min = values.reduce((a, b) => Math.min(a, b));
  const max = values.reduce((a, b) => Math.max(a, b));
  const pixels = new Uint8Array(values.length * 4);
  values.forEach((value, i) => {
    const normalized = NOISE_FLOOR + ((value - min) / (max - min)) * (1 - NOISE_FLOOR);
    pixels.fill(Math.round(normalized * 255), i * 4, i * 4 + 4);
  });
  return pixels;
}

function DemoPage({
  index,
  pageRef,
  inert,
  count,
  onCount,
  onNavigate,
}: {
  index: PageIndex;
  pageRef?: Ref<HTMLDivElement>;
  inert: boolean;
  count: number;
  onCount: () => void;
  onNavigate: () => void;
}) {
  const page = PAGES[index];
  return (
    <div
      ref={pageRef}
      drawable=""
      inert={inert}
      data-testid={`dissolve-page-${index}`}
      // Not `absolute inset-0`: a drawable child computes to position: static, so insets do nothing.
      className="box-border flex size-full flex-col justify-between overflow-hidden p-6 text-left"
      style={{ background: page.background, color: page.foreground }}
    >
      <div>
        <p className="text-xs tracking-widest opacity-80">{page.eyebrow}</p>
        <h3 className="mt-1 text-2xl font-bold">{page.title}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed">{page.body}</p>
        <ul className="mt-3 space-y-1 text-sm">
          {page.items.map((item) => (
            <li key={item}>・{item}</li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <button
          type="button"
          data-nav=""
          onClick={onNavigate}
          className="box-border cursor-pointer rounded-md bg-slate-900 px-3 py-1.5 font-medium text-white hover:bg-slate-700"
        >
          {page.action}
        </button>
        <button
          type="button"
          onClick={onCount}
          className="box-border cursor-pointer rounded-md border border-current px-3 py-1.5 font-medium"
        >
          點了 {count} 次
        </button>
        <span className="opacity-80">
          量測時每 frame 更新：<span data-tick="">0</span>
        </span>
      </div>
    </div>
  );
}

/**
 * Section 5. Both pages are full-size drawables captured into GPUTextures. Each sits on a
 * full-canvas plane, and the front plane discards pixels whose noise value falls below the
 * progress (alphaMap + alphaTest), so the dissolve needs no custom shader.
 */
export function DissolveTransitionDemo({
  support,
  paused,
  onActiveChange,
}: {
  support: Support;
  /** Another section is measuring: release the renderer and keep the results. */
  paused: boolean;
  onActiveChange: (active: boolean) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const firstPageRef = useRef<HTMLDivElement>(null);
  const secondPageRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Stage | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shown, setShown] = useState<PageIndex>(0);
  const [transitioning, setTransitioning] = useState(false);
  const [count, setCount] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState('');
  const [rows, setRows] = useState<Row[]>([]);
  // Derived, not stored: `support` is only 'yes' on the client, where navigator.gpu is readable.
  const gpu: Support = support === 'yes' ? (supportsWebGPU() ? 'yes' : 'no') : support;

  useEffect(() => {
    const canvas = canvasRef.current;
    const firstPage = firstPageRef.current;
    const secondPage = secondPageRef.current;
    if (gpu !== 'yes' || paused || !canvas || !firstPage || !secondPage) return;

    let disposed = false;
    let cleanup = () => {};

    const fail = (err: unknown) => {
      console.error(err);
      setError(err instanceof Error ? err.message : String(err));
      cleanup();
    };

    (async () => {
      // Dynamic import keeps three/webgpu out of Next's static prerender and the initial bundle.
      const THREE = await import('three/webgpu');
      if (disposed) return;

      // The planes fill the canvas with straight edges, so multisampling would only add cost.
      const renderer = new THREE.WebGPURenderer({ canvas, antialias: false });
      await renderer.init();
      if (disposed) {
        renderer.dispose();
        return;
      }
      const device = (renderer.backend as { device?: HicGpuDevice }).device;
      if (!device) throw new Error('WebGPURenderer did not produce a GPUDevice (fell back to WebGL2?)');
      renderer.setPixelRatio(window.devicePixelRatio);

      const noise = new THREE.DataTexture(createNoisePixels(), NOISE_SIZE, NOISE_SIZE, THREE.RGBAFormat);
      noise.minFilter = THREE.LinearFilter;
      noise.magFilter = THREE.LinearFilter;
      noise.needsUpdate = true;

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
      camera.position.z = 5;
      const geometry = new THREE.PlaneGeometry(2, 2);
      // drawElementImageToTexture writes top-left origin; ExternalTexture skips three's flipY.
      const uv = geometry.attributes.uv;
      for (let i = 0; i < uv.count; i++) uv.setY(i, 1 - uv.getY(i));

      const slots = [firstPage, secondPage].map((page) => {
        const material = new THREE.MeshBasicMaterial({ alphaMap: noise, alphaTest: ALPHA_FLOOR });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.visible = false;
        scene.add(mesh);
        const texture = createDrawableTexture({
          canvas,
          element: page,
          device,
          material,
          ExternalTextureClass: THREE.ExternalTexture,
        });
        return { page, material, mesh, texture };
      });

      let dirty = true;
      /** Runs once per frame before the render, for whichever animation is active. */
      let onFrame: ((timestamp: number) => void) | null = null;
      let onRendered: (() => void) | null = null;
      let onCaptured: ((captureMs: number) => void) | null = null;
      let captureEveryFrame = false;
      let recreateNextPaint = false;
      /** Ends a running transition when the stage goes away, so its caller can finish. */
      let endTransition: (() => void) | null = null;

      /** The front page dissolves away at `progress`; the back page stays whole behind it. */
      const setDissolve = (front: PageIndex, back: PageIndex, progress: number) => {
        slots[front].mesh.position.z = 0.5;
        slots[front].material.alphaTest = Math.max(ALPHA_FLOOR, progress);
        slots[back].mesh.position.z = 0;
        slots[back].material.alphaTest = ALPHA_FLOOR;
        dirty = true;
      };
      setDissolve(0, 1, 0);

      canvas.onpaint = (event) => {
        // An exception here reaches window.onerror, not the promise's catch below.
        try {
          const startedAt = performance.now();
          const forceNew = recreateNextPaint;
          recreateNextPaint = false;
          let captured = false;
          for (const slot of slots) {
            const isNew = slot.texture.prepare(forceNew);
            if (isNew) slot.mesh.visible = true;
            if (isNew || captureEveryFrame || event.changedElements.includes(slot.page)) {
              slot.texture.capture();
              captured = true;
            }
          }
          if (captured) {
            dirty = true;
            onCaptured?.(performance.now() - startedAt);
          }
        } catch (err) {
          fail(err);
        }
      };

      const observer = new ResizeObserver(([entry]) => {
        renderer.setSize(entry.contentRect.width, entry.contentRect.height, false);
        dirty = true;
        canvas.requestPaint();
      });
      observer.observe(canvas);
      renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

      renderer.setAnimationLoop((timestamp) => {
        onFrame?.(timestamp);
        // Starts dirty on purpose: three only creates the canvas's WebGPU context in its first
        // render, and drawElementImageToTexture throws in a paint event until that context exists.
        if (!dirty) return;
        dirty = false;
        renderer.render(scene, camera);
        onRendered?.();
        // Each page already lines up with the canvas, so its canvasTransform is the identity.
        for (const { page } of slots) canvas.updateElementGeometry(page, { canvasTransform: new DOMMatrix() });
      });
      canvas.requestPaint();

      stageRef.current = {
        show: (page) => setDissolve(page, page === 0 ? 1 : 0, 0),
        play: (from, to, durationMs) =>
          new Promise((resolve) => {
            let startedAt: number | null = null;
            endTransition = resolve;
            onFrame = (timestamp) => {
              startedAt ??= timestamp;
              const t = Math.min(1, (timestamp - startedAt) / durationMs);
              setDissolve(from, to, smooth(t));
              if (t === 1) {
                onFrame = null;
                endTransition = null;
                setDissolve(to, from, 0);
                resolve();
              }
            };
          }),
        recreateTextures: () =>
          new Promise((resolve, reject) => {
            const watchdog = setTimeout(() => {
              onCaptured = null;
              reject(new Error('paint 事件沒有送達，頁面可能被隱藏'));
            }, MEASURE_LIMIT_MS);
            onCaptured = (captureMs) => {
              onCaptured = null;
              clearTimeout(watchdog);
              const startedAt = performance.now();
              const { width, height } = slots[0].texture.size();
              void device.queue.onSubmittedWorkDone().then(() => {
                resolve({ width, height, captureMs, queueWaitMs: performance.now() - startedAt });
              });
            };
            recreateNextPaint = true;
            canvas.requestPaint();
          }),
        measure: (everyFrame) =>
          new Promise((resolve) => {
            const frameIntervals: number[] = [];
            const captures: number[] = [];
            const queueWaits: number[] = [];
            const ticks = slots.map(({ page }) => page.querySelector('[data-tick]'));
            let frame = 0;
            let last = 0;
            const measuredAt = performance.now();

            const sampleQueueWait = () => {
              if (frame <= WARMUP_FRAMES) return;
              const startedAt = performance.now();
              void device.queue.onSubmittedWorkDone().then(() => queueWaits.push(performance.now() - startedAt));
            };
            const finish = () => {
              clearTimeout(watchdog);
              onFrame = null;
              onRendered = null;
              onCaptured = null;
              captureEveryFrame = false;
              void device.queue.onSubmittedWorkDone().then(() => {
                resolve({ frameIntervals, captures: summarize(captures), queueWait: summarize(queueWaits) });
              });
            };
            // Frames stop in a hidden tab; the row then shows how few samples it got.
            const watchdog = setTimeout(finish, MEASURE_LIMIT_MS);

            // Both modes wait from the frame's last submission until the queue drains. That is
            // the render when capturing once and the capture otherwise, since rendering precedes
            // the paint event. Work that finished before the wait starts does not count, so this
            // is a lower bound on GPU time, not a measurement of it.
            captureEveryFrame = everyFrame;
            onRendered = everyFrame ? null : sampleQueueWait;
            onCaptured = (captureMs) => {
              if (frame > WARMUP_FRAMES) captures.push(captureMs);
              if (everyFrame) sampleQueueWait();
            };
            onFrame = (timestamp) => {
              if (frame > WARMUP_FRAMES) frameIntervals.push(timestamp - last);
              last = timestamp;
              frame += 1;
              const phase = (timestamp % BENCHMARK_PERIOD_MS) / BENCHMARK_PERIOD_MS;
              setDissolve(0, 1, 1 - Math.abs(2 * phase - 1));
              if (everyFrame) {
                // A real DOM change, so the browser has to re-rasterize part of each page.
                for (const tick of ticks) if (tick) tick.textContent = String(frame);
                canvas.requestPaint();
              }
              const enoughSamples = frameIntervals.length >= MIN_FRAMES;
              const timeIsUp = enoughSamples && performance.now() - measuredAt >= TARGET_MS;
              if (frameIntervals.length >= TARGET_FRAMES || timeIsUp) finish();
            };
          }),
      };
      setReady(true);

      cleanup = () => {
        // Runs from fail() and again from the effect's own cleanup on unmount.
        cleanup = () => {};
        stageRef.current = null;
        setReady(false);
        endTransition?.();
        renderer.setAnimationLoop(null);
        observer.disconnect();
        canvas.onpaint = null;
        for (const slot of slots) {
          canvas.clearElementGeometry(slot.page);
          slot.texture.dispose();
          slot.material.dispose();
        }
        noise.dispose();
        geometry.dispose();
        renderer.dispose();
      };
    })().catch(fail);

    return () => {
      disposed = true;
      cleanup();
    };
  }, [gpu, paused]);

  // Also covers a stage rebuilt after a pause, which would otherwise start on the first page.
  useEffect(() => {
    if (ready) stageRef.current?.show(shown);
  }, [ready, shown]);

  const pageElement = (index: PageIndex, pageRef?: Ref<HTMLDivElement>) => (
    <DemoPage
      index={index}
      pageRef={pageRef}
      inert={index !== shown || transitioning || running}
      count={count}
      onCount={() => setCount((c) => c + 1)}
      onNavigate={() => void navigate(index === 0 ? 1 : 0)}
    />
  );

  const navigate = async (to: PageIndex) => {
    const stage = stageRef.current;
    if (!stage || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(to);
      return;
    }
    setTransitioning(true);
    await stage.play(shown, to, TRANSITION_MS);
    setShown(to);
    setTransitioning(false);
    // The button that started this went inert with its page, which drops keyboard focus.
    const target = to === 0 ? firstPageRef.current : secondPageRef.current;
    requestAnimationFrame(() => target?.querySelector<HTMLElement>('[data-nav]')?.focus({ preventScroll: true }));
  };

  const measureCost = async () => {
    const stage = stageRef.current;
    if (!stage) return;
    setRunning(true);
    setRows([]);
    onActiveChange(true);
    const disturbances = watchDisturbances();
    try {
      setStatus('量測螢幕更新間隔');
      await nextFrame();
      const refreshMs = summarize(await sampleFrameIntervals(REFRESH_SAMPLES, () => false)).median;
      for (let repeat = 1; repeat <= REPEATS; repeat++) {
        for (const scope of ['block', 'viewport'] as const) {
          setFullscreen(scope === 'viewport');
          // One frame for React and layout, one for the canvas to take its new size.
          await nextFrame();
          await nextFrame();
          if (scope === 'block') canvasRef.current?.scrollIntoView({ block: 'center' });
          for (const capture of ['once', 'everyFrame'] as const) {
            setStatus(`第 ${repeat}/${REPEATS} 次：${SCOPE_LABELS[scope]}，${CAPTURE_LABELS[capture]}`);
            await nextFrame();
            disturbances.reset();
            const setup = await stage.recreateTextures();
            const { frameIntervals, captures, queueWait } = await stage.measure(capture === 'everyFrame');
            const row: Row = {
              id: `${repeat}-${scope}-${capture}`,
              repeat,
              scope,
              capture,
              setup,
              frame: summarize(frameIntervals),
              dropPct: dropPercent(frameIntervals, refreshMs),
              captureMedian: capture === 'everyFrame' ? captures.median : null,
              queueWaitMedian: queueWait.median,
              note: `量測中擷取 ${captures.samples} 次，螢幕更新間隔 ${refreshMs.toFixed(1)} ms。${disturbances.invalidNote()}`,
            };
            setRows((previous) => [...previous, row]);
          }
        }
      }
      setStatus('量測完成。');
    } catch (err) {
      console.error(err);
      setStatus(`量測失敗：${err instanceof Error ? err.message : String(err)}`);
    } finally {
      disturbances.dispose();
      setFullscreen(false);
      stage.show(shown);
      setRunning(false);
      onActiveChange(false);
    }
  };

  const fallbackReason = support === 'no' ? undefined : 'navigator.gpu 不存在，這段的轉場需要真的 GPUQueue。';
  const usesCanvas = gpu === 'yes' && !error;

  if (usesCanvas && paused) {
    return <p className="text-sm">其他段正在量測，這段先釋放 GPU 資源。</p>;
  }

  return (
    <div className="space-y-3">
      {usesCanvas ? (
        <canvas
          ref={canvasRef}
          content="drawable"
          data-testid="dissolve-canvas"
          className={fullscreen ? 'fixed inset-0 z-50 block size-full' : 'relative block h-[340px] w-full rounded-lg'}
        >
          {pageElement(0, firstPageRef)}
          {pageElement(1, secondPageRef)}
        </canvas>
      ) : (
        <Fallback support={gpu} reason={error ?? fallbackReason}>
          <div className="relative h-[340px] overflow-hidden rounded-lg">{pageElement(shown)}</div>
        </Fallback>
      )}
      {usesCanvas && (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <button
            type="button"
            disabled={!ready || running || transitioning}
            onClick={() => void measureCost()}
            className="cursor-pointer rounded-md border border-slate-400 px-3 py-1 hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-slate-600"
          >
            量測 texture 成本（約 1 分鐘）
          </button>
        </div>
      )}
      {status && (
        <p data-testid="dissolve-status" className="text-sm">
          {status}
        </p>
      )}
      {rows.length > 0 && (
        <div className="overflow-x-auto">
          <table data-testid="dissolve-results" className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-400">
                <th className="py-1 pr-3">次</th>
                <th className="py-1 pr-3">範圍</th>
                <th className="py-1 pr-3">擷取</th>
                <th className="py-1 pr-3">裝置 px</th>
                <th className="py-1 pr-3">兩張 MB</th>
                <th className="py-1 pr-3">建立 + 首次擷取 JS ms</th>
                <th className="py-1 pr-3">首次佇列等待 ms</th>
                <th className="py-1 pr-3">每次擷取 JS ms</th>
                <th className="py-1 pr-3">每 frame 佇列等待 ms</th>
                <th className="py-1 pr-3">幀中位 ms</th>
                <th className="py-1 pr-3">p95 ms</th>
                <th className="py-1 pr-3">最大 ms</th>
                <th className="py-1 pr-3">掉幀 %</th>
                <th className="py-1 pr-3">樣本</th>
                <th className="py-1">備註</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-slate-200 dark:border-slate-600">
                  <td className="py-1 pr-3">{row.repeat}</td>
                  <td className="py-1 pr-3">{SCOPE_LABELS[row.scope]}</td>
                  <td className="py-1 pr-3">{CAPTURE_LABELS[row.capture]}</td>
                  <td className="py-1 pr-3">
                    {row.setup.width}×{row.setup.height}
                  </td>
                  <td className="py-1 pr-3">{((row.setup.width * row.setup.height * 4 * 2) / 1e6).toFixed(1)}</td>
                  <td className="py-1 pr-3">{row.setup.captureMs.toFixed(1)}</td>
                  <td className="py-1 pr-3">{row.setup.queueWaitMs.toFixed(1)}</td>
                  <td className="py-1 pr-3">{row.captureMedian === null ? '' : row.captureMedian.toFixed(1)}</td>
                  <td className="py-1 pr-3">{row.queueWaitMedian.toFixed(1)}</td>
                  <td className="py-1 pr-3">{row.frame.median.toFixed(1)}</td>
                  <td className="py-1 pr-3">{row.frame.p95.toFixed(1)}</td>
                  <td className="py-1 pr-3">{row.frame.max.toFixed(1)}</td>
                  <td className="py-1 pr-3">{row.dropPct === null ? '無' : row.dropPct.toFixed(1)}</td>
                  <td className="py-1 pr-3">{row.frame.samples}</td>
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
