/**
 * Scroll-driven CSS animations via `animation-timeline`.
 *
 * Each demo creates its own `overflow-y: scroll` container so the
 * scroll-timeline binds to that container's scroll, not the page's.
 * CSS lives in inline <style> blocks scoped by unique demo class names.
 */

const SCROLL_SPIN_CSS = `
  .scroll-spin-scroller {
    height: 280px;
    overflow-y: scroll;
    overflow-x: hidden;
    scroll-timeline-name: --spin-scroller;
    scroll-timeline-axis: block;
    background: linear-gradient(180deg, #f8fafc 0%, #e0e7ff 100%);
    border-radius: 8px;
    position: relative;
  }
  .scroll-spin-track {
    height: 800px;
    padding: 16px;
    position: relative;
  }
  .scroll-spin-sticky {
    position: sticky;
    top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  .scroll-spin-box {
    width: 80px;
    height: 80px;
    background: #f59e0b;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
    animation: scroll-spin-rotate linear;
    animation-timeline: --spin-scroller;
  }
  .scroll-spin-path {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    animation: scroll-spin-draw linear;
    animation-timeline: --spin-scroller;
  }
  .scroll-spin-marker {
    color: #475569;
    font-size: 12px;
    text-align: center;
  }
  @keyframes scroll-spin-rotate {
    to { transform: rotate(360deg); }
  }
  @keyframes scroll-spin-draw {
    to { stroke-dashoffset: 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    .scroll-spin-box { animation: none; }
    .scroll-spin-path { animation: none; stroke-dashoffset: 0; }
  }
`;

export function ScrollSpinDraw() {
  return (
    <>
      <style>{SCROLL_SPIN_CSS}</style>
      <div className="scroll-spin-scroller">
        <div className="scroll-spin-track">
          <div className="scroll-spin-sticky">
            <div className="scroll-spin-box" />
            <svg width="220" height="80" viewBox="0 0 220 80" aria-hidden="true">
              <path
                className="scroll-spin-path"
                d="M 10 60 Q 60 0 110 40 T 210 30"
                pathLength="1"
                fill="none"
                stroke="#7c3aed"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
            <p className="scroll-spin-marker">Scroll the container ↓</p>
          </div>
        </div>
      </div>
    </>
  );
}

const VIEW_PROGRESS_CSS = `
  .view-progress-scroller {
    height: 320px;
    overflow-y: scroll;
    overflow-x: hidden;
    background: #0f172a;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .view-progress-spacer {
    height: 200px;
    flex-shrink: 0;
    color: #64748b;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .view-progress-shape {
    width: 100%;
    height: 80px;
    border-radius: 12px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    padding: 0 18px;
    color: white;
    font-weight: 600;
    font-size: 14px;
    animation: view-progress-slide-in linear both;
    animation-timeline: view();
    animation-range: entry 10% entry 90%;
  }
  .view-progress-shape:nth-child(2) { background: #06b6d4; }
  .view-progress-shape:nth-child(3) { background: #8b5cf6; }
  .view-progress-shape:nth-child(4) { background: #ec4899; }
  .view-progress-shape:nth-child(5) { background: #f59e0b; }
  @keyframes view-progress-slide-in {
    from {
      opacity: 0;
      transform: translateX(-40px) scale(0.92);
    }
    to {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .view-progress-shape { animation: none; opacity: 1; transform: none; }
  }
`;

export function ViewProgressShapes() {
  return (
    <>
      <style>{VIEW_PROGRESS_CSS}</style>
      <div className="view-progress-scroller">
        <div className="view-progress-spacer">scroll down ↓</div>
        <div className="view-progress-shape">circle — entry range</div>
        <div className="view-progress-shape">square — entry range</div>
        <div className="view-progress-shape">triangle — entry range</div>
        <div className="view-progress-shape">star — entry range</div>
        <div className="view-progress-spacer">— end —</div>
      </div>
    </>
  );
}

