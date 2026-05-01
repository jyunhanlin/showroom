import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{i as n,n as r,r as i}from"./lib-BI_-S7V4.js";var a=e(n(),1),o=i(),s=`oklch(0.7 0.18 200)`,c=`oklch(0.85 0.15 30)`,l=[{name:`linear`,cps:[{x:0,y:0},{x:1,y:1}]},{name:`ease-in`,cps:[{x:.42,y:0},{x:1,y:1}]},{name:`ease-out`,cps:[{x:0,y:0},{x:.58,y:1}]},{name:`ease-in-out`,cps:[{x:.42,y:0},{x:.58,y:1}]},{name:`ease`,cps:[{x:.25,y:.1},{x:.25,y:1}]}],u=240;function d(){let[e,t]=(0,a.useState)({x:.42,y:0}),[n,r]=(0,a.useState)({x:.58,y:1}),[i,d]=(0,a.useState)(800),[f,p]=(0,a.useState)(0),m=`cubic-bezier(${e.x.toFixed(2)}, ${e.y.toFixed(2)}, ${n.x.toFixed(2)}, ${n.y.toFixed(2)})`;function h(e){return{x:e.x*u,y:u-e.y*u}}function g(e){return t=>{let n=t.currentTarget.ownerSVGElement;if(!n)return;t.currentTarget.setPointerCapture(t.pointerId);function r(t){let r=n.getBoundingClientRect(),i=(t.clientX-r.left)/r.width,a=1-(t.clientY-r.top)/r.height;e({x:Math.max(0,Math.min(1,i)),y:Math.max(0,Math.min(1,a))})}function i(){window.removeEventListener(`pointermove`,r),window.removeEventListener(`pointerup`,i)}window.addEventListener(`pointermove`,r),window.addEventListener(`pointerup`,i)}}let _=h(e),v=h(n),y=h({x:0,y:0}),b=h({x:1,y:1});return(0,o.jsxs)(`div`,{className:`flex flex-col items-center gap-3`,children:[(0,o.jsx)(`style`,{children:`
        @keyframes wham-cc-slide {
          from { transform: translateX(0) }
          to { transform: translateX(${u}px) }
        }
      `}),(0,o.jsxs)(`div`,{className:`flex flex-col items-center gap-3 sm:flex-row sm:items-start`,children:[(0,o.jsxs)(`svg`,{viewBox:`-20 -20 ${u+40} ${u+40}`,width:u+40,height:u+40,className:`rounded-md bg-slate-900 touch-none`,children:[(0,o.jsx)(`line`,{x1:`0`,y1:`0`,x2:u,y2:`0`,stroke:`oklch(0.4 0 0)`,strokeWidth:`1`,strokeDasharray:`2 4`}),(0,o.jsx)(`line`,{x1:`0`,y1:u,x2:u,y2:u,stroke:`oklch(0.4 0 0)`,strokeWidth:`1`}),(0,o.jsx)(`line`,{x1:`0`,y1:`0`,x2:`0`,y2:u,stroke:`oklch(0.4 0 0)`,strokeWidth:`1`}),(0,o.jsx)(`line`,{x1:u,y1:`0`,x2:u,y2:u,stroke:`oklch(0.4 0 0)`,strokeWidth:`1`,strokeDasharray:`2 4`}),(0,o.jsx)(`line`,{x1:y.x,y1:y.y,x2:_.x,y2:_.y,stroke:`oklch(0.5 0.1 30 / 0.5)`,strokeWidth:`1`}),(0,o.jsx)(`line`,{x1:b.x,y1:b.y,x2:v.x,y2:v.y,stroke:`oklch(0.5 0.1 30 / 0.5)`,strokeWidth:`1`}),(0,o.jsx)(`path`,{d:`M ${y.x},${y.y} C ${_.x},${_.y} ${v.x},${v.y} ${b.x},${b.y}`,fill:`none`,stroke:s,strokeWidth:`2`}),(0,o.jsx)(`circle`,{cx:y.x,cy:y.y,r:`4`,fill:s}),(0,o.jsx)(`circle`,{cx:b.x,cy:b.y,r:`4`,fill:s}),(0,o.jsx)(`circle`,{cx:_.x,cy:_.y,r:`8`,fill:c,style:{cursor:`grab`},onPointerDown:g(t)}),(0,o.jsx)(`circle`,{cx:v.x,cy:v.y,r:`8`,fill:c,style:{cursor:`grab`},onPointerDown:g(r)})]}),(0,o.jsxs)(`div`,{className:`flex w-64 flex-col gap-3`,children:[(0,o.jsx)(`div`,{className:`rounded bg-slate-100 p-2 font-mono text-xs`,children:m}),(0,o.jsx)(`div`,{className:`flex flex-wrap gap-1`,children:l.map(e=>(0,o.jsx)(`button`,{type:`button`,onClick:()=>{t(e.cps[0]),r(e.cps[1])},className:`rounded bg-slate-200 px-2 py-1 font-mono text-xs hover:bg-slate-300`,children:e.name},e.name))}),(0,o.jsxs)(`label`,{className:`flex items-center gap-2 font-mono text-sm`,children:[(0,o.jsxs)(`span`,{className:`w-24`,children:[`duration: `,i,`ms`]}),(0,o.jsx)(`input`,{type:`range`,min:200,max:2e3,step:50,value:i,onChange:e=>d(Number(e.target.value))})]}),(0,o.jsx)(`div`,{className:`rounded-md bg-slate-900 p-3`,style:{width:u+24},children:(0,o.jsx)(`div`,{className:`relative`,style:{height:32,width:u},children:(0,o.jsx)(`div`,{className:`absolute top-1/2 -translate-y-1/2 rounded-full`,style:{width:24,height:24,backgroundColor:s,animation:`wham-cc-slide ${i}ms ${m} forwards`}},f)})}),(0,o.jsx)(`button`,{type:`button`,onClick:()=>p(e=>e+1),className:`rounded bg-rose-500 px-3 py-1 font-mono text-xs text-white hover:bg-rose-600`,children:`replay`})]})]}),(0,o.jsx)(`p`,{className:`text-xs text-gray-500`,children:`拖兩個控制點 / 套 preset / 調 duration → 看球的節奏怎麼變。`})]})}var f=t({default:()=>h,frontmatter:()=>p}),p={title:`Custom Curves, designing your own cubic-bezier`,sourceUrl:`https://courses.joshwcomeau.com/wham/01-particles/05.02-custom-curves`,lessonNumber:`01-particles/05.02-custom-curves`,order:10,summary:"5 個內建 keyword 都對應一條 `cubic-bezier(p1x, p1y, p2x, p2y)`。可以自己拉控制點 — 兩個技巧:挑對形狀後**誇張化**、誇張過頭就用**更長的 duration** 補。",tags:[`particles`,`css`,`easing`,`cubic-bezier`,`animation-design`]};function m(e){let t={code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,strong:`strong`,ul:`ul`,...r(),...e.components},{DemoFrame:n}=t;return n||g(`DemoFrame`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`TL;DR`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[`內建 5 個 timing keyword 全部都是 `,(0,o.jsx)(t.code,{children:`cubic-bezier(...)`}),` 的 alias。例:`,(0,o.jsx)(t.code,{children:`ease = cubic-bezier(0.25, 0.1, 0.25, 1)`}),`。`]}),`
`,(0,o.jsxs)(t.li,{children:[`想設計自己的 easing,兩條心法:`,`
`,(0,o.jsxs)(t.ol,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`先挑形狀,再誇張化`}),`:確定要 ease-in / ease-out / ease-in-out 哪一類,再把控制點往該方向拉到極致 — 比內建版本更有戲。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`動畫太誇張就拉長 duration`}),`:90% 的位移在前 200ms 結束、後 1300ms 慢慢停 → 感覺很快但又很滑順。看起來矛盾,但「`,(0,o.jsx)(t.strong,{children:`perceived speed`}),`」才是用戶感受到的 — 不是時鐘上的時間。`]}),`
`]}),`
`]}),`
`,(0,o.jsxs)(t.li,{children:[`Bezier 拉不出 spring / bounce,要做彈跳要用 `,(0,o.jsx)(t.code,{children:`linear()`}),` 或 spring physics(下一章)。`]}),`
`]}),`
`,(0,o.jsx)(n,{title:`cubic-bezier playground`,children:(0,o.jsx)(d,{})}),`
`,(0,o.jsx)(t.p,{children:`拖兩個控制點看曲線怎麼變,套 preset 看內建關鍵字長什麼樣。`}),`
`,(0,o.jsx)(t.h2,{children:`Why it works`}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:`cubic-bezier(x1, y1, x2, y2)`}),` 是條從 (0,0) 到 (1,1) 的三次貝茲曲線。兩個控制點決定中段的彎度。`]}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`y`}),` 是 progress(動畫的完成度)。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`x`}),` 是 time。`]}),`
`,(0,o.jsx)(t.li,{children:`曲線斜率 = 速度。斜率陡 → 那段時間動得快;斜率平 → 那段時間幾乎不動。`}),`
`]}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:`ease-in`}),` 第一個控制點 y 值低、被「壓在底部」 → 起步段斜率小 → 起步慢。`]}),`
`,(0,o.jsx)(t.h2,{children:`兩條心法 demo`}),`
`,(0,o.jsx)(t.p,{children:(0,o.jsx)(t.strong,{children:`心法 1:誇張化`})}),`
`,(0,o.jsxs)(t.p,{children:[`內建 `,(0,o.jsx)(t.code,{children:`ease-in`}),` 是 `,(0,o.jsx)(t.code,{children:`cubic-bezier(0.42, 0, 1, 1)`}),` — 前段被壓的程度其實沒很多。改成 `,(0,o.jsx)(t.code,{children:`cubic-bezier(0.7, 0, 1, 1)`}),`:壓得更深,起步慢得更明顯,加速感更強。`]}),`
`,(0,o.jsx)(t.p,{children:(0,o.jsx)(t.strong,{children:`心法 2:過頭了就加長`})}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:`ease-out`}),` 想做「重煞車」感:第一個控制點 y 拉到 1,第二個 x 拉到接近 1 → 90% 動畫一瞬間結束、剩下 10% 在那邊滑著停。如果只給 500ms,中間會有段時間球都不動,看起來像卡住。改成 1500ms,球瞬間衝到末端、然後慢慢挪到位 — 感覺「明明動得很快但又很滑」。`]}),`
`,(0,o.jsx)(t.h2,{children:`設計系統怎麼用`}),`
`,(0,o.jsx)(t.p,{children:`不是每個動畫都要自訂曲線。常見做法:`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`80% 場景`}),` — 設計系統定 3~5 條全域 easing token(`,(0,o.jsx)(t.code,{children:`--easing-bounce`}),`, `,(0,o.jsx)(t.code,{children:`--easing-snappy`}),`, `,(0,o.jsx)(t.code,{children:`--easing-smooth`}),` 之類),小動畫直接撈。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`20% 場景`}),` — 大型 splashy animation 才一次性自訂。`]}),`
`]}),`
`,(0,o.jsx)(t.h2,{children:`Gotchas`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`超出 [0, 1] 的 y 值`}),`:`,(0,o.jsx)(t.code,{children:`cubic-bezier(0.5, -0.5, 0.5, 1.5)`}),` 是合法的,做出「倒退一點再衝過頭」的彈跳效果。但 spring 物理感還是要用 `,(0,o.jsx)(t.code,{children:`linear()`}),` keyword(內含多控制點)或 spring 函式庫,Bezier 模擬有極限。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`fade 動畫 easing 影響不大`}),`:`,(0,o.jsx)(t.code,{children:`opacity`}),` 0 → 1 是個感官特別不敏感的變化,挑哪條曲線都看不太出來。把心力花在會「`,(0,o.jsx)(t.strong,{children:`移動`}),`」的屬性上。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:(0,o.jsx)(t.code,{children:`ease ≠ ease-in-out`})}),`:預設 ease 是不對稱的(前傾)。對來回擺動的 `,(0,o.jsx)(t.code,{children:`alternate`}),` 動畫不適合,因為兩個方向節奏會不同。`]}),`
`]})]})}function h(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(m,{...e})}):m(e)}function g(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as n,f as t};