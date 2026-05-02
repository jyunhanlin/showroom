import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{i as n,n as r,r as i}from"./lib-BI_-S7V4.js";import{i as a}from"./canvas-BlMtLJge.js";import{R as o,z as s}from"./index-DJbKarAK.js";var c=e(n(),1),l=i(),u=150,d=150,f=1e3,p=500,m=400,h=8,g=`linear(0, 0.05 2%, 0.4 6%, 1 10%, 1.18 13%, 1.21 15%, 1.18 17%, 1.0 22%, 0.94 25%, 0.97 30%, 1.02 38%, 1.0 50%, 1)`,_=0;function v(){let[e,t]=(0,c.useState)(!1),[n,r]=(0,c.useState)(0),[i,v]=(0,c.useState)([]),y=(0,c.useRef)([]);(0,c.useEffect)(()=>()=>{y.current.forEach(e=>window.clearTimeout(e))},[]);function b(){let n=!e;if(t(n),r(e=>e+1),!n)return;let i=window.setTimeout(()=>{let e=o(h).map(e=>{let{x:t,y:n}=a(360/h*e+s(-25,25,!0),s(40,70,!0));return{id:_++,x:t,y:n,size:s(8,14,!0)}}),t=e.map(e=>e.id);v(t=>[...t,...e]);let n=window.setTimeout(()=>{v(e=>e.filter(e=>!t.includes(e.id)))},f+m);y.current.push(n)},d);y.current.push(i)}return(0,l.jsxs)(`div`,{className:`flex flex-col items-center gap-3`,children:[(0,l.jsx)(`style`,{children:`
        @keyframes wham-acc-fromShrunken { from { transform: scale(0) } }
        @keyframes wham-acc-circleColorShift { from { background: hsl(350 100% 60%) } }
        @keyframes wham-acc-fadeFromOpaque { from { opacity: 1 } }
        @keyframes wham-acc-fadeOut { to { opacity: 0 } }
        @keyframes wham-acc-disperse { to { transform: translate(var(--x), var(--y)) } }

        .wham-acc-button { position: relative }
        .wham-acc-pop-circle {
          position: absolute;
          inset: 0;
          background: hsl(270 100% 80%);
          border-radius: 50%;
          opacity: 0;
        }
        .wham-acc-button[data-liked="true"][data-phase] .wham-acc-pop-circle {
          animation:
            wham-acc-fromShrunken ${u}ms,
            wham-acc-circleColorShift ${u}ms,
            wham-acc-fadeFromOpaque 300ms ${u}ms backwards;
        }
        .wham-acc-button[data-liked="true"][data-phase] .wham-acc-heart-shell {
          animation: wham-acc-fromShrunken 1500ms ${u}ms backwards ${g};
        }
        .wham-acc-particle {
          position: absolute;
          inset: 0;
          margin: auto;
          border-radius: 50%;
          background: white;
          pointer-events: none;
          width: var(--size);
          height: var(--size);
          animation:
            wham-acc-fadeOut ${f}ms forwards,
            wham-acc-disperse ${p}ms cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
        }
      `}),(0,l.jsxs)(`button`,{type:`button`,onClick:b,"aria-pressed":e,"data-liked":e?`true`:`false`,"data-phase":n,className:`wham-acc-button flex h-16 w-16 items-center justify-center rounded-full bg-rose-500 transition-colors hover:bg-rose-600`,children:[(0,l.jsx)(`span`,{className:`wham-acc-pop-circle`}),(0,l.jsx)(`span`,{className:`wham-acc-heart-shell flex items-center justify-center`,children:(0,l.jsx)(`svg`,{viewBox:`0 0 24 24`,width:28,height:28,"aria-hidden":`true`,children:(0,l.jsx)(`path`,{d:`M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z`,stroke:`white`,strokeWidth:`2`,strokeLinejoin:`round`,fill:e?`white`:`none`})})}),i.map(e=>(0,l.jsx)(`span`,{className:`wham-acc-particle`,style:{"--x":`${e.x.toFixed(2)}px`,"--y":`${e.y.toFixed(2)}px`,"--size":`${e.size.toFixed(1)}px`}},e.id)),(0,l.jsx)(`span`,{className:`sr-only`,children:`Like this post`})]}),(0,l.jsxs)(`p`,{className:`text-xs text-gray-500`,children:["三層動畫疊起來:`pop-circle` 先彈出 → `heart` 用 spring 回彈 → 粒子延遲 ",d,`ms 才 spawn。`]})]})}var y=t({default:()=>S,frontmatter:()=>b}),b={title:`Accessories, popping circle and swelling heart`,sourceUrl:`https://courses.joshwcomeau.com/wham/01-particles/12.02-accessories`,lessonNumber:`01-particles/12.02-accessories`,order:21,summary:"只有粒子還是不夠 — Twitter 那顆 Like 按鈕還有「彩色圓圈炸開」與「愛心彈跳放大」兩層配件。三條 partial keyframe 各管一個屬性、用 `linear()` 模擬 spring 是兩個關鍵技巧。",tags:[`particles`,`animation`,`juice`,`linear-easing`,`spring`]};function x(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,span:`span`,strong:`strong`,ul:`ul`,...r(),...e.components},{DemoFrame:n}=t;return n||C(`DemoFrame`,!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.h2,{children:`TL;DR`}),`
`,(0,l.jsx)(t.p,{children:`Twitter 經典 Like 按鈕的細節不只粒子。多兩層:`}),`
`,(0,l.jsxs)(t.ol,{children:[`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`Popping circle`}),` — 紅色圓圈快速放大、變淺紫、淡出。三段都不同 timing,用三條 partial keyframe 各自疊。`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`Swelling heart`}),` — 愛心從 0 彈跳放大。用 CSS `,(0,l.jsx)(t.code,{children:`linear()`}),` 做 spring,Bezier 表達不出。`]}),`
`]}),`
`,(0,l.jsx)(t.p,{children:`加上既有粒子 → spawn 要延遲 ~150ms,等圈圈先佔位。`}),`
`,(0,l.jsx)(n,{title:`like button — pop-circle + spring heart + particles`,children:(0,l.jsx)(v,{})}),`
`,(0,l.jsx)(t.h2,{children:`Popping circle 三條 keyframe`}),`
`,(0,l.jsxs)(t.p,{children:[`最直觀的寫法是 `,(0,l.jsx)(t.code,{children:`from { scale: 0; bg: red; opacity: 1 }`}),` — 但所有屬性綁在同一條 timeline,慢的拉慢、快的拉快。實際看起來很死。`]}),`
`,(0,l.jsx)(t.p,{children:`拆成三條 partial keyframe,各自有自己的 duration 和 delay:`}),`
`,(0,l.jsx)(l.Fragment,{children:(0,l.jsx)(t.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,l.jsxs)(t.code,{children:[(0,l.jsxs)(t.span,{className:`line`,children:[(0,l.jsx)(t.span,{style:{color:`#D73A49`},children:`@keyframes`}),(0,l.jsx)(t.span,{style:{color:`#E36209`},children:` fromShrunken`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`      { `}),(0,l.jsx)(t.span,{style:{color:`#6F42C1`},children:`from`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:` { `}),(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:`transform`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`: `}),(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:`scale`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`(`}),(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:`0`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`) } }`})]}),`
`,(0,l.jsxs)(t.span,{className:`line`,children:[(0,l.jsx)(t.span,{style:{color:`#D73A49`},children:`@keyframes`}),(0,l.jsx)(t.span,{style:{color:`#E36209`},children:` circleColorShift`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`  { `}),(0,l.jsx)(t.span,{style:{color:`#6F42C1`},children:`from`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:` { `}),(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:`background`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`: `}),(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:`hsl`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`(`}),(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:`350`}),(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:` 100`}),(0,l.jsx)(t.span,{style:{color:`#D73A49`},children:`%`}),(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:` 60`}),(0,l.jsx)(t.span,{style:{color:`#D73A49`},children:`%`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`) } }`})]}),`
`,(0,l.jsxs)(t.span,{className:`line`,children:[(0,l.jsx)(t.span,{style:{color:`#D73A49`},children:`@keyframes`}),(0,l.jsx)(t.span,{style:{color:`#E36209`},children:` fadeFromOpaque`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`    { `}),(0,l.jsx)(t.span,{style:{color:`#6F42C1`},children:`from`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:` { `}),(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:`opacity`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`: `}),(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:`1`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:` } }`})]}),`
`,(0,l.jsx)(t.span,{className:`line`}),`
`,(0,l.jsxs)(t.span,{className:`line`,children:[(0,l.jsx)(t.span,{style:{color:`#6F42C1`},children:`.popCircle.liked`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,l.jsxs)(t.span,{className:`line`,children:[(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:`  animation`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`:`})]}),`
`,(0,l.jsxs)(t.span,{className:`line`,children:[(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`    fromShrunken     `}),(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:`150`}),(0,l.jsx)(t.span,{style:{color:`#D73A49`},children:`ms`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`,`})]}),`
`,(0,l.jsxs)(t.span,{className:`line`,children:[(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`    circleColorShift `}),(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:`150`}),(0,l.jsx)(t.span,{style:{color:`#D73A49`},children:`ms`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`,`})]}),`
`,(0,l.jsxs)(t.span,{className:`line`,children:[(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`    fadeFromOpaque   `}),(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:`300`}),(0,l.jsx)(t.span,{style:{color:`#D73A49`},children:`ms`}),(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:` 150`}),(0,l.jsx)(t.span,{style:{color:`#D73A49`},children:`ms`}),(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:` backwards`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,l.jsx)(t.span,{className:`line`,children:(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`}`})})]})})}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsx)(t.li,{children:`大小變化 + 顏色變化 — 同步發生 150ms 內。`}),`
`,(0,l.jsxs)(t.li,{children:[`淡出在 150ms `,(0,l.jsx)(t.strong,{children:`之後`}),`才開始,跑 300ms。`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.code,{children:`backwards`}),` fill mode 確保 fade 還沒開始前 opacity 維持 1。`]}),`
`]}),`
`,(0,l.jsxs)(t.p,{children:[`Partial keyframe 的好處再次體現:`,(0,l.jsx)(t.code,{children:`fadeFromOpaque`}),` 沒寫終點 → 結束後回到 element 預設的 `,(0,l.jsx)(t.code,{children:`opacity: 0`}),`。`]}),`
`,(0,l.jsx)(t.h2,{children:`Heart spring 用 linear()`}),`
`,(0,l.jsxs)(t.p,{children:[`Bezier 沒辦法表達「過頭再回來再過頭」的彈簧。CSS 4 的 `,(0,l.jsx)(t.code,{children:`linear()`}),` 函式可以用一連串點來描述任意曲線:`]}),`
`,(0,l.jsx)(l.Fragment,{children:(0,l.jsx)(t.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,l.jsxs)(t.code,{children:[(0,l.jsx)(t.span,{className:`line`,children:(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`animation: fromShrunken 1500ms 150ms backwards`})}),`
`,(0,l.jsxs)(t.span,{className:`line`,children:[(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`  linear(0, 0`}),(0,l.jsx)(t.span,{style:{color:`#6F42C1`},children:`.05`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:` 2%, 0`}),(0,l.jsx)(t.span,{style:{color:`#6F42C1`},children:`.4`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:` 6%, 1 10%, 1`}),(0,l.jsx)(t.span,{style:{color:`#6F42C1`},children:`.18`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:` 13%, 1`}),(0,l.jsx)(t.span,{style:{color:`#6F42C1`},children:`.21`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:` 15%, 1`}),(0,l.jsx)(t.span,{style:{color:`#6F42C1`},children:`.18`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:` 17%, 1`}),(0,l.jsx)(t.span,{style:{color:`#6F42C1`},children:`.0`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:` 22%, 0`}),(0,l.jsx)(t.span,{style:{color:`#6F42C1`},children:`.94`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:` 25%, 0`}),(0,l.jsx)(t.span,{style:{color:`#6F42C1`},children:`.97`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:` 30%, 1`}),(0,l.jsx)(t.span,{style:{color:`#6F42C1`},children:`.02`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:` 38%, 1`}),(0,l.jsx)(t.span,{style:{color:`#6F42C1`},children:`.0`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:` 50%, 1);`})]})]})})}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsxs)(t.li,{children:[`數字是 `,(0,l.jsx)(t.code,{children:`(progress, time%)`}),` 對 — 在某個 time 達到某個 progress。`]}),`
`,(0,l.jsxs)(t.li,{children:[`看到那些 1.21、1.18、0.94 — 過頭(`,(0,l.jsx)(t.code,{children:`>1`}),`)然後回彈(`,(0,l.jsx)(t.code,{children:`<1`}),`),那就是彈簧的本質。`]}),`
`,(0,l.jsxs)(t.li,{children:[`直接手寫太累,用 `,(0,l.jsx)(t.a,{href:`https://easingwizard.com`,children:`Easing Wizard`}),` 拉滑桿吐 string。`]}),`
`]}),`
`,(0,l.jsxs)(t.p,{children:[`下一章 (`,(0,l.jsx)(t.code,{children:`08.01-intro-to-spring-physics`}),`) 會用真正的 spring 物理 + JS 取代 `,(0,l.jsx)(t.code,{children:`linear()`}),`,但靜態 spring 很多場景 `,(0,l.jsx)(t.code,{children:`linear()`}),` 已經夠用。`]}),`
`,(0,l.jsx)(t.h2,{children:`粒子延遲 spawn`}),`
`,(0,l.jsx)(t.p,{children:`粒子應該等圓圈彈出後再出來。最簡單:`}),`
`,(0,l.jsx)(l.Fragment,{children:(0,l.jsx)(t.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,l.jsxs)(t.code,{children:[(0,l.jsxs)(t.span,{className:`line`,children:[(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`window.`}),(0,l.jsx)(t.span,{style:{color:`#6F42C1`},children:`setTimeout`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`(() `}),(0,l.jsx)(t.span,{style:{color:`#D73A49`},children:`=>`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,l.jsxs)(t.span,{className:`line`,children:[(0,l.jsx)(t.span,{style:{color:`#6F42C1`},children:`  spawnParticles`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`();`})]}),`
`,(0,l.jsxs)(t.span,{className:`line`,children:[(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`}, `}),(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:`PARTICLE_DELAY`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`);`})]})]})})}),`
`,(0,l.jsxs)(t.p,{children:[`替代方案是聽 `,(0,l.jsx)(t.code,{children:`animationend`}),` 事件,但 Josh 不愛 — 因為:`]}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsx)(t.li,{children:`多條 keyframe 同時跑,event 觸發兩次。`}),`
`,(0,l.jsx)(t.li,{children:`偶爾不觸發。`}),`
`,(0,l.jsx)(t.li,{children:`「想要稍微快一點 / 慢一點」沒辦法調。`}),`
`]}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.code,{children:`setTimeout`}),` 反而讓不同步是 feature,不是 bug。`]}),`
`,(0,l.jsx)(t.h2,{children:`Gotchas`}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsxs)(t.strong,{children:[(0,l.jsx)(t.code,{children:`backwards`}),` fill-mode 是關鍵`]}),`:沒寫的話,delay 期間元素會用「最終」狀態(`,(0,l.jsx)(t.code,{children:`scale: 1`}),`)而不是「初始」狀態(`,(0,l.jsx)(t.code,{children:`scale: 0`}),`),你會看到愛心瞬間跳出再縮回 0 再彈回 1。`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsxs)(t.strong,{children:[(0,l.jsx)(t.code,{children:`linear()`}),` 瀏覽器支援`]}),` (Chrome 113+ / Safari 17.4+):約 90% 用戶能跑;舊瀏覽器掉回到瀏覽器預設 timing function(等同沒 spring)。`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`疊到爆`}),`:popping circle 三條 + heart 一條 + 粒子兩條(fade + disperse) + twinkle = 一個按鈕 7 條 keyframe。Josh 自己也說「things are getting gnarly」 — 把 keyframe 集中放一處、用 CSS 變數抽 duration 是最低限度的整理。`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`跟 React state 一起用`}),`:每次點擊要強制重啟 keyframe — 用 `,(0,l.jsx)(t.code,{children:`key`}),` prop 或 `,(0,l.jsx)(t.code,{children:`data-phase`}),` 之類的 counter,讓 element re-mount / re-trigger。`]}),`
`]})]})}function S(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(x,{...e})}):x(e)}function C(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{b as n,y as t};