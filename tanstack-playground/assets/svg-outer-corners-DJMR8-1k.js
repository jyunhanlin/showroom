import{i as e,n as t,o as n,r,s as i}from"./lib-YcyfOEfe.js";var a=i(e(),1),o=r(),s=`hsl(210deg 15% 6%)`,c=`hsl(350deg 100% 60%)`,l=`hsl(210deg 10% 45%)`,u=`
  .wham-oc-stage {
    position: relative;
    height: 280px;
    overflow: hidden;
    border-radius: 8px;
    background: ${s};
    isolation: isolate;
  }

  .wham-oc-dialog {
    --radius: 16px;
    position: absolute;
    inset: 0;
    width: 70%;
    height: 10rem;
    padding: 0;
    margin: auto;
    border: none;
    background: white;
    border-radius: var(--radius) 0 var(--radius) var(--radius);
  }

  .wham-oc-dialog button {
    position: absolute;
    right: 0;
    top: 0;
    width: 48px;
    height: 48px;
    display: grid;
    place-content: center;
    background: white;
    border: none;
    transform: translateY(-100%);
    color: black;
    cursor: pointer;
    border-radius: var(--radius) var(--radius) 0 0;
  }

  .wham-oc-x-icon {
    fill: none;
    stroke: black;
    stroke-width: 2px;
    stroke-linecap: round;
  }

  .wham-oc-outer-corner {
    width: var(--radius);
    height: var(--radius);
    fill: white;
    /* Pin to the button's bottom-left, then shift one own-width leftward */
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translateX(-100%);
    /* The corner is a button descendant: let pointer events pass through it */
    pointer-events: none;
  }

  .wham-oc-visually-hidden {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`,d=`
  .wham-oc-ext-dialog {
    --radius: 16px;
    /* The corner pieces must sit on the straight part of the top edge. The dialog's
       own top-right rounding eats the last --radius px, and the right-hand corner
       piece is another --radius px wide, so the inset has to be at least 2x. */
    --inset: calc(var(--radius) * 2);
    position: absolute;
    inset: 0;
    width: 70%;
    height: 10rem;
    padding: 0;
    margin: auto;
    border: none;
    background: white;
    border-radius: var(--radius);
  }

  .wham-oc-ext-dialog button {
    position: absolute;
    right: var(--inset);
    top: 0;
    width: 48px;
    height: 48px;
    display: grid;
    place-content: center;
    background: white;
    border: none;
    color: black;
    cursor: pointer;
    border-radius: var(--radius) var(--radius) 0 0;
    /* Tuck the button behind the dialog. The stage sets isolation: isolate, so -1
       still paints above the stage background. */
    z-index: -1;
    transform: translateY(0%);
  }

  .wham-oc-ext-dialog button[data-is-open='true'] {
    transform: translateY(-100%);
  }

  @media (prefers-reduced-motion: no-preference) {
    .wham-oc-ext-dialog button {
      transition: transform 450ms cubic-bezier(0.2, 0.8, 0.3, 1);
    }
  }

  .wham-oc-ext-corner {
    position: absolute;
    bottom: 0;
    color: white;
    pointer-events: none;
  }
`;function f({size:e=8,orientation:t,...n}){let r;if(t===`bottom-right`)r=0;else if(t===`bottom-left`)r=90;else if(t===`top-left`)r=180;else if(t===`top-right`)r=270;else throw Error(`Unrecognized orientation: `+t);return(0,o.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,fill:`none`,viewBox:`0 0 8 8`,preserveAspectRatio:`none`,width:e,height:e,...n,children:(0,o.jsx)(`path`,{fill:`currentColor`,d:`
          M 8,0
          A 8,8 0 0 1 0,8
          L 8,8
          Z
        `,style:{transform:`rotate(${r}deg)`,transformOrigin:`center center`}})})}function p(){return(0,o.jsxs)(`svg`,{className:`wham-oc-x-icon`,"aria-hidden":`true`,width:`24`,height:`24`,viewBox:`0 0 24 24`,children:[(0,o.jsx)(`path`,{d:`M18 6 6 18`}),(0,o.jsx)(`path`,{d:`m6 6 12 12`})]})}function m(){let[e,t]=(0,a.useState)(!0),[n,r]=(0,a.useState)(!1);return(0,o.jsxs)(`div`,{children:[(0,o.jsx)(`style`,{children:u}),(0,o.jsx)(`div`,{className:`wham-oc-stage`,children:(0,o.jsx)(`dialog`,{open:!0,className:`wham-oc-dialog`,children:(0,o.jsx)(`div`,{className:`wham-oc-close-btn-wrapper`,children:(0,o.jsxs)(`button`,{children:[(0,o.jsx)(p,{}),(0,o.jsx)(`span`,{className:`wham-oc-visually-hidden`,children:`Close`}),e&&(0,o.jsx)(`svg`,{className:`wham-oc-outer-corner`,"aria-hidden":`true`,viewBox:`0 0 8 8`,style:n?{fill:c}:void 0,children:(0,o.jsx)(`path`,{d:`
                      M 8,0
                      A 8,8 0 0 1 0,8
                      L 8,8
                      Z
                    `})})]})})})}),(0,o.jsxs)(`div`,{className:`mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700`,children:[(0,o.jsxs)(`label`,{className:`flex items-center gap-2`,children:[(0,o.jsx)(`input`,{type:`checkbox`,checked:e,onChange:e=>t(e.target.checked)}),`Outer corner`]}),(0,o.jsxs)(`label`,{className:`flex items-center gap-2`,children:[(0,o.jsx)(`input`,{type:`checkbox`,checked:n,disabled:!e,onChange:e=>r(e.target.checked)}),`Highlight the corner piece`]})]})]})}var h=[{label:`sweep-flag 0: filled wedge`,d:`M 8,0 A 8,8 0 0 0 0,8 L 8,8 Z`,circleCenter:{x:8,y:8}},{label:`sweep-flag 1: outer corner`,d:`M 8,0 A 8,8 0 0 1 0,8 L 8,8 Z`,circleCenter:{x:0,y:0}}],g=[{x:8,y:0,label:`M`,dx:.6,dy:-.6},{x:0,y:8,label:`A`,dx:-1.4,dy:1.4},{x:8,y:8,label:`L`,dx:.6,dy:1.4}];function _(){return(0,o.jsx)(`div`,{className:`grid grid-cols-1 gap-4 sm:grid-cols-2`,children:h.map(e=>(0,o.jsxs)(`div`,{className:`flex flex-col items-center gap-2`,children:[(0,o.jsxs)(`svg`,{viewBox:`-3 -3 14 14`,className:`block w-full max-w-[220px] rounded-md`,style:{background:s},children:[(0,o.jsx)(`rect`,{x:0,y:0,width:8,height:8,fill:`none`,stroke:l,strokeWidth:.08}),(0,o.jsx)(`circle`,{cx:e.circleCenter.x,cy:e.circleCenter.y,r:8,fill:`none`,stroke:l,strokeWidth:.08,strokeDasharray:`0.4 0.3`}),(0,o.jsx)(`path`,{d:e.d,fill:`white`}),g.map(e=>(0,o.jsxs)(`g`,{children:[(0,o.jsx)(`circle`,{cx:e.x,cy:e.y,r:.35,fill:c}),(0,o.jsx)(`text`,{x:e.x+e.dx,y:e.y+e.dy,fill:c,fontSize:1.1,fontFamily:`monospace`,textAnchor:`middle`,children:e.label})]},e.label))]}),(0,o.jsx)(`p`,{className:`font-mono text-xs text-gray-600`,children:e.label})]},e.label))})}var v=[`top-left`,`top-right`,`bottom-left`,`bottom-right`];function y(){return(0,o.jsx)(`div`,{className:`grid grid-cols-2 gap-4 sm:grid-cols-4`,children:v.map(e=>(0,o.jsxs)(`div`,{className:`flex flex-col items-center gap-2`,children:[(0,o.jsx)(`div`,{className:`rounded-md p-4`,style:{background:s},children:(0,o.jsx)(f,{orientation:e,size:64,className:`block text-white`,style:{outline:`1px dashed ${l}`}})}),(0,o.jsx)(`p`,{className:`font-mono text-xs text-gray-600`,children:e})]},e))})}function b(){let[e,t]=(0,a.useState)(!0);return(0,o.jsxs)(`div`,{children:[(0,o.jsx)(`style`,{children:u+d}),(0,o.jsx)(`div`,{className:`wham-oc-stage`,children:(0,o.jsx)(`dialog`,{open:!0,className:`wham-oc-ext-dialog`,children:(0,o.jsx)(`div`,{className:`wham-oc-close-btn-wrapper`,children:(0,o.jsxs)(`button`,{"data-is-open":e,inert:!e,onClick:()=>t(!1),children:[(0,o.jsx)(p,{}),(0,o.jsx)(`span`,{className:`wham-oc-visually-hidden`,children:`Close`}),(0,o.jsx)(f,{orientation:`bottom-right`,size:16,"aria-hidden":`true`,className:`wham-oc-ext-corner`,style:{left:0,transform:`translateX(-100%)`}}),(0,o.jsx)(f,{orientation:`bottom-left`,size:16,"aria-hidden":`true`,className:`wham-oc-ext-corner`,style:{right:0,transform:`translateX(100%)`}})]})})})}),(0,o.jsxs)(`div`,{className:`mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-700`,children:[(0,o.jsx)(`button`,{type:`button`,className:`rounded-md border border-gray-300 px-3 py-1 hover:bg-gray-50 disabled:opacity-50`,disabled:e,onClick:()=>t(!0),children:`Slide the button back in`}),(0,o.jsx)(`span`,{children:e?`Click the × to slide it away.`:`Hidden behind the dialog.`})]})]})}var x=n({default:()=>w,frontmatter:()=>S}),S={title:`Outer Corners (SVG arc drawn outside a quarter circle)`,sourceUrl:`https://courses.joshwcomeau.com/wham/animation-challenges/04-svg-outer-corners`,lessonNumber:`animation-challenges/04-svg-outer-corners`,order:4,summary:"`border-radius` 只會圓「內角」，凸出去的關閉按鈕跟 dialog 頂邊交會的「外角」要自己補。用 8×8 viewBox 畫 `M 8,0 A 8,8 0 0 1 0,8 L 8,8 Z` —— 填的是圓「外面」那一塊，不是扇形；再放進按鈕裡用 absolute + `translateX(-100%)` 推到按鈕外側。",tags:[`svg`,`arc`,`outer-corner`,`path`,`viewbox`,`css-positioning`,`react`]};function C(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,span:`span`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components},{DemoFrame:r}=n;return r||T(`DemoFrame`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h2,{children:`TL;DR`}),`
`,(0,o.jsxs)(n.ul,{children:[`
`,(0,o.jsxs)(n.li,{children:[`關鍵是`,(0,o.jsx)(n.strong,{children:`填圓外、不填扇形`}),`。`,(0,o.jsx)(n.code,{children:`A 8,8 0 0 1 0,8`}),` 的 `,(0,o.jsx)(n.code,{children:`sweep-flag`}),` 是 `,(0,o.jsx)(n.code,{children:`1`}),`，弧以左上角 (0, 0) 為圓心往右下凸；再 `,(0,o.jsx)(n.code,{children:`L 8,8`}),` + `,(0,o.jsx)(n.code,{children:`Z`}),` 把右下角封起來，得到一塊凹邊的三角形。`,(0,o.jsx)(n.code,{children:`sweep-flag`}),` 改成 `,(0,o.jsx)(n.code,{children:`0`}),`，同樣的指令就變回實心扇形。`]}),`
`,(0,o.jsxs)(n.li,{children:[`用 8×8 的 `,(0,o.jsx)(n.code,{children:`viewBox`}),` 畫，CSS 再把 `,(0,o.jsx)(n.code,{children:`<svg>`}),` 設成 `,(0,o.jsx)(n.code,{children:`var(--radius)`}),`（16px）。path 資料不用跟著半徑改，`,(0,o.jsx)(n.code,{children:`viewBox`}),` 自動放大。`]}),`
`,(0,o.jsxs)(n.li,{children:[`外角是按鈕的 `,(0,o.jsx)(n.strong,{children:`child`}),`：`,(0,o.jsx)(n.code,{children:`position: absolute; left: 0; bottom: 0`}),` 先貼到按鈕左下角，`,(0,o.jsx)(n.code,{children:`translateX(-100%)`}),` 再往左推一個自己的寬度，剛好坐在按鈕外側、dialog 頂邊上。`,(0,o.jsx)(n.code,{children:`fill: white`}),` 跟 dialog 同色，接縫就不見了。`]}),`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:`pointer-events: none`}),` 不能省。外角是 button 的 descendant，不關掉的話，滑過那塊也算 hover 按鈕、點下去也算 click。`]}),`
`,(0,o.jsxs)(n.li,{children:[`Bonus 的 `,(0,o.jsx)(n.code,{children:`OuterCorner`}),` component 只有一條 path，四個方向靠 CSS `,(0,o.jsx)(n.code,{children:`rotate()`}),` 0 / 90 / 180 / 270。`,(0,o.jsx)(n.code,{children:`transformOrigin: 'center center'`}),` 在 SVG 裡對的是 viewBox 中心 (4, 4)，剛好就是這塊 path 的中心。`]}),`
`]}),`
`,(0,o.jsx)(r,{title:`Solution — outer corner piece inside the close button`,children:(0,o.jsx)(m,{})}),`
`,(0,o.jsx)(n.p,{children:`關掉「Outer corner」看原本的直角接縫；打開「Highlight」把那塊 16×16 的 SVG 染紅，就看得出它是獨立的一小片。`}),`
`,(0,o.jsx)(n.h2,{children:`Spec`}),`
`,(0,o.jsxs)(n.ul,{children:[`
`,(0,o.jsx)(n.li,{children:`Dialog 右上角有一顆往上凸出的 close button，按鈕左下方跟 dialog 頂邊交會處是一個尖尖的直角。`}),`
`,(0,o.jsx)(n.li,{children:`把這個外角修成圓角，半徑跟這個元素其他圓角一樣。`}),`
`,(0,o.jsx)(n.li,{children:`用 SVG 做。`}),`
`]}),`
`,(0,o.jsx)(n.h2,{children:`Technique map`}),`
`,(0,o.jsxs)(n.table,{children:[(0,o.jsx)(n.thead,{children:(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.th,{children:`需求`}),(0,o.jsx)(n.th,{children:`技巧`}),(0,o.jsx)(n.th,{children:`筆記`})]})}),(0,o.jsxs)(n.tbody,{children:[(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:`畫出外角的形狀`}),(0,o.jsxs)(n.td,{children:[`一條 `,(0,o.jsx)(n.code,{children:`<path>`}),`：`,(0,o.jsx)(n.code,{children:`M`}),` → `,(0,o.jsx)(n.code,{children:`A`}),` → `,(0,o.jsx)(n.code,{children:`L`}),` → `,(0,o.jsx)(n.code,{children:`Z`})]}),(0,o.jsxs)(n.td,{children:[(0,o.jsx)(n.a,{href:`/wham/svg/paths`,children:`Paths`}),`、`,(0,o.jsx)(n.a,{href:`/wham/svg/path-commands`,children:`Path Commands`})]})]}),(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:`弧往哪邊凸`}),(0,o.jsxs)(n.td,{children:[(0,o.jsx)(n.code,{children:`A`}),` 的 `,(0,o.jsx)(n.code,{children:`sweep-flag`}),`（`,(0,o.jsx)(n.code,{children:`0`}),` 是扇形，`,(0,o.jsx)(n.code,{children:`1`}),` 是外角）`]}),(0,o.jsx)(n.td,{children:(0,o.jsx)(n.a,{href:`/wham/svg/arcs`,children:`Arcs`})})]}),(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:`8 單位的圖放大成 16px`}),(0,o.jsxs)(n.td,{children:[(0,o.jsx)(n.code,{children:`viewBox="0 0 8 8"`}),` + CSS `,(0,o.jsx)(n.code,{children:`width`}),` / `,(0,o.jsx)(n.code,{children:`height`})]}),(0,o.jsx)(n.td,{children:(0,o.jsx)(n.a,{href:`/wham/svg/viewbox`,children:`viewBox`})})]}),(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:`跟 dialog 同色`}),(0,o.jsxs)(n.td,{children:[`CSS `,(0,o.jsx)(n.code,{children:`fill: white`}),`；component 裡用 `,(0,o.jsx)(n.code,{children:`currentColor`})]}),(0,o.jsx)(n.td,{children:(0,o.jsx)(n.a,{href:`/wham/svg/strokes-and-fills`,children:`Strokes & Fills`})})]}),(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:`貼到按鈕外側`}),(0,o.jsxs)(n.td,{children:[(0,o.jsx)(n.code,{children:`position: absolute`}),` + `,(0,o.jsx)(n.code,{children:`translateX(-100%)`})]}),(0,o.jsx)(n.td,{children:`沒有筆記專門講，是一般 CSS 定位，見下方 mechanism`})]}),(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:`不擋按鈕的滑鼠事件`}),(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:`pointer-events: none`})}),(0,o.jsx)(n.td,{children:`沒有筆記專門講`})]}),(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:`四個方向共用一條 path`}),(0,o.jsxs)(n.td,{children:[`CSS `,(0,o.jsx)(n.code,{children:`rotate()`}),` + `,(0,o.jsx)(n.code,{children:`transform-origin`}),` 在 SVG 裡的行為`]}),(0,o.jsx)(n.td,{children:(0,o.jsx)(n.a,{href:`/wham/svg/transforms-in-svg`,children:`Transforms in SVG`})})]}),(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:`寬高不同也能撐滿`}),(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:`preserveAspectRatio="none"`})}),(0,o.jsx)(n.td,{children:(0,o.jsx)(n.a,{href:`/wham/svg/aspect-ratio`,children:`Aspect Ratio`})})]}),(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:`包成 React component`}),(0,o.jsx)(n.td,{children:`JSX 裡的 SVG + props`}),(0,o.jsx)(n.td,{children:(0,o.jsx)(n.a,{href:`/wham/svg/svg-in-react`,children:`SVGs in React`})})]}),(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:`Extension：按鈕滑進來`}),(0,o.jsxs)(n.td,{children:[`CSS `,(0,o.jsx)(n.code,{children:`transition`}),`，只在 `,(0,o.jsx)(n.code,{children:`no-preference`}),` 時開`]}),(0,o.jsx)(n.td,{children:(0,o.jsx)(n.a,{href:`/wham/particles/motion-accessibility`,children:`Motion Accessibility`})})]})]})]}),`
`,(0,o.jsx)(n.h2,{children:`Build order`}),`
`,(0,o.jsxs)(`details`,{children:[(0,o.jsx)(`summary`,{children:`Hint 1 — 從 Arc 指令開始`}),(0,o.jsxs)(n.p,{children:[`外角的弧線就是四分之一個圓。SVG path 的 `,(0,o.jsx)(n.code,{children:`A`}),` 指令剛好能畫一段圓弧，先用它把這四分之一圓畫出來。`]})]}),`
`,(0,o.jsxs)(`details`,{children:[(0,o.jsx)(`summary`,{children:`Hint 2 — 填圓外那一塊，不是扇形`}),(0,o.jsx)(n.p,{children:`直覺會把四分之一圓整塊填滿，但外角要的是「圓外面」的部分。Josh 的指令順序：`}),(0,o.jsxs)(n.ol,{children:[`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:`M`}),` 移到右上角。`]}),`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:`A`}),` 沿弧線畫到左下角。`]}),`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:`L`}),` 直線拉到右下角。`]}),`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:`Z`}),` 把 path 封起來。`]}),`
`]})]}),`
`,(0,o.jsxs)(`details`,{children:[(0,o.jsx)(`summary`,{children:`Hint 3 — 最後才用 CSS 定位`}),(0,o.jsx)(n.p,{children:`形狀對了再處理位置：用 CSS 把這塊 SVG 擺到 close button 外面，貼著按鈕的左下角。`})]}),`
`,(0,o.jsx)(n.h2,{children:`Why the arc bulges the other way`}),`
`,(0,o.jsx)(r,{title:`Same four commands, only sweep-flag differs`,children:(0,o.jsx)(_,{})}),`
`,(0,o.jsxs)(n.p,{children:[`虛線圓是弧所屬的那個圓，實線方框是 8×8 的 viewBox。紅點依序是 `,(0,o.jsx)(n.code,{children:`M`}),` 的起點、`,(0,o.jsx)(n.code,{children:`A`}),` 的終點、`,(0,o.jsx)(n.code,{children:`L`}),` 的終點。`]}),`
`,(0,o.jsxs)(n.p,{children:[`從 (8, 0) 到 (0, 8)、半徑 8 的圓弧有兩個可能的圓心：(0, 0) 跟 (8, 8)。`,(0,o.jsx)(n.code,{children:`sweep-flag`}),` 決定走哪一個：`]}),`
`,(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:`language-svg`,children:`<!-- sweep-flag 0：圓心 (8, 8)，弧往左上凸 → L 回圓心 → 扇形 -->
<path d="M 8,0 A 8,8 0 0 0 0,8 L 8,8 Z" />

