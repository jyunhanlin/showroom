import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{i as n,n as r,r as i}from"./lib-BI_-S7V4.js";var a=e(n(),1),o=i(),s=`oklch(0.9 0.3 164)`,c=`oklch(0.7 0.2 30)`;function l(){let[e,t]=(0,a.useState)(!0),n=e?`M 4,4 Q 4,10 8,8 T 12,12`:`M 4,4 Q 4,10 8,8 Q 14,0 12,12`;return(0,o.jsxs)(`div`,{className:`mx-auto flex w-fit flex-col items-center gap-3`,children:[(0,o.jsxs)(`svg`,{viewBox:`0 0 16 16`,width:300,height:300,className:`block rounded-md bg-slate-900`,children:[(0,o.jsx)(`path`,{d:n,fill:`none`,stroke:s,strokeWidth:`0.4`,strokeLinecap:`round`}),(0,o.jsx)(`circle`,{cx:`8`,cy:`8`,r:`0.4`,fill:e?s:c}),(0,o.jsx)(`circle`,{cx:`4`,cy:`4`,r:`0.3`,fill:s}),(0,o.jsx)(`circle`,{cx:`12`,cy:`12`,r:`0.3`,fill:s})]}),(0,o.jsx)(`pre`,{className:`rounded bg-slate-100 p-2 font-mono text-xs`,children:n}),(0,o.jsxs)(`label`,{className:`flex items-center gap-2 font-mono text-sm`,children:[(0,o.jsx)(`input`,{type:`checkbox`,checked:e,onChange:e=>t(e.target.checked)}),(0,o.jsx)(`span`,{children:`use T (smooth) instead of Q — uncheck to see the elbow`})]})]})}var u=t({default:()=>p,frontmatter:()=>d}),d={title:`Syntactic Sugar, the optional path commands`,sourceUrl:`https://courses.joshwcomeau.com/wham/02-svg/03.05-sugar`,lessonNumber:`02-svg/03.05-sugar`,order:3.05,summary:`小寫 = 相對位置、H/V = 水平垂直線、implied L = 連續座標當作 L、T/S = 自動鏡射前一個 Bezier control point 達到平滑連接。日常自己寫 path 用大寫絕對；T/S 對連串曲線真的有用。`,tags:[`svg`,`path`,`syntactic-sugar`,`smooth-bezier`]};function f(e){let t={code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...r(),...e.components},{DemoFrame:n}=t;return n||m(`DemoFrame`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`TL;DR`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`小寫 = 相對座標`}),`：`,(0,o.jsx)(t.code,{children:`l 12,12`}),` 從前一個位置往右下移 12,12。整段 path 變成可平移（改起點 M 後面其他點跟著走）。日常極少用。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`H / V`}),`：水平線、垂直線，只接 1 個數字。`,(0,o.jsx)(t.code,{children:`M 4,4 H 12 V 10`}),` 等於 `,(0,o.jsx)(t.code,{children:`M 4,4 L 12,4 L 12,10`}),`。多兩個指令心智負擔，省一個座標數字 — 通常不划算。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`Implied L`}),`：M 後面連續座標自動當 L。`,(0,o.jsx)(t.code,{children:`M 4,4 12,4 12,10`}),` 跟 `,(0,o.jsx)(t.code,{children:`M 4,4 L 12,4 L 12,10`}),` 一樣。Figma export 用這個壓 size，閱讀時很反直覺。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`T (smooth quadratic) / S (smooth cubic)`}),`：自動鏡射前一個 Q/C 的 control point，讓兩條曲線無縫連接（沒 elbow）。`,(0,o.jsx)(t.strong,{children:`真的有用`}),` — 連串 Bezier 沒它幾乎不可能順。`]}),`
`]}),`
`,(0,o.jsx)(n,{title:`Q→Q 有 elbow，Q→T 無縫平滑`,children:(0,o.jsx)(l,{})}),`
`,(0,o.jsx)(t.h2,{children:`大寫 vs 小寫的差別`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-svg`,children:`<path d="M 4,4 L 12,12" />  <!-- 絕對：終點 (12, 12) -->
<path d="M 4,4 l 12,12" />  <!-- 相對：終點 (4+12, 4+12) = (16, 16) -->
`})}),`
`,(0,o.jsx)(t.p,{children:`小寫指令用前一個位置當原點重新偏移。整條 path 改用相對指令後，移動 path 起點 M 即可整體平移：`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-svg`,children:`<path d="M 0,0 l 12,0 l 0,12 l -12,0 z" />  <!-- 起點移到 (5,5) 整個 path 跟著走 -->
`})}),`
`,(0,o.jsxs)(t.p,{children:[`實務上更常用 CSS `,(0,o.jsx)(t.code,{children:`transform: translate()`}),` 對整個 SVG 元素移位，不是改 path 內部用相對指令 — 後者牽一髮動全身但維持比較難。`]}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:`例外`}),`：相對指令有效的場合是 procedural 生成 path（演算法產出一連串相同 shape），把每個 shape 寫成相對 → 重複貼上即可。日常手寫一律大寫絕對。`]}),`
`,(0,o.jsx)(t.h2,{children:`H / V — 不值得的省略`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-svg`,children:`<path d="M 4,4 H 12 V 10" />     <!-- 4 個 token -->
<path d="M 4,4 L 12,4 L 12,10" /> <!-- 6 個 token -->
`})}),`
`,(0,o.jsx)(t.p,{children:`H / V 只接 1 個數字（缺的座標從前一個指令繼承），看似省 token。但：`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:`閱讀時要記住「H 之後缺 y、V 之後缺 x」，多一層心智轉換`}),`
`,(0,o.jsx)(t.li,{children:`跟 L 寫法不一致，指令種類膨脹`}),`
`,(0,o.jsx)(t.li,{children:`gzip 後 size 差距 ~0`}),`
`]}),`
`,(0,o.jsx)(t.p,{children:`Josh 自己也說「我設計 path syntax 不會放這兩個」。Figma export 會用，看到知道意思即可。`}),`
`,(0,o.jsx)(t.h2,{children:`Implied L — Figma 風格`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-svg`,children:`<path d="M 4,4 12,4 12,10" />  <!-- M 後面的連續座標被當 L -->
`})}),`
`,(0,o.jsx)(t.p,{children:`省略連續 L 字母。可讀性差但 size 緊湊，Figma / Adobe export 常見。手寫不要這樣。`}),`
`,(0,o.jsx)(t.h2,{children:`T 跟 S 真的有用`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-svg`,children:`<!-- 兩條 Q 串接會有 elbow（彎折點不平滑） -->
<path d="M 4,4 Q 4,10 8,8 Q 14,0 12,12" />

<!-- T 自動鏡射前一個 Q 的 control point -->
<path d="M 4,4 Q 4,10 8,8 T 12,12" />
`})}),`
`,(0,o.jsx)(t.p,{children:`第一條 path 在 (8, 8) 那個交界點會有可見折角，因為兩條 Q 的 control points 沒對齊。`}),`
`,(0,o.jsx)(t.p,{children:`第二條用 T (smooth quadratic)：`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:`T 不接 control point，只接終點`}),`
`,(0,o.jsxs)(t.li,{children:[`瀏覽器自動把前一個 Q 的 control point `,(0,o.jsx)(t.strong,{children:`鏡射`}),`到當前位置 (8, 8) 的另一邊當作 T 的隱式 control point`]}),`
`,(0,o.jsx)(t.li,{children:`結果兩條曲線在 (8, 8) 切線方向一致 → 平滑`}),`
`]}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:`S`}),` 對 cubic Bezier (`,(0,o.jsx)(t.code,{children:`C`}),`) 同樣作用 — 鏡射前一個 C 的`,(0,o.jsx)(t.strong,{children:`第二個`}),` control point（離當前位置最近那個）。`]}),`
`,(0,o.jsx)(t.p,{children:`實務：`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:`設計連續流暢曲線（手繪 swoop、ribbon、字體輪廓）必用 T/S`}),`
`,(0,o.jsxs)(t.li,{children:[`可以寫 `,(0,o.jsx)(t.code,{children:`Q ... T ... T ... T ...`}),` 串一長段平滑曲線，只在第一個 Q 寫 control point`]}),`
`,(0,o.jsx)(t.li,{children:`但 Josh 說「複雜曲線用 Figma 畫比手寫 path 容易」，超過 3 個 T/S 串接時建議切到 GUI 工具`}),`
`]}),`
`,(0,o.jsx)(t.h2,{children:`Gotchas`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`case-sensitive`}),`：`,(0,o.jsx)(t.code,{children:`L`}),` 跟 `,(0,o.jsx)(t.code,{children:`l`}),` 是不同指令。混用很容易 typo。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`T 跟 S 必須跟在 Q 或 C 之後`}),`才能鏡射。直接寫 `,(0,o.jsx)(t.code,{children:`M 0,0 T 10,10`}),` 沒前一個 Q 可鏡射，瀏覽器把缺失的 control point 當作前一個位置 → 退化成直線。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`小寫 m 在 path 開頭跟大寫 M 一樣`}),`（沒前一個位置可相對）。Josh 說「不要寫 m 起手」維持一致性。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`Path minifier (svgo 之類)`}),` 預設會把大寫換小寫、加 implied L、用 H/V 之類縮短 size。手寫時別跟它對齊；optimize 階段讓工具處理。`]}),`
`]})]})}function p(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(f,{...e})}):f(e)}function m(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as n,d as t};