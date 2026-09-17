import{i as e,n as t,o as n,r,s as i}from"./lib-YcyfOEfe.js";import{n as a}from"./canvas-Ds0p6qbM.js";import{t as o}from"./random-CLvj9KOS.js";var s=i(e(),1),c=r(),l=50,u=10,d=200,f=()=>!window.matchMedia(`(prefers-reduced-motion: no-preference)`).matches,p=`
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
`;function m(){let e=(0,s.useRef)(null),t=(0,s.useRef)(null),n=(0,s.useRef)(null);return(0,s.useEffect)(()=>{let r=e.current,i=t.current,s=n.current;if(!r||!i||!s)return;let c=!1,p=window.setInterval(()=>{if(!c)return;let e=document.createElement(`div`);e.classList.add(`kirby-particle`),e.style.setProperty(`--angle`,`${o(0,360)}deg`),e.style.setProperty(`--distance`,`${o(50,200)}px`),i.prepend(e)},l),m=e=>{s.setPointerCapture(e.pointerId),!f()&&(c=!0)},h=()=>{c=!1;let e=[...i.querySelectorAll(`.kirby-particle:not(.kirby-exploded)`)];if(e.length<u)return;e.forEach((e,t)=>{if(t>d){e.remove();return}e.classList.add(`kirby-exploded`),e.style.backgroundColor=`white`,e.style.setProperty(`--size`,`${o(5,20)}px`),e.style.setProperty(`--explode-duration`,`${o(200,600)}ms`),e.style.setProperty(`--explode-delay`,`${o(0,100)}ms`),e.style.setProperty(`--twinkle-duration`,`${o(100,300)}ms`),e.style.setProperty(`--fade-duration`,`${o(800,2500)}ms`),e.style.setProperty(`--fade-delay`,`${o(500,1200)}ms`),e.addEventListener(`animationend`,t=>{t.animationName===`kirby-fadeToTransparent`&&e.remove()})}),[...r.querySelectorAll(`.kirby-popCircle`)].forEach(e=>e.remove());let t=document.createElement(`div`);t.classList.add(`kirby-popCircle`),t.style.setProperty(`--size`,`${a(e.length,0,d,0,400)}px`),r.prepend(t)};return s.addEventListener(`pointerdown`,m),s.addEventListener(`pointerup`,h),s.addEventListener(`pointercancel`,h),()=>{window.clearInterval(p),s.removeEventListener(`pointerdown`,m),s.removeEventListener(`pointerup`,h),s.removeEventListener(`pointercancel`,h)}},[]),(0,c.jsxs)(`div`,{className:`flex flex-col items-center gap-3`,children:[(0,c.jsx)(`style`,{children:p}),(0,c.jsx)(`div`,{ref:e,className:`relative flex h-[440px] w-full items-center justify-center overflow-hidden rounded-md`,style:{background:`hsl(210deg 15% 6%)`},children:(0,c.jsx)(`div`,{ref:t,className:`kirby-buttonWrapper`,children:(0,c.jsxs)(`button`,{ref:n,type:`button`,className:`kirby-trigger`,children:[(0,c.jsx)(`span`,{className:`kirby-fillIndicator`}),(0,c.jsx)(`span`,{className:`kirby-text`,children:`Trigger`})]})})}),(0,c.jsx)(`p`,{className:`text-xs text-gray-500`,children:`按住按鈕 1 到 3 秒再放開。按越久吸越多粒子，爆炸越大。少於 10 顆不會爆。`})]})}var h=n({default:()=>v,frontmatter:()=>g}),g={title:`Inhale and Explode (two-stage DOM particles)`,sourceUrl:`https://courses.joshwcomeau.com/wham/animation-challenges/01-kirby`,lessonNumber:`animation-challenges/01-kirby`,order:1,summary:"按住按鈕時粉紅粒子被吸進去，放開時同一批粒子變白、飛回原位、邊閃邊淡出。關鍵是一對 partial keyframe：`suckIn` 只寫 `from`、`explode` 只寫 `to`，兩條都讀同一組 `--angle` / `--distance`，所以加一個 class 就能反轉方向。",tags:[`particles`,`partial-keyframes`,`css-variables`,`two-stage`,`polar-coordinates`,`pop-circle`,`prefers-reduced-motion`]};function _(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,span:`span`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components},{DemoFrame:r}=n;return r||y(`DemoFrame`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n.h2,{children:`TL;DR`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[`兩個階段靠一對 `,(0,c.jsx)(n.strong,{children:`partial keyframe`}),`：`,(0,c.jsx)(n.code,{children:`suckIn`}),` 只寫 `,(0,c.jsx)(n.code,{children:`from`}),`（從落點飛回元素原本的中心），`,(0,c.jsx)(n.code,{children:`explode`}),` 只寫 `,(0,c.jsx)(n.code,{children:`to`}),`（從中心飛到落點）。兩條都讀同一組 `,(0,c.jsx)(n.code,{children:`--angle`}),` / `,(0,c.jsx)(n.code,{children:`--distance`}),`。放開時替粒子加上 `,(0,c.jsx)(n.code,{children:`.kirby-exploded`}),`，同一顆 DOM node 就換成反方向的動畫，每顆都回到自己出生的位置。`]}),`
`,(0,c.jsxs)(n.li,{children:[`極座標直接在 CSS 裡算：`,(0,c.jsx)(n.code,{children:`translate(calc(cos(var(--angle)) * var(--distance)), ...)`}),`。JS 只寫兩個 CSS 變數，完全不用 `,(0,c.jsx)(n.code,{children:`convertPolarToCartesian`}),`。`]}),`
`,(0,c.jsxs)(n.li,{children:[`生成用一個一直在跑的 `,(0,c.jsx)(n.code,{children:`setInterval(fn, 50)`}),` 配 `,(0,c.jsx)(n.code,{children:`isRunning`}),` flag。放開時用 `,(0,c.jsx)(n.code,{children:`querySelectorAll('.kirby-particle:not(.kirby-exploded)')`}),` 撿回這一輪吸進來的粒子，排除上一輪還在閃的。`]}),`
`,(0,c.jsxs)(n.li,{children:[`按鈕裡的粉紅液體完全不用 JS：`,(0,c.jsx)(n.code,{children:`.kirby-trigger:active`}),` 換一組 transition，按住時 `,(0,c.jsx)(n.code,{children:`3000ms`}),` 加 `,(0,c.jsx)(n.code,{children:`500ms`}),` delay 慢慢 `,(0,c.jsx)(n.code,{children:`scaleY(1)`}),`，放開時 `,(0,c.jsx)(n.code,{children:`500ms`}),` 快速退掉。`]}),`
`,(0,c.jsxs)(n.li,{children:[`三個門檻用常數命名：`,(0,c.jsx)(n.code,{children:`SPAWN_INTERVAL = 50`}),`、`,(0,c.jsx)(n.code,{children:`MIN_PARTICLES = 10`}),`、`,(0,c.jsx)(n.code,{children:`MAX_PARTICLES = 200`}),`。Pop circle 直徑是 `,(0,c.jsx)(n.code,{children:`clampedNormalize(count, 0, MAX_PARTICLES, 0, 400)`}),`，吸越多炸越大。`]}),`
`]}),`
`,(0,c.jsx)(r,{title:`Hold to inhale, release to explode`,children:(0,c.jsx)(m,{})}),`
`,(0,c.jsx)(n.h2,{children:`Spec`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsx)(n.li,{children:`按住按鈕時，每 50ms 生一顆粉紅粒子。起點是以按鈕中心為準的隨機 angle / distance，然後往中心飛。`}),`
`,(0,c.jsx)(n.li,{children:`放開時，所有吸進來的粒子往外炸，很快回到各自的起點。炸開後粒子變白，一邊閃爍一邊淡出。`}),`
`,(0,c.jsx)(n.li,{children:`兩個階段用同一批粒子。按得短，吸得少，炸得也少。`}),`
`,(0,c.jsx)(n.li,{children:`按鈕裡有一塊粉紅色從底部長高，像被粒子液體填滿。開始前稍微延遲，因為第一批粒子要時間飛到。放開時很快退掉。`}),`
`,(0,c.jsx)(n.li,{children:`放開時有一個 pop circle，跟 Accessories 那課一樣。它的大小取決於吸進來的粒子數。`}),`
`,(0,c.jsx)(n.li,{children:`粒子太少就不爆炸。超過 200 顆時只炸 200 顆，其餘直接從 DOM 移除，避免同時動太多元素。`}),`
`,(0,c.jsx)(n.li,{children:`對 motion-sensitive 的使用者關掉這個動畫。`}),`
`]}),`
`,(0,c.jsx)(n.h2,{children:`Technique map`}),`
`,(0,c.jsxs)(n.table,{children:[(0,c.jsx)(n.thead,{children:(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.th,{children:`需求`}),(0,c.jsx)(n.th,{children:`技巧`}),(0,c.jsx)(n.th,{children:`筆記`})]})}),(0,c.jsxs)(n.tbody,{children:[(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`隨機起點，分佈成甜甜圈而不是正方形`}),(0,c.jsx)(n.td,{children:`angle + distance 極座標`}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.a,{href:`/wham/particles/polar-coordinates`,children:`Polar Coordinates`})})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`由 angle 算出 x / y`}),(0,c.jsxs)(n.td,{children:[(0,c.jsx)(n.code,{children:`cos`}),` / `,(0,c.jsx)(n.code,{children:`sin`}),`，這裡改用 CSS 的 `,(0,c.jsx)(n.code,{children:`cos()`}),` / `,(0,c.jsx)(n.code,{children:`sin()`})]}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.a,{href:`/wham/particles/trigonometry-101`,children:`Trigonometry 101`})})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`同一條 keyframe、每顆粒子不同位移`}),(0,c.jsxs)(n.td,{children:[`keyframe 裡讀 `,(0,c.jsx)(n.code,{children:`var(--angle)`}),` / `,(0,c.jsx)(n.code,{children:`var(--distance)`})]}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.a,{href:`/wham/particles/dynamic-keyframes`,children:`Dynamic Keyframes`})})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsxs)(n.td,{children:[`吸入只寫 `,(0,c.jsx)(n.code,{children:`from`}),`、爆炸只寫 `,(0,c.jsx)(n.code,{children:`to`})]}),(0,c.jsx)(n.td,{children:`partial keyframes`}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.a,{href:`/wham/particles/partial-keyframes`,children:`Partial Keyframes`})})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`從中心往外飛，以及把方向反過來`}),(0,c.jsx)(n.td,{children:`dispersion`}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.a,{href:`/wham/particles/dispersion`,children:`Dispersion`})})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`粒子疊在按鈕正中央`}),(0,c.jsxs)(n.td,{children:[(0,c.jsx)(n.code,{children:`position: absolute; inset: 0; margin: auto`}),` + `,(0,c.jsx)(n.code,{children:`transform`})]}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.a,{href:`/wham/particles/alternative-approach`,children:`Alternative Approach`})})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`吸入加速、爆炸急停`}),(0,c.jsxs)(n.td,{children:[`自訂 `,(0,c.jsx)(n.code,{children:`cubic-bezier`})]}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.a,{href:`/wham/particles/custom-curves`,children:`Custom Curves`})})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`size / duration / delay 每顆都不同`}),(0,c.jsx)(n.td,{children:`每個屬性各自亂數`}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.a,{href:`/wham/particles/tweaks`,children:`Tweaking Dynamics`})})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`白色粒子邊閃邊淡出`}),(0,c.jsxs)(n.td,{children:[(0,c.jsx)(n.code,{children:`sparkle`}),` infinite alternate 疊 `,(0,c.jsx)(n.code,{children:`fadeToTransparent`})]}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.a,{href:`/wham/particles/partial-keyframes`,children:`Partial Keyframes`})})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`Pop circle`}),(0,c.jsxs)(n.td,{children:[(0,c.jsx)(n.code,{children:`fromShrunken`}),` + 延遲的 `,(0,c.jsx)(n.code,{children:`fadeToTransparent`})]}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.a,{href:`/wham/particles/accessories`,children:`Accessories`})})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`Pop circle 大小跟粒子數掛鉤`}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.code,{children:`clampedNormalize`})}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.a,{href:`/wham/particles/lerp-utils`,children:`Utility Functions`})})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`按鈕被液體填滿`}),(0,c.jsxs)(n.td,{children:[(0,c.jsx)(n.code,{children:`:active`}),` 切換 transition + `,(0,c.jsx)(n.code,{children:`scaleY`}),`（hint 也提到可用 `,(0,c.jsx)(n.code,{children:`clip-path`}),`）`]}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.a,{href:`/wham/advanced-interactions/wipe-effects`,children:`Wipe Effects`})})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`超過上限的粒子立刻移除、淡出後清掉`}),(0,c.jsxs)(n.td,{children:[`DOM cleanup，`,(0,c.jsx)(n.code,{children:`animationend`}),` 過濾 `,(0,c.jsx)(n.code,{children:`animationName`})]}),(0,c.jsxs)(n.td,{children:[(0,c.jsx)(n.a,{href:`/wham/particles/cleanup`,children:`Particle Cleanup`}),`、`,(0,c.jsx)(n.a,{href:`/wham/advanced-interactions/ripple-button`,children:`Ripple Button`})]})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`關掉動畫`}),(0,c.jsxs)(n.td,{children:[`JS 用 `,(0,c.jsx)(n.code,{children:`matchMedia`}),` 擋掉生成；CSS 預設不動，`,(0,c.jsx)(n.code,{children:`no-preference`}),` 才開`]}),(0,c.jsx)(n.td,{children:(0,c.jsx)(n.a,{href:`/wham/particles/motion-accessibility`,children:`Motion Accessibility`})})]}),(0,c.jsxs)(n.tr,{children:[(0,c.jsx)(n.td,{children:`偵測「按住」`}),(0,c.jsxs)(n.td,{children:[(0,c.jsx)(n.code,{children:`pointerdown`}),` / `,(0,c.jsx)(n.code,{children:`pointerup`}),` 切 flag + 固定間隔的 `,(0,c.jsx)(n.code,{children:`setInterval`})]}),(0,c.jsx)(n.td,{children:`沒有專門的筆記`})]})]})]}),`
`,(0,c.jsx)(n.h2,{children:`Build order`}),`
`,(0,c.jsx)(n.p,{children:`Josh 建議先把三塊機制做出來，細節之後再磨：`}),`
`,(0,c.jsxs)(n.ol,{children:[`
`,(0,c.jsx)(n.li,{children:`按住時生成往內吸的粉紅粒子。`}),`
`,(0,c.jsx)(n.li,{children:`放開時把吸進來的粒子全部炸開。`}),`
`,(0,c.jsx)(n.li,{children:`補上配件：按鈕裡的液體填充，還有 pop circle。`}),`
`]}),`
`,(0,c.jsxs)(`details`,{children:[(0,c.jsx)(`summary`,{children:`Hint 1 — 按住時生成粒子`}),(0,c.jsxs)(n.p,{children:[`在按鈕上聽 `,(0,c.jsx)(n.code,{children:`pointerdown`}),` / `,(0,c.jsx)(n.code,{children:`pointerup`}),`，只負責切一個 boolean（例如 `,(0,c.jsx)(n.code,{children:`isPressing`}),`）。`]}),(0,c.jsxs)(n.p,{children:[`生成邏輯放在 handler 外面：一個每 50ms 跑一次的 `,(0,c.jsx)(n.code,{children:`setInterval`}),`，flag 是 true 就生一顆，否則什麼都不做。`]}),(0,c.jsxs)(n.p,{children:[`粒子本身沿用 Part 1 的 polar coordinates 發散寫法，只是方向相反，所以 keyframe 的 `,(0,c.jsx)(n.code,{children:`from`}),` / `,(0,c.jsx)(n.code,{children:`to`}),` 要對調。`]})]}),`
`,(0,c.jsxs)(`details`,{children:[(0,c.jsx)(`summary`,{children:`Hint 2 — 放開時炸開`}),(0,c.jsx)(n.p,{children:`不必替每顆粒子重新抽 angle / distance。沿用原本那組就好看了：每顆粒子等於「回家」，飛回它出生的地方。`}),(0,c.jsx)(n.p,{children:`做法是在爆炸時替粒子加一個 class，這個 class 套另一條 keyframe：這次是「飛到」angle / distance，而不是「從」那裡飛來。`})]}),`
`,(0,c.jsxs)(`details`,{children:[(0,c.jsx)(`summary`,{children:`Hint 3 — 按鈕裡的液體`}),(0,c.jsxs)(n.p,{children:[`在按鈕裡加一個 `,(0,c.jsx)(n.code,{children:`<span>`}),`。可以用 `,(0,c.jsx)(n.code,{children:`clip-path`}),`（Wipe Effects 那課），也可以用 `,(0,c.jsx)(n.code,{children:`transform: scaleY()`}),` 從 0 長到 1。`]}),(0,c.jsxs)(n.p,{children:[`預設狀態完全壓扁（或完全裁掉），按住時才顯示。兩個狀態之間用很長 duration 的 CSS transition 切換：按住時慢慢長，放開時快速縮回。`,(0,c.jsx)(n.code,{children:`transform-origin`}),` 要設在底部，才會從下往上長。`]})]}),`
`,(0,c.jsx)(n.h2,{children:`Why one class flips the direction`}),`
`,(0,c.jsx)(n.p,{children:`兩條 keyframe 讀的是同一組變數，差別只在寫了哪一端：`}),`
`,(0,c.jsx)(c.Fragment,{children:(0,c.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,c.jsxs)(n.code,{children:[(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#D73A49`},children:`@keyframes`}),(0,c.jsx)(n.span,{style:{color:`#E36209`},children:` kirby-suckIn`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`  from`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`    transform`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`translate`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`      calc`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`cos`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`var`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#E36209`},children:`--angle`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`)) `}),(0,c.jsx)(n.span,{style:{color:`#D73A49`},children:`*`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:` var`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#E36209`},children:`--distance`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`)),`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`      calc`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`sin`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`var`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#E36209`},children:`--angle`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`)) `}),(0,c.jsx)(n.span,{style:{color:`#D73A49`},children:`*`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:` var`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#E36209`},children:`--distance`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`))`})]}),`
`,(0,c.jsx)(n.span,{className:`line`,children:(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`    );`})}),`
`,(0,c.jsx)(n.span,{className:`line`,children:(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`  }`})}),`
`,(0,c.jsx)(n.span,{className:`line`,children:(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`}`})}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#D73A49`},children:`@keyframes`}),(0,c.jsx)(n.span,{style:{color:`#E36209`},children:` kirby-explode`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`  to`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`    transform`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`translate`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`      calc`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`cos`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`var`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#E36209`},children:`--angle`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`)) `}),(0,c.jsx)(n.span,{style:{color:`#D73A49`},children:`*`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:` var`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#E36209`},children:`--distance`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`)),`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`      calc`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`sin`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`var`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#E36209`},children:`--angle`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`)) `}),(0,c.jsx)(n.span,{style:{color:`#D73A49`},children:`*`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:` var`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#E36209`},children:`--distance`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`))`})]}),`
`,(0,c.jsx)(n.span,{className:`line`,children:(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`    );`})}),`
`,(0,c.jsx)(n.span,{className:`line`,children:(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`  }`})}),`
`,(0,c.jsx)(n.span,{className:`line`,children:(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`}`})})]})})}),`
`,(0,c.jsxs)(n.p,{children:[`粒子用 `,(0,c.jsx)(n.code,{children:`inset: 0; margin: auto`}),` 疊在按鈕正中央，本身沒有 `,(0,c.jsx)(n.code,{children:`transform`}),`。`]}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:`suckIn`}),` 缺 `,(0,c.jsx)(n.code,{children:`to`}),`，所以終點是元素自己的值 `,(0,c.jsx)(n.code,{children:`none`}),`，也就是中心。配 `,(0,c.jsx)(n.code,{children:`forwards`}),`，粒子吸完就停在中心。`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:`explode`}),` 缺 `,(0,c.jsx)(n.code,{children:`from`}),`，所以起點是當下的值，也是中心。終點則是當初出生的位置。`]}),`
`]}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.code,{children:`.kirby-exploded`}),` 重新宣告了整個 `,(0,c.jsx)(n.code,{children:`animation`}),` shorthand。新的 animation list 裡沒有 `,(0,c.jsx)(n.code,{children:`kirby-suckIn`}),`，瀏覽器就取消它、改跑 `,(0,c.jsx)(n.code,{children:`kirby-explode`}),`。JS 只要加 class、補幾個隨機變數：`]}),`
`,(0,c.jsx)(c.Fragment,{children:(0,c.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,c.jsxs)(n.code,{children:[(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`particle.classList.`}),(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`add`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`'kirby-exploded'`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`);`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`particle.style.backgroundColor `}),(0,c.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:` 'white'`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`particle.style.`}),(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`setProperty`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`'--size'`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`, `}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:"`${"}),(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`random`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`5`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`, `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`20`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`)`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:"}px`"}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`);`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`particle.style.`}),(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`setProperty`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`'--explode-duration'`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`, `}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:"`${"}),(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`random`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`200`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`, `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`600`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`)`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:"}ms`"}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`);`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`particle.style.`}),(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`setProperty`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`'--explode-delay'`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`, `}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:"`${"}),(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`random`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`0`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`, `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`100`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`)`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:"}ms`"}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`);`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`particle.style.`}),(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`setProperty`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`'--twinkle-duration'`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`, `}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:"`${"}),(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`random`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`100`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`, `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`300`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`)`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:"}ms`"}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`);`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`particle.style.`}),(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`setProperty`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`'--fade-duration'`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`, `}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:"`${"}),(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`random`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`800`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`, `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`2500`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`)`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:"}ms`"}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`);`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`particle.style.`}),(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`setProperty`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`'--fade-delay'`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`, `}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:"`${"}),(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`random`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`500`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`, `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`1200`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`)`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:"}ms`"}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`);`})]})]})})}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.code,{children:`--angle`}),` / `,(0,c.jsx)(n.code,{children:`--distance`}),` 完全沒動，這就是「同一批粒子、原路炸回去」的全部秘密。`]}),`
`,(0,c.jsx)(n.h2,{children:`Polar coordinates, resolved in CSS`}),`
`,(0,c.jsxs)(n.p,{children:[`Part 1 的寫法是 JS 先 `,(0,c.jsx)(n.code,{children:`convertPolarToCartesian(angle, distance)`}),`，再把 `,(0,c.jsx)(n.code,{children:`--x`}),` / `,(0,c.jsx)(n.code,{children:`--y`}),` 丟給 CSS。這裡把最後一步搬進 CSS：`]}),`
`,(0,c.jsx)(c.Fragment,{children:(0,c.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,c.jsxs)(n.code,{children:[(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`particle.style.`}),(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`setProperty`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`'--angle'`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`, `}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:"`${"}),(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`random`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`0`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`, `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`360`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`)`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:"}deg`"}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`);`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`particle.style.`}),(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`setProperty`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`'--distance'`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`, `}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:"`${"}),(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`random`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`50`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`, `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`200`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`)`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:"}px`"}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`);`})]})]})})}),`
`,(0,c.jsxs)(n.p,{children:[`CSS 的 `,(0,c.jsx)(n.code,{children:`cos()`}),` / `,(0,c.jsx)(n.code,{children:`sin()`}),` 吃帶單位的角度（`,(0,c.jsx)(n.code,{children:`deg`}),`），回傳純數字，乘上 `,(0,c.jsx)(n.code,{children:`--distance`}),` 這個長度就得到 px。好處是 angle 跟 distance 保持「原始資料」的形狀，兩條 keyframe 都能直接讀；爆炸時不用重算任何東西。`]}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.code,{children:`random(0, 360)`}),` 沒加 `,(0,c.jsx)(n.code,{children:`true`}),`，拿到的是整數，跟 Josh 一樣。對角度跟 px 來說整數就夠了。`]}),`
`,(0,c.jsxs)(n.h2,{children:[`Gathering with `,(0,c.jsx)(n.code,{children:`:not(.exploded)`})]}),`
`,(0,c.jsx)(c.Fragment,{children:(0,c.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,c.jsxs)(n.code,{children:[(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#D73A49`},children:`const`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:` gatheredParticles`}),(0,c.jsx)(n.span,{style:{color:`#D73A49`},children:` =`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:` [`}),(0,c.jsx)(n.span,{style:{color:`#D73A49`},children:`...`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`wrapper.`}),(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`querySelectorAll`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`<`}),(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`HTMLElement`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`>(`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`'.kirby-particle:not(.kirby-exploded)'`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`)];`})]}),`
`,(0,c.jsx)(n.span,{className:`line`}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#D73A49`},children:`if`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:` (gatheredParticles.`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`length`}),(0,c.jsx)(n.span,{style:{color:`#D73A49`},children:` <`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:` MIN_PARTICLES`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`) {`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#D73A49`},children:`  return`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,c.jsx)(n.span,{className:`line`,children:(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`}`})}),`
`,(0,c.jsx)(n.span,{className:`line`}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`gatheredParticles.`}),(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`forEach`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`((`}),(0,c.jsx)(n.span,{style:{color:`#E36209`},children:`particle`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`, `}),(0,c.jsx)(n.span,{style:{color:`#E36209`},children:`index`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`) `}),(0,c.jsx)(n.span,{style:{color:`#D73A49`},children:`=>`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#D73A49`},children:`  if`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:` (index `}),(0,c.jsx)(n.span,{style:{color:`#D73A49`},children:`>`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:` MAX_PARTICLES`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`) {`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`    particle.`}),(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`remove`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`();`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#D73A49`},children:`    return`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,c.jsx)(n.span,{className:`line`,children:(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`  }`})}),`
`,(0,c.jsx)(n.span,{className:`line`,children:(0,c.jsx)(n.span,{style:{color:`#6A737D`},children:`  // ...explode`})}),`
`,(0,c.jsx)(n.span,{className:`line`,children:(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`});`})})]})})}),`
`,(0,c.jsx)(n.p,{children:`幾個細節：`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsxs)(n.strong,{children:[(0,c.jsx)(n.code,{children:`:not(.kirby-exploded)`}),` 很重要。`]}),` 連按兩次時，上一輪的白色粒子可能還在閃。沒有這個 selector，它們會被重新撿起來、再炸一次。`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsxs)(n.strong,{children:[`粒子是 `,(0,c.jsx)(n.code,{children:`prepend`}),` 進去的`]}),`，所以 document order 是新的在前。`,(0,c.jsx)(n.code,{children:`index > MAX_PARTICLES`}),` 刪掉的是最早吸進來的那些。`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsxs)(n.strong,{children:[`不到門檻時直接 `,(0,c.jsx)(n.code,{children:`return`}),`，粒子沒有被刪。`]}),` 它們繼續躲在按鈕後面，而且沒有 `,(0,c.jsx)(n.code,{children:`.kirby-exploded`}),`，下一次放開時會一起被撿起來。連續短按幾下，累積夠了還是會炸。`]}),`
`]}),`
`,(0,c.jsx)(n.h2,{children:`Why gathered particles vanish into the button`}),`
`,(0,c.jsx)(n.p,{children:`吸到中心的粒子沒有任何淡出動畫，卻看起來「被吃掉」了。原因是繪製順序：`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[`粒子 `,(0,c.jsx)(n.code,{children:`prepend`}),` 到 wrapper，排在 `,(0,c.jsx)(n.code,{children:`<button>`}),` 前面。`]}),`
`,(0,c.jsxs)(n.li,{children:[`粒子是 `,(0,c.jsx)(n.code,{children:`position: absolute`}),`，按鈕是 `,(0,c.jsx)(n.code,{children:`position: relative`}),`，兩者都是 `,(0,c.jsx)(n.code,{children:`z-index: auto`}),`。`]}),`
`,(0,c.jsx)(n.li,{children:`同一個 stacking context 裡，positioned 元素照 DOM 順序畫，後面的蓋前面的。`}),`
`]}),`
`,(0,c.jsxs)(n.p,{children:[`所以按鈕直接蓋住堆在中心的粉紅粒子。Pop circle 也是同樣的道理：它被 `,(0,c.jsx)(n.code,{children:`prepend`}),` 到 stage 最前面，畫在粒子跟按鈕底下。`]}),`
`,(0,c.jsx)(n.h2,{children:`Twinkle stacked under the fade`}),`
`,(0,c.jsx)(c.Fragment,{children:(0,c.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,c.jsxs)(n.code,{children:[(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`.kirby-particle.kirby-exploded`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`  animation`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`:`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`    kirby-explode `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`var`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#E36209`},children:`--explode-duration`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`) `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`var`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#E36209`},children:`--explode-delay`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`) `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`forwards`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:` cubic-bezier`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`0.22`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`, `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`0.579`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`, `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`0.061`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`, `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`0.996`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`),`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`    kirby-sparkle `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`var`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#E36209`},children:`--twinkle-duration`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`) `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`ease-in-out`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:` infinite`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:` alternate`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`,`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`    kirby-fadeToTransparent `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`var`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#E36209`},children:`--fade-duration`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`) `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`var`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#E36209`},children:`--fade-delay`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`) `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`forwards`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,c.jsx)(n.span,{className:`line`,children:(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`}`})})]})})}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:`kirby-sparkle`}),` 在 0.25 到 1 之間來回，週期只有 100 到 300ms，看起來是快速閃爍。`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:`kirby-fadeToTransparent`}),` 只寫 `,(0,c.jsx)(n.code,{children:`to { opacity: 0 }`}),`，而且排在 list 最後。它缺的起點會讀到底下 `,(0,c.jsx)(n.code,{children:`sparkle`}),` 正在跑的值，所以是「帶著閃爍一起淡出」，不會先跳回 1。`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:`--fade-delay`}),` 是 500 到 1200ms：粒子先閃一陣子才開始淡。每顆的 duration / delay 都不同，整片看起來才不像同一層在動。`]}),`
`]}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.code,{children:`explode`}),` 的曲線 `,(0,c.jsx)(n.code,{children:`cubic-bezier(0.22, 0.579, 0.061, 0.996)`}),` 前段極陡、後段幾乎平，粒子一瞬間衝出去再急停。`,(0,c.jsx)(n.code,{children:`suckIn`}),` 的 `,(0,c.jsx)(n.code,{children:`cubic-bezier(0.726, 0.1, 0.855, 0.526)`}),` 則是開頭慢、越接近中心越快，像被吸塵器拉進去。`]}),`
`,(0,c.jsx)(n.h2,{children:`Fill indicator: two transitions, one element`}),`
`,(0,c.jsx)(c.Fragment,{children:(0,c.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,c.jsxs)(n.code,{children:[(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`.kirby-fillIndicator`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`  position`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`absolute`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`  inset`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`0`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`  background`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`var`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#E36209`},children:`--pink`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`);`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`  opacity`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`0`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`  transition`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`: opacity `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`500`}),(0,c.jsx)(n.span,{style:{color:`#D73A49`},children:`ms`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,c.jsx)(n.span,{className:`line`,children:(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`}`})}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`.kirby-trigger:active`}),(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:` .kirby-fillIndicator`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`  opacity`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`1`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`  transition`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`: opacity `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`3000`}),(0,c.jsx)(n.span,{style:{color:`#D73A49`},children:`ms`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,c.jsx)(n.span,{className:`line`,children:(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`}`})}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#D73A49`},children:`@media`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:` (prefers-reduced-motion: no-preference) {`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`  .kirby-fillIndicator`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`    opacity`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`1`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`    transform`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`scaleY`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`0`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`);`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`    transform-origin`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`bottom`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:` center`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`    transition`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`: transform `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`500`}),(0,c.jsx)(n.span,{style:{color:`#D73A49`},children:`ms`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:` cubic-bezier`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`0.419`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`, `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`0.823`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`, `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`0.431`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`, `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`1.003`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`);`})]}),`
`,(0,c.jsx)(n.span,{className:`line`,children:(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`  }`})}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`  .kirby-trigger:active`}),(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:` .kirby-fillIndicator`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`    transform`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`scaleY`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`1`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`);`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`    transition`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`: transform `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`3000`}),(0,c.jsx)(n.span,{style:{color:`#D73A49`},children:`ms`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:` 500`}),(0,c.jsx)(n.span,{style:{color:`#D73A49`},children:`ms`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:` cubic-bezier`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`0.419`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`, `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`0.823`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`, `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`0.431`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`, `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`1.003`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`);`})]}),`
`,(0,c.jsx)(n.span,{className:`line`,children:(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`  }`})}),`
`,(0,c.jsx)(n.span,{className:`line`,children:(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`}`})})]})})}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Transition 用的是「要進入的那個狀態」上的設定。`}),` 進入 `,(0,c.jsx)(n.code,{children:`:active`}),` 時套 `,(0,c.jsx)(n.code,{children:`3000ms 500ms`}),`，慢慢填滿；離開 `,(0,c.jsx)(n.code,{children:`:active`}),` 時套 base 的 `,(0,c.jsx)(n.code,{children:`500ms`}),`，很快排空。一個元素、兩種速度。`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`500ms delay 對應粒子的飛行時間。`}),` `,(0,c.jsx)(n.code,{children:`suckIn`}),` 是 800ms，第一顆粒子還沒到，液體不該先漲。`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`Motion-free by default。`}),` Base 規則只做 opacity crossfade；只有 `,(0,c.jsx)(n.code,{children:`no-preference`}),` 時才換成 `,(0,c.jsx)(n.code,{children:`scaleY`}),`。所以 reduced-motion 的使用者按住按鈕仍然有回饋，只是沒有位移。`]}),`
`,(0,c.jsxs)(n.li,{children:[`按鈕有 `,(0,c.jsx)(n.code,{children:`overflow: clip`}),`，液體不會超出圓角。`,(0,c.jsx)(n.code,{children:`.kirby-text`}),` 是 `,(0,c.jsx)(n.code,{children:`position: relative`}),`，DOM 順序又在液體後面，所以字永遠在液體上面。`]}),`
`]}),`
`,(0,c.jsx)(n.h2,{children:`Pop circle scaled by the charge`}),`
`,(0,c.jsx)(c.Fragment,{children:(0,c.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,c.jsxs)(n.code,{children:[(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#D73A49`},children:`const`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:` allPopCircles`}),(0,c.jsx)(n.span,{style:{color:`#D73A49`},children:` =`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:` [`}),(0,c.jsx)(n.span,{style:{color:`#D73A49`},children:`...`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`stage.`}),(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`querySelectorAll`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`'.kirby-popCircle'`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`)];`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`allPopCircles.`}),(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`forEach`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`((`}),(0,c.jsx)(n.span,{style:{color:`#E36209`},children:`elem`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`) `}),(0,c.jsx)(n.span,{style:{color:`#D73A49`},children:`=>`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:` elem.`}),(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`remove`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`());`})]}),`
`,(0,c.jsx)(n.span,{className:`line`}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#D73A49`},children:`const`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:` popCircle`}),(0,c.jsx)(n.span,{style:{color:`#D73A49`},children:` =`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:` document.`}),(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`createElement`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`'div'`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`);`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`popCircle.classList.`}),(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`add`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`'kirby-popCircle'`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`);`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`popCircle.style.`}),(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`setProperty`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`  '--size'`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`,`})]}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#032F62`},children:"  `${"}),(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`clampedNormalize`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`(`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`gatheredParticles`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`.`}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`length`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`, `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`0`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`, `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`MAX_PARTICLES`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`, `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`0`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`, `}),(0,c.jsx)(n.span,{style:{color:`#005CC5`},children:`400`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:`)`}),(0,c.jsx)(n.span,{style:{color:`#032F62`},children:"}px`"}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`,`})]}),`
`,(0,c.jsx)(n.span,{className:`line`,children:(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`);`})}),`
`,(0,c.jsxs)(n.span,{className:`line`,children:[(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`stage.`}),(0,c.jsx)(n.span,{style:{color:`#6F42C1`},children:`prepend`}),(0,c.jsx)(n.span,{style:{color:`#24292E`},children:`(popCircle);`})]})]})})}),`
`,(0,c.jsxs)(n.p,{children:[`10 顆粒子是 20px，100 顆是 200px，200 顆以上都是 400px。`,(0,c.jsx)(n.code,{children:`clampedNormalize`}),` 保證按再久也不會超過 400px。每次爆炸前先刪掉舊的 pop circle，避免連按時一層層疊上去。`]}),`
`,(0,c.jsx)(n.h2,{children:`Gotchas`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`門檻跟 spec 差一。`}),` Spec 寫「10 顆或更少不爆」，Josh 的程式是 `,(0,c.jsx)(n.code,{children:`length < 10`}),`，剛好 10 顆會爆。Spec 寫「只炸 200 顆」，程式是 `,(0,c.jsx)(n.code,{children:`index > 200`}),`，index 0 到 200 共 201 顆會炸。我保留 Josh 的比較式，只把數字抽成 `,(0,c.jsx)(n.code,{children:`MIN_PARTICLES`}),` / `,(0,c.jsx)(n.code,{children:`MAX_PARTICLES`}),`，常數旁邊的註解有寫實際行為。`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`放開瞬間還在半路的粒子會瞬移到中心。`}),` `,(0,c.jsx)(n.code,{children:`.kirby-exploded`}),` 換掉 animation list，`,(0,c.jsx)(n.code,{children:`suckIn`}),` 被取消，`,(0,c.jsx)(n.code,{children:`transform`}),` 立刻回到 `,(0,c.jsx)(n.code,{children:`none`}),`，然後 `,(0,c.jsx)(n.code,{children:`explode`}),` 才從中心出發。最後 800ms 內生成的粒子都是這樣，但爆炸夠快，肉眼很難注意到。`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsxs)(n.strong,{children:[`Reduced motion 每次 `,(0,c.jsx)(n.code,{children:`pointerdown`}),` 都重新檢查`]}),`，所以使用者中途切系統設定也會立刻生效。JS 端擋的是粒子生成；液體的 crossfade 由 CSS 處理。`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`偏離：用 imperative DOM，不用 React state。`}),` Josh 的解法是直接 `,(0,c.jsx)(n.code,{children:`createElement`}),`、`,(0,c.jsx)(n.code,{children:`querySelectorAll`}),`、`,(0,c.jsx)(n.code,{children:`classList.add`}),`。這個 component 從不 re-render，React 不會 reconcile wrapper，所以在 `,(0,c.jsx)(n.code,{children:`useEffect`}),` 裡操作 DOM 是安全的，而且能一行一行對照 Josh 的 control flow。`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsxs)(n.strong,{children:[`偏離：`,(0,c.jsx)(n.code,{children:`pointerdown`}),` 時 `,(0,c.jsx)(n.code,{children:`setPointerCapture`}),`，並且把 `,(0,c.jsx)(n.code,{children:`pointercancel`}),` 當成放開。`]}),` 原版在滑鼠按住、拖出按鈕外才放開時，`,(0,c.jsx)(n.code,{children:`pointerup`}),` 不會發到按鈕上，`,(0,c.jsx)(n.code,{children:`isRunning`}),` 卡在 true，粒子無限生成。Capture 之後 `,(0,c.jsx)(n.code,{children:`pointerup`}),` 一定回到按鈕。`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsxs)(n.strong,{children:[`偏離：按鈕加了 `,(0,c.jsx)(n.code,{children:`touch-action: none`}),`、`,(0,c.jsx)(n.code,{children:`user-select: none`}),`、`,(0,c.jsx)(n.code,{children:`-webkit-touch-callout: none`}),`。`]}),` 這個 demo 嵌在可捲動的筆記頁裡；手機上長按容易觸發捲動、選字或長按選單，把按住手勢取消掉。`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`偏離：爆炸後的粒子會被清掉。`}),` Josh 的解法把淡出的粒子留在 DOM 裡，而 `,(0,c.jsx)(n.code,{children:`kirby-sparkle`}),` 是 `,(0,c.jsx)(n.code,{children:`infinite`}),`，每按一次就多 200 個永遠在跑的動畫。我在 `,(0,c.jsx)(n.code,{children:`animationend`}),` 裡過濾 `,(0,c.jsx)(n.code,{children:`animationName === 'kirby-fadeToTransparent'`}),` 才 `,(0,c.jsx)(n.code,{children:`remove()`}),`。一定要過濾：`,(0,c.jsx)(n.code,{children:`kirby-explode`}),` 比較早結束，也會觸發 `,(0,c.jsx)(n.code,{children:`animationend`}),`。`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`偏離：範圍縮到 demo 內。`}),` Pop circle `,(0,c.jsx)(n.code,{children:`prepend`}),` 到 stage，不是 `,(0,c.jsx)(n.code,{children:`<body>`}),`；`,(0,c.jsx)(n.code,{children:`querySelectorAll`}),` 從 wrapper / stage 開始找；class 跟 keyframe 名稱都加上 `,(0,c.jsx)(n.code,{children:`kirby-`}),` 前綴。Josh 原本的 CSS nesting（`,(0,c.jsx)(n.code,{children:`.trigger:active &`}),`）攤平成一般 selector。`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsxs)(n.strong,{children:[(0,c.jsx)(n.code,{children:`checkPrefersReducedMotion`}),` 定義在 `,(0,c.jsx)(n.code,{children:`kirby.tsx`}),` 裡。`]}),` Josh 的 `,(0,c.jsx)(n.code,{children:`utils.js`}),` 有它，`,(0,c.jsx)(n.code,{children:`~/utils/canvas`}),` 沒有。`,(0,c.jsx)(n.code,{children:`clampedNormalize`}),` 則直接用共用的那支。`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsxs)(n.strong,{children:[`CSS `,(0,c.jsx)(n.code,{children:`cos()`}),` / `,(0,c.jsx)(n.code,{children:`sin()`}),` 需要支援 CSS 三角函數的瀏覽器。`]}),` Chrome、Firefox、Safari 從 2023 年起都支援；更舊的瀏覽器要退回 Part 1 的寫法，在 JS 算好 `,(0,c.jsx)(n.code,{children:`--x`}),` / `,(0,c.jsx)(n.code,{children:`--y`}),`。`]}),`
`]}),`
`,(0,c.jsx)(n.h2,{children:`Extensions`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsx)(n.li,{children:`再多亂數化一些屬性，例如每顆粒子不同顏色或不同形狀。`}),`
`,(0,c.jsx)(n.li,{children:`把 Kirby 這個主題玩得更徹底，讓按鈕更像那顆會吸東西的粉紅球。`}),`
`,(0,c.jsx)(n.li,{children:`做成跟著游標的版本：在頁面任何地方按住，粒子被吸向游標，而不是吸進按鈕。`}),`
`,(0,c.jsx)(n.li,{children:`改用 Canvas 實作，粒子數量可以多十倍。`}),`
`]})]})}function v(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(_,{...e})}):_(e)}function y(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as n,g as t};