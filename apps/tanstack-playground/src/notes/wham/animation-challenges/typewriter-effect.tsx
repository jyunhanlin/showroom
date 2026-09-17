import { random } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';

const MIN_DELAY = 50;
const MAX_DELAY = 350;
const TEXT = 'Hello world!';

// Stand-in for Josh's `data.js`. His SPRITE_MAP holds `[offset, duration]`
// slices of an mp3 sprite that Howler plays. We have no mp3 and no howler,
// so each "sprite" is a set of synth parameters for one key click instead.
// Same keys ('0' through '8'), so `random(0, 8).toString()` still picks one.
type KeyClick = {
  clickFrequency: number; // band-pass centre of the metallic "clack", Hz
  thunkFrequency: number; // start pitch of the low "thunk", Hz
  decay: number; // seconds until the click is silent
};

const SPRITE_MAP: Record<string, KeyClick> = {
  '0': { clickFrequency: 2200, thunkFrequency: 150, decay: 0.05 },
  '1': { clickFrequency: 3000, thunkFrequency: 130, decay: 0.045 },
  '2': { clickFrequency: 2600, thunkFrequency: 170, decay: 0.06 },
  '3': { clickFrequency: 3600, thunkFrequency: 120, decay: 0.04 },
  '4': { clickFrequency: 2000, thunkFrequency: 190, decay: 0.065 },
  '5': { clickFrequency: 3300, thunkFrequency: 140, decay: 0.05 },
  '6': { clickFrequency: 2800, thunkFrequency: 110, decay: 0.055 },
  '7': { clickFrequency: 4000, thunkFrequency: 160, decay: 0.04 },
  '8': { clickFrequency: 2400, thunkFrequency: 125, decay: 0.07 },
};

const VOLUME = 0.5;

type AudioGraph = { context: AudioContext; noiseBuffer: AudioBuffer; output: GainNode };

// A tiny Howl look-alike: `sound.play(spriteId)` keeps Josh's call shape.
function createTypewriterSound() {
  let audio: AudioGraph | null = null;

  return {
    // Call this inside the click handler. Browsers only let an AudioContext
    // start during a user gesture, so we create it lazily on the first click.
    unlock() {
      if (!audio) {
        const context = new AudioContext();
        const noiseBuffer = context.createBuffer(1, Math.round(context.sampleRate * 0.1), context.sampleRate);
        const samples = noiseBuffer.getChannelData(0);
        for (let i = 0; i < samples.length; i++) {
          samples[i] = random(-1, 1, true);
        }
        const output = context.createGain();
        output.gain.value = VOLUME;
        output.connect(context.destination);
        audio = { context, noiseBuffer, output };
      }
      if (audio.context.state === 'suspended') {
        void audio.context.resume();
      }
    },

    play(spriteId: string) {
      if (!audio) return;
      const { context, noiseBuffer, output } = audio;
      const { clickFrequency, thunkFrequency, decay } = SPRITE_MAP[spriteId];
      const now = context.currentTime;

      // "Clack": a burst of white noise, band-passed so it sounds metallic.
      const noise = context.createBufferSource();
      noise.buffer = noiseBuffer;
      const bandpass = context.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.value = clickFrequency;
      bandpass.Q.value = 2;
      const noiseGain = context.createGain();
      noiseGain.gain.setValueAtTime(1, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + decay);
      noise.connect(bandpass).connect(noiseGain).connect(output);
      noise.start(now);
      noise.stop(now + decay);

      // "Thunk": a low triangle wave that drops in pitch, like the typebar
      // hitting the platen.
      const thunk = context.createOscillator();
      thunk.type = 'triangle';
      thunk.frequency.setValueAtTime(thunkFrequency, now);
      thunk.frequency.exponentialRampToValueAtTime(thunkFrequency / 2, now + decay);
      const thunkGain = context.createGain();
      thunkGain.gain.setValueAtTime(0.6, now);
      thunkGain.gain.exponentialRampToValueAtTime(0.001, now + decay);
      thunk.connect(thunkGain).connect(output);
      thunk.start(now);
      thunk.stop(now + decay);
    },

    close() {
      void audio?.context.close();
      audio = null;
    },
  };
}

