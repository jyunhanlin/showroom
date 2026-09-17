import { random } from 'lodash-es';
import { useLayoutEffect, useRef, useState } from 'react';

const BACKGROUND = 'hsl(210deg 15% 6%)';

// Josh's playground always puts the top cat on the left and the bottom cat on the right.
// The other two arrangements are demo controls, to show the edge cases the page talks about.
type Arrangement = 'spread' | 'aligned' | 'flipped';

const ARRANGEMENTS: { value: Arrangement; label: string }[] = [
  { value: 'spread', label: 'Spread' },
  { value: 'aligned', label: 'Aligned' },
  { value: 'flipped', label: 'Flipped' },
];

function getCatOffsets(arrangement: Arrangement): [top: number, bottom: number] {
  if (arrangement === 'aligned') {
    const left = random(0, 60);
    return [left, left];
  }
  if (arrangement === 'flipped') {
    return [random(30, 60), random(0, 30)];
  }
  return [random(0, 30), random(30, 60)];
}

// The course serves two doctored cat photos. We draw self-contained SVG doodles instead,
// in the same 200×200 box, so the layout math is identical.
function CatPlaceholder({ variant }: { variant: 'punk' | 'fancy' }) {
  const isPunk = variant === 'punk';
  return (
    <svg
      viewBox="0 0 100 100"
      className="block h-full w-full"
      style={{
        background: isPunk
          ? 'linear-gradient(135deg, hsl(330deg 80% 62%), hsl(270deg 65% 42%))'
          : 'linear-gradient(135deg, hsl(190deg 55% 45%), hsl(220deg 50% 25%))',
      }}
    >
      <title>
        {isPunk
          ? 'Placeholder for the hairless punk cat: mohawk and ear piercings'
          : 'Placeholder for the dapper gentleman cat: top hat, monocle and moustache'}
      </title>
      {isPunk && <path d="M 38,42 L 41,22 L 45,38 L 50,16 L 55,38 L 59,22 L 62,42 Z" fill="hsl(150deg 90% 55%)" />}
      <g fill={isPunk ? 'hsl(20deg 45% 82%)' : 'hsl(210deg 10% 68%)'}>
        <path d="M 25,52 L 29,24 L 45,40 Z" />
        <path d="M 75,52 L 71,24 L 55,40 Z" />
        <ellipse cx="50" cy="60" rx="28" ry="24" />
      </g>
      <circle cx="40" cy="57" r="3" fill="hsl(210deg 20% 12%)" />
      <circle cx="60" cy="57" r="3" fill="hsl(210deg 20% 12%)" />
      <path d="M 47,65 L 53,65 L 50,68 Z" fill="hsl(345deg 70% 65%)" />
      {isPunk ? (
        <g fill="none" stroke="hsl(50deg 100% 60%)" strokeWidth="1.5">
          <circle cx="31" cy="44" r="2.5" />
          <circle cx="69" cy="44" r="2.5" />
          <circle cx="72" cy="40" r="2" />
        </g>
      ) : (
        <>
          <rect x="31" y="35" width="38" height="4" rx="1" fill="hsl(210deg 20% 10%)" />
          <rect x="38" y="12" width="24" height="24" fill="hsl(210deg 20% 10%)" />
          <rect x="38" y="30" width="24" height="4" fill="hsl(0deg 70% 50%)" />
          <circle cx="60" cy="57" r="7" fill="none" stroke="hsl(45deg 90% 60%)" strokeWidth="1.5" />
          <path d="M 67,58 Q 73,70 66,82" fill="none" stroke="hsl(45deg 90% 60%)" strokeWidth="0.8" />
          <path
            d="M 50,70 C 45,67 38,68 33,73 C 39,72 45,74 50,71.5 C 55,74 61,72 67,73 C 62,68 55,67 50,70 Z"
            fill="hsl(210deg 20% 12%)"
          />
        </>
      )}
    </svg>
  );
}

