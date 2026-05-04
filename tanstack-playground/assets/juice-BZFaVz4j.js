import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{i as n,n as r,r as i}from"./lib-BI_-S7V4.js";import{a}from"./canvas-DYWDW6Bn.js";import{R as o,z as s}from"./index-CRMRchBc.js";var c=e(n(),1),l=i(),u=700,d=400,f=200,p=6,m=0;function h(){return(0,l.jsxs)(`div`,{className:`flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-around`,children:[(0,l.jsx)(g,{}),(0,l.jsx)(_,{})]})}function g(){let[e,t]=(0,c.useState)(0);return(0,l.jsxs)(`div`,{className:`flex flex-col items-center gap-2`,children:[(0,l.jsx)(`p`,{className:`font-mono text-xs text-gray-700`,children:`MVP — 點擊只改文字`}),(0,l.jsx)(`button`,{type:`button`,onClick:()=>t(e=>e+1),className:`rounded-md bg-emerald-500 px-4 py-2 font-medium text-white hover:bg-emerald-600`,children:`加入購物車`}),(0,l.jsxs)(`p`,{className:`font-mono text-xs text-gray-500`,children:[`已加入: `,e]})]})}function _(){let[e,t]=(0,c.useState)(0),[n,r]=(0,c.useState)(!1),[i,h]=(0,c.useState)([]),g=(0,c.useRef)([]);(0,c.useEffect)(()=>()=>{g.current.forEach(e=>window.clearTimeout(e))},[]);function _(){t(e=>e+1),r(!0),window.setTimeout(()=>r(!1),250);let e=o(p).map(e=>{let{x:t,y:n}=a(360/p*e+s(-20,20,!0),s(40,70,!0));return{id:m++,x:t,y:n}}),n=e.map(e=>e.id);h(t=>[...t,...e]);let i=window.setTimeout(()=>{h(e=>e.filter(e=>!n.includes(e.id)))},u+f);g.current.push(i)}return(0,l.jsxs)(`div`,{className:`flex flex-col items-center gap-2`,children:[(0,l.jsx)(`p`,{className:`font-mono text-xs text-gray-700`,children:`Juiced — squash + 火花 + 計數彈跳`}),(0,l.jsx)(`style`,{children:`
        @keyframes wham-juice-fadeOut { to { opacity: 0 } }
        @keyframes wham-juice-disperse { to { transform: translate(var(--x), var(--y)) } }
        @keyframes wham-juice-bump {
          0% { transform: scale(1) }
          40% { transform: scale(1.4) }
          100% { transform: scale(1) }
        }
        .wham-juice-particle {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 10px; height: 10px;
          border-radius: 50%;
          pointer-events: none;
          animation:
            wham-juice-fadeOut ${u}ms forwards,
            wham-juice-disperse ${d}ms cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
        }
      `}),(0,l.jsxs)(`button`,{type:`button`,onClick:_,className:`relative rounded-md bg-emerald-500 px-4 py-2 font-medium text-white transition-transform hover:bg-emerald-600`,style:{transform:n?`scale(0.92)`:`scale(1)`},children:[`加入購物車`,i.map((e,t)=>(0,l.jsx)(`span`,{className:`wham-juice-particle`,style:{backgroundColor:[`oklch(0.85 0.18 130)`,`oklch(0.85 0.15 90)`,`oklch(0.8 0.18 60)`][t%3],"--x":`${e.x.toFixed(2)}px`,"--y":`${e.y.toFixed(2)}px`}},e.id))]}),(0,l.jsxs)(`p`,{className:`font-mono text-xs text-emerald-700`,style:{animation:e>0?`wham-juice-bump 350ms ease-out`:void 0},children:[`已加入: `,e]},e)]})}var v=t({default:()=>x,frontmatter:()=>y}),y={title:`Juice, custom whimsy beats off-the-shelf confetti`,sourceUrl:`https://courses.joshwcomeau.com/wham/01-particles/12-juice`,lessonNumber:`01-particles/12-juice`,order:19,summary:'"Juice" 是 gamedev 術語 — 觸覺/視覺反饋的層層堆疊,讓基本互動變得讓人想再點一次。但 `npm install canvas-confetti` 不算 juice;真正有效的 juice 必須是為產品量身打造的,不然只是另一個被看膩的彩屑。',tags:[`particles`,`design`,`juice`,`animation-philosophy`]};function b(e){let t={code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,strong:`strong`,ul:`ul`,...r(),...e.components},{DemoFrame:n}=t;return n||S(`DemoFrame`,!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.h2,{children:`TL;DR`}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`Juice`}),`:gamedev 術語,描述「讓互動變得有觸覺感」的小細節 — 按下去的 squash、彈出的粒子、聲音、震動。出處是 Martin Jonasson & Petri Purho 在 GDC 2012 的 talk `,(0,l.jsx)(t.strong,{children:`"Juice it or lose it"`}),`(15 分鐘,值得看)。`]}),`
`,(0,l.jsx)(t.li,{children:`同一份遊戲邏輯,堆完所有 juice 之後感覺完全不同。Web 也一樣 — 動畫、easing、粒子等等都是 juice 的零件。`}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`但 juice 必須是 bespoke`}),`。`,(0,l.jsx)(t.code,{children:`npm install canvas-confetti`}),` 三百萬人用過,你的網站再用一次,使用者只覺得「又一個」。同樣的彩屑爆炸看了 50 次後就失去驚喜的能力。`]}),`
`,(0,l.jsx)(t.li,{children:`真正打動人的 juice 必須跟產品的個性連動 — 主題色、品牌調性、互動的語意。`}),`
`]}),`
`,(0,l.jsx)(n,{title:`MVP vs juiced — 同一個 Add to cart`,children:(0,l.jsx)(h,{})}),`
`,(0,l.jsx)(t.p,{children:`左邊:純功能,點下去計數+1,沒了。右邊:多了 button squash、放射粒子、計數彈跳。多花 30 行,感受差兩個量級。`}),`
`,(0,l.jsx)(t.h2,{children:`為什麼通用元件失靈`}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.code,{children:`canvas-confetti`}),` 是個`,(0,l.jsx)(t.strong,{children:`寫得很好的`}),`套件 — 不是它做錯什麼。問題是「飽和」:`]}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsx)(t.li,{children:`你看過 50 次同樣的彩屑爆炸,大腦自動分類成「噢 又是這個」。`}),`
`,(0,l.jsx)(t.li,{children:`註冊完成 → 彩屑;升級成功 → 彩屑;結帳完成 → 彩屑。彩屑變成「事情完成」的視覺替代字。`}),`
`,(0,l.jsx)(t.li,{children:`它本來該觸發的「驚喜」已經磨掉了。`}),`
`]}),`
`,(0,l.jsx)(t.p,{children:`跟設計系統的 design tokens 不同 — token 是內部一致性,彩屑是外部 lookalike。一致性是優點,跟別人撞臉是缺點。`}),`
`,(0,l.jsx)(t.h2,{children:`怎麼設計 bespoke juice`}),`
`,(0,l.jsx)(t.p,{children:`幾個練習方向:`}),`
`,(0,l.jsxs)(t.ol,{children:[`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`跟產品內容連動`}),`:加入購物車的粒子可以是品牌色的小 logo,不是泛泛彩屑。`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`配合互動的語意`}),`:「點讚」是溫暖的(粉紅、上飄),「刪除」是抗拒的(灰、向下散),「成功」是擴張的(亮、外擴)。`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`層數疊起來`}),`:button squash + 顏色變化 + 粒子 + 計數彈跳,單獨看每個都很小,疊起來就明顯。`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`節制`}),`:juice 不是越多越好。一個流程裡只挑 1~2 個焦點 moment,其它保持安靜 — 不然到處都在動,反而沒有焦點。`]}),`
`]}),`
`,(0,l.jsx)(t.h2,{children:`Gotchas`}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`「我就快速做一下用 confetti 套件」`}),`:這個快不會省太多時間,但會永久剝奪這個介面的驚喜權。如果不是 PoC,自己 spawn 粒子是值得投入的小成本。`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`A/B 測得出來嗎?`}),`:Juice 的價值常常測不出 conversion 改變。但 retention、滿意度、口碑這些長期指標會反映。`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`Performance 第一`}),`:juice 卡頓 > juice 不存在。每加一層動畫都要 profile,別讓 60fps 掉到 24fps。`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`Accessibility 不是事後`}),`:reduced-motion 路徑要跟 full-juice 路徑一起設計。「動畫關掉就什麼回饋都沒了」是 a11y 失敗。`]}),`
`]})]})}function x(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(b,{...e})}):b(e)}function S(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{v as n,y as t};