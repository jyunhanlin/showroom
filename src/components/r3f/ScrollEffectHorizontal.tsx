/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { ScrollControls, Scroll, useScroll, Image } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useState, useRef } from 'react';
import * as THREE from 'three';

const damp = THREE.MathUtils.damp;
const isProd = process.env.NODE_ENV === 'production';
const assetPath = isProd ? process.env.NEXT_PUBLIC_BASE_PATH : '';

const urls = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 5, 7, 8, 2, 4, 9, 6].map(
  (u) => `${assetPath}/img/scroll-effect-horizontal/${u}.jpg`,
);

function Item({ index, position, scale, c = new THREE.Color(), ...props }) {
  const ref = useRef<THREE.mesh>();
  const scroll = useScroll();
  const [hovered, hover] = useState(false);
  const over = () => hover(true);
  const out = () => hover(false);
  useFrame((state, delta) => {
    const y = Math.sin(scroll.range(index / urls.length - 0.08, 4 / urls.length) * Math.PI);
    ref.current.material.scale[1] = ref.current.scale.y = damp(ref.current.scale.y, 4 + y, 8, delta);
    ref.current.material.scale[0] = ref.current.scale.x = damp(ref.current.scale.x, scale[0], 6, delta);
    // if (clicked !== null && index < clicked)
    //   ref.current.position.x = damp(ref.current.position.x, position[0] - 2, 6, delta);
    // if (clicked !== null && index > clicked)
    //   ref.current.position.x = damp(ref.current.position.x, position[0] + 2, 6, delta);
    // if (clicked === null || clicked === index)
    //   ref.current.position.x = damp(ref.current.position.x, position[0], 6, delta);
    ref.current.material.grayscale = damp(ref.current.material.grayscale, hovered ? 0 : Math.max(0, 1 - y), 6, delta);
    ref.current.material.color?.lerp(c.set(hovered ? 'white' : '#ccc'), hovered ? 0.3 : 0.1);
  });
  return <Image ref={ref} {...props} position={position} scale={scale} onPointerOver={over} onPointerOut={out} />;
}

function Items({ w = 0.7, gap = 0.15 }) {
  const { width } = useThree((state) => state.viewport);
  const xW = w + gap;
  return (
    <ScrollControls horizontal damping={6} pages={(width - xW + urls.length * xW) / width}>
      <Scroll>
        {urls.map((url, i) => (
          <Item key={i} index={i} position={[i * xW, 0, 0]} scale={[w, 4, 1]} url={url} />
        ))}
      </Scroll>
    </ScrollControls>
  );
}

export const ScrollEffectHorizontal = () => (
  <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
    <Suspense fallback={null}>
      <Items />
    </Suspense>
  </Canvas>
);
