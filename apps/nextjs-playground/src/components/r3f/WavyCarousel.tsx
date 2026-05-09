// Inspired by: https://tympanus.net/codrops/2025/11/26/creating-wavy-infinite-carousels-in-react-three-fiber-with-glsl-shaders/
// @ts-nocheck
'use client';
import { shaderMaterial } from '@react-three/drei';
import { Canvas, extend, useFrame, useLoader, useThree } from '@react-three/fiber';
import Lenis from 'lenis';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

import { assetPath } from '@/utils/assetPath';

const IMAGE_URLS = Array.from({ length: 7 }, (_, i) => `${assetPath}/img/scroll-effect/${i + 1}.jpeg`);

type Variant = 'vertical' | 'horizontal' | 'dual';

const GLImageMaterial = shaderMaterial(
  {
    uTexture: null,
    uPlaneSize: new THREE.Vector2(1, 1),
    uTextureSize: new THREE.Vector2(1, 1),
    uScrollSpeed: 0,
    uCurveStrength: 0.6,
    uCurveFrequency: 0.35,
    uIsHorizontal: 0,
  },
  /* glsl */ `
  uniform float uScrollSpeed;
  uniform float uCurveStrength;
  uniform float uCurveFrequency;
  uniform float uIsHorizontal;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 newPosition = position;

    if (uIsHorizontal < 0.5) {
      float stretch = sin(uv.y * 3.14159265) * uScrollSpeed;
      newPosition.y += stretch;
      vec4 worldPos = modelMatrix * vec4(newPosition, 1.0);
      newPosition.x += cos(worldPos.y * uCurveFrequency) * uCurveStrength;
    } else {
      float stretch = sin(uv.x * 3.14159265) * uScrollSpeed;
      newPosition.x += stretch;
      vec4 worldPos = modelMatrix * vec4(newPosition, 1.0);
      newPosition.y += cos(worldPos.x * uCurveFrequency) * uCurveStrength;
    }

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
  `,
  /* glsl */ `
  uniform sampler2D uTexture;
  uniform vec2 uPlaneSize;
  uniform vec2 uTextureSize;
  varying vec2 vUv;

  void main() {
    vec2 ratio = vec2(
      min((uPlaneSize.x / uPlaneSize.y) / (uTextureSize.x / uTextureSize.y), 1.0),
      min((uPlaneSize.y / uPlaneSize.x) / (uTextureSize.y / uTextureSize.x), 1.0)
    );
    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
    gl_FragColor = texture2D(uTexture, uv);
  }
  `,
);

extend({ GLImageMaterial });

type GLImageProps = {
  texture: THREE.Texture;
  planeSize: [number, number];
  isHorizontal: boolean;
  curveStrength: number;
  curveFrequency: number;
};

function GLImage({ texture, planeSize, isHorizontal, curveStrength, curveFrequency }: GLImageProps) {
  const matRef = useRef<THREE.ShaderMaterial | null>(null);

  useEffect(() => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTexture.value = texture;
    const img = texture.image as { width: number; height: number };
    matRef.current.uniforms.uTextureSize.value.set(img.width, img.height);
    matRef.current.uniforms.uPlaneSize.value.set(planeSize[0], planeSize[1]);
    matRef.current.uniforms.uIsHorizontal.value = isHorizontal ? 1 : 0;
    matRef.current.uniforms.uCurveStrength.value = curveStrength;
    matRef.current.uniforms.uCurveFrequency.value = curveFrequency;
  }, [texture, planeSize, isHorizontal, curveStrength, curveFrequency]);

  return (
    <mesh>
      <planeGeometry args={[planeSize[0], planeSize[1], 32, 32]} />
      <gLImageMaterial ref={matRef} transparent />
    </mesh>
  );
}

type CarouselProps = {
  textures: THREE.Texture[];
  direction: 'vertical' | 'horizontal';
  scrollSign?: 1 | -1;
  offsetX?: number;
  planeSize?: [number, number];
  spacing?: number;
  curveStrength?: number;
  curveFrequency?: number;
  velocityRef: React.MutableRefObject<number>;
};

