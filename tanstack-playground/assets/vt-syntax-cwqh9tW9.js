import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{n as t,r as n}from"./lib-BI_-S7V4.js";import{_ as r}from"./index-Cq2wK77x.js";var i=e({default:()=>c,frontmatter:()=>o}),a=n(),o={title:`View Transitions Syntax, startViewTransition basics`,sourceUrl:`https://courses.joshwcomeau.com/wham/03-advanced-interactions/07.01-vt-syntax`,lessonNumber:`03-advanced-interactions/07.01-vt-syntax`,order:20,summary:"`document.startViewTransition(updateDOM)` 拍兩張 snapshot 疊在頁面最上層,用 keyframe 補間。`view-transition-name` 把元素分組,`::view-transition-old/new(name)` 套自訂 keyframe。其它沒參與的元素也要有 vt name,否則會被蓋住。",tags:[`advanced-interactions`,`view-transitions`,`css`,`animation`]};function s(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,span:`span`,strong:`strong`,ul:`ul`,...t(),...e.components},{DemoFrame:i}=n;return i||l(`DemoFrame`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h2,{children:`TL;DR`}),`
`,(0,a.jsx)(n.p,{children:`View Transition 的整個流程:`}),`
`,(0,a.jsxs)(n.ol,{children:[`
`,(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:`document.startViewTransition(callback)`}),` — 開始一輪 transition。`]}),`
`,(0,a.jsxs)(n.li,{children:[`瀏覽器`,(0,a.jsx)(n.strong,{children:`先拍一張快照`}),`(整張視窗)。`]}),`
`,(0,a.jsxs)(n.li,{children:[`跑 callback,`,(0,a.jsx)(n.code,{children:`setState`}),` / DOM 變動立刻 flush。`]}),`
`,(0,a.jsx)(n.li,{children:`再拍一張新快照。`}),`
`,(0,a.jsxs)(n.li,{children:[`兩張快照疊在所有 UI 上方,用 `,(0,a.jsx)(n.code,{children:`::view-transition-old`}),` / `,(0,a.jsx)(n.code,{children:`::view-transition-new`}),` pseudo-element 渲染。預設兩張交叉淡出。`]}),`
`,(0,a.jsx)(n.li,{children:`動畫完成 → pseudo-elements 移除 → 看到真實 DOM。`}),`
`]}),`
`,(0,a.jsx)(n.p,{children:`整個過程實際 DOM 更新只發生在第 3 步,後面看到的「動畫」是 pseudo-element 的合成。`}),`
`,(0,a.jsx)(i,{title:`capybara-style slideshow with VT slide animation`,children:(0,a.jsx)(r,{})}),`
`,(0,a.jsx)(n.h2,{children:`自訂 keyframe`}),`
`,(0,a.jsx)(a.Fragment,{children:(0,a.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,a.jsxs)(n.code,{children:[(0,a.jsxs)(n.span,{className:`line`,children:[(0,a.jsx)(n.span,{style:{color:`#D73A49`},children:`@keyframes`}),(0,a.jsx)(n.span,{style:{color:`#E36209`},children:` exitLeft`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,a.jsxs)(n.span,{className:`line`,children:[(0,a.jsx)(n.span,{style:{color:`#6F42C1`},children:`  from`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:` { `}),(0,a.jsx)(n.span,{style:{color:`#005CC5`},children:`transform`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,a.jsx)(n.span,{style:{color:`#005CC5`},children:`translateX`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,a.jsx)(n.span,{style:{color:`#005CC5`},children:`0`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`) }`})]}),`
`,(0,a.jsxs)(n.span,{className:`line`,children:[(0,a.jsx)(n.span,{style:{color:`#6F42C1`},children:`  to`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`   { `}),(0,a.jsx)(n.span,{style:{color:`#005CC5`},children:`transform`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,a.jsx)(n.span,{style:{color:`#005CC5`},children:`translateX`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,a.jsx)(n.span,{style:{color:`#005CC5`},children:`-100`}),(0,a.jsx)(n.span,{style:{color:`#D73A49`},children:`%`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`) }`})]}),`
`,(0,a.jsx)(n.span,{className:`line`,children:(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`}`})}),`
`,(0,a.jsxs)(n.span,{className:`line`,children:[(0,a.jsx)(n.span,{style:{color:`#D73A49`},children:`@keyframes`}),(0,a.jsx)(n.span,{style:{color:`#E36209`},children:` enterRight`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,a.jsxs)(n.span,{className:`line`,children:[(0,a.jsx)(n.span,{style:{color:`#6F42C1`},children:`  from`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:` { `}),(0,a.jsx)(n.span,{style:{color:`#005CC5`},children:`transform`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,a.jsx)(n.span,{style:{color:`#005CC5`},children:`translateX`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,a.jsx)(n.span,{style:{color:`#005CC5`},children:`100`}),(0,a.jsx)(n.span,{style:{color:`#D73A49`},children:`%`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`) }`})]}),`
`,(0,a.jsxs)(n.span,{className:`line`,children:[(0,a.jsx)(n.span,{style:{color:`#6F42C1`},children:`  to`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`   { `}),(0,a.jsx)(n.span,{style:{color:`#005CC5`},children:`transform`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,a.jsx)(n.span,{style:{color:`#005CC5`},children:`translateX`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,a.jsx)(n.span,{style:{color:`#005CC5`},children:`0`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`) }`})]}),`
`,(0,a.jsx)(n.span,{className:`line`,children:(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`}`})}),`
`,(0,a.jsxs)(n.span,{className:`line`,children:[(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`::view-transition-old(slide) { `}),(0,a.jsx)(n.span,{style:{color:`#005CC5`},children:`animation-name`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`: exitLeft; }`})]}),`
`,(0,a.jsxs)(n.span,{className:`line`,children:[(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`::view-transition-new(slide) { `}),(0,a.jsx)(n.span,{style:{color:`#005CC5`},children:`animation-name`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`: enterRight; }`})]}),`
`,(0,a.jsx)(n.span,{className:`line`}),`
`,(0,a.jsxs)(n.span,{className:`line`,children:[(0,a.jsx)(n.span,{style:{color:`#6F42C1`},children:`.card`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:` { `}),(0,a.jsx)(n.span,{style:{color:`#005CC5`},children:`view-transition-name`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`: slide; }`})]})]})})}),`
`,(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.code,{children:`view-transition-name`}),` 把元素`,(0,a.jsx)(n.strong,{children:`指定一個 transition 群`}),`。同名的 old/new pseudo-element 套同一條 keyframe。不寫 `,(0,a.jsx)(n.code,{children:`view-transition-name`}),` 整個 root 變成一個大群組(slide 整頁,連按鈕都跟著走)。`]}),`
`,(0,a.jsx)(n.h2,{children:`旁邊元素也要有 name`}),`
`,(0,a.jsxs)(n.p,{children:[`如果 button 沒設 `,(0,a.jsx)(n.code,{children:`view-transition-name`}),`,在 transition 期間整頁會被 capybara 圖蓋住,button 看不見。`]}),`
`,(0,a.jsx)(a.Fragment,{children:(0,a.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,a.jsxs)(n.code,{children:[(0,a.jsxs)(n.span,{className:`line`,children:[(0,a.jsx)(n.span,{style:{color:`#6F42C1`},children:`:root`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:` { `}),(0,a.jsx)(n.span,{style:{color:`#005CC5`},children:`view-transition-name`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,a.jsx)(n.span,{style:{color:`#005CC5`},children:`none`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`; }`})]}),`
`,(0,a.jsxs)(n.span,{className:`line`,children:[(0,a.jsx)(n.span,{style:{color:`#6F42C1`},children:`.card`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:` { `}),(0,a.jsx)(n.span,{style:{color:`#005CC5`},children:`view-transition-name`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`: slide; }`})]}),`
`,(0,a.jsxs)(n.span,{className:`line`,children:[(0,a.jsx)(n.span,{style:{color:`#6F42C1`},children:`.button`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:` { `}),(0,a.jsx)(n.span,{style:{color:`#005CC5`},children:`view-transition-name`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`: btn; }`})]})]})})}),`
`,(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.code,{children:`:root`}),` 把 root 的 transition 關掉(否則整頁仍是個 root group)。每個想保留可見的元素都要有自己的 name — 即使它根本沒變,VT 也會幫它 cross-fade(從相同 → 相同,看起來沒動)。`]}),`
`,(0,a.jsx)(n.h2,{children:`Production-ready 兩件事`}),`
`,(0,a.jsx)(a.Fragment,{children:(0,a.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,a.jsxs)(n.code,{children:[(0,a.jsxs)(n.span,{className:`line`,children:[(0,a.jsx)(n.span,{style:{color:`#D73A49`},children:`function`}),(0,a.jsx)(n.span,{style:{color:`#6F42C1`},children:` next`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`() {`})]}),`
`,(0,a.jsxs)(n.span,{className:`line`,children:[(0,a.jsx)(n.span,{style:{color:`#D73A49`},children:`  function`}),(0,a.jsx)(n.span,{style:{color:`#6F42C1`},children:` updateDOM`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`() { `}),(0,a.jsx)(n.span,{style:{color:`#6A737D`},children:`/* setState etc */`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:` }`})]}),`
`,(0,a.jsx)(n.span,{className:`line`}),`
`,(0,a.jsxs)(n.span,{className:`line`,children:[(0,a.jsx)(n.span,{style:{color:`#D73A49`},children:`  const`}),(0,a.jsx)(n.span,{style:{color:`#005CC5`},children:` prefersReduced`}),(0,a.jsx)(n.span,{style:{color:`#D73A49`},children:` =`}),(0,a.jsx)(n.span,{style:{color:`#6F42C1`},children:` matchMedia`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,a.jsx)(n.span,{style:{color:`#032F62`},children:`'(prefers-reduced-motion: reduce)'`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`).matches;`})]}),`
`,(0,a.jsxs)(n.span,{className:`line`,children:[(0,a.jsx)(n.span,{style:{color:`#D73A49`},children:`  if`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:` (document.startViewTransition `}),(0,a.jsx)(n.span,{style:{color:`#D73A49`},children:`&&`}),(0,a.jsx)(n.span,{style:{color:`#D73A49`},children:` !`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`prefersReduced) {`})]}),`
`,(0,a.jsxs)(n.span,{className:`line`,children:[(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`    document.`}),(0,a.jsx)(n.span,{style:{color:`#6F42C1`},children:`startViewTransition`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`(updateDOM);`})]}),`
`,(0,a.jsxs)(n.span,{className:`line`,children:[(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`  } `}),(0,a.jsx)(n.span,{style:{color:`#D73A49`},children:`else`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,a.jsxs)(n.span,{className:`line`,children:[(0,a.jsx)(n.span,{style:{color:`#6F42C1`},children:`    updateDOM`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`();`})]}),`
`,(0,a.jsx)(n.span,{className:`line`,children:(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`  }`})}),`
`,(0,a.jsx)(n.span,{className:`line`,children:(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`}`})})]})})}),`
`,(0,a.jsxs)(n.ul,{children:[`
`,(0,a.jsxs)(n.li,{children:[`沒支援 `,(0,a.jsx)(n.code,{children:`startViewTransition`}),` 的瀏覽器直接呼 updateDOM(感知不到動畫但仍能用)。`]}),`
`,(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:`prefers-reduced-motion`}),` 時跳過 — 或者只在 CSS 裡用 `,(0,a.jsx)(n.code,{children:`@media`}),` 包自訂 keyframe,讓 transition 仍跑但只剩預設 cross-fade(本 demo 採用後者)。`]}),`
`]}),`
`,(0,a.jsx)(n.h2,{children:`Pseudo-element tree`}),`
`,(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:`::view-transition (root container)
  ::view-transition-group(slide)
    ::view-transition-image-pair(slide)
      ::view-transition-old(slide)
      ::view-transition-new(slide)
  ::view-transition-group(btn)
    ::view-transition-image-pair(btn)
      ::view-transition-old(btn)
      ::view-transition-new(btn)
`})}),`
`,(0,a.jsxs)(n.ul,{children:[`
`,(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:`group`}),` 控整體位置/尺寸動畫(預設從 old 位置 morph 到 new 位置)。`]}),`
`,(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:`image-pair`}),` 包 old + new。`]}),`
`,(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:`old / new`}),` 是兩張 snapshot,可單獨套 keyframe。`]}),`
`]}),`
`,(0,a.jsxs)(n.p,{children:[`要 debug 的時候把 `,(0,a.jsx)(n.code,{children:`::view-transition-group(*) { animation-duration: 80000ms }`}),` 寫進 dev CSS,動畫慢到能用 devtools 抓 DOM。`]}),`
`,(0,a.jsx)(n.h2,{children:`Snapshot 不是 screenshot`}),`
`,(0,a.jsx)(n.p,{children:`文字仍可選取、超連結仍可點(理論上)。瀏覽器是把元素「序列化成 painting layer」而不是 raster bitmap,所以可互動性部分保留。`}),`
`,(0,a.jsx)(n.h2,{children:`Gotchas`}),`
`,(0,a.jsxs)(n.ul,{children:[`
`,(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:`TypeScript 沒 type`}),`:`,(0,a.jsx)(n.code,{children:`document.startViewTransition`}),` 在 lib.dom.d.ts 已支援。如果你的版本太舊要 declare:`,(0,a.jsx)(n.code,{children:`declare global { interface Document { startViewTransition?: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> } } }`})]}),`
`,(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:`Animation 期間 button 不能 click`}),`:整輪 transition 進行時頁面被 freeze,沒辦法中斷。下一篇 `,(0,a.jsx)(n.a,{href:`./07.05-vt-interrupts`,children:`interrupts`}),` 處理這個。`]}),`
`,(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:`每個有 vt-name 的元素只能有一個 instance`}),`:同 view 裡兩個元素都叫 `,(0,a.jsx)(n.code,{children:`card`}),` 會壞。要區分用 `,(0,a.jsx)(n.code,{children:`view-transition-class`}),`(下下篇)。`]}),`
`,(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:`不要每幀都 startViewTransition`}),`:這 API 設計給「state 切換」,不是 cursor follow 那種連續動畫。call 太頻繁會 race。`]}),`
`,(0,a.jsxs)(n.li,{children:[(0,a.jsxs)(n.strong,{children:[(0,a.jsx)(n.code,{children:`mix-blend-mode: plus-lighter`}),` 的奇怪預設`]}),`:預設 cross-fade 用 plus-lighter blend mode 避免半透明疊加變灰。寫自訂 keyframe 時可能要 override。`]}),`
`]})]})}function c(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(s,{...e})}):s(e)}function l(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{i as n,o as t};