function Controls({
  arrangement,
  onArrangementChange,
  onShuffle,
  showOutline,
  onShowOutlineChange,
}: {
  arrangement: Arrangement;
  onArrangementChange: (arrangement: Arrangement) => void;
  onShuffle: () => void;
  showOutline: boolean;
  onShowOutlineChange: (showOutline: boolean) => void;
}) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-xs">
      <div className="flex overflow-hidden rounded-md border border-gray-300">
        {ARRANGEMENTS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            aria-pressed={arrangement === value}
            onClick={() => onArrangementChange(value)}
            className={`px-2.5 py-1 ${arrangement === value ? 'bg-gray-800 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
          >
            {label}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onShuffle}
        className="rounded-md border border-gray-300 bg-white px-2.5 py-1 text-gray-700 hover:bg-gray-100"
      >
        Shuffle
      </button>
      <label className="flex items-center gap-1.5 text-gray-700">
        <input type="checkbox" checked={showOutline} onChange={(event) => onShowOutlineChange(event.target.checked)} />
        Show SVG box
      </label>
    </div>
  );
}

const COURSE_STYLES = `
  .cp-course-bridge {
    height: 128px;
    fill: none;
    /* SVGs clip at their box. Half of a stroke on the edge sits outside it (at 1px wide, nearly all of it). */
    overflow: visible;
  }
  .cp-course-bridge path {
    stroke: white;
    stroke-width: 2px;
    stroke-dasharray: 5px 8px;
    stroke-linecap: round;
    /* Stroke width and dash lengths are measured in screen pixels, not in stretched viewBox units. */
    vector-effect: non-scaling-stroke;
  }
  .cp-course-outline {
    outline: 1px solid hsl(50deg 100% 60%);
  }
`;

export function ConnectedPathsCourse() {
  const imagesRef = useRef<HTMLDivElement>(null);
  const topImageRef = useRef<HTMLDivElement>(null);
  const bottomImageRef = useRef<HTMLDivElement>(null);
  const bridgeSvgRef = useRef<SVGSVGElement>(null);
  // A new object on every click re-runs the layout effect, even for the same arrangement (Shuffle).
  const [layoutRequest, setLayoutRequest] = useState<{ arrangement: Arrangement }>({ arrangement: 'spread' });
  const [showOutline, setShowOutline] = useState(false);

  // Layout effect, not a plain effect: we measure layout and write styles, and we want
  // that done before the first paint, so the path never flashes in the wrong place.
  useLayoutEffect(() => {
    const images = imagesRef.current;
    const topImage = topImageRef.current;
    const bottomImage = bottomImageRef.current;
    const bridgeSvg = bridgeSvgRef.current;
    if (!images || !topImage || !bottomImage || !bridgeSvg) return;

    const connectImages = () => {
      const imagesBB = images.getBoundingClientRect();
      const topBB = topImage.getBoundingClientRect();
      const bottomBB = bottomImage.getBoundingClientRect();

      // Slide the SVG right so it starts at the horizontal center of the top image.
      // Josh's playground sits at the viewport's left edge. Ours sits inside a DemoFrame,
      // so we subtract the container's left to turn viewport pixels into container pixels.
      bridgeSvg.style.transform = `translateX(${topBB.left - imagesBB.left + topBB.width / 2}px)`;
      // Stretch it to the center of the bottom image. Both images have the same width,
      // so the delta between their left edges equals the delta between their centers.
      // Aligned images give a delta of 0, and the browser skips painting a 0px box: floor it at 1px.
      bridgeSvg.style.width = Math.max(1, bottomBB.left - topBB.left) + 'px';
    };

    const init = () => {
      const [topLeft, bottomLeft] = getCatOffsets(layoutRequest.arrangement);
      topImage.style.left = topLeft + '%';
      bottomImage.style.left = bottomLeft + '%';

      connectImages();
    };

    // Josh listens to `window` resize. Inside a page, the container can change width
    // without a window resize (a scrollbar appears, a sidebar opens), so we watch the
    // container itself. It still fires on every window resize.
    const resizeObserver = new ResizeObserver(connectImages);
    resizeObserver.observe(images);

    init();

    return () => resizeObserver.disconnect();
  }, [layoutRequest]);

  return (
    <div>
      <style>{COURSE_STYLES}</style>
      <div className="overflow-hidden rounded-md px-4 py-6" style={{ background: BACKGROUND }}>
        <div ref={imagesRef} className="flex flex-col gap-2">
          <div ref={topImageRef} className="relative aspect-square w-[200px]">
            <CatPlaceholder variant="punk" />
          </div>
          {/* preserveAspectRatio="none" lets the 100×100 viewBox squash to any width at 128px tall. */}
          <svg
            ref={bridgeSvgRef}
            className={`cp-course-bridge ${showOutline ? 'cp-course-outline' : ''}`}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* x of each control point = x of its end point, so a narrow box gives a straight line. */}
            <path d="M 0,0 C 0,50 100,50 100,100" />
          </svg>
          <div ref={bottomImageRef} className="relative aspect-square w-[200px]">
            <CatPlaceholder variant="fancy" />
          </div>
        </div>
      </div>
      <Controls
        arrangement={layoutRequest.arrangement}
        onArrangementChange={(arrangement) => setLayoutRequest({ arrangement })}
        onShuffle={() => setLayoutRequest({ arrangement: layoutRequest.arrangement })}
        showOutline={showOutline}
        onShowOutlineChange={setShowOutline}
      />
    </div>
  );
}

const ALTERNATIVE_STYLES = `
  .cp-alternative-bridge {
    width: 100%;
    height: 128px;
    fill: none;
    overflow: visible;
  }
  .cp-alternative-bridge path {
    stroke: white;
    stroke-width: 2px;
    stroke-dasharray: 5px 8px;
    stroke-linecap: round;
  }
  .cp-alternative-outline {
    outline: 1px solid hsl(50deg 100% 60%);
  }
`;

export function ConnectedPathsAlternative() {
  const topImageRef = useRef<HTMLDivElement>(null);
  const bottomImageRef = useRef<HTMLDivElement>(null);
  const bridgeSvgRef = useRef<SVGSVGElement>(null);
  // A new object on every click re-runs the layout effect, even for the same arrangement (Shuffle).
  const [layoutRequest, setLayoutRequest] = useState<{ arrangement: Arrangement }>({ arrangement: 'spread' });
  const [showOutline, setShowOutline] = useState(false);

  useLayoutEffect(() => {
    const topImage = topImageRef.current;
    const bottomImage = bottomImageRef.current;
    const bridgeSvg = bridgeSvgRef.current;
    if (!topImage || !bottomImage || !bridgeSvg) return;

    const connectImages = () => {
      const topBB = topImage.getBoundingClientRect();
      const bottomBB = bottomImage.getBoundingClientRect();
      const bridgeBB = bridgeSvg.getBoundingClientRect();
      const path = bridgeSvg.querySelector('path')!;

      // The SVG is full-width and has no viewBox, so 1 SVG unit = 1px from its left edge.
      // Josh uses `topBB.left` as-is because his SVG starts at the viewport's left edge;
      // ours does not, so we subtract `bridgeBB.left`.
      const startPoint = {
        x: topBB.left - bridgeBB.left + topBB.width / 2,
        y: 0,
      };
      const endPoint = {
        x: bottomBB.left - bridgeBB.left + bottomBB.width / 2,
        y: bridgeBB.height,
      };
      // Control point 1 sits straight below the start, control point 2 straight above the end.
      // When start.x === end.x, all four points share one x and the curve is a vertical line.
      const controlPoint1 = {
        x: startPoint.x,
        y: bridgeBB.height * 0.5,
      };
      const controlPoint2 = {
        x: endPoint.x,
        y: bridgeBB.height * 0.5,
      };

      // Write the attribute directly instead of through React state: measuring needs a
      // committed layout, so state would cost a second render for every resize.
      const d = `
        M ${startPoint.x},${startPoint.y}
        C ${controlPoint1.x},${controlPoint1.y}
          ${controlPoint2.x},${controlPoint2.y}
          ${endPoint.x},${endPoint.y}
      `;
      path.setAttribute('d', d);
    };

    const init = () => {
      const [topLeft, bottomLeft] = getCatOffsets(layoutRequest.arrangement);
      topImage.style.left = topLeft + '%';
      bottomImage.style.left = bottomLeft + '%';

      connectImages();
    };

    // The SVG is width: 100%, so observing it catches every container resize.
    const resizeObserver = new ResizeObserver(connectImages);
    resizeObserver.observe(bridgeSvg);

    init();

    return () => resizeObserver.disconnect();
  }, [layoutRequest]);

  return (
    <div>
      <style>{ALTERNATIVE_STYLES}</style>
      <div className="overflow-hidden rounded-md px-4 py-6" style={{ background: BACKGROUND }}>
        <div className="flex flex-col gap-2">
          <div ref={topImageRef} className="relative aspect-square w-[200px]">
            <CatPlaceholder variant="punk" />
          </div>
          {/* No viewBox and no baked-in path: `d` is computed in pixels by connectImages. */}
          <svg
            ref={bridgeSvgRef}
            className={`cp-alternative-bridge ${showOutline ? 'cp-alternative-outline' : ''}`}
            aria-hidden="true"
          >
            <path />
          </svg>
          <div ref={bottomImageRef} className="relative aspect-square w-[200px]">
            <CatPlaceholder variant="fancy" />
          </div>
        </div>
      </div>
      <Controls
        arrangement={layoutRequest.arrangement}
        onArrangementChange={(arrangement) => setLayoutRequest({ arrangement })}
        onShuffle={() => setLayoutRequest({ arrangement: layoutRequest.arrangement })}
        showOutline={showOutline}
        onShowOutlineChange={setShowOutline}
      />
    </div>
  );
}
