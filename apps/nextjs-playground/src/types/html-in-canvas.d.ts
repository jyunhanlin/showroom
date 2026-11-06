/**
 * Ambient types for the HTML-in-Canvas API (Chrome 157+).
 * Not in lib.dom yet. Names follow https://github.com/WICG/html-in-canvas.
 *
 * The WebGPU surface is typed minimally and with `Hic*` prefixes on purpose:
 * neither lib.dom nor @types/three ship real `GPUDevice` members here, and
 * declaring the real names risks a clash once they land.
 */

// Module augmentation of 'react' below needs this file to be a module.
// oxlint-disable-next-line unicorn/require-module-specifiers
export {};

declare global {
  interface CanvasPaintEvent extends Event {
    readonly changedElements: Element[];
  }

  interface ElementImageDefaultSize {
    width: number;
    height: number;
  }

  interface UpdateElementGeometryOptions {
    preserveHitTestOrder?: boolean;
    canvasClip?: DOMRectInit;
    canvasTransform?: DOMMatrixInit;
  }

  interface DrawElementImageOptions {
    preserveElementGeometry?: boolean;
  }

  interface HTMLCanvasElementEventMap {
    paint: CanvasPaintEvent;
  }

  interface HTMLCanvasElement {
    content: 'fallback' | 'drawable';
    onpaint: ((this: HTMLCanvasElement, ev: CanvasPaintEvent) => unknown) | null;
    requestPaint(): void;
    updateElementGeometry(element: Element, options?: UpdateElementGeometryOptions): void;
    clearElementGeometry(element: Element): void;
    getElementTransform(element: Element): DOMMatrix;
    getElementImageDefaultSize(element: Element): ElementImageDefaultSize;
  }

  interface CanvasRenderingContext2D {
    drawElementImage(element: Element, dx: number, dy: number, options?: DrawElementImageOptions): void;
    drawElementImage(
      element: Element,
      dx: number,
      dy: number,
      dwidth: number,
      dheight: number,
      options?: DrawElementImageOptions,
    ): void;
    drawElementImage(
      element: Element,
      sx: number,
      sy: number,
      swidth: number,
      sheight: number,
      dx: number,
      dy: number,
      options?: DrawElementImageOptions,
    ): void;
    drawElementImage(
      element: Element,
      sx: number,
      sy: number,
      swidth: number,
      sheight: number,
      dx: number,
      dy: number,
      dwidth: number,
      dheight: number,
      options?: DrawElementImageOptions,
    ): void;
  }

  // --- minimal WebGPU surface used by the HTML-in-Canvas bridge ---

  interface HicGpuTexture {
    readonly width: number;
    readonly height: number;
    destroy(): void;
  }

  interface HicGpuTextureDescriptor {
    size: { width: number; height: number };
    format: 'rgba8unorm' | 'rgba8unorm-srgb';
    usage: number;
  }

  interface HicGpuQueue {
    drawElementImageToTexture(
      source: { source: Element },
      destination: {
        texture: HicGpuTexture;
        size?: { width: number; height: number };
        colorSpace?: 'srgb' | 'display-p3';
        premultipliedAlpha?: boolean;
      },
    ): void;
  }

  interface HicGpuDevice {
    readonly queue: HicGpuQueue;
    createTexture(descriptor: HicGpuTextureDescriptor): HicGpuTexture;
  }
}

declare module 'react' {
  interface HTMLAttributes<T> {
    /** HTML-in-Canvas: marks the element as a paint root. Use `drawable=""`, React drops `true` on unknown attributes. */
    drawable?: '';
  }
}
