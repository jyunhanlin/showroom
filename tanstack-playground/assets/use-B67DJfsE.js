import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{n as t,r as n}from"./lib-BI_-S7V4.js";var r=n(),i=[{stroke:`oklch(0.9 0.3 164)`,dash:`100,100`,repeatLength:200,duration:`12s`},{stroke:`oklch(0.85 0.2 130)`,dash:`80,100`,repeatLength:180,duration:`4s`},{stroke:`oklch(0.7 0.25 350)`,dash:`30,30`,repeatLength:60,duration:`7s`},{stroke:`oklch(0.55 0.2 280)`,dash:`20,60 40,20`,repeatLength:140,duration:`8.7s`},{stroke:`oklch(0.65 0.18 220)`,dash:`20,120`,repeatLength:140,duration:`10s`}];function a(){return(0,r.jsxs)(`div`,{className:`mx-auto flex w-fit flex-col items-center gap-3`,children:[(0,r.jsxs)(`svg`,{viewBox:`0 0 200 120`,width:400,height:240,className:`block rounded-md bg-slate-900`,children:[(0,r.jsx)(`defs`,{children:(0,r.jsx)(`path`,{id:`rainbow-template`,d:`M 20,100 A 40,40 0 0 1 180,100 Z`})}),i.map((e,t)=>(0,r.jsx)(`use`,{href:`#rainbow-template`,fill:`none`,stroke:e.stroke,strokeWidth:`6`,strokeLinecap:`round`,strokeDasharray:e.dash,style:{animation:`rainbow-${t} ${e.duration} linear infinite`}},t)),(0,r.jsx)(`style`,{children:i.map((e,t)=>`@keyframes rainbow-${t} { to { stroke-dashoffset: -${e.repeatLength}px } }`).join(`
`)})]}),(0,r.jsxs)(`p`,{className:`text-sm text-gray-700`,children:[`5 條 stripe 共用同一個 `,(0,r.jsx)(`code`,{className:`font-mono`,children:`<path id="rainbow-template">`}),`， 各自設不同 stroke + dasharray + 動畫速度。`]})]})}var o=e({default:()=>l,frontmatter:()=>s}),s={title:`<use>, the SVG template-and-clone pattern`,sourceUrl:`https://courses.joshwcomeau.com/wham/02-svg/06-use`,lessonNumber:`02-svg/06-use`,order:14,summary:`<defs> 放 template (id 標記)、<use href="#id"> 抓出 N 個 clone。Geometry attribute 必須在 template 上，presentational 可以在 clone 上覆寫。SSR 時減少 HTML 重複，big path 場景省 KB；變化用 transform 處理，不是直接覆蓋 geometry。`,tags:[`svg`,`use`,`defs`,`template`]};function c(e){let n={code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components},{DemoFrame:i}=n;return i||u(`DemoFrame`,!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`TL;DR`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`<defs>`}),` 是 SVG 的「head」— 放定義不畫，子元素必須有 `,(0,r.jsx)(n.code,{children:`id`}),`。`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`<use href="#some-id">`}),` 像 doppelgänger，把 referenced 元素的 geometry 抄一份來繪製。Presentational attribute (stroke、fill、opacity) 可以在 `,(0,r.jsx)(n.code,{children:`<use>`}),` 上覆寫。`]}),`
`,(0,r.jsxs)(n.li,{children:[`5 條 dasharray pattern 不同的彩虹條共用同一個 path data，不需要重複 5 次 `,(0,r.jsx)(n.code,{children:`d="..."`}),`。SSR HTML 大小直接砍 80%。`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`Geometry 必須定義在 template 上`}),`：`,(0,r.jsx)(n.code,{children:`<circle id="t" cx cy r>`}),` template 必須完整，`,(0,r.jsx)(n.code,{children:`<use href="#t" r="40">`}),` 想覆蓋 r 沒效（任何瀏覽器）。`]}),`
`,(0,r.jsxs)(n.li,{children:[`想讓 clone 大小不同：用 `,(0,r.jsx)(n.code,{children:`transform: scale()`}),`，不是改 geometry attribute。`]}),`
`]}),`
`,(0,r.jsx)(i,{title:`5 條彩虹 stripe 共用一個 <path>`,children:(0,r.jsx)(a,{})}),`
`,(0,r.jsx)(n.h2,{children:`不用 use 的痛苦`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-svg`,children:`<svg>
  <path stroke="red"    stroke-dasharray="100,100" d="M 20,100 A 40,40 0 0 1 180,100 Z" />
  <path stroke="green"  stroke-dasharray="80,100"  d="M 20,100 A 40,40 0 0 1 180,100 Z" />
  <path stroke="pink"   stroke-dasharray="30,30"   d="M 20,100 A 40,40 0 0 1 180,100 Z" />
  <path stroke="purple" stroke-dasharray="20,60"   d="M 20,100 A 40,40 0 0 1 180,100 Z" />
  <path stroke="blue"   stroke-dasharray="20,120"  d="M 20,100 A 40,40 0 0 1 180,100 Z" />
</svg>
`})}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`d="M 20,100 A 40,40 0 0 1 180,100 Z"`}),` 重複 5 次。簡單 path 還好，Figma export 的 200+ 字 path 重複 5 次就是 SSR HTML 暴增 1KB。`]}),`
`,(0,r.jsxs)(n.p,{children:[`React 把 d 抽成變數可以解 source size，但 SSR render 出來的 HTML 還是 5 個 `,(0,r.jsx)(n.code,{children:`d="..."`}),` — 因為 `,(0,r.jsx)(n.code,{children:`<path d>`}),` 不能 reference variable。`]}),`
`,(0,r.jsx)(n.h2,{children:`defs + use 解法`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-svg`,children:`<svg>
  <defs>
    <path id="rainbow-template" d="M 20,100 A 40,40 0 0 1 180,100 Z" />
  </defs>

  <use href="#rainbow-template" stroke="red"    stroke-dasharray="100,100" />
  <use href="#rainbow-template" stroke="green"  stroke-dasharray="80,100" />
  <use href="#rainbow-template" stroke="pink"   stroke-dasharray="30,30" />
  <use href="#rainbow-template" stroke="purple" stroke-dasharray="20,60" />
  <use href="#rainbow-template" stroke="blue"   stroke-dasharray="20,120" />
</svg>
`})}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`d=""`}),` 只出現一次。SSR HTML 5 個 `,(0,r.jsx)(n.code,{children:`<use>`}),` 各自 ~50 bytes，比 5 個 full path 省 ~80%。`]}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`<defs>`}),` 內部的元素`,(0,r.jsx)(n.strong,{children:`不會被繪製`}),`，純粹當定義。畫面上看到的是 `,(0,r.jsx)(n.code,{children:`<use>`}),` clone。`]}),`
`,(0,r.jsx)(n.h2,{children:`Geometry vs Presentational 的合併規則`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-svg`,children:`<defs>
  <circle id="t" cx="100" cy="100" r="20" />
</defs>
<use href="#t" r="40" />  <!-- 🛑 r 改不了 -->
`})}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`<use>`}),` 對 referenced 元素的 attribute 合併規則：`]}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`Geometry attribute`}),` (`,(0,r.jsx)(n.code,{children:`cx`}),`、`,(0,r.jsx)(n.code,{children:`cy`}),`、`,(0,r.jsx)(n.code,{children:`r`}),`、`,(0,r.jsx)(n.code,{children:`x`}),`、`,(0,r.jsx)(n.code,{children:`y`}),`、`,(0,r.jsx)(n.code,{children:`width`}),`、`,(0,r.jsx)(n.code,{children:`height`}),`、`,(0,r.jsx)(n.code,{children:`d`}),`) 必須在 template 上完整定義。`,(0,r.jsx)(n.code,{children:`<use>`}),` 上的同名 attribute `,(0,r.jsx)(n.strong,{children:`被忽略`}),`。`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`Presentational attribute`}),` (`,(0,r.jsx)(n.code,{children:`stroke`}),`、`,(0,r.jsx)(n.code,{children:`fill`}),`、`,(0,r.jsx)(n.code,{children:`stroke-width`}),`、`,(0,r.jsx)(n.code,{children:`opacity`}),`...) 可以在 `,(0,r.jsx)(n.code,{children:`<use>`}),` 上覆寫。如果 template 也有，`,(0,r.jsx)(n.code,{children:`<use>`}),` 贏。`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`Class、style`}),` 也是 presentational 範疇，可以在 `,(0,r.jsx)(n.code,{children:`<use>`}),` 上加。`]}),`
`]}),`
`,(0,r.jsx)(n.p,{children:`直覺上應該全部都能覆寫，但規範刻意把 geometry 鎖在 template — 違反這條會在不同瀏覽器表現不同（Chrome 接受、Safari 不接受），所以「不是不工作而是不要做」。`}),`
`,(0,r.jsx)(n.h2,{children:`想讓 clone 大小不同 → 用 transform`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-svg`,children:`<defs>
  <circle id="t" cx="100" cy="100" r="20" />
</defs>
<use href="#t" fill="red"    style="transform: scale(2.5); transform-origin: 100px 100px" />
<use href="#t" fill="orange" style="transform: scale(2);   transform-origin: 100px 100px" />
<use href="#t" fill="yellow" style="transform: scale(1.5); transform-origin: 100px 100px" />
`})}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`transform-origin`}),` 設在 template 中心 (100, 100)，scale 後 circle 中心保持原位，半徑視覺上隨 scale 倍數。`]}),`
`,(0,r.jsxs)(n.p,{children:[`要平移用 `,(0,r.jsx)(n.code,{children:`transform: translate(x, y)`}),`，旋轉用 `,(0,r.jsx)(n.code,{children:`transform: rotate(degree)`}),`。Geometry 全部透過 transform 處理。`]}),`
`,(0,r.jsx)(n.h2,{children:`use 對動畫的好處`}),`
`,(0,r.jsxs)(n.p,{children:[`每個 `,(0,r.jsx)(n.code,{children:`<use>`}),` 是獨立 DOM node，可以各自綁 CSS 動畫 / event listener。Demo 裡 5 條 stripe 各自跑不同速度的 `,(0,r.jsx)(n.code,{children:`stroke-dashoffset`}),` 動畫，但 `,(0,r.jsx)(n.code,{children:`d`}),` 共用同一個 — 改 d 一次 5 條同時動。`]}),`
`,(0,r.jsx)(n.p,{children:`實務：`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[`icon system 把所有 icon path 放 `,(0,r.jsx)(n.code,{children:`<defs>`}),`，頁面用 `,(0,r.jsx)(n.code,{children:`<use href="#icon-foo">`}),` reference — 整頁只有一份 path data`]}),`
`,(0,r.jsxs)(n.li,{children:[`spritesheet pattern：external SVG file 內 `,(0,r.jsx)(n.code,{children:`<defs>`}),` 一堆，HTML 端 `,(0,r.jsx)(n.code,{children:`<use href="sprite.svg#icon-foo">`}),` 跨檔 reference`]}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Gotchas`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsxs)(n.strong,{children:[(0,r.jsx)(n.code,{children:`<defs>`}),` 不必 unique`]}),`，但 `,(0,r.jsx)(n.code,{children:`id`}),` 必須 unique 在整個 document。複用同 `,(0,r.jsx)(n.code,{children:`id`}),` 的話 `,(0,r.jsx)(n.code,{children:`<use href="#id">`}),` 只會抓第一個。`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsxs)(n.strong,{children:[`Cross-document `,(0,r.jsx)(n.code,{children:`<use>`}),` 受 CORS 限制`]}),`：`,(0,r.jsx)(n.code,{children:`<use href="https://other-domain.com/sprite.svg#icon">`}),` 在 production 通常不通，要嘛同 origin 要嘛 inline。`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsxs)(n.strong,{children:[(0,r.jsx)(n.code,{children:`<defs>`}),` 跟普通 `,(0,r.jsx)(n.code,{children:`<g>`}),` 的差別`]}),`：兩者都不直接繪製內容，但 `,(0,r.jsx)(n.code,{children:`<g>`}),` 內的元素`,(0,r.jsx)(n.strong,{children:`會被繪製`}),`（`,(0,r.jsx)(n.code,{children:`<g>`}),` 只是分組）；`,(0,r.jsx)(n.code,{children:`<defs>`}),` 內的元素`,(0,r.jsx)(n.strong,{children:`不繪製`}),`。`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsxs)(n.strong,{children:[(0,r.jsx)(n.code,{children:`<use>`}),` 在 React 寫法`]}),`：`,(0,r.jsx)(n.code,{children:`<use href="#id" />`}),`。XLink 那套舊寫法 `,(0,r.jsx)(n.code,{children:`xlinkHref`}),` 在 React 19 已 deprecated，用 `,(0,r.jsx)(n.code,{children:`href`}),` 即可。`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsxs)(n.strong,{children:[`CSS class 套到 `,(0,r.jsx)(n.code,{children:`<use>`}),` clone 上要看內外規則`]}),`：直接 `,(0,r.jsx)(n.code,{children:`<use class="foo">`}),` 通；想 style template 內子元素得用 `,(0,r.jsx)(n.code,{children:`<use class="foo"><circle class="bar" /></use>`}),` 之類更精細結構，因為 use 是 shadow tree 不直接吃 outer CSS。`]}),`
`]})]})}function l(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}function u(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{o as n,s as t};