import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{i as n,n as r,r as i}from"./lib-BI_-S7V4.js";var a=e(n(),1),o=i(),s=[`intro`,`background`,`method`,`results`,`conclusion`];function c(){let e=(0,a.useRef)(null);function t(t){let n=e.current;n&&n.querySelector(`[data-section="${t}"]`)?.scrollIntoView({behavior:`smooth`,block:`start`})}return(0,o.jsxs)(`div`,{className:`flex flex-col items-center gap-3`,children:[(0,o.jsx)(`div`,{className:`flex flex-wrap gap-2`,children:s.map(e=>(0,o.jsxs)(`button`,{type:`button`,onClick:()=>t(e),className:`rounded bg-slate-800 px-3 py-1 font-mono text-xs text-white hover:bg-slate-700`,children:[`jump to `,e]},e))}),(0,o.jsx)(`div`,{ref:e,className:`h-72 w-full max-w-md overflow-y-auto rounded-md bg-slate-100 p-4`,style:{scrollBehavior:`smooth`},children:s.map(e=>(0,o.jsxs)(`section`,{"data-section":e,className:`mb-2 rounded-md bg-white p-6`,children:[(0,o.jsx)(`h3`,{className:`font-bold uppercase`,children:e}),(0,o.jsxs)(`p`,{className:`mt-2 text-sm text-gray-600`,children:[`這裡是 `,e,` section,使用 anchor 點擊跳轉。`]}),(0,o.jsx)(`div`,{className:`h-32`})]},e))}),(0,o.jsx)(`p`,{className:`text-xs text-gray-500`,children:"anchor jump 用 native `behavior: 'smooth'` 是合理應用 — 只是「點擊跳轉」這單一動作有過渡。整頁 scroll 仍正常。"})]})}var l=t({default:()=>f,frontmatter:()=>u}),u={title:`Smooth Scrolling, why Lenis-style libraries are scroll-jacking`,sourceUrl:`https://courses.joshwcomeau.com/wham/03-advanced-interactions/05.06-smooth-scrolling`,lessonNumber:`03-advanced-interactions/05.06-smooth-scrolling`,order:87,summary:"Lenis / GSAP ScrollSmoother 之類的庫把整頁的 scroll 物理重寫成「lerp 過去」 — 對 trackpad 使用者是降級體驗,對動暈症使用者是潛在誘發源。Josh 強烈反對。`scroll-behavior: smooth` 用在 anchor jump 是合理應用。",tags:[`advanced-interactions`,`scroll`,`scrolljacking`,`accessibility`,`opinion`]};function d(e){let t={code:`code`,h2:`h2`,li:`li`,p:`p`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components},{DemoFrame:n}=t;return n||p(`DemoFrame`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`TL;DR`}),`
`,(0,o.jsxs)(t.p,{children:[`Josh 對「整頁 smooth scrolling」的態度: `,(0,o.jsx)(t.strong,{children:`不要做`}),`。`]}),`
`,(0,o.jsx)(t.p,{children:`問題:`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`干擾使用者輸入`}),`:trackpad 使用者習慣兩指滑動 = 直接位移,跟拖紙片一樣即時。lerp scroll 把這個變成「滑了之後看到一段拖延的滑動」。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`不尊重 prefers-reduced-motion`}),`:Lenis 的 landing page 自己沒實作這個 query,任何動暈使用者都吃不到 fallback。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`設計師爽,使用者不爽`}),`:大多動機是「讓網站感覺高級」、「拿 awwwards」。代價是使用者失去對自己滾動軌跡的控制。`]}),`
`]}),`
`,(0,o.jsxs)(t.p,{children:[`合理應用只有一個:`,(0,o.jsx)(t.strong,{children:`anchor link 點擊`}),`用 `,(0,o.jsx)(t.code,{children:`scroll-behavior: smooth`}),`。這是「單一明確跳轉」的過渡,不是把每次滾動都改寫。`]}),`
`,(0,o.jsx)(n,{title:`legit use — anchor jump with native smooth scroll`,children:(0,o.jsx)(c,{})}),`
`,(0,o.jsxs)(t.p,{children:[`點 anchor 按鈕跳到對應段落。CSS `,(0,o.jsx)(t.code,{children:`scroll-behavior: smooth`}),` 處理過渡,trackpad / 滾輪 scroll 仍維持原生行為。`]}),`
`,(0,o.jsx)(t.h2,{children:`哪些算 Scrolljacking`}),`
`,(0,o.jsx)(t.p,{children:`灰色地帶有差異,但 Josh 的判斷標準是**「使用者用任何一種輸入方式 scroll,行為都跟其他網站一樣嗎?」**`}),`
`,(0,o.jsxs)(t.table,{children:[(0,o.jsx)(t.thead,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.th,{children:`行為`}),(0,o.jsx)(t.th,{children:`算 scrolljacking?`})]})}),(0,o.jsxs)(t.tbody,{children:[(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`整頁 lerp(Lenis、GSAP ScrollSmoother)`}),(0,o.jsx)(t.td,{children:`✅ 是`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`滑鼠滾輪被改寫成水平移動`}),(0,o.jsx)(t.td,{children:`✅ 是`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Scroll 觸發 sticky element(像 BBC 那種)`}),(0,o.jsx)(t.td,{children:`❌ 不是(整體仍正常 scroll)`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:`scroll-snap`})}),(0,o.jsx)(t.td,{children:`介於中間 — 有人覺得有,有人覺得 sane`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsxs)(t.td,{children:[(0,o.jsx)(t.code,{children:`scroll-behavior: smooth`}),` 在 anchor jump`]}),(0,o.jsx)(t.td,{children:`❌ 不是`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`自製 carousel 攔截滑鼠事件、無底頁面`}),(0,o.jsx)(t.td,{children:`✅ 是`})]})]})]}),`
`,(0,o.jsx)(t.h2,{children:`為什麼 trackpad 使用者特別痛`}),`
`,(0,o.jsx)(t.p,{children:`trackpad 已經有自己的物理:`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:`觸控起始 → 即時位移`}),`
`,(0,o.jsx)(t.li,{children:`釋放後慣性滑行`}),`
`,(0,o.jsx)(t.li,{children:`觸控停下 → 停止`}),`
`]}),`
`,(0,o.jsxs)(t.p,{children:[`Lenis 在這之上再疊一層 lerp,等於兩層慣性疊加。使用者抬手了之後,系統還在 lerp 自己想出來的目標位置。`,(0,o.jsx)(t.strong,{children:`精確 scroll 變不可能`}),`。`]}),`
`,(0,o.jsx)(t.p,{children:`對應的:滑鼠滾輪每次「咔噠」是離散的 N 像素位移。Lerp 把這些離散事件變成連續滑動,使用者以為的「我已經滾了 3 格」實際只滑了一半。`}),`
`,(0,o.jsx)(t.h2,{children:`A11y 的硬底線`}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:`prefers-reduced-motion`}),` 不是 polite request,是合規問題:`]}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:`動暈症(vestibular disorder)患者看到任何被人為延長的位移會誘發症狀。`}),`
`,(0,o.jsx)(t.li,{children:`ADHD / 自閉症光譜上的部分使用者會被視覺干擾打斷專注。`}),`
`,(0,o.jsx)(t.li,{children:`部分癲癇類型對視覺位移敏感。`}),`
`]}),`
`,(0,o.jsxs)(t.p,{children:[`任何「整頁感覺更滑順」的庫`,(0,o.jsx)(t.strong,{children:`必須`}),`在 `,(0,o.jsx)(t.code,{children:`prefers-reduced-motion: reduce`}),` 下退化成原生 scroll。Lenis 預設沒做,要自己 wrap 條件 init。`]}),`
`,(0,o.jsx)(t.h2,{children:`「老闆要我加上」怎辦`}),`
`,(0,o.jsx)(t.p,{children:`Josh 把這個比喻成「建築師應該拒絕業主要求拆掉欄杆」。實作端有專業判斷的責任。`}),`
`,(0,o.jsx)(t.p,{children:`實作建議:`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:`提出反例(老設備、touchscreen、a11y 場景)。`}),`
`,(0,o.jsx)(t.li,{children:`改建議「只在 anchor jump 時用 scroll-behavior: smooth」當妥協。`}),`
`,(0,o.jsxs)(t.li,{children:[`真要全頁 lerp 至少包 `,(0,o.jsx)(t.code,{children:`prefers-reduced-motion`}),` 檢查。`]}),`
`]}),`
`,(0,o.jsx)(t.h2,{children:`Gotchas`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsxs)(t.strong,{children:[(0,o.jsx)(t.code,{children:`scroll-behavior: smooth`}),` 用在 root`]}),` (`,(0,o.jsx)(t.code,{children:`html { scroll-behavior: smooth }`}),`) 會影響所有 anchor 跳轉跟 `,(0,o.jsx)(t.code,{children:`Element.scrollIntoView()`}),`。如果你只想要某個區塊內 anchor 平滑,寫在那個 scroller container 上就好。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:(0,o.jsx)(t.code,{children:`scrollIntoView({ behavior: 'smooth' })`})}),` 不可中斷:user 想停下 scroll 沒辦法。如果跳轉距離很長(幾千 px),user 會被劫持幾秒。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`iOS Safari 的 elastic bounce`}),` 跟 smooth scroll 互動奇怪 — 在 root 上設 `,(0,o.jsx)(t.code,{children:`scroll-behavior: smooth`}),` 配 elastic bounce 會出現 jitter。實測再上 production。`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsxs)(t.strong,{children:[(0,o.jsx)(t.code,{children:`scroll-snap`}),` 跟 `,(0,o.jsx)(t.code,{children:`prefers-reduced-motion`})]}),`:現代瀏覽器在 reduce 模式下會自動退化成 instant snap(不再平滑滑到 snap point),但 jitter 行為仍在。重度滾動內容慎用。`]}),`
`]})]})}function f(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}function p(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{l as n,u as t};