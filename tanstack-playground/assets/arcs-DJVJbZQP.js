import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{i as n,n as r,r as i}from"./lib-BI_-S7V4.js";var a=e(n(),1),o=i(),s=`oklch(0.9 0.3 164)`,c=`oklch(0.7 0.2 30)`;function l(){let[e,t]=(0,a.useState)(5),[n,r]=(0,a.useState)(5),[i,l]=(0,a.useState)(0),[u,d]=(0,a.useState)(0),[f,p]=(0,a.useState)(0),m={x:4,y:4},h={x:12,y:12},g=`M ${m.x},${m.y} A ${e},${n} ${i} ${u} ${f} ${h.x},${h.y}`;return(0,o.jsxs)(`div`,{className:`mx-auto flex w-fit flex-col items-center gap-3`,children:[(0,o.jsxs)(`svg`,{viewBox:`0 0 16 16`,width:320,height:320,className:`block rounded-md bg-slate-900`,children:[(0,o.jsx)(`path`,{d:g,fill:`none`,stroke:s,strokeWidth:`0.4`,strokeLinecap:`round`}),(0,o.jsx)(`circle`,{cx:m.x,cy:m.y,r:`0.4`,fill:c}),(0,o.jsx)(`circle`,{cx:h.x,cy:h.y,r:`0.4`,fill:c})]}),(0,o.jsx)(`pre`,{className:`rounded bg-slate-100 p-2 font-mono text-xs`,children:g}),(0,o.jsxs)(`div`,{className:`grid grid-cols-2 gap-2 font-mono text-sm`,children:[(0,o.jsxs)(`label`,{className:`flex items-center gap-2`,children:[(0,o.jsxs)(`span`,{className:`w-20`,children:[`rx: `,e]}),(0,o.jsx)(`input`,{type:`range`,min:1,max:20,value:e,onChange:e=>t(Number(e.target.value))})]}),(0,o.jsxs)(`label`,{className:`flex items-center gap-2`,children:[(0,o.jsxs)(`span`,{className:`w-20`,children:[`ry: `,n]}),(0,o.jsx)(`input`,{type:`range`,min:1,max:20,value:n,onChange:e=>r(Number(e.target.value))})]}),(0,o.jsxs)(`label`,{className:`flex items-center gap-2 col-span-2`,children:[(0,o.jsxs)(`span`,{className:`w-24`,children:[`rotation: `,i,`°`]}),(0,o.jsx)(`input`,{type:`range`,min:0,max:180,value:i,onChange:e=>l(Number(e.target.value))})]}),(0,o.jsxs)(`label`,{className:`flex items-center gap-2`,children:[(0,o.jsx)(`input`,{type:`checkbox`,checked:u===1,onChange:e=>d(+!!e.target.checked)}),(0,o.jsxs)(`span`,{children:[`large-arc-flag (`,u,`)`]})]}),(0,o.jsxs)(`label`,{className:`flex items-center gap-2`,children:[(0,o.jsx)(`input`,{type:`checkbox`,checked:f===1,onChange:e=>p(+!!e.target.checked)}),(0,o.jsxs)(`span`,{children:[`sweep-flag (`,f,`)`]})]})]})]})}var u=t({default:()=>p,frontmatter:()=>d}),d={title:`Arcs, the elliptical curve with seven parameters`,sourceUrl:`https://courses.joshwcomeau.com/wham/02-svg/03.02-arc`,lessonNumber:`02-svg/03.02-arc`,order:3.02,summary:`A 指令需要 7 個參數：rx ry rotation large-arc-flag sweep-flag end-x end-y。瀏覽器拿 rx/ry 算出一個虛擬橢圓，連接起點到終點。large-arc-flag 選短路或長路、sweep-flag 選兩個可能橢圓的哪一個。`,tags:[`svg`,`path`,`arc`,`ellipse`]};function f(e){let t={code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components},{DemoFrame:n}=t;return n||m(`DemoFrame`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`TL;DR`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`A rx,ry rotation large-arc-flag sweep-flag end-x,end-y`}),` — 7 個參數，少一個都不行。起點繼承自前一個指令。`]}),`
`,(0,o.jsxs)(t.li,{children:[`跟 `,(0,o.jsx)(t.code,{children:`<ellipse>`}),` 用「中心點 + 半徑」定位完全相反，arc 給「起點 + 終點」，瀏覽器`,(0,o.jsx)(t.strong,{children:`反推`}),`一個能連接兩點的虛擬橢圓。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`rx`}),` / `,(0,o.jsx)(t.code,{children:`ry`}),` 是虛擬橢圓的橫向、縱向半徑。半徑越小 → 橢圓越小 → 弧越深；半徑大到弧近乎直線。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`large-arc-flag`}),` (0/1) — 任兩點之間有兩條路徑（短路、長路），這個 flag 選哪一條。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`sweep-flag`}),` (0/1) — 半徑比兩點距離大時，會有兩個可能的橢圓，這個 flag 選哪一個。0 = counter-clockwise、1 = clockwise（從起點到終點的繪製方向）。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`rotation`}),` 旋轉虛擬橢圓本身（不影響圓形 arc，因為圓旋轉沒視覺差別）。實務上幾乎不用。`]}),`
`]}),`
`,(0,o.jsx)(n,{title:`拖 7 個 knobs 體會 arc 怎麼被定義`,children:(0,o.jsx)(l,{})}),`
`,(0,o.jsx)(t.h2,{children:`為什麼 arc 不能直接用 ellipse 中心點`}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:`<ellipse cx cy rx ry>`}),` 給中心點，畫整個橢圓。但 path 的設計是「flowing sequence」，每個指令的起點繼承前一個指令的終點 — 你只能告訴 arc「終點在哪」，不能告訴它「中心在哪」（不然中心點會跟前一個指令的位置不連續）。`]}),`
`,(0,o.jsxs)(t.p,{children:[`所以 SVG 的選擇是：給起點 + 終點 + 虛擬橢圓的形狀（rx, ry, rotation），瀏覽器自己算出`,(0,o.jsx)(t.strong,{children:`符合條件的橢圓位置`}),`，再從中切出連接兩點的那段弧。`]}),`
`,(0,o.jsx)(t.p,{children:`代價是兩個 ambiguity：`}),`
`,(0,o.jsxs)(t.ol,{children:[`
`,(0,o.jsxs)(t.li,{children:[`同一橢圓上連接兩點有兩條路 → `,(0,o.jsx)(t.code,{children:`large-arc-flag`}),` 選`]}),`
`,(0,o.jsxs)(t.li,{children:[`半徑夠大時，能 fit 的橢圓有兩個（鏡像對稱）→ `,(0,o.jsx)(t.code,{children:`sweep-flag`}),` 選`]}),`
`]}),`
`,(0,o.jsx)(t.h2,{children:`large-arc-flag: 短路 vs 長路`}),`
`,(0,o.jsx)(t.p,{children:`虛擬橢圓上連接 A 跟 B 有兩條弧線：往一邊繞 60° 的短路，往另一邊繞 300° 的長路。`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-svg`,children:`<path d="M 5,5 A 5,5 0 0 0 11,11" />  <!-- 短路 -->
<path d="M 5,5 A 5,5 0 1 0 11,11" />  <!-- 長路 -->
`})}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:`large-arc-flag`}),` 是 binary：0 短、1 長。Demo 裡 toggle 就會看到弧從淺變深、繞遠路。`]}),`
`,(0,o.jsx)(t.p,{children:`兩條路長度剛好一樣（半圓的情況）時這 flag 沒差。`}),`
`,(0,o.jsx)(t.h2,{children:`sweep-flag: 順時鐘 vs 逆時鐘`}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:`rx`}),` / `,(0,o.jsx)(t.code,{children:`ry`}),` 比「起點到終點直線距離」大時，能塞進去的橢圓有兩個（左右鏡像）。`,(0,o.jsx)(t.code,{children:`sweep-flag`}),` 選哪一個：`]}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`0`}),` — counter-clockwise（從起點到終點繞「逆時鐘」方向）`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`1`}),` — clockwise（順時鐘）`]}),`
`]}),`
`,(0,o.jsx)(t.p,{children:`Demo 裡半徑開大（rx=10、ry=10）然後 toggle sweep-flag，會看到弧的「凸方向」從一邊翻到另一邊。`}),`
`,(0,o.jsx)(t.h2,{children:`rx, ry 的「半徑越小弧越深」`}),`
`,(0,o.jsx)(t.p,{children:`直覺像把球壓進桌洞裡：`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:`高爾夫球（小半徑）→ 球大半浸在洞下 → 弧很深`}),`
`,(0,o.jsx)(t.li,{children:`棒球（中半徑）→ 球一半浸 → 弧中等`}),`
`,(0,o.jsx)(t.li,{children:`保齡球（大半徑）→ 球幾乎不浸 → 弧近乎直線`}),`
`]}),`
`,(0,o.jsxs)(t.p,{children:[`數學上：`,(0,o.jsx)(t.code,{children:`rx`}),`、`,(0,o.jsx)(t.code,{children:`ry`}),` 越小，能 fit 的虛擬橢圓越緊靠兩端點，弧曲率越大。`]}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:`rx`}),` < 兩點距離的一半 時 spec 規定瀏覽器自動 scale up `,(0,o.jsx)(t.code,{children:`rx`}),` 跟 `,(0,o.jsx)(t.code,{children:`ry`}),`（保持比例），確保 arc 永遠畫得出來。所以不會因為「半徑太小」報錯，只會被 silently 修正。`]}),`
`,(0,o.jsx)(t.h2,{children:`rotation 在圓形 arc 沒效`}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:`rx == ry`}),` 時整個虛擬橢圓是圓，旋轉一個圓在視覺上沒變化 — 所以 rotation 對圓形 arc 是 noop。`]}),`
`,(0,o.jsxs)(t.p,{children:[`只有橢圓 arc（`,(0,o.jsx)(t.code,{children:`rx ≠ ry`}),`）才看得出 rotation 效果：原本水平 rx、垂直 ry 的橢圓，旋轉 45° 後 rx 走斜對角、ry 走另一斜對角，弧的形狀也跟著轉。`]}),`
`,(0,o.jsxs)(t.p,{children:[`實務上幾乎不用 — Comeau 自己也說「我從沒用過這個參數」。整個 path 想旋轉的話用 CSS `,(0,o.jsx)(t.code,{children:`transform: rotate()`}),` 對整個 SVG 元素旋轉比較直觀。`]}),`
`,(0,o.jsx)(t.h2,{children:`完整參考`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{children:`M [start-x],[start-y]
A [rx],[ry] [rotation] [large-arc-flag] [sweep-flag] [end-x],[end-y]
`})}),`
`,(0,o.jsxs)(t.table,{children:[(0,o.jsx)(t.thead,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.th,{children:`參數`}),(0,o.jsx)(t.th,{children:`意義`}),(0,o.jsx)(t.th,{children:`常用值`})]})}),(0,o.jsxs)(t.tbody,{children:[(0,o.jsxs)(t.tr,{children:[(0,o.jsxs)(t.td,{children:[(0,o.jsx)(t.code,{children:`rx`}),`, `,(0,o.jsx)(t.code,{children:`ry`})]}),(0,o.jsx)(t.td,{children:`虛擬橢圓的橫/縱半徑`}),(0,o.jsx)(t.td,{children:`跟兩點距離同尺度`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:`rotation`})}),(0,o.jsx)(t.td,{children:`旋轉虛擬橢圓（degree）`}),(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:`0`})})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:`large-arc-flag`})}),(0,o.jsx)(t.td,{children:`0=短路、1=長路`}),(0,o.jsxs)(t.td,{children:[`通常 `,(0,o.jsx)(t.code,{children:`0`})]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:`sweep-flag`})}),(0,o.jsx)(t.td,{children:`0=逆時鐘、1=順時鐘`}),(0,o.jsx)(t.td,{children:`看設計需求`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsxs)(t.td,{children:[(0,o.jsx)(t.code,{children:`end-x`}),`, `,(0,o.jsx)(t.code,{children:`end-y`})]}),(0,o.jsx)(t.td,{children:`弧的終點`}),(0,o.jsx)(t.td,{children:`—`})]})]})]}),`
`,(0,o.jsx)(t.h2,{children:`Gotchas`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`7 個參數一個都不能少`}),`。`,(0,o.jsx)(t.code,{children:`A 5,5 0 0 0 11,11`}),` — 即使不用 rotation 也要寫 `,(0,o.jsx)(t.code,{children:`0`}),`。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`flag 是 binary 0/1`}),`，不是 true/false。寫成 `,(0,o.jsx)(t.code,{children:`A 5,5 0 false 0 11,11`}),` parse 失敗。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`參數可以用空白或逗號分隔`}),`，但 flag 跟後面的數字之間最好有空白：`,(0,o.jsx)(t.code,{children:`A5,5,0,0,0,11,11`}),` parser 會困惑（無法判斷 `,(0,o.jsx)(t.code,{children:`0011`}),` 是兩個 flag 還是一個數字）。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsxs)(t.strong,{children:[(0,o.jsx)(t.code,{children:`getTotalLength()`}),` 對 arc 的長度計算是近似值`]}),`。需要精確路徑長度（self-drawing trick）時要實測，pathLength attribute 設個 round number 反而比較好控制。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`動畫 d attribute 時 arc 的 flag 不能 tween`}),` — 只有數字 (rx, ry, rotation, end-x, end-y) 能 interpolate。改 flag 會直接跳。`]}),`
`]})]})}function p(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(f,{...e})}):f(e)}function m(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as n,u as t};