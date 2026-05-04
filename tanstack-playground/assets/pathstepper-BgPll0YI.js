import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{i as n,n as r,r as i}from"./lib-BI_-S7V4.js";var a=e(n(),1),o=i(),s=`oklch(0.9 0.3 164)`,c=`oklch(0.7 0.2 30)`,l=[{d:``,label:`(empty)`,endpoint:null},{d:`M 2,10`,label:`M 2,10 — 抬筆移到左下`,endpoint:{x:2,y:10}},{d:`M 2,10 L 14,10`,label:`L 14,10 — 畫帽子底邊`,endpoint:{x:14,y:10}},{d:`M 2,10 L 14,10 A 4,4 0 0 0 6,10`,label:`A 4,4 0 0 0 6,10 — 從 (14,10) 拉橢圓弧回 (6,10)`,endpoint:{x:6,y:10}}];function u(){let[e,t]=(0,a.useState)(l.length-1),n=l[e];return(0,o.jsxs)(`div`,{className:`mx-auto flex w-fit flex-col items-center gap-3`,children:[(0,o.jsxs)(`svg`,{viewBox:`0 0 16 16`,width:320,height:320,className:`block rounded-md bg-slate-900`,children:[n.d&&(0,o.jsx)(`path`,{d:n.d,fill:`none`,stroke:s,strokeWidth:`0.5`,strokeLinecap:`round`,strokeLinejoin:`round`}),n.endpoint&&(0,o.jsx)(`circle`,{cx:n.endpoint.x,cy:n.endpoint.y,r:`0.45`,fill:c})]}),(0,o.jsx)(`pre`,{className:`rounded bg-slate-100 p-2 font-mono text-xs`,children:n.d||`(empty)`}),(0,o.jsxs)(`div`,{className:`flex flex-col items-center gap-2`,children:[(0,o.jsxs)(`label`,{className:`flex items-center gap-3 font-mono text-sm`,children:[(0,o.jsxs)(`span`,{className:`w-32`,children:[`step: `,e,`/`,l.length-1]}),(0,o.jsx)(`input`,{type:`range`,min:0,max:l.length-1,value:e,onChange:e=>t(Number(e.target.value))})]}),(0,o.jsx)(`p`,{className:`text-sm text-gray-700`,children:n.label})]})]})}var d=t({default:()=>m,frontmatter:()=>f}),f={title:`PathStepper, parsing path syntax in your head`,sourceUrl:`https://courses.joshwcomeau.com/wham/02-svg/03.03-pathstepper`,lessonNumber:`02-svg/03.03-pathstepper`,order:10,summary:`課程在這節塞了一個 minigame 練習認 path syntax。我這裡用 baseball cap (M L A 三步) 做 step-through 示範，重點在「讀 path 字串時心中的腳本」— 從哪起、往哪畫、終點落在哪。`,tags:[`svg`,`path`,`syntax`,`parsing`]};function p(e){let t={code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...r(),...e.components},{DemoFrame:n}=t;return n||h(`DemoFrame`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`TL;DR`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:`課程這節是個 minigame（PathStepper），不會在筆記裡複刻 — 練習平台特定，不是技術概念。`}),`
`,(0,o.jsxs)(t.li,{children:[`真正能帶走的 takeaway：`,(0,o.jsx)(t.strong,{children:`讀 path 字串的心智腳本`}),`。每個指令在腦中走一次「從現在的位置 → 終點是哪 → 中間怎麼走」。`]}),`
`,(0,o.jsxs)(t.li,{children:[`Baseball cap 的 path 是個經典範例：`,(0,o.jsx)(t.code,{children:`M 2,10 L 14,10 A 4,4 0 0 0 6,10`}),` — 三個指令完成一頂帽子。`]}),`
`,(0,o.jsx)(t.li,{children:`心中讀法：「筆抬到左下 → 直線往右畫底邊 → 從右邊用半徑 4 的圓弧繞回左邊偏內側」。`}),`
`,(0,o.jsxs)(t.li,{children:[`Path 沒寫 `,(0,o.jsx)(t.code,{children:`Z`}),` 是因為帽子前緣不需要從 (6,10) 再連回 (2,10) — 那條會穿過底邊重畫。`]}),`
`]}),`
`,(0,o.jsx)(n,{title:`Baseball cap, three commands at a time`,children:(0,o.jsx)(u,{})}),`
`,(0,o.jsx)(t.h2,{children:`拆解 Cap 的 3 個指令`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-svg`,children:`<path d="
  M 2,10
  L 14,10
  A 4,4 0 0 0 6,10
"/>
`})}),`
`,(0,o.jsx)(t.p,{children:(0,o.jsxs)(t.strong,{children:[`Step 1: `,(0,o.jsx)(t.code,{children:`M 2,10`})]})}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:`抬筆移到 (2, 10)。SVG 的座標系 y 往下，所以 y=10 是中下方。`}),`
`,(0,o.jsx)(t.li,{children:`沒畫任何東西。`}),`
`]}),`
`,(0,o.jsx)(t.p,{children:(0,o.jsxs)(t.strong,{children:[`Step 2: `,(0,o.jsx)(t.code,{children:`L 14,10`})]})}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:`從 (2, 10) 畫直線到 (14, 10)。同一個 y、x 從 2 到 14 = 水平往右 12 單位。`}),`
`,(0,o.jsx)(t.li,{children:`帽子底邊完成。`}),`
`]}),`
`,(0,o.jsx)(t.p,{children:(0,o.jsxs)(t.strong,{children:[`Step 3: `,(0,o.jsx)(t.code,{children:`A 4,4 0 0 0 6,10`})]})}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:`從現在位置 (14, 10) 畫弧到 (6, 10)。`}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`rx=4`}),`、`,(0,o.jsx)(t.code,{children:`ry=4`}),` → 圓形 arc，半徑 4。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`rotation=0`}),` → 圓不需要旋轉。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`large-arc-flag=0`}),` → 走短路（不繞遠）。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`sweep-flag=0`}),` → 逆時鐘繪製（從右往左往上繞回左下偏內）。`]}),`
`,(0,o.jsx)(t.li,{children:`結果是個半圓罩在底邊上 — 帽冠。`}),`
`]}),`
`,(0,o.jsxs)(t.p,{children:[`從 (14, 10) 到 (6, 10) 距離是 8，半徑 4 剛好等於距離一半 → 唯一一個 fit 的圓 → sweep-flag 兩種值看起來會「翻轉」帽冠在底邊上面或下面。`,(0,o.jsx)(t.code,{children:`0`}),` 在上、`,(0,o.jsx)(t.code,{children:`1`}),` 在下。`]}),`
`,(0,o.jsx)(t.h2,{children:`讀 path 的心理腳本`}),`
`,(0,o.jsx)(t.p,{children:`實務上看到一段陌生的 SVG path，腦中的步驟：`}),`
`,(0,o.jsxs)(t.ol,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`找 M`}),` — 起點在哪？沒 M 就是無效 path`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`掃指令類型`}),` — 主要是 L、Q、C、A 還是混用？混用越多越複雜`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`追終點`}),` — 每個指令的終點 = 下一個指令的起點，沿著串走一遍位置`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`判斷是不是封閉`}),` — 結尾有 Z 嗎？fill 想呈現什麼形狀？`]}),`
`]}),`
`,(0,o.jsxs)(t.p,{children:[`熟練之後不需要每行細看，瞄一眼 M 跟 Z 就知道大概形狀。Figma export 的長 path 通常很難肉眼解析，這時依賴 `,(0,o.jsx)(t.code,{children:`getTotalLength()`}),` 跟 `,(0,o.jsx)(t.code,{children:`getPointAtLength()`}),` 之類 DOM API 抽取資訊比較實際。`]}),`
`,(0,o.jsx)(t.h2,{children:`Cap path 為什麼沒 Z`}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:`Z`}),` 會把當前位置跟 sub-path 起點 (2, 10) 連起來。但弧的終點是 (6, 10)，距離起點 (2, 10) 4 單位，連 Z 會在底邊上重畫一條 4 單位長的線 — 跟原本底邊重疊。`]}),`
`,(0,o.jsx)(t.p,{children:`不寫 Z 視覺上一樣（fill 自動補虛擬連線），且 stroke 不會在底邊有奇怪 overlay。實作 path 時記得「需不需要 Z」要看 stroke 預期效果，不是反射動作。`}),`
`,(0,o.jsx)(t.h2,{children:`Gotchas`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`這節只是 minigame，沒有新概念`}),`。心智模型已經在 paths / path-commands / arcs 三節建立完，直接跳過也沒差。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`看 minify 的 path 不要硬解`}),`。貼進線上 SVG path editor (yqnn.github.io/svg-path-editor 之類) 會幫你美化跟視覺化每個指令。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`path 內的座標可以負數或超出 viewBox`}),`。看到 `,(0,o.jsx)(t.code,{children:`M -100,500`}),` 別怕，只是落在 viewBox 外，照樣參與後續指令的計算。`]}),`
`]})]})}function m(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(p,{...e})}):p(e)}function h(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as n,f as t};