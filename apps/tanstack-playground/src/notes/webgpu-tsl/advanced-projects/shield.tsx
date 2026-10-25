import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { bloom } from 'three/addons/tsl/display/BloomNode.js';
import {
  add,
  color,
  dot,
  float,
  Fn,
  Loop,
  max,
  mix,
  mul,
  normalView,
  pass,
  positionLocal,
  positionViewDirection,
  positionWorld,
  texture,
  time,
  TWO_PI,
  uniform,
  uniformArray,
  uv,
  vec2,
} from 'three/tsl';
import {
  AdditiveBlending,
  DataTexture,
  DoubleSide,
  LinearFilter,
  LinearMipmapLinearFilter,
  RenderPipeline,
  RepeatWrapping,
  Sphere,
  Vector2,
  Vector3,
  Vector4,
  type Mesh,
  type Node,
  type WebGPURenderer,
} from 'three/webgpu';
import { WebGPUCanvas } from '~/components/webgpu-canvas';
import { attachInspector } from '~/components/webgpu-inspector';

// ── hexagonsTexture: stand-in for the lesson's hexagons.png ─────────────────
// The lesson ships a Substance Designer texture. This one is computed here, with the same
// channel layout, so the shader below reads it exactly like the lesson does:
//   r = distance to the hexagon's edge: 0 at the center, 1 on the edge
//   g = one random value per hexagon, the same for all of its pixels
//   b = alpha: 1 inside the hexagon, 0 in the gap between hexagons
// Plain arrays, no <canvas>: the SSR pass imports every demo, and there is no document there.
const HEXAGONS_TEXTURE_SIZE = 256;
// Pointy-top hexagons. A whole number of them fits the texture both ways, and ROWS is even
// because every other row is shifted by half a hexagon, so RepeatWrapping has no seam.
const HEXAGON_COLUMNS = 4;
const HEXAGON_ROWS = 4;
const SQRT_3 = Math.sqrt(3);

function createHexagonsTexture() {
  const size = HEXAGONS_TEXTURE_SIZE;
  const data = new Uint8Array(size * size * 4);
  const ids = Array.from({ length: HEXAGON_COLUMNS * HEXAGON_ROWS }, () => Math.random());
  // In hexagon units: circumradius 1, so the inradius (center to edge) is √3 / 2
  const width = HEXAGON_COLUMNS * SQRT_3;
  const height = HEXAGON_ROWS * 1.5;
  const inradius = SQRT_3 / 2;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const px = ((x + 0.5) / size) * width;
      const py = ((y + 0.5) / size) * height;

      // Nearest hexagon center: the hexagons are the Voronoi cells of their centers
      let bestDistance = Infinity;
      let dx = 0;
      let dy = 0;
      let column = 0;
      let row = 0;
      const rowGuess = Math.round(py / 1.5);
      for (let j = rowGuess - 1; j <= rowGuess + 1; j++) {
        const shift = (((j % 2) + 2) % 2) * (SQRT_3 / 2);
        const columnGuess = Math.round((px - shift) / SQRT_3);
        for (let i = columnGuess - 1; i <= columnGuess + 1; i++) {
          const cx = i * SQRT_3 + shift;
          const cy = j * 1.5;
          const distance = (px - cx) ** 2 + (py - cy) ** 2;
          if (distance < bestDistance) {
            bestDistance = distance;
            dx = px - cx;
            dy = py - cy;
            column = i;
            row = j;
          }
        }
      }

      // Hexagon distance: the largest of the three edge-normal projections
      const edge = Math.max(Math.abs(dx), Math.abs(dx * 0.5 + dy * inradius), Math.abs(dx * 0.5 - dy * inradius));
      const r = Math.min(edge / inradius, 1);
      // Wrap the cell index, so a hexagon cut by the texture border keeps one ID on both sides
      const wrappedColumn = ((column % HEXAGON_COLUMNS) + HEXAGON_COLUMNS) % HEXAGON_COLUMNS;
      const wrappedRow = ((row % HEXAGON_ROWS) + HEXAGON_ROWS) % HEXAGON_ROWS;
      const g = ids[wrappedRow * HEXAGON_COLUMNS + wrappedColumn]!;
      // Soft step from 1 to 0 between r = 0.86 and r = 0.94: the gap between hexagons
      const t = Math.min(Math.max((r - 0.86) / 0.08, 0), 1);
      const b = 1 - t * t * (3 - 2 * t);

      const index = (y * size + x) * 4;
      data[index] = Math.round(r * 255);
      data[index + 1] = Math.round(g * 255);
      data[index + 2] = Math.round(b * 255);
      data[index + 3] = 255;
    }
  }

  const hexagonsTexture = new DataTexture(data, size, size);
  // The lesson's two lines: the pattern repeats around the sphere
  hexagonsTexture.wrapS = RepeatWrapping;
  hexagonsTexture.wrapT = RepeatWrapping;
  // DataTexture defaults to NearestFilter and no mipmaps; the lesson's PNG loads with linear ones
  hexagonsTexture.magFilter = LinearFilter;
  hexagonsTexture.minFilter = LinearMipmapLinearFilter;
  hexagonsTexture.generateMipmaps = true;
  hexagonsTexture.needsUpdate = true;
  return hexagonsTexture;
}

