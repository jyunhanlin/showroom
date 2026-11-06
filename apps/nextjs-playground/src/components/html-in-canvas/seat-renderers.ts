import type { RefObject } from 'react';

import type { CanvasGrid } from './use-canvas-grid';

const SEAT_SIZE = 10;
const SEAT_PITCH = 12;
const SEAT_RADIUS = 2;
// Columns grow twice as fast as rows, so the grid is wide like the canvas it is drawn on.
const GRID_ASPECT = 2;

type Rgb = readonly [number, number, number];
const SEAT_RGB: Rgb = [0, 166, 244];
const HOVER_RGB: Rgb = [255, 32, 86];
const cssColor = ([red, green, blue]: Rgb) => `rgb(${red} ${green} ${blue})`;
const glslColor = (rgb: Rgb) => `vec3(${rgb.map((channel) => (channel / 255).toFixed(3)).join(', ')})`;

// The colours arrive as custom properties so RGB values above stay the only definition.
const DRAWABLE_SEAT_CLASS =
  'absolute box-border size-2.5 rounded-[2px] bg-(--seat-color) hover:bg-(--seat-hover-color)';

type SeatLayout = { count: number; columns: number; xs: Float64Array; ys: Float64Array };

export function createSeatLayout(count: number): SeatLayout {
  const columns = Math.ceil(Math.sqrt(count * GRID_ASPECT));
  const xs = new Float64Array(count);
  const ys = new Float64Array(count);
  for (let i = 0; i < count; i++) {
    xs[i] = (i % columns) * SEAT_PITCH;
    ys[i] = Math.floor(i / columns) * SEAT_PITCH;
  }
  return { count, columns, xs, ys };
}

/** Seats fully inside a canvas of this CSS size when nothing is panned. */
export function visibleSeats(layout: SeatLayout, cssWidth: number, cssHeight: number): number[] {
  const visible: number[] = [];
  for (let i = 0; i < layout.count; i++) {
    if (layout.xs[i] + SEAT_SIZE <= cssWidth && layout.ys[i] + SEAT_SIZE <= cssHeight) visible.push(i);
  }
  return visible;
}

/** A seat's centre in canvas CSS pixels, when nothing is panned. */
export function seatCenter(layout: SeatLayout, index: number): { x: number; y: number } {
  return { x: layout.xs[index] + SEAT_SIZE / 2, y: layout.ys[index] + SEAT_SIZE / 2 };
}

type Pan = { x: number; y: number };

type RendererOptions = {
  canvas: HTMLCanvasElement;
  layout: SeatLayout;
  grid: RefObject<CanvasGrid>;
  pan: Pan;
  /** After each full redraw, with its JS time. */
  onDrawn: (drawMs: number) => void;
};

export type SeatRenderer = {
  requestDraw(): void;
  /** The seat under a viewport point, or null. */
  seatAt(clientX: number, clientY: number): number | null;
  highlight(index: number | null): void;
  /** Whether this seat is currently shown as hovered by the real pointer. */
  showsHover(seat: number): boolean;
  dispose(): void;
};

/** One drawable per seat: the browser handles hit testing and the :hover style. */
function createDrawableRenderer({ canvas, layout, grid, pan, onDrawn }: RendererOptions): SeatRenderer {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('No 2D context');

  canvas.style.setProperty('--seat-color', cssColor(SEAT_RGB));
  canvas.style.setProperty('--seat-hover-color', cssColor(HOVER_RGB));

  const seats: HTMLDivElement[] = [];
  const indexOf = new Map<Element, number>();
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < layout.count; i++) {
    const seat = document.createElement('div');
    seat.setAttribute('drawable', '');
    seat.className = DRAWABLE_SEAT_CLASS;
    seats.push(seat);
    indexOf.set(seat, i);
    fragment.append(seat);
  }
  canvas.append(fragment);

  const onPaint = () => {
    const { scaleX, scaleY, cssWidth } = grid.current;
    if (cssWidth === 0) return;
    const start = performance.now();
    ctx.reset();
    for (let i = 0; i < seats.length; i++) {
      ctx.drawElementImage(seats[i], (layout.xs[i] + pan.x) * scaleX, (layout.ys[i] + pan.y) * scaleY);
    }
    onDrawn(performance.now() - start);
  };
  canvas.addEventListener('paint', onPaint);

  let highlighted: HTMLDivElement | null = null;
  return {
    requestDraw: () => canvas.requestPaint(),
    seatAt: (clientX, clientY) => {
      const element = document.elementFromPoint(clientX, clientY);
      return element ? (indexOf.get(element) ?? null) : null;
    },
    highlight: (index) => {
      highlighted?.style.removeProperty('background-color');
      highlighted = index === null ? null : seats[index];
      if (highlighted) highlighted.style.backgroundColor = cssColor(HOVER_RGB);
    },
    showsHover: (seat) => seats[seat].matches(':hover'),
    dispose: () => {
      canvas.removeEventListener('paint', onPaint);
      canvas.replaceChildren();
    },
  };
}

