import { useState } from 'react';
import { bufferAttribute, positionWorld, time, uniform, uniformArray } from 'three/tsl';
import { BufferAttribute, Color, Vector2 } from 'three/webgpu';
import { WebGPUCanvas } from '~/components/webgpu-canvas';

// ── Path 1: uniform — one value shared by every vertex and every fragment ────
// The value the diagram marks. .x is how many stripes fit in one unit of height,
// .y is how fast they travel. The sliders write frequencies.value.x / .value.y,
// so the node graph never changes and the shader is never recompiled.
// The lesson writes uniform(vec2(2, 0.25)); a Vector2 instance is the same node,
// and it gives the sliders a plain object to mutate.
const frequencies = uniform(new Vector2(2, 0.25));

// The lesson's pattern: elevation scaled by .x, pushed by time scaled by .y,
// wrapped back to 0 by fract(). A float, which colorNode auto-converts to vec3.
const pattern = positionWorld.y.mul(frequencies.x).sub(time.mul(frequencies.y)).fract();

// uniform() takes colours too. `_color` keeps the lesson's name, which exists to
// avoid colliding with TSL's own color() node. The underscore is the point, so keep it.
// eslint-disable-next-line no-underscore-dangle
const _color = uniform(new Color('crimson'));

// uniformArray() uploads the whole list once; element() picks one entry by index.
// The <'color'> is TypeScript only: @types/three widens an unconstrained literal to
// `string`, which then fails to match colorNode. The JS call is the lesson's.
const colors = uniformArray<'color'>([
  new Color(0x0b5d79),
  new Color(0x5ed6c2),
  new Color(0xfeedaa),
  new Color(0xfc8f74),
  new Color(0xcf2c65),
]);
// floor() and toInt() are optional — element() converts its argument to int, which
// floors it at the same time. Spelling it out costs nothing and reads better.
const bandIndex = pattern.mul(colors.array.length).floor().toInt();

// ── Path 2: attribute — one value per vertex ────────────────────────────────
// PlaneGeometry is indexed, so its vertex count is (segments + 1)^2. The buffer has
// to be exactly that long: bufferAttribute() indexes it by vertex id, nothing checks.
const FLOOR_SEGMENTS = 24;
const FLOOR_VERTEX_COUNT = (FLOOR_SEGMENTS + 1) ** 2;
const randomArray = new Float32Array(FLOOR_VERTEX_COUNT);
for (let i = 0; i < FLOOR_VERTEX_COUNT; i++) {
  randomArray[i] = Math.random();
}
const randomBuffer = new BufferAttribute(randomArray, 1);
// The lesson's shortcut: no geometry.setAttribute('random', …) and no attribute('random'),
// TSL binds the buffer to the shader itself.
const randomNode = bufferAttribute<'float'>(randomBuffer, 'float');

// Every colorNode the lesson builds for the torus knot, in order. `source` is what the
// demo prints, so the label, the node and the printed line can never drift apart.
const MODES = [
  { label: 'pattern', source: 'torus.colorNode = pattern;', node: pattern },
  { label: '_color.mul(pattern)', source: 'torus.colorNode = _color.mul(pattern);', node: _color.mul(pattern) },
  {
    label: 'colors.element()',
    source: [
      'const index = pattern.mul(colors.array.length).floor().toInt();',
      'torus.colorNode = colors.element(index);',
    ].join('\n'),
    node: colors.element(bandIndex),
  },
] as const;

type Mode = (typeof MODES)[number];

function Scene({ mode, showRandom }: { mode: Mode; showRandom: boolean }) {
  return (
    <>
      {/* dimmer than the sibling demos on purpose: colorNode here is a raw 0~1 ramp,
          and the usual 0.7 / 2.5 rig blows the bright half of it out to flat white */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 2]} intensity={1.4} />
      <mesh position={[0, 0.35, 0]}>
        <torusKnotGeometry args={[0.6, 0.25, 256, 64]} />
        {/* key: a different colorNode is a different shader, so remount instead of mutating */}
        <meshStandardNodeMaterial key={mode.label} colorNode={mode.node} roughness={0.6} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.15, 0]}>
        <planeGeometry args={[6, 6, FLOOR_SEGMENTS, FLOOR_SEGMENTS]} />
        {/* `color` only shows with the checkbox off: a set colorNode replaces it entirely */}
        <meshStandardNodeMaterial
          key={showRandom ? 'random' : 'plain'}
          color="#64748b"
          colorNode={showRandom ? randomNode : undefined}
          roughness={0.9}
        />
      </mesh>
    </>
  );
}

export function UniformsAttributesDemo() {
  const [mode, setMode] = useState<Mode>(MODES[2]);
  const [positionFrequency, setPositionFrequency] = useState(2);
  const [timeFrequency, setTimeFrequency] = useState(0.25);
  const [tint, setTint] = useState('#dc143c');
  const [showRandom, setShowRandom] = useState(true);

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-3">
      <div className="h-72 w-full overflow-hidden rounded-md bg-slate-900">
        <WebGPUCanvas camera={{ position: [0, 1.4, 4.2], fov: 45 }}>
          <Scene mode={mode} showRandom={showRandom} />
        </WebGPUCanvas>
      </div>
      <pre className="w-full overflow-x-auto rounded bg-slate-100 p-2 font-mono text-xs">
        {`const frequencies = uniform(new THREE.Vector2(${positionFrequency.toFixed(2)}, ${timeFrequency.toFixed(2)}));
const pattern = positionWorld.y
  .mul(frequencies.x)
  .sub(time.mul(frequencies.y))
  .fract();
${mode.source}
floor.colorNode = ${showRandom ? "bufferAttribute(randomBuffer, 'float');" : '(未設定，用 material.color)'}`}
      </pre>
      <div className="flex flex-wrap justify-center gap-1.5 font-mono text-xs">
        {MODES.map((entry) => (
          <button
            key={entry.label}
            type="button"
            onClick={() => setMode(entry)}
            className={`rounded border px-2 py-1 ${
              entry.label === mode.label
                ? 'border-slate-800 bg-slate-800 text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            {entry.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-sm">
        <label className="flex items-center gap-2">
          <span className="w-44 whitespace-nowrap">positionFrequency: {positionFrequency.toFixed(2)}</span>
          <input
            type="range"
            min={0}
            max={10}
            step={0.01}
            value={positionFrequency}
            onChange={(e) => {
              const next = Number(e.target.value);
              setPositionFrequency(next);
              frequencies.value.x = next;
            }}
          />
        </label>
        <label className="flex items-center gap-2">
          <span className="w-40 whitespace-nowrap">timeFrequency: {timeFrequency.toFixed(2)}</span>
          <input
            type="range"
            min={0}
            max={2}
            step={0.01}
            value={timeFrequency}
            onChange={(e) => {
              const next = Number(e.target.value);
              setTimeFrequency(next);
              frequencies.value.y = next;
            }}
          />
        </label>
        <label className="flex items-center gap-2">
          <span className="whitespace-nowrap">_color</span>
          <input
            type="color"
            value={tint}
            disabled={mode.label !== '_color.mul(pattern)'}
            onChange={(e) => {
              const next = e.target.value;
              setTint(next);
              _color.value.set(next);
            }}
          />
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={showRandom} onChange={(e) => setShowRandom(e.target.checked)} />
          <span>地板用 attribute</span>
        </label>
      </div>
      <p className="text-center text-xs text-slate-500">
        兩個 slider 改的是同一個 uniform 的 .value.x / .value.y，shader
        不重編。地板的斑塊是每個頂點一個亂數，被內插成一片 —— 那是 attribute。
      </p>
    </div>
  );
}
