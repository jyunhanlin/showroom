import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{i as n,n as r,r as i}from"./lib-BI_-S7V4.js";import{x as a}from"./index-B6UJ1bOH.js";var o=e(n(),1),s=i(),c=`oklch(0.9 0.3 164)`;function l(){let e=(0,o.useRef)(null),[t,n]=(0,o.useState)(200),[r,i]=(0,o.useState)(20),[l,u]=(0,o.useState)(`left`);return(0,s.jsxs)(`div`,{className:`mx-auto flex w-fit flex-col items-center gap-3`,children:[(0,s.jsx)(`div`,{className:`rounded-md bg-slate-900 p-4`,style:{width:320},children:(0,s.jsx)(`div`,{className:`relative h-12 rounded bg-slate-800`,children:(0,s.jsx)(`div`,{ref:e,className:`absolute top-1.5 h-9 w-9 rounded-full`,style:{background:c,left:6}})})}),(0,s.jsx)(`button`,{type:`button`,onClick:()=>{let n=e.current;if(!n)return;let i=l===`left`?`right`:`left`;u(i),a(n,{x:i===`right`?240:0},{type:`spring`,stiffness:t,damping:r,mass:1})},className:`rounded bg-slate-200 px-3 py-1 font-mono text-sm hover:bg-slate-300`,children:`toggle position`}),(0,s.jsxs)(`div`,{className:`grid grid-cols-1 gap-2 font-mono text-sm`,children:[(0,s.jsxs)(`label`,{className:`flex items-center gap-2`,children:[(0,s.jsxs)(`span`,{className:`w-28`,children:[`stiffness: `,t]}),(0,s.jsx)(`input`,{type:`range`,min:20,max:1e3,value:t,onChange:e=>n(Number(e.target.value))})]}),(0,s.jsxs)(`label`,{className:`flex items-center gap-2`,children:[(0,s.jsxs)(`span`,{className:`w-28`,children:[`damping: `,r]}),(0,s.jsx)(`input`,{type:`range`,min:0,max:50,value:r,onChange:e=>i(Number(e.target.value))})]})]})]})}var u=t({default:()=>p,frontmatter:()=>d}),d={title:`Intro to Springs, stiffness × damping × no duration`,sourceUrl:`https://courses.joshwcomeau.com/wham/02-svg/08.01-intro-to-spring-physics`,lessonNumber:`02-svg/08.01-intro-to-spring-physics`,order:17,summary:`Spring 三個 knob：stiffness（彈簧多緊，影響速度跟震盪頻率）、damping（環境多黏，影響衰減快慢）、mass（物體質量，幾乎不用調）。沒有 duration — 動畫多長是物理結果。tweak 步驟：先用 damping=20 中性值調 stiffness 對速度，再調 damping 對 vibe。`,tags:[`svg`,`spring`,`physics`,`stiffness`,`damping`]};function f(e){let t={code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,span:`span`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components},{DemoFrame:n}=t;return n||m(`DemoFrame`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`TL;DR`}),`
`,(0,s.jsxs)(t.ul,{children:[`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:`Stiffness`}),` (= tension)：彈簧多緊。`,(0,s.jsx)(t.strong,{children:`高 stiffness → 震盪頻率快 + 過衝大`}),`；低 stiffness → 平滑 glide 沒震盪。`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:`Damping`}),` (= friction)：環境多黏。`,(0,s.jsx)(t.strong,{children:`Damping=0 → 真空 → 永遠震盪`}),`；高 damping → 糖漿，幾乎沒過衝直接到位。`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:`Mass`}),`：物體質量。Josh 說「我從不調這個」 — 1 永遠 ok，調 stiffness/damping 比較直觀。`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:`沒有 duration`}),`：spring 動畫多長是物理結果，spring settle 下來才結束。Time-based timing function (CSS transition `,(0,s.jsx)(t.code,{children:`1000ms`}),`) 跟 spring 概念衝突，linear() 那節再講怎麼兜。`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:`Tweak 流程`}),`：先把 damping 設 20（中性）→ 調 stiffness 對「速度感」→ 再調 damping 對「震盪 vibe」。`]}),`
`]}),`
`,(0,s.jsx)(n,{title:`Spring playground — toggle position 看 stiffness × damping 的影響`,children:(0,s.jsx)(l,{})}),`
`,(0,s.jsx)(t.h2,{children:`Stiffness — 緊度 = 速度 + 震盪`}),`
`,(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(t.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,s.jsx)(t.code,{children:(0,s.jsxs)(t.span,{className:`line`,children:[(0,s.jsx)(t.span,{style:{color:`#6F42C1`},children:`animate`}),(0,s.jsx)(t.span,{style:{color:`#24292E`},children:`(elem, { x: `}),(0,s.jsx)(t.span,{style:{color:`#005CC5`},children:`240`}),(0,s.jsx)(t.span,{style:{color:`#24292E`},children:` }, { type: `}),(0,s.jsx)(t.span,{style:{color:`#032F62`},children:`'spring'`}),(0,s.jsx)(t.span,{style:{color:`#24292E`},children:`, stiffness: `}),(0,s.jsx)(t.span,{style:{color:`#005CC5`},children:`800`}),(0,s.jsx)(t.span,{style:{color:`#24292E`},children:`, damping: `}),(0,s.jsx)(t.span,{style:{color:`#005CC5`},children:`20`}),(0,s.jsx)(t.span,{style:{color:`#24292E`},children:` });`})]})})})}),`
`,(0,s.jsxs)(t.p,{children:[`物理直覺：彈簧越硬，儲存的能量越多。物體被快速拉到平衡點 → `,(0,s.jsx)(t.strong,{children:`能量太多停不下來`}),` → 過衝 → 反彈 → 震盪幾下耗能 → 才停。`]}),`
`,(0,s.jsxs)(t.ul,{children:[`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:`stiffness: 50`}),` — 鬆軟、慢速、幾乎不震盪 → 像 ease-out 但更平順`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:`stiffness: 200`}),`（預設）— 中等速度，可能輕微 overshoot`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:`stiffness: 800`}),` — 緊硬、超快、明顯彈跳 → boingy-boingy`]}),`
`]}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:`關鍵 insight`}),`：低 stiffness 出來的動畫`,(0,s.jsx)(t.strong,{children:`很像精心調過的 cubic-bezier ease`}),`，但設計上更輕鬆 — Bezier 要找對 4 個 control point 才好看，spring 設個 50 / 20 就出來。`]}),`
`,(0,s.jsx)(t.h2,{children:`Damping — 阻尼 = 衰減`}),`
`,(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(t.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,s.jsx)(t.code,{children:(0,s.jsxs)(t.span,{className:`line`,children:[(0,s.jsx)(t.span,{style:{color:`#6F42C1`},children:`animate`}),(0,s.jsx)(t.span,{style:{color:`#24292E`},children:`(elem, { x: `}),(0,s.jsx)(t.span,{style:{color:`#005CC5`},children:`240`}),(0,s.jsx)(t.span,{style:{color:`#24292E`},children:` }, { type: `}),(0,s.jsx)(t.span,{style:{color:`#032F62`},children:`'spring'`}),(0,s.jsx)(t.span,{style:{color:`#24292E`},children:`, stiffness: `}),(0,s.jsx)(t.span,{style:{color:`#005CC5`},children:`200`}),(0,s.jsx)(t.span,{style:{color:`#24292E`},children:`, damping: `}),(0,s.jsx)(t.span,{style:{color:`#005CC5`},children:`0`}),(0,s.jsx)(t.span,{style:{color:`#24292E`},children:` });`})]})})})}),`
`,(0,s.jsxs)(t.p,{children:[`把 damping 設 0：物體在真空中，沒摩擦力。Spring 把物體拉到平衡點，物體衝過去→反彈→沒能量損失→繼續震盪→`,(0,s.jsx)(t.strong,{children:`永遠不停`}),`。`]}),`
`,(0,s.jsx)(t.p,{children:`(實作上 motion library 通常還是會在某個振幅閾值切斷動畫，但理論上是無限。)`}),`
`,(0,s.jsxs)(t.ul,{children:[`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:`damping: 0`}),` — 永動機（不實用）`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:`damping: 5`}),` — 大量震盪，緩慢衰減`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:`damping: 20`}),`（預設）— 1-2 次小過衝後 settle`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:`damping: 50`}),` — 幾乎沒過衝，平滑到位`]}),`
`]}),`
`,(0,s.jsx)(t.h2,{children:`Mass 不用調`}),`
`,(0,s.jsx)(t.p,{children:`Mass 影響「同 stiffness 下物體加速多快」 — 但這跟 stiffness 變化等價，調 stiffness 涵蓋同樣 design space。`}),`
`,(0,s.jsxs)(t.p,{children:[`Josh 提到 mass 純粹是 completeness（library 都有這 param）。`,(0,s.jsx)(t.strong,{children:`保持 mass=1 一輩子都不會踩到坑`}),`。`]}),`
`,(0,s.jsx)(t.h2,{children:`沒有 duration 的反直覺`}),`
`,(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(t.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,s.jsxs)(t.code,{children:[(0,s.jsx)(t.span,{className:`line`,children:(0,s.jsx)(t.span,{style:{color:`#6A737D`},children:`/* CSS transition — 必須有 duration */`})}),`
`,(0,s.jsxs)(t.span,{className:`line`,children:[(0,s.jsx)(t.span,{style:{color:`#6F42C1`},children:`.elem`}),(0,s.jsx)(t.span,{style:{color:`#24292E`},children:` { `}),(0,s.jsx)(t.span,{style:{color:`#005CC5`},children:`transition`}),(0,s.jsx)(t.span,{style:{color:`#24292E`},children:`: transform `}),(0,s.jsx)(t.span,{style:{color:`#005CC5`},children:`500`}),(0,s.jsx)(t.span,{style:{color:`#D73A49`},children:`ms`}),(0,s.jsx)(t.span,{style:{color:`#005CC5`},children:` ease-out`}),(0,s.jsx)(t.span,{style:{color:`#24292E`},children:`; }`})]}),`
`,(0,s.jsx)(t.span,{className:`line`}),`
`,(0,s.jsx)(t.span,{className:`line`,children:(0,s.jsx)(t.span,{style:{color:`#6A737D`},children:`/* Spring — 自然發生 */`})}),`
`,(0,s.jsxs)(t.span,{className:`line`,children:[(0,s.jsx)(t.span,{style:{color:`#24292E`},children:`animate(elem, { `}),(0,s.jsx)(t.span,{style:{color:`#005CC5`},children:`x`}),(0,s.jsx)(t.span,{style:{color:`#24292E`},children:`: `}),(0,s.jsx)(t.span,{style:{color:`#005CC5`},children:`240`}),(0,s.jsx)(t.span,{style:{color:`#24292E`},children:` }, { `}),(0,s.jsx)(t.span,{style:{color:`#005CC5`},children:`type`}),(0,s.jsx)(t.span,{style:{color:`#24292E`},children:`: `}),(0,s.jsx)(t.span,{style:{color:`#032F62`},children:`'spring'`}),(0,s.jsx)(t.span,{style:{color:`#24292E`},children:`, stiffness: `}),(0,s.jsx)(t.span,{style:{color:`#005CC5`},children:`200`}),(0,s.jsx)(t.span,{style:{color:`#24292E`},children:`, damping: `}),(0,s.jsx)(t.span,{style:{color:`#005CC5`},children:`20`}),(0,s.jsx)(t.span,{style:{color:`#24292E`},children:` });`})]})]})})}),`
`,(0,s.jsx)(t.p,{children:`CSS transition 必須有時間：「這動作走 500ms」。Spring 沒這選項。Settle 時間是 stiffness × damping 的數學結果，可能 200ms 也可能 2 秒。`}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:`這就是為什麼 spring 進到 CSS 是個棘手問題`}),` — CSS transition 模型骨子裡是時間驅動。`,(0,s.jsx)(t.code,{children:`linear()`}),` 的解法是「事先算好 spring physics 的離散採樣，硬塞進固定 duration」，下兩節會講 tradeoff。`]}),`
`,(0,s.jsx)(t.h2,{children:`Tweak 流程`}),`
`,(0,s.jsxs)(t.ol,{children:[`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:`stiffness 調速度感`}),`：先看動畫從 A 到 B 大概多快算合理（200ms？800ms？），調 stiffness 直到速度對。先別管 bouncy。`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:`damping 調 vibe`}),`：速度 OK 後，`,`
`,(0,s.jsxs)(t.ul,{children:[`
`,(0,s.jsx)(t.li,{children:`想要彈跳生動 → damping 低（5-15）`}),`
`,(0,s.jsx)(t.li,{children:`想要平滑優雅 → damping 高（30-50）`}),`
`,(0,s.jsx)(t.li,{children:`不確定 → damping=20 中性`}),`
`]}),`
`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:`互相干擾`}),`：stiffness 調很高後 damping 也要跟著調高，否則震盪太久。`]}),`
`]}),`
`,(0,s.jsx)(t.h2,{children:`Stiffness/damping vs Tension/friction`}),`
`,(0,s.jsx)(t.p,{children:`兩組命名是同義詞：`}),`
`,(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:`概念`}),(0,s.jsx)(t.th,{children:`詞 A`}),(0,s.jsx)(t.th,{children:`詞 B`}),(0,s.jsx)(t.th,{children:`Library`})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`緊度`}),(0,s.jsx)(t.td,{children:`stiffness`}),(0,s.jsx)(t.td,{children:`tension`}),(0,s.jsx)(t.td,{children:`Motion / Easing Wizard 用 stiffness`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`阻尼`}),(0,s.jsx)(t.td,{children:`damping`}),(0,s.jsx)(t.td,{children:`friction`}),(0,s.jsx)(t.td,{children:`React Spring 用 tension / friction`})]})]})]}),`
`,(0,s.jsx)(t.p,{children:`切換 library 時注意換詞，但概念完全一致。`}),`
`,(0,s.jsx)(t.h2,{children:`Gotchas`}),`
`,(0,s.jsxs)(t.ul,{children:[`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsxs)(t.strong,{children:[`Demo 用 `,(0,s.jsx)(t.code,{children:`animate()`}),` from 'motion'`]}),` — Motion library 的 imperative API 包了 spring physics 計算。直接傳 `,(0,s.jsx)(t.code,{children:`{ type: 'spring', stiffness, damping }`}),` 即可。`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:`Strict Mode double-invoke 沒問題`}),`：每次 toggle 都 `,(0,s.jsx)(t.code,{children:`animate()`}),` 重 trigger，前一個動畫被 cancel。React 開發環境 double-mount 也只是動畫被 cancel 重跑而已。`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:`interrupt（動畫沒跑完就 trigger 第二次）的行為各 library 不同`}),`：React Spring 保留當前 inertia 平滑接續，Motion 直接重新 spring（看起來 OK 但不是「物理正確」），CSS linear() 用 reverse shortening factor（速度感變奇怪）。Limitations 那課會詳解。`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsxs)(t.strong,{children:[(0,s.jsx)(t.code,{children:`type: 'spring'`}),` 是 motion 的特殊 timing`]}),`，不是 CSS spec 內建。要寫純 CSS spring 必須用 linear() 函式（下節）。`]}),`
`]})]})}function p(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(f,{...e})}):f(e)}function m(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as n,d as t};