/**
 * Shared by the two renderers with no DOM per seat: hit testing is arithmetic, hover is a
 * pointer handler, and drawing runs from requestAnimationFrame when something changed.
 */
function createManualRenderer(
  { canvas, layout, grid, pan, onDrawn }: RendererOptions,
  draw: (hovered: number | null) => void,
  disposeResources: () => void = () => {},
): SeatRenderer {
  let hovered: number | null = null;
  let dirty = true;
  let drawnWidth = 0;

  const seatAt = (clientX: number, clientY: number): number | null => {
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left - pan.x;
    const y = clientY - rect.top - pan.y;
    const column = Math.floor(x / SEAT_PITCH);
    const row = Math.floor(y / SEAT_PITCH);
    if (column < 0 || column >= layout.columns || row < 0) return null;
    if (x - column * SEAT_PITCH > SEAT_SIZE || y - row * SEAT_PITCH > SEAT_SIZE) return null;
    const index = row * layout.columns + column;
    return index < layout.count ? index : null;
  };
  const highlight = (index: number | null) => {
    if (index === hovered) return;
    hovered = index;
    dirty = true;
  };

  let frame = requestAnimationFrame(function loop() {
    frame = requestAnimationFrame(loop);
    // These renderers also run where the paint event does not exist, so this loop is the
    // one place that can notice useCanvasGrid resizing the grid, which clears the bitmap.
    if (canvas.width !== drawnWidth) dirty = true;
    if (!dirty || grid.current.cssWidth === 0) return;
    const start = performance.now();
    draw(hovered);
    onDrawn(performance.now() - start);
    dirty = false;
    drawnWidth = canvas.width;
  });

  const onPointerMove = (event: PointerEvent) => highlight(seatAt(event.clientX, event.clientY));
  const onPointerLeave = () => highlight(null);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerleave', onPointerLeave);

  return {
    requestDraw: () => {
      dirty = true;
    },
    seatAt,
    highlight,
    showsHover: (seat) => hovered === seat,
    dispose: () => {
      cancelAnimationFrame(frame);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      disposeResources();
    },
  };
}

function createCanvas2dRenderer(options: RendererOptions): SeatRenderer {
  const { canvas, layout, grid, pan } = options;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('No 2D context');

  return createManualRenderer(options, (hovered) => {
    const { scaleX, scaleY } = grid.current;
    ctx.reset();
    ctx.scale(scaleX, scaleY);
    // One path for every seat: the usual way to keep this from being N fill calls.
    ctx.beginPath();
    for (let i = 0; i < layout.count; i++) {
      ctx.roundRect(layout.xs[i] + pan.x, layout.ys[i] + pan.y, SEAT_SIZE, SEAT_SIZE, SEAT_RADIUS);
    }
    ctx.fillStyle = cssColor(SEAT_RGB);
    ctx.fill();
    if (hovered !== null) {
      ctx.beginPath();
      ctx.roundRect(layout.xs[hovered] + pan.x, layout.ys[hovered] + pan.y, SEAT_SIZE, SEAT_SIZE, SEAT_RADIUS);
      ctx.fillStyle = cssColor(HOVER_RGB);
      ctx.fill();
    }
  });
}

const NO_INSTANCE = -1;

const VERTEX_SHADER = `#version 300 es
in vec2 a_corner;
in vec2 a_offset;
uniform vec2 u_pan;
uniform vec2 u_cssSize;
uniform int u_hovered;
out vec2 v_local;
flat out float v_hovered;
void main() {
  vec2 local = a_corner * ${SEAT_SIZE.toFixed(1)};
  vec2 clip = (a_offset + u_pan + local) / u_cssSize * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  v_local = local;
  v_hovered = gl_InstanceID == u_hovered ? 1.0 : 0.0;
}`;

