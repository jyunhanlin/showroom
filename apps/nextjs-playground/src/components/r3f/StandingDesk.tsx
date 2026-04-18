'use client';

import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useState } from 'react';
import { Group, Mesh, MathUtils } from 'three';

const MIN_HEIGHT = 0.65;
const MAX_HEIGHT = 1.25;
const START_HEIGHT = 0.74;
const SPEED = 0.38;
const INITIAL_DIR: Direction = 0;

const DESKTOP_THICKNESS = 0.04;
const DESKTOP_HALF = DESKTOP_THICKNESS / 2;
const OUTER_LEG_HEIGHT = 0.55;
const INNER_LEG_HEIGHT = 1.25;

type Direction = -1 | 0 | 1;

type DeskRigProps = {
  heightRef: React.MutableRefObject<number>;
  dirRef: React.MutableRefObject<Direction>;
  onDisplayUpdate: (cm: number) => void;
};

function DeskRig({ heightRef, dirRef, onDisplayUpdate }: DeskRigProps) {
  const topRef = useRef<Group>(null);
  const innerLegLeftRef = useRef<Mesh>(null);
  const innerLegRightRef = useRef<Mesh>(null);
  const lastUiUpdate = useRef(0);

  useFrame((_, delta) => {
    const next = MathUtils.clamp(heightRef.current + dirRef.current * SPEED * delta, MIN_HEIGHT, MAX_HEIGHT);
    heightRef.current = next;

    if (topRef.current) {
      topRef.current.position.y = next + DESKTOP_THICKNESS;
    }
    const innerY = next - INNER_LEG_HEIGHT / 2 - DESKTOP_HALF;
    if (innerLegLeftRef.current) innerLegLeftRef.current.position.y = innerY;
    if (innerLegRightRef.current) innerLegRightRef.current.position.y = innerY;

    lastUiUpdate.current += delta;
    if (lastUiUpdate.current > 0.066) {
      lastUiUpdate.current = 0;
      onDisplayUpdate(Math.round(next * 100));
    }
  });

  return (
    <group>
      <group ref={topRef} position={[0, START_HEIGHT + DESKTOP_THICKNESS, 0]}>
        <mesh position={[0, -DESKTOP_HALF, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.6, DESKTOP_THICKNESS, 0.8]} />
          <meshStandardMaterial color="#c9a37a" roughness={0.55} metalness={0.05} />
        </mesh>
        <mesh position={[0, 0.005, -0.15]} castShadow receiveShadow>
          <boxGeometry args={[0.22, 0.01, 0.12]} />
          <meshStandardMaterial color="#2a2a2e" roughness={0.6} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.06, -0.2]} castShadow>
          <boxGeometry args={[0.12, 0.1, 0.05]} />
          <meshStandardMaterial color="#2a2a2e" roughness={0.5} metalness={0.15} />
        </mesh>
        <mesh position={[0, 0.27, -0.2]} castShadow>
          <boxGeometry args={[0.5, 0.32, 0.03]} />
          <meshStandardMaterial color="#1f1f22" roughness={0.4} metalness={0.2} />
        </mesh>
      </group>

      <Leg x={-0.65} innerRef={innerLegLeftRef} />
      <Leg x={0.65} innerRef={innerLegRightRef} />
    </group>
  );
}

type LegProps = {
  x: number;
  innerRef: React.RefObject<Mesh | null>;
};

function Leg({ x, innerRef }: LegProps) {
  const innerY = START_HEIGHT - INNER_LEG_HEIGHT / 2 - DESKTOP_HALF;
  return (
    <group position={[x, 0, 0]}>
      <mesh position={[0, 0.01, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.5, 0.02, 0.25]} />
        <meshStandardMaterial color="#2a2a2e" roughness={0.6} metalness={0.2} />
      </mesh>
      <mesh position={[0, OUTER_LEG_HEIGHT / 2 + 0.02, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.06, OUTER_LEG_HEIGHT, 0.06]} />
        <meshStandardMaterial color="#3a3a40" roughness={0.45} metalness={0.6} />
      </mesh>
      <mesh ref={innerRef} position={[0, innerY, 0]} castShadow>
        <boxGeometry args={[0.05, INNER_LEG_HEIGHT, 0.05]} />
        <meshStandardMaterial color="#9ea3ab" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#e7e4df" roughness={0.95} />
    </mesh>
  );
}

export const StandingDesk = () => {
  const heightRef = useRef<number>(START_HEIGHT);
  const dirRef = useRef<Direction>(INITIAL_DIR);
  const [displayCm, setDisplayCm] = useState<number>(Math.round(START_HEIGHT * 100));

  const start = (dir: Exclude<Direction, 0>) => (e: React.PointerEvent<HTMLButtonElement>) => {
    dirRef.current = dir;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const stop = () => {
    dirRef.current = 0;
  };

  const atMin = displayCm <= Math.round(MIN_HEIGHT * 100);
  const atMax = displayCm >= Math.round(MAX_HEIGHT * 100);

  return (
    <div className="relative h-full w-full">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [2.2, 1.4, 2.6], fov: 40 }}>
        <color attach="background" args={['#f4f1ec']} />
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-left={-4}
          shadow-camera-right={4}
          shadow-camera-top={4}
          shadow-camera-bottom={-4}
          shadow-camera-near={0.1}
          shadow-camera-far={20}
        />
        <Suspense fallback={null}>
          <Floor />
          <DeskRig heightRef={heightRef} dirRef={dirRef} onDisplayUpdate={setDisplayCm} />
          <ContactShadows position={[0, 0.002, 0]} opacity={0.35} width={6} height={6} blur={2.4} far={3} />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls
          enablePan={false}
          minDistance={2}
          maxDistance={6}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.1}
          target={[0, 0.9, 0]}
        />
      </Canvas>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end pb-8 select-none">
        <div className="pointer-events-auto flex items-center gap-3 rounded-full bg-white/80 px-4 py-2 shadow-lg backdrop-blur dark:bg-zinc-900/80">
          <button
            type="button"
            aria-label="Lower desk"
            disabled={atMin}
            className="flex h-12 w-12 touch-none items-center justify-center rounded-full bg-zinc-100 text-xl font-bold text-zinc-800 shadow-inner transition-colors hover:bg-zinc-200 active:bg-zinc-300 disabled:opacity-40 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
            onPointerDown={start(-1)}
            onPointerUp={stop}
            onPointerCancel={stop}
            onLostPointerCapture={stop}
          >
            {'\u25BC'}
          </button>
          <span className="w-20 text-center font-mono text-lg tabular-nums text-zinc-800 dark:text-zinc-100">
            {displayCm} cm
          </span>
          <button
            type="button"
            aria-label="Raise desk"
            disabled={atMax}
            className="flex h-12 w-12 touch-none items-center justify-center rounded-full bg-zinc-100 text-xl font-bold text-zinc-800 shadow-inner transition-colors hover:bg-zinc-200 active:bg-zinc-300 disabled:opacity-40 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
            onPointerDown={start(1)}
            onPointerUp={stop}
            onPointerCancel={stop}
            onLostPointerCapture={stop}
          >
            {'\u25B2'}
          </button>
        </div>
        <p className="pt-3 text-xs text-zinc-500 dark:text-zinc-400">Hold to raise or lower — drag scene to orbit</p>
      </div>
    </div>
  );
};
