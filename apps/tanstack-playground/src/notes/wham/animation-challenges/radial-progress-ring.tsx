import { range } from 'lodash-es';
import { useState, type CSSProperties } from 'react';
import { convertPolarToCartesian, normalize } from '~/utils/canvas';

const VIEWBOX_WIDTH = 200;
const VIEWBOX_HEIGHT = 100;
const SEGMENT_LENGTH = 20;
const EMPTY_COLOR = 'hsl(210deg 10% 30%)';
const SCORE_COLOR = 'hsl(45deg 100% 50%)';
const BACKGROUND = 'hsl(210deg 15% 6%)';
const SCORE_OPTIONS = [25, 50, 75, 100];

// Josh's utils.js ships this helper, but ~/utils/canvas does not, so it lives here.
// Same as `normalize`, except the 0..1 progress is raised to `exponent` before scaling.
function exponentialNormalize(
  value: number,
  currentScaleMin: number,
  currentScaleMax: number,
  newScaleMin = 0,
  newScaleMax = 1,
  exponent = 2,
): number {
  const normalizedInput = (value - currentScaleMin) / (currentScaleMax - currentScaleMin);

  const exponentialOutput = Math.pow(normalizedInput, exponent);

  return newScaleMin + (newScaleMax - newScaleMin) * exponentialOutput;
}

function RadialProgressIndicator({ score }: { score: number }) {
  return (
    <div className="wham-rpr-wrapper">
      <svg className="wham-rpr-ring" viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}>
        {range(100).map((percentage) => {
          // One line per percentage point, fanned out from 180° to 360°.
          const angle = normalize(percentage, 0, 99, 180, 360);
          const startDistance = VIEWBOX_WIDTH / 2 - SEGMENT_LENGTH;
          const endDistance = VIEWBOX_WIDTH / 2;
          const startPoint = convertPolarToCartesian(angle, startDistance);
          const endPoint = convertPolarToCartesian(angle, endDistance);

          // Delays grow on a curve, and the whole curve stretches with `score`.
          const animationDelay = exponentialNormalize(percentage, 0, score, 100, score * 30, 2) + 100;

          // Polar coordinates orbit (0, 0), the top-left corner. Shift them to the
          // center of the bottom edge.
          return (
            <line
              key={percentage}
              data-is-filled={score > percentage}
              x1={VIEWBOX_WIDTH / 2 + startPoint.x}
              y1={VIEWBOX_HEIGHT + startPoint.y}
              x2={VIEWBOX_WIDTH / 2 + endPoint.x}
              y2={VIEWBOX_HEIGHT + endPoint.y}
              style={{ '--delay': animationDelay + 'ms' } as CSSProperties}
            />
          );
        })}
      </svg>
      <p className="wham-rpr-score">{score}</p>
      <p className="wham-rpr-label">Sleep Fitness Score</p>
    </div>
  );
}

export function RadialProgressRing() {
  const [score, setScore] = useState(75);
  // CSS animations only play on mount, so every click remounts the ring via `key`.
  const [playCount, setPlayCount] = useState(0);

  return (
    <div className="flex flex-col items-center gap-3">
      <style>{`
        @keyframes wham-rpr-fadeToYellow {
          to { stroke: ${SCORE_COLOR}; }
        }
        .wham-rpr-stage {
          width: 100%;
          padding: 2.5rem 1.5rem 4rem;
          border-radius: 0.375rem;
          background: ${BACKGROUND};
          color: white;
          color-scheme: dark;
        }
        .wham-rpr-wrapper {
          position: relative;
          max-width: 28rem;
          margin: 0 auto;
        }
        .wham-rpr-ring {
          display: block;
          width: 100%;
          fill: none;
          overflow: visible;
        }
        .wham-rpr-ring line {
          stroke-width: 0.75px;
          stroke-linecap: round;
          stroke: ${EMPTY_COLOR};
        }
        /*
          A 0ms animation flips the line at once. Each line waits for its
          own --delay, so the flips happen one after another.
        */
        .wham-rpr-ring line[data-is-filled='true'] {
          animation: wham-rpr-fadeToYellow 0ms forwards;
        }
        @media (prefers-reduced-motion: no-preference) {
          .wham-rpr-ring line[data-is-filled='true'] {
            animation-delay: var(--delay);
          }
        }
        .wham-rpr-score {
          position: absolute;
          width: fit-content;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          font-size: 5rem;
          line-height: 1em;
        }
        .wham-rpr-label {
          position: absolute;
          width: fit-content;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          transform: translateY(150%);
          text-transform: uppercase;
          text-align: center;
          letter-spacing: 0.125em;
          font-weight: 500;
        }
      `}</style>
      <div className="wham-rpr-stage">
        <RadialProgressIndicator key={playCount} score={score} />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-sm">
        <span className="text-gray-500">score</span>
        {SCORE_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={option === score}
            onClick={() => {
              setScore(option);
              setPlayCount((count) => count + 1);
            }}
            className={`rounded px-3 py-1 ${option === score ? 'bg-slate-800 text-white' : 'bg-slate-200 hover:bg-slate-300'}`}
          >
            {option}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setPlayCount((count) => count + 1)}
          className="rounded bg-slate-200 px-3 py-1 hover:bg-slate-300"
        >
          replay
        </button>
      </div>
    </div>
  );
}