function Carousel({
  textures,
  direction,
  scrollSign = 1,
  offsetX = 0,
  planeSize = [3.2, 4.2],
  spacing = 5,
  curveStrength = 0.6,
  curveFrequency = 0.35,
  velocityRef,
}: CarouselProps) {
  const groupRef = useRef<THREE.Group | null>(null);
  const scrollOffset = useRef(0);
  const damped = useRef(0);

  const total = textures.length * spacing;
  const half = total / 2;
  const isHorizontal = direction === 'horizontal';

  useFrame((_, dt) => {
    const targetVelocity = velocityRef.current * scrollSign;
    damped.current = THREE.MathUtils.damp(damped.current, targetVelocity, 12, dt);
    scrollOffset.current += damped.current * dt;

    const group = groupRef.current;
    if (!group) return;

    group.children.forEach((child, i) => {
      const base = (i - textures.length / 2) * spacing;
      let p = base + scrollOffset.current;
      p = (((p % total) + total) % total) - half;
      if (isHorizontal) child.position.set(p, 0, 0);
      else child.position.set(offsetX, p, 0);

      const mesh = child as THREE.Mesh;
      const mat = mesh.material as THREE.ShaderMaterial;
      if (mat?.uniforms?.uScrollSpeed) {
        mat.uniforms.uScrollSpeed.value = damped.current;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {textures.map((tex, i) => (
        <GLImage
          key={i}
          texture={tex}
          planeSize={planeSize}
          isHorizontal={isHorizontal}
          curveStrength={curveStrength}
          curveFrequency={curveFrequency}
        />
      ))}
    </group>
  );
}

function Scene({ variant, velocityRef }: { variant: Variant; velocityRef: React.MutableRefObject<number> }) {
  const textures = useLoader(THREE.TextureLoader, IMAGE_URLS);
  const { viewport } = useThree();

  const planeSize = useMemo<[number, number]>(() => {
    const w = Math.min(viewport.width * 0.35, 4.2);
    return [w, w * 1.3];
  }, [viewport.width]);

  if (variant === 'dual') {
    return (
      <>
        <Carousel
          textures={textures}
          direction="vertical"
          scrollSign={1}
          offsetX={-planeSize[0] * 0.85}
          planeSize={planeSize}
          velocityRef={velocityRef}
        />
        <Carousel
          textures={textures.toReversed()}
          direction="vertical"
          scrollSign={-1}
          offsetX={planeSize[0] * 0.85}
          planeSize={planeSize}
          velocityRef={velocityRef}
        />
      </>
    );
  }

  return <Carousel textures={textures} direction={variant} planeSize={planeSize} velocityRef={velocityRef} />;
}

export function WavyCarousel() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const velocityRef = useRef(0);
  const [variant, setVariant] = useState<Variant>('vertical');

  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return;

    const lenis = new Lenis({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smoothWheel: true,
      infinite: true,
      lerp: 0.1,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      velocityRef.current = lenis.velocity * 0.08;
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 45 }}>
          <Scene variant={variant} velocityRef={velocityRef} />
        </Canvas>
      </div>

      <div
        ref={wrapperRef}
        className="absolute inset-0 overflow-y-scroll [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div ref={contentRef} style={{ height: '500vh' }} />
      </div>

      <div className="absolute top-4 right-4 z-10 flex gap-2 rounded-md bg-black/40 p-1 text-xs text-white backdrop-blur">
        {(['vertical', 'horizontal', 'dual'] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setVariant(v)}
            className={`rounded px-3 py-1 transition-colors ${
              variant === v ? 'bg-white text-black' : 'hover:bg-white/20'
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      <div className="pointer-events-none absolute bottom-4 left-4 text-xs text-white/60">
        scroll / wheel to drive the wave
      </div>
    </div>
  );
}
