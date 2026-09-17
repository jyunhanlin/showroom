import { random } from 'lodash-es';
import { useEffect, useRef } from 'react';
import { clampedNormalize } from '~/utils/canvas';

// A new particle every 50ms while the button is held down.
const SPAWN_INTERVAL = 50;
// Josh's check is `length < 10`: 9 or fewer gathered particles → no explosion.
const MIN_PARTICLES = 10;
// Josh's check is `index > 200`: indices 0 to 200 survive (201 particles).
const MAX_PARTICLES = 200;

// Josh's utils.js helper. `~/utils/canvas` has no equivalent, so it lives here.
const checkPrefersReducedMotion = () => !window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

const STYLES = `
  @keyframes kirby-fadeFromTransparent {
    from { opacity: 0; }
  }
  @keyframes kirby-fadeToTransparent {
    to { opacity: 0; }
  }
  @keyframes kirby-suckIn {
    from {
      transform: translate(
        calc(cos(var(--angle)) * var(--distance)),
        calc(sin(var(--angle)) * var(--distance))
      );
    }
  }
  @keyframes kirby-explode {
    to {
      transform: translate(
        calc(cos(var(--angle)) * var(--distance)),
        calc(sin(var(--angle)) * var(--distance))
      );
    }
  }
  @keyframes kirby-fromShrunken {
    from { transform: scale(0); }
  }
  @keyframes kirby-sparkle {
    from { opacity: 0.25; }
    to { opacity: 1; }
  }

  .kirby-buttonWrapper {
    --pink: hsl(350deg 100% 60%);
  }
  .kirby-trigger {
    --gradient-direction: top;
    position: relative;
    overflow: clip;
    padding: 16px 32px;
    border: none;
    border-radius: 8px;
    background: linear-gradient(
      to var(--gradient-direction),
      hsl(210deg 20% 16%),
      hsl(210deg 20% 26%)
    );
    color: white;
    cursor: pointer;
    /*
      Not in Josh's solution. A hold gesture inside a scrollable notes page:
      stop touch panning, text selection and the long-press callout from
      cancelling the press.
    */
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }
  .kirby-trigger:active {
    --gradient-direction: bottom;
  }
  .kirby-particle {
    position: absolute;
    inset: 0;
    margin: auto;
    background: var(--pink);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    pointer-events: none;
    animation:
      kirby-suckIn 800ms forwards cubic-bezier(0.726, 0.1, 0.855, 0.526),
      kirby-fadeFromTransparent 400ms;
  }
  .kirby-particle.kirby-exploded {
    width: var(--size);
    height: var(--size);
    animation:
      kirby-explode var(--explode-duration) var(--explode-delay) forwards cubic-bezier(0.22, 0.579, 0.061, 0.996),
      kirby-sparkle var(--twinkle-duration) ease-in-out infinite alternate,
      kirby-fadeToTransparent var(--fade-duration) var(--fade-delay) forwards;
  }
  .kirby-popCircle {
    position: absolute;
    width: var(--size);
    height: var(--size);
    inset: 0;
    margin: auto;
    background: white;
    border-radius: 50%;
    opacity: 0.5;
    pointer-events: none;
    animation:
      kirby-fromShrunken 300ms,
      kirby-fadeToTransparent 500ms 200ms forwards;
  }
  /* Default (reduced motion): opacity crossfade only, no scaling. */
  .kirby-fillIndicator {
    position: absolute;
    inset: 0;
    background: var(--pink);
    opacity: 0;
    transition: opacity 500ms;
  }
  .kirby-trigger:active .kirby-fillIndicator {
    opacity: 1;
    transition: opacity 3000ms;
  }
  .kirby-text {
    position: relative;
  }
  /* Motion is OK: scaleY from a bottom origin, like liquid rising. */
  @media (prefers-reduced-motion: no-preference) {
    .kirby-fillIndicator {
      opacity: 1;
      transform: scaleY(0);
      transform-origin: bottom center;
      transition: transform 500ms cubic-bezier(0.419, 0.823, 0.431, 1.003);
    }
    .kirby-trigger:active .kirby-fillIndicator {
      transform: scaleY(1);
      transition: transform 3000ms 500ms cubic-bezier(0.419, 0.823, 0.431, 1.003);
    }
  }
`;

