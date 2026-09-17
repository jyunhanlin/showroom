import { useEffect, useRef } from 'react';
import { setupCanvas } from '~/utils/canvas';

const CELL_SIZE = 20;
const TICK_INTERVAL = 100;

type CellState = 'alive' | 'dead';

// Deviation: Josh starts with an empty board. An empty white box looks broken inside a note, so we
// seed three classic patterns. Readers can still click them away and paint their own.
const INITIAL_CELLS = [
  // Glider: flies toward the bottom-right corner, then keeps going off-canvas.
  '2,1',
  '3,2',
  '1,3',
  '2,3',
  '3,3',
  // Blinker: period-2 oscillator.
  '12,4',
  '13,4',
  '14,4',
  // Toad: period-2 oscillator.
  '3,12',
  '4,12',
  '5,12',
  '2,13',
  '3,13',
  '4,13',
];

function getCellKey(column: number, row: number) {
  return `${column},${row}`;
}

function parseCellKey(cellKey: string) {
  const [column, row] = cellKey.split(',').map(Number);
  return { column, row };
}

export function ConwaysGameOfLife() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const trigger = triggerRef.current;
    if (!canvas || !trigger) return;

    const { ctx, dimensions: canvasDimensions, disposeResize } = setupCanvas(canvas);

    // Each alive cell is collected in this set, stored as a "column,row" string.
    // Eg: Set("1,2", "3,4", "5,5", "24,10")
    let aliveCells = new Set<string>(INITIAL_CELLS);

    let isRunning = false;
    let lastTickAt: number | null = null;
    let isDragging = false;
    // One click-and-drag applies the same state to every cell it touches. It never flips each cell
    // based on its own state.
    let dragTargetState: CellState | null = null;
    let rafId = 0;

    function computeNextGeneration(currentAliveCells: Set<string>) {
      // Only live cells and their neighbours can be alive next tick, so we count neighbours for
      // those spots instead of scanning the whole grid.
      const neighbourCounts: Record<string, number> = {};

      currentAliveCells.forEach((cellKey) => {
        const { column, row } = parseCellKey(cellKey);

        [-1, 0, 1].forEach((columnOffset) => {
          [-1, 0, 1].forEach((rowOffset) => {
            // Skip the middle of the 3x3 block: that is the cell itself.
            if (columnOffset === 0 && rowOffset === 0) {
              return;
            }

            const neighbourKey = getCellKey(column + columnOffset, row + rowOffset);

            if (!neighbourCounts[neighbourKey]) {
              neighbourCounts[neighbourKey] = 0;
            }
            neighbourCounts[neighbourKey] += 1;
          });
        });
      });

      // Reassign, don't clear: `currentAliveCells` still points at the old generation.
      aliveCells = new Set();
      Object.entries(neighbourCounts).forEach(([cellKey, neighbourCount]) => {
        const wasAlive = currentAliveCells.has(cellKey);
        const becomesAlive = neighbourCount === 3 || (wasAlive && neighbourCount === 2);

        if (becomesAlive) {
          aliveCells.add(cellKey);
        }
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);

      if (isRunning) {
        const now = performance.now();
        const shouldComputeNextGeneration = lastTickAt === null || now - lastTickAt >= TICK_INTERVAL;

        if (shouldComputeNextGeneration) {
          computeNextGeneration(aliveCells);

          lastTickAt = now;
        }
      }

      // Draw every live cell as a filled square.
      ctx.fillStyle = 'black';
      for (const cellKey of aliveCells) {
        const { column, row } = parseCellKey(cellKey);
        ctx.fillRect(column * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }

      rafId = requestAnimationFrame(draw);
    }

    draw();

    function getCellAtPointer(ev: PointerEvent) {
      const bb = canvas!.getBoundingClientRect();

      // Deviation: Josh's canvas fills the window, so `ev.clientX / CELL_SIZE` works there. In a
      // note the canvas sits mid-page, so we subtract its top-left offset first.
      const column = Math.floor((ev.clientX - bb.left) / CELL_SIZE);
      const row = Math.floor((ev.clientY - bb.top) / CELL_SIZE);

      return {
        column,
        row,
        cellKey: getCellKey(column, row),
      };
    }

    function setCellState(column: number, row: number, targetState: CellState) {
      const cellKey = getCellKey(column, row);

      if (targetState === 'alive') {
        aliveCells.add(cellKey);
      } else {
        aliveCells.delete(cellKey);
      }
    }

    function handlePointerDown(ev: PointerEvent) {
      const { column, row, cellKey } = getCellAtPointer(ev);

      isDragging = true;

      const isAlive = aliveCells.has(cellKey);

      dragTargetState = isAlive ? 'dead' : 'alive';
      setCellState(column, row, dragTargetState);
    }

    function handlePointerMove(ev: PointerEvent) {
      if (!isDragging || dragTargetState === null) {
        return;
      }

      const { column, row } = getCellAtPointer(ev);

      setCellState(column, row, dragTargetState);
    }

    function endDrag() {
      if (!isDragging) {
        return;
      }

      isDragging = false;
      dragTargetState = null;
    }

    function handleTriggerClick() {
      isRunning = !isRunning;
    }

    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', endDrag);
    canvas.addEventListener('pointercancel', endDrag);
    // Deviation: Josh has no `pointerleave`. His canvas is the whole window; here a drag can leave
    // the canvas and release outside, which would leave `isDragging` stuck on.
    canvas.addEventListener('pointerleave', endDrag);
    trigger.addEventListener('click', handleTriggerClick);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', endDrag);
      canvas.removeEventListener('pointercancel', endDrag);
      canvas.removeEventListener('pointerleave', endDrag);
      // Without this, Strict Mode registers two click handlers and each click toggles twice.
      trigger.removeEventListener('click', handleTriggerClick);
      disposeResize();
    };
  }, []);

  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-md border border-slate-200 bg-white">
      {/* touch-none: without it, a touch drag scrolls the page and fires pointercancel. */}
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full touch-none" />
      <button
        ref={triggerRef}
        type="button"
        className="absolute inset-x-0 bottom-4 mx-auto w-fit rounded border border-slate-300 bg-white px-8 py-2 text-sm text-slate-800 shadow-sm hover:bg-slate-50"
      >
        Start / Pause
      </button>
    </div>
  );
}
