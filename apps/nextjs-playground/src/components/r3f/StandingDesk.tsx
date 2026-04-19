'use client';

import { ContactShadows, Environment, OrbitControls, RoundedBox, useVideoTexture } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useMemo, useRef, useState } from 'react';
import { CanvasTexture, CatmullRomCurve3, Group, MathUtils, Mesh, SRGBColorSpace, TubeGeometry, Vector3 } from 'three';

const MIN_HEIGHT = 0.65;
const MAX_HEIGHT = 1.25;
const START_HEIGHT = 0.74;
const SPEED = 0.38;
const INITIAL_DIR: Direction = 0;

const DESKTOP_THICKNESS = 0.04;
const DESKTOP_HALF = DESKTOP_THICKNESS / 2;
const OUTER_LEG_HEIGHT = 0.55;
const INNER_LEG_HEIGHT = 1.25;

const SCREEN_VIDEO_URL = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

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
        <Suspense fallback={null}>
          <MonitorScreen />
        </Suspense>

        <MacBookAir position={[0.5, 0, 0]} />
        <NuPhyKeyboard position={[0, 0, 0.18]} />
        <MxMasterMouse position={[0.25, 0, 0.22]} />
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

type CodeToken = { text: string; color: string };

const SYNTAX = {
  plain: '#d4d4d4',
  keyword: '#c586c0',
  func: '#dcdcaa',
  type: '#4ec9b0',
  variable: '#9cdcfe',
  string: '#ce9178',
  number: '#b5cea8',
  comment: '#6a9955',
};

const CODE_LINES: CodeToken[][] = [
  [
    { text: 'import', color: SYNTAX.keyword },
    { text: ' { useFrame } ', color: SYNTAX.plain },
    { text: 'from', color: SYNTAX.keyword },
    { text: ' ', color: SYNTAX.plain },
    { text: "'@react-three/fiber'", color: SYNTAX.string },
    { text: ';', color: SYNTAX.plain },
  ],
  [
    { text: 'import', color: SYNTAX.keyword },
    { text: ' { useRef } ', color: SYNTAX.plain },
    { text: 'from', color: SYNTAX.keyword },
    { text: ' ', color: SYNTAX.plain },
    { text: "'react'", color: SYNTAX.string },
    { text: ';', color: SYNTAX.plain },
  ],
  [],
  [
    { text: 'const', color: SYNTAX.keyword },
    { text: ' ', color: SYNTAX.plain },
    { text: 'SPEED', color: SYNTAX.variable },
    { text: ' = ', color: SYNTAX.plain },
    { text: '0.38', color: SYNTAX.number },
    { text: ';', color: SYNTAX.plain },
    { text: ' // m/s, ergonomic motor', color: SYNTAX.comment },
  ],
  [],
  [
    { text: 'export function', color: SYNTAX.keyword },
    { text: ' ', color: SYNTAX.plain },
    { text: 'StandingDesk', color: SYNTAX.func },
    { text: '() {', color: SYNTAX.plain },
  ],
  [
    { text: '  const', color: SYNTAX.keyword },
    { text: ' height = ', color: SYNTAX.plain },
    { text: 'useRef', color: SYNTAX.func },
    { text: '<', color: SYNTAX.plain },
    { text: 'number', color: SYNTAX.type },
    { text: '>(', color: SYNTAX.plain },
    { text: '0.74', color: SYNTAX.number },
    { text: ');', color: SYNTAX.plain },
  ],
  [
    { text: '  ', color: SYNTAX.plain },
    { text: 'useFrame', color: SYNTAX.func },
    { text: '((_, delta) => {', color: SYNTAX.plain },
  ],
  [
    { text: '    height.current += delta * ', color: SYNTAX.plain },
    { text: 'SPEED', color: SYNTAX.variable },
    { text: ';', color: SYNTAX.plain },
  ],
  [{ text: '  });', color: SYNTAX.plain }],
  [{ text: '  // raise your posture, lower your back pain', color: SYNTAX.comment }],
  [
    { text: '  return', color: SYNTAX.keyword },
    { text: ' <', color: SYNTAX.plain },
    { text: 'Desk', color: SYNTAX.type },
    { text: ' ', color: SYNTAX.plain },
    { text: 'heightRef', color: SYNTAX.variable },
    { text: '={height} />;', color: SYNTAX.plain },
  ],
  [{ text: '}', color: SYNTAX.plain }],
];

const TOTAL_CHARS = CODE_LINES.reduce((sum, line) => sum + line.reduce((s, t) => s + t.text.length, 0) + 1, 0);
const CANVAS_W = 512;
const CANVAS_H = 340;
const TOP_BAR_H = 26;
const GUTTER_W = 36;
const LINE_HEIGHT = 18;
const CODE_FONT = '13px "SF Mono", Menlo, Consolas, monospace';
const UI_FONT = '12px "SF Pro Text", system-ui, sans-serif';
const CHARS_PER_SEC = 22;
const HOLD_AT_END = 3.5;
const CYCLE_SEC = TOTAL_CHARS / CHARS_PER_SEC + HOLD_AT_END;