<!-- sweep-flag 1：圓心 (0, 0)，弧往右下凸 → L 到角落 → 外角 -->
<path d="M 8,0 A 8,8 0 0 1 0,8 L 8,8 Z" />
`})}),`
`,(0,o.jsxs)(n.p,{children:[`兩個版本的 `,(0,o.jsx)(n.code,{children:`L 8,8`}),` 都走到同一個點，但意義不同。扇形版本的 (8, 8) 是圓心，所以封起來是 pie slice。外角版本的 (8, 8) 是圓外的角落，封起來的是「方塊減掉四分之一圓」剩下的那塊。`]}),`
`,(0,o.jsx)(n.p,{children:`放到按鈕旁邊時，凹進去的弧面朝左上，也就是朝向 dialog 外面的空白；填滿的那側貼著右邊的按鈕跟下面的 dialog 頂邊。這正是外角該長的樣子。`}),`
`,(0,o.jsx)(n.h2,{children:`Sizing: 8 units in, 16px out`}),`
`,(0,o.jsxs)(n.p,{children:[`path 在 8×8 的座標系裡畫，但 CSS 把 `,(0,o.jsx)(n.code,{children:`<svg>`}),` 設成 dialog 的圓角半徑：`]}),`
`,(0,o.jsx)(o.Fragment,{children:(0,o.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,o.jsxs)(n.code,{children:[(0,o.jsxs)(n.span,{className:`line`,children:[(0,o.jsx)(n.span,{style:{color:`#6F42C1`},children:`.wham-oc-outer-corner`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,o.jsxs)(n.span,{className:`line`,children:[(0,o.jsx)(n.span,{style:{color:`#005CC5`},children:`  width`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,o.jsx)(n.span,{style:{color:`#005CC5`},children:`var`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,o.jsx)(n.span,{style:{color:`#E36209`},children:`--radius`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`);   `}),(0,o.jsx)(n.span,{style:{color:`#6A737D`},children:`/* 16px */`})]}),`
`,(0,o.jsxs)(n.span,{className:`line`,children:[(0,o.jsx)(n.span,{style:{color:`#005CC5`},children:`  height`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,o.jsx)(n.span,{style:{color:`#005CC5`},children:`var`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,o.jsx)(n.span,{style:{color:`#E36209`},children:`--radius`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`);`})]}),`
`,(0,o.jsxs)(n.span,{className:`line`,children:[(0,o.jsx)(n.span,{style:{color:`#005CC5`},children:`  fill`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,o.jsx)(n.span,{style:{color:`#005CC5`},children:`white`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,o.jsx)(n.span,{className:`line`,children:(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`}`})})]})})}),`
`,(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:`viewBox="0 0 8 8"`}),` 會把 8 單位對映到 16px，弧的半徑也跟著變成 16px，跟 dialog 的 `,(0,o.jsx)(n.code,{children:`border-radius: var(--radius)`}),` 對齊。之後想換半徑只改 `,(0,o.jsx)(n.code,{children:`--radius`}),`，path 完全不用動。`]}),`
`,(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:`fill`}),` 寫在 `,(0,o.jsx)(n.code,{children:`<svg>`}),` 上，靠繼承傳到 `,(0,o.jsx)(n.code,{children:`<path>`}),`。`]}),`
`,(0,o.jsx)(n.h2,{children:`Positioning the corner inside the button`}),`
`,(0,o.jsxs)(n.p,{children:[`外角 SVG 放在 `,(0,o.jsx)(n.code,{children:`<button>`}),` 裡面，不是 dialog 裡：`]}),`
`,(0,o.jsx)(o.Fragment,{children:(0,o.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,o.jsxs)(n.code,{children:[(0,o.jsxs)(n.span,{className:`line`,children:[(0,o.jsx)(n.span,{style:{color:`#6F42C1`},children:`.wham-oc-outer-corner`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,o.jsxs)(n.span,{className:`line`,children:[(0,o.jsx)(n.span,{style:{color:`#005CC5`},children:`  position`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,o.jsx)(n.span,{style:{color:`#005CC5`},children:`absolute`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,o.jsxs)(n.span,{className:`line`,children:[(0,o.jsx)(n.span,{style:{color:`#005CC5`},children:`  left`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,o.jsx)(n.span,{style:{color:`#005CC5`},children:`0`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,o.jsxs)(n.span,{className:`line`,children:[(0,o.jsx)(n.span,{style:{color:`#005CC5`},children:`  bottom`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,o.jsx)(n.span,{style:{color:`#005CC5`},children:`0`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,o.jsxs)(n.span,{className:`line`,children:[(0,o.jsx)(n.span,{style:{color:`#005CC5`},children:`  transform`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,o.jsx)(n.span,{style:{color:`#005CC5`},children:`translateX`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,o.jsx)(n.span,{style:{color:`#005CC5`},children:`-100`}),(0,o.jsx)(n.span,{style:{color:`#D73A49`},children:`%`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`);`})]}),`
`,(0,o.jsxs)(n.span,{className:`line`,children:[(0,o.jsx)(n.span,{style:{color:`#005CC5`},children:`  pointer-events`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`: `}),(0,o.jsx)(n.span,{style:{color:`#005CC5`},children:`none`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,o.jsx)(n.span,{className:`line`,children:(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`}`})})]})})}),`
`,(0,o.jsxs)(n.ul,{children:[`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:`為什麼當 button 的 child`}),`：button 本身是 `,(0,o.jsx)(n.code,{children:`position: absolute`}),`，所以它就是外角的 containing block。`,(0,o.jsx)(n.code,{children:`left: 0; bottom: 0`}),` 讓外角的左下角對齊按鈕的左下角；按鈕不管怎麼移，外角都跟著走。`]}),`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsxs)(n.strong,{children:[`為什麼用 `,(0,o.jsx)(n.code,{children:`translateX(-100%)`})]}),`：百分比算的是外角自己的寬度，所以不管 `,(0,o.jsx)(n.code,{children:`--radius`}),` 是多少，都剛好推出按鈕一個身位。寫 `,(0,o.jsx)(n.code,{children:`left: calc(var(--radius) * -1)`}),` 也行，但要多記一個變數。`]}),`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsxs)(n.strong,{children:[`按鈕的 `,(0,o.jsx)(n.code,{children:`bottom`}),` 就是 dialog 的頂邊`]}),`：按鈕 `,(0,o.jsx)(n.code,{children:`top: 0`}),` 再 `,(0,o.jsx)(n.code,{children:`translateY(-100%)`}),`，底邊剛好落在 dialog 頂邊上，外角的底邊也就貼在那條線上。`]}),`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.code,{children:`pointer-events: none`})}),`：外角是 button 的 descendant，事件會冒泡到 button。不關的話，按鈕旁邊那 16×16 的空白也會變成可點區域。`]}),`
`]}),`
`,(0,o.jsx)(n.h2,{children:`Bonus: one path, four orientations`}),`
`,(0,o.jsx)(r,{title:`Josh's OuterCorner component — four orientations`,children:(0,o.jsx)(y,{})}),`
`,(0,o.jsxs)(n.p,{children:[`Josh 的 component 把同一條 path 包起來，`,(0,o.jsx)(n.code,{children:`orientation`}),` 只換旋轉角度：`]}),`
`,(0,o.jsx)(o.Fragment,{children:(0,o.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,o.jsxs)(n.code,{children:[(0,o.jsxs)(n.span,{className:`line`,children:[(0,o.jsx)(n.span,{style:{color:`#D73A49`},children:`let`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:` rotation;`})]}),`
`,(0,o.jsxs)(n.span,{className:`line`,children:[(0,o.jsx)(n.span,{style:{color:`#D73A49`},children:`if`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:` (orientation `}),(0,o.jsx)(n.span,{style:{color:`#D73A49`},children:`===`}),(0,o.jsx)(n.span,{style:{color:`#032F62`},children:` 'bottom-right'`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`) {`})]}),`
`,(0,o.jsxs)(n.span,{className:`line`,children:[(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`  rotation `}),(0,o.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,o.jsx)(n.span,{style:{color:`#005CC5`},children:` 0`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,o.jsxs)(n.span,{className:`line`,children:[(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`} `}),(0,o.jsx)(n.span,{style:{color:`#D73A49`},children:`else`}),(0,o.jsx)(n.span,{style:{color:`#D73A49`},children:` if`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:` (orientation `}),(0,o.jsx)(n.span,{style:{color:`#D73A49`},children:`===`}),(0,o.jsx)(n.span,{style:{color:`#032F62`},children:` 'bottom-left'`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`) {`})]}),`
`,(0,o.jsxs)(n.span,{className:`line`,children:[(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`  rotation `}),(0,o.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,o.jsx)(n.span,{style:{color:`#005CC5`},children:` 90`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,o.jsxs)(n.span,{className:`line`,children:[(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`} `}),(0,o.jsx)(n.span,{style:{color:`#D73A49`},children:`else`}),(0,o.jsx)(n.span,{style:{color:`#D73A49`},children:` if`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:` (orientation `}),(0,o.jsx)(n.span,{style:{color:`#D73A49`},children:`===`}),(0,o.jsx)(n.span,{style:{color:`#032F62`},children:` 'top-left'`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`) {`})]}),`
`,(0,o.jsxs)(n.span,{className:`line`,children:[(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`  rotation `}),(0,o.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,o.jsx)(n.span,{style:{color:`#005CC5`},children:` 180`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,o.jsxs)(n.span,{className:`line`,children:[(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`} `}),(0,o.jsx)(n.span,{style:{color:`#D73A49`},children:`else`}),(0,o.jsx)(n.span,{style:{color:`#D73A49`},children:` if`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:` (orientation `}),(0,o.jsx)(n.span,{style:{color:`#D73A49`},children:`===`}),(0,o.jsx)(n.span,{style:{color:`#032F62`},children:` 'top-right'`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`) {`})]}),`
`,(0,o.jsxs)(n.span,{className:`line`,children:[(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`  rotation `}),(0,o.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,o.jsx)(n.span,{style:{color:`#005CC5`},children:` 270`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,o.jsxs)(n.span,{className:`line`,children:[(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`} `}),(0,o.jsx)(n.span,{style:{color:`#D73A49`},children:`else`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,o.jsxs)(n.span,{className:`line`,children:[(0,o.jsx)(n.span,{style:{color:`#D73A49`},children:`  throw`}),(0,o.jsx)(n.span,{style:{color:`#D73A49`},children:` new`}),(0,o.jsx)(n.span,{style:{color:`#6F42C1`},children:` Error`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`(`}),(0,o.jsx)(n.span,{style:{color:`#032F62`},children:`'Unrecognized orientation: '`}),(0,o.jsx)(n.span,{style:{color:`#D73A49`},children:` +`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:` orientation);`})]}),`
`,(0,o.jsx)(n.span,{className:`line`,children:(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`}`})})]})})}),`
`,(0,o.jsxs)(n.p,{children:[`名稱指的是「填滿的角落在哪」。原始 path 填的是右下角，所以 `,(0,o.jsx)(n.code,{children:`bottom-right`}),` 是 0°；順時針轉 90° 填滿的角落跑到左下，就是 `,(0,o.jsx)(n.code,{children:`bottom-left`}),`。上面主解答用的就是 `,(0,o.jsx)(n.code,{children:`bottom-right`}),`。`]}),`
`,(0,o.jsx)(n.p,{children:`幾個細節：`}),`
`,(0,o.jsxs)(n.ul,{children:[`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsxs)(n.strong,{children:[(0,o.jsx)(n.code,{children:`transformOrigin: 'center center'`}),` 能用是巧合嗎？`]}),` 不是巧合，是 viewBox 剛好只放這塊 path。`,(0,o.jsx)(n.a,{href:`/wham/svg/transforms-in-svg`,children:`Transforms in SVG`}),` 提過，SVG 元素的 `,(0,o.jsx)(n.code,{children:`transform-origin`}),` 參考的是 viewBox，不是元素自己的 bounding box。這裡 viewBox 是 0 到 8，中心 (4, 4) 也是 path 的中心，所以直接轉就對。`]}),`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.code,{children:`fill="currentColor"`})}),`：顏色交給外層 CSS 的 `,(0,o.jsx)(n.code,{children:`color`}),` 決定，放在白 dialog 上就設 `,(0,o.jsx)(n.code,{children:`color: white`}),`。`,(0,o.jsx)(n.code,{children:`<svg>`}),` 上的 `,(0,o.jsx)(n.code,{children:`fill="none"`}),` 只是預設值，path 自己覆蓋掉。`]}),`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.code,{children:`preserveAspectRatio="none"`})}),`：傳進來的寬高不同時直接拉伸，不會 letterbox。適合水平、垂直圓角半徑不同的設計。`]}),`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.code,{children:`...delegated`})}),`：`,(0,o.jsx)(n.code,{children:`className`}),`、`,(0,o.jsx)(n.code,{children:`style`}),`、`,(0,o.jsx)(n.code,{children:`aria-hidden`}),` 都能直接往下傳，定位的 CSS 由使用端負責。`]}),`
`]}),`
`,(0,o.jsx)(n.h2,{children:`Both extensions with the component`}),`
`,(0,o.jsx)(r,{title:`Extensions — inset button with two corners, slide in/out (my composition)`,children:(0,o.jsx)(b,{})}),`
`,(0,o.jsxs)(n.p,{children:[`Josh 只丟了 extension 題目，沒給解答。這個 demo 是我用他的 `,(0,o.jsx)(n.code,{children:`OuterCorner`}),` 拼出來的版本。`]}),`
`,(0,o.jsx)(n.p,{children:`按鈕離開 dialog 右邊緣之後，兩側都變成外角，所以要兩個 component：`}),`
`,(0,o.jsx)(o.Fragment,{children:(0,o.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,o.jsxs)(n.code,{children:[(0,o.jsxs)(n.span,{className:`line`,children:[(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`<`}),(0,o.jsx)(n.span,{style:{color:`#005CC5`},children:`OuterCorner`})]}),`
`,(0,o.jsxs)(n.span,{className:`line`,children:[(0,o.jsx)(n.span,{style:{color:`#6F42C1`},children:`  orientation`}),(0,o.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,o.jsx)(n.span,{style:{color:`#032F62`},children:`"bottom-right"`})]}),`
`,(0,o.jsxs)(n.span,{className:`line`,children:[(0,o.jsx)(n.span,{style:{color:`#6F42C1`},children:`  size`}),(0,o.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`{`}),(0,o.jsx)(n.span,{style:{color:`#005CC5`},children:`16`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`}`})]}),`
`,(0,o.jsxs)(n.span,{className:`line`,children:[(0,o.jsx)(n.span,{style:{color:`#6F42C1`},children:`  className`}),(0,o.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,o.jsx)(n.span,{style:{color:`#032F62`},children:`"wham-oc-ext-corner"`})]}),`
`,(0,o.jsxs)(n.span,{className:`line`,children:[(0,o.jsx)(n.span,{style:{color:`#6F42C1`},children:`  style`}),(0,o.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`{{ left: `}),(0,o.jsx)(n.span,{style:{color:`#005CC5`},children:`0`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`, transform: `}),(0,o.jsx)(n.span,{style:{color:`#032F62`},children:`'translateX(-100%)'`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:` }}`})]}),`
`,(0,o.jsx)(n.span,{className:`line`,children:(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`/>`})}),`
`,(0,o.jsxs)(n.span,{className:`line`,children:[(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`<`}),(0,o.jsx)(n.span,{style:{color:`#005CC5`},children:`OuterCorner`})]}),`
`,(0,o.jsxs)(n.span,{className:`line`,children:[(0,o.jsx)(n.span,{style:{color:`#6F42C1`},children:`  orientation`}),(0,o.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,o.jsx)(n.span,{style:{color:`#032F62`},children:`"bottom-left"`})]}),`
`,(0,o.jsxs)(n.span,{className:`line`,children:[(0,o.jsx)(n.span,{style:{color:`#6F42C1`},children:`  size`}),(0,o.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`{`}),(0,o.jsx)(n.span,{style:{color:`#005CC5`},children:`16`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`}`})]}),`
`,(0,o.jsxs)(n.span,{className:`line`,children:[(0,o.jsx)(n.span,{style:{color:`#6F42C1`},children:`  className`}),(0,o.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,o.jsx)(n.span,{style:{color:`#032F62`},children:`"wham-oc-ext-corner"`})]}),`
`,(0,o.jsxs)(n.span,{className:`line`,children:[(0,o.jsx)(n.span,{style:{color:`#6F42C1`},children:`  style`}),(0,o.jsx)(n.span,{style:{color:`#D73A49`},children:`=`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`{{ right: `}),(0,o.jsx)(n.span,{style:{color:`#005CC5`},children:`0`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`, transform: `}),(0,o.jsx)(n.span,{style:{color:`#032F62`},children:`'translateX(100%)'`}),(0,o.jsx)(n.span,{style:{color:`#24292E`},children:` }}`})]}),`
`,(0,o.jsx)(n.span,{className:`line`,children:(0,o.jsx)(n.span,{style:{color:`#24292E`},children:`/>`})})]})})}),`
`,(0,o.jsxs)(n.p,{children:[`按鈕左邊那塊填右下角，填滿的一側貼著按鈕左緣；按鈕右邊那塊填左下角，貼著按鈕右緣。兩塊互為鏡像。Dialog 自己的四個角也都改回 `,(0,o.jsx)(n.code,{children:`border-radius: var(--radius)`}),`。`]}),`
`,(0,o.jsx)(n.p,{children:`滑進來的效果：`}),`
`,(0,o.jsxs)(n.ul,{children:[`
`,(0,o.jsxs)(n.li,{children:[`按鈕 `,(0,o.jsx)(n.code,{children:`z-index: -1`}),` 藏到 dialog 後面，`,(0,o.jsx)(n.code,{children:`translateY(0%)`}),` 時整顆被 dialog 蓋住；打開時 `,(0,o.jsx)(n.code,{children:`translateY(-100%)`}),` 升上來。`]}),`
`,(0,o.jsxs)(n.li,{children:[`Stage 設 `,(0,o.jsx)(n.code,{children:`isolation: isolate`}),`，讓 `,(0,o.jsx)(n.code,{children:`-1`}),` 只沉到 stage 的背景之上、dialog 之下，不會沉到整個頁面後面。`]}),`
`,(0,o.jsx)(n.li,{children:`外角是按鈕的 child，跟著一起滑，也跟著一起被 dialog 蓋住。它貼在按鈕底邊，只有最後 16px 的行程會露出來，看起來像從 dialog 頂邊長出來，不會變成兩塊白色碎片先飄上去。`}),`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:`transition`}),` 只寫在 `,(0,o.jsx)(n.code,{children:`@media (prefers-reduced-motion: no-preference)`}),` 裡，偏好減少動態的人直接切換，不滑動。`]}),`
`]}),`
`,(0,o.jsx)(n.h2,{children:`Gotchas`}),`
`,(0,o.jsxs)(n.ul,{children:[`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:`題目文字說 8px，playground 的 CSS 是 16px。`}),` 驗收條件寫「半徑 8px」，但 starter 跟解答都是 `,(0,o.jsx)(n.code,{children:`--radius: 16px`}),`，外角也設成 `,(0,o.jsx)(n.code,{children:`var(--radius)`}),`。我跟著程式碼走，用 16px。path 裡的 8 是 viewBox 單位，不是 px。`]}),`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:`填的是方塊減掉四分之一圓，不是扇形。`}),` 形狀看起來「胖」了一圈、像實心 pie，多半是 `,(0,o.jsx)(n.code,{children:`sweep-flag`}),` 寫成 `,(0,o.jsx)(n.code,{children:`0`}),`。`]}),`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:`外角要放在 button 裡。`}),` 放到 dialog 底下的話，要自己算按鈕的位置，按鈕一移動就對不齊。`]}),`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsxs)(n.strong,{children:[(0,o.jsx)(n.code,{children:`pointer-events: none`}),` 別漏。`]}),` 否則按鈕的 hover / click 區域偷偷多出一塊。`]}),`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsxs)(n.strong,{children:[`Extension 的內縮距離至少要 2 × `,(0,o.jsx)(n.code,{children:`--radius`}),`。`]}),` Dialog 自己右上角的圓角吃掉最後 16px，右側外角又佔 16px。內縮不夠的話，右側外角會懸在 dialog 圓角的弧線上，底下露出一小條縫。我用 `,(0,o.jsx)(n.code,{children:`--inset: calc(var(--radius) * 2)`}),`。`]}),`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsxs)(n.strong,{children:[`偏差：`,(0,o.jsx)(n.code,{children:`position: fixed`}),` 改成 `,(0,o.jsx)(n.code,{children:`absolute`}),`。`]}),` Josh 的 dialog 是 `,(0,o.jsx)(n.code,{children:`fixed`}),` + `,(0,o.jsx)(n.code,{children:`inset: 0`}),` 置中在整個視窗；note 裡要關在 demo 框內，所以改成 `,(0,o.jsx)(n.code,{children:`absolute`}),`，外層 stage 設 `,(0,o.jsx)(n.code,{children:`position: relative`}),`。`]}),`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:`偏差：CSS nesting 攤平、class 加前綴。`}),` Josh 用原生 CSS nesting 寫在 `,(0,o.jsx)(n.code,{children:`dialog`}),` 底下；這裡攤平成一般 selector，class 全部加 `,(0,o.jsx)(n.code,{children:`wham-oc-`}),` 前綴，避免跟同頁其他 demo 撞名。`,(0,o.jsx)(n.code,{children:`<dialog open>`}),`、wrapper div、visually-hidden 的 `,(0,o.jsx)(n.code,{children:`Close`}),` 文字都保留。`]}),`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:`偏差：Solution demo 多了兩個 checkbox。`}),` 「Outer corner」跟「Highlight」是 note 為了對照加的，Josh 的解答沒有。`]}),`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:`偏差：Anatomy demo 取代 hint 的圖。`}),` 課程頁的 hint 用圖片說明「不要填扇形」；這裡改成即時 SVG 並排比較，兩者只差 `,(0,o.jsx)(n.code,{children:`sweep-flag`}),`。`]}),`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:`Extensions demo 是我自己的版本。`}),` 題目沒有解答；內縮距離、`,(0,o.jsx)(n.code,{children:`z-index: -1`}),` + `,(0,o.jsx)(n.code,{children:`isolation: isolate`}),` 的藏法、easing `,(0,o.jsx)(n.code,{children:`cubic-bezier(0.2, 0.8, 0.3, 1)`}),` 跟 450ms 都是我挑的。`]}),`
`,(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:`Reduced motion：`}),` Josh 的主解答沒有動畫，不用處理。只有我加的 slide-in 有 transition，用「motion-free by default」寫法包在 `,(0,o.jsx)(n.code,{children:`no-preference`}),` 裡。`]}),`
`]}),`
`,(0,o.jsx)(n.h2,{children:`Extensions`}),`
`,(0,o.jsxs)(n.ul,{children:[`
`,(0,o.jsx)(n.li,{children:`把 close button 往左移一點，不要緊貼 dialog 右邊緣。這時按鈕兩側都需要外角。`}),`
`,(0,o.jsx)(n.li,{children:`讓 close button 用滑的方式出現。`}),`
`]})]})}function w(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(C,{...e})}):C(e)}function T(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as n,S as t};