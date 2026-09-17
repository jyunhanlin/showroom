import { useFrame } from '@react-three/fiber';
import { useState } from 'react';
import { color, mix, mx_noise_float, mx_worley_noise_float, parallaxUV, time, uniform, uv, vec3 } from 'three/tsl';
import type { Node } from 'three/webgpu';
import { WebGPUCanvas } from '~/components/webgpu-canvas';

// ── The value the diagram marks ─────────────────────────────────────────────
// The lesson hard-codes 0.5. A uniform lets the slider change it without a recompile.
// Not named `depth`: that is a TSL node too.
const parallaxDepth = uniform(0.5);

// ── Caustics: the far-away water floor ──────────────────────────────────────
// parallaxUV() is uv minus a vec3 view direction, so it hands back a vec3.
// Without .xy, vec3(depthUv.mul(6), …) gets four components and TSL logs an error.
// @types/three declares the return as an untyped Node, which has no swizzle; the cast
// states what three.js actually returns.
const depthUv = (parallaxUV(uv(), parallaxDepth) as Node<'vec3'>).xy;
const causticsInput = vec3(depthUv.mul(6), time.mul(0.3));
const causticsNoise = mx_worley_noise_float(causticsInput).pow(3);
const depthColor = mix(color(0x1b3956), color(0x11eeff), causticsNoise);

// ── Foam: on the surface, so plain uv() ─────────────────────────────────────
// Perlin noise runs -1 to 1; abs() folds the zero crossings into thin valleys, step() cuts them.
const foamInput = vec3(uv().mul(5), time.mul(0.1));
const foamNoise = mx_noise_float(foamInput);
const foamMask = foamNoise.abs().step(0.05).oneMinus();
const foamColor = color(0xe5f7ff);

// ── Lily pads: also on the surface ──────────────────────────────────────────
const lilyPadInput = vec3(uv().mul(4), 0);
const lilyPadNoise = mx_worley_noise_float(lilyPadInput);
const lilyPadMask = lilyPadNoise.step(0.2).oneMinus();
// div(0.2) matches the step(0.2) above, so the gradient ends exactly at the pad's edge.
const lilyPadColor = mix(color(0xd7e689), color(0x329a89), lilyPadNoise.div(0.2));

// `let` only re-points a JavaScript variable at a bigger graph; nothing is assigned in the shader.
let final = mix(depthColor, foamColor, foamMask);
final = mix(final, lilyPadColor, lilyPadMask);

// The lesson previews each layer by sending it to colorNode on its own. Same order as the diagram.
const VIEWS = [
  { label: 'depthColor', source: 'material.colorNode = depthColor', node: depthColor },
  { label: 'foamMask', source: 'material.colorNode = vec3(foamMask)', node: vec3(foamMask) },
  {
    label: 'lilyPadColor × mask',
    source: 'material.colorNode = lilyPadColor.mul(lilyPadMask)',
    node: lilyPadColor.mul(lilyPadMask),
  },
  { label: 'final', source: 'material.colorNode = final', node: final },
] as const;

type View = (typeof VIEWS)[number];

const floorColor = color(0x3f4a3c);

// The pond is flat, so parallax only shows while the eye moves. Sway the camera so the
// caustics visibly slide under the foam and the lily pads without anyone dragging.
const CAMERA_DISTANCE = 4;
const CAMERA_HEIGHT = 3.4;

function Pond({ view }: { view: View }) {
  useFrame(({ camera, clock }) => {
    const angle = Math.sin(clock.elapsedTime * 0.5) * 0.6;
    camera.position.set(Math.sin(angle) * CAMERA_DISTANCE, CAMERA_HEIGHT, Math.cos(angle) * CAMERA_DISTANCE);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <mesh rotation-x={-Math.PI * 0.5}>
        <planeGeometry args={[14, 14]} />
        <meshBasicNodeMaterial colorNode={floorColor} />
      </mesh>
      <mesh rotation-x={-Math.PI * 0.5} position-y={0.01}>
        <circleGeometry args={[2, 32]} />
        {/* key: a different colorNode is a different shader, so remount rather than mutate */}
        <meshBasicNodeMaterial key={view.label} colorNode={view.node} />
      </mesh>
    </>
  );
}

export function PatternsDemo() {
  const [viewIndex, setViewIndex] = useState(VIEWS.length - 1);
  const [depthValue, setDepthValue] = useState(0.5);
  const view = VIEWS[viewIndex]!;

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-3">
      <div className="h-72 w-full overflow-hidden rounded-md bg-slate-900">
        {/* flat: R3F defaults to ACES tone mapping, which would wash out the lesson's hex colors */}
        <WebGPUCanvas flat camera={{ position: [0, CAMERA_HEIGHT, CAMERA_DISTANCE], fov: 45 }}>
          <Pond view={view} />
        </WebGPUCanvas>
      </div>
      <pre className="w-full overflow-x-auto rounded bg-slate-100 p-2 font-mono text-xs">
        {`const depthUv = parallaxUV(uv(), ${depthValue.toFixed(2)}).xy
const causticsInput = vec3(depthUv.mul(6), time.mul(0.3))
const foamInput = vec3(uv().mul(5), time.mul(0.1))
const lilyPadInput = vec3(uv().mul(4), 0)
${view.source}`}
      </pre>
      <div className="flex flex-wrap justify-center gap-1.5 font-mono text-xs">
        {VIEWS.map((entry, index) => (
          <button
            key={entry.label}
            type="button"
            onClick={() => setViewIndex(index)}
            className={`rounded border px-2 py-1 ${
              index === viewIndex
                ? 'border-slate-800 bg-slate-800 text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            {entry.label}
          </button>
        ))}
      </div>
      <label className="flex items-center gap-2 font-mono text-sm">
        <span className="w-40 whitespace-nowrap font-bold">parallaxDepth: {depthValue.toFixed(2)}</span>
        <input
          type="range"
          min={-0.5}
          max={1.5}
          step={0.05}
          value={depthValue}
          onChange={(e) => {
            const next = Number(e.target.value);
            setDepthValue(next);
            parallaxDepth.value = next;
          }}
        />
      </label>
      <p className="text-center text-xs text-slate-500">
        鏡頭自己左右晃。parallaxDepth 拉到 0，caustics 跟泡沫、睡蓮黏在一起動；往上拉，caustics
        在水面底下滑得愈多，格子也變小，看起來愈深；拉成負的，格子變大，像浮到水面上來。泡沫和睡蓮用的是原本的
        uv()，slider 管不到它們。
      </p>
    </div>
  );
}
