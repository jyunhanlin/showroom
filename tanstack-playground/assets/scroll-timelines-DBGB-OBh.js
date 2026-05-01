import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{n as t,r as n}from"./lib-BI_-S7V4.js";var r=n(),i=`
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
`;function a(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(`style`,{children:i}),(0,r.jsx)(`div`,{className:`scroll-spin-scroller`,children:(0,r.jsx)(`div`,{className:`scroll-spin-track`,children:(0,r.jsxs)(`div`,{className:`scroll-spin-sticky`,children:[(0,r.jsx)(`div`,{className:`scroll-spin-box`}),(0,r.jsx)(`svg`,{width:`220`,height:`80`,viewBox:`0 0 220 80`,"aria-hidden":`true`,children:(0,r.jsx)(`path`,{className:`scroll-spin-path`,d:`M 10 60 Q 60 0 110 40 T 210 30`,pathLength:`1`,fill:`none`,stroke:`#7c3aed`,strokeWidth:`4`,strokeLinecap:`round`})}),(0,r.jsx)(`p`,{className:`scroll-spin-marker`,children:`Scroll the container ↓`})]})})})]})}var o=`
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
`;function s(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(`style`,{children:o}),(0,r.jsxs)(`div`,{className:`view-progress-scroller`,children:[(0,r.jsx)(`div`,{className:`view-progress-spacer`,children:`scroll down ↓`}),(0,r.jsx)(`div`,{className:`view-progress-shape`,children:`circle — entry range`}),(0,r.jsx)(`div`,{className:`view-progress-shape`,children:`square — entry range`}),(0,r.jsx)(`div`,{className:`view-progress-shape`,children:`triangle — entry range`}),(0,r.jsx)(`div`,{className:`view-progress-shape`,children:`star — entry range`}),(0,r.jsx)(`div`,{className:`view-progress-spacer`,children:`— end —`})]})]})}var c=`
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
`,l=[`Scroll`,`reveals`,`each`,`word`,`with`,`a`,`small`,`offset.`];function u(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(`style`,{children:c}),(0,r.jsxs)(`div`,{className:`staggered-words-scroller`,children:[(0,r.jsx)(`div`,{className:`staggered-words-spacer`,children:`scroll down ↓`}),(0,r.jsx)(`p`,{className:`staggered-words-sentence`,children:l.map((e,t)=>(0,r.jsxs)(`span`,{className:`staggered-word`,children:[e,t<l.length-1?` `:``]},t))}),(0,r.jsx)(`div`,{className:`staggered-words-spacer`,children:`— end —`})]})]})}var d=`
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
`;function f(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(`style`,{children:d}),(0,r.jsxs)(`div`,{className:`linked-scroller`,children:[(0,r.jsxs)(`div`,{className:`linked-square-column`,children:[(0,r.jsx)(`div`,{className:`linked-square`}),(0,r.jsx)(`p`,{className:`linked-square-label`,children:`driven by paragraph`})]}),(0,r.jsxs)(`div`,{className:`linked-content-column`,children:[(0,r.jsx)(`div`,{className:`linked-spacer`,children:`scroll down ↓`}),(0,r.jsxs)(`p`,{className:`linked-paragraph`,children:[`This paragraph publishes a `,(0,r.jsx)(`code`,{children:`view-timeline: --content`}),`. The square on the left subscribes to it via `,(0,r.jsx)(`code`,{children:`animation-timeline: --content`}),`, so its morph progress is tied to this paragraph entering and leaving the viewport.`]}),(0,r.jsx)(`div`,{className:`linked-spacer`,children:`— end —`})]})]})]})}var p=e({default:()=>g,frontmatter:()=>m}),m={title:"Scroll Timelines (`animation-timeline: scroll() / view()`)",sourceUrl:`https://courses.joshwcomeau.com/wham/03-advanced-interactions/05.01-animation-timeline`,lessonNumber:`03-advanced-interactions/05.01-animation-timeline`,order:7,summary:"純 CSS scroll-driven animations。`animation-timeline: scroll()` 把 scroll 進度當作 keyframe 進度；`animation-timeline: view()` 把元素「穿過 viewport 的進度」當作 keyframe 進度。`animation-range` 控制範圍（cover / contain / entry / exit + 自訂百分比），`animation-fill-mode: both` 防 flicker。命名 timeline (`view-timeline: --name` + `timeline-scope`) 可以讓某顆元素的動畫被另一顆元素的 view progress 驅動。Firefox 還沒支援，要 polyfill。",tags:[`scroll-timeline`,`view-timeline`,`animation-range`,`css-animation`,`scroll-driven`]};function h(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,span:`span`,strong:`strong`,ul:`ul`,...t(),...e.components},{DemoFrame:i}=n;return i||_(`DemoFrame`,!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`TL;DR`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`animation-timeline`}),` 把 keyframe 動畫的「時間軸」從 wall-clock 換成 scroll 進度。`,(0,r.jsx)(n.code,{children:`scroll()`}),` 綁 scroll 容器的 0–100% 進度、`,(0,r.jsx)(n.code,{children:`view()`}),` 綁元素「穿過 viewport 的進度」。寫法是純 CSS，不用 JS、不用 IntersectionObserver。`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`animation-range`}),` 決定要把 keyframe 的 0–100% 對應到哪段 scroll 範圍：`,(0,r.jsx)(n.code,{children:`cover`}),`（元素第一個 pixel 進入到最後一個 pixel 離開）、`,(0,r.jsx)(n.code,{children:`contain`}),`（完全在 viewport 內那段）、`,(0,r.jsx)(n.code,{children:`entry`}),`（進場那段）、`,(0,r.jsx)(n.code,{children:`exit`}),`（出場那段）。也能自訂 `,(0,r.jsx)(n.code,{children:`entry 0% entry 150%`}),` 這種百分比。`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`animation-fill-mode: both`}),` 幾乎是預設要寫的 — view timeline 在 range 之外 keyframe 不生效，沒 fill mode 元素會在 entry 之前彈回原樣、exit 之後也彈回原樣，有明顯 flicker。`]}),`
`,(0,r.jsxs)(n.li,{children:[`Inline 元素的 `,(0,r.jsx)(n.code,{children:`view()`}),` 抓的是`,(0,r.jsx)(n.strong,{children:`容器`}),`的 view progress 不是自己的 — 字級 stagger 必須 `,(0,r.jsx)(n.code,{children:`display: inline-block`}),` 每個 word 才有獨立的 view-timeline。`]}),`
`,(0,r.jsxs)(n.li,{children:[`命名 timeline (`,(0,r.jsx)(n.code,{children:`view-timeline: --name`}),`) + `,(0,r.jsx)(n.code,{children:`timeline-scope: --name`}),` 可以讓 A 元素的動畫被 B 元素的 view progress 驅動 — 跨元素 timeline 連結。`]}),`
`,(0,r.jsxs)(n.li,{children:[`瀏覽器支援：Chrome/Edge/Safari TP 有，Firefox 沒。production 用 `,(0,r.jsx)(n.a,{href:`https://github.com/flackr/scroll-timeline`,children:`scroll-timeline-polyfill`}),` — 但 polyfill 不支援所有 advanced features（命名 timeline 部分支援）。`]}),`
`]}),`
`,(0,r.jsx)(i,{title:`Scroll progress timeline — 容器 scroll 直接驅動旋轉 + path 描繪`,children:(0,r.jsx)(a,{})}),`
`,(0,r.jsx)(n.p,{children:`捲動容器內部，sticky 黃色方塊跟著 scroll 進度旋轉一圈、SVG 路徑同步從左畫到右。容器 scroll 0% → keyframe 0%；容器 scroll 100% → keyframe 100%。沒任何 JS。`}),`
`,(0,r.jsxs)(n.h2,{children:[(0,r.jsx)(n.code,{children:`scroll()`}),` vs `,(0,r.jsx)(n.code,{children:`view()`})]}),`
`,(0,r.jsx)(n.p,{children:`兩種 timeline 解決的是不同問題：`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:`scroll()`})}),`：要追的是「整個 scroll 容器的進度」。reading progress bar、scroll-linked parallax、章節大綱進度標記都是這類。`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:`view()`})}),`：要追的是「這個元素自己穿過 viewport 的進度」。fade-in on enter、parallax-on-image、卡片 reveal 都是這類。`]}),`
`]}),`
`,(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,r.jsxs)(n.code,{children:[(0,r.jsx)(n.span,{className:`line`,children:(0,r.jsx)(n.span,{style:{color:`#6A737D`},children:`/* 容器 scroll 0% → 100% 對應到 keyframe 0% → 100% */`})}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#6F42C1`},children:`.box`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`  animation`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: spin `}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`linear`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`  animation-timeline`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`scroll`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`();`})]}),`
`,(0,r.jsx)(n.span,{className:`line`,children:(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`}`})}),`
`,(0,r.jsx)(n.span,{className:`line`}),`
`,(0,r.jsx)(n.span,{className:`line`,children:(0,r.jsx)(n.span,{style:{color:`#6A737D`},children:`/* 元素自己穿過 viewport 的進度對應到 keyframe */`})}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#6F42C1`},children:`.card`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`  animation`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: slide-in `}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`linear`}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:` both`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`  animation-timeline`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: view();`})]}),`
`,(0,r.jsx)(n.span,{className:`line`,children:(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`}`})})]})})}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`scroll()`}),` 預設綁最近的 scroll 祖先。如果中間有不該被計入的 scroll container（例如 sidebar）但你要綁的是 document，用 `,(0,r.jsx)(n.code,{children:`scroll(root block)`}),`：`,(0,r.jsx)(n.code,{children:`root`}),` 指 document scrolling element，`,(0,r.jsx)(n.code,{children:`block`}),` 指 block axis（垂直）。`]}),`
`,(0,r.jsxs)(n.h2,{children:[(0,r.jsx)(n.code,{children:`animation-range`}),` — 把 timeline scale 到一段範圍`]}),`
`,(0,r.jsxs)(n.p,{children:[`預設 `,(0,r.jsx)(n.code,{children:`view()`}),` 用 `,(0,r.jsx)(n.code,{children:`cover`}),` range：元素第一個 pixel 進入 viewport = 0%、最後一個 pixel 離開 = 100%。但很多場景要更精準：`]}),`
`,(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,r.jsxs)(n.code,{children:[(0,r.jsx)(n.span,{className:`line`,children:(0,r.jsx)(n.span,{style:{color:`#6A737D`},children:`/* 元素剛進場那段做完動畫 */`})}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#22863A`},children:`animation-range`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: entry 0% entry 100%;`})]}),`
`,(0,r.jsx)(n.span,{className:`line`}),`
`,(0,r.jsx)(n.span,{className:`line`,children:(0,r.jsx)(n.span,{style:{color:`#6A737D`},children:`/* 元素已經完全在 viewport 內那段做動畫 */`})}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#22863A`},children:`animation-range`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: contain 0% contain 100%;`})]}),`
`,(0,r.jsx)(n.span,{className:`line`}),`
`,(0,r.jsx)(n.span,{className:`line`,children:(0,r.jsx)(n.span,{style:{color:`#6A737D`},children:`/* "buffer" — entry 100% 應該結束、但讓動畫慢半拍到 entry 150%`})}),`
`,(0,r.jsx)(n.span,{className:`line`,children:(0,r.jsx)(n.span,{style:{color:`#6A737D`},children:`   意思是「動畫在元素進場 + 一個 viewport 高度的 50% 額外捲動後才完成」 */`})}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#22863A`},children:`animation-range`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: entry 0% entry 150%;`})]})]})})}),`
`,(0,r.jsx)(n.p,{children:`四個 range keyword 分別對應 view timeline 的不同階段：`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`cover`}),`：first pixel in → last pixel out（完整 range）`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`contain`}),`：fully visible 那段（小元素可能根本沒有 contain range）`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`entry`}),`：first pixel in → fully visible`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`exit`}),`：starting to leave → last pixel out`]}),`
`]}),`
`,(0,r.jsxs)(n.p,{children:[`百分比可以超過 100% 或低於 0% 把 range 「擴出去」做 buffer 效果。`,(0,r.jsx)(n.code,{children:`entry 150%`}),` 不是「entry 之後」— 是把 entry 的自然 100% 點當參考、再多走 50% 的距離。`]}),`
`,(0,r.jsx)(i,{title:`View progress timeline — 元素穿過 viewport 時 fade + slide in`,children:(0,r.jsx)(s,{})}),`
`,(0,r.jsxs)(n.p,{children:[`四個色塊各自有 `,(0,r.jsx)(n.code,{children:`animation-timeline: view()`}),` + `,(0,r.jsx)(n.code,{children:`animation-range: entry 10% entry 90%`}),`。每塊只在自己進場那段播 keyframe，相互獨立。`,(0,r.jsx)(n.code,{children:`fill-mode: both`}),` 讓 entry 之前是初始狀態、結束後維持終態。`]}),`
`,(0,r.jsxs)(n.h2,{children:[(0,r.jsx)(n.code,{children:`animation-fill-mode: both`}),` 防 flicker`]}),`
`,(0,r.jsxs)(n.p,{children:[`這個是 view-timeline 最常踩的坑。預設 `,(0,r.jsx)(n.code,{children:`fill-mode: none`}),`，意思是 keyframe 在 range 之外不生效 — 元素回到 CSS declaration 的「靜態」狀態。`]}),`
`,(0,r.jsx)(n.p,{children:`實務上看起來：`}),`
`,(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,r.jsxs)(n.code,{children:[(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#6F42C1`},children:`.card`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`  opacity`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`0`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`;                    `}),(0,r.jsx)(n.span,{style:{color:`#6A737D`},children:`/* 靜態 */`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`  animation`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: fade-in `}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`linear`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`;     `}),(0,r.jsx)(n.span,{style:{color:`#6A737D`},children:`/* fill-mode: none */`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`  animation-timeline`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: view();`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`  animation-range`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: entry;`})]}),`
`,(0,r.jsx)(n.span,{className:`line`,children:(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`}`})}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#D73A49`},children:`@keyframes`}),(0,r.jsx)(n.span,{style:{color:`#E36209`},children:` fade-in`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#6F42C1`},children:`  to`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:` { `}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`opacity`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`1`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`; }`})]}),`
`,(0,r.jsx)(n.span,{className:`line`,children:(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`}`})})]})})}),`
`,(0,r.jsx)(n.p,{children:`捲動時序：`}),`
`,(0,r.jsxs)(n.ol,{children:[`
`,(0,r.jsxs)(n.li,{children:[`元素還沒進場 → range 之前 → keyframe 不生效 → opacity 跳回靜態的 `,(0,r.jsx)(n.code,{children:`0`}),` ✓`]}),`
`,(0,r.jsx)(n.li,{children:`元素進場中 → range 內 → keyframe 生效 → opacity 從 0 動到 1 ✓`}),`
`,(0,r.jsxs)(n.li,{children:[`元素 fully in → 過了 entry range → keyframe 不生效 → `,(0,r.jsxs)(n.strong,{children:[`opacity 跳回靜態的 `,(0,r.jsx)(n.code,{children:`0`})]}),` ✗ flicker`]}),`
`]}),`
`,(0,r.jsxs)(n.p,{children:[`修法：`,(0,r.jsx)(n.code,{children:`animation-fill-mode: both`}),`（或寫在 shorthand `,(0,r.jsx)(n.code,{children:`animation: fade-in linear both`}),`）：`]}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`forwards`}),` — range 結束後維持 keyframe 終態（解決 step 3）`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`backwards`}),` — range 開始前維持 keyframe 起始（解決 step 1 如果你改寫初始 state 而不是依賴靜態值）`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`both`}),` — 兩邊都管。最 robust，建議預設這樣寫。`]}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Staggered words — inline 元素的 view() 陷阱`}),`
`,(0,r.jsxs)(n.p,{children:[`直覺上把 sentence 拆成 `,(0,r.jsx)(n.code,{children:`<span class="word">`}),` 每個 word 套不同 `,(0,r.jsx)(n.code,{children:`animation-range`}),` 就好。實際上會發現所有 word `,(0,r.jsx)(n.strong,{children:`同時`}),`動，看起來像整段一起 fade。`]}),`
`,(0,r.jsxs)(n.p,{children:[`原因：inline 元素的 `,(0,r.jsx)(n.code,{children:`view()`}),` 抓的是`,(0,r.jsx)(n.strong,{children:`最近的 block 容器`}),`的 view progress，不是自己的。每個 `,(0,r.jsx)(n.code,{children:`<span>`}),` 拿到的 view progress 都是同一個 `,(0,r.jsx)(n.code,{children:`<p>`}),` 的進度 → 所有 word 共享 timeline → range 沒意義。`]}),`
`,(0,r.jsxs)(n.p,{children:[`修法：`,(0,r.jsx)(n.code,{children:`display: inline-block`}),` 強制 word 變成獨立的 box，view-timeline 才會綁到 word 自己：`]}),`
`,(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,r.jsxs)(n.code,{children:[(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#6F42C1`},children:`.word`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`  display`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`inline-block`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`;     `}),(0,r.jsx)(n.span,{style:{color:`#6A737D`},children:`/* 關鍵 */`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`  opacity`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`0`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`  animation`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: fade-up `}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`linear`}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:` both`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`  animation-timeline`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: view();`})]}),`
`,(0,r.jsx)(n.span,{className:`line`,children:(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`}`})}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#6F42C1`},children:`.word:nth-child`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`1`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`) { `}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`animation-range`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`cover`}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:` 10`}),(0,r.jsx)(n.span,{style:{color:`#D73A49`},children:`%`}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:` cover`}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:` 25`}),(0,r.jsx)(n.span,{style:{color:`#D73A49`},children:`%`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`; }`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#6F42C1`},children:`.word:nth-child`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`2`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`) { `}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`animation-range`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`cover`}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:` 15`}),(0,r.jsx)(n.span,{style:{color:`#D73A49`},children:`%`}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:` cover`}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:` 30`}),(0,r.jsx)(n.span,{style:{color:`#D73A49`},children:`%`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`; }`})]}),`
`,(0,r.jsx)(n.span,{className:`line`,children:(0,r.jsx)(n.span,{style:{color:`#6A737D`},children:`/* ...每個 word 把 range 往後 offset 5%，做出 stagger */`})})]})})}),`
`,(0,r.jsx)(i,{title:`Staggered word reveal — 每個 word 自己的 range，做出依序登場`,children:(0,r.jsx)(u,{})}),`
`,(0,r.jsxs)(n.p,{children:[`每個 word 的 `,(0,r.jsx)(n.code,{children:`animation-range`}),` 起終點都比前一個多 5% — scroll 經過時看起來像依序登場，但底層是 8 個獨立 view-timeline 重疊在不同 range 上。`]}),`
`,(0,r.jsx)(n.h2,{children:`Linked timelines — 用一顆元素的 view progress 驅動另一顆的動畫`}),`
`,(0,r.jsx)(n.p,{children:`到目前為止 timeline 都綁在「動畫元素自己」或「自己的 scroll 祖先」上。命名 timeline 把 timeline 抽成可以跨元素引用的「變數」：`}),`
`,(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,r.jsxs)(n.code,{children:[(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#6F42C1`},children:`.scroller`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,r.jsx)(n.span,{className:`line`,children:(0,r.jsx)(n.span,{style:{color:`#6A737D`},children:`  /* 在 ancestor 上「保留」這個變數名，讓 sibling/cousin 也能引用 */`})}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`  timeline-scope`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: --content;`})]}),`
`,(0,r.jsx)(n.span,{className:`line`,children:(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`}`})}),`
`,(0,r.jsx)(n.span,{className:`line`}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#6F42C1`},children:`.paragraph`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,r.jsx)(n.span,{className:`line`,children:(0,r.jsx)(n.span,{style:{color:`#6A737D`},children:`  /* 把自己的 view progress 暴露為 --content timeline */`})}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`  view-timeline`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: --content;`})]}),`
`,(0,r.jsx)(n.span,{className:`line`,children:(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`}`})}),`
`,(0,r.jsx)(n.span,{className:`line`}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#6F42C1`},children:`.square`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,r.jsx)(n.span,{className:`line`,children:(0,r.jsx)(n.span,{style:{color:`#6A737D`},children:`  /* 引用 --content — 這顆 square 的動畫進度 = .paragraph 的 view progress */`})}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`  animation`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: morph `}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`linear`}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:` both`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`  animation-timeline`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: --content;`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`  animation-range`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`contain`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,r.jsx)(n.span,{className:`line`,children:(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`}`})})]})})}),`
`,(0,r.jsx)(n.p,{children:`兩個關鍵字：`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:`view-timeline: --name`})}),` — 在某顆元素上「發布」一個命名 view-timeline。等同於匿名 `,(0,r.jsx)(n.code,{children:`view()`}),` 但有名字、可以被跨元素引用。`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:`timeline-scope: --name`})}),` — 在祖先上「reserve」這個變數名。沒它的話 `,(0,r.jsx)(n.code,{children:`--name`}),` 只在「發布它的元素的 sibling」之間可見；有它才能讓「祖先底下任意子孫」都引用得到。`]}),`
`]}),`
`,(0,r.jsx)(i,{title:`Linked timeline — 左欄 square 的 morph 由右欄 paragraph 驅動`,children:(0,r.jsx)(f,{})}),`
`,(0,r.jsx)(n.p,{children:`捲動容器：右欄段落穿過 viewport 時、左欄 sticky square 同步 morph（border-radius + 顏色 + rotation）。Square 自己沒 view-timeline、也沒 scroll() — 它的進度條是「右欄段落的 view progress」遠端驅動。`}),`
`,(0,r.jsx)(n.h2,{children:`Multiple animations on the same element`}),`
`,(0,r.jsx)(n.p,{children:`一顆元素可以同時跑多個 scroll-driven 動畫，timeline 跟 range 用 comma 平行寫：`}),`
`,(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,r.jsxs)(n.code,{children:[(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#6F42C1`},children:`.hero`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`  animation`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: fade-in `}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`linear`}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:` both`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`, slide-in `}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`linear`}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:` both`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`  animation-timeline`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: view(), `}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`scroll`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`();`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`  animation-range`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: entry `}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`0`}),(0,r.jsx)(n.span,{style:{color:`#D73A49`},children:`%`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:` entry `}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`50`}),(0,r.jsx)(n.span,{style:{color:`#D73A49`},children:`%`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`, `}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`cover`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,r.jsx)(n.span,{className:`line`,children:(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`}`})})]})})}),`
`,(0,r.jsx)(n.p,{children:`第一個動畫綁 view-timeline + entry range、第二個綁 scroll-timeline + 整個 cover。每個 animation 的 timeline、range、duration 是獨立的 list — 順序對齊就好。`}),`
`,(0,r.jsx)(n.h2,{children:`Browser support 跟 polyfill`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`Chrome / Edge`}),`：完整支援（115+）。`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`Safari`}),`：基本支援（17.4+）；命名 timeline 還在跟進。`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`Firefox`}),`：還沒。flag 後面有實驗實作。`]}),`
`]}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{href:`https://github.com/flackr/scroll-timeline`,children:`scroll-timeline-polyfill`}),` 補上 Firefox。但 polyfill 注意事項：`]}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:`需要 JS 介入 → bundle size 增加（壓縮後仍有 ~10KB）`}),`
`,(0,r.jsx)(n.li,{children:`部分 advanced features 不支援或行為不一致（早期版本的命名 timeline）`}),`
`,(0,r.jsx)(n.li,{children:`進場前所有 element 在 first paint 跑一次 reflow 計算 timeline，scroll-heavy page 進場可能有 jank`}),`
`]}),`
`,(0,r.jsx)(n.p,{children:`scroll-driven animation 多半是 progressive enhancement — Firefox user 看不到動畫但內容仍可讀，通常可接受。要強上 polyfill 就 ship 它、要省 bundle 就 fallback to static、看情境。`}),`
`,(0,r.jsx)(n.h2,{children:`Gotchas`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsxs)(n.strong,{children:[(0,r.jsx)(n.code,{children:`fill-mode: both`}),` 幾乎是預設`]}),`。沒寫 `,(0,r.jsx)(n.code,{children:`forwards`}),` 或 `,(0,r.jsx)(n.code,{children:`both`}),`，元素在 range 結束後會跳回 CSS 靜態值 → 整段 scroll 看起來閃一下。`,(0,r.jsx)(n.code,{children:`forwards`}),` 解決尾端 flicker、`,(0,r.jsx)(n.code,{children:`both`}),` 連同前端也一起 cover。`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsxs)(n.strong,{children:[`Inline 元素的 `,(0,r.jsx)(n.code,{children:`view()`}),` 綁的是父容器`]}),`。staggered words 必須 `,(0,r.jsx)(n.code,{children:`display: inline-block`}),` 才會有自己的 view-timeline。同樣坑也適用 `,(0,r.jsx)(n.code,{children:`<a>`}),`、`,(0,r.jsx)(n.code,{children:`<em>`}),`、任何沒被 block-ify 的 inline。`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsxs)(n.strong,{children:[(0,r.jsx)(n.code,{children:`timeline-scope`}),` 必須掛在 publisher 跟 consumer 的共同祖先上`]}),`。如果 `,(0,r.jsx)(n.code,{children:`view-timeline: --content`}),` 在 sibling、`,(0,r.jsx)(n.code,{children:`animation-timeline: --content`}),` 在另一個 sibling，它們的「共同 parent」要寫 `,(0,r.jsx)(n.code,{children:`timeline-scope: --content`}),`。漏掉的話 consumer 抓不到 timeline、動畫整個不跑。`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsxs)(n.strong,{children:[(0,r.jsx)(n.code,{children:`entry 150%`}),` 不是「entry 之後」`]}),`。Range keyword 後面的百分比是「相對該 range 的 0–100% 區間」線性外插。`,(0,r.jsx)(n.code,{children:`entry 150%`}),` = 在 entry 結束後再多走半個 entry-range 距離。要做 buffer 用、不要當「進場後」誤解。`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`多動畫的 timeline / range 用 comma 平行對齊`}),`。`,(0,r.jsx)(n.code,{children:`animation-timeline: view(), scroll();`}),` 跟 `,(0,r.jsx)(n.code,{children:`animation-range: entry, cover;`}),` 跟 `,(0,r.jsx)(n.code,{children:`animation: a, b;`}),` 三個 list 順序要對。錯位會讓動畫綁到錯的 timeline。`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`Polyfill 不是 100% 等價`}),`。命名 timeline、timeline-scope、複雜 range 在 polyfill 上可能行為不一致。production 用 polyfill 一定要在 Firefox 跑過實機 + 標 known limitations。`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`不要把關鍵內容只放在 scroll animation 內`}),`。scroll-jacking + 沒 scroll 就看不到 = a11y 災難。`,(0,r.jsx)(n.code,{children:`prefers-reduced-motion: reduce`}),` 一定要 fallback 成靜態狀態（demo CSS 內已加）。視覺增強 OK、阻擋資訊不行。`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsxs)(n.strong,{children:[(0,r.jsx)(n.code,{children:`scroll(root block)`}),` 越過中間 scroll containers`]}),`。預設 `,(0,r.jsx)(n.code,{children:`scroll()`}),` 綁最近 scroll 祖先；page 內有 sidebar / modal 等 nested scroll container 時、想綁 document scroll 要明寫 `,(0,r.jsx)(n.code,{children:`scroll(root block)`}),` — `,(0,r.jsx)(n.code,{children:`root`}),` 跳到 document、`,(0,r.jsx)(n.code,{children:`block`}),` 指垂直軸。`]}),`
`]})]})}function g(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}function _(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as n,m as t};