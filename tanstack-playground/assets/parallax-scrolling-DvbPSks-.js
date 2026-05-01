import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{n as t,r as n}from"./lib-BI_-S7V4.js";var r=n(),i=`
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
`;function a(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(`style`,{children:i}),(0,r.jsx)(`div`,{className:`parallax-scroller`,children:(0,r.jsxs)(`div`,{className:`parallax-track`,children:[(0,r.jsxs)(`div`,{className:`parallax-stage`,children:[(0,r.jsx)(`p`,{className:`parallax-hint`,children:`Scroll to see parallax layers`}),(0,r.jsx)(`div`,{className:`parallax-layer`,style:{"--from":`0px`},children:(0,r.jsxs)(`svg`,{viewBox:`0 0 100 30`,preserveAspectRatio:`none`,"aria-hidden":`true`,children:[(0,r.jsx)(`defs`,{children:(0,r.jsxs)(`linearGradient`,{id:`parallax-sky`,x1:`0`,x2:`0`,y1:`0`,y2:`1`,children:[(0,r.jsx)(`stop`,{offset:`0%`,stopColor:`#fbcfe8`}),(0,r.jsx)(`stop`,{offset:`50%`,stopColor:`#f9a8d4`}),(0,r.jsx)(`stop`,{offset:`100%`,stopColor:`#a78bfa`})]})}),(0,r.jsx)(`rect`,{x:`0`,y:`0`,width:`100`,height:`30`,fill:`url(#parallax-sky)`}),(0,r.jsx)(`circle`,{cx:`72`,cy:`12`,r:`4`,fill:`#fde68a`,opacity:`0.95`}),(0,r.jsx)(`circle`,{cx:`72`,cy:`12`,r:`6`,fill:`#fde68a`,opacity:`0.25`})]})}),(0,r.jsx)(`div`,{className:`parallax-layer`,style:{"--from":`10px`},children:(0,r.jsx)(`svg`,{viewBox:`0 0 100 30`,preserveAspectRatio:`none`,"aria-hidden":`true`,children:(0,r.jsxs)(`g`,{fill:`#fdf2f8`,opacity:`0.6`,children:[(0,r.jsx)(`ellipse`,{cx:`18`,cy:`8`,rx:`9`,ry:`2.2`}),(0,r.jsx)(`ellipse`,{cx:`55`,cy:`6`,rx:`11`,ry:`2`}),(0,r.jsx)(`ellipse`,{cx:`88`,cy:`10`,rx:`8`,ry:`2`})]})})}),(0,r.jsx)(`div`,{className:`parallax-layer`,style:{"--from":`16px`},children:(0,r.jsx)(`svg`,{viewBox:`0 0 100 30`,preserveAspectRatio:`none`,"aria-hidden":`true`,children:(0,r.jsxs)(`g`,{fill:`#fce7f3`,opacity:`0.85`,children:[(0,r.jsx)(`ellipse`,{cx:`32`,cy:`14`,rx:`7`,ry:`1.8`}),(0,r.jsx)(`ellipse`,{cx:`32`,cy:`13`,rx:`4`,ry:`1.6`}),(0,r.jsx)(`ellipse`,{cx:`78`,cy:`16`,rx:`9`,ry:`2`}),(0,r.jsx)(`ellipse`,{cx:`78`,cy:`14.5`,rx:`5`,ry:`1.6`})]})})}),(0,r.jsx)(`div`,{className:`parallax-layer`,style:{"--from":`50px`},children:(0,r.jsx)(`svg`,{viewBox:`0 0 100 30`,preserveAspectRatio:`none`,"aria-hidden":`true`,children:(0,r.jsx)(`polygon`,{points:`0,30 0,22 8,18 16,21 24,16 34,20 44,15 54,19 64,17 74,21 84,16 94,20 100,18 100,30`,fill:`#7c6aa3`,opacity:`0.85`})})}),(0,r.jsx)(`div`,{className:`parallax-layer`,style:{"--from":`70px`},children:(0,r.jsx)(`svg`,{viewBox:`0 0 100 30`,preserveAspectRatio:`none`,"aria-hidden":`true`,children:(0,r.jsx)(`polygon`,{points:`0,30 0,25 6,22 14,26 22,20 30,24 40,19 50,23 58,21 68,25 78,20 88,24 96,21 100,23 100,30`,fill:`#4c3f72`})})}),(0,r.jsx)(`div`,{className:`parallax-layer`,style:{"--from":`130px`},children:(0,r.jsxs)(`svg`,{viewBox:`0 0 100 30`,preserveAspectRatio:`none`,"aria-hidden":`true`,children:[(0,r.jsx)(`polygon`,{points:`0,30 0,27 10,25 22,27 36,24 50,26 64,25 78,27 92,25 100,26 100,30`,fill:`#1e1b3a`}),(0,r.jsxs)(`g`,{fill:`#0f172a`,children:[(0,r.jsx)(`polygon`,{points:`6,27 9,22 12,27`}),(0,r.jsx)(`rect`,{x:`8.2`,y:`26.5`,width:`1.5`,height:`2`}),(0,r.jsx)(`polygon`,{points:`20,27 23,21 26,27`}),(0,r.jsx)(`rect`,{x:`22.2`,y:`26.5`,width:`1.5`,height:`2`}),(0,r.jsx)(`polygon`,{points:`42,27 46,20 50,27`}),(0,r.jsx)(`rect`,{x:`45.2`,y:`26.5`,width:`1.5`,height:`2`}),(0,r.jsx)(`polygon`,{points:`60,27 63,22 66,27`}),(0,r.jsx)(`rect`,{x:`62.2`,y:`26.5`,width:`1.5`,height:`2`}),(0,r.jsx)(`polygon`,{points:`74,27 78,20 82,27`}),(0,r.jsx)(`rect`,{x:`77.2`,y:`26.5`,width:`1.5`,height:`2`}),(0,r.jsx)(`polygon`,{points:`90,27 93,22 96,27`}),(0,r.jsx)(`rect`,{x:`92.2`,y:`26.5`,width:`1.5`,height:`2`})]})]})})]}),(0,r.jsx)(`p`,{className:`parallax-scroll-marker`,children:`— end —`})]})})]})}var o=e({default:()=>l,frontmatter:()=>s}),s={title:"Parallax Scrolling (`animation-timeline: scroll()` + per-layer `--from`)",sourceUrl:`https://courses.joshwcomeau.com/wham/03-advanced-interactions/05.05-parallax`,lessonNumber:`03-advanced-interactions/05.05-parallax`,order:9,summary:"6 層 SVG 風景，每層綁同一個 `@keyframes parallax { from { translateY(var(--from)) } }`，但 inline style 給不同的 `--from` 值（天空 0、雲 10/16、遠山 50、中山 70、前景 130）。`animation-timeline: scroll()` 把每層的 0%→100% 進度綁到 scroll container 的捲動進度，scroll 到底所有層歸位 `translateY(0)`。Pre-animation-timeline 時代要 JS 算 scroll position + transform 每層 → jank-prone；現在 CSS-only、smooth。**這個 effect 是 vestibular sensitivity 的頭號兇手，務必 wrap 在 `prefers-reduced-motion: no-preference` 後面**。",tags:[`parallax`,`animation-timeline`,`scroll-driven-animation`,`css-custom-properties`,`prefers-reduced-motion`]};function c(e){let n={code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,span:`span`,strong:`strong`,ul:`ul`,...t(),...e.components},{DemoFrame:i}=n;return i||u(`DemoFrame`,!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`TL;DR`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:`Parallax = 不同「深度」的圖層用不同速度位移：遠的（天空）幾乎不動，近的（前景樹）位移大。視差差異欺騙視覺系統產生「景深」錯覺。`}),`
`,(0,r.jsxs)(n.li,{children:[`Pre-`,(0,r.jsx)(n.code,{children:`animation-timeline`}),` 寫法：JS 監聽 `,(0,r.jsx)(n.code,{children:`scroll`}),`，每幀讀 `,(0,r.jsx)(n.code,{children:`scrollY`}),` 算 `,(0,r.jsx)(n.code,{children:`translate`}),` 套到每層 → main thread bottleneck、容易丟幀。`,(0,r.jsx)(n.code,{children:`animation-timeline: scroll()`}),` 把整套外包給 CSS engine，瀏覽器拿 compositor thread 跑，smooth 到底。`]}),`
`,(0,r.jsxs)(n.li,{children:[`用一份 `,(0,r.jsx)(n.code,{children:`@keyframes parallax { from { transform: translateY(var(--from)); } }`}),` 配 inline style `,(0,r.jsx)(n.code,{children:`style={{ '--from': '50px' }}`}),` — 每層讀自己的 CSS custom property，就地產生不同程度的位移。`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`--from`}),` 值的直覺：scroll 到底時所有層都歸位 `,(0,r.jsx)(n.code,{children:`translateY(0)`}),`，所以 `,(0,r.jsx)(n.code,{children:`--from`}),` 是「scroll 開始時這層比 resting 位置多偏移多少」。值大 = 移動範圍大 = 視覺上「近」；值小 = 幾乎不動 = 視覺上「遠」。`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsxs)(n.strong,{children:[(0,r.jsx)(n.code,{children:`prefers-reduced-motion`}),` 不是 polish 是必要`]}),`。Parallax 在 vestibular sensitivity（前庭敏感、暈眩）的觸發名單上排第一，比一般 motion 嚴重很多。要 wrap 在 `,(0,r.jsx)(n.code,{children:`@media (prefers-reduced-motion: no-preference)`}),` 後面，不然 reduced-motion 使用者直接被晃吐。`]}),`
`]}),`
`,(0,r.jsx)(i,{title:`6-layer SVG landscape — scroll the container`,children:(0,r.jsx)(a,{})}),`
`,(0,r.jsx)(n.p,{children:`往下捲動容器內部，從遠到近依序展開景深：天空幾乎不動、雲微移、遠山中速、前景樹大幅滑出。捲到底時所有層對齊在「resting」位置，看起來變回一張靜態風景。`}),`
`,(0,r.jsx)(n.h2,{children:`為什麼以前做這個會頭痛`}),`
`,(0,r.jsxs)(n.p,{children:[`Pre-`,(0,r.jsx)(n.code,{children:`animation-timeline`}),` 時代的 parallax recipe：`]}),`
`,(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,r.jsxs)(n.code,{children:[(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`window.`}),(0,r.jsx)(n.span,{style:{color:`#6F42C1`},children:`addEventListener`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,r.jsx)(n.span,{style:{color:`#032F62`},children:`'scroll'`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`, () `}),(0,r.jsx)(n.span,{style:{color:`#D73A49`},children:`=>`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#D73A49`},children:`  const`}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:` y`}),(0,r.jsx)(n.span,{style:{color:`#D73A49`},children:` =`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:` window.scrollY;`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`  skyLayer.style.transform `}),(0,r.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,r.jsx)(n.span,{style:{color:`#032F62`},children:" `translateY(${"}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`y`}),(0,r.jsx)(n.span,{style:{color:`#D73A49`},children:` *`}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:` 0.05`}),(0,r.jsx)(n.span,{style:{color:`#032F62`},children:"}px)`"}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`  mountainLayer.style.transform `}),(0,r.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,r.jsx)(n.span,{style:{color:`#032F62`},children:" `translateY(${"}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`y`}),(0,r.jsx)(n.span,{style:{color:`#D73A49`},children:` *`}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:` 0.3`}),(0,r.jsx)(n.span,{style:{color:`#032F62`},children:"}px)`"}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`  treesLayer.style.transform `}),(0,r.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,r.jsx)(n.span,{style:{color:`#032F62`},children:" `translateY(${"}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`y`}),(0,r.jsx)(n.span,{style:{color:`#D73A49`},children:` *`}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:` 0.7`}),(0,r.jsx)(n.span,{style:{color:`#032F62`},children:"}px)`"}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,r.jsx)(n.span,{className:`line`,children:(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`});`})})]})})}),`
`,(0,r.jsx)(n.p,{children:`問題：`}),`
`,(0,r.jsxs)(n.ol,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`scroll`}),` event 在 trackpad / touchscreen 觸發頻率非常高（一秒 100+ 次），每次都跑 JS callback + 寫 style。`]}),`
`,(0,r.jsxs)(n.li,{children:[`寫 `,(0,r.jsx)(n.code,{children:`transform`}),` 強制 layout / paint / composite — 雖然 transform 通常是 compositor-only，但 main thread 排程一爆 frame 就掉。`]}),`
`,(0,r.jsx)(n.li,{children:`結果是「scroll 看起來會卡卡的」— 經典的 jank。一張靜態圖看起來丟了 3–4 幀，立刻被察覺。`}),`
`]}),`
`,(0,r.jsxs)(n.p,{children:[`解法歷代都不漂亮：throttle scroll handler（變不順）、`,(0,r.jsx)(n.code,{children:`requestAnimationFrame`}),` 包一層（緩解但沒治本）、用 IntersectionObserver 配 CSS transition（限制多）。`]}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`animation-timeline: scroll()`}),` 直接把整個機制下放到 CSS engine — 動畫進度跟 scroll progress 綁定，瀏覽器拿 compositor thread 跑，main thread 幾乎不動。`]}),`
`,(0,r.jsxs)(n.h2,{children:[`一份 keyframes，多層各自的 `,(0,r.jsx)(n.code,{children:`--from`})]}),`
`,(0,r.jsx)(n.p,{children:`關鍵 trick 是 CSS custom property 可以塞進 keyframes：`}),`
`,(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,r.jsxs)(n.code,{children:[(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#6F42C1`},children:`.scroller`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`  overflow-y`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`scroll`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`  scroll-timeline-name`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: --parallax-scroll;`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`  scroll-timeline-axis`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`block`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,r.jsx)(n.span,{className:`line`,children:(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`}`})}),`
`,(0,r.jsx)(n.span,{className:`line`}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#D73A49`},children:`@keyframes`}),(0,r.jsx)(n.span,{style:{color:`#E36209`},children:` parallax`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#6F42C1`},children:`  from`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:` { `}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`transform`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`translateY`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`var`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,r.jsx)(n.span,{style:{color:`#E36209`},children:`--from`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`)); }`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#6F42C1`},children:`  to`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`   { `}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`transform`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`translateY`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`0`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`); }`})]}),`
`,(0,r.jsx)(n.span,{className:`line`,children:(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`}`})}),`
`,(0,r.jsx)(n.span,{className:`line`}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#6F42C1`},children:`.layer`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`  position`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`absolute`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`  inset`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`0`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`  animation`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: parallax `}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`linear`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`  animation-timeline`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: --parallax-scroll;`})]}),`
`,(0,r.jsx)(n.span,{className:`line`,children:(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`}`})})]})})}),`
`,(0,r.jsx)(n.p,{children:`兩個踩過的雷：`}),`
`,(0,r.jsxs)(n.ol,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsxs)(n.strong,{children:[`匿名 `,(0,r.jsx)(n.code,{children:`animation-timeline: scroll()`}),` 在 sticky 父容器內解析失敗`]}),`。`,(0,r.jsx)(n.code,{children:`scroll()`}),` 預設綁「nearest scrollable ancestor」，但實測 layer 在 `,(0,r.jsx)(n.code,{children:`position: sticky`}),` 的 stage 內時 Chrome 解不到正確的 scroll source — `,(0,r.jsx)(n.code,{children:`getAnimations()[0].currentTime`}),` 永遠是 `,(0,r.jsx)(n.code,{children:`null`}),`、layer 完全不動。改用 `,(0,r.jsx)(n.strong,{children:`named timeline`}),`（`,(0,r.jsx)(n.code,{children:`scroll-timeline-name: --parallax-scroll`}),` 在 scroller 上 + `,(0,r.jsx)(n.code,{children:`animation-timeline: --parallax-scroll`}),` 在 layer 上）明確綁定就修好。`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsxs)(n.strong,{children:[(0,r.jsx)(n.code,{children:`to`}),` 不要省`]}),`。理論上空 `,(0,r.jsx)(n.code,{children:`to`}),` 該 fallback 到 element baseline (`,(0,r.jsx)(n.code,{children:`translateY(0)`}),`)，但 Chrome 對「keyframe 用 `,(0,r.jsx)(n.code,{children:`var()`}),` + scroll-driven animation」這個組合的 fallback 似乎不穩。寫死 `,(0,r.jsx)(n.code,{children:`to { transform: translateY(0); }`}),` 比較踏實。`]}),`
`]}),`
`,(0,r.jsxs)(n.p,{children:[`每層只要在 inline style 給不同的 `,(0,r.jsx)(n.code,{children:`--from`}),`：`]}),`
`,(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,r.jsxs)(n.code,{children:[(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`<`}),(0,r.jsx)(n.span,{style:{color:`#22863A`},children:`div`}),(0,r.jsx)(n.span,{style:{color:`#6F42C1`},children:` className`}),(0,r.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,r.jsx)(n.span,{style:{color:`#032F62`},children:`"layer"`}),(0,r.jsx)(n.span,{style:{color:`#6F42C1`},children:` style`}),(0,r.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`{{ `}),(0,r.jsx)(n.span,{style:{color:`#032F62`},children:`'--from'`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,r.jsx)(n.span,{style:{color:`#032F62`},children:`'0px'`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:` }}>   {`}),(0,r.jsx)(n.span,{style:{color:`#6A737D`},children:`/* sky */`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`}`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`<`}),(0,r.jsx)(n.span,{style:{color:`#22863A`},children:`div`}),(0,r.jsx)(n.span,{style:{color:`#6F42C1`},children:` className`}),(0,r.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,r.jsx)(n.span,{style:{color:`#032F62`},children:`"layer"`}),(0,r.jsx)(n.span,{style:{color:`#6F42C1`},children:` style`}),(0,r.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`{{ `}),(0,r.jsx)(n.span,{style:{color:`#032F62`},children:`'--from'`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,r.jsx)(n.span,{style:{color:`#032F62`},children:`'10px'`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:` }}>  {`}),(0,r.jsx)(n.span,{style:{color:`#6A737D`},children:`/* far clouds */`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`}`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`<`}),(0,r.jsx)(n.span,{style:{color:`#22863A`},children:`div`}),(0,r.jsx)(n.span,{style:{color:`#6F42C1`},children:` className`}),(0,r.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,r.jsx)(n.span,{style:{color:`#032F62`},children:`"layer"`}),(0,r.jsx)(n.span,{style:{color:`#6F42C1`},children:` style`}),(0,r.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`{{ `}),(0,r.jsx)(n.span,{style:{color:`#032F62`},children:`'--from'`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,r.jsx)(n.span,{style:{color:`#032F62`},children:`'16px'`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:` }}>  {`}),(0,r.jsx)(n.span,{style:{color:`#6A737D`},children:`/* near clouds */`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`}`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`<`}),(0,r.jsx)(n.span,{style:{color:`#22863A`},children:`div`}),(0,r.jsx)(n.span,{style:{color:`#6F42C1`},children:` className`}),(0,r.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,r.jsx)(n.span,{style:{color:`#032F62`},children:`"layer"`}),(0,r.jsx)(n.span,{style:{color:`#6F42C1`},children:` style`}),(0,r.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`{{ `}),(0,r.jsx)(n.span,{style:{color:`#032F62`},children:`'--from'`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,r.jsx)(n.span,{style:{color:`#032F62`},children:`'50px'`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:` }}>  {`}),(0,r.jsx)(n.span,{style:{color:`#6A737D`},children:`/* far mountains */`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`}`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`<`}),(0,r.jsx)(n.span,{style:{color:`#22863A`},children:`div`}),(0,r.jsx)(n.span,{style:{color:`#6F42C1`},children:` className`}),(0,r.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,r.jsx)(n.span,{style:{color:`#032F62`},children:`"layer"`}),(0,r.jsx)(n.span,{style:{color:`#6F42C1`},children:` style`}),(0,r.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`{{ `}),(0,r.jsx)(n.span,{style:{color:`#032F62`},children:`'--from'`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,r.jsx)(n.span,{style:{color:`#032F62`},children:`'70px'`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:` }}>  {`}),(0,r.jsx)(n.span,{style:{color:`#6A737D`},children:`/* mid mountains */`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`}`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`<`}),(0,r.jsx)(n.span,{style:{color:`#22863A`},children:`div`}),(0,r.jsx)(n.span,{style:{color:`#6F42C1`},children:` className`}),(0,r.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,r.jsx)(n.span,{style:{color:`#032F62`},children:`"layer"`}),(0,r.jsx)(n.span,{style:{color:`#6F42C1`},children:` style`}),(0,r.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`{{ `}),(0,r.jsx)(n.span,{style:{color:`#032F62`},children:`'--from'`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,r.jsx)(n.span,{style:{color:`#032F62`},children:`'130px'`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:` }}> {`}),(0,r.jsx)(n.span,{style:{color:`#6A737D`},children:`/* foreground */`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`}`})]})]})})}),`
`,(0,r.jsxs)(n.p,{children:[`CSS engine 看到 keyframe 內的 `,(0,r.jsx)(n.code,{children:`var(--from)`}),`，會去讀`,(0,r.jsx)(n.strong,{children:`每個 element 自己的`}),` `,(0,r.jsx)(n.code,{children:`--from`}),` 值。一份 keyframe 定義服務六層，每層位移不同。`]}),`
`,(0,r.jsxs)(n.p,{children:[`TS 上 `,(0,r.jsx)(n.code,{children:`style={{ '--from': '50px' }}`}),` 會被 React 的 type 拒絕，因為 `,(0,r.jsx)(n.code,{children:`--from`}),` 不在 `,(0,r.jsx)(n.code,{children:`CSSProperties`}),`。我這個 demo 用 `,(0,r.jsx)(n.code,{children:`style={{ '--from': '50px' } as LayerStyle}`}),` 把它 cast 成擴充過的 type；也可以用 `,(0,r.jsx)(n.code,{children:`as React.CSSProperties`}),` 強制蓋掉，看你 codebase 的偏好。`]}),`
`,(0,r.jsxs)(n.h2,{children:[(0,r.jsx)(n.code,{children:`--from`}),` 值怎麼挑`]}),`
`,(0,r.jsxs)(n.p,{children:[`Scroll 到底時所有層都到 `,(0,r.jsx)(n.code,{children:`translateY(0)`}),`（也就是 keyframes 的 `,(0,r.jsx)(n.code,{children:`to`}),` / element baseline）。所以 `,(0,r.jsx)(n.code,{children:`--from`}),` 是「scroll 起點時這層比 resting 多偏移幾 px」。`]}),`
`,(0,r.jsx)(n.p,{children:`直覺映射：`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[`遠的東西在現實中視差小（看遠方雲，車跑了 10 公尺位置幾乎沒變）→ `,(0,r.jsx)(n.code,{children:`--from`}),` 小`]}),`
`,(0,r.jsxs)(n.li,{children:[`近的東西視差大（看路邊樹，車跑了 10 公尺整個刷過去）→ `,(0,r.jsx)(n.code,{children:`--from`}),` 大`]}),`
`]}),`
`,(0,r.jsxs)(n.p,{children:[`我這個 demo 用 `,(0,r.jsx)(n.code,{children:`0 / 10 / 16 / 50 / 70 / 130`}),`，從天空到前景樹差近 130 倍。實際數字是 vibes-based — 拉到不舒服就改小、看不出視差就改大。Comeau 課程也是直接給數字，沒有公式。`]}),`
`,(0,r.jsx)(n.h2,{children:`sticky 容器讓圖層留在畫面上`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`animation-timeline: scroll()`}),` 預設綁定`,(0,r.jsx)(n.strong,{children:`最近的可捲動祖先`}),`的 scroll 進度。但圖層本身要怎麼留在使用者視線範圍內？兩個寫法：`]}),`
`,(0,r.jsxs)(n.ol,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`position: fixed`}),`：圖層脫離 layout 釘在 viewport，scroll 時圖層不會被捲走。`,(0,r.jsx)(n.strong,{children:`問題`}),`：fixed 是相對 viewport，圖層會蓋掉整個頁面，不是只蓋 demo 容器。`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`position: sticky`}),` + 有 `,(0,r.jsx)(n.code,{children:`overflow`}),` 的祖先：圖層會在祖先範圍內被「黏住」上緣，捲到祖先邊界外就跟著走。我這個 demo 走 sticky 路線。`]}),`
`]}),`
`,(0,r.jsx)(n.p,{children:`我的 DOM 結構：`}),`
`,(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,r.jsxs)(n.code,{children:[(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`<`}),(0,r.jsx)(n.span,{style:{color:`#22863A`},children:`div`}),(0,r.jsx)(n.span,{style:{color:`#6F42C1`},children:` class`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`=`}),(0,r.jsx)(n.span,{style:{color:`#032F62`},children:`"parallax-scroller"`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`>          `}),(0,r.jsx)(n.span,{style:{color:`#6A737D`},children:`<!-- overflow:scroll, height:320 -->`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`  <`}),(0,r.jsx)(n.span,{style:{color:`#22863A`},children:`div`}),(0,r.jsx)(n.span,{style:{color:`#6F42C1`},children:` class`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`=`}),(0,r.jsx)(n.span,{style:{color:`#032F62`},children:`"parallax-track"`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`>           `}),(0,r.jsx)(n.span,{style:{color:`#6A737D`},children:`<!-- height:1200, 提供 scroll range -->`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`    <`}),(0,r.jsx)(n.span,{style:{color:`#22863A`},children:`div`}),(0,r.jsx)(n.span,{style:{color:`#6F42C1`},children:` class`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`=`}),(0,r.jsx)(n.span,{style:{color:`#032F62`},children:`"parallax-stage"`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`>         `}),(0,r.jsx)(n.span,{style:{color:`#6A737D`},children:`<!-- position:sticky, top:0, height:320 -->`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`      <`}),(0,r.jsx)(n.span,{style:{color:`#22863A`},children:`div`}),(0,r.jsx)(n.span,{style:{color:`#6F42C1`},children:` class`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`=`}),(0,r.jsx)(n.span,{style:{color:`#032F62`},children:`"parallax-layer"`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`>...</`}),(0,r.jsx)(n.span,{style:{color:`#22863A`},children:`div`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`>   `}),(0,r.jsx)(n.span,{style:{color:`#6A737D`},children:`<!-- 6 個 absolute 圖層 -->`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`    </`}),(0,r.jsx)(n.span,{style:{color:`#22863A`},children:`div`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`>`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`  </`}),(0,r.jsx)(n.span,{style:{color:`#22863A`},children:`div`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`>`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`</`}),(0,r.jsx)(n.span,{style:{color:`#22863A`},children:`div`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`>`})]})]})})}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`.parallax-track`}),` 是 1200px 高的「捲動跑道」、`,(0,r.jsx)(n.code,{children:`.parallax-stage`}),` 用 sticky 在跑道上端釘住可視區、6 個 layer 是 stage 的 absolute 子元素。User 捲動時 stage 釘在頂部 → 看起來整個風景卡在畫面上、layer 各自 transform 產生視差。`]}),`
`,(0,r.jsx)(n.h2,{children:`browser support 怎麼降級`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`animation-timeline`}),` 在 2024–2025 才陸續普及。Chrome / Edge 已支援，Firefox / Safari 還在路上（2026 上半年觀察 Firefox 已 ship、Safari 有 flag）。沒支援的瀏覽器拿到 `,(0,r.jsx)(n.code,{children:`animation-timeline: scroll()`}),` 會直接忽略 — 結果是 layer `,(0,r.jsx)(n.strong,{children:`全部停在 baseline`}),`（`,(0,r.jsx)(n.code,{children:`translateY(0)`}),`），看起來是一張正常風景圖、沒有視差但也沒壞。Graceful 降級不需要寫額外 fallback。`]}),`
`,(0,r.jsxs)(n.p,{children:[`不過要注意 `,(0,r.jsx)(n.code,{children:`var(--from)`}),` 在 keyframe 內部目前 polyfill 並不友善 — 如果想 polyfill 給舊瀏覽器，CSS custom property 在 keyframes 的取值時機通常拿不到，會變每層 `,(0,r.jsx)(n.code,{children:`translateY(0)`}),` 沒視差，跟 baseline 一樣。換句話說：要嘛裝最新瀏覽器吃原生支援，要嘛就接受是平面圖 — 別嘗試 polyfill 這套。`]}),`
`,(0,r.jsx)(n.h2,{children:`prefers-reduced-motion 是不能省的`}),`
`,(0,r.jsxs)(n.p,{children:[`Comeau 在課裡明說這不是 grey area：parallax 是 `,(0,r.jsx)(n.strong,{children:`vestibular motion sickness 的頭號觸發`}),`，比一般 transition 嚴重很多。前庭敏感的人遇到 parallax 不是「覺得有點晃」，是會立刻頭暈反胃。一定要 wrap：`]}),`
`,(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,r.jsxs)(n.code,{children:[(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#D73A49`},children:`@media`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:` (prefers-reduced-motion: no-preference) {`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#6F42C1`},children:`  .parallax-layer`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`    animation`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: parallax `}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`linear`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,r.jsxs)(n.span,{className:`line`,children:[(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`    animation-timeline`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,r.jsx)(n.span,{style:{color:`#005CC5`},children:`scroll`}),(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`();`})]}),`
`,(0,r.jsx)(n.span,{className:`line`,children:(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`  }`})}),`
`,(0,r.jsx)(n.span,{className:`line`,children:(0,r.jsx)(n.span,{style:{color:`#24292E`},children:`}`})})]})})}),`
`,(0,r.jsxs)(n.p,{children:[`注意 query 寫的是 `,(0,r.jsx)(n.code,{children:`no-preference`}),` 不是 `,(0,r.jsx)(n.code,{children:`reduce`}),` — 這樣預設是「不開」、只有 user 明確沒設定 reduced-motion 才開。比 `,(0,r.jsx)(n.code,{children:`@media (prefers-reduced-motion: reduce) { animation: none; }`}),` 安全：那種寫法如果 user 還沒選擇偏好（某些舊瀏覽器、某些 OS），會 fall through 到開啟 — 違反 a11y safe-by-default 原則。`]}),`
`,(0,r.jsx)(n.h2,{children:`Gotchas`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsxs)(n.strong,{children:[`匿名 `,(0,r.jsx)(n.code,{children:`scroll()`}),` 配 sticky 父容器會啞掉`]}),`。layer 在 `,(0,r.jsx)(n.code,{children:`position: sticky`}),` 的 stage 裡時，`,(0,r.jsx)(n.code,{children:`animation-timeline: scroll()`}),` 預設的「nearest scrollable ancestor」解析機制在 Chrome 上拿不到實際 scroll source — `,(0,r.jsx)(n.code,{children:`getAnimations()[0].currentTime`}),` 永遠 null、layer 完全不動。修法：scroller 上 `,(0,r.jsx)(n.code,{children:`scroll-timeline-name: --foo`}),`、layer 上 `,(0,r.jsx)(n.code,{children:`animation-timeline: --foo`}),`，明確綁定。Debug 訊號：在 console `,(0,r.jsx)(n.code,{children:`el.getAnimations()[0].currentTime`}),` 看是不是 null，是的話就是這個雷。`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsxs)(n.strong,{children:[`keyframe `,(0,r.jsx)(n.code,{children:`to`}),` 不要靠 implicit fallback`]}),`。理論上空 `,(0,r.jsx)(n.code,{children:`to`}),` 該 fallback 到 element baseline，但 Chrome 對「`,(0,r.jsx)(n.code,{children:`var()`}),` + scroll-driven animation」這個組合的 fallback 不穩，computed transform 直接 `,(0,r.jsx)(n.code,{children:`none`}),`。寫死 `,(0,r.jsx)(n.code,{children:`to { transform: translateY(0); }`}),` 一勞永逸。`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsxs)(n.strong,{children:[(0,r.jsx)(n.code,{children:`prefers-reduced-motion: no-preference`}),` 是 mandatory, 不是 nice-to-have`]}),`。Parallax 在前庭敏感觸發名單排第一，課程 explicit 拉出來講「這不是 grey area」。Wrap 整段 `,(0,r.jsx)(n.code,{children:`animation`}),` + `,(0,r.jsx)(n.code,{children:`animation-timeline`}),` 在 `,(0,r.jsx)(n.code,{children:`no-preference`}),` query 後面，預設關，user 明確 opt-in 才開。`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`CSS custom property 在 keyframes 的 polyfill 不可靠`}),`。`,(0,r.jsx)(n.code,{children:`@keyframes`}),` 用 `,(0,r.jsx)(n.code,{children:`var(--from)`}),` 大部分 polyfill（包括 Bramus 的 `,(0,r.jsx)(n.code,{children:`scroll-timeline.js`}),`）拿不到 element-scope 的值、退化成 0。降級路徑就是平面圖，別硬 polyfill。`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsxs)(n.strong,{children:[(0,r.jsx)(n.code,{children:`position: sticky`}),` 受 overflow scope 限制`]}),`。Sticky 黏的是「最近有 scroll 機制的祖先」，跟 `,(0,r.jsx)(n.code,{children:`position: fixed`}),` 不一樣（fixed 直接黏 viewport）。如果 demo 容器外有自己的 transform / opacity / filter，會 break sticky context — sticky 元素會直接變 static。`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`Layer 順序 = DOM 順序 = z-stacking 順序`}),`。最後一個 layer 蓋住前面，所以 DOM 內要從遠（天空）到近（前景樹）依序排，`,(0,r.jsx)(n.code,{children:`absolute`}),` + `,(0,r.jsx)(n.code,{children:`inset: 0`}),` 自然堆疊。不要靠 `,(0,r.jsx)(n.code,{children:`z-index`}),` 排，layer 數一多 z-index 失控。`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsxs)(n.strong,{children:[(0,r.jsx)(n.code,{children:`--from`}),` 數字憑感覺挑、沒公式`]}),`。我這個 demo 用 `,(0,r.jsx)(n.code,{children:`0 / 10 / 16 / 50 / 70 / 130`}),` 跨 6 層；課程示範也是手工 tune。理論上可以用 `,(0,r.jsx)(n.code,{children:`1 / depth`}),` 之類 formula 但實務沒人這樣寫 — 直接看畫面調最快。`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`Horizontal parallax 也成立`}),`。`,(0,r.jsx)(n.code,{children:`@keyframes`}),` 改 `,(0,r.jsx)(n.code,{children:`translateX(var(--from))`}),` 即可，配 `,(0,r.jsx)(n.code,{children:`animation-timeline: scroll(inline)`}),` 抓水平 scroll。Web 上少見（垂直 scroll 是預設 mental model），但遊戲 side-scroller 概念一樣。`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsxs)(n.strong,{children:[(0,r.jsx)(n.code,{children:`image-rendering: pixelated`}),` 只對 raster 有用`]}),`。如果用 PNG / pixel-art sprites 想保持 pixelated 銳利，加這個避免 GPU 縮放糊掉；但 SVG 是向量，scale 不需要這個 hint，加了沒影響。`]}),`
`]})]})}function l(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}function u(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{o as n,s as t};