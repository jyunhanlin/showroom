import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{i as n,n as r,r as i}from"./lib-BI_-S7V4.js";import{i as a}from"./canvas-BlMtLJge.js";import{L as o,R as s}from"./index-iU65Cs_j.js";var c=e(n(),1),l=i(),u=150,d=150,f=1e3,p=500,m=500,h=200,g=300,_=10,v=720,y=400,b=`linear(0, 0.05 2%, 0.4 6%, 1 10%, 1.18 13%, 1.21 15%, 1.18 17%, 1.0 22%, 0.94 25%, 0.97 30%, 1.02 38%, 1.0 50%, 1)`,x=0;function S(){let[e,t]=(0,c.useState)(!1),[n,r]=(0,c.useState)(0),[i,S]=(0,c.useState)([]),C=(0,c.useRef)([]);(0,c.useEffect)(()=>()=>{C.current.forEach(e=>window.clearTimeout(e))},[]);function w(){let n=!e;if(t(n),r(e=>e+1),!n)return;let i=window.setTimeout(()=>{let e=o(_).map(e=>{let{x:t,y:n}=a(360/_*e+s(-30,30,!0),s(40,80,!0));return{id:x++,x:t,y:n,size:s(8,16,!0),baseColor:`hsl(${s(0,359)}deg 90% 75%)`,fadeDuration:s(f-p,f+p,!0),popDuration:s(m-h,m+h,!0),fadeDelay:s(0,g,!0),twinkleDuration:s(120,280,!0),twinkleAmount:s(.4,.8,!0)}}),t=e.map(e=>e.id),n=Math.max(...e.map(e=>e.fadeDuration+e.fadeDelay));S(t=>[...t,...e]);let r=window.setTimeout(()=>{S(e=>e.filter(e=>!t.includes(e.id)))},n+y);C.current.push(r)},d);C.current.push(i)}return(0,l.jsxs)(`div`,{className:`flex flex-col items-center gap-3`,children:[(0,l.jsx)(`style`,{children:`
        @keyframes wham-final-fadeOut { to { opacity: 0 } }
        @keyframes wham-final-twinkle { from { opacity: var(--twinkle-amount) } to { opacity: 1 } }
        @keyframes wham-final-disperse { to { transform: translate(var(--x), var(--y)) } }
        @keyframes wham-final-hueRotate { to { filter: hue-rotate(var(--hue-rotation)) } }
        @keyframes wham-final-fromShrunken { from { transform: scale(0) } }
        @keyframes wham-final-circleColorShift { from { background: hsl(350 100% 60%) } }
        @keyframes wham-final-fadeFromOpaque { from { opacity: 1 } }

        .wham-final-button { position: relative }
        .wham-final-pop-circle {
          position: absolute;
          inset: 0;
          background: hsl(270 100% 80%);
          border-radius: 50%;
          opacity: 0;
        }
        @media (prefers-reduced-motion: no-preference) {
          .wham-final-button[data-liked="true"][data-phase] .wham-final-pop-circle {
            animation:
              wham-final-fromShrunken ${u}ms,
              wham-final-circleColorShift ${u}ms,
              wham-final-fadeFromOpaque 300ms ${u}ms backwards;
          }
          .wham-final-button[data-liked="true"][data-phase] .wham-final-heart-shell {
            animation: wham-final-fromShrunken 1500ms ${u}ms backwards ${b};
          }
        }
        .wham-final-particle {
          position: absolute;
          inset: 0;
          margin: auto;
          border-radius: 50%;
          pointer-events: none;
          width: var(--size);
          height: var(--size);
          animation: wham-final-fadeOut var(--fade-duration) forwards;
        }
        @media (prefers-reduced-motion: no-preference) {
          .wham-final-particle {
            animation:
              wham-final-hueRotate var(--fade-duration) linear forwards,
              wham-final-twinkle var(--twinkle-duration) infinite alternate ease-in-out,
              wham-final-fadeOut var(--fade-duration) var(--fade-delay) forwards,
              wham-final-disperse var(--pop-duration) cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
          }
        }
      `}),(0,l.jsxs)(`button`,{type:`button`,onClick:w,"aria-pressed":e,"data-liked":e?`true`:`false`,"data-phase":n,className:`wham-final-button flex h-16 w-16 items-center justify-center rounded-full bg-rose-500 transition-colors hover:bg-rose-600`,children:[(0,l.jsx)(`span`,{className:`wham-final-pop-circle`}),(0,l.jsx)(`span`,{className:`wham-final-heart-shell flex items-center justify-center`,children:(0,l.jsx)(`svg`,{viewBox:`0 0 24 24`,width:28,height:28,"aria-hidden":`true`,children:(0,l.jsx)(`path`,{d:`M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z`,stroke:`white`,strokeWidth:`2`,strokeLinejoin:`round`,fill:e?`white`:`none`})})}),i.map(e=>(0,l.jsx)(`span`,{className:`wham-final-particle`,style:{backgroundColor:e.baseColor,"--x":`${e.x.toFixed(2)}px`,"--y":`${e.y.toFixed(2)}px`,"--size":`${e.size.toFixed(1)}px`,"--fade-duration":`${e.fadeDuration.toFixed(0)}ms`,"--pop-duration":`${e.popDuration.toFixed(0)}ms`,"--fade-delay":`${e.fadeDelay.toFixed(0)}ms`,"--twinkle-duration":`${e.twinkleDuration.toFixed(0)}ms`,"--twinkle-amount":e.twinkleAmount.toFixed(2),"--hue-rotation":`${v}deg`}},e.id)),(0,l.jsx)(`span`,{className:`sr-only`,children:`Like this post`})]}),(0,l.jsx)(`p`,{className:`text-xs text-gray-500`,children:`全套合體 — 三段 pop-circle + spring 愛心 + 10 顆 jittered 粒子,各自隨機 size / fade / twinkle / hue-rotate。`})]})}var C=t({default:()=>E,frontmatter:()=>w}),w={title:`Our Final Effect, every layer combined`,sourceUrl:`https://courses.joshwcomeau.com/wham/01-particles/13-final`,lessonNumber:`01-particles/13-final`,order:23,summary:`把整個 module 的招式全堆到一個 like 按鈕上 — pop-circle 三段 keyframe、heart spring (linear)、jittered polar 粒子、hue-rotate、twinkle、不同的隨機 duration、a11y 包外層。各層單獨看都不顯眼,堆起來才顯出 juice。`,tags:[`particles`,`animation`,`juice`,`recap`]};function T(e){let t={a:`a`,code:`code`,h2:`h2`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,...r(),...e.components},{DemoFrame:n}=t;return n||D(`DemoFrame`,!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.h2,{children:`TL;DR`}),`
`,(0,l.jsx)(t.p,{children:`最終版 = 前面每一篇的招式疊起來:`}),`
`,(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{children:`層`}),(0,l.jsx)(t.th,{children:`來源`})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`pop-circle 三段 keyframe`}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.a,{href:`./12.02-accessories`,children:`accessories`})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsxs)(t.td,{children:[`heart `,(0,l.jsx)(t.code,{children:`linear()`}),` spring`]}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.a,{href:`./12.02-accessories`,children:`accessories`})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Jittered polar dispersion`}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.a,{href:`./09-particle-distribution`,children:`particle-distribution`})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Linear interpolation 算 angle`}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.a,{href:`./10-linear-interpolation`,children:`linear-interpolation`})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`隨機 size / fade-duration / pop-duration / fade-delay`}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.a,{href:`./12.01-tweaks`,children:`tweaks`})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Twinkle keyframe stack`}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.a,{href:`./03-partial-keyframes`,children:`partial-keyframes`})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`hue-rotate(720deg)`}),` 走色相環`]}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.a,{href:`./12.03-colors`,children:`colors`})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`prefers-reduced-motion: no-preference`}),` 包外層`]}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.a,{href:`./11-motion-accessibility`,children:`motion-accessibility`})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`粒子延遲 ~150ms 才 spawn`}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.a,{href:`./12.02-accessories`,children:`accessories`})})]})]})]}),`
`,(0,l.jsx)(n,{title:`final like button — every layer combined`,children:(0,l.jsx)(S,{})}),`
`,(0,l.jsx)(t.h2,{children:`為什麼這樣堆能看?`}),`
`,(0,l.jsx)(t.p,{children:`每個 incremental 改動單看都很微妙 —「fade duration 變 random」、「色彩用 hue-rotate」、「粒子飛之前等個 150ms」。但是疊起來感受是 cumulative。`}),`
`,(0,l.jsxs)(t.p,{children:[`最寶貴的 takeaway 不是這顆按鈕本身,而是「`,(0,l.jsx)(t.strong,{children:`多個微小細節 > 一個大效果`}),`」這個直覺。`]}),`
`,(0,l.jsx)(t.h2,{children:`整理出來的 architecture`}),`
`,(0,l.jsx)(t.p,{children:`到這一篇為止,我們學到:`}),`
`,(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{children:`┌─────────────────────────────────────────────────┐
│  CSS 層                                          │
│  • Keyframes 用 CSS variables 抽 dynamic values │
│  • Partial keyframes 配合 inline style          │
│  • Stacked keyframes(twinkle × fadeOut)        │
│  • CSS filters(hue-rotate)當光學濾鏡           │
│  • linear() 模擬 spring                         │
│  • prefers-reduced-motion 包 a11y wrapper       │
├─────────────────────────────────────────────────┤
│  JS 層                                           │
│  • 粒子 state 在 React 裡管理                    │
│  • lodash range / random / sample               │
│  • polar coords + convertPolarToCartesian       │
│  • normalize 做 scale 對映                       │
│  • setTimeout 延遲 + 批次 cleanup                │
│  • CSS variables 當資料流                        │
└─────────────────────────────────────────────────┘
`})}),`
`,(0,l.jsx)(t.p,{children:`每一塊都不複雜。但組合起來,就成了 commercial-grade 的 micro-interaction。`}),`
`,(0,l.jsx)(t.h2,{children:`License 提醒`}),`
`,(0,l.jsxs)(t.p,{children:[`Comeau 自己在這篇明確說 — 課程裡這個 like-button 效果可以`,(0,l.jsx)(t.strong,{children:`自由用在自己的專案`}),`(包括商業),不需要 attribution。`]}),`
`,(0,l.jsxs)(t.p,{children:[`但他也提醒:`,(0,l.jsx)(t.strong,{children:`真正讓人記得的效果一定是改編過的`}),`。直接拷貝就跟前面講過的「generic confetti」一樣 — 看過就忘了。把這套 architecture 拿去做你產品的特色按鈕。`]}),`
`,(0,l.jsx)(t.h2,{children:`接下來`}),`
`,(0,l.jsxs)(t.p,{children:[`下一篇 `,(0,l.jsx)(t.code,{children:`13.01-particles-in-react`}),` 是課程的 vanilla JS 寫法搬到 React 的 refactor — 但我們本來就在 React,所以那篇對我們是「整理 hook 與 state model」而不是「換實作」。`]})]})}function E(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(T,{...e})}):T(e)}function D(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{w as n,C as t};