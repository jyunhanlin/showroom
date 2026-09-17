import { range } from 'lodash-es';
import { useId, useRef, useState, type RefObject } from 'react';

const NUM_OF_SUN_DOTS = 8;
const BACKGROUND = 'hsl(210deg 15% 6%)';
const SLOW_MOTION_RATE = 0.25;

// Josh's styles.css + the <style> block from index.html, merged into one string.
// Deviations: every class gets an `smt-` prefix, and `--smooth` / `--spring` live on
// `.smt-toggle` instead of `html`, so the tokens do not leak into the rest of the site.
const STYLES = `
.smt-toggle {
  --smooth: cubic-bezier(0.2, 0.8, 0, 1);
  --spring: linear(0, 0.031 1.4%, 0.136 3.1%, 0.711 9.2%, 0.933 12.1%, 1.073 15%, 1.115 16.5%, 1.138 18%, 1.146 19.7%, 1.137 21.6%, 1.015 31.2%, 0.992 34.2%, 0.98 37.4%, 1.003 56.6%, 1);
  position: relative;
  margin: 0;
  padding: 0;
  border: 1px solid hsl(210deg 15% 25%);
  border-radius: 2px;
  background: transparent;

  input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    appearance: none;
    cursor: pointer;
  }
  svg {
    width: 64px;
    height: 64px;
  }
}

.smt-sun-moon-svg {
  fill: white;
  transform: rotate(0deg);

  .smt-sun-moon-shapeshifter {
    cx: 16px;
    cy: 16px;
    r: 10px;
  }
  .smt-moon-cutout-circle {
    cy: 8px;
    cx: 22px;
    r: 10px;
  }

  .smt-sun-dot {
    --angle: calc(var(--index) * 45deg);
    cx: 16px;
    cy: 16px;
    r: 2px;
    fill: transparent;
    transform: translate(0px, 0px);
  }

  /* checked = light (sun) */
  .smt-toggle:has(input:checked) & {
    transform: rotate(90deg);

    .smt-sun-moon-shapeshifter {
      r: 8px;
    }
    /* Local cy change; the rotate(90deg) above makes it read as sideways on screen. */
    .smt-moon-cutout-circle {
      cy: -8px;
    }

    .smt-sun-dot {
      --distance: 12px;
      fill: white;
      transform-origin: 16px 16px;
      transform: translate(
        calc(cos(var(--angle)) * var(--distance)),
        calc(sin(var(--angle)) * var(--distance))
      );
    }
  }
}

@media (prefers-reduced-motion: no-preference) {
  .smt-sun-moon-svg {
    transition: transform 1200ms var(--smooth);

    .smt-sun-moon-shapeshifter {
      transition: r 900ms var(--smooth);
    }
    .smt-moon-cutout-circle {
      transition: cy 1200ms var(--smooth);
    }

    /* Used when leaving the sun state: 250ms, no delay. */
    .smt-sun-dot {
      transition: transform 250ms, fill 250ms;
    }

    /* Used when entering the sun state: spring + 80ms per index. */
    .smt-toggle:has(input:checked) & .smt-sun-dot {
      --delay: calc(var(--index) * 80ms);
      transition:
        transform 1200ms var(--spring) var(--delay),
        fill 250ms var(--delay);
    }
  }
}

/* ---- X-ray demo only (not part of Josh's solution) ---- */
.smt-toggle.smt-xray svg {
  width: 160px;
  height: 160px;
  overflow: visible;
}
.smt-xray .smt-cutout-outline {
  fill: none;
  stroke: hsl(350deg 90% 65%);
  stroke-width: 0.5px;
  stroke-dasharray: 1.5 1;
}
.smt-sun-moon-svg {
  .smt-toggle[data-rotate='false']:has(input:checked) & {
    transform: rotate(0deg);
  }
}
`;

type SunMoonSvgProps = {
  maskId: string;
  showCutout?: boolean;
  svgRef?: RefObject<SVGSVGElement | null>;
};

function SunMoonSvg({ maskId, showCutout = false, svgRef }: SunMoonSvgProps) {
  return (
    <svg ref={svgRef} viewBox="0 0 32 32" aria-hidden="true" className="smt-sun-moon-svg">
      {/* rect = keep (inherits fill: white from the svg), black circle = bite */}
      <mask id={maskId}>
        <rect x="0" y="0" width="32" height="32" />
        <circle className="smt-moon-cutout-circle" fill="black" />
      </mask>

      {/* shapeshifter: crescent in dark state, sun disc in light state */}
      <circle className="smt-sun-moon-shapeshifter" mask={`url(#${maskId})`} />

      {/* --index drives both the angle and the delay (no sibling-index() in Firefox) */}
      {range(NUM_OF_SUN_DOTS).map((index) => (
        <circle key={index} className="smt-sun-dot" style={{ '--index': index } as React.CSSProperties} />
      ))}

      {/* X-ray only: a visible copy of the mask cutout, driven by the same CSS rules. */}
      {showCutout && <circle className="smt-moon-cutout-circle smt-cutout-outline" />}
    </svg>
  );
}

export function SunMoonToggle() {
  const id = useId();
  const maskId = `${id}-moon-cutout`;

  return (
    <div className="grid h-48 place-content-center rounded-md" style={{ background: BACKGROUND }}>
      <style>{STYLES}</style>
      <label className="smt-toggle">
        <SunMoonSvg maskId={maskId} />
        <input type="checkbox" />
        <span className="sr-only">Toggle light/dark mode</span>
      </label>
    </div>
  );
}

export function SunMoonToggleXRay() {
  const id = useId();
  const maskId = `${id}-moon-cutout`;
  const svgRef = useRef<SVGSVGElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [isSlowMotion, setIsSlowMotion] = useState(true);

  // Debug aid only. The toggle still animates with CSS transitions; this just slows
  // down the transitions that the checkbox change has just started.
  // `getAnimations()` flushes style first, so the new transitions already exist here.
  function handleToggle() {
    if (!isSlowMotion) return;
    svgRef.current?.getAnimations({ subtree: true }).forEach((animation) => {
      animation.playbackRate = SLOW_MOTION_RATE;
    });
  }

  return (
    <div className="flex flex-col gap-3">
      <style>{STYLES}</style>
      <div
        className="grid h-[360px] place-content-center overflow-hidden rounded-md"
        style={{ background: BACKGROUND }}
      >
        <label className="smt-toggle smt-xray" data-rotate={isRotating}>
          <SunMoonSvg maskId={maskId} showCutout svgRef={svgRef} />
          <input type="checkbox" onChange={handleToggle} />
          <span className="sr-only">Toggle light/dark mode</span>
        </label>
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={isRotating} onChange={(event) => setIsRotating(event.target.checked)} />
          rotate SVG 90°
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={isSlowMotion} onChange={(event) => setIsSlowMotion(event.target.checked)} />
          slow motion (×{SLOW_MOTION_RATE})
        </label>
        <span className="text-gray-500">紅色虛線 = mask 裡的 cutout circle；外框 = viewBox</span>
      </div>
    </div>
  );
}
