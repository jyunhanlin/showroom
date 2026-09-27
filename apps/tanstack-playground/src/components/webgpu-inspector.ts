import type { Inspector } from 'three/addons/inspector/Inspector.js';
import { InspectorBase, type WebGPURenderer } from 'three/webgpu';

/**
 * Attaches three's Inspector to a renderer from inside a useEffect, like the lessons' starters do
 * with `renderer.inspector = new Inspector()`. Returns the effect cleanup.
 *
 * - Dynamic import: the Inspector's Settings tab reads localStorage at module load, and the SSR
 *   pass imports every note's demo, so a static import 500s the whole site.
 * - SSR guard: `pnpm build` has nitro bundle all of `three` into one server chunk (_libs/three.mjs),
 *   which would still evaluate the Inspector eagerly. Vite replaces import.meta.env.SSR with true
 *   there, so the import() is dropped from the server bundle. Effects never run on the server anyway.
 * - Placement: three 0.186 mounts the panel inside renderer.domElement.parentElement (position:
 *   absolute, overflow: hidden), so in R3F it covers the <Canvas> box only. The full panel is 350px
 *   tall; give the demo box room for it.
 * - Frames: R3F renders from its own rAF, but renderer.init() already started three's internal
 *   loop, which is what opens and closes the Inspector's frames.
 */
export function attachInspector(renderer: WebGPURenderer, build: (inspector: Inspector) => void) {
  if (import.meta.env.SSR) return () => {};

  let inspector: Inspector | null = null;
  let cancelled = false;

  void import('three/addons/inspector/Inspector.js').then((module) => {
    if (cancelled) return;
    inspector = new module.Inspector();
    renderer.inspector = inspector;
    build(inspector);
  });

  return () => {
    cancelled = true;
    if (inspector === null) return;
    inspector.dispose();
    // Not null: three's loop keeps calling inspector.begin() / finish(). InspectorBase is the no-op default.
    renderer.inspector = new InspectorBase();
  };
}
