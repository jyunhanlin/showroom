import { useState } from 'react';
import {
  hash,
  mx_noise_float,
  mx_noise_vec3,
  positionLocal,
  positionWorld,
  rand,
  rotate,
  time,
  uniform,
  uv,
  vec2,
  vec3,
} from 'three/tsl';
import { WebGPUCanvas } from '~/components/webgpu-canvas';

// ── Node graph: built once at module load ─────────────────────────────────────
// One uniform for the slider, so dragging it does not recompile the shader.
// uniform() is lesson 07; the lesson itself hard-codes the weight as 1.
const twist = uniform(0);

// The twist from the lesson. `time` is one value per frame, `positionLocal.y` is one
// value per vertex — added together they give an angle that is both.
// twist = 0 collapses it back to a single angle shared by the whole mesh.
const angle = time.add(positionLocal.y.mul(twist)).sin();
const newXZ = rotate(positionLocal.xz, angle);
const twistedPosition = vec3(newXZ.x, positionLocal.y, newXZ.y);

// Every pattern the lesson runs through, in order. `source` is what the demo prints, so the
// label, the node and the printed line can never drift apart.
const PATTERNS = [
  { label: 'time.sin()', source: 'vec3(time.sin().remap(-1, 1, 0, 1))', node: vec3(time.sin().remap(-1, 1, 0, 1)) },
  { label: 'hash(uv().x)', source: 'vec3(hash(uv().x.mul(100)))', node: vec3(hash(uv().x.mul(100))) },
  { label: 'rand(uv())', source: 'vec3(rand(uv()))', node: vec3(rand(uv())) },
  {
    label: 'rand(uv().floor())',
    source: 'vec3(rand(uv().mul(100).floor()))',
    node: vec3(rand(uv().mul(100).floor())),
  },
  {
    label: 'mx_noise_float(uv)',
    source: 'vec3(mx_noise_float(uv().mul(vec2(50, 10))))',
    node: vec3(mx_noise_float(uv().mul(vec2(50, 10)))),
  },
  {
    label: 'mx_noise_float(world)',
    source: 'vec3(mx_noise_float(positionWorld.mul(4)))',
    node: vec3(mx_noise_float(positionWorld.mul(4))),
  },
  {
    label: 'mx_noise_vec3(world)',
    source: 'mx_noise_vec3(positionWorld.mul(10))',
    node: mx_noise_vec3(positionWorld.mul(10)),
  },
] as const;

type Pattern = (typeof PATTERNS)[number];

function TorusKnot({ pattern }: { pattern: Pattern }) {
  return (
    <mesh position={[0, 0.3, 0]}>
      <torusKnotGeometry args={[0.6, 0.25, 256, 64]} />
      {/* key: a different colorNode is a different shader, so remount instead of mutating */}
      <meshStandardNodeMaterial key={pattern.label} positionNode={twistedPosition} colorNode={pattern.node} />
    </mesh>
  );
}

export function MathDemo() {
  const [pattern, setPattern] = useState<Pattern>(PATTERNS[5]);
  const [twistValue, setTwistValue] = useState(0);

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-3">
      <div className="h-72 w-full overflow-hidden rounded-md bg-slate-900">
        <WebGPUCanvas camera={{ position: [0, 0.7, 4.2], fov: 45 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 4, 2]} intensity={2.5} />
          <TorusKnot pattern={pattern} />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, 0]}>
            <planeGeometry args={[6, 6]} />
            <meshStandardNodeMaterial color="#1e293b" roughness={0.9} />
          </mesh>
        </WebGPUCanvas>
      </div>
      <pre className="w-full overflow-x-auto rounded bg-slate-100 p-2 font-mono text-xs">
        {`const angle = time.add(positionLocal.y.mul(${twistValue.toFixed(1)})).sin();
const newXZ = rotate(positionLocal.xz, angle);
material.positionNode = vec3(newXZ.x, positionLocal.y, newXZ.y);
material.colorNode = ${pattern.source};`}
      </pre>
      <div className="flex flex-wrap justify-center gap-1.5 font-mono text-xs">
        {PATTERNS.map((entry) => (
          <button
            key={entry.label}
            type="button"
            onClick={() => setPattern(entry)}
            className={`rounded border px-2 py-1 ${
              entry.label === pattern.label
                ? 'border-slate-800 bg-slate-800 text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            {entry.label}
          </button>
        ))}
      </div>
      <label className="flex items-center gap-2 font-mono text-sm">
        <span className="w-52 whitespace-nowrap">twist: {twistValue.toFixed(1)}</span>
        <input
          type="range"
          min={0}
          max={6}
          step={0.1}
          value={twistValue}
          onChange={(e) => {
            const next = Number(e.target.value);
            setTwistValue(next);
            twist.value = next;
          }}
        />
      </label>
      <p className="text-center text-xs text-slate-500">
        twist 0 = 整塊一起晃（每個頂點同一個 angle）。往上拉，高度不同的頂點角度就不同，才變成扭。
      </p>
    </div>
  );
}
