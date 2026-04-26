/**
 * Parallax landscape driven by `animation-timeline: scroll()`.
 *
 * Each layer reads a per-element `--from` CSS custom property; one shared
 * `@keyframes parallax { from { transform: translateY(var(--from)); } }`
 * lets the browser tween every layer to its resting position as the scroll
 * container progresses to the bottom. Wrapped behind
 * `prefers-reduced-motion: no-preference` — parallax is the textbook
 * vestibular trigger.
 */

const PARALLAX_CSS = `
  .parallax-scroller {
    position: relative;
    height: 320px;
    overflow-y: scroll;
    overflow-x: hidden;
    border-radius: 8px;
    background: #1e1b4b;
    scroll-timeline-name: --parallax-scroll;
    scroll-timeline-axis: block;
  }
  .parallax-stage {
    position: sticky;
    top: 0;
    height: 320px;
    width: 100%;
    overflow: hidden;
  }
  .parallax-track {
    height: 1200px;
    position: relative;
    background: linear-gradient(180deg, transparent 0%, transparent 70%, rgba(15, 23, 42, 0.6) 100%);
  }
  .parallax-hint {
    position: absolute;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 11px;
    letter-spacing: 0.04em;
    color: rgba(255, 255, 255, 0.75);
    background: rgba(15, 23, 42, 0.5);
    padding: 4px 10px;
    border-radius: 999px;
    z-index: 10;
    pointer-events: none;
  }
  .parallax-scroll-marker {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 10px;
    color: rgba(248, 250, 252, 0.5);
  }
  .parallax-layer {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  .parallax-layer svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
  }
  @media (prefers-reduced-motion: no-preference) {
    .parallax-layer {
      animation: parallax linear;
      animation-timeline: --parallax-scroll;
    }
  }
  @keyframes parallax {
    from {
      transform: translateY(var(--from));
    }
    to {
      transform: translateY(0);
    }
  }
`;

type LayerStyle = React.CSSProperties & { '--from': string };

export function ParallaxLandscape() {
  return (
    <>
      <style>{PARALLAX_CSS}</style>
      <div className="parallax-scroller">
        <div className="parallax-track">
          <div className="parallax-stage">
            <p className="parallax-hint">Scroll to see parallax layers</p>

            {/* 1. Sky — barely moves (gradient backdrop) */}
            <div className="parallax-layer" style={{ '--from': '0px' } as LayerStyle}>
              <svg viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="parallax-sky" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#fbcfe8" />
                    <stop offset="50%" stopColor="#f9a8d4" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="100" height="30" fill="url(#parallax-sky)" />
                {/* sun */}
                <circle cx="72" cy="12" r="4" fill="#fde68a" opacity="0.95" />
                <circle cx="72" cy="12" r="6" fill="#fde68a" opacity="0.25" />
              </svg>
            </div>

            {/* 2. Far clouds */}
            <div className="parallax-layer" style={{ '--from': '10px' } as LayerStyle}>
              <svg viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
                <g fill="#fdf2f8" opacity="0.6">
                  <ellipse cx="18" cy="8" rx="9" ry="2.2" />
                  <ellipse cx="55" cy="6" rx="11" ry="2" />
                  <ellipse cx="88" cy="10" rx="8" ry="2" />
                </g>
              </svg>
            </div>

            {/* 3. Near clouds */}
            <div className="parallax-layer" style={{ '--from': '16px' } as LayerStyle}>
              <svg viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
                <g fill="#fce7f3" opacity="0.85">
                  <ellipse cx="32" cy="14" rx="7" ry="1.8" />
                  <ellipse cx="32" cy="13" rx="4" ry="1.6" />
                  <ellipse cx="78" cy="16" rx="9" ry="2" />
                  <ellipse cx="78" cy="14.5" rx="5" ry="1.6" />
                </g>
              </svg>
            </div>

            {/* 4. Far mountains */}
            <div className="parallax-layer" style={{ '--from': '50px' } as LayerStyle}>
              <svg viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
                <polygon
                  points="0,30 0,22 8,18 16,21 24,16 34,20 44,15 54,19 64,17 74,21 84,16 94,20 100,18 100,30"
                  fill="#7c6aa3"
                  opacity="0.85"
                />
              </svg>
            </div>

            {/* 5. Mid mountains */}
            <div className="parallax-layer" style={{ '--from': '70px' } as LayerStyle}>
              <svg viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
                <polygon
                  points="0,30 0,25 6,22 14,26 22,20 30,24 40,19 50,23 58,21 68,25 78,20 88,24 96,21 100,23 100,30"
                  fill="#4c3f72"
                />
              </svg>
            </div>

            {/* 6. Foreground hills + trees */}
            <div className="parallax-layer" style={{ '--from': '130px' } as LayerStyle}>
              <svg viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
                {/* hill silhouette */}
                <polygon points="0,30 0,27 10,25 22,27 36,24 50,26 64,25 78,27 92,25 100,26 100,30" fill="#1e1b3a" />
                {/* chunky pixel-art trees */}
                <g fill="#0f172a">
                  <polygon points="6,27 9,22 12,27" />
                  <rect x="8.2" y="26.5" width="1.5" height="2" />
                  <polygon points="20,27 23,21 26,27" />
                  <rect x="22.2" y="26.5" width="1.5" height="2" />
                  <polygon points="42,27 46,20 50,27" />
                  <rect x="45.2" y="26.5" width="1.5" height="2" />
                  <polygon points="60,27 63,22 66,27" />
                  <rect x="62.2" y="26.5" width="1.5" height="2" />
                  <polygon points="74,27 78,20 82,27" />
                  <rect x="77.2" y="26.5" width="1.5" height="2" />
                  <polygon points="90,27 93,22 96,27" />
                  <rect x="92.2" y="26.5" width="1.5" height="2" />
                </g>
              </svg>
            </div>
          </div>
          <p className="parallax-scroll-marker">— end —</p>
        </div>
      </div>
    </>
  );
}
