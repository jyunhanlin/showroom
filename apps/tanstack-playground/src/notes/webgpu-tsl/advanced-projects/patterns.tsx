import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import {
  add,
  atan,
  checker,
  color,
  cos,
  Fn,
  hash,
  mix,
  mul,
  mx_noise_float,
  mx_worley_noise_float,
  parallaxUV,
  PI,
  rand,
  time,
  uniform,
  uv,
  vec3,
} from 'three/tsl';
import type { Node, WebGPURenderer } from 'three/webgpu';
import { WebGPUCanvas } from '~/components/webgpu-canvas';
import { attachInspector } from '~/components/webgpu-inspector';

// ── Patterns 1–9: the lesson's final version of each ────────────────────────
const pattern1 = vec3(uv(), 1);
const pattern2 = vec3(uv().x);
const pattern3 = vec3(uv().x.mul(10).fract());

const pattern4 = vec3(add(uv().x.mul(10).fract().step(0.5), uv().y.mul(10).fract().step(0.5)).sub(1).abs());
const pattern4Checker = vec3(checker(uv().mul(10)));

const pattern5 = vec3(uv().distance(0.5));

const polarUv = uv().sub(0.5);
const angle = atan(polarUv.x, polarUv.y);
const pattern6 = vec3(angle.remap(PI.negate(), PI, 0, 1));

const subdivisions = 10;
const gridUv = uv().mul(subdivisions).floor();
// The lesson's wrong turn: hash() keeps only .x, so every column gets one value.
const pattern7Hash = vec3(hash(gridUv));
const pattern7 = vec3(rand(gridUv));

const perlinUv = uv().mul(5);
const perlinNoise = mx_noise_float(perlinUv);
const pattern8 = vec3(perlinNoise.mul(5).add(time).fract().step(0.8));

// By Inigo Quilez (https://iquilezles.org/articles/palettes/)
const palette = Fn(
  ([t, a, b, c, d]: [Node<'float'>, Node<'vec3'>, Node<'vec3'>, Node<'vec3'>, Node<'vec3'>]) => {
    return a.add(b.mul(cos(mul(6.283185, c.mul(t).add(d)))));
  },
  { t: 'float', a: 'vec3', b: 'vec3', c: 'vec3', d: 'vec3', return: 'vec3' },
);
const worleyUv = uv().mul(10);
const worleyNoise = mx_worley_noise_float(vec3(worleyUv, time));
const pattern9 = palette(
  worleyNoise,
  vec3(0.5, 0.3, 0.4),
  vec3(0.9, 0.5, 0.4),
  vec3(1.0, 1.0, 1.0),
  vec3(0.0, 0.1, 0.2),
);

// ── Pattern 10: the pond ────────────────────────────────────────────────────
// The lesson hard-codes 0.5. A uniform lets the Inspector slider change it without a recompile.
// Not named `depth`: that is a TSL node too.
const parallaxDepth = uniform(0.5);

// Caustics: the far-away water floor.
// parallaxUV() is uv minus a vec3 view direction, so it hands back a vec3.
// Without .xy, vec3(depthUv.mul(6), …) gets four components and TSL logs an error.
// @types/three declares the return as an untyped Node, which has no swizzle; the cast
// states what three.js actually returns.
const depthUv = (parallaxUV(uv(), parallaxDepth) as Node<'vec3'>).xy;
const causticsInput = vec3(depthUv.mul(6), time.mul(0.3));
const causticsNoise = mx_worley_noise_float(causticsInput).pow(3);
// toInspector() passes the value through unchanged and also sends it to the Inspector's Viewer tab.
// The preview exists only while `final` is compiled, i.e. while a Pattern 10 view is picked.
// toVar() first is required, not style: mix()/step()/oneMinus() return an *intent* VarNode, whose
// build() skips super.build(), and super.build() is where toInspector()'s before-node gets registered.
// Without it the Viewer stays empty and nothing warns (three 0.186 VarNode.js / MathNode.js).
const depthColor = mix(color(0x1b3956), color(0x11eeff), causticsNoise).toVar('depthColor').toInspector('depthColor');

// Foam: on the surface, so plain uv().
// Perlin noise runs -1 to 1; abs() folds the zero crossings into thin valleys, step() cuts them.
const foamInput = vec3(uv().mul(5), time.mul(0.1));
const foamNoise = mx_noise_float(foamInput);
const foamMask = foamNoise.abs().step(0.05).oneMinus().toVar('foamMask').toInspector('foamMask');
const foamColor = color(0xe5f7ff);

