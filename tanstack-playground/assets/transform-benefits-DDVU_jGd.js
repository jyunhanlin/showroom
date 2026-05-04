import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{i as n,n as r,r as i}from"./lib-BI_-S7V4.js";import{R as a,z as o}from"./index-CRMRchBc.js";var s=e(n(),1),c=i(),l=1e3,u=500,d=200,f=48,p=0;function m(){let[e,t]=(0,s.useState)(`transform`),[n,r]=(0,s.useState)(20),[i,m]=(0,s.useState)(!1),[h,g]=(0,s.useState)([]),_=(0,s.useRef)([]);(0,s.useEffect)(()=>()=>{_.current.forEach(e=>window.clearTimeout(e))},[]);function v(){let e=!i;if(m(e),!e)return;let t=a(n).map(()=>({id:p++,x:o(-f,f),y:o(-f,f),topPct:o(0,100),leftPct:o(0,100)})),r=t.map(e=>e.id);g(e=>[...e,...t]);let s=window.setTimeout(()=>{g(e=>e.filter(e=>!r.includes(e.id)))},l+d);_.current.push(s)}return(0,c.jsxs)(`div`,{className:`flex flex-col items-center gap-3`,children:[(0,c.jsx)(`style`,{children:`
        @keyframes wham-tb-fadeOut { to { opacity: 0 } }
        @keyframes wham-tb-fromCenterTransform { from { transform: translate(0px, 0px) } }
        @keyframes wham-tb-fromCenterTopLeft { from { top: 50%; left: 50% } }
        .wham-tb-particle {
          position: absolute;
          width: 12px; height: 12px;
          border-radius: 50%;
          background: white;
          pointer-events: none;
          animation: wham-tb-fadeOut ${l}ms forwards;
        }
        .wham-tb-particle.transform {
          inset: 0;
          margin: auto;
          animation:
            wham-tb-fadeOut ${l}ms forwards,
            wham-tb-fromCenterTransform ${u}ms forwards;
        }
        .wham-tb-particle.topLeft {
          transform: translate(-50%, -50%);
          animation:
            wham-tb-fadeOut ${l}ms forwards,
            wham-tb-fromCenterTopLeft ${u}ms forwards;
        }
      `}),(0,c.jsxs)(`button`,{type:`button`,onClick:v,"aria-pressed":i,className:`relative flex h-16 w-16 items-center justify-center rounded-full bg-rose-500 transition-colors hover:bg-rose-600`,children:[(0,c.jsx)(`svg`,{viewBox:`0 0 24 24`,width:28,height:28,"aria-hidden":`true`,children:(0,c.jsx)(`path`,{d:`M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z`,stroke:`white`,strokeWidth:`2`,strokeLinejoin:`round`,fill:i?`white`:`none`})}),h.map(t=>(0,c.jsx)(`span`,{className:`wham-tb-particle ${e}`,style:e===`transform`?{transform:`translate(${t.x}px, ${t.y}px)`}:{top:`${t.topPct}%`,left:`${t.leftPct}%`}},t.id)),(0,c.jsx)(`span`,{className:`sr-only`,children:`Like this post`})]}),(0,c.jsxs)(`div`,{className:`flex flex-col gap-2 font-mono text-sm`,children:[(0,c.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,c.jsxs)(`label`,{className:`flex items-center gap-1`,children:[(0,c.jsx)(`input`,{type:`radio`,checked:e===`transform`,onChange:()=>t(`transform`)}),`transform`]}),(0,c.jsxs)(`label`,{className:`flex items-center gap-1`,children:[(0,c.jsx)(`input`,{type:`radio`,checked:e===`topLeft`,onChange:()=>t(`topLeft`)}),`top + left`]})]}),(0,c.jsxs)(`label`,{className:`flex items-center gap-3`,children:[(0,c.jsxs)(`span`,{className:`w-32`,children:[`particles: `,n]}),(0,c.jsx)(`input`,{type:`range`,min:5,max:300,value:n,onChange:e=>r(Number(e.target.value))})]})]}),(0,c.jsx)(`p`,{className:`text-xs text-gray-500`,children:`把粒子數拉高,在低階機器或縮小的瀏覽器視窗上比較滑順度。`})]})}function h(){return(0,c.jsxs)(`div`,{className:`flex flex-col items-center gap-3`,children:[(0,c.jsx)(`style`,{children:`
        @keyframes wham-tb-underline-height-in {
          from { height: 0 } to { height: 2px }
        }
        @keyframes wham-tb-underline-scale-in {
          from { transform: scaleY(0) } to { transform: scaleY(1) }
        }
        .wham-tb-underline-row { display: flex; gap: 2rem; }
        .wham-tb-underline-link {
          position: relative; padding-bottom: 4px;
          color: white; font-size: 1.125rem;
          text-decoration: none;
        }
        .wham-tb-underline-link::after {
          content: ''; position: absolute; left: 0; right: 0; bottom: 0;
          background: oklch(0.7 0.2 240);
          height: 0;
          transform-origin: bottom;
        }
        .wham-tb-underline-link.height:hover::after {
          animation: wham-tb-underline-height-in 1500ms forwards;
        }
        .wham-tb-underline-link.scale::after {
          height: 2px;
          transform: scaleY(0);
        }
        .wham-tb-underline-link.scale:hover::after {
          animation: wham-tb-underline-scale-in 1500ms forwards;
        }
      `}),(0,c.jsxs)(`div`,{className:`flex w-full max-w-md flex-col items-center gap-2 rounded-md bg-slate-900 p-6`,children:[(0,c.jsx)(`p`,{className:`font-mono text-xs text-gray-400`,children:`hover 比較(刻意拉長到 1500ms)`}),(0,c.jsxs)(`div`,{className:`wham-tb-underline-row`,children:[(0,c.jsx)(`span`,{className:`wham-tb-underline-link height`,children:`height`}),(0,c.jsx)(`span`,{className:`wham-tb-underline-link scale`,children:`scaleY`})]})]}),(0,c.jsx)(`p`,{className:`text-xs text-gray-500`,children:"Chromium 上 `transform: scaleY` 會做 sub-pixel 漸層;`height` 只能整像素切換,看起來比較跳。"})]})}var g=t({default:()=>y,frontmatter:()=>_}),_={title:`Transform Benefits, why animate transform over top/left`,sourceUrl:`https://courses.joshwcomeau.com/wham/01-particles/04.02-transform-benefits`,lessonNumber:`01-particles/04.02-transform-benefits`,order:7,summary:`animation 用 transform 而不是 top/left/width/height,除了 GPU 加速 / 跳過 layout,還能在 Chromium 上做 sub-pixel rendering — 動畫看起來比畫面解析度的物理極限還滑順。`,tags:[`particles`,`css`,`transform`,`performance`,`sub-pixel`]};function v(e){let t={code:`code`,h2:`h2`,li:`li`,p:`p`,strong:`strong`,ul:`ul`,...r(),...e.components},{DemoFrame:n}=t;return n||b(`DemoFrame`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`TL;DR`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`transform`}),` 是 CSS 中最被優化的屬性。每幀 update 只需 compositor 重組圖層,不必重算 layout / paint。`]}),`
`,(0,c.jsxs)(t.li,{children:[`主流敘事是「fps 比較好」,但 Josh 在 M4 Max 上實測發現:`,(0,c.jsx)(t.strong,{children:`到 600+ 粒子才看得出 fps 差異`}),`。低階 Android 才會在 50 粒子左右拉開差距。`]}),`
`,(0,c.jsxs)(t.li,{children:[`真正常常被忽略的優勢是 `,(0,c.jsx)(t.strong,{children:`sub-pixel rendering`}),`(僅 Chromium):2px 的底線用 `,(0,c.jsx)(t.code,{children:`height`}),` 動畫只能 0/1/2 三階,用 `,(0,c.jsx)(t.code,{children:`transform: scaleY`}),` 卻能跨越畫素的物理極限做漸層,看起來更滑順。`]}),`
`]}),`
`,(0,c.jsx)(n,{title:`Like button A/B — transform vs top + left`,children:(0,c.jsx)(m,{})}),`
`,(0,c.jsx)(t.p,{children:`把粒子拉到 200+ 顆,在低 DPI 螢幕或舊機器上會比較看得出差異。`}),`
`,(0,c.jsx)(t.h2,{children:`Sub-pixel rendering 視覺對比`}),`
`,(0,c.jsxs)(t.p,{children:[`兩個 hover 連結,左邊用 `,(0,c.jsx)(t.code,{children:`height: 0 → 2px`}),`,右邊用 `,(0,c.jsx)(t.code,{children:`transform: scaleY(0) → scaleY(1)`}),`。動畫拉長到 1500ms 觀察。`]}),`
`,(0,c.jsx)(n,{title:`height vs transform: scaleY underline (Chromium)`,children:(0,c.jsx)(h,{})}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`height`}),` 那條會看到「0px → 1px → 2px」的階梯感(只有三階)。`,(0,c.jsx)(t.code,{children:`scaleY`}),` 那條每行畫素會用 alpha 漸進填滿,`,(0,c.jsx)(t.strong,{children:`比物理畫素更細的視覺解析度`}),`。`]}),`
`,(0,c.jsx)(t.h2,{children:`Why it works`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`transform`}),` 不會觸發 layout / paint,只走 compositor。瀏覽器把 element 當一張紋理拉伸/位移,每幀只需要 GPU 重新合成。`,(0,c.jsx)(t.code,{children:`top/left/width/height`}),` 都會掉回 layout 階段重算。`]}),`
`,(0,c.jsxs)(t.p,{children:[`Sub-pixel 的部分:Chromium 在 `,(0,c.jsx)(t.code,{children:`transform: scale`}),` 時會把元素邊界的 alpha 做漸層 — 等於用透明度模擬「跨畫素」的視覺。其它 CSS 屬性沒這個優化,只能整像素跳。`]}),`
`,(0,c.jsx)(t.h2,{children:`Transform 限制`}),`
`,(0,c.jsx)(t.p,{children:`不是所有動畫都能換成 transform。例:展開文字寬度的 sidebar。`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`width`}),` 動畫 → 文字 reflow,排版自然。`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`transform: scaleX`}),` 動畫 → 文字被擠扁變形,不會 reflow。`]}),`
`]}),`
`,(0,c.jsx)(t.p,{children:`對純圖形元素(粒子、圓點、方塊)transform 永遠是首選;對有文字內容或要求佈局重排的場景,還是得用 layout 屬性,並接受可能的 jank。`}),`
`,(0,c.jsx)(t.h2,{children:`Gotchas`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`不要無腦「transforms or bust」`}),`:有些動畫沒有合理的 transform 替代方案,直接拿掉動畫只會降低 UX。先測再優化。`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Firefox WebRender 不公平`}),`:Firefox 的 rendering engine 太強,在 Firefox 上幾乎所有動畫都很滑順。要評估真實效能要在 Chrome / Safari + 低階機器上測。`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`DPR 越高,sub-pixel 優勢越小`}),`:Retina 顯示器上每個 CSS px 已經是 2~3 個物理像素,手動補 alpha 的好處就被吞掉。低 DPR 螢幕(舊筆電、便宜手機)上才看得出明顯差距。`]}),`
`]})]})}function y(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(v,{...e})}):v(e)}function b(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{g as n,_ as t};