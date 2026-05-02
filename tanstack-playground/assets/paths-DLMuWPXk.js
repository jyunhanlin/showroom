import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{i as n,n as r,r as i}from"./lib-BI_-S7V4.js";var a=e(n(),1),o=i(),s=`oklch(0.9 0.3 164)`,c=`oklch(0.9 0.3 164 / 0.35)`,l=[{type:`M`,x:6,y:4,label:`M 6,4`},{type:`L`,x:12,y:4,label:`L 12,4`},{type:`L`,x:12,y:10,label:`L 12,10`},{type:`M`,x:4,y:12,label:`M 4,12`},{type:`L`,x:12,y:4,label:`L 12,4`}];function u(e){return l.slice(0,e).map(e=>`${e.type} ${e.x},${e.y}`).join(` `)}function d(){let[e,t]=(0,a.useState)(l.length),n=l.slice(0,e);return(0,o.jsxs)(`div`,{className:`mx-auto flex w-fit flex-col items-center gap-3`,children:[(0,o.jsxs)(`svg`,{viewBox:`0 0 16 16`,width:320,height:320,className:`block rounded-md bg-slate-900`,children:[(0,o.jsx)(`path`,{d:u(e),fill:`none`,stroke:s,strokeWidth:`0.5`,strokeLinecap:`round`,strokeLinejoin:`round`}),n.map((e,t)=>(0,o.jsxs)(`g`,{children:[(0,o.jsx)(`circle`,{cx:e.x,cy:e.y,r:`0.45`,fill:e.type===`M`?c:s}),(0,o.jsx)(`text`,{x:e.x+.6,y:e.y-.6,fill:s,fontSize:`1`,fontFamily:`monospace`,children:e.label})]},t))]}),(0,o.jsxs)(`div`,{className:`flex flex-col items-center gap-2`,children:[(0,o.jsxs)(`label`,{className:`flex items-center gap-3 font-mono text-sm`,children:[(0,o.jsxs)(`span`,{className:`w-24`,children:[`step: `,e,`/`,l.length]}),(0,o.jsx)(`input`,{type:`range`,min:0,max:l.length,value:e,onChange:e=>t(Number(e.target.value))})]}),(0,o.jsxs)(`pre`,{className:`rounded bg-slate-100 p-2 font-mono text-xs`,children:[`d="`,u(e)||`(empty)`,`"`]})]})]})}var f=t({default:()=>h,frontmatter:()=>p}),p={title:`Paths, one continuous sequence of pen instructions`,sourceUrl:`https://courses.joshwcomeau.com/wham/02-svg/03-paths`,lessonNumber:`02-svg/03-paths`,order:7,summary:`<path d="..."> 是一串繪圖指令，第一個一定是 M（move-to）把筆放下，後面 L / Q / C / A 接著畫。每個指令的起點繼承自前一個指令的終點，跟 <line> 兩端都要寫不一樣，這是 path 能做 Bezier / arc 的根本理由。`,tags:[`svg`,`path`,`d-attribute`]};function m(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...r(),...e.components},{DemoFrame:n}=t;return n||g(`DemoFrame`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`TL;DR`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`<path d="...">`}),` 的 `,(0,o.jsx)(t.code,{children:`d`}),` 是一串指令（move、line、Bezier、arc），瀏覽器照順序執行像在紙上畫。`]}),`
`,(0,o.jsxs)(t.li,{children:[`每個有效 path 必須以 `,(0,o.jsx)(t.code,{children:`M`}),`（Move-to）開頭，告訴瀏覽器筆從哪裡開始。中間可以再 `,(0,o.jsx)(t.code,{children:`M`}),` 一次「把筆抬起來移到別處」，產生不連續的 sub-path。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`指令只接終點`}),`，起點隱式繼承前一個指令的終點。`,(0,o.jsx)(t.code,{children:`L 12,4`}),` 意思「從上一個位置畫直線到 (12, 4)」，不像 `,(0,o.jsx)(t.code,{children:`<line>`}),` 兩端都要寫。`]}),`
`,(0,o.jsx)(t.li,{children:`這個「flowing sequence」設計就是 path 能做 Bezier curve 跟 elliptical arc 的根本理由 — 每個 curve command 從上一個位置接續，可以無縫連到下一條曲線。`}),`
`,(0,o.jsxs)(t.li,{children:[`逗號跟空白都可以當分隔符；compressed SVG 常寫成 `,(0,o.jsx)(t.code,{children:`M8 24L24 8M12 8...`}),` 沒空白，能 work 但難讀。`,(0,o.jsx)(t.strong,{children:`寫 code 時用空白跟逗號`}),`，gzip 之後 size 差幾乎為 0。`]}),`
`]}),`
`,(0,o.jsx)(n,{title:`Step through M / L / M / L — slider 控制執行到第幾步`,children:(0,o.jsx)(d,{})}),`
`,(0,o.jsx)(t.h2,{children:`一個指令一行讀`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-svg`,children:`<path d="
  M 6,4
  L 12,4
  L 12,10
  M 4,12
  L 12,4
"/>
`})}),`
`,(0,o.jsx)(t.p,{children:`逐步執行：`}),`
`,(0,o.jsxs)(t.ol,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`M 6,4`}),` — 把筆放在 (6, 4)，`,(0,o.jsx)(t.strong,{children:`沒畫任何東西`})]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`L 12,4`}),` — 從 (6, 4) 畫直線到 (12, 4)，水平往右`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`L 12,10`}),` — 從 (12, 4) 接著畫到 (12, 10)，垂直往下 → 形成 L 字`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`M 4,12`}),` — 把筆`,(0,o.jsx)(t.strong,{children:`抬起來`}),`移到 (4, 12)，這之間沒線`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`L 12,4`}),` — 從 (4, 12) 畫到 (12, 4)，斜對角線`]}),`
`]}),`
`,(0,o.jsx)(t.p,{children:`結果：一個 Г 字 + 一條斜線。Demo 拖 step slider 看每步加上去的視覺效果。`}),`
`,(0,o.jsxs)(t.h2,{children:[`跟 `,(0,o.jsx)(t.code,{children:`<polyline>`}),` + `,(0,o.jsx)(t.code,{children:`<line>`}),` 的差別`]}),`
`,(0,o.jsx)(t.p,{children:`同一個圖形也可以這樣寫：`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-svg`,children:`<polyline points="6,4 12,4 12,10" />
<line x1="4" y1="12" x2="12" y2="4" />
`})}),`
`,(0,o.jsx)(t.p,{children:`可讀性其實更好，但有兩個 path 才能做的事：`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`Bezier curve`}),` (`,(0,o.jsx)(t.code,{children:`Q`}),` quadratic、`,(0,o.jsx)(t.code,{children:`C`}),` cubic) — `,(0,o.jsx)(t.code,{children:`<polyline>`}),` 沒有 curve 概念`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`Elliptical arc`}),` (`,(0,o.jsx)(t.code,{children:`A`}),`) — 跟 `,(0,o.jsx)(t.code,{children:`<ellipse>`}),` 不一樣，arc 是 path 內部的曲線指令`]}),`
`]}),`
`,(0,o.jsxs)(t.p,{children:[`寫 icon / 簡單形狀用 `,(0,o.jsx)(t.code,{children:`<polyline>`}),` + `,(0,o.jsx)(t.code,{children:`<line>`}),` 比較清楚；寫 Figma 匯出的複雜 illustration（包含曲線）只能用 path。`]}),`
`,(0,o.jsx)(t.h2,{children:`「起點繼承」是 path 的核心`}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:`<line>`}),` 兩端都要明寫：`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-svg`,children:`<line x1="4" y1="12" x2="12" y2="4" />
`})}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:`<path>`}),` 的 `,(0,o.jsx)(t.code,{children:`L`}),` 只接`,(0,o.jsx)(t.strong,{children:`終點`}),`：`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-svg`,children:`M 4,12 L 12,4
`})}),`
`,(0,o.jsxs)(t.p,{children:[`起點 (4, 12) 從上一個指令（`,(0,o.jsx)(t.code,{children:`M 4,12`}),`）繼承過來。這個 chaining 設計讓 Bezier 可以無縫接 Bezier：`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-svg`,children:`M 0,8
Q 4,0 8,8
T 16,8
`})}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:`T`}),` 是「smooth quadratic」，control point 自動鏡射前一個 `,(0,o.jsx)(t.code,{children:`Q`}),` 的 control point — 這只有在 path 裡有用，因為它需要前一個指令的內部狀態。`]}),`
`,(0,o.jsx)(t.h2,{children:`逗號 vs 空白：spec 兩個都認`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-svg`,children:`<!-- 都合法 -->
<path d="M 6,4 L 12,4" />
<path d="M 6 4 L 12 4" />
<path d="M6,4L12,4" />
<path d="M6 4L12 4" />
`})}),`
`,(0,o.jsx)(t.p,{children:`W3C spec 的考量是 file size — 早期 dial-up 時代每個 byte 都重要。但 gzip 壓縮後差距 < 1%，現代根本不該為這 byte 數犧牲可讀性。`}),`
`,(0,o.jsxs)(t.p,{children:[`寫 code 時用 `,(0,o.jsx)(t.code,{children:`M x,y L x,y`}),` 這種「逗號分 pair、空白分指令」格式最好讀。Figma export 出來的 path 通常 minify 過，要看的話貼進 `,(0,o.jsx)(t.a,{href:`https://yqnn.github.io/svg-path-editor/`,children:`SVG path editor`}),` 之類工具人工美化。`]}),`
`,(0,o.jsx)(t.h2,{children:`Gotchas`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsxs)(t.strong,{children:[`第一個指令必須是 `,(0,o.jsx)(t.code,{children:`M`})]}),`。瀏覽器看到 `,(0,o.jsx)(t.code,{children:`L`}),` 起手會直接 silently 不畫。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`指令大小寫不同`}),`：大寫 = 絕對座標，小寫 = 相對前一個指令的位移。後面 syntactic sugar 那課會講相對指令的用途，初學一律寫大寫即可。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsxs)(t.strong,{children:[`JSX 把 `,(0,o.jsx)(t.code,{children:`d`}),` attribute 當字串傳`]}),`：`,(0,o.jsx)(t.code,{children:`<path d="M 6,4 L 12,4 ..." />`}),` 直接寫即可。多行字串用 template literal `,(0,o.jsx)(t.code,{children:`<path d={`}),`M 6,4\\n  L 12,4`,(0,o.jsx)(t.code,{children:`}`}),` 也合法（換行被當空白）。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`fill 預設是黑色`}),` — 即使是「開放路徑」（沒有 Z 收尾），瀏覽器也會把首尾連起來填色。要保持線條空心要 `,(0,o.jsx)(t.code,{children:`fill="none"`}),`，跟其他 SVG primitive 一樣。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`path 比較貴`}),`：複雜的 path 比同等的 polyline 慢一點點 render（因為要解析指令）。日常 UI 看不出差異，但動畫 100+ paths 同時跑時可能會考慮拆成 polyline + line。`]}),`
`]})]})}function h(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(m,{...e})}):m(e)}function g(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{f as n,p as t};