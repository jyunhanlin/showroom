import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{i as n,n as r,r as i}from"./lib-BI_-S7V4.js";var a=e(n(),1),o=i(),s=`oklch(0.9 0.3 164)`,c=`oklch(0.7 0.2 30)`,l=`oklch(0.7 0.2 30 / 0.4)`;function u(){let[e,t]=(0,a.useState)(8),[n,r]=(0,a.useState)(0),i={x:2,y:14},u={x:14,y:14},d=`M ${i.x},${i.y} Q ${e},${n} ${u.x},${u.y}`;return(0,o.jsxs)(`div`,{className:`mx-auto flex w-fit flex-col items-center gap-3`,children:[(0,o.jsxs)(`svg`,{viewBox:`0 0 16 16`,width:300,height:300,className:`block rounded-md bg-slate-900`,children:[(0,o.jsx)(`line`,{x1:i.x,y1:i.y,x2:e,y2:n,stroke:l,strokeWidth:`0.15`}),(0,o.jsx)(`line`,{x1:e,y1:n,x2:u.x,y2:u.y,stroke:l,strokeWidth:`0.15`}),(0,o.jsx)(`path`,{d,fill:`none`,stroke:s,strokeWidth:`0.4`,strokeLinecap:`round`}),(0,o.jsx)(`circle`,{cx:i.x,cy:i.y,r:`0.4`,fill:s}),(0,o.jsx)(`circle`,{cx:u.x,cy:u.y,r:`0.4`,fill:s}),(0,o.jsx)(`circle`,{cx:e,cy:n,r:`0.4`,fill:c})]}),(0,o.jsx)(`pre`,{className:`rounded bg-slate-100 p-2 font-mono text-xs`,children:d}),(0,o.jsxs)(`div`,{className:`grid grid-cols-2 gap-2 font-mono text-sm`,children:[(0,o.jsxs)(`label`,{className:`flex items-center gap-2`,children:[(0,o.jsxs)(`span`,{className:`w-14`,children:[`cp.x: `,e]}),(0,o.jsx)(`input`,{type:`range`,min:-4,max:20,value:e,onChange:e=>t(Number(e.target.value))})]}),(0,o.jsxs)(`label`,{className:`flex items-center gap-2`,children:[(0,o.jsxs)(`span`,{className:`w-14`,children:[`cp.y: `,n]}),(0,o.jsx)(`input`,{type:`range`,min:-4,max:20,value:n,onChange:e=>r(Number(e.target.value))})]})]})]})}function d(){let[e,t]=(0,a.useState)(2),[n,r]=(0,a.useState)(0),[i,u]=(0,a.useState)(14),[d,f]=(0,a.useState)(0),p={x:2,y:14},m={x:14,y:14},h=`M ${p.x},${p.y} C ${e},${n} ${i},${d} ${m.x},${m.y}`;return(0,o.jsxs)(`div`,{className:`mx-auto flex w-fit flex-col items-center gap-3`,children:[(0,o.jsxs)(`svg`,{viewBox:`0 0 16 16`,width:300,height:300,className:`block rounded-md bg-slate-900`,children:[(0,o.jsx)(`line`,{x1:p.x,y1:p.y,x2:e,y2:n,stroke:l,strokeWidth:`0.15`}),(0,o.jsx)(`line`,{x1:m.x,y1:m.y,x2:i,y2:d,stroke:l,strokeWidth:`0.15`}),(0,o.jsx)(`path`,{d:h,fill:`none`,stroke:s,strokeWidth:`0.4`,strokeLinecap:`round`}),(0,o.jsx)(`circle`,{cx:p.x,cy:p.y,r:`0.4`,fill:s}),(0,o.jsx)(`circle`,{cx:m.x,cy:m.y,r:`0.4`,fill:s}),(0,o.jsx)(`circle`,{cx:e,cy:n,r:`0.4`,fill:c}),(0,o.jsx)(`circle`,{cx:i,cy:d,r:`0.4`,fill:c})]}),(0,o.jsx)(`pre`,{className:`rounded bg-slate-100 p-2 font-mono text-xs`,children:h}),(0,o.jsxs)(`div`,{className:`grid grid-cols-2 gap-2 font-mono text-sm`,children:[(0,o.jsxs)(`label`,{className:`flex items-center gap-2`,children:[(0,o.jsxs)(`span`,{className:`w-16`,children:[`cp1.x: `,e]}),(0,o.jsx)(`input`,{type:`range`,min:-4,max:20,value:e,onChange:e=>t(Number(e.target.value))})]}),(0,o.jsxs)(`label`,{className:`flex items-center gap-2`,children:[(0,o.jsxs)(`span`,{className:`w-16`,children:[`cp1.y: `,n]}),(0,o.jsx)(`input`,{type:`range`,min:-4,max:20,value:n,onChange:e=>r(Number(e.target.value))})]}),(0,o.jsxs)(`label`,{className:`flex items-center gap-2`,children:[(0,o.jsxs)(`span`,{className:`w-16`,children:[`cp2.x: `,i]}),(0,o.jsx)(`input`,{type:`range`,min:-4,max:20,value:i,onChange:e=>u(Number(e.target.value))})]}),(0,o.jsxs)(`label`,{className:`flex items-center gap-2`,children:[(0,o.jsxs)(`span`,{className:`w-16`,children:[`cp2.y: `,d]}),(0,o.jsx)(`input`,{type:`range`,min:-4,max:20,value:d,onChange:e=>f(Number(e.target.value))})]})]})]})}var f=t({default:()=>h,frontmatter:()=>p}),p={title:`Path Commands, M / L / Z / Q / C / A — six tools for any shape`,sourceUrl:`https://courses.joshwcomeau.com/wham/02-svg/03.01-path-commands`,lessonNumber:`02-svg/03.01-path-commands`,order:3.01,summary:`M (move) / L (line) / Z (close) 是基礎，Q (quadratic Bezier) 1 個 control point、C (cubic Bezier) 2 個 control points、A (arc) 走橢圓弧。Cubic 比 Quadratic 多一個 control point，能做 S 形跟更精準的單峰曲線。`,tags:[`svg`,`path`,`bezier`,`commands`]};function m(e){let t={code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,span:`span`,strong:`strong`,ul:`ul`,...r(),...e.components},{DemoFrame:n}=t;return n||g(`DemoFrame`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`TL;DR`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[`6 個主要 path 指令：`,(0,o.jsx)(t.code,{children:`M`}),` (move-to)、`,(0,o.jsx)(t.code,{children:`L`}),` (line-to)、`,(0,o.jsx)(t.code,{children:`Z`}),` (close path)、`,(0,o.jsx)(t.code,{children:`Q`}),` (quadratic Bezier)、`,(0,o.jsx)(t.code,{children:`C`}),` (cubic Bezier)、`,(0,o.jsx)(t.code,{children:`A`}),` (arc)。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`M`}),` 必出現在每個 path 開頭；中間再出現 = 抬筆移到別處 sub-path。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`Z`}),` 把當前 sub-path 從目前位置畫直線回到 sub-path 起點。`,(0,o.jsxs)(t.strong,{children:[`跟單純的 `,(0,o.jsx)(t.code,{children:`L (起點)`}),` 不同`]}),`：Z 把線頭尾連在一起（看 stroke-linejoin），`,(0,o.jsx)(t.code,{children:`L 起點`}),` 只是兩條線重疊，stroke 看 stroke-linecap。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`Q x1,y1 x,y`}),` — 從前一個位置經過 control point (x1,y1) 拉到 (x, y) 的拋物線。一個 control point 拉一條單峰曲線。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`C x1,y1 x2,y2 x,y`}),` — 兩個 control points，可以做 S 形或精準調整單峰形狀。`]}),`
`,(0,o.jsx)(t.li,{children:`大寫 = 絕對座標，小寫 = 相對於前一個 endpoint 的位移（syntactic-sugar 那課再講）。`}),`
`]}),`
`,(0,o.jsx)(t.h2,{children:`Quadratic Bezier — 1 個 control point`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-svg`,children:`<path d="M 2,14 Q 8,0 14,14" />
`})}),`
`,(0,o.jsxs)(t.p,{children:[`從 (2, 14) 出發，control point 在 (8, 0)，終點 (14, 14)。曲線「往 control point 方向被吸引」，但`,(0,o.jsx)(t.strong,{children:`永遠不會通過 control point`}),`，只會傾向它。`]}),`
`,(0,o.jsx)(n,{title:`Quadratic Bezier — 拖 cp.x / cp.y 看 control point 怎麼影響曲線`,children:(0,o.jsx)(u,{})}),`
`,(0,o.jsx)(t.p,{children:`直覺：control point 越遠離直線連接的兩端點，曲線彎越大。control point 跟兩端點共線時，曲線退化成直線。control point 在兩端點外面時，曲線會「往外凸」更誇張。`}),`
`,(0,o.jsx)(t.p,{children:`實用場景：`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:`拋物線形狀（單峰）`}),`
`,(0,o.jsx)(t.li,{children:`簡單的 swoop divider`}),`
`,(0,o.jsx)(t.li,{children:`icon 裡的單一弧形`}),`
`]}),`
`,(0,o.jsxs)(t.p,{children:[`侷限：`,(0,o.jsx)(t.strong,{children:`不能做 S 形`}),`。要 S 形需要 cubic。`]}),`
`,(0,o.jsx)(t.h2,{children:`Cubic Bezier — 2 個 control points`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-svg`,children:`<path d="M 2,14 C 2,0 14,14 14,0" />
`})}),`
`,(0,o.jsxs)(t.p,{children:[`從 (2, 14) 出發，`,(0,o.jsx)(t.strong,{children:`第一個`}),` control point (2, 0) 控制起點端的「離開方向」，`,(0,o.jsx)(t.strong,{children:`第二個`}),` control point (14, 14) 控制終點端的「進入方向」，終點 (14, 0)。`]}),`
`,(0,o.jsx)(n,{title:`Cubic Bezier — 兩個 control points，能做 S 形`,children:(0,o.jsx)(d,{})}),`
`,(0,o.jsx)(t.p,{children:`兩個 control points 各自吸引曲線在那一端的形狀。試把 cp1 拉左上、cp2 拉右下，曲線變 S 形。`}),`
`,(0,o.jsxs)(t.p,{children:[`CSS easing 的 `,(0,o.jsx)(t.code,{children:`cubic-bezier(0.42, 0, 0.58, 1)`}),` 也是這個概念 — easing curve 本質就是一條 cubic Bezier，control point 就是兩個 timing 數對。`]}),`
`,(0,o.jsx)(t.p,{children:`兩個用 cubic 的場合：`}),`
`,(0,o.jsxs)(t.ol,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`需要 S 形`}),` — Quadratic 做不到`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`要更精準控制單峰`}),` — 兩個 control points 在同一邊可以調整曲線兩端的「進入/離開」陡峭度`]}),`
`]}),`
`,(0,o.jsx)(t.h2,{children:`Z 不只是 syntactic sugar`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-svg`,children:`<path d="M 4,4 L 4,12 L 12,12 Z" />
`})}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:`Z`}),` 從 (12, 12) 畫直線回 sub-path 起點 (4, 4)，跟 `,(0,o.jsx)(t.code,{children:`L 4,4`}),` 看似一樣。差別在 stroke linejoin：`]}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`Z`}),` — 三角形完整封閉，三個轉角都被 `,(0,o.jsx)(t.code,{children:`stroke-linejoin`}),` 處理（miter/round/bevel）`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`L 4,4`}),` — 終點跟起點重合但「沒連起來」，那個重合點按 `,(0,o.jsx)(t.code,{children:`stroke-linecap`}),` 處理（butt/round/square）`]}),`
`]}),`
`,(0,o.jsxs)(t.p,{children:[`用 `,(0,o.jsx)(t.code,{children:`stroke-linecap="butt"`}),` 時 Z vs L 4,4 差別最明顯：Z 會收成尖角，L 4,4 會留兩個切口。`]}),`
`,(0,o.jsx)(t.p,{children:`實務：要封閉形狀（三角形、多邊形）一律用 Z；要刻意留缺口或視覺上「尾巴沒接到」用 L。`}),`
`,(0,o.jsx)(t.h2,{children:`Fill 不需要 Z`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-svg`,children:`<path fill="red" d="M 4,4 L 4,12 L 12,12" />
`})}),`
`,(0,o.jsxs)(t.p,{children:[`這個 path 沒收尾（沒 Z），但 `,(0,o.jsx)(t.code,{children:`fill`}),` 還是會把它當封閉形狀填色，瀏覽器自動補上「終點到起點」的虛擬線當邊界。`]}),`
`,(0,o.jsxs)(t.p,{children:[`所以 Z 只影響 stroke，不影響 fill。要的話可以同時設 `,(0,o.jsx)(t.code,{children:`fill="red"`}),` + 不寫 Z + `,(0,o.jsx)(t.code,{children:`stroke="none"`}),` 或留 stroke 看效果。`]}),`
`,(0,o.jsx)(t.h2,{children:`Gotchas`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:`指令大小寫不同`}),`：`,(0,o.jsx)(t.code,{children:`M`}),`、`,(0,o.jsx)(t.code,{children:`L`}),`、`,(0,o.jsx)(t.code,{children:`Q`}),`、`,(0,o.jsx)(t.code,{children:`C`}),` 是絕對座標；`,(0,o.jsx)(t.code,{children:`m`}),`、`,(0,o.jsx)(t.code,{children:`l`}),`、`,(0,o.jsx)(t.code,{children:`q`}),`、`,(0,o.jsx)(t.code,{children:`c`}),` 是相對於前一個位置的位移。混用容易出 bug，初學一律全大寫。`]}),`
`]}),`
`,(0,o.jsxs)(t.li,{children:[`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:`Q 跟 C 之間的 control point 不會視覺上出現`}),`，只是數學上影響曲線形狀。Demo 裡的 control point 圓點是我額外畫的視覺輔助。`]}),`
`]}),`
`,(0,o.jsxs)(t.li,{children:[`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:`path 數值可以是負數或超出 viewBox 的值`}),`。control point 在 viewBox 外面只是看不見，不影響數學計算。`]}),`
`]}),`
`,(0,o.jsxs)(t.li,{children:[`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:`連續 Bezier 容易在交界處出 elbow`}),`：`,(0,o.jsx)(t.code,{children:`M 0,0 Q 4,10 8,8 Q 14,0 12,12`}),` 兩條 Q 的交界處可能不平滑。後面 syntactic-sugar 那課的 `,(0,o.jsx)(t.code,{children:`T`}),` 跟 `,(0,o.jsx)(t.code,{children:`S`}),` 就是解這個。`]}),`
`]}),`
`,(0,o.jsxs)(t.li,{children:[`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsxs)(t.strong,{children:[`JSX 把 `,(0,o.jsx)(t.code,{children:`d`}),` 當字串`]}),`：`,(0,o.jsx)(t.code,{children:`<path d="M 2,14 Q 8,0 14,14" />`}),` 或用 template literal 動態拼：`]}),`
`,(0,o.jsx)(o.Fragment,{children:(0,o.jsx)(t.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,o.jsx)(t.code,{children:(0,o.jsxs)(t.span,{className:`line`,children:[(0,o.jsx)(t.span,{style:{color:`#24292E`},children:`<`}),(0,o.jsx)(t.span,{style:{color:`#22863A`},children:`path`}),(0,o.jsx)(t.span,{style:{color:`#6F42C1`},children:` d`}),(0,o.jsx)(t.span,{style:{color:`#D73A49`},children:`=`}),(0,o.jsx)(t.span,{style:{color:`#24292E`},children:`{`}),(0,o.jsx)(t.span,{style:{color:`#032F62`},children:"`M ${"}),(0,o.jsx)(t.span,{style:{color:`#24292E`},children:`x`}),(0,o.jsx)(t.span,{style:{color:`#032F62`},children:"},${"}),(0,o.jsx)(t.span,{style:{color:`#24292E`},children:`y`}),(0,o.jsx)(t.span,{style:{color:`#032F62`},children:"} Q 8,0 14,14`"}),(0,o.jsx)(t.span,{style:{color:`#24292E`},children:`} />`})]})})})}),`
`]}),`
`]})]})}function h(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(m,{...e})}):m(e)}function g(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{f as n,p as t};