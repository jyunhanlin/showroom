import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { bloom } from 'three/addons/tsl/display/BloomNode.js';
import { fxaa } from 'three/addons/tsl/display/FXAANode.js';
import {
  color,
  convertToTexture,
  float,
  Fn,
  hash,
  If,
  int,
  max,
  mix,
  mx_noise_float,
  nodeObject,
  pass,
  renderOutput,
  sqrt,
  texture,
  TWO_PI,
  uniform,
  vec2,
  vec4,
  viewportCoordinate,
  viewportSize,
  viewportUV,
} from 'three/tsl';
import {
  CineonToneMapping,
  RenderPipeline,
  TempNode,
  type Node,
  type TextureNode,
  type WebGPURenderer,
} from 'three/webgpu';
import { WebGPUCanvas } from '~/components/webgpu-canvas';

// ── voronoi(): stand-in for the lesson's voronoi.js ─────────────────────────
// The lesson ships its own voronoi.js as a download; this is a separate implementation with the
// same channel layout, so ShatterNode below reads it exactly like the lesson does:
//   r = distance to the nearest cell point
//   g = approximate distance to the edge (second nearest minus nearest)
//   b = unused here (the lesson's exact edge distance)
//   a = ID of the nearest cell, a whole number, the same for every pixel in that cell
const voronoi = Fn(([coordinates, subdivision, seed]: [Node<'vec2'>, Node<'float'>, Node<'int'>]) => {
  const scaled = coordinates.mul(subdivision);
  const cell = scaled.floor();
  const nearest = float(8).toVar();
  const secondNearest = float(8).toVar();
  const cellId = float(0).toVar();

  // Plain JS loops: they run once while the graph is built and unroll into 9 inline checks.
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      const neighbor = cell.add(vec2(x, y));
      const id = neighbor.x.mul(100).add(neighbor.y);
      // hash() wants an integer seed; ids are whole numbers, so spread them apart per seed.
      const key = id.mul(2).add(seed.toFloat().mul(1013));
      const point = neighbor.add(vec2(hash(key), hash(key.add(1))));
      const distanceToPoint = scaled.distance(point);

      If(distanceToPoint.lessThan(nearest), () => {
        secondNearest.assign(nearest);
        nearest.assign(distanceToPoint);
        cellId.assign(id);
      }).ElseIf(distanceToPoint.lessThan(secondNearest), () => {
        secondNearest.assign(distanceToPoint);
      });
    }
  }

  return vec4(nearest, secondNearest.sub(nearest), 0, cellId);
});

// ── ShatterNode: the lesson's custom pass, same class shape ─────────────────
class ShatterNode extends TempNode<'vec4'> {
  static get type() {
    return 'ShatterNode';
  }

  constructor(
    public textureNode: TextureNode,
    public subdivision: Node<'float'>,
    public seed: Node<'int'>,
    public progress: Node<'float'>,
    public thickness: Node<'float'>,
    public _color: Node<'color'>,
    public colorStrength: Node<'float'>,
    public offsetStrength: Node<'float'>,
  ) {
    super('vec4');
  }

  setup() {
    // Voronoi, sized by the longest side so cells stay round at any aspect ratio
    const viewportMaxSide = max(viewportSize.x, viewportSize.y);
    const voronoiUv = viewportCoordinate.div(viewportMaxSide);
    const voronoiColor = voronoi(voronoiUv, this.subdivision, this.seed);

    // Cracks: chained .step(edge) is step(edge, x), so 0 near an edge and 1 inside a piece
    const cracksNoise = mx_noise_float(voronoiUv.mul(5)).remap(-1, 1, 0, 0.5);
    const cracks = voronoiColor.g.step(this.progress.sub(cracksNoise).mul(this.thickness));
    // oxlint-disable-next-line no-underscore-dangle -- the lesson's name; `color` is a TSL node
    const cracksColor = this._color.mul(this.colorStrength);

    // Offset UV: one golden-angle direction per cell ID
    const goldenRatio = sqrt(5).add(1).div(2);
    const goldenAngle = goldenRatio.mul(TWO_PI);
    const angle = voronoiColor.a.mul(goldenAngle);
    const offset = vec2(angle.cos(), angle.sin()).mul(this.progress);
    const offsetUv = viewportUV.add(offset.mul(this.offsetStrength));

    return mix(cracksColor, texture(this.textureNode, offsetUv), cracks);
  }
}

const shatter = (
  textureNode: Node,
  subdivision: Node<'float'> = float(4),
  seed: Node<'int'> = int(0),
  progress: Node<'float'> = float(1),
  thickness: Node<'float'> = float(0.02),
  _color: Node<'color'> = color(0xff824d),
  colorStrength: Node<'float'> = float(3),
  offsetStrength: Node<'float'> = float(0.02),
) =>
  new ShatterNode(
    // Sampling at offsetUv needs a real texture, not just the upstream node
    convertToTexture(textureNode),
    nodeObject(subdivision),
    nodeObject(seed),
    nodeObject(progress),
    nodeObject(thickness),
    nodeObject(_color),
    nodeObject(colorStrength),
    nodeObject(offsetStrength),
  );

