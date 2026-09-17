import { useEffect, useRef } from 'react';
import { clampedNormalize } from '~/utils/canvas';

const AIR_RESISTANCE = 6;

const HEADING = 'Lorem Ipsum';
const PARAGRAPHS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam urna ante, scelerisque sit amet est at, pharetra ullamcorper orci.',
  'Phasellus finibus risus lectus, in vestibulum purus posuere non.',
];

type WordGeometry = {
  element: HTMLElement;
  velocity: { x: number; y: number };
  position: { x: number; y: number };
};

function renderWords(text: string) {
  return text.split(' ').map((word, index) => (
    <span key={index} className="wham-exploding-word">
      {word}{' '}
    </span>
  ));
}

export function ExplodingClicks() {
  const stageRef = useRef<HTMLDivElement>(null);
  const wordGeometriesRef = useRef<WordGeometry[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    // Scoped to this demo's stage instead of `document`, so a second demo on
    // the page (or any other `.word`) is never picked up.
    const wordElements = [...stage.querySelectorAll<HTMLElement>('.wham-exploding-word')];
    const wordGeometries: WordGeometry[] = [];

    wordElements.forEach((wordElem) => {
      wordGeometries.push({
        element: wordElem,
        velocity: { x: 0, y: 0 },
        position: { x: 0, y: 0 },
      });
    });
    wordGeometriesRef.current = wordGeometries;

    let lastTimestamp = performance.now();
    let rafId = 0;

    function handleClick(ev: MouseEvent) {
      // Measure everything relative to the stage. Both rects are read at click
      // time, so page scroll and reflow (resize) never go stale.
      const stageBox = stage!.getBoundingClientRect();
      const clickX = ev.clientX - stageBox.left;
      const clickY = ev.clientY - stageBox.top;

      wordGeometries.forEach(({ element, velocity }) => {
        // `getBoundingClientRect` includes the current `translate`, so this is
        // where the word is right now, not its original layout slot.
        const bb = element.getBoundingClientRect();
        const centerX = bb.left - stageBox.left + bb.width / 2;
        const centerY = bb.top - stageBox.top + bb.height / 2;

        const deltaX = centerX - clickX;
        const deltaY = centerY - clickY;

        const angle = Math.atan2(deltaY, deltaX);
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

        // 500px/s when right next to the click, fading to 0 at 200px+.
        const speed = clampedNormalize(distance, 0, 200, 500, 0);

        // `+=` so rapid clicks stack on top of the current velocity.
        velocity.x += Math.cos(angle) * speed;
        velocity.y += Math.sin(angle) * speed;
      });
    }

    function update() {
      const now = performance.now();
      const deltaTime = Math.min(now - lastTimestamp, 250) / 1000;
      lastTimestamp = now;

      wordGeometries.forEach(({ element, velocity, position }) => {
        const drag = Math.exp(-AIR_RESISTANCE * deltaTime);
        velocity.x *= drag;
        velocity.y *= drag;

        position.x += velocity.x * deltaTime;
        position.y += velocity.y * deltaTime;

        element.style.transform = `translate(${position.x}px, ${position.y}px)`;
      });

      rafId = requestAnimationFrame(update);
    }

    stage.addEventListener('click', handleClick);
    update();

    return () => {
      cancelAnimationFrame(rafId);
      stage.removeEventListener('click', handleClick);
      wordGeometriesRef.current = [];
    };
  }, []);

  function handleReset() {
    // Not in Josh's solution. Zero the state; the running loop writes the
    // `translate(0px, 0px)` on the next frame.
    wordGeometriesRef.current.forEach(({ velocity, position }) => {
      velocity.x = 0;
      velocity.y = 0;
      position.x = 0;
      position.y = 0;
    });
  }

  return (
    <div>
      <style>{`
        .wham-exploding-word {
          display: inline-block;
          margin-right: 0.25em;
        }
      `}</style>
      <div
        ref={stageRef}
        className="min-h-[300px] overflow-hidden rounded-md px-8 pt-4 pb-8 text-white select-none"
        style={{ background: 'hsl(210deg 15% 6%)', colorScheme: 'dark' }}
      >
        <div className="mb-[1em] text-[2rem] leading-tight font-bold">{renderWords(HEADING)}</div>
        {PARAGRAPHS.map((paragraph, index) => (
          <p key={index} className="mb-[1.5em]">
            {renderWords(paragraph)}
          </p>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="text-sm text-gray-500">Click inside the dark box. Click again to boost.</span>
        <button
          type="button"
          onClick={handleReset}
          className="cursor-pointer rounded-md bg-slate-200 px-3 py-1.5 text-sm font-medium text-slate-900 hover:bg-slate-100"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
