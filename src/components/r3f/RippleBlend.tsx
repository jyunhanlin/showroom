import { shaderMaterial } from '@react-three/drei';
import { Canvas, useLoader, useFrame, extend, ReactThreeFiber } from '@react-three/fiber';
import { Suspense, useRef, useEffect } from 'react';
import * as THREE from 'three';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      rippleImageMaterial: ReactThreeFiber.Object3DNode<typeof RippleImageMaterial, typeof RippleImageMaterial>;
    }
  }
}

const RippleImageMaterial = shaderMaterial(
  {
    u_tex_1: null,
    u_tex_2: null,
    u_duration: 2.0,
    u_time: 0.0,
  },
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
  `,
  `
  #define PI 3.141592653589
  #define PI2 6.28318530718

  uniform vec2 u_mouse;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_duration;
  uniform sampler2D u_tex_1;
  uniform sampler2D u_tex_2;

  varying vec2 vUv;

  void main (void)
  {
    vec2 p = -1.0 + 2.0 * vUv;
    float len = length(p);
    vec2 ripple = vUv + (p/len)*cos(len*12.0-u_time*4.0)*0.03;
    float delta = u_time/u_duration;
    vec2 uv = mix(ripple, vUv, delta);
    vec3 col1 = texture2D(u_tex_1, uv).rgb;
    vec3 col2 = texture2D(u_tex_2, uv).rgb;
    float fade = smoothstep(delta*1.4, delta*2.5, len);
    vec3 color = mix(col2, col1, fade);
    gl_FragColor = vec4(color, 1.0);
  }
  `,
);

extend({ RippleImageMaterial });

const isProd = process.env.NODE_ENV === 'production';
const assetPath = isProd ? process.env.NEXT_PUBLIC_BASE_PATH : '';

function RippleImages() {
  const currentIdx = useRef(1);
  const matRef = useRef<THREE.shaderMaterial>();

  const img1 = useLoader(THREE.TextureLoader, `${assetPath}/ripple1.jpeg`);
  const img2 = useLoader(THREE.TextureLoader, `${assetPath}/ripple2.jpeg`);

  const handleClick = () => {
    matRef.current.u_time = 0;

    if (currentIdx.current === 1) {
      matRef.current.u_tex_1 = img2;
      matRef.current.u_tex_2 = img1;
      currentIdx.current = 2;
    } else {
      matRef.current.u_tex_1 = img1;
      matRef.current.u_tex_2 = img2;
      currentIdx.current = 1;
    }
  };

  useEffect(() => {
    if (matRef.current) {
      matRef.current.u_tex_1 = img1;
      matRef.current.u_tex_2 = img2;
    }
  }, [matRef, img1, img2]);

  useFrame((_, delta) => {
    if (matRef.current.u_time < matRef.current.u_duration) {
      matRef.current.u_time += delta;
    }
  });
  return (
    <mesh onClick={handleClick}>
      <planeGeometry args={[10, 7.5]} />
      <rippleImageMaterial ref={matRef} />
    </mesh>
  );
}

export function RippleBlend() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <RippleImages />
      </Suspense>
    </Canvas>
  );
}
