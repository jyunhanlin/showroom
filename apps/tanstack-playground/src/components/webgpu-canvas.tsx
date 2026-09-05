import { Canvas, extend, type CanvasProps, type ThreeToJSXElements } from '@react-three/fiber';
import type * as THREE_CORE from 'three';
import * as THREE from 'three/webgpu';

// Register every three/webgpu class (incl. *NodeMaterial) as a JSX element, once for the whole app.
// Pattern from R3F docs (API/canvas.mdx "WebGPU" + API/typescript.mdx "extend").
// The docs extend with the full namespace, but that collides with R3F's built-in ThreeElements
// on classes three/webgpu re-implements (e.g. PMREMGenerator), so only add the webgpu-only keys.
type WebGPUOnlyElements = Omit<ThreeToJSXElements<typeof THREE>, keyof ThreeToJSXElements<typeof THREE_CORE>>;
declare module '@react-three/fiber' {
  interface ThreeElements extends WebGPUOnlyElements {}
}

// `any` per the R3F docs: the THREE namespace also exports non-constructor values.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
extend(THREE as any);

type Props = Omit<CanvasProps, 'gl'>;

/**
 * <Canvas> that boots a WebGPURenderer. Init is async, so `gl` returns a promise.
 * No manual fallback: WebGPURenderer itself drops to WebGL2 when WebGPU is unavailable.
 */
export function WebGPUCanvas(props: Props) {
  return (
    <Canvas
      gl={async (glProps) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const renderer = new THREE.WebGPURenderer(glProps as any);
        await renderer.init();
        return renderer;
      }}
      {...props}
    />
  );
}
