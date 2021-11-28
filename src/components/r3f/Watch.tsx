import { a, useSpring } from '@react-spring/three';
import { useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { useDrag } from '@use-gesture/react';
import { Suspense } from 'react';
import { MathUtils } from 'three';

import { assetPath } from '@/utils/assetPath';

export function Watch() {
  return (
    <Canvas dpr={[1, 2]}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Suspense fallback={null}>
        <BouncyControls>
          <WatchModel position={[0, 0.25, 0]} scale={0.004} />
        </BouncyControls>
        {/* @ts-ignore */}
        <ContactShadows
          rotation-x={Math.PI / 2}
          position={[0, -2, 0]}
          opacity={0.2}
          width={10}
          height={10}
          blur={2.5}
          far={10}
        />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}

function BouncyControls({ children }) {
  const { size, gl } = useThree();
  const [props, api] = useSpring(() => ({ rotation: [0, 0, 0], config: { mass: 2, precision: 0.0001 } }), []);
  useDrag(
    ({ movement: [x, y], down }) => {
      y = (MathUtils.clamp(y / size.height, -1, 1) * Math.PI) / 2;
      x = MathUtils.clamp(x / size.width, -1, 1) * Math.PI;
      api.start({ rotation: down ? [y, x, 0] : [0, 0, 0], config: { tension: down ? 400 : 1000 } });
    },
    { target: gl.domElement },
  );
  // @ts-ignore
  return <a.group {...props}>{children}</a.group>;
}

function WatchModel(props) {
  const { scene } = useGLTF(`${assetPath}/3d-model/watch-v1.glb`);
  return <primitive object={scene} {...props} />;
}
