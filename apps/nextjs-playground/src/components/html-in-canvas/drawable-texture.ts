import type { ExternalTexture, MeshBasicMaterial } from 'three/webgpu';

// GPUTextureUsage bits (WebGPU spec): TEXTURE_BINDING | COPY_DST | RENDER_ATTACHMENT
const TEXTURE_USAGE = 0x04 | 0x02 | 0x10;

/**
 * The DOM → GPUTexture bridge for one drawable, shown through `material.map`.
 *
 * Why not THREE.HTMLTexture: three 0.186 / 0.187 still target the pre-Chrome-157 API
 * (`layoutsubtree`, `GPUQueue.copyElementImageToTexture`), which Chrome 157 removed, so its
 * upload path returns early and the texture stays empty. Delete this bridge once three
 * switches to `content="drawable"` + `drawElementImageToTexture`.
 *
 * Call `prepare` and `capture` inside the paint event, for two reasons:
 * getElementImageDefaultSize throws "No cached paint record" until the element has been
 * painted once, and its result is in grid px, so the grid must already be sized (measuring
 * at the default 300×150 grid gave a quarter-size, cropped texture). The canvas also needs
 * its WebGPU context by then, and three only creates that in its first render.
 *
 * three initialises an ExternalTexture once and refuses a later sourceTexture swap
 * ("Texture already initialized"), so a size change gets a new ExternalTexture.
 */
export function createDrawableTexture({
  canvas,
  element,
  device,
  material,
  ExternalTextureClass,
}: {
  canvas: HTMLCanvasElement;
  element: Element;
  device: HicGpuDevice;
  material: MeshBasicMaterial;
  // Passed in because three/webgpu is imported dynamically, to stay out of the static prerender.
  ExternalTextureClass: typeof ExternalTexture;
}) {
  let texture: HicGpuTexture | null = null;
  let map: ExternalTexture | null = null;

  return {
    /** Makes sure a texture of the current size exists. True if it is new, so never captured into. */
    prepare(forceNew = false): boolean {
      const size = canvas.getElementImageDefaultSize(element);
      const width = Math.ceil(size.width);
      const height = Math.ceil(size.height);
      if (!forceNew && texture?.width === width && texture.height === height) return false;

      const previousTexture = texture;
      const previousMap = map;
      texture = device.createTexture({
        size: { width, height },
        // -srgb format: the sampler decodes to linear, three re-encodes on output.
        format: 'rgba8unorm-srgb',
        usage: TEXTURE_USAGE,
      });
      map = new ExternalTextureClass(texture);
      material.map = map;
      material.needsUpdate = true;
      previousMap?.dispose();
      previousTexture?.destroy();
      return true;
    },
    capture() {
      if (texture) device.queue.drawElementImageToTexture({ source: element }, { texture });
    },
    size: () => ({ width: texture?.width ?? 0, height: texture?.height ?? 0 }),
    dispose() {
      map?.dispose();
      texture?.destroy();
    },
  };
}
