(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[256],{227:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getDomainLocale=function(e,t,n,r){return!1},("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1551:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(2648).Z,o=n(7273).Z,a=r(n(7294)),l=n(1003),i=n(7795),u=n(4465),s=n(2692),c=n(8245),d=n(9246),f=n(227),p=n(3468);let v=new Set;function h(e,t,n,r){if(l.isLocalURL(t)){if(!r.bypassPrefetchedCheck){let o=void 0!==r.locale?r.locale:"locale"in e?e.locale:void 0,a=t+"%"+n+"%"+o;if(v.has(a))return;v.add(a)}Promise.resolve(e.prefetch(t,n,r)).catch(e=>{})}}function m(e){return"string"==typeof e?e:i.formatUrl(e)}let y=a.default.forwardRef(function(e,t){let n,r;let{href:i,as:v,children:y,prefetch:b,passHref:k,replace:x,shallow:g,scroll:w,locale:C,onClick:_,onMouseEnter:j,onTouchStart:P,legacyBehavior:E=!1}=e,L=o(e,["href","as","children","prefetch","passHref","replace","shallow","scroll","locale","onClick","onMouseEnter","onTouchStart","legacyBehavior"]);n=y,E&&("string"==typeof n||"number"==typeof n)&&(n=a.default.createElement("a",null,n));let M=!1!==b,S=a.default.useContext(s.RouterContext),B=a.default.useContext(c.AppRouterContext),N=null!=S?S:B,O=!S,{href:T,as:I}=a.default.useMemo(()=>{if(!S){let e=m(i);return{href:e,as:v?m(v):e}}let[t,n]=l.resolveHref(S,i,!0);return{href:t,as:v?l.resolveHref(S,v):n||t}},[S,i,v]),D=a.default.useRef(T),F=a.default.useRef(I);E&&(r=a.default.Children.only(n));let R=E?r&&"object"==typeof r&&r.ref:t,[G,q,H]=d.useIntersection({rootMargin:"200px"}),A=a.default.useCallback(e=>{(F.current!==I||D.current!==T)&&(H(),F.current=I,D.current=T),G(e),R&&("function"==typeof R?R(e):"object"==typeof R&&(R.current=e))},[I,R,T,H,G]);a.default.useEffect(()=>{N&&q&&M&&h(N,T,I,{locale:C})},[I,T,q,C,M,null==S?void 0:S.locale,N]);let K={ref:A,onClick(e){E||"function"!=typeof _||_(e),E&&r.props&&"function"==typeof r.props.onClick&&r.props.onClick(e),N&&!e.defaultPrevented&&function(e,t,n,r,o,i,u,s,c,d){let{nodeName:f}=e.currentTarget,p="A"===f.toUpperCase();if(p&&(function(e){let{target:t}=e.currentTarget;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)||!l.isLocalURL(n)))return;e.preventDefault();let v=()=>{"beforePopState"in t?t[o?"replace":"push"](n,r,{shallow:i,locale:s,scroll:u}):t[o?"replace":"push"](r||n,{forceOptimisticNavigation:!d})};c?a.default.startTransition(v):v()}(e,N,T,I,x,g,w,C,O,M)},onMouseEnter(e){E||"function"!=typeof j||j(e),E&&r.props&&"function"==typeof r.props.onMouseEnter&&r.props.onMouseEnter(e),N&&(M||!O)&&h(N,T,I,{locale:C,priority:!0,bypassPrefetchedCheck:!0})},onTouchStart(e){E||"function"!=typeof P||P(e),E&&r.props&&"function"==typeof r.props.onTouchStart&&r.props.onTouchStart(e),N&&(M||!O)&&h(N,T,I,{locale:C,priority:!0,bypassPrefetchedCheck:!0})}};if(!E||k||"a"===r.type&&!("href"in r.props)){let z=void 0!==C?C:null==S?void 0:S.locale,U=(null==S?void 0:S.isLocaleDomain)&&f.getDomainLocale(I,z,null==S?void 0:S.locales,null==S?void 0:S.domainLocales);K.href=U||p.addBasePath(u.addLocale(I,z,null==S?void 0:S.defaultLocale))}return E?a.default.cloneElement(r,K):a.default.createElement("a",Object.assign({},L,K),n)});t.default=y,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},9246:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){let{rootRef:t,rootMargin:n,disabled:u}=e,s=u||!a,[c,d]=r.useState(!1),[f,p]=r.useState(null);r.useEffect(()=>{if(a){if(!s&&!c&&f&&f.tagName){let e=function(e,t,n){let{id:r,observer:o,elements:a}=function(e){let t;let n={root:e.root||null,margin:e.rootMargin||""},r=i.find(e=>e.root===n.root&&e.margin===n.margin);if(r&&(t=l.get(r)))return t;let o=new Map,a=new IntersectionObserver(e=>{e.forEach(e=>{let t=o.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)})},e);return t={id:n,observer:a,elements:o},i.push(n),l.set(n,t),t}(n);return a.set(e,t),o.observe(e),function(){if(a.delete(e),o.unobserve(e),0===a.size){o.disconnect(),l.delete(r);let t=i.findIndex(e=>e.root===r.root&&e.margin===r.margin);t>-1&&i.splice(t,1)}}}(f,e=>e&&d(e),{root:null==t?void 0:t.current,rootMargin:n});return e}}else if(!c){let r=o.requestIdleCallback(()=>d(!0));return()=>o.cancelIdleCallback(r)}},[f,s,n,t,c]);let v=r.useCallback(()=>{d(!1)},[]);return[p,c,v]};var r=n(7294),o=n(4686);let a="function"==typeof IntersectionObserver,l=new Map,i=[];("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1664:function(e,t,n){e.exports=n(1551)},7219:function(e,t,n){"use strict";n.d(t,{uOf:function(){return c},qOw:function(){return d},Ccr:function(){return f}});var r=n(7294),o={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},a=r.createContext&&r.createContext(o),l=function(){return(l=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},i=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&0>t.indexOf(r)&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)0>t.indexOf(r[o])&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n};function u(e){return function(t){return r.createElement(s,l({attr:l({},e.attr)},t),function e(t){return t&&t.map(function(t,n){return r.createElement(t.tag,l({key:n},t.attr),e(t.child))})}(e.child))}}function s(e){var t=function(t){var n,o=e.attr,a=e.size,u=e.title,s=i(e,["attr","size","title"]),c=a||t.size||"1em";return t.className&&(n=t.className),e.className&&(n=(n?n+" ":"")+e.className),r.createElement("svg",l({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,o,s,{className:n,style:l(l({color:e.color||t.color},t.style),e.style),height:c,width:c,xmlns:"http://www.w3.org/2000/svg"}),u&&r.createElement("title",null,u),e.children)};return void 0!==a?r.createElement(a.Consumer,null,function(e){return t(e)}):t(o)}function c(e){return u({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"}}]})(e)}function d(e){return u({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"}},{tag:"rect",attr:{x:"2",y:"9",width:"4",height:"12"}},{tag:"circle",attr:{cx:"4",cy:"4",r:"2"}}]})(e)}function f(e){return u({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"}}]})(e)}},3100:function(e,t,n){"use strict";n.d(t,{xu:function(){return l}});var r=n(6660),o=n(5059),a=n(5893),l=(0,r.m)("div");l.displayName="Box";var i=(0,o.G)(function(e,t){let{size:n,centerContent:r=!0,...o}=e;return(0,a.jsx)(l,{ref:t,boxSize:n,__css:{...r?{display:"flex",alignItems:"center",justifyContent:"center"}:{},flexShrink:0,flexGrow:0},...o})});i.displayName="Square",(0,o.G)(function(e,t){let{size:n,...r}=e;return(0,a.jsx)(i,{size:n,ref:t,borderRadius:"9999px",...r})}).displayName="Circle"},4418:function(e,t,n){"use strict";n.d(t,{X:function(){return s}});var r=n(5059),o=n(1628),a=n(3179),l=n(6660),i=n(5432),u=n(5893),s=(0,r.G)(function(e,t){let n=(0,o.mq)("Heading",e),{className:r,...s}=(0,a.Lr)(e);return(0,u.jsx)(l.m.h2,{ref:t,className:(0,i.cx)("chakra-heading",e.className),...s,__css:n})});s.displayName="Heading"},204:function(e,t,n){"use strict";n.d(t,{k:function(){return l}});var r=n(5059),o=n(6660),a=n(5893),l=(0,r.G)(function(e,t){let{direction:n,align:r,justify:l,wrap:i,basis:u,grow:s,shrink:c,...d}=e;return(0,a.jsx)(o.m.div,{ref:t,__css:{display:"flex",flexDirection:n,alignItems:r,justifyContent:l,flexWrap:i,flexBasis:u,flexGrow:s,flexShrink:c},...d})});l.displayName="Flex"},3205:function(e,t,n){"use strict";n.d(t,{x:function(){return s}});var r=n(5059),o=n(1628),a=n(3179),l=n(6660),i=n(5432),u=n(5893),s=(0,r.G)(function(e,t){let n=(0,o.mq)("Text",e),{className:r,align:s,decoration:c,casing:d,...f}=(0,a.Lr)(e),p=function(e){let t=Object.assign({},e);for(let n in t)void 0===t[n]&&delete t[n];return t}({textAlign:e.align,textDecoration:e.decoration,textTransform:e.casing});return(0,u.jsx)(l.m.p,{ref:t,className:(0,i.cx)("chakra-text",e.className),...p,...f,__css:n})});s.displayName="Text"},3838:function(e,t,n){"use strict";n.d(t,{r:function(){return s}});var r=n(5059),o=n(1628),a=n(3179),l=n(6660),i=n(5432),u=n(5893),s=(0,r.G)(function(e,t){let n=(0,o.mq)("Link",e),{className:r,isExternal:s,...c}=(0,a.Lr)(e);return(0,u.jsx)(l.m.a,{target:s?"_blank":void 0,rel:s?"noopener":void 0,ref:t,className:(0,i.cx)("chakra-link",r),...c,__css:n})});s.displayName="Link"},6219:function(e,t,n){"use strict";n.d(t,{r:function(){return T}});var r=n(5227),o=n(7294);function a(...e){return t=>{e.forEach(e=>{!function(e,t){if(null!=e){if("function"==typeof e){e(t);return}try{e.current=t}catch(n){throw Error(`Cannot assign value '${t}' to ref '${e}'`)}}}(e,t)})}}var l=n(5059),i=n(1628),u=n(3179),s=n(6660),c=n(5432),d=n(5893),[f,p]=(0,r.k)({name:"FormControlStylesContext",errorMessage:"useFormControlStyles returned is 'undefined'. Seems you forgot to wrap the components in \"<FormControl />\" "}),[v,h]=(0,r.k)({strict:!1,name:"FormControlContext"});(0,l.G)(function(e,t){let n=(0,i.jC)("Form",e),r=(0,u.Lr)(e),{getRootProps:l,htmlProps:p,...h}=function(e){let{id:t,isRequired:n,isInvalid:r,isDisabled:l,isReadOnly:i,...u}=e,s=(0,o.useId)(),d=t||`field-${s}`,f=`${d}-label`,p=`${d}-feedback`,v=`${d}-helptext`,[h,m]=(0,o.useState)(!1),[y,b]=(0,o.useState)(!1),[k,x]=(0,o.useState)(!1),g=(0,o.useCallback)((e={},t=null)=>({id:v,...e,ref:a(t,e=>{e&&b(!0)})}),[v]),w=(0,o.useCallback)((e={},t=null)=>{var n,o;return{...e,ref:t,"data-focus":(0,c.PB)(k),"data-disabled":(0,c.PB)(l),"data-invalid":(0,c.PB)(r),"data-readonly":(0,c.PB)(i),id:null!=(n=e.id)?n:f,htmlFor:null!=(o=e.htmlFor)?o:d}},[d,l,k,r,i,f]),C=(0,o.useCallback)((e={},t=null)=>({id:p,...e,ref:a(t,e=>{e&&m(!0)}),"aria-live":"polite"}),[p]),_=(0,o.useCallback)((e={},t=null)=>({...e,...u,ref:t,role:"group"}),[u]),j=(0,o.useCallback)((e={},t=null)=>({...e,ref:t,role:"presentation","aria-hidden":!0,children:e.children||"*"}),[]);return{isRequired:!!n,isInvalid:!!r,isReadOnly:!!i,isDisabled:!!l,isFocused:!!k,onFocus:()=>x(!0),onBlur:()=>x(!1),hasFeedbackText:h,setHasFeedbackText:m,hasHelpText:y,setHasHelpText:b,id:d,labelId:f,feedbackId:p,helpTextId:v,htmlProps:u,getHelpTextProps:g,getErrorMessageProps:C,getRootProps:_,getLabelProps:w,getRequiredIndicatorProps:j}}(r),m=(0,c.cx)("chakra-form-control",e.className);return(0,d.jsx)(v,{value:h,children:(0,d.jsx)(f,{value:n,children:(0,d.jsx)(s.m.div,{...l({},t),className:m,__css:n.container})})})}).displayName="FormControl",(0,l.G)(function(e,t){let n=h(),r=p(),o=(0,c.cx)("chakra-form__helper-text",e.className);return(0,d.jsx)(s.m.div,{...null==n?void 0:n.getHelpTextProps(e,t),__css:r.helperText,className:o})}).displayName="FormHelperText";var m=n(6245),y=n(2366),b=n(5155),k={border:"0",clip:"rect(0, 0, 0, 0)",height:"1px",width:"1px",margin:"-1px",padding:"0",overflow:"hidden",whiteSpace:"nowrap",position:"absolute"},x=!1,g=null,w=!1,C=!1,_=new Set;function j(e,t){_.forEach(n=>n(e,t))}var P="undefined"!=typeof window&&null!=window.navigator&&/^Mac/.test(window.navigator.platform);function E(e){w=!0,e.metaKey||!P&&e.altKey||e.ctrlKey||"Control"===e.key||"Shift"===e.key||"Meta"===e.key||(g="keyboard",j("keyboard",e))}function L(e){if(g="pointer","mousedown"===e.type||"pointerdown"===e.type){w=!0;let t=e.composedPath?e.composedPath()[0]:e.target,n=!1;try{n=t.matches(":focus-visible")}catch{}n||j("pointer",e)}}function M(e){(0===e.mozInputSource&&e.isTrusted||0===e.detail&&!e.pointerType)&&(w=!0,g="virtual")}function S(e){e.target!==window&&e.target!==document&&(w||C||(g="virtual",j("virtual",e)),w=!1,C=!1)}function B(){w=!1,C=!0}function N(){return"pointer"!==g}function O(e){e.preventDefault(),e.stopPropagation()}var T=(0,l.G)(function(e,t){let n=(0,i.jC)("Switch",e),{spacing:r="0.5rem",children:l,...f}=(0,u.Lr)(e),{state:p,getInputProps:v,getCheckboxProps:g,getRootProps:C,getLabelProps:j}=function(e={}){let t=function(e){var t,n,r;let o=h(),{id:a,disabled:l,readOnly:i,required:u,isRequired:s,isInvalid:d,isReadOnly:f,isDisabled:p,onFocus:v,onBlur:m,...y}=e,b=e["aria-describedby"]?[e["aria-describedby"]]:[];return(null==o?void 0:o.hasFeedbackText)&&(null==o?void 0:o.isInvalid)&&b.push(o.feedbackId),(null==o?void 0:o.hasHelpText)&&b.push(o.helpTextId),{...y,"aria-describedby":b.join(" ")||void 0,id:null!=a?a:null==o?void 0:o.id,isDisabled:null!=(t=null!=l?l:p)?t:null==o?void 0:o.isDisabled,isReadOnly:null!=(n=null!=i?i:f)?n:null==o?void 0:o.isReadOnly,isRequired:null!=(r=null!=u?u:s)?r:null==o?void 0:o.isRequired,isInvalid:null!=d?d:null==o?void 0:o.isInvalid,onFocus:(0,c.v0)(null==o?void 0:o.onFocus,v),onBlur:(0,c.v0)(null==o?void 0:o.onBlur,m)}}(e),{isDisabled:n,isReadOnly:r,isRequired:l,isInvalid:i,id:u,onBlur:s,onFocus:d,"aria-describedby":f}=t,{defaultChecked:p,isChecked:v,isFocusable:g,onChange:C,isIndeterminate:j,name:P,value:T,tabIndex:I,"aria-label":D,"aria-labelledby":F,"aria-invalid":R,...G}=e,q=function(e,t=[]){let n=Object.assign({},e);for(let r of t)r in n&&delete n[r];return n}(G,["isDisabled","isReadOnly","isRequired","isInvalid","id","onBlur","onFocus","aria-describedby"]),H=(0,b.W)(C),A=(0,b.W)(s),K=(0,b.W)(d),[z,U]=(0,o.useState)(!1),[W,$]=(0,o.useState)(!1),[Z,V]=(0,o.useState)(!1),[X,J]=(0,o.useState)(!1);(0,o.useEffect)(()=>(function(e){!function(){if("undefined"==typeof window||x)return;let{focus:e}=HTMLElement.prototype;HTMLElement.prototype.focus=function(...t){w=!0,e.apply(this,t)},document.addEventListener("keydown",E,!0),document.addEventListener("keyup",E,!0),document.addEventListener("click",M,!0),window.addEventListener("focus",S,!0),window.addEventListener("blur",B,!1),"undefined"!=typeof PointerEvent?(document.addEventListener("pointerdown",L,!0),document.addEventListener("pointermove",L,!0),document.addEventListener("pointerup",L,!0)):(document.addEventListener("mousedown",L,!0),document.addEventListener("mousemove",L,!0),document.addEventListener("mouseup",L,!0)),x=!0}(),e(N());let t=()=>e(N());return _.add(t),()=>{_.delete(t)}})(U),[]);let Q=(0,o.useRef)(null),[Y,ee]=(0,o.useState)(!0),[et,en]=(0,o.useState)(!!p),er=void 0!==v,eo=er?v:et,ea=(0,o.useCallback)(e=>{if(r||n){e.preventDefault();return}er||(eo?en(e.target.checked):en(!!j||e.target.checked)),null==H||H(e)},[r,n,eo,er,j,H]);(0,m.G)(()=>{Q.current&&(Q.current.indeterminate=Boolean(j))},[j]),(0,y.r)(()=>{n&&$(!1)},[n,$]),(0,m.G)(()=>{let e=Q.current;(null==e?void 0:e.form)&&(e.form.onreset=()=>{en(!!p)})},[]);let el=n&&!g,ei=(0,o.useCallback)(e=>{" "===e.key&&J(!0)},[J]),eu=(0,o.useCallback)(e=>{" "===e.key&&J(!1)},[J]);(0,m.G)(()=>{if(!Q.current)return;let e=Q.current.checked!==eo;e&&en(Q.current.checked)},[Q.current]);let es=(0,o.useCallback)((e={},t=null)=>{let o=e=>{W&&e.preventDefault(),J(!0)};return{...e,ref:t,"data-active":(0,c.PB)(X),"data-hover":(0,c.PB)(Z),"data-checked":(0,c.PB)(eo),"data-focus":(0,c.PB)(W),"data-focus-visible":(0,c.PB)(W&&z),"data-indeterminate":(0,c.PB)(j),"data-disabled":(0,c.PB)(n),"data-invalid":(0,c.PB)(i),"data-readonly":(0,c.PB)(r),"aria-hidden":!0,onMouseDown:(0,c.v0)(e.onMouseDown,o),onMouseUp:(0,c.v0)(e.onMouseUp,()=>J(!1)),onMouseEnter:(0,c.v0)(e.onMouseEnter,()=>V(!0)),onMouseLeave:(0,c.v0)(e.onMouseLeave,()=>V(!1))}},[X,eo,n,W,z,Z,j,i,r]),ec=(0,o.useCallback)((e={},t=null)=>({...q,...e,ref:a(t,e=>{e&&ee("LABEL"===e.tagName)}),onClick:(0,c.v0)(e.onClick,()=>{var e;Y||(null==(e=Q.current)||e.click(),requestAnimationFrame(()=>{var e;null==(e=Q.current)||e.focus()}))}),"data-disabled":(0,c.PB)(n),"data-checked":(0,c.PB)(eo),"data-invalid":(0,c.PB)(i)}),[q,n,eo,i,Y]),ed=(0,o.useCallback)((e={},t=null)=>({...e,ref:a(Q,t),type:"checkbox",name:P,value:T,id:u,tabIndex:I,onChange:(0,c.v0)(e.onChange,ea),onBlur:(0,c.v0)(e.onBlur,A,()=>$(!1)),onFocus:(0,c.v0)(e.onFocus,K,()=>$(!0)),onKeyDown:(0,c.v0)(e.onKeyDown,ei),onKeyUp:(0,c.v0)(e.onKeyUp,eu),required:l,checked:eo,disabled:el,readOnly:r,"aria-label":D,"aria-labelledby":F,"aria-invalid":R?Boolean(R):i,"aria-describedby":f,"aria-disabled":n,style:k}),[P,T,u,ea,A,K,ei,eu,l,eo,el,r,D,F,R,i,f,n,I]),ef=(0,o.useCallback)((e={},t=null)=>({...e,ref:t,onMouseDown:(0,c.v0)(e.onMouseDown,O),onTouchStart:(0,c.v0)(e.onTouchStart,O),"data-disabled":(0,c.PB)(n),"data-checked":(0,c.PB)(eo),"data-invalid":(0,c.PB)(i)}),[eo,n,i]);return{state:{isInvalid:i,isFocused:W,isChecked:eo,isActive:X,isHovered:Z,isIndeterminate:j,isDisabled:n,isReadOnly:r,isRequired:l},getRootProps:ec,getCheckboxProps:es,getInputProps:ed,getLabelProps:ef,htmlProps:q}}(f),P=(0,o.useMemo)(()=>({display:"inline-block",position:"relative",verticalAlign:"middle",lineHeight:0,...n.container}),[n.container]),T=(0,o.useMemo)(()=>({display:"inline-flex",flexShrink:0,justifyContent:"flex-start",boxSizing:"content-box",cursor:"pointer",...n.track}),[n.track]),I=(0,o.useMemo)(()=>({userSelect:"none",marginStart:r,...n.label}),[r,n.label]);return(0,d.jsxs)(s.m.label,{...C(),className:(0,c.cx)("chakra-switch",e.className),__css:P,children:[(0,d.jsx)("input",{className:"chakra-switch__input",...v({},t)}),(0,d.jsx)(s.m.span,{...g(),className:"chakra-switch__track",__css:T,children:(0,d.jsx)(s.m.span,{__css:n.thumb,className:"chakra-switch__thumb","data-checked":(0,c.PB)(p.isChecked),"data-hover":(0,c.PB)(p.isHovered)})}),l&&(0,d.jsx)(s.m.span,{className:"chakra-switch__label",...j(),__css:I,children:l})]})});T.displayName="Switch"}}]);