const hexagonsTexture = createHexagonsTexture();

// ── The lesson's Shield parameters ──────────────────────────────────────────
const radius = uniform(2);
const colorA = uniform(color(0x1a5bff));
const colorB = uniform(color(0xff2e43));
const strength = uniform(7);

// ── Impacts: the lesson's setImpacts() ──────────────────────────────────────
// xyz = impact center in the shield's local space, w = impact radius
type ImpactTween = { start: number; from: number; to: number };
const impacts = {
  count: 5,
  index: 0,
  data: [] as Vector4[],
  tweens: [] as (ImpactTween | null)[],
};
for (let i = 0; i < impacts.count; i++) {
  impacts.data.push(new Vector4(0, 0, 0, 0));
  impacts.tweens.push(null);
}
// uniformArray() copies data into the GPU buffer on every render, so changing a Vector4 is enough
// The <'vec4'> is TypeScript only: without it @types/three has no .xyz / .w on element(i).
const impactsUniforms = uniformArray<'vec4'>(impacts.data, 'vec4');

// The value the diagram marks: the lesson's add(position, radius = 1). It becomes w.
const impactRadius = { value: 1 };

function addImpact(mesh: Mesh, position: Vector3, now: number) {
  const impact = impacts.data[impacts.index]!;

  // Position. World to local, so the impact sticks to the shield while it turns.
  const localPosition = mesh.worldToLocal(position);
  impact.x = localPosition.x;
  impact.y = localPosition.y;
  impact.z = localPosition.z;

  // Radius. The lesson tweens w with GSAP; useFrame below plays the same two tweens.
  impacts.tweens[impacts.index] = { start: now, from: impact.w, to: impactRadius.value };

  // Update index
  impacts.index++;
  if (impacts.index >= impacts.count) impacts.index = 0;
}

// GSAP's power2 is a cubic curve
const power2Out = (p: number) => 1 - (1 - p) ** 3;
const power2In = (p: number) => p ** 3;

function updateImpacts(now: number) {
  impacts.tweens.forEach((tween, i) => {
    if (tween === null) return;
    const impact = impacts.data[i]!;
    const elapsed = now - tween.start;
    // Up to the radius in 0.1 s, power2.out
    if (elapsed < 0.1) {
      impact.w = tween.from + (tween.to - tween.from) * power2Out(elapsed / 0.1);
      // Then back to 0 in 1 s, power2.in (the lesson's onComplete)
    } else if (elapsed < 1.1) {
      impact.w = tween.to * (1 - power2In(elapsed - 0.1));
    } else {
      impact.w = 0;
      impacts.tweens[i] = null;
    }
  });
}

// ── Material: the lesson's setMaterial() ────────────────────────────────────
// Scaling in the shader keeps radius a uniform: the slider moves the surface without a rebuild.
const shieldPosition = positionLocal.mul(radius);

