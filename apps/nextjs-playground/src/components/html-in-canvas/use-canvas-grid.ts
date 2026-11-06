import { useEffect, useRef, type RefObject } from 'react';

export type CanvasGrid = {
  /** canvas grid pixels per CSS pixel, horizontal */
  scaleX: number;
  /** canvas grid pixels per CSS pixel, vertical */
  scaleY: number;
  cssWidth: number;
  cssHeight: number;
};

/**
 * Keeps `canvas.width/height` equal to the device pixels the canvas covers, so HTML
 * drawn into it is not resampled (Chrome concepts page, "Sizing and units").
 * Deliberately not `ctx.scale(dpr, dpr)`: drawElementImage takes grid pixels, so the
 * caller multiplies CSS measurements by `scaleX/scaleY` instead.
 */
export function useCanvasGrid(canvasRef: RefObject<HTMLCanvasElement | null>, enabled: boolean) {
  const grid = useRef<CanvasGrid>({ scaleX: 1, scaleY: 1, cssWidth: 0, cssHeight: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!enabled || !canvas) return;

    const supportsDpc =
      typeof ResizeObserverEntry !== 'undefined' && 'devicePixelContentBoxSize' in ResizeObserverEntry.prototype;

    const observer = new ResizeObserver(([entry]) => {
      const dpc = entry.devicePixelContentBoxSize;
      const cssWidth = entry.contentRect.width;
      const cssHeight = entry.contentRect.height;
      if (dpc && dpc.length > 0) {
        canvas.width = dpc[0].inlineSize;
        canvas.height = dpc[0].blockSize;
      } else {
        canvas.width = Math.round(cssWidth * window.devicePixelRatio);
        canvas.height = Math.round(cssHeight * window.devicePixelRatio);
      }
      grid.current = {
        scaleX: canvas.width / cssWidth,
        scaleY: canvas.height / cssHeight,
        cssWidth,
        cssHeight,
      };
      // Setting width/height clears the bitmap; the paint event fires in the same frame
      // when the resize came from layout, but request one anyway to cover the first run.
      // Absent where HTML-in-Canvas is unsupported, which the stress section's comparison
      // renderers still run on.
      if ('requestPaint' in canvas) canvas.requestPaint();
    });
    observer.observe(canvas, supportsDpc ? { box: 'device-pixel-content-box' } : {});
    return () => observer.disconnect();
  }, [canvasRef, enabled]);

  return grid;
}