export function InhaleAndExplode() {
  const stageRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Why imperative DOM instead of React state: Josh's solution creates, gathers
  // and re-classes particle nodes directly. The component never re-renders, so
  // React never reconciles `.kirby-buttonWrapper` and the nodes we prepend there
  // are safe. Keeping it imperative keeps Josh's control flow line for line.
  useEffect(() => {
    const stage = stageRef.current;
    const wrapper = wrapperRef.current;
    const trigger = triggerRef.current;
    if (!stage || !wrapper || !trigger) return;

    // true between pointerdown and pointerup.
    let isRunning = false;

    const intervalId = window.setInterval(() => {
      // The interval ticks forever; it only spawns while pressed.
      if (!isRunning) {
        return;
      }

      // Polar coordinates, but resolved in CSS with cos()/sin().
      const particle = document.createElement('div');
      particle.classList.add('kirby-particle');
      particle.style.setProperty('--angle', `${random(0, 360)}deg`);
      particle.style.setProperty('--distance', `${random(50, 200)}px`);

      wrapper.prepend(particle);
    }, SPAWN_INTERVAL);

    const handlePointerDown = (event: PointerEvent) => {
      // Not in Josh's solution: without capture, a mouse released outside the
      // button never fires `pointerup` here, and particles keep spawning.
      trigger.setPointerCapture(event.pointerId);

      // Reduced motion: never start spawning. The CSS fill still crossfades.
      if (checkPrefersReducedMotion()) {
        return;
      }

      isRunning = true;
    };

    const handlePointerUp = () => {
      isRunning = false;

      // `:not(.kirby-exploded)` leaves out particles still twinkling from a
      // previous explosion.
      const gatheredParticles = [...wrapper.querySelectorAll<HTMLElement>('.kirby-particle:not(.kirby-exploded)')];

      if (gatheredParticles.length < MIN_PARTICLES) {
        return;
      }

      gatheredParticles.forEach((particle, index) => {
        // Cap the explosion size. Extra nodes are deleted, not animated.
        if (index > MAX_PARTICLES) {
          particle.remove();
          return;
        }

        // --angle / --distance stay as they were, so `explode` sends each
        // particle back to its spawn point. The rest is re-rolled per particle.
        particle.classList.add('kirby-exploded');
        particle.style.backgroundColor = 'white';
        particle.style.setProperty('--size', `${random(5, 20)}px`);
        particle.style.setProperty('--explode-duration', `${random(200, 600)}ms`);
        particle.style.setProperty('--explode-delay', `${random(0, 100)}ms`);
        particle.style.setProperty('--twinkle-duration', `${random(100, 300)}ms`);
        particle.style.setProperty('--fade-duration', `${random(800, 2500)}ms`);
        particle.style.setProperty('--fade-delay', `${random(500, 1200)}ms`);

        // Not in Josh's solution: remove the node once it has faded out.
        // `kirby-sparkle` is infinite, so a leftover node would animate forever.
        particle.addEventListener('animationend', (animationEvent) => {
          if (animationEvent.animationName === 'kirby-fadeToTransparent') {
            particle.remove();
          }
        });
      });

      // One pop circle at a time; its diameter scales with the gathered count.
      const allPopCircles = [...stage.querySelectorAll('.kirby-popCircle')];
      allPopCircles.forEach((elem) => elem.remove());

      const popCircle = document.createElement('div');
      popCircle.classList.add('kirby-popCircle');
      popCircle.style.setProperty(
        '--size',
        `${clampedNormalize(gatheredParticles.length, 0, MAX_PARTICLES, 0, 400)}px`,
      );
      // Josh prepends to <body>. Here the stage plays that role.
      stage.prepend(popCircle);
    };

    trigger.addEventListener('pointerdown', handlePointerDown);
    trigger.addEventListener('pointerup', handlePointerUp);
    trigger.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.clearInterval(intervalId);
      trigger.removeEventListener('pointerdown', handlePointerDown);
      trigger.removeEventListener('pointerup', handlePointerUp);
      trigger.removeEventListener('pointercancel', handlePointerUp);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-3">
      <style>{STYLES}</style>
      <div
        ref={stageRef}
        className="relative flex h-[440px] w-full items-center justify-center overflow-hidden rounded-md"
        style={{ background: 'hsl(210deg 15% 6%)' }}
      >
        <div ref={wrapperRef} className="kirby-buttonWrapper">
          <button ref={triggerRef} type="button" className="kirby-trigger">
            <span className="kirby-fillIndicator" />
            <span className="kirby-text">Trigger</span>
          </button>
        </div>
      </div>
      <p className="text-xs text-gray-500">按住按鈕 1 到 3 秒再放開。按越久吸越多粒子，爆炸越大。少於 10 顆不會爆。</p>
    </div>
  );
}
