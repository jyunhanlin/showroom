// @ts-nocheck
import { Text } from '@chakra-ui/react';
import { Preload, ScrollControls, Scroll, useScroll, Image } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

import { assetPath } from '@/utils/assetPath';

const Images = () => {
  const { width, height } = useThree((state) => state.viewport);
  const data = useScroll();
  const group = useRef<THREE.Object3D>();
  useFrame(() => {
    group.current.children[0].material.zoom = 1 + data.range(0, 1 / 3) / 3;
    group.current.children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3;
    group.current.children[2].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 3;
    group.current.children[3].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
    group.current.children[4].material.zoom = 1 + data.range(1.25 / 3, 1 / 3) / 1;
    group.current.children[5].material.zoom = 1 + data.range(1.8 / 3, 1 / 3) / 3;
    group.current.children[5].material.grayscale = 1 - data.range(1.6 / 3, 1 / 3);
    group.current.children[6].material.zoom = 1 + (1 - data.range(2 / 3, 1 / 3)) / 3;
  });
  return (
    <group ref={group}>
      <Image position={[-2, 0, 0]} scale={[4, height, 1]} url={`${assetPath}/img/scroll-effect/1.jpeg`} />
      <Image position={[2, 0, 1]} scale={3} url={`${assetPath}/img/scroll-effect/2.jpeg`} />
      <Image position={[-2.3, -height, 2]} scale={[1, 3, 1]} url={`${assetPath}/img/scroll-effect/3.jpeg`} />
      <Image position={[-0.6, -height, 3]} scale={[1, 2, 1]} url={`${assetPath}/img/scroll-effect/4.jpeg`} />
      <Image position={[0.75, -height, 3.5]} scale={1.5} url={`${assetPath}/img/scroll-effect/5.jpeg`} />
      <Image position={[0, -height * 1.5, 2.5]} scale={[1.5, 3, 1]} url={`${assetPath}/img/scroll-effect/6.jpeg`} />
      <Image
        position={[0, -height * 2 - height / 4, 0]}
        scale={[width, height / 2, 1]}
        url={`${assetPath}/img/scroll-effect/7.jpeg`}
      />
    </group>
  );
};

export const ScrollEffect = () => (
  <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
    <Suspense fallback={null}>
      <ScrollControls damping={4} pages={3}>
        <Scroll>
          <Images />
        </Scroll>
        <Scroll html>
          <Text as="h1" position="absolute" top="60vh" left="1em">
            First
          </Text>
          <Text position="absolute" top="120vh" left="60vw">
            Second
          </Text>
          <Text as="h1" position="absolute" top="220vh" left="10vw" fontSize="25vw" color="white">
            TITLE
          </Text>
        </Scroll>
      </ScrollControls>
      <Preload />
    </Suspense>
  </Canvas>
);
