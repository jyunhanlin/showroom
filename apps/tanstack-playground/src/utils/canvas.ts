export type CanvasDimensions = { width: number; height: number };

export function setupCanvas(canvas: HTMLCanvasElement): {
  ctx: CanvasRenderingContext2D;
  dimensions: CanvasDimensions;
  disposeResize: () => void;
} {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to acquire 2D rendering context');
  }
  const dimensions: CanvasDimensions = { width: 0, height: 0 };

  function update() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx!.scale(dpr, dpr);
    dimensions.width = rect.width;
    dimensions.height = rect.height;
  }

  window.addEventListener('resize', update);
  update();

  return {
    ctx,
    dimensions,
    disposeResize: () => window.removeEventListener('resize', update),
  };
}

export function convertDegreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function convertPolarToCartesian(angleDegrees: number, distance: number): { x: number; y: number } {
  const radians = convertDegreesToRadians(angleDegrees);
  return {
    x: Math.cos(radians) * distance,
    y: Math.sin(radians) * distance,
  };
}

export function normalize(value: number, inMin: number, inMax: number, outMin = 0, outMax = 1): number {
  if (inMax === inMin) return outMin;
  const t = (value - inMin) / (inMax - inMin);
  return outMin + (outMax - outMin) * t;
}

export function clampedNormalize(value: number, inMin: number, inMax: number, outMin = 0, outMax = 1): number {
  const t = Math.max(0, Math.min(1, normalize(value, inMin, inMax)));
  return outMin + (outMax - outMin) * t;
}
