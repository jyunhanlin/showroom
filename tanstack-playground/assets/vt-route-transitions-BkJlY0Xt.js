import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{n as t,r as n}from"./lib-BI_-S7V4.js";import{d as r}from"./index-ZS0qdZgy.js";var i=e({default:()=>c,frontmatter:()=>o}),a=n(),o={title:`VT Cross-Document Transitions, page-to-page morph`,sourceUrl:`https://courses.joshwcomeau.com/wham/03-advanced-interactions/07.08-vt-route-transitions`,lessonNumber:`03-advanced-interactions/07.08-vt-route-transitions`,order:93,summary:"CSS 加 `@view-transition {`{` `}`navigation: auto{`}`}` ` 兩個頁面都寫,瀏覽器在 same-origin 連結點擊時自動 trigger VT。共用 `view-transition-name` 的元素會 morph(像 hero image 從 listing 飛到 detail)。傳統 multi-page site 也能玩。",tags:[`advanced-interactions`,`view-transitions`,`navigation`,`ssr`]};function s(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,span:`span`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components},{DemoFrame:i}=n;return i||l(`DemoFrame`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h2,{children:`TL;DR`}),`
`,(0,a.jsx)(n.p,{children:`VT 有兩種模式:`}),`
`,(0,a.jsxs)(n.ul,{children:[`
`,(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:`Same-document`}),`:`,(0,a.jsx)(n.code,{children:`document.startViewTransition(cb)`}),` JS 觸發,callback 內部更新 DOM。前面所有 demo 都是這種。`]}),`
`,(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:`Cross-document`}),`:CSS `,(0,a.jsx)(n.code,{children:`@view-transition { navigation: auto }`}),` 宣告,瀏覽器在 same-origin 連結點擊時自動觸發。`,(0,a.jsx)(n.strong,{children:`沒一行 JS`}),`。`]}),`
`]}),`
`,(0,a.jsx)(n.p,{children:`兩個 HTML 頁面都加同一條:`}),`
`,(0,a.jsx)(a.Fragment,{children:(0,a.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,a.jsx)(n.code,{children:(0,a.jsxs)(n.span,{className:`line`,children:[(0,a.jsx)(n.span,{style:{color:`#D73A49`},children:`@view-transition`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:` { navigation: auto; }`})]})})})}),`
`,(0,a.jsxs)(n.p,{children:[`兩頁都有 `,(0,a.jsx)(n.code,{children:`<header class="site-header">`}),` 都帶 `,(0,a.jsx)(n.code,{children:`view-transition-name: site-header`}),` → 點 link → header 自動 morph。`]}),`
`,(0,a.jsx)(i,{title:`same-doc mock — header & main share names`,children:(0,a.jsx)(r,{})}),`
`,(0,a.jsxs)(n.p,{children:[`(這個 demo 用 same-document VT 模擬。真實 multi-page 設定 `,(0,a.jsx)(n.code,{children:`@view-transition`}),` 後,點 `,(0,a.jsx)(n.code,{children:`<a href="/about">`}),` 自動 trigger,不需要 setState 或 startViewTransition。)`]}),`
`,(0,a.jsx)(n.h2,{children:`寫法`}),`
`,(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.code,{children:`home.html`}),` 跟 `,(0,a.jsx)(n.code,{children:`about.html`}),` 兩個檔案都這樣寫:`]}),`
`,(0,a.jsx)(a.Fragment,{children:(0,a.jsx)(n.pre,{className:`shiki github-light`,style:{backgroundColor:`#fff`,color:`#24292e`},tabIndex:`0`,children:(0,a.jsxs)(n.code,{children:[(0,a.jsxs)(n.span,{className:`line`,children:[(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`<`}),(0,a.jsx)(n.span,{style:{color:`#22863A`},children:`head`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`>`})]}),`
`,(0,a.jsxs)(n.span,{className:`line`,children:[(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`  <`}),(0,a.jsx)(n.span,{style:{color:`#22863A`},children:`style`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`>`})]}),`
`,(0,a.jsxs)(n.span,{className:`line`,children:[(0,a.jsx)(n.span,{style:{color:`#D73A49`},children:`    @view-transition`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:` { navigation: auto; }`})]}),`
`,(0,a.jsxs)(n.span,{className:`line`,children:[(0,a.jsx)(n.span,{style:{color:`#6F42C1`},children:`    .site-header`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:` { `}),(0,a.jsx)(n.span,{style:{color:`#005CC5`},children:`view-transition-name`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`: site-header; }`})]}),`
`,(0,a.jsxs)(n.span,{className:`line`,children:[(0,a.jsx)(n.span,{style:{color:`#6F42C1`},children:`    .main-content`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:` { `}),(0,a.jsx)(n.span,{style:{color:`#005CC5`},children:`view-transition-name`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`: main-content; }`})]}),`
`,(0,a.jsxs)(n.span,{className:`line`,children:[(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`  </`}),(0,a.jsx)(n.span,{style:{color:`#22863A`},children:`style`}),(0,a.jsx)(n.span,{style:{color:`#D73A49`},children:`>`})]}),`
`,(0,a.jsxs)(n.span,{className:`line`,children:[(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`</`}),(0,a.jsx)(n.span,{style:{color:`#22863A`},children:`head`}),(0,a.jsx)(n.span,{style:{color:`#D73A49`},children:`>`})]}),`
`,(0,a.jsxs)(n.span,{className:`line`,children:[(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`<`}),(0,a.jsx)(n.span,{style:{color:`#22863A`},children:`body`}),(0,a.jsx)(n.span,{style:{color:`#D73A49`},children:`>`})]}),`
`,(0,a.jsxs)(n.span,{className:`line`,children:[(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`  <`}),(0,a.jsx)(n.span,{style:{color:`#22863A`},children:`header`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:` class="`}),(0,a.jsx)(n.span,{style:{color:`#22863A`},children:`site-header`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`"`}),(0,a.jsx)(n.span,{style:{color:`#D73A49`},children:`>`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`…</`}),(0,a.jsx)(n.span,{style:{color:`#22863A`},children:`header`}),(0,a.jsx)(n.span,{style:{color:`#D73A49`},children:`>`})]}),`
`,(0,a.jsxs)(n.span,{className:`line`,children:[(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`  <`}),(0,a.jsx)(n.span,{style:{color:`#22863A`},children:`main`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:` class="`}),(0,a.jsx)(n.span,{style:{color:`#22863A`},children:`main-content`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`"`}),(0,a.jsx)(n.span,{style:{color:`#D73A49`},children:`>`}),(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`…</`}),(0,a.jsx)(n.span,{style:{color:`#22863A`},children:`main`}),(0,a.jsx)(n.span,{style:{color:`#D73A49`},children:`>`})]}),`
`,(0,a.jsxs)(n.span,{className:`line`,children:[(0,a.jsx)(n.span,{style:{color:`#24292E`},children:`</`}),(0,a.jsx)(n.span,{style:{color:`#22863A`},children:`body`}),(0,a.jsx)(n.span,{style:{color:`#D73A49`},children:`>`})]})]})})}),`
`,(0,a.jsxs)(n.p,{children:[`點 `,(0,a.jsx)(n.code,{children:`<a href="/about.html">`}),` → 瀏覽器:`]}),`
`,(0,a.jsxs)(n.ol,{children:[`
`,(0,a.jsxs)(n.li,{children:[`拍當前頁面 snapshot,挑出有 `,(0,a.jsx)(n.code,{children:`view-transition-name`}),` 的元素分組。`]}),`
`,(0,a.jsx)(n.li,{children:`抓新 HTML、render。`}),`
`,(0,a.jsx)(n.li,{children:`從新頁面找對應 vt-name 的元素,接續動畫。`}),`
`]}),`
`,(0,a.jsx)(n.h2,{children:`限制`}),`
`,(0,a.jsxs)(n.table,{children:[(0,a.jsx)(n.thead,{children:(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.th,{children:`限制`}),(0,a.jsx)(n.th,{children:`影響`})]})}),(0,a.jsxs)(n.tbody,{children:[(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.td,{children:(0,a.jsx)(n.strong,{children:`same-origin only`})}),(0,a.jsxs)(n.td,{children:[(0,a.jsx)(n.code,{children:`joshwcomeau.com → courses.joshwcomeau.com`}),` 不行(subdomain 不同 origin)`]})]}),(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.td,{children:(0,a.jsx)(n.strong,{children:`新頁面的 element 必須在 initial HTML`})}),(0,a.jsx)(n.td,{children:`若 hero image 是 client-render 才出現,VT 找不到對應 → fall back 到瞬間切換`})]}),(0,a.jsxs)(n.tr,{children:[(0,a.jsx)(n.td,{children:(0,a.jsx)(n.strong,{children:`不能跨 SPA navigation`})}),(0,a.jsx)(n.td,{children:`Next.js / React Router 都不算 cross-doc;它們是 client-side route swap → 只能用 startViewTransition`})]}),(0,a.jsxs)(n.tr,{children:[(0,a.jsxs)(n.td,{children:[(0,a.jsx)(n.strong,{children:`Firefox 還沒支援`}),`(2026 春)`]}),(0,a.jsx)(n.td,{children:`Chrome / Safari 已實作。81% 全域支援`})]})]})]}),`
`,(0,a.jsx)(n.h2,{children:`跟 SPA(像本專案)的關係`}),`
`,(0,a.jsxs)(n.p,{children:[`TanStack Start SPA mode 沒做 cross-document navigation — route 切換是 client-side 改 React tree。所以 `,(0,a.jsx)(n.code,{children:`@view-transition`}),` 對我們`,(0,a.jsx)(n.strong,{children:`不會 trigger`}),`。`]}),`
`,(0,a.jsx)(n.p,{children:`要做 SPA 內 route VT,有兩條路:`}),`
`,(0,a.jsxs)(n.ol,{children:[`
`,(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:`手動 startViewTransition`}),`:在 router 的 navigate handler 包一層。`]}),`
`,(0,a.jsxs)(n.li,{children:[(0,a.jsxs)(n.strong,{children:[`下一篇 `,(0,a.jsx)(n.a,{href:`./07.09-vt-react`,children:`VT with React`})]}),`:React 19+ 有 `,(0,a.jsx)(n.code,{children:`<ViewTransition>`}),` element 配 startTransition,語法更乾淨。`]}),`
`]}),`
`,(0,a.jsx)(n.h2,{children:`用例`}),`
`,(0,a.jsx)(n.p,{children:`跨頁面 VT 最有 ROI 的場景:`}),`
`,(0,a.jsxs)(n.ul,{children:[`
`,(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:`Hero 圖片從 listing 飛到 detail`}),`:listing 的 thumbnail 跟 detail 的 hero 共用 vt-name → 「同一張圖片放大進場」的 native app 感。`]}),`
`,(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:`Sticky header morph`}),`:header 高度因頁面類型不同(homepage 帶大 padding,article 緊縮),morph 過渡掩蓋 layout shift。`]}),`
`,(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:`Logo 從中央 hero 收到 corner`}),`:landing → app 的「縮起來」過場。`]}),`
`]}),`
`,(0,a.jsx)(n.h2,{children:`Edge cases & 雷`}),`
`,(0,a.jsxs)(n.ul,{children:[`
`,(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:`AdBlock 等 extension 注入會中斷 VT`}),`:Comeau 實測 AdBlock 把 `,(0,a.jsx)(n.code,{children:`@view-transition`}),` 寫在外部 stylesheet 時 VT 30–40% 機率不 fire,寫在 inline `,(0,a.jsx)(n.code,{children:`<style>`}),` 才穩。`]}),`
`,(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:`404 / error 頁面要不要也加?`}),` 如果加,navigate 到 broken page 仍會 trigger VT 但找不到對應 element → 部分 morph、部分 fade。看你想不想做。`]}),`
`,(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:(0,a.jsx)(n.code,{children:`prefers-reduced-motion`})}),` 在 cross-doc VT 也適用 — 跟 same-doc 一樣,瀏覽器不會 fire VT 或會用簡化版。`]}),`
`,(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:`Render-blocking meta tag`}),`:如果 detail page 的 hero 要等 fetch 才出現,可以用 `,(0,a.jsx)(n.code,{children:`<link rel="expect">`}),` 或 render-blocking 機制讓瀏覽器等到關鍵 element 進 DOM 才開始 VT。實驗中。`]}),`
`]}),`
`,(0,a.jsx)(n.h2,{children:`Gotchas`}),`
`,(0,a.jsxs)(n.ul,{children:[`
`,(0,a.jsxs)(n.li,{children:[(0,a.jsxs)(n.strong,{children:[`必須兩個頁面都有 `,(0,a.jsx)(n.code,{children:`@view-transition`})]}),`:只有 source 頁有沒有 destination 也宣告 → 不 fire。`]}),`
`,(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:`Bundler 把 CSS 拆 module`}),`:某些 build 工具會把 critical CSS 拆走,@view-transition 變成被 lazy load → fire 時間點不對。建議放 inline `,(0,a.jsx)(n.code,{children:`<style>`}),`。`]}),`
`,(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:`回上一頁(back button)也算 navigation`}),`:會 trigger 反向 VT。你的動畫設計要 in/out 兩個方向都合理。`]}),`
`,(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:`iframe 裡不行`}),`:VT 不跨 iframe boundary。`]}),`
`,(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:`Speculation Rules API`}),`:預先 prefetch 下一頁可以加速 cross-doc VT(因為 destination HTML 已 cached),但 prefetch 太多會浪費頻寬,設 selector 限制。`]}),`
`]})]})}function c(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(s,{...e})}):s(e)}function l(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{i as n,o as t};