// Lily pads: also on the surface.
const lilyPadInput = vec3(uv().mul(4), 0);
const lilyPadNoise = mx_worley_noise_float(lilyPadInput);
const lilyPadMask = lilyPadNoise.step(0.2).oneMinus().toVar('lilyPadMask').toInspector('lilyPadMask');
// div(0.2) matches the step(0.2) above, so the gradient ends exactly at the pad's edge.
const lilyPadColor = mix(color(0xd7e689), color(0x329a89), lilyPadNoise.div(0.2))
  .toVar('lilyPadColor')
  .toInspector('lilyPadColor');

// `let` only re-points a JavaScript variable at a bigger graph; nothing is assigned in the shader.
let final = mix(depthColor, foamColor, foamMask);
final = mix(final, lilyPadColor, lilyPadMask);

// Same order as the lesson. `pond` views go on the floor puddle, the rest on the upright plane.
const VIEWS = [
  { label: 'Pattern 1', pond: false, node: pattern1, source: 'material.colorNode = vec3(uv(), 1)' },
  { label: 'Pattern 2', pond: false, node: pattern2, source: 'material.colorNode = vec3(uv().x)' },
  { label: 'Pattern 3', pond: false, node: pattern3, source: 'material.colorNode = vec3(uv().x.mul(10).fract())' },
  {
    label: 'Pattern 4',
    pond: false,
    node: pattern4,
    source: `material.colorNode = vec3(
  add(
    uv().x.mul(10).fract().step(0.5),
    uv().y.mul(10).fract().step(0.5)
  ).sub(1).abs()
)`,
  },
  {
    label: 'Pattern 4 · checker()',
    pond: false,
    node: pattern4Checker,
    source: 'material.colorNode = vec3(checker(uv().mul(10)))',
  },
  { label: 'Pattern 5', pond: false, node: pattern5, source: 'material.colorNode = vec3(uv().distance(0.5))' },
  {
    label: 'Pattern 6',
    pond: false,
    node: pattern6,
    source: `const polarUv = uv().sub(0.5)
const angle = atan(polarUv.x, polarUv.y)
material.colorNode = vec3(angle.remap(PI.negate(), PI, 0, 1))`,
  },
  {
    label: 'Pattern 7 · hash(gridUv)',
    pond: false,
    node: pattern7Hash,
    source: `const gridUv = uv().mul(10).floor()
const random = hash(gridUv) // only gridUv.x survives
material.colorNode = vec3(random)`,
  },
  {
    label: 'Pattern 7',
    pond: false,
    node: pattern7,
    source: `const subdivisions = 10
const gridUv = uv().mul(subdivisions).floor()
const random = rand(gridUv)
material.colorNode = vec3(random)`,
  },
  {
    label: 'Pattern 8',
    pond: false,
    node: pattern8,
    source: `const perlinUv = uv().mul(5)
const perlinNoise = mx_noise_float(perlinUv)
material.colorNode = vec3(
  perlinNoise.mul(5).add(time).fract().step(0.8)
)`,
  },
  {
    label: 'Pattern 9',
    pond: false,
    node: pattern9,
    source: `const worleyUv = uv().mul(10)
const worleyNoise = mx_worley_noise_float(vec3(worleyUv, time))
material.colorNode = palette(
  worleyNoise,
  vec3(0.5, 0.3, 0.4),
  vec3(0.9, 0.5, 0.4),
  vec3(1.0, 1.0, 1.0),
  vec3(0.0, 0.1, 0.2)
)`,
  },
  { label: 'Pattern 10 · depthColor', pond: true, node: depthColor, source: 'material.colorNode = depthColor' },
  { label: 'Pattern 10 · foamMask', pond: true, node: vec3(foamMask), source: 'material.colorNode = vec3(foamMask)' },
  {
    label: 'Pattern 10 · lilyPad',
    pond: true,
    node: lilyPadColor.mul(lilyPadMask),
    source: 'material.colorNode = lilyPadColor.mul(lilyPadMask)',
  },
  { label: 'Pattern 10 · final', pond: true, node: final, source: 'material.colorNode = final' },
] as const;

type View = (typeof VIEWS)[number];

const POND_SOURCE = (depthValue: number) => `const depthUv = parallaxUV(uv(), ${depthValue.toFixed(2)}).xy
const causticsInput = vec3(depthUv.mul(6), time.mul(0.3))
const foamInput = vec3(uv().mul(5), time.mul(0.1))
const lilyPadInput = vec3(uv().mul(4), 0)
`;