// ── The value the diagram marks, plus the lesson's other shatter uniforms ──
const progress = uniform(0.5);
const subdivision = uniform(3);
const seed = uniform(18, 'int');
const thickness = uniform(0.02);
// oxlint-disable-next-line no-underscore-dangle -- the lesson's name; `color` is a TSL node
const _color = uniform(color(0xff824d));
const colorStrength = uniform(3);
const offsetStrength = uniform(0.05);

/**
 * Replaces R3F's render call with the lesson's RenderPipeline.
 * useFrame with priority 1 tells R3F to stop calling gl.render() itself.
 */
function ShatterPipeline() {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);
  const camera = useThree((state) => state.camera);

  const pipelineRef = useRef<RenderPipeline | null>(null);

  // Built and disposed in the same effect, so a StrictMode mount/unmount/mount never
  // leaves useFrame holding a disposed pipeline.
  useEffect(() => {
    const renderer = gl as unknown as WebGPURenderer;
    const renderPipeline = new RenderPipeline(renderer);
    // Tone mapping and sRGB are applied by hand below, before FXAA
    renderPipeline.outputColorTransform = false;

    // Scene pass
    const scenePass = pass(scene, camera);
    renderPipeline.outputNode = scenePass;

    // Shatter pass
    const shatterPass = shatter(
      renderPipeline.outputNode,
      subdivision,
      seed,
      progress,
      thickness,
      _color,
      colorStrength,
      offsetStrength,
    );
    renderPipeline.outputNode = shatterPass;

    // Bloom pass, after shatter so colorStrength pushes the cracks past the threshold.
    // @types/three declares outputNode as an untyped Node, hence the cast.
    const bloomPass = bloom(renderPipeline.outputNode as Node<'vec4'>);
    bloomPass.threshold.value = 0.25;
    bloomPass.strength.value = 1;
    renderPipeline.outputNode = (renderPipeline.outputNode as Node<'vec4'>).add(bloomPass);

    // Color transform pass
    renderPipeline.outputNode = renderOutput(renderPipeline.outputNode);

    // FXAA pass
    renderPipeline.outputNode = fxaa(renderPipeline.outputNode);

    pipelineRef.current = renderPipeline;
    return () => {
      pipelineRef.current = null;
      renderPipeline.dispose();
    };
  }, [gl, scene, camera]);

  useFrame(() => pipelineRef.current?.render(), 1);

  return null;
}

function Props() {
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position-y={-1}>
        <circleGeometry args={[8, 64]} />
        <meshStandardNodeMaterial color="#334155" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <torusKnotGeometry args={[0.8, 0.28, 160, 32]} />
        <meshStandardNodeMaterial color="#94a3b8" roughness={0.35} metalness={0.2} />
      </mesh>
      <mesh position={[-2.3, -0.4, -0.6]}>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardNodeMaterial color="#38bdf8" roughness={0.5} />
      </mesh>
      <mesh position={[2.2, -0.35, -0.3]}>
        <sphereGeometry args={[0.65, 48, 24]} />
        <meshStandardNodeMaterial color="#facc15" roughness={0.4} />
      </mesh>
    </group>
  );
}

export function PostProcessingDemo() {
  const [progressValue, setProgressValue] = useState(0.5);

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-3">
      <div className="h-80 w-full overflow-hidden rounded-md">
        {/* The lesson settles on Cineon at 1.5. R3F sets ACES only on first configure, so this
            sticks, and RenderPipeline picks the change up on its next render. */}
        <WebGPUCanvas
          camera={{ position: [0, 1.6, 6], fov: 45 }}
          onCreated={({ gl }) => {
            gl.toneMapping = CineonToneMapping;
            gl.toneMappingExposure = 1.5;
          }}
        >
          <color attach="background" args={['#0f172a']} />
          <ambientLight intensity={0.25} />
          <directionalLight position={[3, 5, 4]} intensity={1.1} />
          <Props />
          <ShatterPipeline />
        </WebGPUCanvas>
      </div>
      <pre className="w-full overflow-x-auto rounded bg-slate-100 p-2 font-mono text-xs">
        {`// Cracks: thicker as progress grows
const cracks = voronoiColor.g.step(
  progress.sub(cracksNoise).mul(thickness))   // progress = ${progressValue.toFixed(2)}
// Offset UV: each piece slides further
const offset = vec2(angle.cos(), angle.sin()).mul(progress)`}
      </pre>
      <label className="flex items-center gap-2 font-mono text-sm">
        <span className="w-40 whitespace-nowrap font-bold">progress = {progressValue.toFixed(2)}</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={progressValue}
          onChange={(e) => {
            const next = Number(e.target.value);
            setProgressValue(next);
            progress.value = next;
          }}
        />
      </label>
      <p className="text-center text-xs text-slate-500">
        0 是原本的畫面。往右拉，橘色的裂縫從 noise 低的地方先長出來，每一片也往自己的方向偏移。裂縫亮度超過 1，後面的
        bloom 讓它發光。
      </p>
    </div>
  );
}
