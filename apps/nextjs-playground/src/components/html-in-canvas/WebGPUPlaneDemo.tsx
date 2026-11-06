'use client';

import { useEffect, useRef, useState } from 'react';

import { CARD_HEIGHT, CARD_WIDTH, DemoCard } from './DemoCard';
import { createDrawableTexture } from './drawable-texture';
import { Fallback } from './Fallback';
import { supportsWebGPU, type Support } from './support';

const PLANE_WIDTH = 2.4;
const PLANE_HEIGHT = (PLANE_WIDTH * CARD_HEIGHT) / CARD_WIDTH;

/**
 * The card is captured into a GPUTexture every paint event, three/webgpu samples it on a
 * tilting plane, and the card's element geometry is re-synced each frame so the button
 * inside stays clickable in 3D.
 */
export function WebGPUPlaneDemo({ support }: { support: Support }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  // Derived, not stored: `support` is only 'yes' on the client, where navigator.gpu is readable.
  const gpu: Support = support === 'yes' ? (supportsWebGPU() ? 'yes' : 'no') : support;

  useEffect(() => {
    const canvas = canvasRef.current;
    const card = cardRef.current;
    if (gpu !== 'yes' || !canvas || !card) return;

    let disposed = false;
    let cleanup = () => {};

    const fail = (err: unknown) => {
      console.error(err);
      setError(err instanceof Error ? err.message : String(err));
      cleanup();
    };

    (async () => {
      // Dynamic import keeps three/webgpu out of Next's static prerender and the initial bundle.
      const THREE = await import('three/webgpu');
      if (disposed) return;

      const renderer = new THREE.WebGPURenderer({ canvas, antialias: true, alpha: true });
      await renderer.init();
      if (disposed) {
        renderer.dispose();
        return;
      }
      const device = (renderer.backend as { device?: HicGpuDevice }).device;
      if (!device) throw new Error('WebGPURenderer did not produce a GPUDevice (fell back to WebGL2?)');

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x000000, 0);

      // --- scene ---
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 20);
      camera.position.set(0, 0, 3.4);
      const geometry = new THREE.PlaneGeometry(PLANE_WIDTH, PLANE_HEIGHT);
      // drawElementImageToTexture writes top-left origin; ExternalTexture skips three's flipY.
      const uv = geometry.attributes.uv;
      for (let i = 0; i < uv.count; i++) uv.setY(i, 1 - uv.getY(i));
      const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.visible = false;
      scene.add(mesh);

      const backdrop = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), new THREE.MeshBasicMaterial({ color: 0x1e293b }));
      backdrop.position.z = -1.5;
      scene.add(backdrop);

      // --- DOM → GPUTexture bridge: the mesh stays hidden until the first texture exists ---
      const cardTexture = createDrawableTexture({
        canvas,
        element: card,
        device,
        material,
        ExternalTextureClass: THREE.ExternalTexture,
      });
      canvas.onpaint = () => {
        // An exception here reaches window.onerror, not the promise's catch below.
        try {
          if (cardTexture.prepare()) {
            mesh.visible = true;
            fitElementToPlane();
          }
          cardTexture.capture();
        } catch (err) {
          fail(err);
        }
      };

      // --- sizing: three owns the WebGPU canvas grid via setSize ---
      let cssWidth = canvas.clientWidth;
      let cssHeight = canvas.clientHeight;
      const applySize = () => {
        renderer.setSize(cssWidth, cssHeight, false);
        camera.aspect = cssWidth / cssHeight;
        camera.updateProjectionMatrix();
      };
      const observer = new ResizeObserver(([entry]) => {
        cssWidth = entry.contentRect.width;
        cssHeight = entry.contentRect.height;
        applySize();
      });
      observer.observe(canvas);
      applySize();

      // --- element geometry: card px → plane local → world → clip → canvas CSS px ---
      // One 4×4 with the perspective row intact, so Chrome can hit-test the tilted plane.
      const toLocal = new THREE.Matrix4();
      // Re-measured with each new texture so clicks still map onto the plane after a resize.
      const fitElementToPlane = () => {
        toLocal
          .makeTranslation(-PLANE_WIDTH / 2, PLANE_HEIGHT / 2, 0)
          .multiply(
            new THREE.Matrix4().makeScale(PLANE_WIDTH / card.offsetWidth, -PLANE_HEIGHT / card.offsetHeight, 1),
          );
      };
      fitElementToPlane();
      const toScreen = new THREE.Matrix4();
      const m = new THREE.Matrix4();
      const syncGeometry = () => {
        toScreen
          .makeTranslation(cssWidth / 2, cssHeight / 2, 0)
          .multiply(new THREE.Matrix4().makeScale(cssWidth / 2, -cssHeight / 2, 1));
        m.copy(toScreen)
          .multiply(camera.projectionMatrix)
          .multiply(camera.matrixWorldInverse)
          .multiply(mesh.matrixWorld)
          .multiply(toLocal);
        canvas.updateElementGeometry(card, { canvasTransform: new DOMMatrix(m.elements) });
      };

      renderer.setAnimationLoop((t) => {
        mesh.rotation.y = Math.sin(t / 1400) * 0.55;
        mesh.rotation.x = Math.sin(t / 2300) * 0.25;
        mesh.updateMatrixWorld();
        camera.updateMatrixWorld();
        renderer.render(scene, camera);
        syncGeometry();
      });
      canvas.requestPaint();

      cleanup = () => {
        // Runs from fail() and again from the effect's own cleanup on unmount.
        cleanup = () => {};
        renderer.setAnimationLoop(null);
        observer.disconnect();
        canvas.onpaint = null;
        canvas.clearElementGeometry(card);
        cardTexture.dispose();
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    })().catch(fail);

    return () => {
      disposed = true;
      cleanup();
    };
  }, [gpu]);

  const card = (
    <DemoCard
      idPrefix="gpu"
      cardRef={cardRef}
      count={count}
      onClick={() => setCount((c) => c + 1)}
      accent={count % 2 === 1}
      nestedDrawable={false}
      label="WebGPU plane"
    />
  );

  const fallbackReason = support === 'no' ? undefined : 'navigator.gpu 不存在，WebGPU 版的 DOM 擷取需要真的 GPUQueue。';

  return (
    <div className="space-y-3">
      {gpu === 'yes' && !error ? (
        <canvas ref={canvasRef} content="drawable" className="block h-[340px] w-full rounded-lg bg-slate-800">
          {card}
        </canvas>
      ) : (
        <Fallback support={gpu} reason={error ?? fallbackReason}>
          {card}
        </Fallback>
      )}
      <div className="text-sm">
        count = <strong data-testid="gpu-count">{count}</strong>
      </div>
    </div>
  );
}
