import{i as e,n as t,o as n,r,s as i}from"./lib-YcyfOEfe.js";import{a,s as o}from"./canvas-Ds0p6qbM.js";import{t as s}from"./range-twbD2NVu.js";var c=i(e(),1),l=r(),u=200,d=100,f=20,p=`hsl(210deg 10% 30%)`,m=`hsl(45deg 100% 50%)`,h=`hsl(210deg 15% 6%)`,g=[25,50,75,100];function _(e,t,n,r=0,i=1,a=2){let o=((e-t)/(n-t))**+a;return r+(i-r)*o}function v({score:e}){return(0,l.jsxs)(`div`,{className:`wham-rpr-wrapper`,children:[(0,l.jsx)(`svg`,{className:`wham-rpr-ring`,viewBox:`0 0 ${u} ${d}`,children:s(100).map(t=>{let n=o(t,0,99,180,360),r=u/2-f,i=u/2,s=a(n,r),c=a(n,i),p=_(t,0,e,100,e*30,2)+100;return(0,l.jsx)(`line`,{"data-is-filled":e>t,x1:u/2+s.x,y1:d+s.y,x2:u/2+c.x,y2:d+c.y,style:{"--delay":p+`ms`}},t)})}),(0,l.jsx)(`p`,{className:`wham-rpr-score`,children:e}),(0,l.jsx)(`p`,{className:`wham-rpr-label`,children:`Sleep Fitness Score`})]})}function y(){let[e,t]=(0,c.useState)(75),[n,r]=(0,c.useState)(0);return(0,l.jsxs)(`div`,{className:`flex flex-col items-center gap-3`,children:[(0,l.jsx)(`style`,{children:`
        @keyframes wham-rpr-fadeToYellow {
          to { stroke: ${m}; }
        }
        .wham-rpr-stage {
          width: 100%;
          padding: 2.5rem 1.5rem 4rem;
          border-radius: 0.375rem;
          background: ${h};
          color: white;
          color-scheme: dark;
        }
        .wham-rpr-wrapper {
          position: relative;
          max-width: 28rem;
          margin: 0 auto;
        }
        .wham-rpr-ring {
          display: block;
          width: 100%;
          fill: none;
          overflow: visible;
        }
        .wham-rpr-ring line {
          stroke-width: 0.75px;
          stroke-linecap: round;
          stroke: ${p};
        }
        /*
          A 0ms animation flips the line at once. Each line waits for its
          own --delay, so the flips happen one after another.
        */
        .wham-rpr-ring line[data-is-filled='true'] {
          animation: wham-rpr-fadeToYellow 0ms forwards;
        }
        @media (prefers-reduced-motion: no-preference) {
          .wham-rpr-ring line[data-is-filled='true'] {
            animation-delay: var(--delay);
          }
        }
        .wham-rpr-score {
          position: absolute;
          width: fit-content;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          font-size: 5rem;
          line-height: 1em;
        }
        .wham-rpr-label {
          position: absolute;
          width: fit-content;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          transform: translateY(150%);
          text-transform: uppercase;
          text-align: center;
          letter-spacing: 0.125em;
          font-weight: 500;
        }
      `}),(0,l.jsx)(`div`,{className:`wham-rpr-stage`,children:(0,l.jsx)(v,{score:e},n)}),(0,l.jsxs)(`div`,{className:`flex flex-wrap items-center justify-center gap-2 font-mono text-sm`,children:[(0,l.jsx)(`span`,{className:`text-gray-500`,children:`score`}),g.map(n=>(0,l.jsx)(`button`,{type:`button`,"aria-pressed":n===e,onClick:()=>{t(n),r(e=>e+1)},className:`rounded px-3 py-1 ${n===e?`bg-slate-800 text-white`:`bg-slate-200 hover:bg-slate-300`}`,children:n},n)),(0,l.jsx)(`button`,{type:`button`,onClick:()=>r(e=>e+1),className:`rounded bg-slate-200 px-3 py-1 hover:bg-slate-300`,children:`replay`})]})]})}var b=n({default:()=>C,frontmatter:()=>x}),x={title:`Radial Progress Ring (polar line segments + exponential stagger)`,sourceUrl:`https://courses.joshwcomeau.com/wham/animation-challenges/03-radial-progress-ring`,lessonNumber:`animation-challenges/03-radial-progress-ring`,order:3,summary:"半圓儀表由 100 條 SVG `<line>` 組成，每條線的兩端用 polar 座標算、再平移到底邊中點。填色靠 0ms 的 CSS animation 加上每條線自己的 `--delay`；delay 用 `exponentialNormalize` 排成曲線，所以翻黃的 wave 先快後慢。",tags:[`svg`,`polar-coordinates`,`stagger`,`normalize`,`keyframes`,`prefers-reduced-motion`]};function S(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,span:`span`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components},{DemoFrame:r}=n;return r||w(`DemoFrame`,!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.h2,{children:`TL;DR`}),`
`,(0,l.jsxs)(n.ul,{children:[`
`,(0,l.jsxs)(n.li,{children:[`動畫其實不是「漸變」：每條線用 `,(0,l.jsxs)(n.strong,{children:[`0ms 的 CSS animation + `,(0,l.jsx)(n.code,{children:`forwards`})]}),` 瞬間翻黃，差別只在每條線的 `,(0,l.jsx)(n.code,{children:`animation-delay`}),`。整個 wave 效果全靠 delay 排程。`]}),`
`,(0,l.jsxs)(n.li,{children:[`Delay 不是線性遞增，是 `,(0,l.jsx)(n.code,{children:`exponentialNormalize(percentage, 0, score, 100, score * 30, 2)`}),`。前面幾條線幾乎同時翻、後面每條間隔越拉越長，看起來像 ease-out。`]}),`
`,(0,l.jsxs)(n.li,{children:[`輸出區間的上限是 `,(0,l.jsx)(n.code,{children:`score * 30`}),`，所以總時長跟分數成正比：分數 25 約 0.8 秒跑完、分數 100 約 3 秒。這樣低分不會慢吞吞、高分不會一閃而過。`]}),`
`,(0,l.jsxs)(n.li,{children:[`線段座標：角度 `,(0,l.jsx)(n.code,{children:`normalize(percentage, 0, 99, 180, 360)`}),`，距離 80 到 100，`,(0,l.jsx)(n.code,{children:`convertPolarToCartesian`}),` 轉出來後加上 `,(0,l.jsx)(n.code,{children:`(VIEWBOX_WIDTH / 2, VIEWBOX_HEIGHT)`}),`，讓所有線都指向底邊中點。`]}),`
`,(0,l.jsxs)(n.li,{children:[`Reduced motion 用「motion-free by default」：animation 永遠存在，只有 `,(0,l.jsx)(n.code,{children:`no-preference`}),` 時才加 delay。偏好減少動態的人直接看到終態。`]}),`
`]}),`
`,(0,l.jsx)(r,{title:`100 lines, exponential stagger (Josh's vanilla logic in React)`,children:(0,l.jsx)(y,{})}),`
`,(0,l.jsx)(n.p,{children:`點 score 按鈕換分數並重播，比較 25 跟 100 的總時長。Josh 的解答有 vanilla JS 跟 React 兩個版本，邏輯完全一樣；這裡把 vanilla 版的邏輯搬進 JSX。`}),`
`,(0,l.jsx)(n.h2,{children:`Spec`}),`
`,(0,l.jsxs)(n.ul,{children:[`
`,(0,l.jsxs)(n.li,{children:[`SVG 裡用 JavaScript 產生 100 條獨立的 `,(0,l.jsx)(n.code,{children:`<line>`}),`，一條代表 1 個百分點。`]}),`
`,(0,l.jsx)(n.li,{children:`傳入一個 score，前 score 條線是黃色，其餘是灰色（score 60 就是 60 黃 40 灰）。`}),`
`,(0,l.jsx)(n.li,{children:`分數內的線依序翻黃，每條的等待時間越來越長，形成 wave。`}),`
`,(0,l.jsx)(n.li,{children:`有 motion sensitivity 的使用者跳過動畫。`}),`
`]}),`
`,(0,l.jsx)(n.h2,{children:`Technique map`}),`
`,(0,l.jsxs)(n.table,{children:[(0,l.jsx)(n.thead,{children:(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.th,{children:`需求`}),(0,l.jsx)(n.th,{children:`技巧`}),(0,l.jsx)(n.th,{children:`筆記`})]})}),(0,l.jsxs)(n.tbody,{children:[(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:`100 條線段`}),(0,l.jsxs)(n.td,{children:[`SVG `,(0,l.jsx)(n.code,{children:`<line>`}),` 的 `,(0,l.jsx)(n.code,{children:`x1/y1/x2/y2`})]}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.a,{href:`/wham/svg/basic-shapes`,children:`SVG Basic Shapes`})})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:`用程式產生線`}),(0,l.jsxs)(n.td,{children:[`JSX 裡 `,(0,l.jsx)(n.code,{children:`range(100).map(...)`})]}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.a,{href:`/wham/svg/svg-in-react`,children:`SVGs in React`})})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:`200×100 的座標系`}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:`viewBox`})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.a,{href:`/wham/svg/viewbox`,children:`viewBox`})})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:`圓頭線段`}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:`stroke-linecap: round`})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.a,{href:`/wham/svg/strokes-and-fills`,children:`Strokes & Fills`})})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:`每條線的角度`}),(0,l.jsxs)(n.td,{children:[(0,l.jsx)(n.code,{children:`normalize`}),` 把 0 到 99 對映到 180° 到 360°`]}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.a,{href:`/wham/particles/linear-interpolation`,children:`Linear Interpolation`})})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:`線段兩端座標`}),(0,l.jsx)(n.td,{children:`polar → cartesian，再平移原點`}),(0,l.jsxs)(n.td,{children:[(0,l.jsx)(n.a,{href:`/wham/particles/polar-coordinates`,children:`Polar Coordinates`}),`、`,(0,l.jsx)(n.a,{href:`/wham/particles/trigonometry-101`,children:`Trigonometry 101`})]})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:`越來越長的 delay`}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:`exponentialNormalize`})}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.a,{href:`/wham/particles/lerp-utils`,children:`Utility Functions`})})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:`每條線自己的 delay`}),(0,l.jsxs)(n.td,{children:[`inline CSS variable `,(0,l.jsx)(n.code,{children:`--delay`})]}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.a,{href:`/wham/particles/dynamic-keyframes`,children:`Dynamic Keyframes`})})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:`瞬間翻色`}),(0,l.jsxs)(n.td,{children:[`0ms animation + `,(0,l.jsx)(n.code,{children:`forwards`}),` + `,(0,l.jsx)(n.code,{children:`animation-delay`})]}),(0,l.jsx)(n.td,{children:`沒有筆記專門講這招，見下方 mechanism`})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:`跳過動畫`}),(0,l.jsxs)(n.td,{children:[(0,l.jsx)(n.code,{children:`prefers-reduced-motion`}),`，motion-free by default`]}),(0,l.jsx)(n.td,{children:(0,l.jsx)(n.a,{href:`/wham/particles/motion-accessibility`,children:`Motion Accessibility`})})]})]})]}),`
`,(0,l.jsx)(n.h2,{children:`Build order`}),`
`,(0,l.jsxs)(`details`,{children:[(0,l.jsx)(`summary`,{children:`Hint 1 — 先畫出檸檬切片`}),(0,l.jsxs)(n.p,{children:[`每個百分點 render 一條 `,(0,l.jsx)(n.code,{children:`<line>`}),`。難點是 `,(0,l.jsx)(n.code,{children:`x1/y1/x2/y2`}),` 從哪來：Part 1 的 polar 座標不只能算粒子的落點，也能算線段的起點跟終點。`]}),(0,l.jsxs)(n.p,{children:[`如果把每條線往內延長，它們全部交會在 SVG 底邊的正中間。所以先畫一個「半圓檸檬切片」：角度落在 180° 到 360°，距離從 0 畫到 `,(0,l.jsx)(n.code,{children:`VIEWBOX_WIDTH / 2`}),`。畫對之後，再把起點距離往外推，直到只剩外圈一小段。`]})]}),`
`,(0,l.jsxs)(`details`,{children:[(0,l.jsx)(`summary`,{children:`Hint 2 — delay 先線性，再改曲線`}),(0,l.jsxs)(n.p,{children:[`先別管曲線。在 `,(0,l.jsx)(n.code,{children:`range(100).forEach`}),` 裡算 `,(0,l.jsx)(n.code,{children:`percentage * 25 + 'ms'`}),`，每條線比上一條多等 25ms，確認 wave 有跑出來。`]}),(0,l.jsxs)(n.p,{children:[`跑通之後再想：怎麼讓「每條線多等的時間」本身也越來越長？`,(0,l.jsx)(n.code,{children:`utils.js`}),` 裡的 `,(0,l.jsx)(n.code,{children:`exponentialNormalize`}),` 就是答案之一。`]})]}),`
`,(0,l.jsx)(n.h2,{children:`Why lines instead of one arc`}),`
`,(0,l.jsx)(n.p,{children:`Part 2 做過的圓形進度條是一條連續的線。這個 challenge 的造型是一格一格的刻度，每格要能獨立變色、獨立排程，所以改成 100 個獨立元素。`}),`
`,(0,l.jsx)(n.p,{children:`每條線的算法：`}),`
`,(0,l.jsx)(l.Fragment,{children:(0,l.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,l.jsxs)(n.code,{children:[(0,l.jsxs)(n.span,{className:`line`,children:[(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:`const`}),(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:` angle`}),(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:` =`}),(0,l.jsx)(n.span,{style:{color:`#6F42C1`},children:` normalize`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`(percentage, `}),(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:`0`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`, `}),(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:`99`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`, `}),(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:`180`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`, `}),(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:`360`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`);`})]}),`
`,(0,l.jsxs)(n.span,{className:`line`,children:[(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:`const`}),(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:` startDistance`}),(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:` =`}),(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:` VIEWBOX_WIDTH`}),(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:` /`}),(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:` 2`}),(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:` -`}),(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:` SEGMENT_LENGTH`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`; `}),(0,l.jsx)(n.span,{style:{color:`#6A737D`},children:`// 80`})]}),`
`,(0,l.jsxs)(n.span,{className:`line`,children:[(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:`const`}),(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:` endDistance`}),(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:` =`}),(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:` VIEWBOX_WIDTH`}),(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:` /`}),(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:` 2`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`; `}),(0,l.jsx)(n.span,{style:{color:`#6A737D`},children:`// 100`})]}),`
`,(0,l.jsxs)(n.span,{className:`line`,children:[(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:`const`}),(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:` startPoint`}),(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:` =`}),(0,l.jsx)(n.span,{style:{color:`#6F42C1`},children:` convertPolarToCartesian`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`(angle, startDistance);`})]}),`
`,(0,l.jsxs)(n.span,{className:`line`,children:[(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:`const`}),(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:` endPoint`}),(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:` =`}),(0,l.jsx)(n.span,{style:{color:`#6F42C1`},children:` convertPolarToCartesian`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`(angle, endDistance);`})]})]})})}),`
`,(0,l.jsxs)(n.p,{children:[`SVG 的 y 軸朝下，所以 180° 在左、270° 在正上方（`,(0,l.jsx)(n.code,{children:`sin`}),` 是 −1）、360° 在右。角度剛好掃過上半圓。`]}),`
`,(0,l.jsxs)(n.p,{children:[`Polar 座標以 `,(0,l.jsx)(n.code,{children:`(0, 0)`}),` 為圓心，也就是 SVG 的左上角。要把圓心搬到底邊中點，每個座標加上偏移：`]}),`
`,(0,l.jsx)(l.Fragment,{children:(0,l.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,l.jsxs)(n.code,{children:[(0,l.jsxs)(n.span,{className:`line`,children:[(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`<`}),(0,l.jsx)(n.span,{style:{color:`#22863A`},children:`line`})]}),`
`,(0,l.jsxs)(n.span,{className:`line`,children:[(0,l.jsx)(n.span,{style:{color:`#6F42C1`},children:`  x1`}),(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`{`}),(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:`VIEWBOX_WIDTH`}),(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:` /`}),(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:` 2`}),(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:` +`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:` startPoint.x}`})]}),`
`,(0,l.jsxs)(n.span,{className:`line`,children:[(0,l.jsx)(n.span,{style:{color:`#6F42C1`},children:`  y1`}),(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`{`}),(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:`VIEWBOX_HEIGHT`}),(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:` +`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:` startPoint.y}`})]}),`
`,(0,l.jsxs)(n.span,{className:`line`,children:[(0,l.jsx)(n.span,{style:{color:`#6F42C1`},children:`  x2`}),(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`{`}),(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:`VIEWBOX_WIDTH`}),(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:` /`}),(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:` 2`}),(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:` +`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:` endPoint.x}`})]}),`
`,(0,l.jsxs)(n.span,{className:`line`,children:[(0,l.jsx)(n.span,{style:{color:`#6F42C1`},children:`  y2`}),(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`{`}),(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:`VIEWBOX_HEIGHT`}),(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:` +`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:` endPoint.y}`})]}),`
`,(0,l.jsx)(n.span,{className:`line`,children:(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`/>`})})]})})}),`
`,(0,l.jsxs)(n.p,{children:[`注意 `,(0,l.jsx)(n.code,{children:`normalize`}),` 的輸入上限是 `,(0,l.jsx)(n.strong,{children:`99`}),` 不是 100。100 條線之間只有 99 個間隔；用 100 的話最後一條停在 358.2°，右端不會貼齊水平線。`]}),`
`,(0,l.jsx)(n.h2,{children:`The 0ms animation trick`}),`
`,(0,l.jsxs)(n.p,{children:[`要讓線在某個時間點「翻」成黃色，直覺是 `,(0,l.jsx)(n.code,{children:`transition`}),`。但 transition 需要狀態改變，元素 mount 的第一幀沒有「之前的值」可以過渡。`]}),`
`,(0,l.jsx)(n.p,{children:`Josh 用 animation 當計時器：`}),`
`,(0,l.jsx)(l.Fragment,{children:(0,l.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,l.jsxs)(n.code,{children:[(0,l.jsxs)(n.span,{className:`line`,children:[(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:`@keyframes`}),(0,l.jsx)(n.span,{style:{color:`#E36209`},children:` wham-rpr-fadeToYellow`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,l.jsxs)(n.span,{className:`line`,children:[(0,l.jsx)(n.span,{style:{color:`#6F42C1`},children:`  to`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:` { `}),(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:`stroke`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:`hsl`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:`45`}),(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:`deg`}),(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:` 100`}),(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:`%`}),(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:` 50`}),(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:`%`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`); }`})]}),`
`,(0,l.jsx)(n.span,{className:`line`,children:(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`}`})}),`
`,(0,l.jsxs)(n.span,{className:`line`,children:[(0,l.jsx)(n.span,{style:{color:`#6F42C1`},children:`.wham-rpr-ring`}),(0,l.jsx)(n.span,{style:{color:`#22863A`},children:` line`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`[`}),(0,l.jsx)(n.span,{style:{color:`#6F42C1`},children:`data-is-filled`}),(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,l.jsx)(n.span,{style:{color:`#032F62`},children:`'true'`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`] {`})]}),`
`,(0,l.jsxs)(n.span,{className:`line`,children:[(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:`  animation`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`: wham-rpr-fadeToYellow `}),(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:`0`}),(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:`ms`}),(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:` forwards`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,l.jsx)(n.span,{className:`line`,children:(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`}`})}),`
`,(0,l.jsxs)(n.span,{className:`line`,children:[(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:`@media`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:` (prefers-reduced-motion: no-preference) {`})]}),`
`,(0,l.jsxs)(n.span,{className:`line`,children:[(0,l.jsx)(n.span,{style:{color:`#6F42C1`},children:`  .wham-rpr-ring`}),(0,l.jsx)(n.span,{style:{color:`#22863A`},children:` line`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`[`}),(0,l.jsx)(n.span,{style:{color:`#6F42C1`},children:`data-is-filled`}),(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,l.jsx)(n.span,{style:{color:`#032F62`},children:`'true'`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`] {`})]}),`
`,(0,l.jsxs)(n.span,{className:`line`,children:[(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:`    animation-delay`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:`var`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,l.jsx)(n.span,{style:{color:`#E36209`},children:`--delay`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`);`})]}),`
`,(0,l.jsx)(n.span,{className:`line`,children:(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`  }`})}),`
`,(0,l.jsx)(n.span,{className:`line`,children:(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`}`})})]})})}),`
`,(0,l.jsx)(n.p,{children:`三個部分各有分工：`}),`
`,(0,l.jsxs)(n.ul,{children:[`
`,(0,l.jsxs)(n.li,{children:[(0,l.jsxs)(n.strong,{children:[(0,l.jsx)(n.code,{children:`0ms`}),` duration`]}),`：沒有中間值，時間到就直接跳到 `,(0,l.jsx)(n.code,{children:`to`}),`。`]}),`
`,(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:(0,l.jsx)(n.code,{children:`forwards`})}),`：animation 結束後保留 `,(0,l.jsx)(n.code,{children:`to`}),` 的值。少了它，線會閃一下黃又變回灰。`]}),`
`,(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:(0,l.jsx)(n.code,{children:`animation-delay: var(--delay)`})}),`：每條線從 inline style 讀自己的 delay，同一條 CSS rule 服務 100 條線。`]}),`
`]}),`
`,(0,l.jsxs)(n.p,{children:[`React 裡 boolean 寫進 `,(0,l.jsx)(n.code,{children:`data-*`}),` attribute 會變成字串 `,(0,l.jsx)(n.code,{children:`"true"`}),` 或 `,(0,l.jsx)(n.code,{children:`"false"`}),`，所以 selector 要比對字串 `,(0,l.jsx)(n.code,{children:`'true'`}),`。`]}),`
`,(0,l.jsxs)(n.p,{children:[`只有 `,(0,l.jsx)(n.code,{children:`score > percentage`}),` 的線會 match 這個 selector。分數外的線也算出了 `,(0,l.jsx)(n.code,{children:`--delay`}),`（值超過輸出上限），但沒有 animation 讀它，所以永遠是灰色。JS 裡不用分兩條路徑。`]}),`
`,(0,l.jsx)(n.h2,{children:`Why the delay curve is exponential`}),`
`,(0,l.jsx)(l.Fragment,{children:(0,l.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,l.jsx)(n.code,{children:(0,l.jsxs)(n.span,{className:`line`,children:[(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:`const`}),(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:` animationDelay`}),(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:` =`}),(0,l.jsx)(n.span,{style:{color:`#6F42C1`},children:` exponentialNormalize`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`(percentage, `}),(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:`0`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`, score, `}),(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:`100`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`, score `}),(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:`*`}),(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:` 30`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`, `}),(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:`2`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`) `}),(0,l.jsx)(n.span,{style:{color:`#D73A49`},children:`+`}),(0,l.jsx)(n.span,{style:{color:`#005CC5`},children:` 100`}),(0,l.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]})})})}),`
`,(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.code,{children:`exponent = 2`}),` 把 0 到 1 的進度平方後再對映。以 score 75 為例：`]}),`
`,(0,l.jsxs)(n.table,{children:[(0,l.jsx)(n.thead,{children:(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.th,{children:`percentage`}),(0,l.jsx)(n.th,{children:`delay`}),(0,l.jsx)(n.th,{children:`跟前一條差`})]})}),(0,l.jsxs)(n.tbody,{children:[(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:`0`}),(0,l.jsx)(n.td,{children:`200ms`}),(0,l.jsx)(n.td,{children:`—`})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:`1`}),(0,l.jsx)(n.td,{children:`200.4ms`}),(0,l.jsx)(n.td,{children:`0.4ms`})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:`25`}),(0,l.jsx)(n.td,{children:`439ms`}),(0,l.jsx)(n.td,{children:`約 19ms`})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:`50`}),(0,l.jsx)(n.td,{children:`1156ms`}),(0,l.jsx)(n.td,{children:`約 38ms`})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:`74`}),(0,l.jsx)(n.td,{children:`2293ms`}),(0,l.jsx)(n.td,{children:`約 56ms`})]})]})]}),`
`,(0,l.jsxs)(n.p,{children:[`Delay 對 index 的曲線是 ease-in（越往後越陡），但人眼看的是 wave 的`,(0,l.jsx)(n.strong,{children:`速度`}),`：每毫秒翻幾條線。間隔越來越長，速度就越來越慢，所以看起來是 ease-out，像指針衝出去後慢慢停在分數上。`]}),`
`,(0,l.jsx)(n.p,{children:`線性版本（每條固定多等 25ms）的 wave 速度恆定，停下來的瞬間很突兀。`}),`
`,(0,l.jsx)(n.h3,{children:`Why normalize to score, not 100`}),`
`,(0,l.jsxs)(n.p,{children:[`輸入區間是 `,(0,l.jsx)(n.code,{children:`[0, score]`}),`，輸出上限是 `,(0,l.jsx)(n.code,{children:`score * 30`}),`：`]}),`
`,(0,l.jsxs)(n.ul,{children:[`
`,(0,l.jsx)(n.li,{children:`score 25：最後一條約 800ms。`}),`
`,(0,l.jsx)(n.li,{children:`score 75：最後一條約 2300ms。`}),`
`,(0,l.jsx)(n.li,{children:`score 100：最後一條約 3040ms。`}),`
`]}),`
`,(0,l.jsx)(n.p,{children:`如果不管分數、總時長都固定（例如 2 秒），分數 25 只有 25 條線卻要跑 2 秒，顯得拖；分數 100 的 100 條線擠在 2 秒內，顯得趕。讓總時長跟分數成正比，每個分數的 wave 節奏都差不多。`}),`
`,(0,l.jsxs)(n.p,{children:[`前後兩個 `,(0,l.jsx)(n.code,{children:`100`}),`（輸出下限 100、再加 100）讓第一條線至少等 200ms。Josh 沒解釋這段；我的理解是先讓使用者看到一圈灰色的空刻度，wave 才有起點。`]}),`
`,(0,l.jsx)(n.h2,{children:`Gotchas`}),`
`,(0,l.jsxs)(n.ul,{children:[`
`,(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:`Replay 必須 remount。`}),` 已經播完的 CSS animation 不會因為 re-render 自己重播。Demo 用 `,(0,l.jsx)(n.code,{children:`key={playCount}`}),` 讓 React 丟掉整個 ring 重建，每次換分數都從灰色開始。`]}),`
`,(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:`Deviation：加了 score 按鈕和 replay。`}),` Josh 的解答固定 `,(0,l.jsx)(n.code,{children:`drawRing(75)`}),`，載入一次就結束。筆記頁捲到 demo 時動畫早就跑完，所以加上控制項。`]}),`
`,(0,l.jsxs)(n.li,{children:[(0,l.jsxs)(n.strong,{children:[`Deviation：`,(0,l.jsx)(n.code,{children:`convertPolarToCartesian`}),` 回傳物件。`]}),` 專案的版本回傳 `,(0,l.jsx)(n.code,{children:`{ x, y }`}),`，所以寫 `,(0,l.jsx)(n.code,{children:`startPoint.x`}),`，不是 Josh 的 `,(0,l.jsx)(n.code,{children:`startPoint[0]`}),`。`]}),`
`,(0,l.jsxs)(n.li,{children:[(0,l.jsxs)(n.strong,{children:[`Deviation：`,(0,l.jsx)(n.code,{children:`exponentialNormalize`}),` 定義在 demo 檔內。`]}),` Josh 的 `,(0,l.jsx)(n.code,{children:`utils.js`}),` 有這個函式，專案的 `,(0,l.jsx)(n.code,{children:`~/utils/canvas`}),` 沒有。實作照抄 Josh。`]}),`
`,(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:`Deviation：CSS 攤平並加前綴。`}),` Josh 用 nested CSS 和 `,(0,l.jsx)(n.code,{children:`.ring`}),` 這種通用 class；這裡攤平成一般 selector、加上 `,(0,l.jsx)(n.code,{children:`wham-rpr-`}),` 前綴避免跟頁面其他 demo 衝突。`,(0,l.jsx)(n.code,{children:`EMPTY_COLOR`}),` 和 `,(0,l.jsx)(n.code,{children:`SCORE_COLOR`}),` 直接插進 style 字串，Josh 的版本宣告了這兩個常數但 CSS 裡是寫死的值。`]}),`
`,(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:`Deviation：背景色。`}),` DemoFrame 是白底，所以把 Josh `,(0,l.jsx)(n.code,{children:`styles.css`}),` 裡 `,(0,l.jsx)(n.code,{children:`body`}),` 的深色背景搬到 `,(0,l.jsx)(n.code,{children:`.wham-rpr-stage`}),` 容器上。`]}),`
`,(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:`Label 會溢出容器。`}),` `,(0,l.jsx)(n.code,{children:`.wham-rpr-label`}),` 用 `,(0,l.jsx)(n.code,{children:`translateY(150%)`}),` 推到 wrapper 底邊之下，外層要留 padding，不然會被裁掉。`]}),`
`,(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:`score 0 會除以零。`}),` `,(0,l.jsx)(n.code,{children:`exponentialNormalize(percentage, 0, 0, ...)`}),` 得到 `,(0,l.jsx)(n.code,{children:`NaN`}),` 或 `,(0,l.jsx)(n.code,{children:`-Infinity`}),`，但沒有線被填色，`,(0,l.jsx)(n.code,{children:`--delay`}),` 不會被用到，畫面正常。`]}),`
`]}),`
`,(0,l.jsx)(n.h2,{children:`Extensions`}),`
`,(0,l.jsxs)(n.ul,{children:[`
`,(0,l.jsx)(n.li,{children:`讓填色的線比灰線粗，或用其他外觀調整讓分數內的刻度更突出。`}),`
`,(0,l.jsx)(n.li,{children:`做出假漸層：第一條是深黃，最後一條是白色。`}),`
`,(0,l.jsx)(n.li,{children:`所有線同色，但顏色隨進度變化，例如動畫進行中從紅色漸漸轉成藍色。`}),`
`,(0,l.jsx)(n.li,{children:`加音效：刻度一條條亮起時，配一個逐漸升高的冒泡聲。`}),`
`]})]})}function C(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(S,{...e})}):S(e)}function w(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{b as n,x as t};