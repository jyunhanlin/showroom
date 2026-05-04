import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{i as n,n as r,r as i}from"./lib-BI_-S7V4.js";var a=e(n(),1),o=i();function s(){let[e,t]=(0,a.useState)(2),[n,r]=(0,a.useState)(4),[i,s]=(0,a.useState)(4);return(0,o.jsxs)(`div`,{className:`flex flex-col items-center gap-3`,children:[(0,o.jsx)(`div`,{className:`rounded-md bg-slate-900 p-3`,children:(0,o.jsxs)(`svg`,{viewBox:`0 0 128 128`,width:200,height:200,children:[(0,o.jsx)(`defs`,{children:(0,o.jsx)(`filter`,{id:`wham-ww-shadow`,x:`-50%`,y:`-50%`,width:`200%`,height:`200%`,children:(0,o.jsx)(`feDropShadow`,{dx:e,dy:n,stdDeviation:i,floodColor:`black`,floodOpacity:`0.5`})})}),(0,o.jsx)(`circle`,{cx:`64`,cy:`64`,r:`36`,fill:`oklch(0.78 0.15 90)`,filter:`url(#wham-ww-shadow)`})]})}),(0,o.jsxs)(`div`,{className:`grid w-full max-w-md grid-cols-1 gap-1 font-mono text-sm sm:grid-cols-3`,children:[(0,o.jsxs)(`label`,{className:`flex items-center gap-2`,children:[(0,o.jsxs)(`span`,{className:`w-12`,children:[`dx: `,e]}),(0,o.jsx)(`input`,{type:`range`,min:-12,max:12,value:e,onChange:e=>t(Number(e.target.value))})]}),(0,o.jsxs)(`label`,{className:`flex items-center gap-2`,children:[(0,o.jsxs)(`span`,{className:`w-12`,children:[`dy: `,n]}),(0,o.jsx)(`input`,{type:`range`,min:-12,max:12,value:n,onChange:e=>r(Number(e.target.value))})]}),(0,o.jsxs)(`label`,{className:`flex items-center gap-2`,children:[(0,o.jsxs)(`span`,{className:`w-12`,children:[`blur: `,i]}),(0,o.jsx)(`input`,{type:`range`,min:0,max:12,value:i,onChange:e=>s(Number(e.target.value))})]})]})]})}function c(){let[e,t]=(0,a.useState)(135),n=e*Math.PI/180;return(0,o.jsxs)(`div`,{className:`flex flex-col items-center gap-3`,children:[(0,o.jsx)(`div`,{className:`rounded-md bg-slate-900 p-3`,children:(0,o.jsxs)(`svg`,{viewBox:`0 0 128 128`,width:200,height:200,children:[(0,o.jsx)(`defs`,{children:(0,o.jsxs)(`linearGradient`,{id:`wham-ww-grad`,x1:64-Math.cos(n)*64,y1:64-Math.sin(n)*64,x2:64+Math.cos(n)*64,y2:64+Math.sin(n)*64,gradientUnits:`userSpaceOnUse`,children:[(0,o.jsx)(`stop`,{offset:`0%`,stopColor:`hsl(200 100% 90%)`}),(0,o.jsx)(`stop`,{offset:`100%`,stopColor:`hsl(245 100% 50%)`})]})}),(0,o.jsx)(`rect`,{x:`16`,y:`16`,width:`96`,height:`96`,rx:`6`,fill:`url(#wham-ww-grad)`})]})}),(0,o.jsxs)(`label`,{className:`flex items-center gap-3 font-mono text-sm`,children:[(0,o.jsxs)(`span`,{className:`w-24`,children:[`angle: `,e,`°`]}),(0,o.jsx)(`input`,{type:`range`,min:0,max:360,value:e,onChange:e=>t(Number(e.target.value))})]})]})}function l(){return(0,o.jsxs)(`div`,{className:`flex flex-col items-center gap-2`,children:[(0,o.jsx)(`div`,{className:`rounded-md bg-slate-900 p-3`,children:(0,o.jsxs)(`svg`,{viewBox:`0 0 32 32`,width:200,height:200,children:[(0,o.jsx)(`defs`,{children:(0,o.jsx)(`pattern`,{id:`wham-ww-grid`,width:`4`,height:`4`,patternUnits:`userSpaceOnUse`,children:(0,o.jsx)(`path`,{d:`M 0,0 L 4,0 L 4,4`,fill:`none`,stroke:`oklch(0.85 0.18 60)`,strokeWidth:`0.2`})})}),(0,o.jsx)(`rect`,{width:`32`,height:`32`,fill:`url(#wham-ww-grid)`}),(0,o.jsx)(`path`,{d:`M 0,32 L 0,0 L 32,0`,fill:`none`,stroke:`oklch(0.85 0.18 60)`,strokeWidth:`0.2`})]})}),(0,o.jsx)(`p`,{className:`text-xs text-gray-500`,children:`4×4 unit 的 ⌐ 蓋 → 鋪滿 32×32 viewBox。`})]})}function u(){return(0,o.jsxs)(`div`,{className:`flex flex-col items-center gap-2`,children:[(0,o.jsx)(`div`,{className:`rounded-md bg-slate-900 p-3`,children:(0,o.jsxs)(`svg`,{viewBox:`0 0 500 140`,width:400,height:120,children:[(0,o.jsx)(`defs`,{children:(0,o.jsx)(`path`,{id:`wham-ww-curve`,d:`M 30,120 Q 250,20 470,120`})}),(0,o.jsx)(`path`,{d:`M 30,120 Q 250,20 470,120`,fill:`none`,stroke:`oklch(0.4 0 0)`,strokeWidth:`1`,strokeDasharray:`3 3`}),(0,o.jsx)(`text`,{x:`50%`,textAnchor:`middle`,fontSize:`64`,fill:`oklch(0.85 0.18 60)`,fontWeight:`700`,children:(0,o.jsx)(`textPath`,{href:`#wham-ww-curve`,children:`curved text`})})]})}),(0,o.jsx)(`p`,{className:`text-xs text-gray-500`,children:`虛線是 path 本身,文字沿著走。`})]})}var d=t({default:()=>m,frontmatter:()=>f}),f={title:`The Wide World of SVG, filters / gradients / patterns / textPath`,sourceUrl:`https://courses.joshwcomeau.com/wham/02-svg/11-others`,lessonNumber:`02-svg/11-others`,order:23,summary:"SVG 還有四個常被遺忘的工具:`<filter>`(底層的 CSS filter)、`<linearGradient>`(SVG 元素不能用 CSS gradient,只能這個)、`<pattern>`(平鋪)、`<textPath>`(沿曲線排字)。",tags:[`svg`,`filter`,`gradient`,`pattern`,`text-path`]};function p(e){let t={code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...r(),...e.components},{DemoFrame:n}=t;return n||h(`DemoFrame`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`TL;DR`}),`
`,(0,o.jsxs)(t.p,{children:[`CSS 的 `,(0,o.jsx)(t.code,{children:`filter: blur(...)`}),` / `,(0,o.jsx)(t.code,{children:`drop-shadow(...)`}),` 其實底下都是 SVG filter。SVG 直接用 `,(0,o.jsx)(t.code,{children:`<filter>`}),` element 寫,自由度高很多 — 但學習曲線陡。Gradient / Pattern / TextPath 同樣 SVG 自己一套,跟 CSS 完全分離。`]}),`
`,(0,o.jsxs)(t.h2,{children:[`Filter — `,(0,o.jsx)(t.code,{children:`<feDropShadow>`}),` 是內建捷徑`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-svg`,children:`<filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
  <feDropShadow dx="2" dy="4" stdDeviation="4" />
</filter>
<circle filter="url(#shadow)" .../>
`})}),`
`,(0,o.jsx)(n,{title:`feDropShadow — dx/dy/blur sliders`,children:(0,o.jsx)(s,{})}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:`<filter>`}),` 自身有預設的 `,(0,o.jsx)(t.code,{children:`x/y/width/height: -10% / 120%`}),`,`,(0,o.jsx)(t.strong,{children:`任何超出 filter 邊界的 pixel 都會被 clip`}),`。模糊或 shadow 容易被切掉,記得手動把 filter 範圍開大(課程例 `,(0,o.jsx)(t.code,{children:`-100% 300%`}),`)。`]}),`
`,(0,o.jsxs)(t.p,{children:[`更進階的 filter 用 chain:`,(0,o.jsx)(t.code,{children:`feGaussianBlur`}),` → `,(0,o.jsx)(t.code,{children:`feOffset`}),` → `,(0,o.jsx)(t.code,{children:`feMerge`}),` 自己疊出 drop shadow(在 `,(0,o.jsx)(t.code,{children:`feDropShadow`}),` 出現之前的標準做法)。但 `,(0,o.jsx)(t.code,{children:`feDropShadow`}),` 90%+ 瀏覽器支援度,直接用就好。`]}),`
`,(0,o.jsx)(t.h2,{children:`Linear Gradient`}),`
`,(0,o.jsxs)(t.p,{children:[`CSS 的 `,(0,o.jsx)(t.code,{children:`linear-gradient()`}),` 不能用在 SVG fill 上 — SVG 自己一套:`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-svg`,children:`<defs>
  <linearGradient id="g" x1="0" y1="0" x2="100%" y2="100%">
    <stop offset="0%" stop-color="hsl(200 100% 90%)" />
    <stop offset="100%" stop-color="hsl(245 100% 50%)" />
  </linearGradient>
</defs>
<rect fill="url(#g)" .../>
`})}),`
`,(0,o.jsx)(n,{title:`linearGradient — angle slider rotates the gradient line`,children:(0,o.jsx)(c,{})}),`
`,(0,o.jsx)(t.p,{children:`CSS 用「角度」、SVG 用「兩點定義的線段」(x1, y1 → x2, y2)。stops 沿著這條線分佈。觀念跟 Figma 的 gradient handle 一致。`}),`
`,(0,o.jsx)(t.h2,{children:`Pattern — 平鋪`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-svg`,children:`<pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
  <path d="M 0,0 L 4,0 L 4,4" stroke="white" />
</pattern>
<rect fill="url(#grid)" .../>
`})}),`
`,(0,o.jsx)(n,{title:`pattern — repeating ⌐ shape across the rect`,children:(0,o.jsx)(l,{})}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:`patternUnits="userSpaceOnUse"`}),` 讓 pattern 內部用跟 viewBox 一樣的座標(預設是 0~1 normalized,常常算錯)。比起 CSS 的 `,(0,o.jsx)(t.code,{children:`background-repeat`}),`,SVG pattern 可以套在任意 shape 的 fill,還能用整套 SVG 工具(stroke / gradient / animation)。`]}),`
`,(0,o.jsx)(t.h2,{children:`Text on a path`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-svg`,children:`<defs>
  <path id="curve" d="M 30,120 Q 250,20 470,120" />
</defs>
<text>
  <textPath href="#curve">curved text</textPath>
</text>
`})}),`
`,(0,o.jsx)(n,{title:`textPath — type follows curve`,children:(0,o.jsx)(u,{})}),`
`,(0,o.jsxs)(t.p,{children:[`實際上是 web 上`,(0,o.jsx)(t.strong,{children:`唯一`}),`做曲線文字的方法。但有兩個雷:`]}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:`字超過 path 長度會被截掉。`}),`
`,(0,o.jsxs)(t.li,{children:[`沒辦法自動 fit — 要手調 `,(0,o.jsx)(t.code,{children:`font-size`}),` / `,(0,o.jsx)(t.code,{children:`letter-spacing`}),`。`]}),`
`]}),`
`,(0,o.jsx)(t.h2,{children:`Gotchas`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`Filter 預設 clip 邊界`}),`:模糊量超過 `,(0,o.jsx)(t.code,{children:`-10%/120%`}),` 一定要手動加大,不然看起來好像沒模糊到。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsxs)(t.strong,{children:[`Gradient / pattern 必須在 `,(0,o.jsx)(t.code,{children:`<defs>`})]}),` 才會被 `,(0,o.jsx)(t.code,{children:`url(#id)`}),` 找到。雖然有時候在 SVG 任意位置也能 work,但 stricter 的瀏覽器會拋掉。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`SVG filter 會建立 stacking context`}),`,堆疊順序會改變,跟 z-index 互動要注意。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`font-size px vs rem`}),`:SVG `,(0,o.jsx)(t.code,{children:`text`}),` 用 `,(0,o.jsx)(t.code,{children:`font-size: 84`}),` 是 viewBox px,不是螢幕 px。SVG 的最外 `,(0,o.jsx)(t.code,{children:`<svg>`}),` 用 rem 大小才能讓字隨使用者放大字級調整。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsxs)(t.strong,{children:[`textPath 的 `,(0,o.jsx)(t.code,{children:`startOffset`})]}),`:預設文字從 path 起點開始排,可以用 `,(0,o.jsx)(t.code,{children:`startOffset="50%"`}),` 讓字置中於 path,但要算長度。`]}),`
`]})]})}function m(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(p,{...e})}):p(e)}function h(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as n,f as t};