import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{i as n,n as r,r as i}from"./lib-BI_-S7V4.js";import{R as a,z as o}from"./index-ZS0qdZgy.js";var s=e(n(),1),c=i(),l=`oklch(0.75 0.18 280)`,u=[8,16,32,64];function d(){return(0,c.jsxs)(`div`,{className:`flex flex-col items-center gap-3`,children:[(0,c.jsx)(`style`,{children:`
        @keyframes wham-dk-oscillate {
          from { transform: translateX(calc(var(--amount) * -1)) }
          to   { transform: translateX(var(--amount)) }
        }
      `}),(0,c.jsx)(`div`,{className:`flex flex-col gap-3 rounded-md bg-slate-900 p-6`,children:u.map(e=>(0,c.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,c.jsxs)(`span`,{className:`w-20 font-mono text-xs text-gray-400`,children:[`--amount: `,e,`px`]}),(0,c.jsxs)(`div`,{className:`relative`,style:{width:200},children:[(0,c.jsx)(`div`,{className:`absolute left-1/2 top-1/2 h-px w-full -translate-x-1/2 -translate-y-1/2 bg-slate-700`}),(0,c.jsx)(`div`,{className:`relative h-6 w-6 rounded-full`,style:{backgroundColor:l,margin:`0 auto`,"--amount":`${e}px`,animation:`wham-dk-oscillate 1000ms ease-in-out infinite alternate`}})]})]},e))}),(0,c.jsx)(`p`,{className:`text-xs text-gray-500`,children:"同一條 keyframe,每顆球用不同 `--amount` 變數 → 不同幅度。"})]})}var f=1e3,p=500,m=200,h=5,g=48,_=0;function v(){let[e,t]=(0,s.useState)(!1),[n,r]=(0,s.useState)([]),i=(0,s.useRef)([]);(0,s.useEffect)(()=>()=>{i.current.forEach(e=>window.clearTimeout(e))},[]);function l(){let n=!e;if(t(n),!n)return;let s=a(h).map(()=>({id:_++,x:o(-g,g),y:o(-g,g)})),c=s.map(e=>e.id);r(e=>[...e,...s]);let l=window.setTimeout(()=>{r(e=>e.filter(e=>!c.includes(e.id)))},f+m);i.current.push(l)}return(0,c.jsxs)(`div`,{className:`flex flex-col items-center gap-3`,children:[(0,c.jsx)(`style`,{children:`
        @keyframes wham-dk-fadeOut { to { opacity: 0 } }
        @keyframes wham-dk-disperse { to { transform: translate(var(--x), var(--y)) } }
        .wham-dk-particle {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 12px; height: 12px;
          border-radius: 50%;
          background: white;
          pointer-events: none;
          animation:
            wham-dk-fadeOut ${f}ms forwards,
            wham-dk-disperse ${p}ms cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
        }
      `}),(0,c.jsxs)(`button`,{type:`button`,onClick:l,"aria-pressed":e,className:`relative flex h-16 w-16 items-center justify-center rounded-full bg-rose-500 transition-colors hover:bg-rose-600`,children:[(0,c.jsx)(`svg`,{viewBox:`0 0 24 24`,width:28,height:28,"aria-hidden":`true`,children:(0,c.jsx)(`path`,{d:`M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z`,stroke:`white`,strokeWidth:`2`,strokeLinejoin:`round`,fill:e?`white`:`none`})}),n.map(e=>(0,c.jsx)(`span`,{className:`wham-dk-particle`,style:{"--x":`${e.x}px`,"--y":`${e.y}px`}},e.id)),(0,c.jsx)(`span`,{className:`sr-only`,children:`Like this post`})]}),(0,c.jsx)(`p`,{className:`text-xs text-gray-500`,children:"終點寫進 keyframe 的 `to`,但用 `var(--x) / var(--y)` 讀 inline style — 完全對稱於 `fadeOut`。"})]})}var y=t({default:()=>S,frontmatter:()=>b}),b={title:`Dynamic Keyframes, CSS variables inside keyframes`,sourceUrl:`https://courses.joshwcomeau.com/wham/01-particles/06-dynamic-keyframes`,lessonNumber:`01-particles/06-dynamic-keyframes`,order:11,summary:"keyframe 裡可以讀 `var(--x)` — 同一條 keyframe、每個元素用不同變數值就能跑出不同幅度的動畫,不用為每個值複製一份 keyframe。",tags:[`particles`,`css`,`keyframes`,`css-variables`]};function x(e){let t={code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,span:`span`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components},{DemoFrame:n}=t;return n||C(`DemoFrame`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`TL;DR`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Keyframe 不一定要寫死數字。可以寫 `,(0,c.jsx)(t.code,{children:`transform: translateX(var(--amount))`}),` — 每個套用這條 keyframe 的元素用自己的 `,(0,c.jsx)(t.code,{children:`--amount`}),`,跑出不同幅度。`]}),`
`,(0,c.jsxs)(t.li,{children:[`對粒子動畫,這是上一個版本(partial keyframe)的對稱寫法:`,`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`partial 法`}),`:`,(0,c.jsx)(t.code,{children:`from { transform: translate(0,0) }`}),` + inline style 設 `,(0,c.jsx)(t.code,{children:`transform`}),`,讓瀏覽器自動補 `,(0,c.jsx)(t.code,{children:`to`}),`。`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`dynamic var 法`}),`:`,(0,c.jsx)(t.code,{children:`to { transform: translate(var(--x), var(--y)) }`}),` + inline style 設 `,(0,c.jsx)(t.code,{children:`--x`}),` / `,(0,c.jsx)(t.code,{children:`--y`}),`。`]}),`
`]}),`
`]}),`
`,(0,c.jsxs)(t.li,{children:[`兩者效果一樣,Comeau 偏好 dynamic var 法因為跟 `,(0,c.jsx)(t.code,{children:`fadeToTransparent`}),` 一致(都寫 `,(0,c.jsx)(t.code,{children:`to`}),`)。`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{children:`鐘擺示範`}),`
`,(0,c.jsx)(n,{title:`four pendulums, one keyframe`,children:(0,c.jsx)(d,{})}),`
`,(0,c.jsxs)(t.p,{children:[`四顆球都套同一條 `,(0,c.jsx)(t.code,{children:`wham-dk-oscillate`}),`,但 `,(0,c.jsx)(t.code,{children:`--amount`}),` 從 8px 到 64px 各不同。`]}),`
`,(0,c.jsx)(t.h2,{children:`套到粒子`}),`
`,(0,c.jsx)(n,{title:`like button — dynamic var disperse`,children:(0,c.jsx)(v,{})}),`
`,(0,c.jsxs)(t.p,{children:[`每顆粒子在 inline style 設 `,(0,c.jsx)(t.code,{children:"--x: ${x}px; --y: ${y}px"}),`,keyframe 在 `,(0,c.jsx)(t.code,{children:`to`}),` 讀這兩個變數。`]}),`
`,(0,c.jsx)(t.h2,{children:`Why it works`}),`
`,(0,c.jsxs)(t.p,{children:[`CSS keyframes 在套用到元素時才被「解析」 — `,(0,c.jsx)(t.code,{children:`var(--x)`}),` 是在元素的 cascade 上下文裡查值,所以同一條 keyframe 對不同元素會產生不同的 computed value。等於把 keyframe 抽象成一個函數,參數透過 CSS 變數帶進來。`]}),`
`,(0,c.jsx)(c.Fragment,{children:(0,c.jsx)(t.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,c.jsxs)(t.code,{children:[(0,c.jsxs)(t.span,{className:`line`,children:[(0,c.jsx)(t.span,{style:{color:`#D73A49`},children:`@keyframes`}),(0,c.jsx)(t.span,{style:{color:`#E36209`},children:` oscillate`}),(0,c.jsx)(t.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,c.jsxs)(t.span,{className:`line`,children:[(0,c.jsx)(t.span,{style:{color:`#6F42C1`},children:`  from`}),(0,c.jsx)(t.span,{style:{color:`#24292E`},children:` { `}),(0,c.jsx)(t.span,{style:{color:`#005CC5`},children:`transform`}),(0,c.jsx)(t.span,{style:{color:`#24292E`},children:`: `}),(0,c.jsx)(t.span,{style:{color:`#005CC5`},children:`translateX`}),(0,c.jsx)(t.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(t.span,{style:{color:`#005CC5`},children:`calc`}),(0,c.jsx)(t.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(t.span,{style:{color:`#005CC5`},children:`var`}),(0,c.jsx)(t.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(t.span,{style:{color:`#E36209`},children:`--amount`}),(0,c.jsx)(t.span,{style:{color:`#24292E`},children:`) `}),(0,c.jsx)(t.span,{style:{color:`#D73A49`},children:`*`}),(0,c.jsx)(t.span,{style:{color:`#005CC5`},children:` -1`}),(0,c.jsx)(t.span,{style:{color:`#24292E`},children:`)) }`})]}),`
`,(0,c.jsxs)(t.span,{className:`line`,children:[(0,c.jsx)(t.span,{style:{color:`#6F42C1`},children:`  to`}),(0,c.jsx)(t.span,{style:{color:`#24292E`},children:`   { `}),(0,c.jsx)(t.span,{style:{color:`#005CC5`},children:`transform`}),(0,c.jsx)(t.span,{style:{color:`#24292E`},children:`: `}),(0,c.jsx)(t.span,{style:{color:`#005CC5`},children:`translateX`}),(0,c.jsx)(t.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(t.span,{style:{color:`#005CC5`},children:`var`}),(0,c.jsx)(t.span,{style:{color:`#24292E`},children:`(`}),(0,c.jsx)(t.span,{style:{color:`#E36209`},children:`--amount`}),(0,c.jsx)(t.span,{style:{color:`#24292E`},children:`)) }`})]}),`
`,(0,c.jsx)(t.span,{className:`line`,children:(0,c.jsx)(t.span,{style:{color:`#24292E`},children:`}`})})]})})}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`calc(var(--amount) * -1)`}),` 是「正負對稱」的小把戲 — 一個變數同時控制兩端。`]}),`
`,(0,c.jsx)(t.h2,{children:`partial vs dynamic var:選哪個?`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{}),(0,c.jsx)(t.th,{children:`partial keyframe`}),(0,c.jsx)(t.th,{children:`dynamic var keyframe`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`寫法`}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`from { transform: translate(0,0) }`})}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`to { transform: translate(var(--x), var(--y)) }`})})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`inline style`}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`transform: translate(...)`})}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`--x: ...; --y: ...`})})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsxs)(t.td,{children:[`跟 `,(0,c.jsx)(t.code,{children:`fadeToTransparent`}),` 對稱`]}),(0,c.jsx)(t.td,{children:`不對稱(一個 from / 一個 to)`}),(0,c.jsxs)(t.td,{children:[`對稱(都寫 `,(0,c.jsx)(t.code,{children:`to`}),`)`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`效能 / 瀏覽器支援`}),(0,c.jsx)(t.td,{children:`一樣`}),(0,c.jsx)(t.td,{children:`一樣`})]})]})]}),`
`,(0,c.jsx)(t.p,{children:`純粹個人喜好。Comeau 個人偏 dynamic var 法。`}),`
`,(0,c.jsx)(t.h2,{children:`Gotchas`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsxs)(t.strong,{children:[(0,c.jsx)(t.code,{children:`var(--x)`}),` 沒設 → keyframe 整條 invalid`]}),`:粒子不會動。要嘛在 inline style 設,要嘛在 keyframe 裡寫 fallback `,(0,c.jsx)(t.code,{children:`var(--x, 0px)`}),`。`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`同一個變數別人改了會影響動畫`}),`:CSS 變數有繼承。如果父層也設了 `,(0,c.jsx)(t.code,{children:`--x`}),`,記得粒子上要覆蓋。`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`動畫進行中改變數值`}),`:Chrome / Safari 行為不一致 — 多數情況不會即時反映,要到下一輪 keyframe iteration 才生效。把它當作「動畫開始時取一次的快照」更穩。`]}),`
`]})]})}function S(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(x,{...e})}):x(e)}function C(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{b as n,y as t};