const shieldEmissive = Fn(() => {
  // Impacts
  const finalImpact = float(0);

  Loop(impacts.count, ({ i }) => {
    const impactData = impactsUniforms.element(i);
    const impactDistance = impactData.xyz.distance(positionLocal);
    const impact = impactDistance.div(impactData.w).oneMinus().max(0);
    finalImpact.assign(max(finalImpact, impact));
  });
  // remap(), not remapClamp(): 0.4 maps to 1 and the center reaches 2.5. Anything >= 1 fills whole
  // hexagons through the three max() calls below.
  finalImpact.assign(finalImpact.remap(0.4, 0, 1, 0));

  // Fresnel
  const fresnel = dot(positionViewDirection, normalView).abs().oneMinus();

  // Hexagons
  const hexagonsColor = texture(hexagonsTexture, uv().mul(vec2(6, 4)));
  const hexagonsStep = max(time.add(hexagonsColor.g.mul(TWO_PI)).sin().remap(-1, 1, 0, 1), finalImpact);
  // Chained .step(edge) is step(edge, x): 1 where r <= hexagonsStep, so the hexagon grows from its center
  const hexagonsMask = hexagonsStep.step(hexagonsColor.r);
  const hexagonsPolarMask = uv().y.sub(0.5).abs().remapClamp(0.35, 0.2);
  const hexagonsFresnelMask = max(fresnel.pow(2), finalImpact);
  const hexagonsFill = max(hexagonsColor.r, finalImpact);
  const hexagons = mul(hexagonsMask, hexagonsColor.b, hexagonsPolarMask, hexagonsFresnelMask, hexagonsFill);

  // Lines
  const linesStrength = positionWorld.y.mul(3).sub(time).sin().remap(-1, 1).mul(0.05);
  const lines = positionWorld.y.mul(20).add(time).fract().pow(3).mul(linesStrength);

  // Emissive
  const emissiveStrength = add(hexagons, fresnel.pow(5), lines).mul(strength);
  const emissive = mix(colorA, colorB, emissiveStrength).mul(emissiveStrength);

  return emissive;
})();

// @types/three 0.186 declares emissiveNode only on MeshStandardNodeMaterial, but the base
// NodeMaterial reads it for every material (three's NodeMaterial.js, setupLighting()). A spread
// skips JSX's excess-property check, so the lesson's emissiveNode stays on MeshBasicNodeMaterial.
const emissiveProps = { emissiveNode: shieldEmissive };

// ── Mesh: the lesson's setGeometry() + setMesh(), plus its Raycaster section ─
function Shield() {
  const meshRef = useRef<Mesh>(null);
  const gl = useThree((state) => state.gl);
  const camera = useThree((state) => state.camera);
  const raycaster = useThree((state) => state.raycaster);
  const clock = useThree((state) => state.clock);
  const lastClick = useRef(-Infinity);
  const nextAutoImpact = useRef(1);

  // Raycaster: the lesson's pointerdown handler. It tests the ray against a math Sphere at the
  // shield's size, not against the triangles: the geometry has radius 1, the shader draws radius 2.
  useEffect(() => {
    const canvas = gl.domElement;
    const onPointerDown = (event: PointerEvent) => {
      const mesh = meshRef.current;
      if (mesh === null) return;
      // NDC from the canvas box; the lesson's canvas fills the window, this one does not
      const bounds = canvas.getBoundingClientRect();
      const mouse = new Vector2(
        ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
        -((event.clientY - bounds.top) / bounds.height) * 2 + 1,
      );
      raycaster.setFromCamera(mouse, camera);

      const sphere = new Sphere(mesh.position, radius.value);
      let intersect: Vector3 | null = new Vector3();
      intersect = raycaster.ray.intersectSphere(sphere, intersect);
      if (intersect) {
        addImpact(mesh, intersect, clock.elapsedTime);
        lastClick.current = clock.elapsedTime;
      }
    };
    canvas.addEventListener('pointerdown', onPointerDown);
    return () => canvas.removeEventListener('pointerdown', onPointerDown);
  }, [gl, camera, raycaster, clock]);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (mesh === null) return;
    const now = state.clock.elapsedTime;

    // Demo only: a slow turn, so impacts stored in local space visibly ride along
    mesh.rotation.y += delta * 0.15;

    // Demo only: when nobody has clicked for 3 s, hit the side facing the camera every 1.5 s,
    // so a new impact radius shows up without a click
    if (now - lastClick.current > 3 && now > nextAutoImpact.current) {
      nextAutoImpact.current = now + 1.5;
      const center = mesh.position;
      const toCamera = state.camera.position.clone().sub(center).normalize();
      const jitter = new Vector3().randomDirection().multiplyScalar(0.9);
      const point = toCamera.add(jitter).normalize().multiplyScalar(radius.value).add(center);
      addImpact(mesh, point, now);
    }

    updateImpacts(now);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      {/* black + additive: the base color adds nothing, only the emissive shows */}
      <meshBasicNodeMaterial
        transparent
        blending={AdditiveBlending}
        color={0x000000}
        side={DoubleSide}
        positionNode={shieldPosition}
        {...emissiveProps}
      />
    </mesh>
  );
}