export function TypewriterEffect() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timeoutIdRef = useRef<number | undefined>(undefined);
  const [sound] = useState(createTypewriterSound);

  useEffect(() => {
    return () => {
      // A mutable timer id, not a DOM ref: reading `.current` at cleanup time
      // is exactly what we want (the latest pending timeout).
      // oxlint-disable-next-line react-hooks/exhaustive-deps
      window.clearTimeout(timeoutIdRef.current);
      sound.close();
    };
  }, [sound]);

  // `remainingChars` travels as a parameter, so each loop owns its own state.
  // The heading has no JSX children: React never reconciles its content, so
  // mutating it directly (like Josh's vanilla version) is safe.
  function typeChar(element: HTMLElement, remainingChars: string[]) {
    const nextChar = remainingChars.shift();

    // Out of characters: swap the bare `_` for a <span> that can fade out.
    if (!nextChar) {
      const blinkingUnderline = document.createElement('span');
      blinkingUnderline.innerText = '_';
      blinkingUnderline.classList.add('wham-typewriter-fade');

      element.innerText = element.innerText.slice(0, -1);
      element.append(blinkingUnderline);

      return;
    }

    // Drop the old `_`, then write the character plus a fresh `_`.
    element.innerText = element.innerText.slice(0, -1);
    element.append(nextChar + '_');

    // One of the nine key clicks, picked at random for every character.
    const spriteId = random(0, 8).toString();
    sound.play(spriteId);

    // A fresh random delay on every tick: this is why setTimeout beats setInterval.
    timeoutIdRef.current = window.setTimeout(
      () => {
        typeChar(element, remainingChars);
      },
      random(MIN_DELAY, MAX_DELAY),
    );
  }

  function handleTrigger() {
    const heading = headingRef.current;
    if (!heading) return;
    const { text = '' } = heading.dataset;

    sound.unlock();

    // Restart from scratch, even mid-typing: wipe the heading, kill the queued tick.
    heading.innerText = '';
    window.clearTimeout(timeoutIdRef.current);

    typeChar(heading, text.split(''));
  }

  return (
    <div
      className="flex min-h-[240px] flex-col justify-center gap-8 rounded-md p-8 text-white"
      style={{ background: 'hsl(210deg 15% 6%)', colorScheme: 'dark' }}
    >
      <style>{`
        @keyframes wham-typewriter-fadeToTransparent {
          to {
            opacity: 0;
          }
        }
        .wham-typewriter-fade {
          animation: wham-typewriter-fadeToTransparent 500ms forwards;
          animation-delay: 500ms;
        }
        .wham-typewriter-trigger {
          height: 3.75rem;
          padding: 0 32px;
          border: none;
          border-bottom: 3px solid hsl(210deg 15% 16%);
          border-radius: 5px;
          background: hsl(210deg 15% 24%);
          color: white;
          cursor: pointer;
          font-size: 1.125rem;
          font-weight: bold;
        }
        .wham-typewriter-trigger:active {
          border-bottom-width: 1px;
          height: calc(3.75rem - 2px);
        }
      `}</style>
      <div className="flex-1">
        {/* Filled imperatively by typeChar, so it has no JSX children on purpose.
            aria-label gives screen readers the whole sentence, not "Hello wor_". */}
        {/* oxlint-disable-next-line jsx-a11y/heading-has-content */}
        <h1 ref={headingRef} data-text={TEXT} aria-label={TEXT} className="m-0 text-[3rem] leading-tight font-bold" />
      </div>
      <button type="button" className="wham-typewriter-trigger" onClick={handleTrigger}>
        Trigger
      </button>
    </div>
  );
}
