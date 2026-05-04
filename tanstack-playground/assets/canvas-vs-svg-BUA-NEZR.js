import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{n as t,r as n}from"./lib-BI_-S7V4.js";var r=e({default:()=>s,frontmatter:()=>a}),i=n(),a={title:`Canvas vs. SVG`,sourceUrl:`https://courses.joshwcomeau.com/wham/04-canvas/03-canvas-vs-svg`,lessonNumber:`04-canvas/03-canvas-vs-svg`,order:3,summary:`Raster vs vector 是兩條完全不同的 rendering 路線。SVG = 向量 DOM，每個形狀是一個 element，瀏覽器可以無限放大、a11y 友善、hit-test 免費；Canvas = imperative pixel buffer，畫完就只剩像素，量大 (>10k particles) 才跑得動。`,tags:[`canvas`,`svg`,`raster`,`vector`,`decision`,`a11y`]};function o(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h2,{children:`TL;DR`}),`
`,(0,i.jsxs)(n.ul,{children:[`
`,(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:`SVG`}),` = vector DOM。每個形狀是 `,(0,i.jsx)(n.code,{children:`<circle>`}),` / `,(0,i.jsx)(n.code,{children:`<path>`}),` element，瀏覽器自動處理放大不糊、a11y、hit-test、CSS 動畫。代價:DOM element 多 (>幾千) 開始卡。`]}),`
`,(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:`Canvas`}),` = raster pixel buffer。畫完就只剩 RGBA 像素，沒 DOM、沒 hit-test、沒 a11y。代價低、能跑數萬 particle。`]}),`
`,(0,i.jsxs)(n.li,{children:[`決策原則:`,(0,i.jsx)(n.strong,{children:`有限數量 + 需要互動 / 要 a11y / 要 print → SVG`}),`；`,(0,i.jsx)(n.strong,{children:`動畫密集 / 元素超多 / 像素級效果 (blur / shader / pixel manipulation) → Canvas`}),`。`]}),`
`]}),`
`,(0,i.jsx)(n.h2,{children:`Raster vs vector，30 秒`}),`
`,(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{}),(0,i.jsx)(n.th,{children:`Raster`}),(0,i.jsx)(n.th,{children:`Vector`})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:`儲存單位`}),(0,i.jsx)(n.td,{children:`pixel grid`}),(0,i.jsx)(n.td,{children:`數學描述 (path / shape)`})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:`放大`}),(0,i.jsx)(n.td,{children:`糊 (內插)`}),(0,i.jsx)(n.td,{children:`銳利 (重新 rasterize)`})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:`檔案大小`}),(0,i.jsx)(n.td,{children:`∝ pixel 數`}),(0,i.jsx)(n.td,{children:`∝ shape 複雜度`})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:`例`}),(0,i.jsx)(n.td,{children:`PNG / JPEG / Canvas`}),(0,i.jsx)(n.td,{children:`SVG / Font / PDF`})]})]})]}),`
`,(0,i.jsxs)(n.p,{children:[`向量在輸出時還是要 rasterize 成 pixel — 但因為描述是數學的，每次能用當前的 device DPR 重新 raster 出最銳利的版本。canvas 的 bitmap 一旦寫成 pixel 就固定了，放大只能 bilinear (見 `,(0,i.jsx)(n.a,{href:`/wham/canvas-animation/pixel-ratio`,children:`Pixel Ratio`}),`)。`]}),`
`,(0,i.jsx)(n.h2,{children:`Decision matrix`}),`
`,(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:`維度`}),(0,i.jsx)(n.th,{children:`SVG`}),(0,i.jsx)(n.th,{children:`Canvas`})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.strong,{children:`元素數量`})}),(0,i.jsx)(n.td,{children:`< 幾千`}),(0,i.jsx)(n.td,{children:`幾萬都 OK`})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.strong,{children:`解析度獨立`})}),(0,i.jsx)(n.td,{children:`✅ 自動跟著 DPR / zoom`}),(0,i.jsx)(n.td,{children:`⚠️ 要自己 setupCanvas`})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.strong,{children:`A11y / SEO`})}),(0,i.jsxs)(n.td,{children:[`✅ DOM 可讀，可加 `,(0,i.jsx)(n.code,{children:`role`}),` / `,(0,i.jsx)(n.code,{children:`aria-label`})]}),(0,i.jsxs)(n.td,{children:[`❌ 對 screen reader 是黑盒，要 fallback `,(0,i.jsx)(n.code,{children:`<canvas>`}),` 子元素`]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.strong,{children:`Hit-testing (click / hover)`})}),(0,i.jsx)(n.td,{children:`✅ 免費 (DOM event)`}),(0,i.jsx)(n.td,{children:`❌ 自己算 (point-in-rect / point-in-circle)`})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.strong,{children:`CSS 動畫 / hover`})}),(0,i.jsxs)(n.td,{children:[`✅ 直接套 `,(0,i.jsx)(n.code,{children:`:hover { fill: red }`})]}),(0,i.jsx)(n.td,{children:`❌ 要重畫 frame`})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.strong,{children:`Pixel-level 效果`})}),(0,i.jsx)(n.td,{children:`⚠️ filter / mask 可以但慢`}),(0,i.jsxs)(n.td,{children:[`✅ blur / blend / shader / `,(0,i.jsx)(n.code,{children:`getImageData`})]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.strong,{children:`匯出 PDF / 印刷`})}),(0,i.jsx)(n.td,{children:`✅ 向量`}),(0,i.jsx)(n.td,{children:`❌ Raster`})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.strong,{children:`Server-side render`})}),(0,i.jsx)(n.td,{children:`✅ HTML 一部分`}),(0,i.jsx)(n.td,{children:`❌ 需要 headless browser`})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.strong,{children:`Bundle / DOM cost`})}),(0,i.jsx)(n.td,{children:`DOM tree 增大`}),(0,i.jsxs)(n.td,{children:[`一個 `,(0,i.jsx)(n.code,{children:`<canvas>`}),` element`]})]})]})]}),`
`,(0,i.jsx)(n.h2,{children:`When SVG wins`}),`
`,(0,i.jsxs)(n.ul,{children:[`
`,(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:`互動式圖表`}),` (D3 體系):每個 bar / dot 是 element，可以 hover / click / a11y 標籤 / CSS transition。`]}),`
`,(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:`icon / illustration`}),`:無限縮放，跟系統字級放在一起不會糊。`]}),`
`,(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:`動態 UI badges / loading spinner`}),`:< 幾十個 element，CSS 動畫直接搞定。`]}),`
`,(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:`要列印或匯出 PDF 的東西`}),`:報表、設計工具輸出。`]}),`
`,(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:`需要無障礙的東西`}),`:政府 / 金融 / 教育類 web app，screen reader 要能讀懂圖。`]}),`
`]}),`
`,(0,i.jsx)(n.h2,{children:`When Canvas wins`}),`
`,(0,i.jsxs)(n.ul,{children:[`
`,(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:`粒子系統`}),` (`,(0,i.jsx)(n.a,{href:`/wham/canvas-animation/rocketship`,children:`rocketship`}),`、`,(0,i.jsx)(n.a,{href:`/wham/canvas-animation/fireworks`,children:`fireworks`}),`、`,(0,i.jsx)(n.a,{href:`/wham/canvas-animation/trails`,children:`trails`}),`):同時跑幾百到幾萬 particle，SVG DOM 直接卡。`]}),`
`,(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:`Pixel manipulation`}),`:image filter、generative art、shader 風格 (canvas 2D + `,(0,i.jsx)(n.code,{children:`getImageData`}),` 或 WebGL)。`]}),`
`,(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:`連續 raster 效果`}),`:`,(0,i.jsx)(n.a,{href:`/wham/canvas-animation/trails`,children:`trails`}),` 半透明覆蓋疊出尾跡，SVG 沒對應 idiom。`]}),`
`,(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:`遊戲 / 高密度 animation loop`}),`:每幀重畫整個畫面比改 DOM 屬性快很多。`]}),`
`,(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:`數據視覺化大量點`}),`:scatter plot 幾萬點，canvas 流暢；SVG 死當。`]}),`
`]}),`
`,(0,i.jsx)(n.h2,{children:`Mixed approach 也常見`}),`
`,(0,i.jsx)(n.p,{children:`實務上不一定二選一:`}),`
`,(0,i.jsxs)(n.ul,{children:[`
`,(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:`SVG 包 canvas`}),`:整個 layout 用 SVG (軸、標籤、互動標記)，密集資料層用 `,(0,i.jsx)(n.code,{children:`<foreignObject>`}),` 包一個 `,(0,i.jsx)(n.code,{children:`<canvas>`}),` 畫粒子。`]}),`
`,(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:`Canvas + DOM overlay`}),`:canvas 畫主視覺，hover label / tooltip 用一般 DOM 絕對定位疊上去 — 拿到 a11y、保留 canvas 性能。`]}),`
`,(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:`Canvas raster export from SVG`}),`:設計用 SVG 編輯，輸出時 `,(0,i.jsx)(n.code,{children:`drawImage(svgImage, ...)`}),` rasterize 成 PNG。`]}),`
`]}),`
`,(0,i.jsx)(n.h2,{children:`Heuristic`}),`
`,(0,i.jsx)(n.p,{children:`決定不下來就問:「這個畫面元素的『身份』需要被 DOM 認得嗎？」`}),`
`,(0,i.jsxs)(n.ul,{children:[`
`,(0,i.jsxs)(n.li,{children:[`需要 (hover / click / 讀出來 / CSS 動 / a11y) → `,(0,i.jsx)(n.strong,{children:`SVG`})]}),`
`,(0,i.jsxs)(n.li,{children:[`不需要 (純視覺、動就好) → `,(0,i.jsx)(n.strong,{children:`Canvas`})]}),`
`]}),`
`,(0,i.jsx)(n.p,{children:`「有限數量、有意義」靠 SVG；「大量、純視覺」靠 Canvas。Whimsical animation 偏 Canvas 是因為動畫密度高、互動需求低、視覺密度才是重點。`})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(o,{...e})}):o(e)}export{a as n,r as t};