/**
 * Replaces R3F's render call with a scene pass plus bloom. The lesson gives threshold 0 and a low
 * strength; 0.1 is this demo's pick.
 * useFrame with priority 1 tells R3F to stop calling gl.render() itself.
 * Also attaches the Inspector with the lesson's Shield parameters (its Debug section).
 */
function ShieldPipeline({ onImpactRadius }: { onImpactRadius: (value: number) => void }) {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);
  const camera = useThree((state) => state.camera);

  const pipelineRef = useRef<RenderPipeline | null>(null);

  useEffect(() => {
    const renderer = gl as unknown as WebGPURenderer;
    const renderPipeline = new RenderPipeline(renderer);

    // Threshold 0: everything but pure black blooms
    const scenePass = pass(scene, camera);
    const bloomPass = bloom(scenePass as Node<'vec4'>);
    bloomPass.threshold.value = 0;
    bloomPass.strength.value = 0.1;
    renderPipeline.outputNode = (scenePass as Node<'vec4'>).add(bloomPass);

    pipelineRef.current = renderPipeline;

    const detachInspector = attachInspector(renderer, (inspector) => {
      const shieldGui = inspector.createParameters('Shield');
      shieldGui.add(radius, 'value', 0, 5, 0.01).name('radius');
      shieldGui.addColor(colorA, 'value').name('colorA');
      shieldGui.addColor(colorB, 'value').name('colorB');
      shieldGui.add(strength, 'value', 1, 100, 0.01).name('strength');
      shieldGui
        .add(impactRadius, 'value', 0.2, 3, 0.01)
        .name('impact radius')
        .onChange((value: number) => onImpactRadius(value));
    });

    return () => {
      detachInspector();
      pipelineRef.current = null;
      renderPipeline.dispose();
    };
    // onImpactRadius is a React state setter, stable across renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl, scene, camera]);

  useFrame(() => pipelineRef.current?.render(), 1);

  return null;
}

export function ShieldDemo() {
  const [impactRadiusValue, setImpactRadiusValue] = useState(impactRadius.value);

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-3">
      {/* Tall: the Inspector's full panel is 350px and sits at the bottom of this box */}
      <div className="h-[40rem] w-full overflow-hidden rounded-md">
        <WebGPUCanvas camera={{ position: [0, 1.5, 9.5], fov: 45 }}>
          <color attach="background" args={['#0b1020']} />
          <Shield />
          <ShieldPipeline onImpactRadius={setImpactRadiusValue} />
        </WebGPUCanvas>
      </div>
      <pre className="w-full overflow-x-auto rounded bg-slate-100 p-2 font-mono text-xs">
        {`// script.js, pointerdown
if(intersect)
  shield.impacts.add(intersect, ${impactRadiusValue.toFixed(2)})   // → w of one vec4

// Shield.js, emissiveNode
const impact = impactDistance.div(impactData.w).oneMinus().max(0)
finalImpact.assign(max(finalImpact, impact))`}
      </pre>
      <p className="text-center text-xs text-slate-500">
        點球面任何地方，打一個 impact。沒人點的時候，demo 每 1.5 秒自己往朝向鏡頭的那一面打一下。右上角 Inspector 的
        Parameters 前四個是課程的 Shield 參數，最後的 impact radius 是 demo 加的，就是圖裡黃框的 w。拉大之後，下一個
        impact 亮的範圍變大，裡面的六角形整格撐滿。
      </p>
    </div>
  );
}
