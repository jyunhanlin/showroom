import { useState } from 'react';
import { bool, float, Fn, If, Loop, uniform, uv, vec2, vec3 } from 'three/tsl';
import { WebGPUCanvas } from '~/components/webgpu-canvas';

// ── The values the diagram marks ────────────────────────────────────────────
// All of them are uniform(), so every slider only changes a number being uploaded.
// The node graph is built once, at module scope, and never rebuilt.
//
// inverted / discarded are floats, not bools, on purpose: NodeBuilder.getNodeUniform()
// only knows float / int / uint / vec2-4 / color / mat2-4, so uniform(false) throws
// `Uniform "bool" not implemented`. greaterThan() turns the float back into a bool node.
const controls = {
  radius: uniform(0.075),
  thickness: uniform(0.02),
  span: uniform(0.1),
  count: uniform(5),
  invertedFlag: uniform(0),
  discardedFlag: uniform(0),
};
// Named *Node so the Fn() parameters below can keep the lesson's names without shadowing.
const invertedNode = controls.invertedFlag.greaterThan(0.5);
const discardedNode = controls.discardedFlag.greaterThan(0.5);

// ── circle(): the lesson's single-ring function ─────────────────────────────
// Plain JavaScript, so the parameters destructure and the defaults are ordinary
// default values — they just happen to be nodes rather than numbers.
const circleBody = ({
  coordinates = uv(),
  center = vec2(0.5),
  radius = float(0.25),
  thickness = float(0.02),
  inverted = bool(false),
  discarded = bool(false),
}) => {
  // not `distance`: that name would shadow TSL's own distance() node in this scope
  const distanceToCenter = coordinates.distance(center);
  const lineSDF = distanceToCenter.sub(radius);
  // chained .step(edge) is step(edge, x), the reverse of the standalone step(edge, x)
  // call, so this is 0 on the ring and 1 everywhere else — inverted below.
  const line = lineSDF.abs().step(thickness.div(2)).toVar();

  // If(), not if(). The JS body runs once while the graph is built; the branch it
  // leaves behind is what the GPU evaluates per fragment.
  If(inverted.not(), () => {
    line.assign(line.oneMinus());
  });

  // Discard chained onto the condition. Same as Discard(cond), same as If(cond, Discard).
  line.lessThanEqual(0).and(discarded).discard();

  return line;
};

// Two Fn() instances over the same body. They render identically; the difference is
// what TSL emits — inline instructions vs a standalone function in the shader.
const circle = Fn(circleBody);
const circleWithLayout = Fn(circleBody, {
  coordinates: 'vec2',
  center: 'vec2',
  radius: 'float',
  thickness: 'float',
  inverted: 'bool',
  discarded: 'bool',
  return: 'float',
});

// ── circles(): the same ring, count times, spread by span ───────────────────
type CircleFn = typeof circle;

const circlesBody =
  (drawCircle: CircleFn) =>
  ({
    coordinates = uv(),
    center = vec2(0.5),
    radius = float(0.25),
    thickness = float(0.02),
    inverted = bool(false),
    discarded = bool(false),
    count = float(5),
    span = float(0.1),
  }) => {
    const lines = float(0).toVar();

    // type: 'float' hands the body an i that is already a float, so i.mul(span) keeps
    // its decimals. With the default int i, span would be rounded to 0.
    // The lesson also passes name: 'i'. That works at runtime but @types/three has the
    // `name` field commented out with a TODO, so it will not typecheck. 'i' is the default.
    Loop({ start: float(0), end: count, type: 'float', condition: '<' }, ({ i }) => {
      lines.addAssign(
        drawCircle({
          coordinates,
          center,
          radius: radius.add(i.mul(span)),
          thickness,
          // forced off per ring: inverting or discarding here would fight the other rings
          inverted: bool(false),
          discarded: bool(false),
        }),
      );
    });

    If(inverted, () => {
      lines.assign(lines.oneMinus());
    });
    lines.lessThanEqual(0).and(discarded).discard();

    return lines;
  };

function buildColorNode(drawCircle: CircleFn) {
  const circles = Fn(circlesBody(drawCircle));
  return vec3(
    circles({
      coordinates: uv(),
      center: vec2(0.5),
      radius: controls.radius,
      thickness: controls.thickness,
      inverted: invertedNode,
      discarded: discardedNode,
      count: controls.count,
      span: controls.span,
    }).toVar('circlesOutput'),
  );
}

const COLOR_NODES = {
  inline: buildColorNode(circle),
  layout: buildColorNode(circleWithLayout),
};

// Backdrop, so `discarded` has something to reveal. A checker is enough and it is
// still TSL: floor the scaled uv, add the two axes, keep the parity.
const checker = uv().mul(8).floor();
const backdropNode = vec3(0.16, 0.2, 0.28).add(checker.x.add(checker.y).mod(2).mul(0.07));

type LayoutMode = keyof typeof COLOR_NODES;

