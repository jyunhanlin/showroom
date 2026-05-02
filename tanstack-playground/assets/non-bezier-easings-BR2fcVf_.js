import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{i as n,n as r,r as i}from"./lib-BI_-S7V4.js";var a=e(n(),1),o=i(),s=`oklch(0.9 0.3 164)`,c=`oklch(0.7 0.25 30)`;function l(){let[e,t]=(0,a.useState)(0);return(0,o.jsxs)(`div`,{className:`mx-auto flex w-fit flex-col items-center gap-3`,children:[(0,o.jsxs)(`div`,{className:`flex flex-col gap-3 rounded-md bg-slate-900 p-4`,style:{width:360},children:[(0,o.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,o.jsx)(`span`,{className:`w-16 font-mono text-xs text-gray-400`,children:`cubic-ease`}),(0,o.jsx)(`div`,{className:`relative h-6 flex-1 rounded bg-slate-800`,children:(0,o.jsx)(`div`,{className:`absolute top-0 h-6 w-6 rounded-full`,style:{background:s,animation:`wham-svg-ease-cubic 1.4s cubic-bezier(0.42, 0, 0.58, 1) forwards`}},`bezier-${e}`)})]}),(0,o.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,o.jsx)(`span`,{className:`w-16 font-mono text-xs text-gray-400`,children:`spring`}),(0,o.jsx)(`div`,{className:`relative h-6 flex-1 rounded bg-slate-800`,children:(0,o.jsx)(`div`,{className:`absolute top-0 h-6 w-6 rounded-full`,style:{background:c,animation:`wham-svg-ease-spring 1.4s linear(0, 0.04, 0.16 4%, 0.65, 1.04 17%, 1.16, 1.18, 1.13, 1.04, 0.99 32%, 0.96, 0.99, 1.01, 1.01 47%, 0.99, 1) forwards`}},`spring-${e}`)})]})]}),(0,o.jsx)(`button`,{type:`button`,onClick:()=>t(e=>e+1),className:`rounded bg-slate-200 px-3 py-1 font-mono text-sm hover:bg-slate-300`,children:`replay`}),(0,o.jsx)(`style`,{children:`
        @keyframes wham-svg-ease-cubic { from { left: 0 } to { left: calc(100% - 1.5rem) } }
        @keyframes wham-svg-ease-spring { from { left: 0 } to { left: calc(100% - 1.5rem) } }
      `})]})}var u=t({default:()=>p,frontmatter:()=>d}),d={title:`Non-Bezier Easings, where Bezier hits the wall`,sourceUrl:`https://courses.joshwcomeau.com/wham/02-svg/08-non-bezier-easings`,lessonNumber:`02-svg/08-non-bezier-easings`,order:8,summary:`Cubic Bezier 永遠單峰，做不到 spring 那種 overshoot + 衰減 oscillation。以前要 spring 必須上 JS library，現在 CSS 的 linear() 函式可以「baked」spring physics 進 timing function — 接下來幾節講這個。`,tags:[`svg`,`easing`,`spring`,`linear-function`]};function f(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,span:`span`,strong:`strong`,ul:`ul`,...r(),...e.components},{DemoFrame:n}=t;return n||m(`DemoFrame`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`TL;DR`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:`Bezier 是單峰：起點、(可能) 一個鼓包、終點，progress 永遠 0 → 1 不回頭。能模仿 ease-in / ease-out / ease-in-out / ease，但沒辦法做 overshoot + 衰減震盪。`}),`
`,(0,o.jsx)(t.li,{children:`Spring physics 模擬「彈簧連接 + 阻尼 + 重力」的數學模型，自然產生 overshoot 跟逐漸衰減的回彈。心跳放大、push notification 進場、彈跳清單這類動畫用 spring 才有「物理感」。`}),`
`,(0,o.jsx)(t.li,{children:`以前實作 spring：JS library（React Spring、Motion）逐 frame 算物理位置，效能比 CSS 差因為走 main thread。`}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsxs)(t.strong,{children:[`CSS `,(0,o.jsx)(t.code,{children:`linear()`}),` 函式（2023 開始所有主流瀏覽器支援，~92%）`]}),` 可以把 spring physics 算過的離散點「baked」進 timing function，CSS engine 自己 interpolate — 等於 spring physics 進到 compositor thread。`]}),`
`,(0,o.jsx)(t.li,{children:`這節是 module 7 (springs) 的 intro，後面 3 節 (Intro to Springs / linear() / Limitations) 才是 meat。`}),`
`]}),`
`,(0,o.jsx)(n,{title:`Cubic ease vs spring — 兩條都從左到右，差別在到達終點之後`,children:(0,o.jsx)(l,{})}),`
`,(0,o.jsx)(t.h2,{children:`Bezier 為何撞牆`}),`
`,(0,o.jsx)(t.p,{children:`CSS easing 預設值都是 cubic Bezier：`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`linear`}),` — 直線（其實就是 `,(0,o.jsx)(t.code,{children:`cubic-bezier(0, 0, 1, 1)`}),`）`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`ease`}),`、`,(0,o.jsx)(t.code,{children:`ease-in`}),`、`,(0,o.jsx)(t.code,{children:`ease-out`}),`、`,(0,o.jsx)(t.code,{children:`ease-in-out`}),` — 各種曲線形狀`]}),`
`,(0,o.jsxs)(t.li,{children:[`自訂 `,(0,o.jsx)(t.code,{children:`cubic-bezier(0.42, 0, 0.58, 1)`}),` — 4 個 control point 數字定義`]}),`
`]}),`
`,(0,o.jsxs)(t.p,{children:[`Bezier 的數學保證 progress `,(0,o.jsx)(t.strong,{children:`單調遞增`}),`（不回頭、不超過 1）。所以：`]}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:`✅ Ease-in（緩慢起步加速到底）`}),`
`,(0,o.jsx)(t.li,{children:`✅ Ease-out（快起步緩慢到底）`}),`
`,(0,o.jsx)(t.li,{children:`✅ Ease-in-out（兩端慢中間快）`}),`
`,(0,o.jsx)(t.li,{children:`❌ Overshoot 110% 再回到 100%`}),`
`,(0,o.jsx)(t.li,{children:`❌ 來回震盪幾次再停`}),`
`,(0,o.jsx)(t.li,{children:`❌ 一開始倒退再前進`}),`
`]}),`
`,(0,o.jsx)(t.p,{children:`最後三個都是 spring 的招牌行為，Bezier 不行。`}),`
`,(0,o.jsx)(t.h2,{children:`Spring 是什麼`}),`
`,(0,o.jsx)(t.p,{children:`物理上的彈簧連在固定點跟運動物體之間。鬆開時：`}),`
`,(0,o.jsxs)(t.ol,{children:[`
`,(0,o.jsx)(t.li,{children:`彈簧拉動物體到平衡點`}),`
`,(0,o.jsxs)(t.li,{children:[`物體`,(0,o.jsx)(t.strong,{children:`衝過`}),`平衡點（慣性）`]}),`
`,(0,o.jsx)(t.li,{children:`反向被拉回`}),`
`,(0,o.jsx)(t.li,{children:`阻尼吸收能量，震盪幅度逐漸縮小`}),`
`,(0,o.jsx)(t.li,{children:`最後停在平衡點`}),`
`]}),`
`,(0,o.jsx)(t.p,{children:`數學模型有三個參數：`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`stiffness`}),` (緊度) — 彈簧多硬。越硬震盪越快，但要更久衰減`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`damping`}),` (阻尼) — 環境多濃。低 damping = 真空，永遠震盪不停；高 damping = 糖漿，沒震盪直接到位`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`mass`}),` (質量) — 物體多重。Josh 說這個基本上不用調`]}),`
`]}),`
`,(0,o.jsxs)(t.p,{children:[`不需要 duration — 動畫多長`,(0,o.jsx)(t.strong,{children:`取決於物理`}),`（spring 多久才完全停下來）。`]}),`
`,(0,o.jsx)(t.h2,{children:`linear() 是新出口`}),`
`,(0,o.jsx)(o.Fragment,{children:(0,o.jsx)(t.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,o.jsxs)(t.code,{children:[(0,o.jsxs)(t.span,{className:`line`,children:[(0,o.jsx)(t.span,{style:{color:`#6F42C1`},children:`.elem`}),(0,o.jsx)(t.span,{style:{color:`#24292E`},children:` {`})]}),`
`,(0,o.jsxs)(t.span,{className:`line`,children:[(0,o.jsx)(t.span,{style:{color:`#005CC5`},children:`  transition`}),(0,o.jsx)(t.span,{style:{color:`#24292E`},children:`: transform `}),(0,o.jsx)(t.span,{style:{color:`#005CC5`},children:`500`}),(0,o.jsx)(t.span,{style:{color:`#D73A49`},children:`ms`}),(0,o.jsx)(t.span,{style:{color:`#005CC5`},children:` linear`}),(0,o.jsx)(t.span,{style:{color:`#24292E`},children:`(`}),(0,o.jsx)(t.span,{style:{color:`#005CC5`},children:`0`}),(0,o.jsx)(t.span,{style:{color:`#24292E`},children:`, `}),(0,o.jsx)(t.span,{style:{color:`#005CC5`},children:`0.1`}),(0,o.jsx)(t.span,{style:{color:`#24292E`},children:`, `}),(0,o.jsx)(t.span,{style:{color:`#005CC5`},children:`0.25`}),(0,o.jsx)(t.span,{style:{color:`#24292E`},children:`, `}),(0,o.jsx)(t.span,{style:{color:`#005CC5`},children:`0.5`}),(0,o.jsx)(t.span,{style:{color:`#24292E`},children:`, `}),(0,o.jsx)(t.span,{style:{color:`#005CC5`},children:`0.68`}),(0,o.jsx)(t.span,{style:{color:`#24292E`},children:`, `}),(0,o.jsx)(t.span,{style:{color:`#005CC5`},children:`0.8`}),(0,o.jsx)(t.span,{style:{color:`#24292E`},children:`, `}),(0,o.jsx)(t.span,{style:{color:`#005CC5`},children:`0.88`}),(0,o.jsx)(t.span,{style:{color:`#24292E`},children:`, `}),(0,o.jsx)(t.span,{style:{color:`#005CC5`},children:`0.94`}),(0,o.jsx)(t.span,{style:{color:`#24292E`},children:`, `}),(0,o.jsx)(t.span,{style:{color:`#005CC5`},children:`0.98`}),(0,o.jsx)(t.span,{style:{color:`#24292E`},children:`, `}),(0,o.jsx)(t.span,{style:{color:`#005CC5`},children:`0.995`}),(0,o.jsx)(t.span,{style:{color:`#24292E`},children:`, `}),(0,o.jsx)(t.span,{style:{color:`#005CC5`},children:`1`}),(0,o.jsx)(t.span,{style:{color:`#24292E`},children:`);`})]}),`
`,(0,o.jsx)(t.span,{className:`line`,children:(0,o.jsx)(t.span,{style:{color:`#24292E`},children:`}`})})]})})}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:`linear()`}),` 接 N 個 0~1 之間的數字（也可以超出，1.25 = overshoot 25%）。瀏覽器把它們等距放在 timeline 上，用直線連接 = polyline timing function。`]}),`
`,(0,o.jsx)(t.p,{children:`雖然每段是直線，但點夠密就近似任何曲線。Spring physics 的離散採樣丟進去就重現 spring。`}),`
`,(0,o.jsx)(t.p,{children:`兩個工具自動產生 spring 的 linear() 字串：`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.a,{href:`https://linear-easing-generator.netlify.app/`,children:`Linear Easing Generator`}),`（Jake Archibald + Adam Argyle）`]}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`https://easingwizard.com/`,children:`Easing Wizard`})}),`
`]}),`
`,(0,o.jsx)(t.p,{children:`接下來的 3 節：`}),`
`,(0,o.jsxs)(t.ol,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`Intro to Springs`}),` — stiffness / damping 直覺`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`linear() Function`}),` — syntax + 怎麼產生`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`Limitations`}),` — interrupt / time-based 的 tradeoff`]}),`
`]}),`
`,(0,o.jsx)(t.h2,{children:`Gotchas`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsxs)(t.strong,{children:[(0,o.jsx)(t.code,{children:`linear`}),` 跟 `,(0,o.jsx)(t.code,{children:`linear()`}),` 是兩個不同東西`]}),`：`,`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`linear`}),` (沒括弧) = `,(0,o.jsx)(t.code,{children:`cubic-bezier(0, 0, 1, 1)`}),` 的 alias，恆速`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`linear()`}),` (有括弧 + 引數) = polyline timing function，可以模擬任何曲線`]}),`
`]}),`
`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsxs)(t.strong,{children:[(0,o.jsx)(t.code,{children:`linear()`}),` 92% 支援（2026/04）`]}),` — 主流瀏覽器全通，少數舊版 Safari 沒有。Fallback 通常給 `,(0,o.jsx)(t.code,{children:`ease`}),` 即可，動畫退化成普通 cubic。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`bezier 沒過時`}),` — ease-in / ease-out 這類「不需要 overshoot」的場合 bezier 仍然合適，比 linear() 字串簡潔。Spring 是補位、不是取代。`]}),`
`]})]})}function p(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(f,{...e})}):f(e)}function m(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as n,d as t};