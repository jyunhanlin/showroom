import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{i as n,n as r,r as i}from"./lib-BI_-S7V4.js";var a=e(n(),1),o=i(),s=`oklch(0.75 0.18 280)`,c=`oklch(0.75 0.18 30)`,l=`oklch(0.75 0.18 140)`,u=320,d=100;function f(){let[e,t]=(0,a.useState)(45),[n,r]=(0,a.useState)(d),i=e*Math.PI/180,f=Math.cos(i)*n,p=Math.sin(i)*n,m=u/2,h=u/2,g=m+f,_=h+p;return(0,o.jsxs)(`div`,{className:`flex flex-col items-center gap-3`,children:[(0,o.jsxs)(`svg`,{viewBox:`0 0 ${u} ${u}`,width:u,height:u,className:`rounded-md bg-slate-900`,children:[(0,o.jsx)(`line`,{x1:`0`,y1:h,x2:u,y2:h,stroke:`oklch(0.4 0 0)`,strokeWidth:`0.5`}),(0,o.jsx)(`line`,{x1:m,y1:`0`,x2:m,y2:u,stroke:`oklch(0.4 0 0)`,strokeWidth:`0.5`}),(0,o.jsx)(`circle`,{cx:m,cy:h,r:d,fill:`none`,stroke:`oklch(0.45 0 0)`,strokeWidth:`0.5`,strokeDasharray:`2 3`}),(0,o.jsx)(`line`,{x1:m,y1:h,x2:g,y2:h,stroke:c,strokeWidth:`2`}),(0,o.jsx)(`line`,{x1:g,y1:h,x2:g,y2:_,stroke:l,strokeWidth:`2`}),(0,o.jsx)(`line`,{x1:m,y1:h,x2:g,y2:_,stroke:s,strokeWidth:`2`}),(0,o.jsx)(`circle`,{cx:m,cy:h,r:`3`,fill:`white`}),(0,o.jsx)(`circle`,{cx:g,cy:_,r:`5`,fill:s}),(0,o.jsxs)(`text`,{x:m+f/2,y:h+14,fill:c,fontSize:`11`,textAnchor:`middle`,children:[`cos · `,n,` = `,f.toFixed(0)]}),(0,o.jsxs)(`text`,{x:g+(f>0?6:-6),y:h+p/2,fill:l,fontSize:`11`,textAnchor:f>0?`start`:`end`,children:[`sin · `,n,` = `,p.toFixed(0)]}),(0,o.jsxs)(`text`,{x:m+26,y:h-6,fill:`oklch(0.7 0 0)`,fontSize:`11`,children:[`θ = `,e,`°`]})]}),(0,o.jsxs)(`div`,{className:`grid w-full max-w-sm grid-cols-1 gap-2 font-mono text-sm`,children:[(0,o.jsxs)(`label`,{className:`flex items-center gap-3`,children:[(0,o.jsxs)(`span`,{className:`w-28`,children:[`angle: `,e,`°`]}),(0,o.jsx)(`input`,{type:`range`,min:0,max:360,value:e,onChange:e=>t(Number(e.target.value))})]}),(0,o.jsxs)(`label`,{className:`flex items-center gap-3`,children:[(0,o.jsxs)(`span`,{className:`w-28`,children:[`distance: `,n]}),(0,o.jsx)(`input`,{type:`range`,min:20,max:140,value:n,onChange:e=>r(Number(e.target.value))})]})]}),(0,o.jsxs)(`div`,{className:`rounded bg-slate-100 p-2 font-mono text-xs`,children:[`x = cos(`,e,`°) × `,n,` = `,f.toFixed(2),` `,(0,o.jsx)(`br`,{}),`y = sin(`,e,`°) × `,n,` = `,p.toFixed(2)]})]})}var p=t({default:()=>g,frontmatter:()=>m}),m={title:`Trigonometry 101, why cos/sin = x/y`,sourceUrl:`https://courses.joshwcomeau.com/wham/01-particles/07.01-trigonometry-101`,lessonNumber:`01-particles/07.01-trigonometry-101`,order:13,summary:`SOH CAH TOA 直觀化 — 把 angle + distance 拆成 x 軸位移(cos × 斜邊)和 y 軸位移(sin × 斜邊)。動拖動 slider 看比例怎麼變。`,tags:[`particles`,`math`,`trigonometry`]};function h(e){let t={code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...r(),...e.components},{DemoFrame:n}=t;return n||_(`DemoFrame`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`TL;DR`}),`
`,(0,o.jsxs)(t.p,{children:[`要把極座標 `,(0,o.jsx)(t.code,{children:`(angle, distance)`}),` 轉成 `,(0,o.jsx)(t.code,{children:`(x, y)`}),`,只記得這個就夠:`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{children:`x = cos(angle) × distance
y = sin(angle) × distance
`})}),`
`,(0,o.jsx)(t.p,{children:`不必背公式 — 看圖一次就懂。`}),`
`,(0,o.jsx)(n,{title:`unit-circle / right-triangle decomposition`,children:(0,o.jsx)(f,{})}),`
`,(0,o.jsxs)(t.p,{children:[`紫色斜線 = 長度 distance、跟 x 軸夾 θ 的向量。它在 x 軸的投影(紅)= `,(0,o.jsx)(t.code,{children:`cos(θ) × distance`}),`,在 y 軸的投影(綠)= `,(0,o.jsx)(t.code,{children:`sin(θ) × distance`}),`。`]}),`
`,(0,o.jsx)(t.h2,{children:`SOH CAH TOA`}),`
`,(0,o.jsx)(t.p,{children:`直角三角形三邊比例:`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`S`}),`OH:`,(0,o.jsx)(t.strong,{children:`S`}),`in(θ) = `,(0,o.jsx)(t.strong,{children:`O`}),`pposite / `,(0,o.jsx)(t.strong,{children:`H`}),`ypotenuse(對邊 / 斜邊)`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`C`}),`AH:`,(0,o.jsx)(t.strong,{children:`C`}),`os(θ) = `,(0,o.jsx)(t.strong,{children:`A`}),`djacent / `,(0,o.jsx)(t.strong,{children:`H`}),`ypotenuse(鄰邊 / 斜邊)`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`T`}),`OA:`,(0,o.jsx)(t.strong,{children:`T`}),`an(θ) = `,(0,o.jsx)(t.strong,{children:`O`}),`pposite / `,(0,o.jsx)(t.strong,{children:`A`}),`djacent(對邊 / 鄰邊)`]}),`
`]}),`
`,(0,o.jsxs)(t.p,{children:[`用力說一遍:`,(0,o.jsx)(t.strong,{children:`騷喀偷阿`}),`(SOH-CAH-TOA)。`]}),`
`,(0,o.jsx)(t.p,{children:`對 polar → cartesian 的場景,只用前兩條:`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:`斜邊 = distance(從原點到目標的長度)`}),`
`,(0,o.jsx)(t.li,{children:`鄰邊 = x 位移(沿水平線)`}),`
`,(0,o.jsx)(t.li,{children:`對邊 = y 位移(垂直於水平線)`}),`
`]}),`
`,(0,o.jsxs)(t.p,{children:[`代回去 → `,(0,o.jsx)(t.code,{children:`x = cos × distance`}),`、`,(0,o.jsx)(t.code,{children:`y = sin × distance`}),`。TAN 在這裡用不到。`]}),`
`,(0,o.jsx)(t.h2,{children:`為什麼 sin 對 y、cos 對 x`}),`
`,(0,o.jsx)(t.p,{children:`慣例。Math 的標準座標系把 0° 定義在「x 軸正方向」、逆時針為正。在這個慣例下:`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:`0° → 全部走 x 方向(cos = 1, sin = 0)`}),`
`,(0,o.jsx)(t.li,{children:`90° → 全部走 y 方向(cos = 0, sin = 1)`}),`
`,(0,o.jsx)(t.li,{children:`180° → x 反方向(cos = -1, sin = 0)`}),`
`]}),`
`,(0,o.jsxs)(t.p,{children:[`所以 `,(0,o.jsx)(t.code,{children:`cos`}),` 自然對 x、`,(0,o.jsx)(t.code,{children:`sin`}),` 自然對 y。`]}),`
`,(0,o.jsx)(t.h2,{children:`CSS 螢幕座標的小陷阱`}),`
`,(0,o.jsxs)(t.p,{children:[`CSS 的 y 軸方向跟數學課本相反 — `,(0,o.jsx)(t.strong,{children:`往下是正`}),`。所以 demo 裡 90° 的時候,粒子會往螢幕`,(0,o.jsx)(t.strong,{children:`下方`}),`(而不是上方)飛。`]}),`
`,(0,o.jsx)(t.p,{children:`如果你的設計中希望 0° 是「向上」、90° 是「向右」(像時鐘指針),要做兩件事:`}),`
`,(0,o.jsxs)(t.ol,{children:[`
`,(0,o.jsxs)(t.li,{children:[`把 angle 往逆時針偏 90°(`,(0,o.jsx)(t.code,{children:`angle - 90`}),`)`]}),`
`,(0,o.jsxs)(t.li,{children:[`或對 y 取負號(`,(0,o.jsx)(t.code,{children:`y = -sin(...) * distance`}),`)`]}),`
`]}),`
`,(0,o.jsxs)(t.p,{children:[`CSS 的 `,(0,o.jsx)(t.code,{children:`gradient`}),` / `,(0,o.jsx)(t.code,{children:`transform: rotate()`}),` 也是 0° = 向上、順時針 — 跟 Math 慣例相反。設計工具用什麼就跟著用什麼,別硬轉。`]}),`
`,(0,o.jsx)(t.h2,{children:`Gotchas`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsxs)(t.strong,{children:[(0,o.jsx)(t.code,{children:`Math.cos / sin`}),` 收 radians 不收 degrees`]}),`:`,(0,o.jsx)(t.code,{children:`Math.cos(45)`}),` 不是 0.707,要先 `,(0,o.jsx)(t.code,{children:`45 * Math.PI / 180`}),`。CSS 的 `,(0,o.jsx)(t.code,{children:`cos(45deg)`}),` 才會自動處理單位。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsxs)(t.strong,{children:[(0,o.jsx)(t.code,{children:`tan(90°)`}),` 是無限大`]}),`:鄰邊 = 0 不能除。寫 `,(0,o.jsx)(t.code,{children:`Math.tan(Math.PI / 2)`}),` 會吐出 `,(0,o.jsx)(t.code,{children:`1.633e16`}),` 之類的數,實務上等於壞掉。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`小角度誤差累積`}),`:重複用 cos/sin 算位置的迴圈動畫(像繞圈),浮點誤差會慢慢飄移。需要長期循環時改用「角度累加 + 每幀重算」而不是「上一個 x/y + 微小位移」。`]}),`
`]})]})}function g(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(h,{...e})}):h(e)}function _(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as n,m as t};