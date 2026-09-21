import { useState } from 'react';
import {
  Fn,
  min,
  mul,
  mx_noise_float,
  mx_noise_vec3,
  positionLocal,
  rotate,
  time,
  uniform,
  uv,
  vec2,
  vec3,
} from 'three/tsl';
import { DoubleSide, PlaneGeometry } from 'three/webgpu';
import { WebGPUCanvas } from '~/components/webgpu-canvas';

// ── The value the diagram marks ─────────────────────────────────────────────
// The lesson hard-codes 5. A uniform lets the slider change it without a recompile.
const windMultiplier = uniform(5);

// ── Vertex stage: where each vertex goes ────────────────────────────────────
// Fn() gives the body a stack, so assign() and addAssign() have somewhere to land.
const smokePosition = Fn(() => {
  // Not a copy. positionLocal is already a named variable in the vertex shader, so both
  // names point at it and the assigns below rewrite it in place.
  const newPosition = positionLocal;

  // Twist
  const angle = positionLocal.y.mul(0.3).sub(time.mul(0.2)).sin().mul(3);
  newPosition.xz.assign(rotate(newPosition.xz, angle));

  // Wind
  const windCoordinates = newPosition.sub(vec3(0, time.mul(0.3), 0)).mul(0.4);
  const windStrength = uv().y.mul(windMultiplier);
  const wind = mx_noise_vec3(windCoordinates).mul(windStrength);
  newPosition.addAssign(wind);

  return newPosition;
})();

// ── Fragment stage: how opaque each pixel is ────────────────────────────────
// No assign here, so no Fn() either: plain nodes chained at module scope.
const smoke = mx_noise_float(
  uv()
    .mul(vec2(3, 2))
    .sub(vec2(0, time.mul(0.1))),
);
const edgeFade = min(
  uv().y.mul(10), // Bottom
  uv().y.oneMinus(), // Top
  uv().x.mul(5), // Left
  uv().x.oneMinus().mul(5), // Right
);
// mx_noise_float() runs -1 to 1, so half the product is negative. On opacityNode, three 0.186
// already floors the output at 0 (NodeMaterial.js, `.max( 0 )`); clamp() is the lesson's safety
// net, and it becomes required if this alpha moves into outputNode.
const smokeOpacity = mul(smoke, edgeFade).clamp(0, 1);

// Same plane as the original lesson. 16 × 64 segments: the twist changes with height, so most
// of the detail goes along it. translate() puts the bottom edge at y = 0, so the plane grows
// up from the cup.
const smokeGeometry = new PlaneGeometry(1, 1, 16, 64).translate(0, 0.5, 0).scale(1.5, 6, 1.5);

const MUG_HEIGHT = 1.6;

function Mug() {
  return (
    <group>
      <mesh position-y={MUG_HEIGHT / 2}>
        <cylinderGeometry args={[1, 0.85, MUG_HEIGHT, 48]} />
        <meshStandardNodeMaterial color="#f4efe8" roughness={0.4} />
      </mesh>
      <mesh position-y={MUG_HEIGHT + 0.001} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[0.9, 48]} />
        <meshStandardNodeMaterial color="#3b2416" roughness={0.2} />
      </mesh>
      <mesh position={[1, MUG_HEIGHT / 2, 0]} rotation-z={-Math.PI / 2}>
        <torusGeometry args={[0.45, 0.11, 16, 32, Math.PI]} />
        <meshStandardNodeMaterial color="#f4efe8" roughness={0.4} />
      </mesh>
    </group>
  );
}

export function CoffeeSmokeDemo() {
  const [windValue, setWindValue] = useState(5);

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-3">
      <div className="h-96 w-full overflow-hidden rounded-md">
        {/* flat: R3F defaults to ACES tone mapping, which would wash out the lesson's 0x7e583a */}
        <WebGPUCanvas flat camera={{ position: [5, 1.2, 7], fov: 45 }}>
          <color attach="background" args={['#f6f3ee']} />
          <ambientLight intensity={1.2} />
          <directionalLight position={[4, 6, 5]} intensity={2} />
          {/* Shift the scene down so the default lookAt(0, 0, 0) lands mid-smoke */}
          <group position-y={-3.1}>
            <mesh rotation-x={-Math.PI / 2}>
              <circleGeometry args={[7, 64]} />
              <meshStandardNodeMaterial color="#8a6a4f" roughness={0.8} />
            </mesh>
            <Mug />
            <mesh geometry={smokeGeometry} position-y={MUG_HEIGHT}>
              {/* transparent: opacityNode is ignored without it. DoubleSide: the twist turns
                  the back toward the camera. depthWrite off: per the original Coffee Smoke lesson,
                  the plane otherwise hides parts of itself from some angles. */}
              <meshBasicNodeMaterial
                color={0x7e583a}
                transparent
                side={DoubleSide}
                depthWrite={false}
                positionNode={smokePosition}
                opacityNode={smokeOpacity}
              />
            </mesh>
          </group>
        </WebGPUCanvas>
      </div>
      <pre className="w-full overflow-x-auto rounded bg-slate-100 p-2 font-mono text-xs">
        {`// Wind
const windCoordinates = newPosition
  .sub(vec3(0, time.mul(0.3), 0))
  .mul(0.4)
const windStrength = uv().y.mul(${windValue.toFixed(1)})
const wind = mx_noise_vec3(windCoordinates).mul(windStrength)
newPosition.addAssign(wind)`}
      </pre>
      <label className="flex items-center gap-2 font-mono text-sm">
        <span className="w-44 whitespace-nowrap font-bold">uv().y.mul({windValue.toFixed(1)})</span>
        <input
          type="range"
          min={0}
          max={10}
          step={0.5}
          value={windValue}
          onChange={(e) => {
            const next = Number(e.target.value);
            setWindValue(next);
            windMultiplier.value = next;
          }}
        />
      </label>
      <p className="text-center text-xs text-slate-500">
        拉到 0，只剩扭轉：煙是一條規規矩矩在原地轉的緞帶。往上拉，頂端被 noise
        推得愈來愈遠，杯口那一排還是不動，因為那裡的 uv().y 是 0。
      </p>
    </div>
  );
}
