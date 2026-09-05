import { useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import type { Mesh } from 'three';
import { uv } from 'three/tsl';
import type { WebGPURenderer } from 'three/webgpu';
import { WebGPUCanvas } from '~/components/webgpu-canvas';

// ── Node graph: built once at module load ──────────────────────────────────────
// The lesson's floor fade, built twice: once anonymous, once forced into a shader
// variable named `fade` by toVar(). Same picture on screen, different program text.
const FADE = uv().sub(0.5).length().smoothstep(0.5, 0.2);
const FADE_NAMED = uv().sub(0.5).length().smoothstep(0.5, 0.2).toVar('fade');

type Stage = 'fragmentShader' | 'vertexShader';
type Probe = { program?: Record<Stage, string | null>; language?: string; error?: string };

const isFadeLine = (line: string) => /\bfade\b/.test(line);

/**
 * Lives inside <Canvas> so it can reach the renderer, and pulls the real compiled
 * program for one mesh: renderer.debug.getShaderAsync(scene, camera, mesh).
 */
function ShaderProbe({ target, onResult }: { target: RefObject<Mesh | null>; onResult: (probe: Probe) => void }) {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);
  const camera = useThree((state) => state.camera);

  useEffect(() => {
    const mesh = target.current;
    if (!mesh) return;
    let cancelled = false;
    const renderer = gl as unknown as WebGPURenderer;
    const backend = renderer.backend as { isWebGPUBackend?: boolean };

    renderer.debug
      .getShaderAsync(scene, camera, mesh)
      .then((program) => {
        if (cancelled) return;
        onResult({ program, language: backend.isWebGPUBackend ? 'WGSL · WebGPU' : 'GLSL · WebGL2' });
      })
      .catch((error: unknown) => {
        if (!cancelled) onResult({ error: error instanceof Error ? error.message : String(error) });
      });

    return () => {
      cancelled = true;
    };
  }, [gl, scene, camera, target, onResult]);

  return null;
}

export function ToolsDebugDemo() {
  const [named, setNamed] = useState(true);
  const [stage, setStage] = useState<Stage>('fragmentShader');
  const [onlyFade, setOnlyFade] = useState(true);
  const [probe, setProbe] = useState<Probe>({});
  const floorRef = useRef<Mesh>(null);

  const lines = useMemo(() => (probe.program?.[stage] ?? '').split('\n'), [probe.program, stage]);
  const hits = useMemo(() => lines.filter(isFadeLine), [lines]);
  const visible = onlyFade ? hits : lines;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-3">
      {/* 1. the node chain you write */}
      <pre className="overflow-x-auto rounded bg-slate-100 p-2 font-mono text-xs leading-5">
        {`const fade = uv().sub(0.5).length().smoothstep(0.5, 0.2)`}
        {named ? (
          <mark className="bg-amber-200">{`.toVar('fade')`}</mark>
        ) : (
          <span className="text-slate-400">{`  // 沒有 toVar`}</span>
        )}
        {`\nmaterial.opacityNode = fade`}
      </pre>

      <div className="grid gap-3 sm:grid-cols-2">
        {/* 2. the program it compiles into */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between font-mono text-[11px] text-slate-500">
            <span>{probe.language ?? 'compiling…'}</span>
            <span>
              {lines.length} 行 · <code>fade</code> {hits.length} 次
            </span>
          </div>
          <pre className="h-64 overflow-auto rounded bg-slate-900 p-2 font-mono text-[11px] leading-4 text-slate-200">
            {probe.error ? (
              <span className="block whitespace-normal text-rose-300">{probe.error}</span>
            ) : visible.length === 0 ? (
              <span className="block whitespace-normal text-slate-500">
                {!probe.program
                  ? '…'
                  : stage === 'vertexShader'
                    ? 'vertex shader 沒有 fade：它是 fragment stage 的值'
                    : '沒有一行叫 fade — 值被直接展開在算式裡'}
              </span>
            ) : (
              visible.map((line, i) => (
                <div key={i} className={`w-max min-w-full ${isFadeLine(line) ? 'bg-amber-400/25' : ''}`}>
                  {line || ' '}
                </div>
              ))
            )}
          </pre>
        </div>

        {/* 3. the pixels it draws */}
        <div className="h-64 overflow-hidden rounded-md bg-slate-900">
          <WebGPUCanvas camera={{ position: [0, 1.5, 3.4], fov: 45 }}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[3, 4, 2]} intensity={2.2} />
            <mesh position={[0, 0.5, 0]}>
              <torusKnotGeometry args={[0.45, 0.18, 128, 32]} />
              <meshStandardNodeMaterial color="#f0a5c0" roughness={0.35} metalness={0.1} />
            </mesh>
            <mesh ref={floorRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.35, 0]}>
              <planeGeometry args={[5, 5]} />
              {/* key: a different node chain is a different shader, so remount instead of mutating */}
              <meshStandardNodeMaterial
                key={named ? 'named' : 'plain'}
                color="#cfd8e3"
                transparent
                opacityNode={named ? FADE_NAMED : FADE}
              />
            </mesh>
            {/* key: swapping the material means a different program, so remount to pull it again */}
            <ShaderProbe key={named ? 'named' : 'plain'} target={floorRef} onResult={setProbe} />
          </WebGPUCanvas>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs">
        <label className="flex items-center gap-1.5">
          <input type="checkbox" checked={named} onChange={(e) => setNamed(e.target.checked)} />
          <span>.toVar(&#39;fade&#39;)</span>
        </label>
        <label className="flex items-center gap-1.5">
          <input type="checkbox" checked={onlyFade} onChange={(e) => setOnlyFade(e.target.checked)} />
          <span>只顯示含 fade 的行</span>
        </label>
        <div className="flex gap-1">
          {(['fragmentShader', 'vertexShader'] as const).map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setStage(name)}
              className={`rounded border px-2 py-1 ${
                name === stage
                  ? 'border-slate-800 bg-slate-800 text-white'
                  : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
