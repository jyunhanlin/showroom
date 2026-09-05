import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { checker, positionLocal, sin, time, uniform, uv, vec2, vec3 } from 'three/tsl';
import type * as THREE from 'three/webgpu';
import { WebGPUCanvas } from '~/components/webgpu-canvas';

// ── Node graph: built once at module load, shared by every render ──────────────
// Same nodes as the lesson; the only change is that the wiggle amplitude (0.4)
// becomes a uniform so the slider can drive it without recompiling the shader.
const amplitude = uniform(0.4);

// Fragment stage: animated checker, reused for colorNode and roughnessNode
const pattern = checker(uv().add(time.mul(0.02)).mul(vec2(40, 5)));

// Vertex stage: offset each vertex on z by a sine wave that shifts with its height
const zOffset = sin(time.add(positionLocal.y.mul(3))).mul(amplitude);
const wigglePosition = positionLocal.add(vec3(0, 0, zOffset));
const torusColor = vec3(pattern, 0, 0);

// Floor: radial fade via opacityNode (smoothstep args reversed so 1 → 0 outward)
const fade = uv().sub(0.5).length().smoothstep(0.5, 0.2);

function TorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.25;
  });
  return (
    <mesh ref={meshRef} position={[0, 0.9, 0]} castShadow>
      <torusKnotGeometry args={[0.6, 0.25, 128, 32]} />
      <meshStandardNodeMaterial
        metalness={0.5}
        colorNode={torusColor}
        roughnessNode={pattern}
        positionNode={wigglePosition}
      />
    </mesh>
  );
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]} receiveShadow>
      <planeGeometry args={[6, 6]} />
      <meshStandardNodeMaterial color="#cbd5e1" transparent opacityNode={fade} />
    </mesh>
  );
}

export function NodeMaterialDemo() {
  const [amp, setAmp] = useState(0.4);

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-3">
      <div className="h-72 w-full overflow-hidden rounded-md bg-slate-900">
        <WebGPUCanvas shadows camera={{ position: [0, 1.8, 4.2], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 4, 2]} intensity={2.5} castShadow />
          <TorusKnot />
          <Floor />
        </WebGPUCanvas>
      </div>
      <pre className="w-full overflow-x-auto rounded bg-slate-100 p-2 font-mono text-xs">
        {`positionNode = positionLocal.add(vec3(0, 0, sin(time.add(positionLocal.y.mul(3))).mul(${amp.toFixed(2)})))`}
      </pre>
      <label className="flex items-center gap-2 font-mono text-sm">
        <span className="w-32">amplitude: {amp.toFixed(2)}</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={amp}
          onChange={(e) => {
            const next = Number(e.target.value);
            setAmp(next);
            amplitude.value = next; // uniform update: no shader rebuild
          }}
        />
      </label>
    </div>
  );
}
