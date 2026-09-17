import{i as e,n as t,o as n,r,s as i}from"./lib-YcyfOEfe.js";import{t as a}from"./range-twbD2NVu.js";var o=i(e(),1),s=r(),c=8,l=`hsl(210deg 15% 6%)`,u=.25,d=`
.smt-toggle {
  --smooth: cubic-bezier(0.2, 0.8, 0, 1);
  --spring: linear(0, 0.031 1.4%, 0.136 3.1%, 0.711 9.2%, 0.933 12.1%, 1.073 15%, 1.115 16.5%, 1.138 18%, 1.146 19.7%, 1.137 21.6%, 1.015 31.2%, 0.992 34.2%, 0.98 37.4%, 1.003 56.6%, 1);
  position: relative;
  margin: 0;
  padding: 0;
  border: 1px solid hsl(210deg 15% 25%);
  border-radius: 2px;
  background: transparent;

  input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    appearance: none;
    cursor: pointer;
  }
  svg {
    width: 64px;
    height: 64px;
  }
}

.smt-sun-moon-svg {
  fill: white;
  transform: rotate(0deg);

  .smt-sun-moon-shapeshifter {
    cx: 16px;
    cy: 16px;
    r: 10px;
  }
  .smt-moon-cutout-circle {
    cy: 8px;
    cx: 22px;
    r: 10px;
  }

  .smt-sun-dot {
    --angle: calc(var(--index) * 45deg);
    cx: 16px;
    cy: 16px;
    r: 2px;
    fill: transparent;
    transform: translate(0px, 0px);
  }

  /* checked = light (sun) */
  .smt-toggle:has(input:checked) & {
    transform: rotate(90deg);

    .smt-sun-moon-shapeshifter {
      r: 8px;
    }
    /* Local cy change; the rotate(90deg) above makes it read as sideways on screen. */
    .smt-moon-cutout-circle {
      cy: -8px;
    }

    .smt-sun-dot {
      --distance: 12px;
      fill: white;
      transform-origin: 16px 16px;
      transform: translate(
        calc(cos(var(--angle)) * var(--distance)),
        calc(sin(var(--angle)) * var(--distance))
      );
    }
  }
}

@media (prefers-reduced-motion: no-preference) {
  .smt-sun-moon-svg {
    transition: transform 1200ms var(--smooth);

    .smt-sun-moon-shapeshifter {
      transition: r 900ms var(--smooth);
    }
    .smt-moon-cutout-circle {
      transition: cy 1200ms var(--smooth);
    }

    /* Used when leaving the sun state: 250ms, no delay. */
    .smt-sun-dot {
      transition: transform 250ms, fill 250ms;
    }

    /* Used when entering the sun state: spring + 80ms per index. */
    .smt-toggle:has(input:checked) & .smt-sun-dot {
      --delay: calc(var(--index) * 80ms);
      transition:
        transform 1200ms var(--spring) var(--delay),
        fill 250ms var(--delay);
    }
  }
}

/* ---- X-ray demo only (not part of Josh's solution) ---- */
.smt-toggle.smt-xray svg {
  width: 160px;
  height: 160px;
  overflow: visible;
}
.smt-xray .smt-cutout-outline {
  fill: none;
  stroke: hsl(350deg 90% 65%);
  stroke-width: 0.5px;
  stroke-dasharray: 1.5 1;
}
.smt-sun-moon-svg {
  .smt-toggle[data-rotate='false']:has(input:checked) & {
    transform: rotate(0deg);
  }
}
`;function f({maskId:e,showCutout:t=!1,svgRef:n}){return(0,s.jsxs)(`svg`,{ref:n,viewBox:`0 0 32 32`,"aria-hidden":`true`,className:`smt-sun-moon-svg`,children:[(0,s.jsxs)(`mask`,{id:e,children:[(0,s.jsx)(`rect`,{x:`0`,y:`0`,width:`32`,height:`32`}),(0,s.jsx)(`circle`,{className:`smt-moon-cutout-circle`,fill:`black`})]}),(0,s.jsx)(`circle`,{className:`smt-sun-moon-shapeshifter`,mask:`url(#${e})`}),a(c).map(e=>(0,s.jsx)(`circle`,{className:`smt-sun-dot`,style:{"--index":e}},e)),t&&(0,s.jsx)(`circle`,{className:`smt-moon-cutout-circle smt-cutout-outline`})]})}function p(){let e=`${(0,o.useId)()}-moon-cutout`;return(0,s.jsxs)(`div`,{className:`grid h-48 place-content-center rounded-md`,style:{background:l},children:[(0,s.jsx)(`style`,{children:d}),(0,s.jsxs)(`label`,{className:`smt-toggle`,children:[(0,s.jsx)(f,{maskId:e}),(0,s.jsx)(`input`,{type:`checkbox`}),(0,s.jsx)(`span`,{className:`sr-only`,children:`Toggle light/dark mode`})]})]})}function m(){let e=`${(0,o.useId)()}-moon-cutout`,t=(0,o.useRef)(null),[n,r]=(0,o.useState)(!0),[i,a]=(0,o.useState)(!0);function c(){i&&t.current?.getAnimations({subtree:!0}).forEach(e=>{e.playbackRate=u})}return(0,s.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,s.jsx)(`style`,{children:d}),(0,s.jsx)(`div`,{className:`grid h-[360px] place-content-center overflow-hidden rounded-md`,style:{background:l},children:(0,s.jsxs)(`label`,{className:`smt-toggle smt-xray`,"data-rotate":n,children:[(0,s.jsx)(f,{maskId:e,showCutout:!0,svgRef:t}),(0,s.jsx)(`input`,{type:`checkbox`,onChange:c}),(0,s.jsx)(`span`,{className:`sr-only`,children:`Toggle light/dark mode`})]})}),(0,s.jsxs)(`div`,{className:`flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700`,children:[(0,s.jsxs)(`label`,{className:`flex items-center gap-2`,children:[(0,s.jsx)(`input`,{type:`checkbox`,checked:n,onChange:e=>r(e.target.checked)}),`rotate SVG 90°`]}),(0,s.jsxs)(`label`,{className:`flex items-center gap-2`,children:[(0,s.jsx)(`input`,{type:`checkbox`,checked:i,onChange:e=>a(e.target.checked)}),`slow motion (×`,u,`)`]}),(0,s.jsx)(`span`,{className:`text-gray-500`,children:`紅色虛線 = mask 裡的 cutout circle；外框 = viewBox`})]})]})}var h=n({default:()=>v,frontmatter:()=>g}),g={title:`Sun/Moon Toggle (SVG mask + CSS-only polar transitions)`,sourceUrl:`https://courses.joshwcomeau.com/wham/animation-challenges/06-sun-moon-toggle`,lessonNumber:`animation-challenges/06-sun-moon-toggle`,order:6,summary:"純 CSS 的 dark/light toggle：`:has(input:checked)` 讀 checkbox，SVG mask 裡的 cutout 圓滑開讓月牙長成太陽，8 顆 sun dot 用 CSS `cos()` / `sin()` 散成一圈。關鍵細節是整顆 SVG 同時轉 90°，cutout 從直線滑動變成弧線甩出去。",tags:[`mask`,`css-transition`,`polar-coordinates`,`svg`,`linear-function`,`stagger`,`prefers-reduced-motion`]};function _(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,span:`span`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components},{DemoFrame:r}=n;return r||y(`DemoFrame`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h2,{children:`TL;DR`}),`
`,(0,s.jsxs)(n.ul,{children:[`
`,(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:`整顆 SVG 在切換時轉 90°。`}),` 沒轉的話，cutout 就是一顆圓往一個方向直直滑開，很陽春；轉起來後 cutout 在畫面上沿弧線甩出去，光芒也被帶著甩一下。代價是 CSS 裡 cutout 改的是 `,(0,s.jsx)(n.code,{children:`cy`}),`（local 的垂直方向），畫面上才會往右走。`]}),`
`,(0,s.jsxs)(n.li,{children:[`月牙 = 白色圓 + `,(0,s.jsx)(n.code,{children:`<mask>`}),`：白 rect 全保留、黑 circle 咬一口。Light mode 把 cutout 的 `,(0,s.jsx)(n.code,{children:`cy`}),` 從 `,(0,s.jsx)(n.code,{children:`8px`}),` 推到 `,(0,s.jsx)(n.code,{children:`-8px`}),`、推出主圓外，同時主圓 `,(0,s.jsx)(n.code,{children:`r`}),` 從 `,(0,s.jsx)(n.code,{children:`10px`}),` 縮到 `,(0,s.jsx)(n.code,{children:`8px`}),`，替光芒留位置。`]}),`
`,(0,s.jsxs)(n.li,{children:[`8 顆 sun dot 各帶一個 inline `,(0,s.jsx)(n.code,{children:`--index`}),`。CSS 自己算 `,(0,s.jsx)(n.code,{children:`--angle: calc(var(--index) * 45deg)`}),`，再用 `,(0,s.jsx)(n.code,{children:`translate(calc(cos(var(--angle)) * 12px), ...)`}),` 做 polar → cartesian。動畫全程沒有 JS。`]}),`
`,(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:`Transition 寫在「目的地」狀態上。`}),` 進 light mode 用 checked rule 裡的 1200ms spring + `,(0,s.jsx)(n.code,{children:`var(--index) * 80ms`}),` stagger；回 dark mode 用 base rule 的 250ms、無 delay。同一顆 dot，出去慢、回來快。`]}),`
`,(0,s.jsxs)(n.li,{children:[`所有 `,(0,s.jsx)(n.code,{children:`transition`}),` 都包在 `,(0,s.jsx)(n.code,{children:`@media (prefers-reduced-motion: no-preference)`}),` 裡，reduced motion 就瞬切。Interrupt 交給 CSS transition 原生的「從當下值折返」。`]}),`
`]}),`
`,(0,s.jsx)(r,{title:`Sun/Moon toggle — click the box`,children:(0,s.jsx)(p,{})}),`
`,(0,s.jsx)(n.h2,{children:`Spec`}),`
`,(0,s.jsxs)(n.ul,{children:[`
`,(0,s.jsx)(n.li,{children:`一個有框線的區域，裡面疊一個看不見的 checkbox。點框就切換 checkbox，SVG 依狀態顯示月亮或太陽。`}),`
`,(0,s.jsx)(n.li,{children:`月牙要平順長成完整的圓。8 顆小圓當光芒，在 360° 一圈上等距往外散，而且一顆接一顆 stagger。`}),`
`,(0,s.jsx)(n.li,{children:`動畫不准用 JavaScript，只能用 CSS transition 和 SVG 元素。`}),`
`,(0,s.jsx)(n.li,{children:`對 motion 敏感的使用者：太陽和月亮直接瞬間切換。`}),`
`,(0,s.jsx)(n.li,{children:`動畫中途反覆點（interrupt）也要順。`}),`
`]}),`
`,(0,s.jsx)(n.h2,{children:`Technique map`}),`
`,(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{children:`Requirement`}),(0,s.jsx)(n.th,{children:`Technique`}),(0,s.jsx)(n.th,{children:`Note`})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:`月牙形狀`}),(0,s.jsxs)(n.td,{children:[(0,s.jsx)(n.code,{children:`<mask>`}),`：白 rect + 黑 circle 挖洞`]}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.a,{href:`/wham/svg/masks`,children:`SVG Masks`})})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:`月牙長成太陽`}),(0,s.jsxs)(n.td,{children:[`CSS transition 動 `,(0,s.jsx)(n.code,{children:`cy`}),` / `,(0,s.jsx)(n.code,{children:`r`}),` 這類 geometry property`]}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.a,{href:`/wham/svg/svg-animations`,children:`SVG Animations`})})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:`同頁多個 toggle 不撞 mask id`}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:`useId()`})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.a,{href:`/wham/svg/unique-ids`,children:`Unique IDs`})})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:`光芒排成一圈`}),(0,s.jsxs)(n.td,{children:[`polar → cartesian，搬進 CSS `,(0,s.jsx)(n.code,{children:`cos()`}),` / `,(0,s.jsx)(n.code,{children:`sin()`})]}),(0,s.jsxs)(n.td,{children:[(0,s.jsx)(n.a,{href:`/wham/particles/polar-coordinates`,children:`Polar Coordinates`}),`、`,(0,s.jsx)(n.a,{href:`/wham/particles/trigonometry-101`,children:`Trigonometry 101`})]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:`360° 等分`}),(0,s.jsxs)(n.td,{children:[(0,s.jsx)(n.code,{children:`index * 45deg`}),`（360 / 8）`]}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.a,{href:`/wham/particles/particle-distribution`,children:`Particle Distribution`})})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:`光芒 stagger`}),(0,s.jsxs)(n.td,{children:[`transition delay = `,(0,s.jsx)(n.code,{children:`var(--index) * 80ms`})]}),(0,s.jsx)(n.td,{children:`沒有專門的 note`})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:`光芒回彈`}),(0,s.jsxs)(n.td,{children:[(0,s.jsx)(n.code,{children:`linear()`}),` spring，當 custom property token 共用`]}),(0,s.jsxs)(n.td,{children:[(0,s.jsx)(n.a,{href:`/wham/svg/linear`,children:`linear() Function`}),`、`,(0,s.jsx)(n.a,{href:`/wham/svg/favourite-pattern`,children:`My Favourite Pattern`})]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:`誇張的 ease-out`}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:`cubic-bezier(0.2, 0.8, 0, 1)`})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.a,{href:`/wham/particles/custom-curves`,children:`Custom Curves`})})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:`弧線甩出去的感覺`}),(0,s.jsxs)(n.td,{children:[`外層 `,(0,s.jsx)(n.code,{children:`<svg>`}),` 轉 90°`]}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.a,{href:`/wham/svg/transforms-in-svg`,children:`Transforms in SVG`})})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:`不靠 JS 讀 checkbox 狀態`}),(0,s.jsxs)(n.td,{children:[(0,s.jsx)(n.code,{children:`.toggle:has(input:checked) &`}),` + CSS nesting`]}),(0,s.jsx)(n.td,{children:`沒有專門的 note`})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:`Reduced motion 瞬切`}),(0,s.jsxs)(n.td,{children:[`transition 只寫在 `,(0,s.jsx)(n.code,{children:`no-preference`}),` 裡`]}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.a,{href:`/wham/particles/motion-accessibility`,children:`Motion Accessibility`})})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:`Interrupt`}),(0,s.jsxs)(n.td,{children:[`CSS transition 原生折返；`,(0,s.jsx)(n.code,{children:`linear()`}),` spring 被打斷的限制`]}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.a,{href:`/wham/svg/linear-limitations`,children:`linear() Limitations`})})]})]})]}),`
`,(0,s.jsx)(n.h2,{children:`Build order`}),`
`,(0,s.jsxs)(`details`,{children:[(0,s.jsx)(`summary`,{children:`Hint 1 — Crescent via a mask`}),(0,s.jsxs)(n.p,{children:[`先畫一個白色圓，再用 `,(0,s.jsx)(n.code,{children:`<mask>`}),`（或 `,(0,s.jsx)(n.code,{children:`clip-path`}),`）挖掉一顆圓，就是月牙。`]}),(0,s.jsxs)(n.p,{children:[`切到 light mode 不用換 shape：把 mask 裡那顆 cutout `,(0,s.jsx)(n.code,{children:`<circle>`}),` 移開，月牙自己補滿成圓。`]}),(0,s.jsx)(n.p,{children:`太陽要比月亮小一點。不然光芒一加上去，整個 icon 會明顯變大。`})]}),`
`,(0,s.jsxs)(`details`,{children:[(0,s.jsx)(`summary`,{children:`Hint 2 — Eight sun rays`}),(0,s.jsxs)(n.p,{children:[`放 8 個 `,(0,s.jsx)(n.code,{children:`<circle>`}),`，每顆有自己的角度（0° 到 315°）和自己的 delay。用 polar coordinates 算位置，讓每顆從 SVG 正中心滑到離中心 12px 的地方。`]}),(0,s.jsxs)(n.p,{children:[`位移改 `,(0,s.jsx)(n.code,{children:`cx`}),` / `,(0,s.jsx)(n.code,{children:`cy`}),` 或用 CSS `,(0,s.jsx)(n.code,{children:`transform`}),` 都可以。`]}),(0,s.jsx)(n.p,{children:`Dark mode 時光芒要隱形，不然它們會在月牙凹進去的地方露出一小塊凸起。`})]}),`
`,(0,s.jsxs)(`details`,{children:[(0,s.jsx)(`summary`,{children:`Hint 3 — Rotation and easing`}),(0,s.jsx)(n.p,{children:`mask 和光芒都做完了，還是覺得少一味？很可能是少了旋轉：Josh 的版本在兩個狀態之間讓整顆 SVG 轉 90°。`}),(0,s.jsx)(n.p,{children:`不轉的話，cutout 一看就是一顆圓在做直線位移。轉起來後 cutout 的路徑變成弧線、有機很多，光芒也跟著多了一點甩動。`}),(0,s.jsx)(n.p,{children:`另一個常漏的是 timing function：大部分元素用很誇張的 ease-out，光芒用會彈的 spring。`})]}),`
`,(0,s.jsx)(n.h2,{children:`Why the whole SVG rotates 90°`}),`
`,(0,s.jsx)(r,{title:`X-ray — cutout outline, rotation on/off, slow motion`,children:(0,s.jsx)(m,{})}),`
`,(0,s.jsxs)(n.p,{children:[`紅色虛線是 mask 裡那顆 cutout 的分身：同一個 class、吃同一組 CSS rule，只是放在 `,(0,s.jsx)(n.code,{children:`<mask>`}),` 外面、改用 stroke 畫出來。這個 demo 把 SVG 設成 `,(0,s.jsx)(n.code,{children:`overflow: visible`}),`，cutout 跑出 viewBox 也看得到。`]}),`
`,(0,s.jsxs)(n.ul,{children:[`
`,(0,s.jsx)(n.li,{children:`關掉 rotate 再點：cutout 直直往上滑出去。Josh 嫌這個版本太平淡。`}),`
`,(0,s.jsx)(n.li,{children:`打開 rotate：cutout 在 local 座標往上走的同時，整個座標系順時針轉 90°。兩個運動疊在一起，畫面上 cutout 從右上沿弧線掃到右側。`}),`
`]}),`
`,(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,s.jsxs)(n.code,{children:[(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#6F42C1`},children:`.smt-sun-moon-svg`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`  transform`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`rotate`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`0`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`deg`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`);`})]}),`
`,(0,s.jsx)(n.span,{className:`line`}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`  .`}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`smt-toggle`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`:has(input:checked) & {`})]}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`    transform`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`rotate`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`90`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`deg`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`);`})]}),`
`,(0,s.jsx)(n.span,{className:`line`}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`    .`}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`smt-moon-cutout-circle`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`      cy`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`-8`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`px`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,s.jsx)(n.span,{className:`line`,children:(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`    }`})}),`
`,(0,s.jsx)(n.span,{className:`line`,children:(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`  }`})}),`
`,(0,s.jsx)(n.span,{className:`line`,children:(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`}`})})]})})}),`
`,(0,s.jsxs)(n.p,{children:[`這也是 cutout 動 `,(0,s.jsx)(n.code,{children:`cy`}),` 而不是 `,(0,s.jsx)(n.code,{children:`cx`}),` 的原因。順時針轉 90° 之後，local 的「往上」在畫面上變成「往右」。在會旋轉的座標系裡寫位移，要先想「轉完之後這個方向在畫面上是哪」。`]}),`
`,(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:`rotate`}),` 套在外層 `,(0,s.jsx)(n.code,{children:`<svg>`}),` 上。外層 `,(0,s.jsx)(n.code,{children:`<svg>`}),` 是 HTML layout 裡的一個 box，`,(0,s.jsx)(n.code,{children:`transform-origin`}),` 預設的 `,(0,s.jsx)(n.code,{children:`50% 50%`}),` 就是 viewBox 中心，不會踩到 `,(0,s.jsx)(n.a,{href:`/wham/svg/transforms-in-svg`,children:`Transforms in SVG`}),` 講的 origin 陷阱。光芒 45° 一顆，轉 90° 後終點跟沒轉時重合，只有路徑被甩彎。`]}),`
`,(0,s.jsx)(n.h2,{children:`Crescent: a mask with a sliding cutout`}),`
`,(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,s.jsxs)(n.code,{children:[(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`<`}),(0,s.jsx)(n.span,{style:{color:`#22863A`},children:`mask`}),(0,s.jsx)(n.span,{style:{color:`#6F42C1`},children:` id`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`{maskId}>`})]}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`  <`}),(0,s.jsx)(n.span,{style:{color:`#22863A`},children:`rect`}),(0,s.jsx)(n.span,{style:{color:`#6F42C1`},children:` x`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,s.jsx)(n.span,{style:{color:`#032F62`},children:`"0"`}),(0,s.jsx)(n.span,{style:{color:`#6F42C1`},children:` y`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,s.jsx)(n.span,{style:{color:`#032F62`},children:`"0"`}),(0,s.jsx)(n.span,{style:{color:`#6F42C1`},children:` width`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,s.jsx)(n.span,{style:{color:`#032F62`},children:`"32"`}),(0,s.jsx)(n.span,{style:{color:`#6F42C1`},children:` height`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,s.jsx)(n.span,{style:{color:`#032F62`},children:`"32"`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:` />`})]}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`  <`}),(0,s.jsx)(n.span,{style:{color:`#22863A`},children:`circle`}),(0,s.jsx)(n.span,{style:{color:`#6F42C1`},children:` className`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,s.jsx)(n.span,{style:{color:`#032F62`},children:`"smt-moon-cutout-circle"`}),(0,s.jsx)(n.span,{style:{color:`#6F42C1`},children:` fill`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,s.jsx)(n.span,{style:{color:`#032F62`},children:`"black"`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:` />`})]}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`</`}),(0,s.jsx)(n.span,{style:{color:`#22863A`},children:`mask`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`>`})]}),`
`,(0,s.jsx)(n.span,{className:`line`}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`<`}),(0,s.jsx)(n.span,{style:{color:`#22863A`},children:`circle`}),(0,s.jsx)(n.span,{style:{color:`#6F42C1`},children:` className`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,s.jsx)(n.span,{style:{color:`#032F62`},children:`"smt-sun-moon-shapeshifter"`}),(0,s.jsx)(n.span,{style:{color:`#6F42C1`},children:` mask`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`{`}),(0,s.jsx)(n.span,{style:{color:`#032F62`},children:"`url(#${"}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`maskId`}),(0,s.jsx)(n.span,{style:{color:`#032F62`},children:"})`"}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`} />`})]})]})})}),`
`,(0,s.jsxs)(n.p,{children:[`幾何全放在 CSS，JSX 的 `,(0,s.jsx)(n.code,{children:`<circle>`}),` 沒有 `,(0,s.jsx)(n.code,{children:`cx`}),` / `,(0,s.jsx)(n.code,{children:`cy`}),` / `,(0,s.jsx)(n.code,{children:`r`}),` attribute：`]}),`
`,(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,s.jsxs)(n.code,{children:[(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#6F42C1`},children:`.smt-sun-moon-shapeshifter`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`  cx`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`16`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`px`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`  cy`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`16`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`px`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`  r`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`10`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`px`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,s.jsx)(n.span,{className:`line`,children:(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`}`})}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#6F42C1`},children:`.smt-moon-cutout-circle`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`  cy`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`8`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`px`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`  cx`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`22`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`px`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`  r`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`10`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`px`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,s.jsx)(n.span,{className:`line`,children:(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`}`})})]})})}),`
`,(0,s.jsxs)(n.ul,{children:[`
`,(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:`Dark mode`}),`：cutout 圓心 (22, 8) 到主圓圓心 (16, 16) 距離剛好 10，等於半徑，所以右上被咬掉一大口，剩下月牙。`]}),`
`,(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:`Light mode`}),`：cutout 移到 (22, -8)，距離約 24.7，大於兩個半徑相加的 18，完全離開主圓，整顆圓露出來。`]}),`
`,(0,s.jsxs)(n.li,{children:[`主圓同時從 `,(0,s.jsx)(n.code,{children:`r: 10px`}),` 縮到 `,(0,s.jsx)(n.code,{children:`8px`}),`，用 900ms，比 cutout 的 1200ms 快。為什麼要縮：光芒終點離中心 12px、自己半徑 2px，內緣在 10px。主圓維持 10px 的話，光芒會黏在太陽邊上。縮到 8px 留出 2px 縫，光芒外緣 14px 也還在 viewBox 的 16px 以內。`]}),`
`]}),`
`,(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:`<rect>`}),` 沒寫 `,(0,s.jsx)(n.code,{children:`fill`}),`。它是白的，只因為 `,(0,s.jsx)(n.code,{children:`.smt-sun-moon-svg`}),` 設了 `,(0,s.jsx)(n.code,{children:`fill: white`}),`，CSS 繼承一路傳進 `,(0,s.jsx)(n.code,{children:`<mask>`}),`。cutout 的 `,(0,s.jsx)(n.code,{children:`fill="black"`}),` 是 presentation attribute，會蓋過繼承來的值。`]}),`
`,(0,s.jsx)(n.h2,{children:`Sun dots: polar coordinates in pure CSS`}),`
`,(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,s.jsxs)(n.code,{children:[(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`{`}),(0,s.jsx)(n.span,{style:{color:`#6F42C1`},children:`range`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`NUM_OF_SUN_DOTS`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`).`}),(0,s.jsx)(n.span,{style:{color:`#6F42C1`},children:`map`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`((`}),(0,s.jsx)(n.span,{style:{color:`#E36209`},children:`index`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`) `}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`=>`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:` (`})]}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`  <`}),(0,s.jsx)(n.span,{style:{color:`#22863A`},children:`circle`}),(0,s.jsx)(n.span,{style:{color:`#6F42C1`},children:` key`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`{index} `}),(0,s.jsx)(n.span,{style:{color:`#6F42C1`},children:`className`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,s.jsx)(n.span,{style:{color:`#032F62`},children:`"smt-sun-dot"`}),(0,s.jsx)(n.span,{style:{color:`#6F42C1`},children:` style`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`{{ `}),(0,s.jsx)(n.span,{style:{color:`#032F62`},children:`'--index'`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`: index } `}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`as`}),(0,s.jsx)(n.span,{style:{color:`#6F42C1`},children:` React`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`.`}),(0,s.jsx)(n.span,{style:{color:`#6F42C1`},children:`CSSProperties`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`} />`})]}),`
`,(0,s.jsx)(n.span,{className:`line`,children:(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`))}`})})]})})}),`
`,(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,s.jsxs)(n.code,{children:[(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#6F42C1`},children:`.smt-sun-dot`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#E36209`},children:`  --angle`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`calc`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`var`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,s.jsx)(n.span,{style:{color:`#E36209`},children:`--index`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`) `}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`*`}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:` 45`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`deg`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`);`})]}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`  cx`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`16`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`px`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`  cy`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`16`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`px`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`  r`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`2`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`px`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`  fill`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`transparent`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`  transform`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`translate`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`0`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`px`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`, `}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`0`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`px`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`);`})]}),`
`,(0,s.jsx)(n.span,{className:`line`,children:(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`}`})}),`
`,(0,s.jsx)(n.span,{className:`line`}),`
`,(0,s.jsx)(n.span,{className:`line`,children:(0,s.jsx)(n.span,{style:{color:`#6A737D`},children:`/* inside .smt-toggle:has(input:checked) & */`})}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#6F42C1`},children:`.smt-sun-dot`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#E36209`},children:`  --distance`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`12`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`px`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`  fill`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`white`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`  transform-origin`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`16`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`px`}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:` 16`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`px`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`  transform`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`translate`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`(`})]}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`    calc`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`cos`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`var`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,s.jsx)(n.span,{style:{color:`#E36209`},children:`--angle`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`)) `}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`*`}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:` var`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,s.jsx)(n.span,{style:{color:`#E36209`},children:`--distance`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`)),`})]}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`    calc`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`sin`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`var`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,s.jsx)(n.span,{style:{color:`#E36209`},children:`--angle`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`)) `}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`*`}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:` var`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,s.jsx)(n.span,{style:{color:`#E36209`},children:`--distance`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`))`})]}),`
`,(0,s.jsx)(n.span,{className:`line`,children:(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`  );`})}),`
`,(0,s.jsx)(n.span,{className:`line`,children:(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`}`})})]})})}),`
`,(0,s.jsxs)(n.ul,{children:[`
`,(0,s.jsxs)(n.li,{children:[`8 顆 dot 的圓心都疊在 (16, 16)，靠 `,(0,s.jsx)(n.code,{children:`transform`}),` 位移，不改 `,(0,s.jsx)(n.code,{children:`cx`}),` / `,(0,s.jsx)(n.code,{children:`cy`}),`。公式跟 `,(0,s.jsx)(n.a,{href:`/wham/particles/polar-coordinates`,children:`Polar Coordinates`}),` 的 `,(0,s.jsx)(n.code,{children:`convertPolarToCartesian`}),` 一樣，只是搬進 CSS。`]}),`
`,(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:`--angle`}),` 帶 `,(0,s.jsx)(n.code,{children:`deg`}),` 單位，`,(0,s.jsx)(n.code,{children:`cos()`}),` 才會把它當角度。`]}),`
`,(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:`--index`}),` 一個數字兩個用途：算角度，也算 delay。Josh 手動給 index，是因為 Firefox 還不支援 `,(0,s.jsx)(n.code,{children:`sibling-index()`}),`。React 版用 `,(0,s.jsx)(n.code,{children:`range(8).map`}),` 生成，index 本來就有。`]}),`
`,(0,s.jsxs)(n.li,{children:[`Dark mode 的 `,(0,s.jsx)(n.code,{children:`fill: transparent`}),`：縮在中心的 dot 正好壓在 cutout 的邊上。不藏起來的話，月牙凹處會冒出一個小凸點。`]}),`
`,(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:`transform-origin: 16px 16px`}),` 對 `,(0,s.jsx)(n.code,{children:`translate`}),` 沒有影響，位移跟 origin 無關。Josh 的 solution 有寫，我照留。`]}),`
`]}),`
`,(0,s.jsx)(n.h2,{children:`Transitions live on the destination state`}),`
`,(0,s.jsxs)(n.p,{children:[`CSS transition 用的是「變化後」那組 style 的 `,(0,s.jsx)(n.code,{children:`transition`}),` 值。Josh 靠這點讓同一顆 dot 進出用不同節奏：`]}),`
`,(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,s.jsxs)(n.code,{children:[(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`@media`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:` (prefers-reduced-motion: no-preference) {`})]}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#6F42C1`},children:`  .smt-sun-moon-svg`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`    transition`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`: transform `}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`1200`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`ms`}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:` var`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,s.jsx)(n.span,{style:{color:`#E36209`},children:`--smooth`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`);`})]}),`
`,(0,s.jsx)(n.span,{className:`line`}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`    .`}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`smt-sun-moon-shapeshifter`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`      transition`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`: r `}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`900`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`ms`}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:` var`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,s.jsx)(n.span,{style:{color:`#E36209`},children:`--smooth`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`);`})]}),`
`,(0,s.jsx)(n.span,{className:`line`,children:(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`    }`})}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#6F42C1`},children:`    .smt-moon-cutout-circle`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`      transition`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`: cy `}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`1200`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`ms`}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:` var`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,s.jsx)(n.span,{style:{color:`#E36209`},children:`--smooth`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`);`})]}),`
`,(0,s.jsx)(n.span,{className:`line`,children:(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`    }`})}),`
`,(0,s.jsx)(n.span,{className:`line`}),`
`,(0,s.jsx)(n.span,{className:`line`,children:(0,s.jsx)(n.span,{style:{color:`#6A737D`},children:`    /* Used when leaving the sun state: 250ms, no delay. */`})}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#6F42C1`},children:`    .smt-sun-dot`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`      transition`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`: transform `}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`250`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`ms`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`, `}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`fill`}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:` 250`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`ms`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,s.jsx)(n.span,{className:`line`,children:(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`    }`})}),`
`,(0,s.jsx)(n.span,{className:`line`}),`
`,(0,s.jsx)(n.span,{className:`line`,children:(0,s.jsx)(n.span,{style:{color:`#6A737D`},children:`    /* Used when entering the sun state: spring + 80ms per index. */`})}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#6F42C1`},children:`    .smt-toggle:has`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,s.jsx)(n.span,{style:{color:`#22863A`},children:`input`}),(0,s.jsx)(n.span,{style:{color:`#6F42C1`},children:`:checked`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`) & `}),(0,s.jsx)(n.span,{style:{color:`#6F42C1`},children:`.smt-sun-dot`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#E36209`},children:`      --delay`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`calc`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`var`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,s.jsx)(n.span,{style:{color:`#E36209`},children:`--index`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`) `}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`*`}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:` 80`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`ms`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`);`})]}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`      transition`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`:`})]}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`        transform `}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`1200`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`ms`}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:` var`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,s.jsx)(n.span,{style:{color:`#E36209`},children:`--spring`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`) `}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`var`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,s.jsx)(n.span,{style:{color:`#E36209`},children:`--delay`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`),`})]}),`
`,(0,s.jsxs)(n.span,{className:`line`,children:[(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:`        fill`}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:` 250`}),(0,s.jsx)(n.span,{style:{color:`#D73A49`},children:`ms`}),(0,s.jsx)(n.span,{style:{color:`#005CC5`},children:` var`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,s.jsx)(n.span,{style:{color:`#E36209`},children:`--delay`}),(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`);`})]}),`
`,(0,s.jsx)(n.span,{className:`line`,children:(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`    }`})}),`
`,(0,s.jsx)(n.span,{className:`line`,children:(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`  }`})}),`
`,(0,s.jsx)(n.span,{className:`line`,children:(0,s.jsx)(n.span,{style:{color:`#24292E`},children:`}`})})]})})}),`
`,(0,s.jsxs)(n.ul,{children:[`
`,(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:`Moon → sun`}),`：勾起 checkbox，dot 拿到 checked rule 的 transition：1200ms `,(0,s.jsx)(n.code,{children:`--spring`}),`，delay 從 0 到 560ms 依 index 遞增。光芒一顆接一顆彈出去，衝過頭再回來。`]}),`
`,(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:`Sun → moon`}),`：取消勾選，checked rule 不再 match，dot 拿到 base rule 的 250ms、無 delay、預設 `,(0,s.jsx)(n.code,{children:`ease`}),`。8 顆同時被吸回中心。`]}),`
`,(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:`fill`}),` 跟 `,(0,s.jsx)(n.code,{children:`transform`}),` 共用同一個 `,(0,s.jsx)(n.code,{children:`--delay`}),`：每顆 dot 在自己出發那一刻才變白。`]}),`
`]}),`
`,(0,s.jsxs)(n.p,{children:[`我在 Chrome 用 `,(0,s.jsx)(n.code,{children:`getAnimations({ subtree: true })`}),` 確認過：勾選後產生 19 個 transition（svg、主圓、cutout 各 1 個，加 8 顆 dot 各 2 個），dot 的 delay 依序 0、80、160 到 560ms。取消勾選後，dot 的 transition 全部變成 250ms、delay 0。`]}),`
`,(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:`--smooth`}),` 是誇張版 ease-out：開頭衝很快、尾巴拖很長。`,(0,s.jsx)(n.code,{children:`--spring`}),` 是 `,(0,s.jsx)(n.code,{children:`linear()`}),` 烤出來的 spring，最高衝到約 1.146，所以光芒會先衝過 12px 再彈回。兩個都定義一次、到處用 `,(0,s.jsx)(n.code,{children:`var()`}),` 引用，就是 `,(0,s.jsx)(n.a,{href:`/wham/svg/favourite-pattern`,children:`My Favourite Pattern`}),` 的 token 做法。`]}),`
`,(0,s.jsx)(n.h2,{children:`Reduced motion and interrupts`}),`
`,(0,s.jsxs)(n.ul,{children:[`
`,(0,s.jsxs)(n.li,{children:[`預設樣式完全沒有 `,(0,s.jsx)(n.code,{children:`transition`}),`，只有 `,(0,s.jsx)(n.code,{children:`prefers-reduced-motion: no-preference`}),` 時才加上。Reduced motion 的使用者點下去就是瞬間換圖。看不懂這個 media query 的老瀏覽器也會退化成瞬切：motion-free by default。`]}),`
`,(0,s.jsx)(n.li,{children:`Interrupt 不用多寫：CSS transition 被打斷時，會從當下的值出發走向新目標。月亮變太陽到一半再點，cutout 從半路折返，光芒馬上用 250ms 被吸回。`}),`
`,(0,s.jsxs)(n.li,{children:[`限制在反方向：太陽縮回月亮的途中再切回太陽，新的 transition 會套 reversing shortening，duration 跟著縮短，但 `,(0,s.jsx)(n.code,{children:`linear()`}),` 曲線不變，彈跳就變急。收回只有 250ms，這個窗口很小，不太容易看到。細節見 `,(0,s.jsx)(n.a,{href:`/wham/svg/linear-limitations`,children:`linear() Limitations`}),`。`]}),`
`]}),`
`,(0,s.jsx)(n.h2,{children:`Gotchas`}),`
`,(0,s.jsxs)(n.ul,{children:[`
`,(0,s.jsxs)(n.li,{children:[(0,s.jsxs)(n.strong,{children:[(0,s.jsx)(n.code,{children:`<rect>`}),` 靠繼承變白。`]}),` Mask 裡的 rect 沒寫 `,(0,s.jsx)(n.code,{children:`fill`}),`，吃的是 `,(0,s.jsx)(n.code,{children:`.smt-sun-moon-svg`}),` 的 `,(0,s.jsx)(n.code,{children:`fill: white`}),`。如果把 `,(0,s.jsx)(n.code,{children:`fill: white`}),` 改寫到個別 circle 上，rect 會退回預設的黑色，mask 全黑，整個 icon 消失。`]}),`
`,(0,s.jsxs)(n.li,{children:[(0,s.jsxs)(n.strong,{children:[`cutout 動的是 `,(0,s.jsx)(n.code,{children:`cy`}),`，不是 `,(0,s.jsx)(n.code,{children:`cx`}),`。`]}),` 外層 SVG 同時轉了 90°，local 的「往上」在畫面上是「往右」。先決定要不要轉，再決定 cutout 往哪推。`]}),`
`,(0,s.jsxs)(n.li,{children:[(0,s.jsxs)(n.strong,{children:[(0,s.jsx)(n.code,{children:`--angle`}),` 一定要帶 `,(0,s.jsx)(n.code,{children:`deg`}),`。`]}),` 寫成 `,(0,s.jsx)(n.code,{children:`calc(var(--index) * 45)`}),` 沒有單位，`,(0,s.jsx)(n.code,{children:`cos()`}),` 會當 radians 算，8 顆 dot 亂排。`]}),`
`,(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:`Dark mode 的 dot 要透明。`}),` 縮回中心的 dot 壓在 cutout 邊緣，不藏起來會在月牙凹處露出小凸點。`]}),`
`,(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:`Transition 寫在目的地狀態。`}),` 想要「出去慢、回來快」，慢的寫在 checked rule，快的寫在 base rule。寫反了，就變成收回時才 stagger。`]}),`
`,(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:`這份 CSS 沒有 fallback。`}),` `,(0,s.jsx)(n.code,{children:`:has()`}),`、CSS nesting（`,(0,s.jsx)(n.code,{children:`&`}),` 放在 selector 尾巴、直接用 `,(0,s.jsx)(n.code,{children:`input`}),` 開頭的 nested rule）、`,(0,s.jsx)(n.code,{children:`cos()`}),` / `,(0,s.jsx)(n.code,{children:`sin()`}),`、`,(0,s.jsx)(n.code,{children:`linear()`}),` 都要 2023 年之後的瀏覽器。`,(0,s.jsx)(n.code,{children:`linear()`}),` 不支援時整條 `,(0,s.jsx)(n.code,{children:`transition`}),` 宣告失效，光芒會直接跳。要保險可以參考 `,(0,s.jsx)(n.a,{href:`/wham/svg/favourite-pattern`,children:`My Favourite Pattern`}),` 的 `,(0,s.jsx)(n.code,{children:`@supports`}),` 寫法。`]}),`
`,(0,s.jsxs)(n.li,{children:[(0,s.jsxs)(n.strong,{children:[`Deviation：class 加 `,(0,s.jsx)(n.code,{children:`smt-`}),` prefix`]}),`，避免跟同頁其他 demo 撞名。`]}),`
`,(0,s.jsxs)(n.li,{children:[(0,s.jsxs)(n.strong,{children:[`Deviation：`,(0,s.jsx)(n.code,{children:`--smooth`}),` / `,(0,s.jsx)(n.code,{children:`--spring`}),` 定義在 `,(0,s.jsx)(n.code,{children:`.smt-toggle`}),`，不在 `,(0,s.jsx)(n.code,{children:`html`})]}),`，token 不會漏到整個網站。`]}),`
`,(0,s.jsxs)(n.li,{children:[(0,s.jsxs)(n.strong,{children:[`Deviation：mask id 用 `,(0,s.jsx)(n.code,{children:`useId()`})]}),`，Josh 寫死 `,(0,s.jsx)(n.code,{children:`moon-cutout`}),`。這頁有兩個 toggle，寫死的話第二個 toggle 會引用第一個的 mask，跟著別人的 checkbox 變形。`]}),`
`,(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:`Deviation：markup 和樣式的小調整。`}),` 8 個手寫 `,(0,s.jsx)(n.code,{children:`<circle>`}),` 改成 `,(0,s.jsx)(n.code,{children:`range(NUM_OF_SUN_DOTS).map`}),`。`,(0,s.jsx)(n.code,{children:`.visually-hidden`}),` 改用 Tailwind 等效的 `,(0,s.jsx)(n.code,{children:`sr-only`}),`。`,(0,s.jsx)(n.code,{children:`styles.css`}),` 和 `,(0,s.jsx)(n.code,{children:`index.html`}),` 裡的 `,(0,s.jsx)(n.code,{children:`<style>`}),` 合成一個 scoped `,(0,s.jsx)(n.code,{children:`<style>`}),`，`,(0,s.jsx)(n.code,{children:`body`}),` 的深色背景搬到 demo 容器。checkbox 維持 uncontrolled，沒有 React state。CSS 註解是我自己重寫的。`]}),`
`,(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:`X-ray demo 是我加的，不是 Josh 的。`}),` 紅色虛線是另一顆掛同樣 class 的 circle。Slow motion 在 checkbox 的 `,(0,s.jsx)(n.code,{children:`onChange`}),` 裡呼叫 `,(0,s.jsx)(n.code,{children:`svg.getAnimations({ subtree: true })`}),`，把剛產生的 transition 的 `,(0,s.jsx)(n.code,{children:`playbackRate`}),` 設成 0.25。這段 JS 只是除錯工具，動畫本身仍是 CSS transition。`]}),`
`]}),`
`,(0,s.jsx)(n.h2,{children:`Extensions`}),`
`,(0,s.jsx)(n.p,{children:`Josh 提醒：其中有些可能需要 JavaScript。`}),`
`,(0,s.jsxs)(n.ul,{children:[`
`,(0,s.jsx)(n.li,{children:`改成描邊版。Josh 部落格和課程平台上的 sun/moon 是 outline，不是實心。Mask 碰上 stroke 有點麻煩，課程「Masks Gotchas」那課的解法可以直接套用（這個站目前沒有對應的 note）。`}),`
`,(0,s.jsx)(n.li,{children:`加一個 hover 時的「Boop」動畫，太陽和月亮各有自己的反應。`}),`
`,(0,s.jsx)(n.li,{children:`換一種在兩個形狀之間轉換的方式。網路上有很多有創意的 dark/light toggle，想想還能怎麼 morph。`}),`
`]})]})}function v(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(_,{...e})}):_(e)}function y(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as n,g as t};