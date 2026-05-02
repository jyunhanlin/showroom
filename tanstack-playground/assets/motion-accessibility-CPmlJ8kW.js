import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{i as n,n as r,r as i}from"./lib-BI_-S7V4.js";import{i as a}from"./canvas-BlMtLJge.js";import{R as o,z as s}from"./index-BR8eFJKL.js";var c=e(n(),1),l=i(),u=1e3,d=500,f=200,p=5,m=32,h=64,g=0;function _(){let[e,t]=(0,c.useState)(!1),[n,r]=(0,c.useState)(!1),[i,_]=(0,c.useState)([]),v=(0,c.useRef)([]);(0,c.useEffect)(()=>()=>{v.current.forEach(e=>window.clearTimeout(e))},[]);function y(){let e=!n;if(r(e),!e)return;let t=o(p).map(e=>{let{x:t,y:n}=a(360/p*e+s(-40,40,!0),s(m,h,!0));return{id:g++,x:t,y:n}}),i=t.map(e=>e.id);_(e=>[...e,...t]);let c=window.setTimeout(()=>{_(e=>e.filter(e=>!i.includes(e.id)))},u+f);v.current.push(c)}return(0,l.jsxs)(`div`,{className:`flex flex-col items-center gap-3`,"data-reduced":e?`true`:`false`,children:[(0,l.jsx)(`style`,{children:`
        @keyframes wham-a11y-fadeOut { to { opacity: 0 } }
        @keyframes wham-a11y-disperse { to { transform: translate(var(--x), var(--y)) } }
        .wham-a11y-particle {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 12px; height: 12px;
          border-radius: 50%;
          background: white;
          pointer-events: none;
          animation: wham-a11y-fadeOut ${u}ms forwards;
        }
        [data-reduced="false"] .wham-a11y-particle {
          animation:
            wham-a11y-fadeOut ${u}ms forwards,
            wham-a11y-disperse ${d}ms cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
        }
      `}),(0,l.jsxs)(`button`,{type:`button`,onClick:y,"aria-pressed":n,className:`relative flex h-16 w-16 items-center justify-center rounded-full bg-rose-500 transition-colors hover:bg-rose-600`,children:[(0,l.jsx)(`svg`,{viewBox:`0 0 24 24`,width:28,height:28,"aria-hidden":`true`,children:(0,l.jsx)(`path`,{d:`M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z`,stroke:`white`,strokeWidth:`2`,strokeLinejoin:`round`,fill:n?`white`:`none`})}),i.map(e=>(0,l.jsx)(`span`,{className:`wham-a11y-particle`,style:{"--x":`${e.x.toFixed(2)}px`,"--y":`${e.y.toFixed(2)}px`}},e.id)),(0,l.jsx)(`span`,{className:`sr-only`,children:`Like this post`})]}),(0,l.jsxs)(`label`,{className:`flex items-center gap-2 font-mono text-sm`,children:[(0,l.jsx)(`input`,{type:`checkbox`,checked:e,onChange:e=>t(e.target.checked)}),`模擬 prefers-reduced-motion: reduce`]}),(0,l.jsx)(`p`,{className:`text-xs text-gray-500`,children:`勾選後粒子只 fade,不再向外飛 — 仍有反饋,但沒有可能誘發暈眩的位移。`})]})}function v(){let[e,t]=(0,c.useState)(!0);return(0,l.jsxs)(`div`,{className:`flex flex-col items-center gap-3`,children:[(0,l.jsx)(`style`,{children:`
        @keyframes wham-a11y-blink {
          0%, 100% { opacity: 0.2 }
          50% { opacity: 1 }
        }
      `}),(0,l.jsx)(`div`,{className:`flex gap-2 rounded-md bg-slate-900 p-4`,children:o(8).map(t=>(0,l.jsx)(`div`,{className:`h-6 w-6 rounded-full`,style:{backgroundColor:`oklch(0.85 0.18 60)`,opacity:e?void 0:.6,animation:e?`wham-a11y-blink 1200ms ease-in-out ${t*150}ms infinite`:`none`}},t))}),(0,l.jsx)(`button`,{type:`button`,onClick:()=>t(e=>!e),className:`rounded bg-slate-800 px-3 py-1 font-mono text-xs text-white hover:bg-slate-700`,children:e?`pause`:`play`}),(0,l.jsx)(`p`,{className:`text-xs text-gray-500`,children:`八顆球都站在原地,只是依序閃爍。但大腦會把它讀成「光在跑」 — 對動暈症使用者一樣有風險。`})]})}var y=t({default:()=>S,frontmatter:()=>b}),b={title:`Motion Accessibility, prefers-reduced-motion`,sourceUrl:`https://courses.joshwcomeau.com/wham/01-particles/11-motion-accessibility`,lessonNumber:`01-particles/11-motion-accessibility`,order:18,summary:"`prefers-reduced-motion` 是 OS 層級的偏好,網站要主動尊重。建議用「motion-free by default」寫法 — 預設不動,只在 `no-preference` 時才開動畫,連舊瀏覽器都會默默退化成靜態。",tags:[`particles`,`accessibility`,`prefers-reduced-motion`,`a11y`]};function x(e){let t={code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,span:`span`,strong:`strong`,ul:`ul`,...r(),...e.components},{DemoFrame:n}=t;return n||C(`DemoFrame`,!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.h2,{children:`TL;DR`}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsx)(t.li,{children:`不少人對動畫敏感:vestibular disorder(前庭系統)、ADHD、自閉、癲癇、TBI 後遺症等。對他們來說過多動畫會引發暈眩、噁心、注意力崩塌。`}),`
`,(0,l.jsxs)(t.li,{children:[`OS 層有「Reduce motion」設定,瀏覽器透過 `,(0,l.jsx)(t.code,{children:`prefers-reduced-motion`}),` media query 暴露給網頁。`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`Motion-free by default`}),` 比「先動再關」更穩 — 舊瀏覽器看不懂 media query 會直接 ignore,使用者得到無動畫版本。`]}),`
`,(0,l.jsx)(t.li,{children:`「看起來在動」就要關 — 連 fade 排成的「跑馬燈光」也算。`}),`
`]}),`
`,(0,l.jsx)(n,{title:`like button — toggle reduced motion`,children:(0,l.jsx)(_,{})}),`
`,(0,l.jsx)(t.p,{children:`勾選 reduced 後,粒子只剩 fade-out,不會再向外飛。互動反饋還在,但沒有可能誘發暈眩的位移。`}),`
`,(0,l.jsx)(t.h2,{children:`Motion-free by default`}),`
`,(0,l.jsx)(l.Fragment,{children:(0,l.jsx)(t.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,l.jsxs)(t.code,{children:[(0,l.jsx)(t.span,{className:`line`,children:(0,l.jsx)(t.span,{style:{color:`#6A737D`},children:`/* ❌ 反過來寫 — 預設動,reduced 才靜 */`})}),`
`,(0,l.jsxs)(t.span,{className:`line`,children:[(0,l.jsx)(t.span,{style:{color:`#6F42C1`},children:`.particle`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,l.jsxs)(t.span,{className:`line`,children:[(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:`  animation`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`: disperse `}),(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:`500`}),(0,l.jsx)(t.span,{style:{color:`#D73A49`},children:`ms`}),(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:` forwards`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,l.jsx)(t.span,{className:`line`,children:(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`}`})}),`
`,(0,l.jsxs)(t.span,{className:`line`,children:[(0,l.jsx)(t.span,{style:{color:`#D73A49`},children:`@media`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:` (prefers-reduced-motion: reduce) {`})]}),`
`,(0,l.jsxs)(t.span,{className:`line`,children:[(0,l.jsx)(t.span,{style:{color:`#6F42C1`},children:`  .particle`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:` { `}),(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:`animation`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`: fadeOut `}),(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:`500`}),(0,l.jsx)(t.span,{style:{color:`#D73A49`},children:`ms`}),(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:` forwards`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:` }`})]}),`
`,(0,l.jsx)(t.span,{className:`line`,children:(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`}`})}),`
`,(0,l.jsx)(t.span,{className:`line`}),`
`,(0,l.jsx)(t.span,{className:`line`,children:(0,l.jsx)(t.span,{style:{color:`#6A737D`},children:`/* ✅ 預設靜,no-preference 才動 */`})}),`
`,(0,l.jsxs)(t.span,{className:`line`,children:[(0,l.jsx)(t.span,{style:{color:`#6F42C1`},children:`.particle`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,l.jsxs)(t.span,{className:`line`,children:[(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:`  animation`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`: fadeOut `}),(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:`500`}),(0,l.jsx)(t.span,{style:{color:`#D73A49`},children:`ms`}),(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:` forwards`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,l.jsx)(t.span,{className:`line`,children:(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`}`})}),`
`,(0,l.jsxs)(t.span,{className:`line`,children:[(0,l.jsx)(t.span,{style:{color:`#D73A49`},children:`@media`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:` (prefers-reduced-motion: no-preference) {`})]}),`
`,(0,l.jsxs)(t.span,{className:`line`,children:[(0,l.jsx)(t.span,{style:{color:`#6F42C1`},children:`  .particle`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,l.jsxs)(t.span,{className:`line`,children:[(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:`    animation`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`: disperse `}),(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:`500`}),(0,l.jsx)(t.span,{style:{color:`#D73A49`},children:`ms`}),(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:` forwards`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`, fadeOut `}),(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:`500`}),(0,l.jsx)(t.span,{style:{color:`#D73A49`},children:`ms`}),(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:` forwards`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`;`})]}),`
`,(0,l.jsx)(t.span,{className:`line`,children:(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`  }`})}),`
`,(0,l.jsx)(t.span,{className:`line`,children:(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`}`})})]})})}),`
`,(0,l.jsxs)(t.p,{children:[`第二種寫法的好處:`,(0,l.jsx)(t.code,{children:`@media (prefers-reduced-motion: no-preference)`}),` 在不支援這個 query 的舊瀏覽器(IE 之類)會被視為 invalid 整段 ignore,所以動畫就不會跑 — 偏向 a11y 友善的 fallback。`]}),`
`,(0,l.jsx)(t.h2,{children:`JS 偵測`}),`
`,(0,l.jsx)(l.Fragment,{children:(0,l.jsx)(t.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,l.jsxs)(t.code,{children:[(0,l.jsxs)(t.span,{className:`line`,children:[(0,l.jsx)(t.span,{style:{color:`#D73A49`},children:`function`}),(0,l.jsx)(t.span,{style:{color:`#6F42C1`},children:` isMotionEnabled`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`() {`})]}),`
`,(0,l.jsxs)(t.span,{className:`line`,children:[(0,l.jsx)(t.span,{style:{color:`#D73A49`},children:`  return`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:` window.`}),(0,l.jsx)(t.span,{style:{color:`#6F42C1`},children:`matchMedia`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`(`}),(0,l.jsx)(t.span,{style:{color:`#032F62`},children:`'(prefers-reduced-motion: no-preference)'`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`).matches;`})]}),`
`,(0,l.jsx)(t.span,{className:`line`,children:(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`}`})})]})})}),`
`,(0,l.jsxs)(t.p,{children:[`注意:這只回傳「呼叫當下」的快照。User 改設定後不會自動 update,要監聽 media query 的 change 事件。React 用 hook 包好(Josh 部落格的 `,(0,l.jsx)(t.code,{children:`usePrefersReducedMotion`}),`)。`]}),`
`,(0,l.jsx)(t.h2,{children:`「看起來在動」的陷阱`}),`
`,(0,l.jsx)(n,{title:`casino-light — 純 fade 但是大腦讀成移動`,children:(0,l.jsx)(v,{})}),`
`,(0,l.jsxs)(t.p,{children:[`技術上沒一個 element 在移動 — 八顆球都靜止,只是依序 fade。但對動暈使用者來說,這樣的「視覺光點移動」效果一樣會誘發症狀。`,(0,l.jsx)(t.strong,{children:`判斷基準是「看起來像不像動」,不是「技術上有沒有 transform/translate」`}),`。`]}),`
`,(0,l.jsx)(t.h2,{children:`該關掉什麼?`}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`要關`}),`:位移(translate)、scale、rotate、parallax、視差捲動、scaling carousel、跑馬燈光點。`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`可以保留`}),`:fade in/out、color transition、box-shadow blur 變化。`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`不確定就關掉`}),`:Josh 自己的策略 — 寧可 over-protect,沒人會抱怨「動畫太少」,但會有人因為動畫太多無法用網站。`]}),`
`]}),`
`,(0,l.jsx)(t.h2,{children:`Override 機制`}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.code,{children:`prefers-reduced-motion`}),` 是個全域開關,user 沒辦法針對特定網站例外。對「動畫是體驗核心」的網站(像課程首頁本身),提供一個 in-page toggle 讓使用者`,(0,l.jsx)(t.strong,{children:`手動開啟完整動畫`}),`比較禮貌:`]}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsx)(t.li,{children:`預設尊重 OS 設定。`}),`
`,(0,l.jsx)(t.li,{children:`提供「啟用完整動畫」按鈕(放 footer / 設定頁)。`}),`
`,(0,l.jsx)(t.li,{children:`不要做成第一次進站 popup,那會變成另一種 cookie banner 災難。`}),`
`]}),`
`,(0,l.jsx)(t.h2,{children:`Gotchas`}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsxs)(t.strong,{children:[`不要用 `,(0,l.jsx)(t.code,{children:`transition: none !important`})]}),`:這樣其他 third-party 想加 transition 也會被砍。讓 cascade 自己解決。`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`JS 的 matchMedia 要監聽 change`}),`:user 在系統設定改了之後,媒體查詢的 `,(0,l.jsx)(t.code,{children:`.matches`}),` 會更新,但你 cached 的值不會。寫 React hook 時記得 `,(0,l.jsx)(t.code,{children:`addEventListener('change', ...)`}),` 並在 unmount 清掉。`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`Chrome devtools 模擬要保持 devtools 開著`}),`:Cmd+Shift+P → "Emulate CSS prefers-reduced-motion: reduce"。一關 devtools 模擬就解除。`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`Safari 沒辦法在 devtools 模擬`}),` — 要實際去系統設定改。`]}),`
`]})]})}function S(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(x,{...e})}):x(e)}function C(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{y as n,b as t};