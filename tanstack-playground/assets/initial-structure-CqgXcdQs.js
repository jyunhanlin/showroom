import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{i as n,n as r,r as i}from"./lib-BI_-S7V4.js";import{R as a,z as o}from"./index-Cq2wK77x.js";var s=e(n(),1),c=i(),l=0,u=5;function d(){let[e,t]=(0,s.useState)(!1),[n,r]=(0,s.useState)([]);function i(){let n=!e;if(t(n),!n)return;let i=a(u).map(()=>({id:l++,top:o(0,100),left:o(0,100)}));r(e=>[...e,...i])}return(0,c.jsxs)(`div`,{className:`flex flex-col items-center gap-3`,children:[(0,c.jsx)(`style`,{children:`
        @keyframes wham-particles-fadeOut { from { opacity: 1 } to { opacity: 0 } }
        .wham-particles-particle {
          position: absolute;
          width: 12px; height: 12px;
          border-radius: 50%;
          background: white;
          animation: wham-particles-fadeOut 1000ms forwards;
          pointer-events: none;
        }
      `}),(0,c.jsxs)(`button`,{type:`button`,onClick:i,"aria-pressed":e,className:`relative flex h-16 w-16 items-center justify-center rounded-full bg-rose-500 transition-colors hover:bg-rose-600`,children:[(0,c.jsx)(`svg`,{viewBox:`0 0 24 24`,width:28,height:28,"aria-hidden":`true`,children:(0,c.jsx)(`path`,{d:`M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z`,stroke:`white`,strokeWidth:`2`,strokeLinejoin:`round`,fill:e?`white`:`none`})}),n.map(e=>(0,c.jsx)(`span`,{className:`wham-particles-particle`,style:{top:`${e.top}%`,left:`${e.left}%`}},e.id)),(0,c.jsx)(`span`,{className:`sr-only`,children:`Like this post`})]}),(0,c.jsx)(`p`,{className:`text-xs text-gray-500`,children:`click → spawn 5 particles, fade out 1s`})]})}var f=t({default:()=>h,frontmatter:()=>p}),p={title:`Particle Generation, baseline like-button particles`,sourceUrl:`https://courses.joshwcomeau.com/wham/01-particles/01-initial-structure`,lessonNumber:`01-particles/01-initial-structure`,order:1,summary:"Like 按鈕點下去噴出 N 顆隨機位置的粒子,先做最簡版:DOM `<span>` + CSS keyframe 淡出。",tags:[`particles`,`dom`,`keyframes`,`lodash`]};function m(e){let t={code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,strong:`strong`,ul:`ul`,...r(),...e.components},{DemoFrame:n}=t;return n||g(`DemoFrame`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`TL;DR`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`第一版只做最樸素的目標 — `,(0,c.jsx)(t.strong,{children:`點按鈕 → 在按鈕內亂灑 N 顆粒子 → 淡出`}),`。`]}),`
`,(0,c.jsx)(t.li,{children:`先不考慮「向外爆炸」、不考慮 velocity,連動畫位移都沒有。`}),`
`,(0,c.jsxs)(t.li,{children:[`粒子是 `,(0,c.jsx)(t.code,{children:`<span class="particle">`}),`,`,(0,c.jsx)(t.code,{children:`position: absolute`}),` + 隨機 `,(0,c.jsx)(t.code,{children:`top/left`}),` 百分比;CSS keyframe `,(0,c.jsx)(t.code,{children:`fadeOut`}),` 配 `,(0,c.jsx)(t.code,{children:`animation-fill-mode: forwards`}),` 收尾。`]}),`
`]}),`
`,(0,c.jsx)(n,{title:`Like button — DOM particles, fade only`,children:(0,c.jsx)(d,{})}),`
`,(0,c.jsx)(t.h2,{children:`Why it works`}),`
`,(0,c.jsx)(t.p,{children:`四個小決策疊起來:`}),`
`,(0,c.jsxs)(t.ol,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`點擊產生 5 顆粒子`}),`:`,(0,c.jsx)(t.code,{children:`range(5).map(() => createParticle())`}),`,粒子推進 `,(0,c.jsx)(t.code,{children:`particles`}),` state 而不是手動 `,(0,c.jsx)(t.code,{children:`appendChild`}),`(課程是 vanilla JS,我們在 React playground 改用 state)。`]}),`
`,(0,c.jsxs)(t.li,{children:[`**位置用 `,(0,c.jsx)(t.code,{children:`random(0, 100)`}),` 算 % **:課程說這是「快又夠用」的解法,後面章節會講為什麼會稍微跑出按鈕邊界。`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:(0,c.jsx)(t.code,{children:`position: absolute`})}),`:不然每顆粒子會佔流式版面把按鈕撐成俄羅斯方塊。`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsxs)(t.strong,{children:[(0,c.jsx)(t.code,{children:`forwards`}),` fill-mode`]}),`:淡出動畫結束後保持 `,(0,c.jsx)(t.code,{children:`opacity: 0`}),`,不然粒子會在動畫結束的瞬間「閃回」全不透明。`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{children:`Gotchas`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsxs)(t.strong,{children:[`不寫 `,(0,c.jsx)(t.code,{children:`forwards`}),` 的後果`]}),`:keyframe `,(0,c.jsx)(t.code,{children:`to { opacity: 0 }`}),` 只在動畫`,(0,c.jsx)(t.strong,{children:`進行中`}),`生效。動畫一結束就回到元素本身的 `,(0,c.jsx)(t.code,{children:`opacity`}),`(預設 1)。表現是粒子淡出後突然又亮回來。`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`替代解法`}),`:不寫 `,(0,c.jsx)(t.code,{children:`forwards`}),`,改在 `,(0,c.jsx)(t.code,{children:`.particle`}),` 上把 `,(0,c.jsx)(t.code,{children:`opacity`}),` 預設為 0。但這樣等於把終點狀態抄兩次,寧願 `,(0,c.jsx)(t.code,{children:`forwards`}),`。`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsxs)(t.strong,{children:[(0,c.jsx)(t.code,{children:`from`}),`/`,(0,c.jsx)(t.code,{children:`to`}),` vs `,(0,c.jsx)(t.code,{children:`0%`}),`/`,(0,c.jsx)(t.code,{children:`100%`})]}),`:兩者完全等價,只在需要中間關鍵點時才必須用百分比。`]}),`
`]})]})}function h(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(m,{...e})}):m(e)}function g(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{f as n,p as t};