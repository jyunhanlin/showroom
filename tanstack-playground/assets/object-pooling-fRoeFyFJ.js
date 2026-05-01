import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{i as n,n as r,r as i}from"./lib-BI_-S7V4.js";import{i as a}from"./canvas-BlMtLJge.js";import{I as o,R as s}from"./index-iU65Cs_j.js";var c=e(n(),1),l=i(),u=[`oklch(0.85 0.15 60)`,`oklch(0.8 0.18 40)`,`oklch(0.75 0.18 30)`,`oklch(0.85 0.15 90)`],d=500,f=500,p=50;function m(){if(typeof document>`u`||document.getElementById(`wham-pool-styles`))return;let e=document.createElement(`style`);e.id=`wham-pool-styles`,e.textContent=`
    @keyframes wham-pool-fadeOut { to { opacity: 0 } }
    @keyframes wham-pool-rise {
      to { transform: translate(var(--x), var(--y)) }
    }
    .wham-pool-particle {
      position: absolute;
      bottom: 12px; left: 50%;
      width: 8px; height: 8px;
      border-radius: 50%;
      pointer-events: none;
      animation:
        wham-pool-fadeOut ${d}ms ${f}ms forwards,
        wham-pool-rise ${d+f}ms ease-out forwards;
    }
  `,document.head.appendChild(e)}function h(){let[e,t]=(0,c.useState)(!0),n=(0,c.useRef)(null),r=(0,c.useRef)(null),[i,h]=(0,c.useState)(0),[_,v]=(0,c.useState)(0),[y,b]=(0,c.useState)(0);return(0,c.useEffect)(()=>{m()},[]),(0,c.useEffect)(()=>{if(!e)return;let t=n.current,i=r.current;if(!t||!i)return;let c=[],l=0,m=0;function g(){let e=document.createElement(`span`);y(e),t.appendChild(e),l++,h(l),window.setTimeout(()=>e.remove(),d+f+200)}function _(){let e;c.length>0?e=c.pop():(e=document.createElement(`span`),m++,v(m)),y(e),i.appendChild(e),window.setTimeout(()=>{e.remove(),c.push(e),b(c.length)},d+f+200)}function y(e){e.className=`wham-pool-particle`,e.style.backgroundColor=o(u);let{x:t,y:n}=a(s(60,120,!0),s(45,80,!0));e.style.setProperty(`--x`,`${t.toFixed(2)}px`),e.style.setProperty(`--y`,`${-n.toFixed(2)}px`)}let x=window.setInterval(()=>{g(),_()},p);return()=>{window.clearInterval(x)}},[e]),(0,l.jsxs)(`div`,{className:`flex flex-col items-center gap-3`,children:[(0,l.jsxs)(`div`,{className:`flex flex-col gap-3 sm:flex-row`,children:[(0,l.jsx)(g,{title:`Plain (new node each spawn)`,hostRef:n,stat:`total created: ${i}`}),(0,l.jsx)(g,{title:`Pooled (reuse from objectPool)`,hostRef:r,stat:`created: ${_} · pool: ${y}`})]}),(0,l.jsx)(`button`,{type:`button`,onClick:()=>t(e=>!e),className:`rounded bg-slate-800 px-3 py-1 font-mono text-xs text-white hover:bg-slate-700`,children:e?`pause`:`resume`}),(0,l.jsx)(`p`,{className:`text-xs text-gray-500`,children:`左邊每次 spawn 都建新節點(GC 之後再回收);右邊重用 — pool 大小很快收斂到 ~20。`})]})}function g({title:e,hostRef:t,stat:n}){return(0,l.jsxs)(`div`,{className:`flex flex-col items-center gap-1`,children:[(0,l.jsx)(`p`,{className:`font-mono text-xs text-gray-700`,children:e}),(0,l.jsx)(`div`,{ref:t,className:`relative h-48 w-48 overflow-hidden rounded-md bg-slate-900`}),(0,l.jsx)(`p`,{className:`font-mono text-xs text-gray-500`,children:n})]})}var _=t({default:()=>b,frontmatter:()=>v}),v={title:`Object Pooling, recycling DOM nodes (and why not to)`,sourceUrl:`https://courses.joshwcomeau.com/wham/01-particles/08.01-object-pooling`,lessonNumber:`01-particles/08.01-object-pooling`,order:14,summary:"把用過的 DOM 節點存到 `objectPool` 重用,聽起來省 — 實測在現代瀏覽器幾乎沒差。GC 的工作做得比人腦想像好,object pooling 只是讓程式碼變脆弱。",tags:[`particles`,`performance`,`gc`,`dom`]};function y(e){let t={code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,span:`span`,strong:`strong`,ul:`ul`,...r(),...e.components},{DemoFrame:n}=t;return n||x(`DemoFrame`,!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.h2,{children:`TL;DR`}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsxs)(t.li,{children:[`每次粒子 fade 結束就 `,(0,l.jsx)(t.code,{children:`.remove()`}),`,DOM 節點被 detach,然後等 GC。`]}),`
`,(0,l.jsxs)(t.li,{children:[`想優化 → 把它們收集到 `,(0,l.jsx)(t.code,{children:`objectPool`}),` 陣列,下次要新粒子時先 `,(0,l.jsx)(t.code,{children:`pop()`}),` 出一個,沒有才 `,(0,l.jsx)(t.code,{children:`createElement`}),`。`]}),`
`,(0,l.jsxs)(t.li,{children:[`在現代 Chrome / Safari / Firefox 上實測:`,(0,l.jsx)(t.strong,{children:`沒差`}),`。GC 跟動畫是平行運作,根本不影響 frame rate。`]}),`
`,(0,l.jsx)(t.li,{children:`Pooling 的代價:程式碼變複雜、忘記清屬性會留下殘影、忘記清 pool 會卡住 GC 永久佔記憶體。`}),`
`]}),`
`,(0,l.jsx)(n,{title:`plain vs pooled — same animation, different lifecycle`,children:(0,l.jsx)(h,{})}),`
`,(0,l.jsxs)(t.p,{children:[`兩邊都每 50ms spawn 一顆。左邊每次都 `,(0,l.jsx)(t.code,{children:`createElement`}),`,右邊先看 `,(0,l.jsx)(t.code,{children:`objectPool`}),` 有沒有。Pooled 那邊的「created」會很快收斂到一個小數字(剛好夠飽和 pipeline),plain 那邊會一直增長(但其實 GC 也在背景默默清)。`]}),`
`,(0,l.jsx)(t.h2,{children:`實作核心`}),`
`,(0,l.jsx)(l.Fragment,{children:(0,l.jsx)(t.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,l.jsxs)(t.code,{children:[(0,l.jsxs)(t.span,{className:`line`,children:[(0,l.jsx)(t.span,{style:{color:`#D73A49`},children:`const`}),(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:` objectPool`}),(0,l.jsx)(t.span,{style:{color:`#D73A49`},children:`:`}),(0,l.jsx)(t.span,{style:{color:`#6F42C1`},children:` HTMLSpanElement`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`[] `}),(0,l.jsx)(t.span,{style:{color:`#D73A49`},children:`=`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:` [];`})]}),`
`,(0,l.jsx)(t.span,{className:`line`}),`
`,(0,l.jsxs)(t.span,{className:`line`,children:[(0,l.jsx)(t.span,{style:{color:`#D73A49`},children:`function`}),(0,l.jsx)(t.span,{style:{color:`#6F42C1`},children:` spawn`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`() {`})]}),`
`,(0,l.jsxs)(t.span,{className:`line`,children:[(0,l.jsx)(t.span,{style:{color:`#D73A49`},children:`  const`}),(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:` particle`}),(0,l.jsx)(t.span,{style:{color:`#D73A49`},children:` =`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:` objectPool.`}),(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:`length`}),(0,l.jsx)(t.span,{style:{color:`#D73A49`},children:` >`}),(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:` 0`}),(0,l.jsx)(t.span,{style:{color:`#D73A49`},children:` ?`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:` objectPool.`}),(0,l.jsx)(t.span,{style:{color:`#6F42C1`},children:`pop`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`()`}),(0,l.jsx)(t.span,{style:{color:`#D73A49`},children:`!`}),(0,l.jsx)(t.span,{style:{color:`#D73A49`},children:` :`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:` document.`}),(0,l.jsx)(t.span,{style:{color:`#6F42C1`},children:`createElement`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`(`}),(0,l.jsx)(t.span,{style:{color:`#032F62`},children:`'span'`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`);`})]}),`
`,(0,l.jsx)(t.span,{className:`line`,children:(0,l.jsx)(t.span,{style:{color:`#6A737D`},children:`  // ...設置 styles / animations`})}),`
`,(0,l.jsxs)(t.span,{className:`line`,children:[(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`  host.`}),(0,l.jsx)(t.span,{style:{color:`#6F42C1`},children:`appendChild`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`(particle);`})]}),`
`,(0,l.jsx)(t.span,{className:`line`}),`
`,(0,l.jsxs)(t.span,{className:`line`,children:[(0,l.jsx)(t.span,{style:{color:`#6F42C1`},children:`  setTimeout`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`(() `}),(0,l.jsx)(t.span,{style:{color:`#D73A49`},children:`=>`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,l.jsxs)(t.span,{className:`line`,children:[(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`    particle.`}),(0,l.jsx)(t.span,{style:{color:`#6F42C1`},children:`remove`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`();`})]}),`
`,(0,l.jsxs)(t.span,{className:`line`,children:[(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`    objectPool.`}),(0,l.jsx)(t.span,{style:{color:`#6F42C1`},children:`push`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`(particle);  `}),(0,l.jsx)(t.span,{style:{color:`#6A737D`},children:`// 收回 pool`})]}),`
`,(0,l.jsxs)(t.span,{className:`line`,children:[(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`  }, `}),(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:`FADE_DURATION`}),(0,l.jsx)(t.span,{style:{color:`#D73A49`},children:` +`}),(0,l.jsx)(t.span,{style:{color:`#005CC5`},children:` 200`}),(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`);`})]}),`
`,(0,l.jsx)(t.span,{className:`line`,children:(0,l.jsx)(t.span,{style:{color:`#24292E`},children:`}`})})]})})}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.code,{children:`element.remove()`}),` 不會立刻釋放節點 — 只是 detach。如果還有東西(`,(0,l.jsx)(t.code,{children:`objectPool`}),` 陣列)持有引用,GC 不會回收。下次 pop 出來重新 mount 就好。`]}),`
`,(0,l.jsx)(t.h2,{children:`為什麼 Comeau 不推薦`}),`
`,(0,l.jsxs)(t.ol,{children:[`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`效能優勢實測幾乎為零`}),`。Chrome 的 GC 很聰明,DOM node 數穩定在約 300 個就被自動清理,完全跟 pooling 一樣的水準,但不需要你寫一行管理程式碼。`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`狀態洩漏 bug 容易寫`}),`。例如忘記清舊的 `,(0,l.jsx)(t.code,{children:`--x`}),` / `,(0,l.jsx)(t.code,{children:`--y`}),` CSS 變數,粒子會閃現在上次的位置一瞬間。`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`block GC`}),`:如果 pool 是個全域陣列,動畫停了之後沒有清掉,所有節點會被永久保留。記憶體用量比沒 pooling 還慘。`]}),`
`]}),`
`,(0,l.jsx)(t.p,{children:`「物理上的塑膠垃圾才需要回收。DOM 節點是 intangible 的,只要 user experience 沒差,就不用犧牲程式碼簡潔度去『省』。」`}),`
`,(0,l.jsx)(t.h2,{children:`什麼時候 pooling 真的有用?`}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`每幀產生上千個粒子的 Canvas 場景`}),`:不再是 DOM 節點,而是 JS object。`,(0,l.jsx)(t.code,{children:`new`}),` 這種 hot path 上會有 allocation cost。`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`記憶體吃緊的環境`}),`(舊 mobile、嵌入式 webview):GC 觸發本身會吃 frame。`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`WebGL / instanced rendering`}),`:每個 vertex buffer slot 重用是基本功。`]}),`
`]}),`
`,(0,l.jsx)(t.p,{children:`DOM particle 99% 場景都不在這裡。先測,再決定要不要寫。`}),`
`,(0,l.jsx)(t.h2,{children:`Gotchas`}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`state leak`}),`:從 pool 撈出來的節點還帶著上次的 className / inline style / CSS 變數。每次重用都要 fully reset。`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`arrhythmia`}),`:pool 用 `,(0,l.jsx)(t.code,{children:`pop()`}),` 是 LIFO,如果你的設計依賴粒子在 DOM 中的順序(eg. `,(0,l.jsx)(t.code,{children:`prepend`}),` 讓新的在最上層),要注意撈出來的節點插入位置。`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`記得清空`}),`:動畫永久結束時 `,(0,l.jsx)(t.code,{children:`objectPool.length = 0`}),`,否則所有節點被永久 hold。`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`Premature optimization is the root of all evil`}),`:這話 Donald Knuth 說的,套在這裡剛好 — 先用最簡單的解法跑,有量到問題再來優化。`]}),`
`]})]})}function b(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(y,{...e})}):y(e)}function x(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{_ as n,v as t};