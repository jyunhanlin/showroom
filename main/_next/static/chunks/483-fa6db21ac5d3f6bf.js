(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[483],{1516:function(e,t){"use strict";function n(e,t,n,r){return!1}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getDomainLocale",{enumerable:!0,get:function(){return n}}),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},5569:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return x}});let r=n(4788),o=n(8754),a=n(224),l=o._(n(7294)),i=n(4532),u=n(3353),c=n(1410),s=n(9064),d=n(370),f=n(9955),p=n(4224),v=n(508),h=n(1516),m=n(4266),y=new Set;function b(e,t,n,r,o){if(o||(0,u.isLocalURL)(t)){if(!r.bypassPrefetchedCheck){let o=void 0!==r.locale?r.locale:"locale"in e?e.locale:void 0,a=t+"%"+n+"%"+o;if(y.has(a))return;y.add(a)}Promise.resolve(e.prefetch(t,n,r)).catch(e=>{})}}function k(e){return"string"==typeof e?e:(0,c.formatUrl)(e)}let g=l.default.forwardRef(function(e,t){let n,o;let{href:c,as:y,children:g,prefetch:x,passHref:w,replace:C,shallow:_,scroll:j,locale:P,onClick:E,onMouseEnter:L,onTouchStart:M,legacyBehavior:S=!1}=e,O=a._(e,["href","as","children","prefetch","passHref","replace","shallow","scroll","locale","onClick","onMouseEnter","onTouchStart","legacyBehavior"]);n=g,S&&("string"==typeof n||"number"==typeof n)&&(n=l.default.createElement("a",null,n));let B=!1!==x,N=l.default.useContext(f.RouterContext),T=l.default.useContext(p.AppRouterContext),F=null!=N?N:T,I=!N,{href:D,as:R}=l.default.useMemo(()=>{if(!N){let e=k(c);return{href:e,as:y?k(y):e}}let[e,t]=(0,i.resolveHref)(N,c,!0);return{href:e,as:y?(0,i.resolveHref)(N,y):t||e}},[N,c,y]),G=l.default.useRef(D),A=l.default.useRef(R);S&&(o=l.default.Children.only(n));let q=S?o&&"object"==typeof o&&o.ref:t,[H,K,z]=(0,v.useIntersection)({rootMargin:"200px"}),U=l.default.useCallback(e=>{(A.current!==R||G.current!==D)&&(z(),A.current=R,G.current=D),H(e),q&&("function"==typeof q?q(e):"object"==typeof q&&(q.current=e))},[R,q,D,z,H]);l.default.useEffect(()=>{F&&K&&B&&b(F,D,R,{locale:P},I)},[R,D,K,P,B,null==N?void 0:N.locale,F,I]);let W={ref:U,onClick(e){S||"function"!=typeof E||E(e),S&&o.props&&"function"==typeof o.props.onClick&&o.props.onClick(e),F&&!e.defaultPrevented&&function(e,t,n,r,o,a,i,c,s,d){let{nodeName:f}=e.currentTarget,p="A"===f.toUpperCase();if(p&&(function(e){let t=e.currentTarget,n=t.getAttribute("target");return n&&"_self"!==n||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)||!s&&!(0,u.isLocalURL)(n)))return;e.preventDefault();let v=()=>{"beforePopState"in t?t[o?"replace":"push"](n,r,{shallow:a,locale:c,scroll:i}):t[o?"replace":"push"](r||n,{forceOptimisticNavigation:!d})};s?l.default.startTransition(v):v()}(e,F,D,R,C,_,j,P,I,B)},onMouseEnter(e){S||"function"!=typeof L||L(e),S&&o.props&&"function"==typeof o.props.onMouseEnter&&o.props.onMouseEnter(e),F&&(B||!I)&&b(F,D,R,{locale:P,priority:!0,bypassPrefetchedCheck:!0},I)},onTouchStart(e){S||"function"!=typeof M||M(e),S&&o.props&&"function"==typeof o.props.onTouchStart&&o.props.onTouchStart(e),F&&(B||!I)&&b(F,D,R,{locale:P,priority:!0,bypassPrefetchedCheck:!0},I)}};if((0,s.isAbsoluteUrl)(R))W.href=R;else if(!S||w||"a"===o.type&&!("href"in o.props)){let e=void 0!==P?P:null==N?void 0:N.locale,t=(null==N?void 0:N.isLocaleDomain)&&(0,h.getDomainLocale)(R,e,null==N?void 0:N.locales,null==N?void 0:N.domainLocales);W.href=t||(0,m.addBasePath)((0,d.addLocale)(R,e,null==N?void 0:N.defaultLocale))}return S?l.default.cloneElement(o,W):l.default.createElement("a",r._({},O,W),n)}),x=g;("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},508:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useIntersection",{enumerable:!0,get:function(){return u}});let r=n(7294),o=n(29),a="function"==typeof IntersectionObserver,l=new Map,i=[];function u(e){let{rootRef:t,rootMargin:n,disabled:u}=e,c=u||!a,[s,d]=(0,r.useState)(!1),f=(0,r.useRef)(null),p=(0,r.useCallback)(e=>{f.current=e},[]);(0,r.useEffect)(()=>{if(a){if(c||s)return;let e=f.current;if(e&&e.tagName){let r=function(e,t,n){let{id:r,observer:o,elements:a}=function(e){let t;let n={root:e.root||null,margin:e.rootMargin||""},r=i.find(e=>e.root===n.root&&e.margin===n.margin);if(r&&(t=l.get(r)))return t;let o=new Map,a=new IntersectionObserver(e=>{e.forEach(e=>{let t=o.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)})},e);return t={id:n,observer:a,elements:o},i.push(n),l.set(n,t),t}(n);return a.set(e,t),o.observe(e),function(){if(a.delete(e),o.unobserve(e),0===a.size){o.disconnect(),l.delete(r);let e=i.findIndex(e=>e.root===r.root&&e.margin===r.margin);e>-1&&i.splice(e,1)}}}(e,e=>e&&d(e),{root:null==t?void 0:t.current,rootMargin:n});return r}}else if(!s){let e=(0,o.requestIdleCallback)(()=>d(!0));return()=>(0,o.cancelIdleCallback)(e)}},[c,n,t,s,f.current]);let v=(0,r.useCallback)(()=>{d(!1)},[]);return[p,s,v]}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1664:function(e,t,n){e.exports=n(5569)},7219:function(e,t,n){"use strict";n.d(t,{uOf:function(){return s},qOw:function(){return d},Ccr:function(){return f}});var r=n(7294),o={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},a=r.createContext&&r.createContext(o),l=function(){return(l=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},i=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&0>t.indexOf(r)&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)0>t.indexOf(r[o])&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n};function u(e){return function(t){return r.createElement(c,l({attr:l({},e.attr)},t),function e(t){return t&&t.map(function(t,n){return r.createElement(t.tag,l({key:n},t.attr),e(t.child))})}(e.child))}}function c(e){var t=function(t){var n,o=e.attr,a=e.size,u=e.title,c=i(e,["attr","size","title"]),s=a||t.size||"1em";return t.className&&(n=t.className),e.className&&(n=(n?n+" ":"")+e.className),r.createElement("svg",l({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,o,c,{className:n,style:l(l({color:e.color||t.color},t.style),e.style),height:s,width:s,xmlns:"http://www.w3.org/2000/svg"}),u&&r.createElement("title",null,u),e.children)};return void 0!==a?r.createElement(a.Consumer,null,function(e){return t(e)}):t(o)}function s(e){return u({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"}}]})(e)}function d(e){return u({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"}},{tag:"rect",attr:{x:"2",y:"9",width:"4",height:"12"}},{tag:"circle",attr:{cx:"4",cy:"4",r:"2"}}]})(e)}function f(e){return u({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"}}]})(e)}},3100:function(e,t,n){"use strict";n.d(t,{xu:function(){return l}});var r=n(2504),o=n(5059),a=n(5893),l=(0,r.m)("div");l.displayName="Box";var i=(0,o.G)(function(e,t){let{size:n,centerContent:r=!0,...o}=e;return(0,a.jsx)(l,{ref:t,boxSize:n,__css:{...r?{display:"flex",alignItems:"center",justifyContent:"center"}:{},flexShrink:0,flexGrow:0},...o})});i.displayName="Square",(0,o.G)(function(e,t){let{size:n,...r}=e;return(0,a.jsx)(i,{size:n,ref:t,borderRadius:"9999px",...r})}).displayName="Circle"},4418:function(e,t,n){"use strict";n.d(t,{X:function(){return c}});var r=n(5059),o=n(1628),a=n(3179),l=n(2504),i=n(5432),u=n(5893),c=(0,r.G)(function(e,t){let n=(0,o.mq)("Heading",e),{className:r,...c}=(0,a.Lr)(e);return(0,u.jsx)(l.m.h2,{ref:t,className:(0,i.cx)("chakra-heading",e.className),...c,__css:n})});c.displayName="Heading"},204:function(e,t,n){"use strict";n.d(t,{k:function(){return l}});var r=n(5059),o=n(2504),a=n(5893),l=(0,r.G)(function(e,t){let{direction:n,align:r,justify:l,wrap:i,basis:u,grow:c,shrink:s,...d}=e;return(0,a.jsx)(o.m.div,{ref:t,__css:{display:"flex",flexDirection:n,alignItems:r,justifyContent:l,flexWrap:i,flexBasis:u,flexGrow:c,flexShrink:s},...d})});l.displayName="Flex"},9564:function(e,t,n){"use strict";n.d(t,{x:function(){return c}});var r=n(5059),o=n(1628),a=n(3179),l=n(2504),i=n(5432),u=n(5893),c=(0,r.G)(function(e,t){let n=(0,o.mq)("Text",e),{className:r,align:c,decoration:s,casing:d,...f}=(0,a.Lr)(e),p=function(e){let t=Object.assign({},e);for(let e in t)void 0===t[e]&&delete t[e];return t}({textAlign:e.align,textDecoration:e.decoration,textTransform:e.casing});return(0,u.jsx)(l.m.p,{ref:t,className:(0,i.cx)("chakra-text",e.className),...p,...f,__css:n})});c.displayName="Text"},3838:function(e,t,n){"use strict";n.d(t,{r:function(){return c}});var r=n(5059),o=n(1628),a=n(3179),l=n(2504),i=n(5432),u=n(5893),c=(0,r.G)(function(e,t){let n=(0,o.mq)("Link",e),{className:r,isExternal:c,...s}=(0,a.Lr)(e);return(0,u.jsx)(l.m.a,{target:c?"_blank":void 0,rel:c?"noopener":void 0,ref:t,className:(0,i.cx)("chakra-link",r),...s,__css:n})});c.displayName="Link"},5527:function(e,t,n){"use strict";n.d(t,{r:function(){return T}});var r=n(5227),o=n(7294);function a(...e){return t=>{e.forEach(e=>{!function(e,t){if(null!=e){if("function"==typeof e){e(t);return}try{e.current=t}catch(n){throw Error(`Cannot assign value '${t}' to ref '${e}'`)}}}(e,t)})}}var l=n(5059),i=n(1628),u=n(3179),c=n(2504),s=n(5432),d=n(5893),[f,p]=(0,r.k)({name:"FormControlStylesContext",errorMessage:"useFormControlStyles returned is 'undefined'. Seems you forgot to wrap the components in \"<FormControl />\" "}),[v,h]=(0,r.k)({strict:!1,name:"FormControlContext"});(0,l.G)(function(e,t){let n=(0,i.jC)("Form",e),r=(0,u.Lr)(e),{getRootProps:l,htmlProps:p,...h}=function(e){let{id:t,isRequired:n,isInvalid:r,isDisabled:l,isReadOnly:i,...u}=e,c=(0,o.useId)(),d=t||`field-${c}`,f=`${d}-label`,p=`${d}-feedback`,v=`${d}-helptext`,[h,m]=(0,o.useState)(!1),[y,b]=(0,o.useState)(!1),[k,g]=(0,o.useState)(!1),x=(0,o.useCallback)((e={},t=null)=>({id:v,...e,ref:a(t,e=>{e&&b(!0)})}),[v]),w=(0,o.useCallback)((e={},t=null)=>({...e,ref:t,"data-focus":(0,s.PB)(k),"data-disabled":(0,s.PB)(l),"data-invalid":(0,s.PB)(r),"data-readonly":(0,s.PB)(i),id:void 0!==e.id?e.id:f,htmlFor:void 0!==e.htmlFor?e.htmlFor:d}),[d,l,k,r,i,f]),C=(0,o.useCallback)((e={},t=null)=>({id:p,...e,ref:a(t,e=>{e&&m(!0)}),"aria-live":"polite"}),[p]),_=(0,o.useCallback)((e={},t=null)=>({...e,...u,ref:t,role:"group"}),[u]),j=(0,o.useCallback)((e={},t=null)=>({...e,ref:t,role:"presentation","aria-hidden":!0,children:e.children||"*"}),[]);return{isRequired:!!n,isInvalid:!!r,isReadOnly:!!i,isDisabled:!!l,isFocused:!!k,onFocus:()=>g(!0),onBlur:()=>g(!1),hasFeedbackText:h,setHasFeedbackText:m,hasHelpText:y,setHasHelpText:b,id:d,labelId:f,feedbackId:p,helpTextId:v,htmlProps:u,getHelpTextProps:x,getErrorMessageProps:C,getRootProps:_,getLabelProps:w,getRequiredIndicatorProps:j}}(r),m=(0,s.cx)("chakra-form-control",e.className);return(0,d.jsx)(v,{value:h,children:(0,d.jsx)(f,{value:n,children:(0,d.jsx)(c.m.div,{...l({},t),className:m,__css:n.container})})})}).displayName="FormControl",(0,l.G)(function(e,t){let n=h(),r=p(),o=(0,s.cx)("chakra-form__helper-text",e.className);return(0,d.jsx)(c.m.div,{...null==n?void 0:n.getHelpTextProps(e,t),__css:r.helperText,className:o})}).displayName="FormHelperText";var m=n(6245),y=n(2366),b=n(5155),k={border:"0",clip:"rect(0, 0, 0, 0)",height:"1px",width:"1px",margin:"-1px",padding:"0",overflow:"hidden",whiteSpace:"nowrap",position:"absolute"},g=!1,x=null,w=!1,C=!1,_=new Set;function j(e,t){_.forEach(n=>n(e,t))}var P="undefined"!=typeof window&&null!=window.navigator&&/^Mac/.test(window.navigator.platform);function E(e){w=!0,e.metaKey||!P&&e.altKey||e.ctrlKey||"Control"===e.key||"Shift"===e.key||"Meta"===e.key||(x="keyboard",j("keyboard",e))}function L(e){if(x="pointer","mousedown"===e.type||"pointerdown"===e.type){w=!0;let t=e.composedPath?e.composedPath()[0]:e.target,n=!1;try{n=t.matches(":focus-visible")}catch{}n||j("pointer",e)}}function M(e){(0===e.mozInputSource&&e.isTrusted||0===e.detail&&!e.pointerType)&&(w=!0,x="virtual")}function S(e){e.target!==window&&e.target!==document&&(w||C||(x="virtual",j("virtual",e)),w=!1,C=!1)}function O(){w=!1,C=!0}function B(){return"pointer"!==x}function N(e){e.preventDefault(),e.stopPropagation()}var T=(0,l.G)(function(e,t){let n=(0,i.jC)("Switch",e),{spacing:r="0.5rem",children:l,...f}=(0,u.Lr)(e),{state:p,getInputProps:v,getCheckboxProps:x,getRootProps:C,getLabelProps:j}=function(e={}){let t=function(e){var t,n,r;let o=h(),{id:a,disabled:l,readOnly:i,required:u,isRequired:c,isInvalid:d,isReadOnly:f,isDisabled:p,onFocus:v,onBlur:m,...y}=e,b=e["aria-describedby"]?[e["aria-describedby"]]:[];return(null==o?void 0:o.hasFeedbackText)&&(null==o?void 0:o.isInvalid)&&b.push(o.feedbackId),(null==o?void 0:o.hasHelpText)&&b.push(o.helpTextId),{...y,"aria-describedby":b.join(" ")||void 0,id:null!=a?a:null==o?void 0:o.id,isDisabled:null!=(t=null!=l?l:p)?t:null==o?void 0:o.isDisabled,isReadOnly:null!=(n=null!=i?i:f)?n:null==o?void 0:o.isReadOnly,isRequired:null!=(r=null!=u?u:c)?r:null==o?void 0:o.isRequired,isInvalid:null!=d?d:null==o?void 0:o.isInvalid,onFocus:(0,s.v0)(null==o?void 0:o.onFocus,v),onBlur:(0,s.v0)(null==o?void 0:o.onBlur,m)}}(e),{isDisabled:n,isReadOnly:r,isRequired:l,isInvalid:i,id:u,onBlur:c,onFocus:d,"aria-describedby":f}=t,{defaultChecked:p,isChecked:v,isFocusable:x,onChange:C,isIndeterminate:j,name:P,value:T,tabIndex:F,"aria-label":I,"aria-labelledby":D,"aria-invalid":R,...G}=e,A=function(e,t=[]){let n=Object.assign({},e);for(let e of t)e in n&&delete n[e];return n}(G,["isDisabled","isReadOnly","isRequired","isInvalid","id","onBlur","onFocus","aria-describedby"]),q=(0,b.W)(C),H=(0,b.W)(c),K=(0,b.W)(d),[z,U]=(0,o.useState)(!1),[W,$]=(0,o.useState)(!1),[V,X]=(0,o.useState)(!1),[J,Q]=(0,o.useState)(!1);(0,o.useEffect)(()=>(function(e){!function(){if("undefined"==typeof window||g)return;let{focus:e}=HTMLElement.prototype;HTMLElement.prototype.focus=function(...t){w=!0,e.apply(this,t)},document.addEventListener("keydown",E,!0),document.addEventListener("keyup",E,!0),document.addEventListener("click",M,!0),window.addEventListener("focus",S,!0),window.addEventListener("blur",O,!1),"undefined"!=typeof PointerEvent?(document.addEventListener("pointerdown",L,!0),document.addEventListener("pointermove",L,!0),document.addEventListener("pointerup",L,!0)):(document.addEventListener("mousedown",L,!0),document.addEventListener("mousemove",L,!0),document.addEventListener("mouseup",L,!0)),g=!0}(),e(B());let t=()=>e(B());return _.add(t),()=>{_.delete(t)}})(U),[]);let Y=(0,o.useRef)(null),[Z,ee]=(0,o.useState)(!0),[et,en]=(0,o.useState)(!!p),er=void 0!==v,eo=er?v:et,ea=(0,o.useCallback)(e=>{if(r||n){e.preventDefault();return}er||(eo?en(e.target.checked):en(!!j||e.target.checked)),null==q||q(e)},[r,n,eo,er,j,q]);(0,m.G)(()=>{Y.current&&(Y.current.indeterminate=!!j)},[j]),(0,y.r)(()=>{n&&$(!1)},[n,$]),(0,m.G)(()=>{let e=Y.current;(null==e?void 0:e.form)&&(e.form.onreset=()=>{en(!!p)})},[]);let el=n&&!x,ei=(0,o.useCallback)(e=>{" "===e.key&&Q(!0)},[Q]),eu=(0,o.useCallback)(e=>{" "===e.key&&Q(!1)},[Q]);(0,m.G)(()=>{if(!Y.current)return;let e=Y.current.checked!==eo;e&&en(Y.current.checked)},[Y.current]);let ec=(0,o.useCallback)((e={},t=null)=>{let o=e=>{W&&e.preventDefault(),Q(!0)};return{...e,ref:t,"data-active":(0,s.PB)(J),"data-hover":(0,s.PB)(V),"data-checked":(0,s.PB)(eo),"data-focus":(0,s.PB)(W),"data-focus-visible":(0,s.PB)(W&&z),"data-indeterminate":(0,s.PB)(j),"data-disabled":(0,s.PB)(n),"data-invalid":(0,s.PB)(i),"data-readonly":(0,s.PB)(r),"aria-hidden":!0,onMouseDown:(0,s.v0)(e.onMouseDown,o),onMouseUp:(0,s.v0)(e.onMouseUp,()=>Q(!1)),onMouseEnter:(0,s.v0)(e.onMouseEnter,()=>X(!0)),onMouseLeave:(0,s.v0)(e.onMouseLeave,()=>X(!1))}},[J,eo,n,W,z,V,j,i,r]),es=(0,o.useCallback)((e={},t=null)=>({...A,...e,ref:a(t,e=>{e&&ee("LABEL"===e.tagName)}),onClick:(0,s.v0)(e.onClick,()=>{var e;Z||(null==(e=Y.current)||e.click(),requestAnimationFrame(()=>{var e;null==(e=Y.current)||e.focus({preventScroll:!0})}))}),"data-disabled":(0,s.PB)(n),"data-checked":(0,s.PB)(eo),"data-invalid":(0,s.PB)(i)}),[A,n,eo,i,Z]),ed=(0,o.useCallback)((e={},t=null)=>({...e,ref:a(Y,t),type:"checkbox",name:P,value:T,id:u,tabIndex:F,onChange:(0,s.v0)(e.onChange,ea),onBlur:(0,s.v0)(e.onBlur,H,()=>$(!1)),onFocus:(0,s.v0)(e.onFocus,K,()=>$(!0)),onKeyDown:(0,s.v0)(e.onKeyDown,ei),onKeyUp:(0,s.v0)(e.onKeyUp,eu),required:l,checked:eo,disabled:el,readOnly:r,"aria-label":I,"aria-labelledby":D,"aria-invalid":R?!!R:i,"aria-describedby":f,"aria-disabled":n,style:k}),[P,T,u,ea,H,K,ei,eu,l,eo,el,r,I,D,R,i,f,n,F]),ef=(0,o.useCallback)((e={},t=null)=>({...e,ref:t,onMouseDown:(0,s.v0)(e.onMouseDown,N),"data-disabled":(0,s.PB)(n),"data-checked":(0,s.PB)(eo),"data-invalid":(0,s.PB)(i)}),[eo,n,i]);return{state:{isInvalid:i,isFocused:W,isChecked:eo,isActive:J,isHovered:V,isIndeterminate:j,isDisabled:n,isReadOnly:r,isRequired:l},getRootProps:es,getCheckboxProps:ec,getInputProps:ed,getLabelProps:ef,htmlProps:A}}(f),P=(0,o.useMemo)(()=>({display:"inline-block",position:"relative",verticalAlign:"middle",lineHeight:0,...n.container}),[n.container]),T=(0,o.useMemo)(()=>({display:"inline-flex",flexShrink:0,justifyContent:"flex-start",boxSizing:"content-box",cursor:"pointer",...n.track}),[n.track]),F=(0,o.useMemo)(()=>({userSelect:"none",marginStart:r,...n.label}),[r,n.label]);return(0,d.jsxs)(c.m.label,{...C(),className:(0,s.cx)("chakra-switch",e.className),__css:P,children:[(0,d.jsx)("input",{className:"chakra-switch__input",...v({},t)}),(0,d.jsx)(c.m.span,{...x(),className:"chakra-switch__track",__css:T,children:(0,d.jsx)(c.m.span,{__css:n.thumb,className:"chakra-switch__thumb","data-checked":(0,s.PB)(p.isChecked),"data-hover":(0,s.PB)(p.isHovered)})}),l&&(0,d.jsx)(c.m.span,{className:"chakra-switch__label",...j(),__css:F,children:l})]})});T.displayName="Switch"}}]);