const FRAGMENT_SHADER = `#version 300 es
precision mediump float;
in vec2 v_local;
flat in float v_hovered;
out vec4 color;
void main() {
  vec2 corner = abs(v_local - ${(SEAT_SIZE / 2).toFixed(1)}) - ${(SEAT_SIZE / 2 - SEAT_RADIUS).toFixed(1)};
  float distance = length(max(corner, 0.0)) - ${SEAT_RADIUS.toFixed(1)};
  float alpha = clamp(0.5 - distance / fwidth(distance), 0.0, 1.0);
  vec3 rgb = mix(${glslColor(SEAT_RGB)}, ${glslColor(HOVER_RGB)}, v_hovered);
  color = vec4(rgb * alpha, alpha);
}`;

function compileProgram(gl: WebGL2RenderingContext): WebGLProgram {
  const program = gl.createProgram();
  for (const [type, source] of [
    [gl.VERTEX_SHADER, VERTEX_SHADER],
    [gl.FRAGMENT_SHADER, FRAGMENT_SHADER],
  ] as const) {
    const shader = gl.createShader(type);
    if (!shader) throw new Error('Could not create shader');
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader) ?? 'Shader compile failed');
    }
    gl.attachShader(program, shader);
    gl.deleteShader(shader);
  }
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) ?? 'Program link failed');
  }
  return program;
}

/** One instanced draw call: seat positions live in a buffer, hover is one uniform. */
function createWebglRenderer(options: RendererOptions): SeatRenderer {
  const { canvas, layout, grid, pan } = options;
  const gl = canvas.getContext('webgl2', { antialias: false, premultipliedAlpha: true });
  if (!gl) throw new Error('No WebGL2 context');

  const program = compileProgram(gl);
  gl.useProgram(program);
  const vertexArray = gl.createVertexArray();
  gl.bindVertexArray(vertexArray);

  const cornerBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cornerBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), gl.STATIC_DRAW);
  const cornerLocation = gl.getAttribLocation(program, 'a_corner');
  gl.enableVertexAttribArray(cornerLocation);
  gl.vertexAttribPointer(cornerLocation, 2, gl.FLOAT, false, 0, 0);

  const offsets = new Float32Array(layout.count * 2);
  for (let i = 0; i < layout.count; i++) {
    offsets[i * 2] = layout.xs[i];
    offsets[i * 2 + 1] = layout.ys[i];
  }
  const offsetBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, offsetBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, offsets, gl.STATIC_DRAW);
  const offsetLocation = gl.getAttribLocation(program, 'a_offset');
  gl.enableVertexAttribArray(offsetLocation);
  gl.vertexAttribPointer(offsetLocation, 2, gl.FLOAT, false, 0, 0);
  gl.vertexAttribDivisor(offsetLocation, 1);

  const panLocation = gl.getUniformLocation(program, 'u_pan');
  const cssSizeLocation = gl.getUniformLocation(program, 'u_cssSize');
  const hoveredLocation = gl.getUniformLocation(program, 'u_hovered');
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);

  return createManualRenderer(
    options,
    (hovered) => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(panLocation, pan.x, pan.y);
      gl.uniform2f(cssSizeLocation, grid.current.cssWidth, grid.current.cssHeight);
      gl.uniform1i(hoveredLocation, hovered ?? NO_INSTANCE);
      gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, layout.count);
    },
    () => {
      gl.deleteBuffer(cornerBuffer);
      gl.deleteBuffer(offsetBuffer);
      gl.deleteVertexArray(vertexArray);
      gl.deleteProgram(program);
    },
  );
}

export type RenderingModeId = 'drawable' | 'canvas2d' | 'webgl';

type RenderingMode = {
  label: string;
  needsHtmlInCanvas: boolean;
  /** The larger counts show where each mode finally misses frames. A drawable run at them would not finish. */
  counts: readonly number[];
  create: (options: RendererOptions) => SeatRenderer;
};

const DRAWABLE_COUNTS = [0, 1_000, 10_000, 50_000];
const COMPARISON_COUNTS = [...DRAWABLE_COUNTS, 200_000, 1_000_000];

export const RENDERING_MODES: Record<RenderingModeId, RenderingMode> = {
  drawable: { label: 'drawable', needsHtmlInCanvas: true, counts: DRAWABLE_COUNTS, create: createDrawableRenderer },
  canvas2d: {
    label: '純 Canvas 2D',
    needsHtmlInCanvas: false,
    counts: COMPARISON_COUNTS,
    create: createCanvas2dRenderer,
  },
  webgl: {
    label: 'WebGL2 instancing',
    needsHtmlInCanvas: false,
    counts: COMPARISON_COUNTS,
    create: createWebglRenderer,
  },
};

export const RENDERING_MODE_IDS = Object.keys(RENDERING_MODES) as RenderingModeId[];