const floorColor = color(0x3f4a3c);

// The pond is flat, so parallax only shows while the eye moves. Sway the camera so the
// caustics visibly slide under the foam and the lily pads without anyone dragging.
// Patterns 1–9 sit on an upright plane like the lesson's starter, so the camera stays in front.
const CAMERA_DISTANCE = 4;
const CAMERA_HEIGHT = 3.4;

function Scene({ view }: { view: View }) {
  useFrame(({ camera, clock }) => {
    if (view.pond) {
      const swing = Math.sin(clock.elapsedTime * 0.5) * 0.6;
      camera.position.set(Math.sin(swing) * CAMERA_DISTANCE, CAMERA_HEIGHT, Math.cos(swing) * CAMERA_DISTANCE);
      camera.lookAt(0, 0, 0);
    } else {
      // Aim above the plane so it sits in the lower part of the tall view, clear of the
      // Inspector's Parameters panel in the top-right corner.
      camera.position.set(0, 1.3, 3.6);
      camera.lookAt(0, 1.3, 0);
    }
  });

  return (
    <>
      <mesh rotation-x={-Math.PI * 0.5}>
        <planeGeometry args={[14, 14]} />
        <meshBasicNodeMaterial colorNode={floorColor} />
      </mesh>
      {view.pond ? (
        <mesh rotation-x={-Math.PI * 0.5} position-y={0.01}>
          <circleGeometry args={[2, 32]} />
          {/* key: a different colorNode is a different shader, so remount rather than mutate */}
          <meshBasicNodeMaterial key={view.label} colorNode={view.node} />
        </mesh>
      ) : (
        <mesh position-y={1}>
          <planeGeometry args={[2, 2]} />
          <meshBasicNodeMaterial key={view.label} colorNode={view.node} />
        </mesh>
      )}
    </>
  );
}

// The lesson's starter runs the renderer with the Inspector; this puts the pattern picker in its
// Parameters tab.
function PatternsInspector({
  initialLabel,
  onPick,
  onDepth,
}: {
  initialLabel: string;
  onPick: (index: number) => void;
  onDepth: (value: number) => void;
}) {
  const gl = useThree((state) => state.gl) as unknown as WebGPURenderer;

  useEffect(
    () =>
      attachInspector(gl, (inspector) => {
        const gui = inspector.createParameters('Patterns');
        const params = { pattern: initialLabel };
        gui
          .add(
            params,
            'pattern',
            VIEWS.map((entry) => entry.label),
          )
          .onChange((label: string) => onPick(VIEWS.findIndex((entry) => entry.label === label)));
        gui
          .add(parallaxDepth, 'value', -0.5, 1.5, 0.05)
          .name('parallaxDepth')
          .onChange((value: number) => onDepth(value));
      }),
    // Build the panel once per renderer; the callbacks only call React setters.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gl],
  );

  return null;
}

export function PatternsDemo() {
  const [viewIndex, setViewIndex] = useState(VIEWS.length - 1);
  const [depthValue, setDepthValue] = useState(parallaxDepth.value);
  const view = VIEWS[viewIndex]!;

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-3">
      <div className="h-[40rem] w-full overflow-hidden rounded-md bg-slate-900">
        {/* flat: R3F defaults to ACES tone mapping, which would wash out the lesson's hex colors */}
        <WebGPUCanvas flat camera={{ position: [0, CAMERA_HEIGHT, CAMERA_DISTANCE], fov: 45 }}>
          <Scene view={view} />
          <PatternsInspector initialLabel={view.label} onPick={setViewIndex} onDepth={setDepthValue} />
        </WebGPUCanvas>
      </div>
      <pre className="w-full overflow-x-auto rounded bg-slate-100 p-2 font-mono text-xs">
        {view.pond ? POND_SOURCE(depthValue) + view.source : view.source}
      </pre>
      <p className="text-center text-xs text-slate-500">
        右上角 Inspector 的 Parameters 切 pattern，順序跟課程一樣。Pattern 10 的鏡頭會自己左右晃，parallaxDepth 拉到
        0，caustics 跟泡沫、睡蓮黏在一起動；往上拉，caustics 在水面底下滑得愈多。選 Pattern 10 時打開 Viewer 分頁，四層
        toInspector() 的畫面會並排出現。
      </p>
    </div>
  );
}
