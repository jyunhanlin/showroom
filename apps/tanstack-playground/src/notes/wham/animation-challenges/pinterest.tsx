import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ComponentType,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from 'react';

// Josh's playground uses course-hosted photos. We don't hotlink course assets, so each "photo"
// is a small inline SVG illustration of a similar scene, fed to a plain <img> through a data URI.
// Keeping a real <img> keeps the `alt` + `draggable={false}` part of the solution intact.
function toDataUri(svg: string) {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const CHAIR_SRC = toDataUri(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600">
    <rect width="400" height="600" fill="#e7e5e1"/>
    <rect y="455" width="400" height="145" fill="#a67c52"/>
    <path d="M0 490H400M0 530H400M0 570H400" stroke="#8c6340" stroke-width="3"/>
    <rect x="205" y="120" width="120" height="150" fill="#f4f1ec" stroke="#1d1d1f" stroke-width="8"/>
    <circle cx="265" cy="200" r="22" fill="#1d1d1f"/>
    <path d="M85 470V140q0-22 26-22h32" stroke="#b8923f" stroke-width="5" fill="none"/>
    <path d="M132 104h30l12 40h-54z" fill="#b8923f"/>
    <path d="M168 468l-12 62M302 468l12 62" stroke="#1d1d1f" stroke-width="7" stroke-linecap="round"/>
    <rect x="150" y="330" width="170" height="120" rx="26" fill="#d9a520"/>
    <rect x="138" y="408" width="194" height="72" rx="22" fill="#e8b52c"/>
  </svg>`,
);

const COUCH_SRC = toDataUri(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600">
    <rect width="400" height="600" fill="#dde2e5"/>
    <rect width="44" height="470" fill="#b9bec2"/>
    <rect y="470" width="400" height="130" fill="#cdbfae"/>
    <rect x="90" y="140" width="100" height="130" fill="#f5f5f2" stroke="#b08d62" stroke-width="6"/>
    <rect x="230" y="140" width="100" height="130" fill="#f5f5f2" stroke="#b08d62" stroke-width="6"/>
    <path d="M140 245c18-35 8-55-6-68M280 180v70" stroke="#6b7b86" stroke-width="5" fill="none"/>
    <rect x="30" y="335" width="350" height="110" rx="24" fill="#c4c0b8"/>
    <rect x="20" y="400" width="370" height="80" rx="18" fill="#d3cfc7"/>
    <rect x="70" y="352" width="100" height="60" rx="16" fill="#e6e3dc"/>
    <rect x="240" y="352" width="100" height="60" rx="16" fill="#e6e3dc"/>
    <rect x="110" y="505" width="180" height="22" rx="6" fill="#8e633f"/>
    <path d="M132 527v50M268 527v50" stroke="#6f4a2d" stroke-width="8"/>
  </svg>`,
);

const LAMP_SRC = toDataUri(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600">
    <defs>
      <radialGradient id="glow" cx="0.5" cy="0.45" r="0.55">
        <stop offset="0" stop-color="#ff5a3c" stop-opacity="0.8"/>
        <stop offset="0.45" stop-color="#8a1f1a" stop-opacity="0.45"/>
        <stop offset="1" stop-color="#1a1416" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="400" height="600" fill="#1a1416"/>
    <rect width="400" height="600" fill="url(#glow)"/>
    <rect y="480" width="400" height="120" fill="#120d0f"/>
    <path d="M200 420V292" stroke="#5a1c18" stroke-width="6"/>
    <path d="M138 292a62 62 0 0 1 124 0z" fill="#d93a2b"/>
    <ellipse cx="200" cy="293" rx="62" ry="8" fill="#ffb199"/>
    <rect x="168" y="412" width="64" height="14" rx="4" fill="#5a1c18"/>
    <rect x="90" y="426" width="220" height="16" rx="4" fill="#2d2022"/>
    <path d="M110 442v60M290 442v60" stroke="#2d2022" stroke-width="8"/>
  </svg>`,
);

const WINDOW_SRC = toDataUri(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#9cc3e4"/>
        <stop offset="1" stop-color="#e3eef5"/>
      </linearGradient>
    </defs>
    <rect width="400" height="600" fill="#ece6dd"/>
    <rect x="60" y="80" width="280" height="380" fill="url(#sky)"/>
    <path d="M60 330l60-90 55 55 60-95 105 140v120H60z" fill="#8aa0b0"/>
    <path d="M60 360l70-110 50 60 70-120 90 150v120H60z" fill="#6f8494"/>
    <path d="M250 190l-17.5 30 12.5-6 11 8 12-2z" fill="#ffffff"/>
    <path d="M60 410l90-70 60 35 80-55 50 40v100H60z" fill="#4c6070"/>
    <rect x="60" y="80" width="280" height="380" fill="none" stroke="#3a3632" stroke-width="12"/>
    <path d="M200 80v380M60 270h280" stroke="#3a3632" stroke-width="8"/>
    <rect x="40" y="460" width="320" height="18" fill="#cfc6b8"/>
    <rect y="540" width="400" height="60" fill="#b99b7a"/>
    <path d="M330 535c-8-40-28-58-48-68M330 535c6-48 26-68 46-78" stroke="#5c7a4a" stroke-width="6" fill="none"/>
    <rect x="310" y="520" width="40" height="42" rx="4" fill="#d7cbbb"/>
  </svg>`,
);

// `lucide-react` isn't installed here. These are the Lucide Pin / Upload / Search paths Josh
// pasted into the vanilla starter, wrapped so the call site still reads `<Icon size={24} />`.
type IconProps = { size?: number };

function LucideIcon({ size = 24, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function Pin(props: IconProps) {
  return (
    <LucideIcon {...props}>
      <path d="M12 17v5" />
      <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
    </LucideIcon>
  );
}

function Upload(props: IconProps) {
  return (
    <LucideIcon {...props}>
      <path d="M12 3v12" />
      <path d="m17 8-5-5-5 5" />
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    </LucideIcon>
  );
}

function Search(props: IconProps) {
  return (
    <LucideIcon {...props}>
      <path d="m21 21-4.34-4.34" />
      <circle cx="11" cy="11" r="8" />
    </LucideIcon>
  );
}

// Josh's App.module.css + TappablePhoto.module.css, flattened: his nested
// `.wrapper[data-is-highlighted='true'] & { ... }` rules become plain descendant selectors.
// The layering only works because nothing above the DemoFrame creates a stacking context or
// is positioned: the backdrop (fixed) and the menu (absolute) both resolve against the page.
const STYLES = `
  .wham-pin-app {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    gap: 24px;
    padding: 48px 16px;
    border-radius: 6px;
    background: hsl(210deg 15% 80%);
    color: white;
  }

  .wham-pin-wrapper {
    width: 140px;
  }

  .wham-pin-btn {
    position: relative;
    z-index: 1;
    display: block;
    width: 100%;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
  }
  .wham-pin-wrapper[data-is-highlighted='true'] .wham-pin-btn {
    z-index: 3;
  }
  .wham-pin-btn img {
    display: block;
    width: 100%;
    border-radius: 16px;
  }
  @media (prefers-reduced-motion: no-preference) {
    .wham-pin-btn img {
      transition: transform 300ms;
    }
  }
  .wham-pin-wrapper[data-is-highlighted='true'] .wham-pin-btn img {
    transform: rotate(10deg);
  }

  .wham-pin-backdrop {
    position: fixed;
    z-index: 2;
    inset: 0;
    background: hsl(210deg 15% 6%);
    opacity: 0;
    pointer-events: none;
    transition: opacity 400ms;
  }
  .wham-pin-wrapper[data-is-highlighted='true'] .wham-pin-backdrop {
    opacity: 1;
    pointer-events: auto;
  }

  .wham-pin-menu-wrapper {
    position: absolute;
    z-index: 4;
    width: 48px;
    height: 48px;
    transform: translate(-50%, -50%);
    transition: opacity 500ms;
    /* The 48x48 wrapper would be a dead spot for clicks; only the icon buttons take pointers. */
    pointer-events: none;
  }

  .wham-pin-icon-button {
    --start-distance: 0px;
    --end-distance: 80px;
    /* Motion-free default: icons sit at the end distance and never move. */
    --current-distance: var(--end-distance);

    position: absolute;
    width: 100%;
    height: 100%;
    display: grid;
    place-content: center;
    border: none;
    border-radius: 50%;
    background: hsl(210deg 15% 15%);
    color: white;
    cursor: pointer;
    transform: translate(
      calc(cos(var(--angle)) * var(--current-distance)),
      calc(sin(var(--angle)) * var(--current-distance))
    );
  }
  .wham-pin-wrapper[data-is-highlighted='true'] .wham-pin-icon-button {
    pointer-events: auto;
  }
  @media (prefers-reduced-motion: no-preference) {
    .wham-pin-icon-button {
      transition: transform 800ms cubic-bezier(0.154, 0.792, 0, 0.998);
      --current-distance: var(--start-distance);
    }
    .wham-pin-wrapper[data-is-highlighted='true'] .wham-pin-icon-button {
      --current-distance: var(--end-distance);
    }
  }
`;

export function PinterestTappablePhotos() {
  return (
    <div className="wham-pin-app">
      <style>{STYLES}</style>
      <TappablePhoto alt="Illustration of a yellow armchair beside a floor lamp" src={CHAIR_SRC} />
      <TappablePhoto alt="Illustration of a grey sofa and a wooden coffee table" src={COUCH_SRC} />
      <TappablePhoto alt="Illustration of a red lamp glowing in a dark room" src={LAMP_SRC} />
      <TappablePhoto alt="Illustration of a window with a mountain view" src={WINDOW_SRC} />
    </div>
  );
}

type TappablePhotoProps = { src: string; alt: string } & Omit<ComponentPropsWithoutRef<'button'>, 'src' | 'alt'>;

function TappablePhoto({ src, alt, ...delegated }: TappablePhotoProps) {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleKeydown(ev: KeyboardEvent) {
      if (ev.key === 'Escape') {
        setIsHighlighted(false);
      }
    }
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  function handleClick(ev: MouseEvent<HTMLButtonElement>) {
    const nextIsHighlighted = !isHighlighted;
    setIsHighlighted(nextIsHighlighted);

    if (!nextIsHighlighted) {
      return;
    }

    // A click fired by Enter/Space has `detail === 0`; a real pointer click has 1+.
    const wasTriggeredByKeyboard = ev.detail === 0;

    if (wasTriggeredByKeyboard) {
      const bb = btnRef.current!.getBoundingClientRect();
      setAnchorPosition({
        x: bb.x + bb.width / 2,
        y: window.scrollY + bb.y + bb.height / 2,
      });
      return;
    }

    // Store document coordinates, so the absolutely-positioned menu lands under the cursor
    // even when the page is scrolled.
    setAnchorPosition({
      x: ev.clientX,
      y: window.scrollY + ev.clientY,
    });
  }

  return (
    <div className="wham-pin-wrapper" data-is-highlighted={isHighlighted}>
      {/* Mouse/touch dismiss target only. Keyboard users dismiss with Escape or by tabbing away. */}
      {/* oxlint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        className="wham-pin-backdrop"
        onClick={() => {
          setIsHighlighted(false);
        }}
      />
      <button
        ref={btnRef}
        className="wham-pin-btn"
        onClick={handleClick}
        onKeyDown={(ev) => {
          // Shift + Tab leaves for an element behind the backdrop: un-highlight first.
          if (ev.key === 'Tab' && ev.shiftKey) {
            setIsHighlighted(false);
          }
        }}
        {...delegated}
      >
        <img
          src={src}
          alt={alt}
          // No ghost drag image if the pointer drifts a little mid-click.
          draggable={false}
        />
      </button>
      <div
        className="wham-pin-menu-wrapper"
        style={{
          top: anchorPosition.y ?? undefined,
          left: anchorPosition.x ?? undefined,
          opacity: isHighlighted ? 1 : 0,
        }}
      >
        <IconButton Icon={Pin} angle={180} isVisible={isHighlighted} aria-label="Pin" />
        <IconButton Icon={Upload} angle={225} isVisible={isHighlighted} aria-label="Share" />
        <IconButton
          Icon={Search}
          angle={270}
          isVisible={isHighlighted}
          aria-label="Find similar"
          // Tabbing past the last button would land behind the backdrop: un-highlight.
          onKeyDown={(ev) => {
            if (ev.key === 'Tab' && !ev.shiftKey) {
              setIsHighlighted(false);
            }
          }}
        />
      </div>
    </div>
  );
}

type IconButtonProps = {
  Icon: ComponentType<IconProps>;
  angle: number;
  isVisible: boolean;
} & ComponentPropsWithoutRef<'button'>;

function IconButton({ Icon, angle, isVisible, ...delegated }: IconButtonProps) {
  return (
    <button
      {...delegated}
      className="wham-pin-icon-button"
      data-is-visible={isVisible}
      tabIndex={isVisible ? undefined : -1}
      style={
        {
          '--angle': angle + 'deg',
        } as CSSProperties
      }
    >
      <Icon size={24} />
    </button>
  );
}