const STAGGERED_WORDS_CSS = `
  .staggered-words-scroller {
    height: 280px;
    overflow-y: scroll;
    overflow-x: hidden;
    background: #fafaf9;
    border-radius: 8px;
    padding: 16px;
  }
  .staggered-words-spacer {
    height: 220px;
    color: #94a3b8;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .staggered-words-sentence {
    line-height: 1.8;
    font-size: 20px;
    font-weight: 600;
    color: #1e293b;
    padding: 24px 0;
  }
  .staggered-word {
    display: inline-block;
    opacity: 0;
    transform: translateY(8px);
    animation: staggered-word-in linear both;
    animation-timeline: view();
  }
  .staggered-word:nth-child(1) { animation-range: cover 10% cover 25%; }
  .staggered-word:nth-child(2) { animation-range: cover 15% cover 30%; }
  .staggered-word:nth-child(3) { animation-range: cover 20% cover 35%; }
  .staggered-word:nth-child(4) { animation-range: cover 25% cover 40%; }
  .staggered-word:nth-child(5) { animation-range: cover 30% cover 45%; }
  .staggered-word:nth-child(6) { animation-range: cover 35% cover 50%; }
  .staggered-word:nth-child(7) { animation-range: cover 40% cover 55%; }
  .staggered-word:nth-child(8) { animation-range: cover 45% cover 60%; }
  @keyframes staggered-word-in {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .staggered-word { animation: none; opacity: 1; transform: none; }
  }
`;

const SENTENCE = ['Scroll', 'reveals', 'each', 'word', 'with', 'a', 'small', 'offset.'];

export function StaggeredWords() {
  return (
    <>
      <style>{STAGGERED_WORDS_CSS}</style>
      <div className="staggered-words-scroller">
        <div className="staggered-words-spacer">scroll down ↓</div>
        <p className="staggered-words-sentence">
          {SENTENCE.map((word, i) => (
            <span key={i} className="staggered-word">
              {word}
              {i < SENTENCE.length - 1 ? ' ' : ''}
            </span>
          ))}
        </p>
        <div className="staggered-words-spacer">— end —</div>
      </div>
    </>
  );
}

const LINKED_TIMELINES_CSS = `
  .linked-scroller {
    height: 320px;
    overflow-y: scroll;
    overflow-x: hidden;
    background: #f1f5f9;
    border-radius: 8px;
    timeline-scope: --content;
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 16px;
    padding: 16px;
  }
  .linked-square-column {
    position: sticky;
    top: 16px;
    align-self: start;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  .linked-square {
    width: 80px;
    height: 80px;
    background: #ef4444;
    animation: linked-morph linear both;
    animation-timeline: --content;
    animation-range: contain 0% contain 100%;
  }
  .linked-square-label {
    font-size: 11px;
    color: #64748b;
    text-align: center;
  }
  .linked-content-column {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .linked-spacer {
    height: 220px;
    color: #94a3b8;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .linked-paragraph {
    view-timeline: --content;
    view-timeline-axis: block;
    background: white;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    color: #334155;
    line-height: 1.6;
    font-size: 14px;
  }
  @keyframes linked-morph {
    0% {
      border-radius: 0;
      background: #ef4444;
      transform: rotate(0deg);
    }
    50% {
      border-radius: 50%;
      background: #8b5cf6;
      transform: rotate(180deg);
    }
    100% {
      border-radius: 0;
      background: #06b6d4;
      transform: rotate(360deg);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .linked-square { animation: none; border-radius: 0; }
  }
`;

export function LinkedTimelines() {
  return (
    <>
      <style>{LINKED_TIMELINES_CSS}</style>
      <div className="linked-scroller">
        <div className="linked-square-column">
          <div className="linked-square" />
          <p className="linked-square-label">driven by paragraph</p>
        </div>
        <div className="linked-content-column">
          <div className="linked-spacer">scroll down ↓</div>
          <p className="linked-paragraph">
            This paragraph publishes a <code>view-timeline: --content</code>. The square on the left subscribes to it
            via <code>animation-timeline: --content</code>, so its morph progress is tied to this paragraph entering and
            leaving the viewport.
          </p>
          <div className="linked-spacer">— end —</div>
        </div>
      </div>
    </>
  );
}
