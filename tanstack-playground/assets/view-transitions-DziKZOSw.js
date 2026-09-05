import{a as e,i as t,l as n,r}from"./lib-D-7CVURP.js";import{n as i,t as a}from"./values-C439TxP6.js";import{t as o}from"./_baseRandom-Bhy60DLl.js";var s=e((e=>{var n=t();function r(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function i(){}var a={d:{f:i,r:function(){throw Error(r(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},o=Symbol.for(`react.portal`);function s(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:o,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var c=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function l(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=a,e.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(r(299));return s(e,t,null,n)},e.flushSync=function(e){var t=c.T,n=a.p;try{if(c.T=null,a.p=2,e)return e()}finally{c.T=t,a.p=n,a.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,a.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&a.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=l(n,t.crossOrigin),i=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?a.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:i,fetchPriority:o}):n===`script`&&a.d.X(e,{crossOrigin:r,integrity:i,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=l(t.as,t.crossOrigin);a.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??a.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=l(n,t.crossOrigin);a.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=l(t.as,t.crossOrigin);a.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else a.d.m(e)}},e.requestFormReset=function(e){a.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return c.H.useFormState(e,t,n)},e.useFormStatus=function(){return c.H.useHostTransitionStatus()},e.version=`19.2.8`})),c=e(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=s()}));function l(e,t){var n=-1,r=e.length;for(t||=Array(r);++n<r;)t[n]=e[n];return t}function u(e,t){var n=-1,r=e.length,i=r-1;for(t=t===void 0?r:t;++n<t;){var a=o(n,i),s=e[a];e[a]=e[n],e[n]=s}return e.length=t,e}function d(e){return u(l(e))}function f(e){return u(a(e))}function p(e){return(i(e)?d:f)(e)}var m=n(t(),1),h=c(),g=r(),_=[`Aurora`,`Bloom`,`Tide`,`Ember`,`Drift`,`Glow`,`Hush`,`Ivy`,`Lantern`,`Marrow`,`Nimbus`,`Onyx`,`Pearl`,`Quartz`,`Reverie`,`Sable`],v=[`bg-cyan-500 text-cyan-50`,`bg-rose-500 text-rose-50`,`bg-amber-500 text-amber-50`,`bg-violet-500 text-violet-50`,`bg-emerald-500 text-emerald-50`,`bg-sky-500 text-sky-50`,`bg-orange-500 text-orange-50`,`bg-pink-500 text-pink-50`],y=`
  /* Each tile gets a unique view-transition-name via match-element keyword,
     plus a shared class so we can style ALL of them at once.            */
  .vt-shuffle-tile {
    view-transition-name: match-element;
    view-transition-class: vt-shuffle-tile;
  }
  ::view-transition-group(.vt-shuffle-tile) {
    animation-duration: 600ms;
    animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
  }
  @media (prefers-reduced-motion: reduce) {
    ::view-transition-group(.vt-shuffle-tile),
    ::view-transition-old(.vt-shuffle-tile),
    ::view-transition-new(.vt-shuffle-tile) {
      animation: none !important;
    }
  }
`;function b(){return typeof window<`u`&&window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}function x(){return typeof document<`u`&&`startViewTransition`in document}function S(){let[e,t]=(0,m.useState)(_),[n,r]=(0,m.useState)(!0);function i(){t(e=>p(e))}function a(){if(!n||!x()||b()){i();return}document.startViewTransition(()=>{(0,h.flushSync)(()=>i())})}return(0,g.jsxs)(`div`,{className:`flex flex-col gap-3 bg-slate-50 p-4`,children:[(0,g.jsx)(`style`,{children:y}),(0,g.jsxs)(`div`,{className:`flex items-center justify-between`,children:[(0,g.jsxs)(`label`,{className:`flex items-center gap-2 text-xs text-slate-600`,children:[(0,g.jsx)(`input`,{type:`checkbox`,checked:n,onChange:e=>r(e.target.checked),className:`h-3.5 w-3.5`}),`Use `,(0,g.jsx)(`code`,{className:`rounded bg-slate-200 px-1`,children:`startViewTransition`})]}),(0,g.jsx)(`button`,{type:`button`,onClick:a,className:`rounded-md bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white hover:bg-slate-800`,children:`Shuffle`})]}),(0,g.jsx)(`div`,{className:`grid grid-cols-4 gap-2`,children:e.map((e,t)=>(0,g.jsx)(`div`,{className:`vt-shuffle-tile flex h-16 items-center justify-center rounded-md text-sm font-semibold shadow-sm ${v[t%v.length]}`,children:e},e))}),(0,g.jsxs)(`p`,{className:`text-xs text-slate-500`,children:[`Toggle off to see the snap-without-VT baseline. With VT on, browser auto-generates`,(0,g.jsx)(`code`,{className:`mx-1 rounded bg-slate-200 px-1`,children:`transform: matrix()`}),` keyframes that slide each tile from its old box to its new one.`]})]})}var C=[{id:`aurora`,label:`Aurora`,caption:`Polar light painted on a winter sky.`,gradient:`linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)`},{id:`bloom`,label:`Bloom`,caption:`First color after the thaw.`,gradient:`linear-gradient(135deg, #f43f5e 0%, #f59e0b 100%)`},{id:`tide`,label:`Tide`,caption:`The moon pulling the shoreline back and forth.`,gradient:`linear-gradient(135deg, #1d4ed8 0%, #0f766e 100%)`},{id:`ember`,label:`Ember`,caption:`Held warmth before the dark settles in.`,gradient:`linear-gradient(135deg, #ea580c 0%, #b91c1c 100%)`},{id:`quartz`,label:`Quartz`,caption:`Crystal clarity carved out of stone.`,gradient:`linear-gradient(135deg, #a855f7 0%, #ec4899 100%)`}],w=`
  .vt-slideshow-slide {
    view-transition-name: vt-slideshow;
  }
  ::view-transition-old(vt-slideshow) {
    animation: 450ms cubic-bezier(0.65, 0, 0.35, 1) both vt-slideshow-exit-left;
  }
  ::view-transition-new(vt-slideshow) {
    animation: 450ms cubic-bezier(0.65, 0, 0.35, 1) both vt-slideshow-enter-right;
  }
  .vt-slideshow-back ::view-transition-old(vt-slideshow) {
    animation-name: vt-slideshow-exit-right;
  }
  .vt-slideshow-back ::view-transition-new(vt-slideshow) {
    animation-name: vt-slideshow-enter-left;
  }
  @keyframes vt-slideshow-exit-left {
    to { transform: translateX(-100%); opacity: 0; }
  }
  @keyframes vt-slideshow-enter-right {
    from { transform: translateX(100%); opacity: 0; }
  }
  @keyframes vt-slideshow-exit-right {
    to { transform: translateX(100%); opacity: 0; }
  }
  @keyframes vt-slideshow-enter-left {
    from { transform: translateX(-100%); opacity: 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    ::view-transition-old(vt-slideshow),
    ::view-transition-new(vt-slideshow) {
      animation: none !important;
    }
  }
`;function T(){let[e,t]=(0,m.useState)(0),n=C[e];function r(n){let r=(e+n+C.length)%C.length;if(!x()||b()){t(r);return}let i=n<0?`vt-slideshow-back`:``;document.documentElement.classList.toggle(`vt-slideshow-back`,i!==``),document.startViewTransition(()=>{(0,h.flushSync)(()=>t(r))}).finished.finally(()=>{document.documentElement.classList.remove(`vt-slideshow-back`)})}return(0,g.jsxs)(`div`,{className:`flex flex-col gap-3 bg-slate-50 p-4`,children:[(0,g.jsx)(`style`,{children:w}),(0,g.jsx)(`div`,{className:`relative h-56 overflow-hidden rounded-lg ring-1 ring-slate-200`,children:(0,g.jsxs)(`div`,{className:`vt-slideshow-slide absolute inset-0 flex flex-col justify-end p-5 text-white`,style:{background:n.gradient},children:[(0,g.jsxs)(`svg`,{"aria-hidden":`true`,className:`absolute top-4 right-4 opacity-70`,width:`80`,height:`80`,viewBox:`0 0 80 80`,children:[(0,g.jsx)(`circle`,{cx:`40`,cy:`40`,r:`28`,fill:`none`,stroke:`white`,strokeWidth:`2`}),(0,g.jsx)(`circle`,{cx:`40`,cy:`40`,r:`14`,fill:`white`,fillOpacity:`0.25`})]}),(0,g.jsx)(`h3`,{className:`m-0 text-2xl font-bold drop-shadow-sm`,children:n.label}),(0,g.jsx)(`p`,{className:`m-0 mt-1 text-sm text-white/90 drop-shadow-sm`,children:n.caption})]},n.id)}),(0,g.jsxs)(`div`,{className:`flex items-center justify-between`,children:[(0,g.jsx)(`button`,{type:`button`,onClick:()=>r(-1),className:`rounded-md bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white hover:bg-slate-800`,children:`← Prev`}),(0,g.jsx)(`div`,{className:`flex gap-1.5`,children:C.map((t,n)=>(0,g.jsx)(`span`,{className:`h-1.5 w-6 rounded-full ${n===e?`bg-slate-900`:`bg-slate-300`}`},t.id))}),(0,g.jsx)(`button`,{type:`button`,onClick:()=>r(1),className:`rounded-md bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white hover:bg-slate-800`,children:`Next →`})]}),(0,g.jsxs)(`p`,{className:`text-xs text-slate-500`,children:[`Same DOM node, the slide just re-keys. Custom`,(0,g.jsx)(`code`,{className:`mx-1 rounded bg-slate-200 px-1`,children:`::view-transition-old/new(vt-slideshow)`}),`keyframes turn the default cross-fade into a horizontal slide.`]})]})}function E(){let[e,t]=(0,m.useState)(!1);return(0,m.useEffect)(()=>{if(typeof window>`u`||!window.matchMedia)return;let e=window.matchMedia(`(prefers-reduced-motion: reduce)`);t(e.matches);let n=e=>t(e.matches);return e.addEventListener(`change`,n),()=>e.removeEventListener(`change`,n)},[]),e}function D(e,t){if(t||typeof document>`u`||!document.startViewTransition){e();return}document.startViewTransition(()=>{(0,h.flushSync)(e)})}var O=`
  .toast-stack {
    isolation: isolate;
  }
  .toast-stack-item {
    contain: layout;
  }
  @media (prefers-reduced-motion: reduce) {
    ::view-transition-old(*),
    ::view-transition-new(*) {
      animation: none !important;
    }
  }
`,k=[{id:1,tone:`success`,title:`Saved`,body:`Draft synced to the cloud.`},{id:2,tone:`info`,title:`New comment`,body:`Mei replied on “Q3 roadmap”.`},{id:3,tone:`warning`,title:`Low storage`,body:`92% of your quota is used.`},{id:4,tone:`success`,title:`Deploy ready`,body:`Preview build passed checks.`}],A={success:`✓`,info:`!`,warning:`!`},j={success:`bg-emerald-500`,info:`bg-sky-500`,warning:`bg-amber-500`};function M(){let[e,t]=(0,m.useState)(k),n=E();function r(e){D(()=>{t(t=>t.filter(t=>t.id!==e))},n)}function i(){D(()=>t(k),n)}return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(`style`,{children:O}),(0,g.jsxs)(`div`,{className:`flex flex-col items-stretch gap-3 bg-slate-50 p-4`,children:[(0,g.jsxs)(`div`,{className:`flex items-center justify-between`,children:[(0,g.jsx)(`p`,{className:`m-0 text-xs text-slate-500`,children:e.length===0?`All clear.`:`${e.length} notification${e.length===1?``:`s`}`}),(0,g.jsx)(`button`,{type:`button`,onClick:i,className:`cursor-pointer rounded-md bg-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-300`,children:`Reset`})]}),(0,g.jsx)(`ul`,{"aria-live":`polite`,className:`toast-stack m-0 flex list-none flex-col gap-2 p-0`,children:e.map((t,n)=>(0,g.jsxs)(`li`,{className:`toast-stack-item relative flex items-center gap-3 rounded-md border border-slate-200 bg-white p-3 shadow-sm`,style:{viewTransitionName:`toast-${t.id}`,zIndex:e.length-n},children:[(0,g.jsx)(`span`,{"aria-hidden":`true`,className:`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${j[t.tone]}`,children:A[t.tone]}),(0,g.jsxs)(`div`,{className:`min-w-0 flex-1`,children:[(0,g.jsx)(`p`,{className:`m-0 text-sm font-semibold text-slate-900`,children:t.title}),(0,g.jsx)(`p`,{className:`m-0 text-xs text-slate-500`,children:t.body})]}),(0,g.jsx)(`button`,{type:`button`,"aria-label":`Dismiss ${t.title}`,onClick:()=>r(t.id),className:`cursor-pointer rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700`,children:(0,g.jsx)(`span`,{"aria-hidden":`true`,children:`✕`})})]},t.id))})]})]})}var N=`
  .vt-dialog {
    view-transition-name: vt-dialog;
  }
  ::view-transition-old(vt-dialog-cancel) {
    animation-name: vt-dialog-cancel;
    animation-duration: 600ms;
    animation-timing-function: cubic-bezier(0.54, -0.8, 1, 0.9);
    animation-fill-mode: forwards;
  }
  ::view-transition-old(vt-dialog-confirm) {
    animation-name: vt-dialog-confirm;
    animation-duration: 400ms;
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    animation-fill-mode: forwards;
  }
  @keyframes vt-dialog-cancel {
    to {
      filter: blur(10px);
      transform: translateY(100%) rotate(-20deg);
      opacity: 0;
    }
  }
  @keyframes vt-dialog-confirm {
    to {
      transform: translateY(100%);
      opacity: 0;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    ::view-transition-old(vt-dialog-cancel),
    ::view-transition-old(vt-dialog-confirm) {
      animation: none;
    }
  }
`;function P(){let[e,t]=(0,m.useState)(!1),[n,r]=(0,m.useState)(null),i=(0,m.useRef)(null),a=E();function o(e){r(e);let n=i.current;n&&(n.style.viewTransitionName=`vt-dialog-${e}`),D(()=>t(!1),a)}return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(`style`,{children:N}),(0,g.jsxs)(`div`,{className:`relative flex h-72 flex-col items-center justify-center gap-3 overflow-hidden rounded-md bg-slate-900 p-6`,children:[(0,g.jsx)(`button`,{type:`button`,onClick:()=>t(!0),disabled:e,className:`cursor-pointer rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-40`,children:`Open dialog`}),(0,g.jsx)(`p`,{className:`m-0 text-xs text-slate-400`,children:n===`cancel`?`Cancel: fall + rotate + blur`:n===`confirm`?`Confirm: slide down`:`Pick an action to see the exit animation`}),e&&(0,g.jsxs)(`div`,{ref:i,role:`dialog`,"aria-modal":`true`,"aria-labelledby":`vt-dialog-title`,className:`vt-dialog absolute top-1/2 left-1/2 w-72 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-5 shadow-xl`,children:[(0,g.jsx)(`h3`,{id:`vt-dialog-title`,className:`m-0 text-base font-semibold text-slate-900`,children:`Discard draft?`}),(0,g.jsx)(`p`,{className:`mt-2 mb-4 text-sm text-slate-600`,children:`Your unsaved changes will be lost. This can’t be undone.`}),(0,g.jsxs)(`div`,{className:`flex justify-end gap-2`,children:[(0,g.jsx)(`button`,{type:`button`,onClick:()=>o(`cancel`),className:`cursor-pointer rounded-md bg-rose-100 px-3 py-1.5 text-sm font-semibold text-rose-700 hover:bg-rose-200`,children:`Cancel`}),(0,g.jsx)(`button`,{type:`button`,onClick:()=>o(`confirm`),className:`cursor-pointer rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400`,children:`Confirm`})]})]})]})]})}var F=[{color:`oklch(0.75 0.18 30)`,label:`one`},{color:`oklch(0.75 0.18 90)`,label:`two`},{color:`oklch(0.75 0.18 200)`,label:`three`},{color:`oklch(0.75 0.18 280)`,label:`four`}];function I(){let[e,t]=(0,m.useState)(0),[n,r]=(0,m.useState)(`slide`),i=F[e];function a(){function e(){t(e=>(e+1)%F.length)}let n=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;document.startViewTransition&&!n?document.startViewTransition(e):e()}return(0,g.jsxs)(`div`,{className:`flex flex-col items-center gap-3`,children:[(0,g.jsx)(`style`,{children:`
        @keyframes wham-vt-exitLeft {
          from { transform: translateX(0) } to { transform: translateX(-100%) }
        }
        @keyframes wham-vt-enterRight {
          from { transform: translateX(100%) } to { transform: translateX(0) }
        }
        ::view-transition-group(wham-vt-slide) {
          animation-duration: 500ms;
        }
        @media (prefers-reduced-motion: no-preference) {
          .wham-vt-mode-slide ::view-transition-old(wham-vt-slide) {
            animation-name: wham-vt-exitLeft;
          }
          .wham-vt-mode-slide ::view-transition-new(wham-vt-slide) {
            animation-name: wham-vt-enterRight;
          }
        }
        .wham-vt-card { view-transition-name: wham-vt-slide; }
        .wham-vt-btn { view-transition-name: wham-vt-btn; }
      `}),(0,g.jsxs)(`div`,{className:`flex flex-col items-center gap-3 wham-vt-mode-${n}`,children:[(0,g.jsx)(`div`,{className:`overflow-hidden rounded-md bg-slate-900 p-2`,style:{width:320},children:(0,g.jsx)(`div`,{className:`wham-vt-card flex h-40 w-full items-center justify-center rounded font-mono text-2xl text-slate-900`,style:{backgroundColor:i.color},children:i.label})}),(0,g.jsx)(`button`,{type:`button`,onClick:a,className:`wham-vt-btn rounded bg-rose-500 px-4 py-2 font-mono text-sm text-white hover:bg-rose-600`,children:`next →`})]}),(0,g.jsxs)(`div`,{className:`flex items-center gap-3 font-mono text-sm`,children:[(0,g.jsxs)(`label`,{className:`flex items-center gap-1`,children:[(0,g.jsx)(`input`,{type:`radio`,checked:n===`slide`,onChange:()=>r(`slide`)}),` slide`]}),(0,g.jsxs)(`label`,{className:`flex items-center gap-1`,children:[(0,g.jsx)(`input`,{type:`radio`,checked:n===`fade`,onChange:()=>r(`fade`)}),` default cross-fade`]})]}),(0,g.jsx)(`p`,{className:`text-xs text-gray-500`,children:`slide 模式套自訂 keyframe;fade 模式留瀏覽器預設(就是兩張 snapshot 各自 fade)。`})]})}var L=[{id:`a`,label:`A`,color:`oklch(0.78 0.18 30)`},{id:`b`,label:`B`,color:`oklch(0.78 0.18 80)`},{id:`c`,label:`C`,color:`oklch(0.78 0.18 130)`},{id:`d`,label:`D`,color:`oklch(0.78 0.18 200)`},{id:`e`,label:`E`,color:`oklch(0.78 0.18 260)`},{id:`f`,label:`F`,color:`oklch(0.78 0.18 320)`},{id:`g`,label:`G`,color:`oklch(0.78 0.1 60)`},{id:`h`,label:`H`,color:`oklch(0.78 0.1 240)`},{id:`i`,label:`I`,color:`oklch(0.78 0.18 0)`}];function R(){let[e,t]=(0,m.useState)(L);function n(){function e(){t(e=>p(e))}document.startViewTransition?document.startViewTransition(e):e()}return(0,g.jsxs)(`div`,{className:`flex flex-col items-center gap-3`,children:[(0,g.jsx)(`style`,{children:`
        ::view-transition-group(wham-vt-tile-a),
        ::view-transition-group(wham-vt-tile-b),
        ::view-transition-group(wham-vt-tile-c),
        ::view-transition-group(wham-vt-tile-d),
        ::view-transition-group(wham-vt-tile-e),
        ::view-transition-group(wham-vt-tile-f),
        ::view-transition-group(wham-vt-tile-g),
        ::view-transition-group(wham-vt-tile-h),
        ::view-transition-group(wham-vt-tile-i) {
          animation-duration: 600ms;
        }
      `}),(0,g.jsx)(`div`,{className:`grid grid-cols-3 gap-2 rounded-md bg-slate-900 p-3`,children:e.map(e=>(0,g.jsx)(`div`,{className:`flex h-16 w-16 items-center justify-center rounded-md font-mono text-xl font-bold text-slate-900`,style:{backgroundColor:e.color,viewTransitionName:`wham-vt-tile-${e.id}`},children:e.label},e.id))}),(0,g.jsx)(`button`,{type:`button`,onClick:n,className:`rounded bg-slate-800 px-3 py-1 font-mono text-xs text-white hover:bg-slate-700`,children:`shuffle`}),(0,g.jsx)(`p`,{className:`text-xs text-gray-500`,children:`每個 tile 自己 view-transition-name → 瀏覽器自動產生 matrix() keyframe 把它從舊位置滑到新位置。`})]})}function z(){let[e,t]=(0,m.useState)(!1);function n(){function e(){t(e=>!e)}document.startViewTransition?document.startViewTransition(e):e()}return(0,g.jsxs)(`div`,{className:`flex flex-col items-center gap-3`,children:[(0,g.jsx)(`style`,{children:`
        ::view-transition-group(wham-vt-resize) { animation-duration: 700ms; }
      `}),(0,g.jsx)(`div`,{className:`flex h-72 w-72 items-center justify-center rounded-md bg-slate-900`,children:(0,g.jsx)(`div`,{className:`rounded-full`,style:{backgroundColor:`oklch(0.78 0.18 200)`,width:e?220:80,height:e?220:80,viewTransitionName:`wham-vt-resize`}})}),(0,g.jsx)(`button`,{type:`button`,onClick:n,className:`rounded bg-slate-800 px-3 py-1 font-mono text-xs text-white hover:bg-slate-700`,children:`toggle size`}),(0,g.jsx)(`p`,{className:`text-xs text-gray-500`,children:`改 width / height,VT 自動內插尺寸 — 不需要 transform: scale()。`})]})}var B=[`oklch(0.78 0.18 30)`,`oklch(0.78 0.18 60)`,`oklch(0.78 0.18 90)`,`oklch(0.78 0.18 130)`,`oklch(0.78 0.18 170)`,`oklch(0.78 0.18 210)`,`oklch(0.78 0.18 250)`,`oklch(0.78 0.18 290)`,`oklch(0.78 0.18 330)`],V=Array.from({length:9},(e,t)=>({id:`t${t}`,color:B[t]}));function H(){let[e,t]=(0,m.useState)(V),[n,r]=(0,m.useState)(600);function i(){function e(){t(e=>p(e))}document.startViewTransition?document.startViewTransition(e):e()}return(0,g.jsxs)(`div`,{className:`flex flex-col items-center gap-3`,children:[(0,g.jsx)(`style`,{children:`
        ::view-transition-group(.wham-vt-class-tile) {
          animation-duration: ${n}ms;
          animation-timing-function: cubic-bezier(0.6, 0, 0.2, 1);
        }
      `}),(0,g.jsx)(`div`,{className:`grid grid-cols-3 gap-2 rounded-md bg-slate-900 p-3`,children:e.map(e=>(0,g.jsx)(`div`,{className:`h-16 w-16 rounded-md`,style:{backgroundColor:e.color,viewTransitionName:`wham-vt-classed-${e.id}`,viewTransitionClass:`wham-vt-class-tile`}},e.id))}),(0,g.jsxs)(`div`,{className:`flex flex-wrap items-center gap-3 font-mono text-sm`,children:[(0,g.jsx)(`button`,{type:`button`,onClick:i,className:`rounded bg-slate-800 px-3 py-1 text-white hover:bg-slate-700`,children:`shuffle`}),(0,g.jsxs)(`label`,{className:`flex items-center gap-2`,children:[(0,g.jsxs)(`span`,{children:[`duration: `,n,`ms`]}),(0,g.jsx)(`input`,{type:`range`,min:150,max:2e3,step:50,value:n,onChange:e=>r(Number(e.target.value))})]})]}),(0,g.jsx)(`p`,{className:`text-xs text-gray-500`,children:"9 個 tile 各自有 unique name(t0..t8),但都共用 `view-transition-class: wham-vt-class-tile` — 一條 selector 控全部。"})]})}var U=[{color:`oklch(0.75 0.18 30)`,label:`one`},{color:`oklch(0.75 0.18 90)`,label:`two`},{color:`oklch(0.75 0.18 200)`,label:`three`},{color:`oklch(0.75 0.18 280)`,label:`four`}],W=`cubic-bezier(0.08, 0.25, 0, 1)`;function G(){let[e,t]=(0,m.useState)(0),[n,r]=(0,m.useState)(1500),[i,a]=(0,m.useState)(!0),o=U[e];function s(){function e(){t(e=>(e+1)%U.length)}document.startViewTransition?document.startViewTransition(e):e()}return(0,g.jsxs)(`div`,{className:`flex flex-col items-center gap-3`,children:[(0,g.jsx)(`style`,{children:`
        ::view-transition { pointer-events: none; }
        ::view-transition-group(wham-vt-int-slide) {
          animation-duration: ${n}ms;
          animation-timing-function: ${i?W:`ease`};
        }
        @media (prefers-reduced-motion: no-preference) {
          ::view-transition-old(wham-vt-int-slide) {
            animation-name: wham-vt-int-exitLeft;
          }
          ::view-transition-new(wham-vt-int-slide) {
            animation-name: wham-vt-int-enterRight;
          }
        }
        @keyframes wham-vt-int-exitLeft {
          from { transform: translateX(0) } to { transform: translateX(-100%) }
        }
        @keyframes wham-vt-int-enterRight {
          from { transform: translateX(100%) } to { transform: translateX(0) }
        }
      `}),(0,g.jsxs)(`div`,{className:`flex flex-col items-center gap-3`,children:[(0,g.jsx)(`div`,{className:`overflow-hidden rounded-md bg-slate-900 p-2`,style:{width:320},children:(0,g.jsx)(`div`,{className:`flex h-32 w-full items-center justify-center rounded font-mono text-xl text-slate-900`,style:{backgroundColor:o.color,viewTransitionName:`wham-vt-int-slide`},children:o.label})}),(0,g.jsx)(`button`,{type:`button`,onClick:s,className:`rounded bg-rose-500 px-4 py-2 font-mono text-sm text-white hover:bg-rose-600`,children:`next →`})]}),(0,g.jsxs)(`div`,{className:`grid w-full max-w-md grid-cols-1 gap-2 font-mono text-sm`,children:[(0,g.jsxs)(`label`,{className:`flex items-center gap-2`,children:[(0,g.jsxs)(`span`,{className:`w-32`,children:[`duration: `,n,`ms`]}),(0,g.jsx)(`input`,{type:`range`,min:150,max:2e3,step:50,value:n,onChange:e=>r(Number(e.target.value))})]}),(0,g.jsxs)(`label`,{className:`flex items-center gap-2`,children:[(0,g.jsx)(`input`,{type:`checkbox`,checked:i,onChange:e=>a(e.target.checked)}),`aggressive ease-out(前段衝完,interrupt 比較不刺眼)`]})]}),(0,g.jsx)(`p`,{className:`text-xs text-gray-500`,children:`把 duration 拉到 1500ms,連點 next。aggressive ease 開的時候 interrupt 沒這麼明顯;關掉看起來像「動畫被掐掉」。`})]})}var K=[`home`,`gallery`,`about`,`contact`];function q(){let[e,t]=(0,m.useState)(K[0]);function n(e){function n(){t(e)}document.startViewTransition?document.startViewTransition(n):n()}return(0,g.jsxs)(`div`,{className:`flex flex-col items-center gap-3`,children:[(0,g.jsx)(`style`,{children:`
        ::view-transition-group(wham-vt-de-underline) {
          animation-duration: 500ms;
          animation-timing-function: cubic-bezier(0.25, 0.65, 0, 1);
        }
        ::view-transition-old(wham-vt-de-underline),
        ::view-transition-new(wham-vt-de-underline) {
          height: 3px;
        }
        .wham-vt-de-link {
          position: relative;
          padding: 8px 12px;
          color: oklch(0.95 0.02 280);
          font-weight: 600;
        }
        .wham-vt-de-link.active::after {
          content: '';
          position: absolute;
          left: 8px;
          right: 8px;
          bottom: 0;
          height: 3px;
          border-radius: 2px;
          background: oklch(0.85 0.18 60);
          view-transition-name: wham-vt-de-underline;
        }
      `}),(0,g.jsx)(`nav`,{className:`flex gap-2 rounded-md bg-slate-900 p-2`,children:K.map(t=>(0,g.jsx)(`button`,{type:`button`,onClick:()=>n(t),className:`wham-vt-de-link ${e===t?`active`:``}`,children:t},t))}),(0,g.jsx)(`p`,{className:`text-xs text-gray-500`,children:"active 那欄的 ::after 一直被建立/銷毀(不同 DOM 節點),但共用 `view-transition-name` → VT 把它們當「同一個東西移到新位置」處理。"})]})}var J={home:{title:`Home`,body:`Welcome to my site. 滾動 / 點擊上面的 nav,header 會 morph 過去。`},about:{title:`About`,body:`About 頁面。Header 從上一頁的位置滑過來,因為兩頁的 site-header 共用 view-transition-name。`},blog:{title:`Blog`,body:`Blog 頁面。每次切換 main-content cross-fade,site-header 仍是同一個 VT 群組。`}};function Y(){let[e,t]=(0,m.useState)(`home`);function n(e){function n(){t(e)}document.startViewTransition?document.startViewTransition(n):n()}let r=J[e];return(0,g.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,g.jsx)(`style`,{children:`
        ::view-transition-group(wham-vt-route-header) {
          animation-duration: 450ms;
          animation-timing-function: cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        ::view-transition-group(wham-vt-route-main) {
          animation-duration: 350ms;
        }
      `}),(0,g.jsxs)(`div`,{className:`flex items-center gap-4 rounded-md bg-slate-900 px-4 py-3`,style:{viewTransitionName:`wham-vt-route-header`},children:[(0,g.jsx)(`span`,{className:`font-mono text-sm text-amber-300`,children:`josh.dev`}),(0,g.jsx)(`nav`,{className:`flex gap-3`,children:Object.keys(J).map(t=>(0,g.jsx)(`button`,{type:`button`,onClick:()=>n(t),className:`text-sm ${e===t?`font-bold text-white`:`text-gray-400 hover:text-white`}`,children:t},t))})]}),(0,g.jsxs)(`article`,{className:`rounded-md bg-slate-100 p-4`,style:{viewTransitionName:`wham-vt-route-main`},children:[(0,g.jsx)(`h2`,{className:`text-lg font-bold text-slate-900`,children:r.title}),(0,g.jsx)(`p`,{className:`mt-2 text-sm text-slate-700`,children:r.body})]}),(0,g.jsx)(`p`,{className:`text-xs text-gray-500`,children:"這裡是 same-document 模擬。換成多頁網站只要在 CSS 加 `@view-transition { navigation: auto }`,瀏覽器自動 trigger 真實 cross-document VT。"})]})}var X=[`oklch(0.78 0.18 30)`,`oklch(0.78 0.18 70)`,`oklch(0.78 0.18 110)`,`oklch(0.78 0.18 160)`,`oklch(0.78 0.18 210)`,`oklch(0.78 0.18 260)`,`oklch(0.78 0.18 300)`,`oklch(0.78 0.18 340)`],Z=Array.from({length:8},(e,t)=>({id:`t${t}`,color:X[t]}));function Q(){let[e,t]=(0,m.useState)(Z);function n(){function e(){(0,m.startTransition)(()=>{t(e=>p(e))})}document.startViewTransition?document.startViewTransition(e):e()}return(0,g.jsxs)(`div`,{className:`flex flex-col items-center gap-3`,children:[(0,g.jsx)(`style`,{children:`
        ::view-transition-group(.wham-vt-react-tile) {
          animation-duration: 500ms;
          animation-timing-function: cubic-bezier(0.35, 0.5, 0, 1);
        }
      `}),(0,g.jsx)(`div`,{className:`grid grid-cols-4 gap-2 rounded-md bg-slate-900 p-3`,children:e.map(e=>(0,g.jsx)(`div`,{className:`h-14 w-14 rounded-md`,style:{backgroundColor:e.color,viewTransitionName:`wham-vt-react-${e.id}`,viewTransitionClass:`wham-vt-react-tile`}},e.id))}),(0,g.jsx)(`button`,{type:`button`,onClick:n,className:`rounded bg-slate-800 px-3 py-1 font-mono text-xs text-white hover:bg-slate-700`,children:`shuffle`}),(0,g.jsx)(`p`,{className:`text-xs text-gray-500`,children:`手動 startViewTransition + startTransition,interrupt 可中斷(快速狂點 shuffle 看效果)。`})]})}export{Q as a,M as c,T as d,S as f,R as i,I as l,H as n,q as o,c as p,Y as r,z as s,P as t,G as u};