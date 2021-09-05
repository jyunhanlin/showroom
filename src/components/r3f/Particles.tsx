import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, useCallback } from 'react';
import * as THREE from 'three';

const COUNT = 1000;

type ParticlesProps = {
  mouse: [number, number];
};

const ParticleItems: React.VFC<ParticlesProps> = ({ mouse }) => {
  const mesh = useRef<THREE.instanceMesh>();
  const light = useRef<THREE.pointLight>();
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  const dummy = useMemo(() => new THREE.Object3D(), []);
  // Generate some random positions, speed factors and timings
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < COUNT; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [COUNT]);
  // The innards of this hook will run every frame
  useFrame(() => {
    // Makes the light follow the mouse
    if (light.current) light.current.position.set(mouse[0] / aspect, -mouse[1] / aspect, 0);
    // Run through the randomized data to calculate some movement
    particles.forEach((particle, i) => {
      const { factor, speed, xFactor, yFactor, zFactor } = particle;
      let { t } = particle;
      // There is no sense or reason to any of this, just messing around with trigonometric functions
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      particle.mx += (mouse[0] - particle.mx) * 0.01;
      particle.my += (mouse[1] * -1 - particle.my) * 0.01;
      // Update the dummy object
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10,
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      // And apply the matrix to the instanced item
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <pointLight ref={light} distance={40} intensity={8} color="lightblue" />
      <instancedMesh ref={mesh} args={[null, null, COUNT]}>
        <dodecahedronBufferGeometry args={[0.2, 0]} />
        <meshPhongMaterial color="#050505" />
      </instancedMesh>
    </>
  );
};

export const Particles = () => {
  const mouse = useRef<[number, number]>([0, 0]);
  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) => (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]),
    [],
  );

  return (
    <Canvas onMouseMove={onMouseMove}>
      <ParticleItems mouse={mouse.current} />
    </Canvas>
  );
};
