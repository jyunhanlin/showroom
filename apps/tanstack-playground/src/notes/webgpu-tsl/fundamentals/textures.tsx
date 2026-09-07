import { useMemo, useState } from 'react';
import {
  blendBurn,
  blendColor,
  blendDodge,
  grayscale,
  hue,
  materialColor,
  mix,
  normalWorld,
  oscSine,
  positionWorld,
  saturation,
  texture,
  time,
  triplanarTexture,
  uniform,
  uv,
  vec4,
  vibrance,
} from 'three/tsl';
import { CanvasTexture, RepeatWrapping, SRGBColorSpace, type Texture } from 'three/webgpu';
import { WebGPUCanvas } from '~/components/webgpu-canvas';

// ── The one value the diagram marks ──────────────────────────────────────────
// uniform() so dragging the slider mutates a value instead of recompiling a shader.
// It feeds both paths: uv().mul(scale) on the floor, scaleNode on the triplanar torus.
const uvScale = uniform(3);

// The lesson's slow 0→1 oscillation. oscSine() defaults to `time`, whose period is
// one second — too fast to read, hence time.mul(0.2).
const oscillation = oscSine(time.mul(0.2));

// ── The texture, drawn here instead of loaded ────────────────────────────────
// A 4x4 checker with one orange cell at the tile origin: count the orange cells and
// you have counted how many times the texture repeats.
function makeUvChecker(): Texture | null {
  const size = 256;
  const cells = 4;
  const step = size / cells;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  for (let y = 0; y < cells; y++) {
    for (let x = 0; x < cells; x++) {
      ctx.fillStyle = (x + y) % 2 === 0 ? '#e2e8f0' : '#64748b';
      ctx.fillRect(x * step, y * step, step, step);
    }
  }
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(0, 0, step, step);

  const map = new CanvasTexture(canvas);
  map.colorSpace = SRGBColorSpace; // a colour texture is sRGB; texture() reads this and decodes for you
  map.wrapS = RepeatWrapping; // still honoured when you pass your own uv — repeat/rotation are not
  map.wrapT = RepeatWrapping;
  map.anisotropy = 4; // the floor is seen at a grazing angle, where mipmaps alone still moire
  return map;
}

// Every colour node the lesson runs through, in order. `source` is what the demo prints,
// so the label, the node and the printed line can never drift apart.
function buildChains(map: Texture) {
  const sampled = texture(map, uv().mul(uvScale));
  return [
    { label: '(none)', source: 'sampled', node: sampled },
    {
      label: 'mix()',
      source: 'mix(sampled.rgb, materialColor, oscillation)',
      node: mix(sampled.rgb, materialColor, oscillation),
    },
    {
      label: 'blendDodge()',
      source: 'blendDodge(sampled.rgb, materialColor)',
      node: blendDodge(sampled.rgb, materialColor),
    },
    {
      label: 'blendBurn()',
      source: 'blendBurn(sampled.rgb, materialColor)',
      node: blendBurn(sampled.rgb, materialColor),
    },
    {
      label: 'blendColor()',
      source: 'blendColor(vec4(sampled.rgb, 0.7), vec4(materialColor, 0.5))',
      node: blendColor(vec4(sampled.rgb, 0.7), vec4(materialColor, 0.5)),
    },
    {
      label: 'saturation()',
      source: 'saturation(sampled.rgb, oscillation.mul(2))',
      node: saturation(sampled.rgb, oscillation.mul(2)),
    },
    { label: 'grayscale()', source: 'grayscale(sampled.rgb)', node: grayscale(sampled.rgb) },
    { label: 'vibrance()', source: 'vibrance(sampled.rgb, oscillation)', node: vibrance(sampled.rgb, oscillation) },
    { label: 'hue()', source: 'hue(sampled.rgb, time)', node: hue(sampled.rgb, time) },
  ];
}

type Chain = ReturnType<typeof buildChains>[number];

function Scene({ map, chain, triplanar }: { map: Texture; chain: Chain; triplanar: boolean }) {
  const torusColor = useMemo(
    () =>
      triplanar
        ? // no UV involved: sample xy / yz / zx by world position, blend by world normal
          triplanarTexture(texture(map), null, null, uvScale, positionWorld, normalWorld)
        : texture(map, uv().mul(uvScale)),
    [map, triplanar],
  );

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 2]} intensity={2.5} />
      <mesh position={[0, 0.35, 0]}>
        <torusKnotGeometry args={[0.6, 0.25, 256, 64]} />
        {/* key: a different colorNode is a different shader, so remount instead of mutating */}
        <meshStandardNodeMaterial key={triplanar ? 'triplanar' : 'uv'} colorNode={torusColor} roughness={0.6} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.15, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshStandardNodeMaterial key={chain.label} color="crimson" colorNode={chain.node} roughness={0.9} />
      </mesh>
    </>
  );
}

export function TexturesDemo() {
  const map = useMemo(() => makeUvChecker(), []);
  const chains = useMemo(() => (map ? buildChains(map) : []), [map]);
  const [index, setIndex] = useState(1);
  const [triplanar, setTriplanar] = useState(true);
  const [scale, setScale] = useState(3);

  const chain = chains[index] ?? chains[0];

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-3">
      <div className="h-72 w-full overflow-hidden rounded-md bg-slate-900">
        <WebGPUCanvas camera={{ position: [0, 1.5, 4.2], fov: 45 }}>
          {map && chain && <Scene map={map} chain={chain} triplanar={triplanar} />}
        </WebGPUCanvas>
      </div>
      <pre className="w-full overflow-x-auto rounded bg-slate-100 p-2 font-mono text-xs">
        {`const sampled = texture(uvChecker, uv().mul(${scale}));
floor.colorNode = ${chain?.source ?? ''};
torus.colorNode = ${
          triplanar
            ? `triplanarTexture(texture(uvChecker), null, null,
                   float(${scale}), positionWorld, normalWorld);`
            : `texture(uvChecker, uv().mul(${scale}));`
        }`}
      </pre>
      <div className="flex flex-wrap justify-center gap-1.5 font-mono text-xs">
        {chains.map((entry, i) => (
          <button
            key={entry.label}
            type="button"
            onClick={() => setIndex(i)}
            className={`rounded border px-2 py-1 ${
              i === index
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
          <span className="w-20 whitespace-nowrap">scale: {scale}</span>
          <input
            type="range"
            min={1}
            max={8}
            step={1}
            value={scale}
            onChange={(e) => {
              const next = Number(e.target.value);
              setScale(next);
              uvScale.value = next;
            }}
          />
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={triplanar} onChange={(e) => setTriplanar(e.target.checked)} />
          <span>torus 用 triplanar</span>
        </label>
      </div>
      <p className="text-center text-xs text-slate-500">
        地板數橘格：scale 幾就有幾排。torus 取消 triplanar 就看得到 UV 沿著管子被拉長，打勾則改用 world position 取樣。
      </p>
    </div>
  );
}
