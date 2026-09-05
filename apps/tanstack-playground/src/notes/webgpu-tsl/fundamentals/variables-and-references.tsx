import { useEffect, useMemo, useState } from 'react';
import {
  checker,
  materialColor,
  normalLocal,
  normalView,
  normalWorld,
  positionLocal,
  positionWorld,
  screenUV,
  uv,
  vec3,
  vec4,
} from 'three/tsl';
import * as THREE from 'three/webgpu';
import { WebGPUCanvas } from '~/components/webgpu-canvas';

// ── Node graph: built once at module load ──────────────────────────────────────
// Same debug-view trick as the lesson: outputNode = vec4(reference, 1) skips lighting,
// so the reference itself becomes the pixel colour. One entry per reference in the figure.
const REFERENCES = {
  positionLocal: vec4(positionLocal, 1),
  positionWorld: vec4(positionWorld, 1),
  'uv()': vec4(uv(), 1, 1),
  normalLocal: vec4(normalLocal, 1),
  normalWorld: vec4(normalWorld, 1),
  normalView: vec4(normalView, 1),
  screenUV: vec4(screenUV, 1, 1),
} as const;
type ReferenceName = keyof typeof REFERENCES;
const REFERENCE_NAMES = Object.keys(REFERENCES) as ReferenceName[];

// Floor: checker on top of the material's own map × color, via the materialColor reference
const pattern = vec3(checker(uv().mul(4)));
const floorColor = materialColor.mul(pattern);

// A tiny gradient map for the floor, so "materialColor keeps the map" is visible.
// Built in a hook (not at module level) so prerender never touches GPU resources.
function useGradientMap() {
  const map = useMemo(() => {
    const size = 64;
    const data = new Uint8Array(size * size * 4);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const i = (y * size + x) * 4;
        data[i] = Math.round((255 * x) / (size - 1));
        data[i + 1] = 190;
        data[i + 2] = Math.round((255 * y) / (size - 1));
        data[i + 3] = 255;
      }
    }
    const texture = new THREE.DataTexture(data, size, size);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }, []);
  useEffect(() => () => map.dispose(), [map]);
  return map;
}

function TorusKnot({ reference, rotationY }: { reference: ReferenceName; rotationY: number }) {
  return (
    <mesh position={[0, 0.9, 0]} rotation={[0, rotationY, 0]} castShadow>
      <torusKnotGeometry args={[0.6, 0.25, 128, 32]} />
      {/* key: a different reference is a different shader, so remount instead of mutating */}
      <meshStandardNodeMaterial key={reference} outputNode={REFERENCES[reference]} />
    </mesh>
  );
}

function Floor() {
  const map = useGradientMap();
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]} receiveShadow>
      <planeGeometry args={[6, 6]} />
      <meshStandardNodeMaterial map={map} colorNode={floorColor} />
    </mesh>
  );
}

export function ReferencesDemo() {
  const [reference, setReference] = useState<ReferenceName>('positionLocal');
  const [rotationY, setRotationY] = useState(0);

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-3">
      <div className="h-72 w-full overflow-hidden rounded-md bg-slate-900">
        <WebGPUCanvas shadows camera={{ position: [0, 1.8, 4.2], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 4, 2]} intensity={2.5} castShadow />
          <TorusKnot reference={reference} rotationY={rotationY} />
          <Floor />
        </WebGPUCanvas>
      </div>
      <pre className="w-full overflow-x-auto rounded bg-slate-100 p-2 font-mono text-xs">
        {`material.outputNode = vec4(${reference}, 1)${reference === 'uv()' || reference === 'screenUV' ? '  // vec2 → 補 1, 1' : ''}`}
      </pre>
      <div className="flex flex-wrap justify-center gap-1.5 font-mono text-xs">
        {REFERENCE_NAMES.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setReference(name)}
            className={`rounded border px-2 py-1 ${
              name === reference
                ? 'border-slate-800 bg-slate-800 text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            {name}
          </button>
        ))}
      </div>
      <label className="flex items-center gap-2 font-mono text-sm">
        <span className="w-52 whitespace-nowrap">mesh.rotation.y: {rotationY.toFixed(2)}</span>
        <input
          type="range"
          min={0}
          max={Math.PI * 2}
          step={0.01}
          value={rotationY}
          onChange={(e) => setRotationY(Number(e.target.value))}
        />
      </label>
    </div>
  );
}
