'use client';

import { ContactShadows, Environment, Html, OrbitControls, RoundedBox } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useMemo, useRef, useState } from 'react';
import { CatmullRomCurve3, Group, MathUtils, Mesh, TubeGeometry, Vector3 } from 'three';

const MIN_HEIGHT = 0.65;
const MAX_HEIGHT = 1.25;
const START_HEIGHT = 0.74;
const SPEED = 0.38;
const INITIAL_DIR: Direction = 0;

const DESKTOP_THICKNESS = 0.04;
const DESKTOP_HALF = DESKTOP_THICKNESS / 2;
const OUTER_LEG_HEIGHT = 0.55;
const INNER_LEG_HEIGHT = 1.25;

const YOUTUBE_VIDEO_ID = 'M7lc1UVf-VE';

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
    const innerY = next - INNER_LEG_HEIGHT / 2;
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
        <RoundedBox
          args={[1.6, DESKTOP_THICKNESS, 0.8]}
          radius={0.018}
          smoothness={4}
          position={[0, -DESKTOP_HALF, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#c9a37a" roughness={0.55} metalness={0.05} />
        </RoundedBox>
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
        <Html transform position={[0, 0.27, -0.184]} scale={0.00052}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&playsinline=1&loop=1&controls=0&modestbranding=1&playlist=${YOUTUBE_VIDEO_ID}`}
            title="YouTube video"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            style={{ width: 960, height: 540, border: 0, display: 'block', background: '#000' }}
          />
        </Html>

        <MacBookAir position={[-0.5, 0, 0]} />
        <NuPhyKeyboard position={[0, 0, 0.18]} />
        <MxMasterMouse position={[0.27, 0, 0.2]} />
        <DisplayCable />
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
  const innerY = START_HEIGHT - INNER_LEG_HEIGHT / 2;
  return (
    <group position={[x, 0, 0]}>
      <mesh position={[0, 0.01, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.25, 0.02, 0.5]} />
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

type DeskItemProps = { position: [number, number, number] };

function MacBookAir({ position }: DeskItemProps) {
  const SILVER = '#c8cacd';
  const baseW = 0.3;
  const baseD = 0.21;
  const baseH = 0.01;
  const screenW = 0.3;
  const screenH = 0.21;
  const screenT = 0.006;
  const tilt = 0.28;

  return (
    <group position={position}>
      <RoundedBox
        args={[baseW, baseH, baseD]}
        radius={0.005}
        smoothness={3}
        position={[0, baseH / 2, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={SILVER} roughness={0.35} metalness={0.85} />
      </RoundedBox>
      <mesh position={[0, baseH + 0.0005, -0.025]} receiveShadow>
        <boxGeometry args={[0.255, 0.0008, 0.105]} />
        <meshStandardMaterial color="#2a2a2c" roughness={0.85} />
      </mesh>
      <mesh position={[0, baseH + 0.0005, 0.06]} receiveShadow>
        <boxGeometry args={[0.07, 0.0008, 0.045]} />
        <meshStandardMaterial color="#3a3a3c" roughness={0.7} />
      </mesh>
      <group position={[0, baseH, -baseD / 2]} rotation={[-tilt, 0, 0]}>
        <RoundedBox
          args={[screenW, screenH, screenT]}
          radius={0.006}
          smoothness={3}
          position={[0, screenH / 2, -screenT / 2]}
          castShadow
        >
          <meshStandardMaterial color={SILVER} roughness={0.35} metalness={0.85} />
        </RoundedBox>
        <mesh position={[0, screenH / 2, 0.0005]}>
          <planeGeometry args={[screenW - 0.012, screenH - 0.014]} />
          <meshStandardMaterial color="#0a0a0c" roughness={0.5} metalness={0.05} />
        </mesh>
      </group>
    </group>
  );
}

function NuPhyKeyboard({ position }: DeskItemProps) {
  const W = 0.318;
  const D = 0.134;
  const H = 0.022;
  return (
    <group position={position}>
      <RoundedBox args={[W, H, D]} radius={0.006} smoothness={3} position={[0, H / 2, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#f3f1ec" roughness={0.6} metalness={0.05} />
      </RoundedBox>
      <RoundedBox
        args={[W - 0.018, 0.004, D - 0.018]}
        radius={0.002}
        smoothness={2}
        position={[0, H + 0.001, 0]}
        castShadow
      >
        <meshStandardMaterial color="#e7e4dc" roughness={0.7} />
      </RoundedBox>
    </group>
  );
}

function MxMasterMouse({ position }: DeskItemProps) {
  const W = 0.07;
  const L = 0.126;
  const H = 0.042;
  const BLACK = '#121214';
  const DARK = '#2a2a2c';
  const ACCENT = '#4a4a4c';
  return (
    <group position={position}>
      <RoundedBox args={[W, H, L]} radius={0.022} smoothness={5} position={[0, H / 2, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={BLACK} roughness={0.7} metalness={0.1} />
      </RoundedBox>
      <RoundedBox
        args={[W * 0.78, 0.014, L * 0.38]}
        radius={0.012}
        smoothness={4}
        position={[0.002, H + 0.005, -L * 0.22]}
        castShadow
      >
        <meshStandardMaterial color={BLACK} roughness={0.7} metalness={0.1} />
      </RoundedBox>
      <RoundedBox
        args={[0.02, 0.018, 0.052]}
        radius={0.008}
        smoothness={3}
        position={[-(W / 2 + 0.003), 0.014, 0.018]}
        castShadow
      >
        <meshStandardMaterial color={DARK} roughness={0.8} metalness={0.05} />
      </RoundedBox>
      <mesh position={[0.013, H + 0.008, -L * 0.1]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.009, 0.009, 0.016, 24]} />
        <meshStandardMaterial color={ACCENT} roughness={0.35} metalness={0.6} />
      </mesh>
      <mesh position={[-(W / 2 + 0.006), 0.02, 0.0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.005, 0.005, 0.004, 20]} />
        <meshStandardMaterial color={ACCENT} roughness={0.35} metalness={0.6} />
      </mesh>
      <mesh position={[0.013, H + 0.002, L * 0.22]} castShadow>
        <boxGeometry args={[0.024, 0.002, 0.03]} />
        <meshStandardMaterial color={DARK} roughness={0.8} />
      </mesh>
      <mesh position={[-0.013, H + 0.002, L * 0.22]} castShadow>
        <boxGeometry args={[0.024, 0.002, 0.03]} />
        <meshStandardMaterial color={DARK} roughness={0.8} />
      </mesh>
    </group>
  );
}

function DisplayCable() {
  const geometry = useMemo(() => {
    const curve = new CatmullRomCurve3([
      new Vector3(-0.5, 0.014, -0.118),
      new Vector3(-0.42, 0.012, -0.16),
      new Vector3(-0.28, 0.012, -0.2),
      new Vector3(-0.12, 0.012, -0.23),
      new Vector3(-0.02, 0.016, -0.228),
      new Vector3(0, 0.08, -0.222),
    ]);
    return new TubeGeometry(curve, 80, 0.0035, 8, false);
  }, []);

  return (
    <mesh geometry={geometry} castShadow>
      <meshStandardMaterial color="#1a1a1c" roughness={0.7} metalness={0.1} />
    </mesh>
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