function drawVSCode(canvas: HTMLCanvasElement, typed: number, showCursor: boolean) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.fillStyle = '#1e1e1e';
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  ctx.fillStyle = '#2d2d30';
  ctx.fillRect(0, 0, CANVAS_W, TOP_BAR_H);
  ctx.fillStyle = '#1e1e1e';
  ctx.fillRect(10, 5, 170, TOP_BAR_H - 5);
  ctx.fillStyle = '#3794ff';
  ctx.fillRect(10, TOP_BAR_H - 2, 170, 2);

  ctx.font = UI_FONT;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.fillStyle = '#519aba';
  ctx.fillText('{ }', 18, TOP_BAR_H / 2 + 1);
  ctx.fillStyle = '#cccccc';
  ctx.fillText('StandingDesk.tsx', 40, TOP_BAR_H / 2 + 1);

  ctx.fillStyle = '#1e1e1e';
  ctx.fillRect(0, TOP_BAR_H, GUTTER_W, CANVAS_H - TOP_BAR_H);

  ctx.font = CODE_FONT;
  ctx.textBaseline = 'top';

  let charsLeft = typed;
  let cursorX = GUTTER_W + 8;
  let cursorY = TOP_BAR_H + 6;

  for (let i = 0; i < CODE_LINES.length; i++) {
    const line = CODE_LINES[i];
    const lineY = TOP_BAR_H + 6 + i * LINE_HEIGHT;
    if (lineY + LINE_HEIGHT > CANVAS_H) break;

    ctx.fillStyle = '#858585';
    ctx.textAlign = 'right';
    ctx.fillText(String(i + 1), GUTTER_W - 8, lineY);
    ctx.textAlign = 'left';

    if (charsLeft < 0) continue;

    let x = GUTTER_W + 8;
    for (const token of line) {
      if (charsLeft <= 0) break;
      const visible = token.text.slice(0, Math.max(0, charsLeft));
      ctx.fillStyle = token.color;
      ctx.fillText(visible, x, lineY);
      x += ctx.measureText(visible).width;
      charsLeft -= token.text.length;
    }

    cursorX = x;
    cursorY = lineY;
    charsLeft -= 1;
  }

  if (showCursor) {
    ctx.fillStyle = '#aeafad';
    ctx.fillRect(cursorX, cursorY, 1.6, LINE_HEIGHT - 4);
  }

  ctx.fillStyle = '#007acc';
  ctx.fillRect(0, CANVAS_H - 18, CANVAS_W, 18);
  ctx.font = UI_FONT;
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('main  *  TypeScript  UTF-8  LF', 10, CANVAS_H - 9);
}

function useVSCodeTexture() {
  const { canvas, texture } = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = CANVAS_W;
    c.height = CANVAS_H;
    drawVSCode(c, 0, true);
    const t = new CanvasTexture(c);
    t.colorSpace = SRGBColorSpace;
    return { canvas: c, texture: t };
  }, []);

  const typeTimer = useRef(0);
  const blinkTimer = useRef(0);
  const drawTimer = useRef(0);

  useFrame((_, delta) => {
    typeTimer.current = (typeTimer.current + delta) % CYCLE_SEC;
    blinkTimer.current += delta;
    drawTimer.current += delta;
    if (drawTimer.current < 1 / 15) return;
    drawTimer.current = 0;

    const typed = Math.min(Math.floor(typeTimer.current * CHARS_PER_SEC), TOTAL_CHARS);
    const showCursor = Math.floor(blinkTimer.current * 2) % 2 === 0;
    drawVSCode(canvas, typed, showCursor);
    texture.needsUpdate = true;
  });

  return texture;
}

function MacBookAir({ position }: DeskItemProps) {
  const SILVER = '#c8cacd';
  const baseW = 0.3;
  const baseD = 0.21;
  const baseH = 0.01;
  const screenW = 0.3;
  const screenH = 0.21;
  const screenT = 0.006;
  const tilt = 0.28;
  const screenTexture = useVSCodeTexture();

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
          <meshBasicMaterial map={screenTexture} toneMapped={false} />
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
  return (
    <group position={position}>
      <mesh scale={[0.036, 0.022, 0.056]} position={[0, 0.008, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1, 48, 32]} />
        <meshStandardMaterial color="#2a2a2e" roughness={0.65} metalness={0.1} />
      </mesh>
    </group>
  );
}

function MonitorScreen() {
  const texture = useVideoTexture(SCREEN_VIDEO_URL, {
    muted: true,
    loop: true,
    start: true,
    crossOrigin: 'anonymous',
    playsInline: true,
  });
  return (
    <mesh position={[0, 0.27, -0.184]}>
      <planeGeometry args={[0.48, 0.3]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

function DisplayCable() {
  const geometry = useMemo(() => {
    const curve = new CatmullRomCurve3([
      new Vector3(0.348, 0.008, -0.02),
      new Vector3(0.33, 0.012, -0.09),
      new Vector3(0.26, 0.012, -0.17),
      new Vector3(0.12, 0.012, -0.22),
      new Vector3(0.02, 0.016, -0.226),
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