function Scene({ mode }: { mode: LayoutMode }) {
  return (
    <>
      <mesh position={[0, 0, -0.4]}>
        <planeGeometry args={[3.4, 3.4]} />
        <meshBasicNodeMaterial colorNode={backdropNode} />
      </mesh>
      <mesh name="rings">
        <planeGeometry args={[2, 2]} />
        {/* key: swapping the colorNode is a different shader, so remount rather than mutate */}
        <meshBasicNodeMaterial key={mode} colorNode={COLOR_NODES[mode]} />
      </mesh>
    </>
  );
}

export function NodeFunctionsDemo() {
  const [mode, setMode] = useState<LayoutMode>('inline');
  const [count, setCount] = useState(5);
  const [radius, setRadius] = useState(0.075);
  const [thickness, setThickness] = useState(0.02);
  const [span, setSpan] = useState(0.1);
  const [isInverted, setIsInverted] = useState(false);
  const [isDiscarded, setIsDiscarded] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-3">
      <div className="h-72 w-full overflow-hidden rounded-md bg-slate-900">
        <WebGPUCanvas camera={{ position: [0, 0, 3.2], fov: 45 }}>
          <Scene mode={mode} />
        </WebGPUCanvas>
      </div>
      <pre className="w-full overflow-x-auto rounded bg-slate-100 p-2 font-mono text-xs">
        {`const circle = Fn(({ coordinates, center, radius, thickness, inverted, discarded }) => {
  const line = coordinates.distance(center).sub(radius).abs().step(thickness.div(2)).toVar();
  If(inverted.not(), () => line.assign(line.oneMinus()));
  line.lessThanEqual(0).and(discarded).discard();
  return line;
}${mode === 'layout' ? ", { coordinates: 'vec2', /* … */ return: 'float' }" : ''});

Loop({ start: float(0), end: count, type: 'float' }, ({ i }) => {
  lines.addAssign(circle({ /* … */ radius: radius.add(i.mul(span)) }));
});

circles({ count: ${count}, radius: ${radius.toFixed(3)}, thickness: ${thickness.toFixed(3)}, span: ${span.toFixed(
          3,
        )}, inverted: ${isInverted}, discarded: ${isDiscarded} })`}
      </pre>
      <div className="flex flex-wrap justify-center gap-1.5 font-mono text-xs">
        {(['inline', 'layout'] as const).map((entry) => (
          <button
            key={entry}
            type="button"
            onClick={() => setMode(entry)}
            className={`rounded border px-2 py-1 ${
              entry === mode
                ? 'border-slate-800 bg-slate-800 text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            {entry === 'layout' ? 'Fn(fn, layout)' : 'Fn(fn)'}
          </button>
        ))}
        <span className="rounded border border-dashed border-slate-300 px-2 py-1 text-slate-600">
          畫面一樣，產生的 shader 不一樣
        </span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-sm">
        <label className="flex items-center gap-2">
          <span className="w-24 whitespace-nowrap font-bold">count: {count}</span>
          <input
            type="range"
            min={1}
            max={12}
            step={1}
            value={count}
            onChange={(e) => {
              const next = Number(e.target.value);
              setCount(next);
              controls.count.value = next;
            }}
          />
        </label>
        <label className="flex items-center gap-2">
          <span className="w-28 whitespace-nowrap">radius: {radius.toFixed(3)}</span>
          <input
            type="range"
            min={0.02}
            max={0.4}
            step={0.005}
            value={radius}
            onChange={(e) => {
              const next = Number(e.target.value);
              setRadius(next);
              controls.radius.value = next;
            }}
          />
        </label>
        <label className="flex items-center gap-2">
          <span className="w-32 whitespace-nowrap">thickness: {thickness.toFixed(3)}</span>
          <input
            type="range"
            min={0.002}
            max={0.08}
            step={0.002}
            value={thickness}
            onChange={(e) => {
              const next = Number(e.target.value);
              setThickness(next);
              controls.thickness.value = next;
            }}
          />
        </label>
        <label className="flex items-center gap-2">
          <span className="w-24 whitespace-nowrap">span: {span.toFixed(3)}</span>
          <input
            type="range"
            min={0.01}
            max={0.2}
            step={0.005}
            value={span}
            onChange={(e) => {
              const next = Number(e.target.value);
              setSpan(next);
              controls.span.value = next;
            }}
          />
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isInverted}
            onChange={(e) => {
              setIsInverted(e.target.checked);
              controls.invertedFlag.value = e.target.checked ? 1 : 0;
            }}
          />
          <span>inverted</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isDiscarded}
            onChange={(e) => {
              setIsDiscarded(e.target.checked);
              controls.discardedFlag.value = e.target.checked ? 1 : 0;
            }}
          />
          <span>discarded</span>
        </label>
      </div>
      <p className="text-center text-xs text-slate-500">
        count 是 Loop() 的上限，走 uniform，所以拉它不重編 shader —— 迴圈是寫在 shader 裡的。inverted 走 If()、discarded
        走 Discard()，兩個都是每個 fragment 各自判斷。上面兩顆按鈕切的是同一段 body 有沒有給
        layout：畫出來的像素一模一樣，差別只在 shader 裡有沒有一支獨立的 function。
      </p>
    </div>
  );
}
