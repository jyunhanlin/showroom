(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5301:function(e,r,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(2763)}])},8418:function(e,r,n){"use strict";function t(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var n=[],t=!0,a=!1,o=void 0;try{for(var l,i=e[Symbol.iterator]();!(t=(l=i.next()).done)&&(n.push(l.value),!r||n.length!==r);t=!0);}catch(c){a=!0,o=c}finally{try{t||null==i.return||i.return()}finally{if(a)throw o}}return n}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}r.default=void 0;var a,o=(a=n(7294))&&a.__esModule?a:{default:a},l=n(6273),i=n(387),c=n(7190);var s={};function u(e,r,n,t){if(e&&l.isLocalURL(r)){e.prefetch(r,n,t).catch((function(e){0}));var a=t&&"undefined"!==typeof t.locale?t.locale:e&&e.locale;s[r+"%"+n+(a?"%"+a:"")]=!0}}var f=function(e){var r,n=!1!==e.prefetch,a=i.useRouter(),f=o.default.useMemo((function(){var r=t(l.resolveHref(a,e.href,!0),2),n=r[0],o=r[1];return{href:n,as:e.as?l.resolveHref(a,e.as):o||n}}),[a,e.href,e.as]),d=f.href,v=f.as,p=e.children,h=e.replace,m=e.shallow,y=e.scroll,b=e.locale;"string"===typeof p&&(p=o.default.createElement("a",null,p));var g=(r=o.default.Children.only(p))&&"object"===typeof r&&r.ref,k=t(c.useIntersection({rootMargin:"200px"}),2),w=k[0],x=k[1],O=o.default.useCallback((function(e){w(e),g&&("function"===typeof g?g(e):"object"===typeof g&&(g.current=e))}),[g,w]);o.default.useEffect((function(){var e=x&&n&&l.isLocalURL(d),r="undefined"!==typeof b?b:a&&a.locale,t=s[d+"%"+v+(r?"%"+r:"")];e&&!t&&u(a,d,v,{locale:r})}),[v,d,x,b,n,a]);var E={ref:O,onClick:function(e){r.props&&"function"===typeof r.props.onClick&&r.props.onClick(e),e.defaultPrevented||function(e,r,n,t,a,o,i,c){("A"!==e.currentTarget.nodeName||!function(e){var r=e.currentTarget.target;return r&&"_self"!==r||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&l.isLocalURL(n))&&(e.preventDefault(),null==i&&t.indexOf("#")>=0&&(i=!1),r[a?"replace":"push"](n,t,{shallow:o,locale:c,scroll:i}))}(e,a,d,v,h,m,y,b)},onMouseEnter:function(e){l.isLocalURL(d)&&(r.props&&"function"===typeof r.props.onMouseEnter&&r.props.onMouseEnter(e),u(a,d,v,{priority:!0}))}};if(e.passHref||"a"===r.type&&!("href"in r.props)){var C="undefined"!==typeof b?b:a&&a.locale,P=a&&a.isLocaleDomain&&l.getDomainLocale(v,C,a&&a.locales,a&&a.domainLocales);E.href=P||l.addBasePath(l.addLocale(v,C,a&&a.defaultLocale))}return o.default.cloneElement(r,E)};r.default=f},7190:function(e,r,n){"use strict";function t(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var n=[],t=!0,a=!1,o=void 0;try{for(var l,i=e[Symbol.iterator]();!(t=(l=i.next()).done)&&(n.push(l.value),!r||n.length!==r);t=!0);}catch(c){a=!0,o=c}finally{try{t||null==i.return||i.return()}finally{if(a)throw o}}return n}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}Object.defineProperty(r,"__esModule",{value:!0}),r.useIntersection=function(e){var r=e.rootMargin,n=e.disabled||!l,c=a.useRef(),s=t(a.useState(!1),2),u=s[0],f=s[1],d=a.useCallback((function(e){c.current&&(c.current(),c.current=void 0),n||u||e&&e.tagName&&(c.current=function(e,r,n){var t=function(e){var r=e.rootMargin||"",n=i.get(r);if(n)return n;var t=new Map,a=new IntersectionObserver((function(e){e.forEach((function(e){var r=t.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;r&&n&&r(n)}))}),e);return i.set(r,n={id:r,observer:a,elements:t}),n}(n),a=t.id,o=t.observer,l=t.elements;return l.set(e,r),o.observe(e),function(){l.delete(e),o.unobserve(e),0===l.size&&(o.disconnect(),i.delete(a))}}(e,(function(e){return e&&f(e)}),{rootMargin:r}))}),[n,r,u]);return a.useEffect((function(){if(!l&&!u){var e=o.requestIdleCallback((function(){return f(!0)}));return function(){return o.cancelIdleCallback(e)}}}),[u]),[d,u]};var a=n(7294),o=n(9311),l="undefined"!==typeof IntersectionObserver;var i=new Map},4569:function(e,r,n){"use strict";n.d(r,{W:function(){return i}});var t=n(5893),a=n(980),o=n(8017);function l(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}var i=function(e){var r=(0,a.useColorMode)().colorMode;return(0,t.jsx)(o.xu,function(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{},t=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),t.forEach((function(r){l(e,r,n[r])}))}return e}({bg:{light:"gray.50",dark:"gray.700"}[r],color:{light:"black",dark:"white"}[r]},e))}},2763:function(e,r,n){"use strict";n.r(r),n.d(r,{default:function(){return z}});var t=n(5893),a=n(63),o=n(3793),l=n(5284),i=n(660),c=n(4461),s=n(3808),u=n(7294);function f(){return(f=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e}).apply(this,arguments)}var d=(0,a.G)(((e,r)=>{var n=(0,o.m)("Heading",e),t=function(e,r){if(null==e)return{};var n,t,a={},o=Object.keys(e);for(t=0;t<o.length;t++)n=o[t],r.indexOf(n)>=0||(a[n]=e[n]);return a}((0,l.Lr)(e),["className"]);return u.createElement(i.m$.h2,f({ref:r,className:(0,c.cx)("chakra-heading",e.className)},t,{__css:n}))}));function v(){return(v=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e}).apply(this,arguments)}s.Ts&&(d.displayName="Heading");var p={path:u.createElement("g",{stroke:"currentColor",strokeWidth:"1.5"},u.createElement("path",{strokeLinecap:"round",fill:"none",d:"M9,9a3,3,0,1,1,4,2.829,1.5,1.5,0,0,0-1,1.415V14.25"}),u.createElement("path",{fill:"currentColor",strokeLinecap:"round",d:"M12,17.25a.375.375,0,1,0,.375.375A.375.375,0,0,0,12,17.25h0"}),u.createElement("circle",{fill:"none",strokeMiterlimit:"10",cx:"12",cy:"12",r:"11.25"})),viewBox:"0 0 24 24"},h=(0,a.G)(((e,r)=>{var{as:n,viewBox:t,color:a="currentColor",focusable:o=!1,children:l,className:s,__css:f}=e,d=function(e,r){if(null==e)return{};var n,t,a={},o=Object.keys(e);for(t=0;t<o.length;t++)n=o[t],r.indexOf(n)>=0||(a[n]=e[n]);return a}(e,["as","viewBox","color","focusable","children","className","__css"]),h={ref:r,focusable:o,className:(0,c.cx)("chakra-icon",s),__css:v({w:"1em",h:"1em",display:"inline-block",lineHeight:"1em",flexShrink:0,color:a},f)},m=null!=t?t:p.viewBox;if(n&&"string"!==typeof n)return u.createElement(i.m$.svg,v({as:n},h,d));var y=null!=l?l:p.path;return u.createElement(i.m$.svg,v({verticalAlign:"middle",viewBox:m},h,d),y)}));s.Ts&&(h.displayName="Icon");var m=n(9676);function y(){return(y=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e}).apply(this,arguments)}function b(e,r){if(null==e)return{};var n,t,a={},o=Object.keys(e);for(t=0;t<o.length;t++)n=o[t],r.indexOf(n)>=0||(a[n]=e[n]);return a}var g=(0,a.G)(((e,r)=>{var n=(0,o.j)("List",e),t=(0,l.Lr)(e),{children:a,styleType:c="none",stylePosition:s,spacing:f}=t,d=b(t,["children","styleType","stylePosition","spacing"]),v=function(e){return u.Children.toArray(e).filter((e=>u.isValidElement(e)))}(a),p=f?{"& > *:not(style) ~ *:not(style)":{mt:f}}:{};return u.createElement(m.Fo,{value:n},u.createElement(i.m$.ul,y({ref:r,listStyleType:c,listStylePosition:s,role:"list",__css:y({},n.container,p)},d),v))}));s.Ts&&(g.displayName="List");var k=(0,a.G)(((e,r)=>{var n=b(e,["as"]);return u.createElement(g,y({ref:r,as:"ol",styleType:"decimal",marginStart:"1em"},n))}));s.Ts&&(k.displayName="OrderedList");var w=(0,a.G)(((e,r)=>{var n=b(e,["as"]);return u.createElement(g,y({ref:r,as:"ul",styleType:"initial",marginStart:"1em"},n))}));s.Ts&&(w.displayName="UnorderedList");var x=(0,a.G)(((e,r)=>{var n=(0,m.yK)();return u.createElement(i.m$.li,y({ref:r},e,{__css:n.item}))}));s.Ts&&(x.displayName="ListItem");var O=(0,a.G)(((e,r)=>{var n=(0,m.yK)();return u.createElement(h,y({ref:r,role:"presentation"},e,{__css:n.icon}))}));function E(){return(E=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e}).apply(this,arguments)}s.Ts&&(O.displayName="ListIcon");var C=(0,a.G)(((e,r)=>{var n=(0,o.m)("Link",e),t=(0,l.Lr)(e),{className:a,isExternal:s}=t,f=function(e,r){if(null==e)return{};var n,t,a={},o=Object.keys(e);for(t=0;t<o.length;t++)n=o[t],r.indexOf(n)>=0||(a[n]=e[n]);return a}(t,["className","isExternal"]);return u.createElement(i.m$.a,E({target:s?"_blank":void 0,rel:s?"noopener noreferrer":void 0,ref:r,className:(0,c.cx)("chakra-link",a)},f,{__css:n}))}));s.Ts&&(C.displayName="Link");var P=n(8017),_=n(5063),j=n(4569),L=n(980),N=c.jU?u.useLayoutEffect:u.useEffect;function T(e,r){void 0===r&&(r=[]);var n=u.useRef(e);return N((()=>{n.current=e})),u.useCallback((function(){for(var e=arguments.length,r=new Array(e),t=0;t<e;t++)r[t]=arguments[t];return null==n.current?void 0:n.current(...r)}),r)}function M(e){void 0===e&&(e=!1);var[r,n]=(0,u.useState)(e);return[r,{on:(0,u.useCallback)((()=>{n(!0)}),[]),off:(0,u.useCallback)((()=>{n(!1)}),[]),toggle:(0,u.useCallback)((()=>{n((e=>!e))}),[])}]}function B(e,r){if(null!=e)if((0,s.mf)(e))e(r);else try{e.current=r}catch(n){throw new Error("Cannot assign value '"+r+"' to ref '"+e+"'")}}function I(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return e=>{r.forEach((r=>B(r,e)))}}var S=n(658);function R(e){return((0,c.Re)(e)?(0,c.lZ)(e):document).activeElement===e}function D(e,r){void 0===r&&(r={});var{isActive:n=R,nextTick:t,preventScroll:a=!0,selectTextIfInput:o=!0}=r;if(!e||n(e))return-1;function l(){if(e){if(function(){if(null==A){A=!1;try{document.createElement("div").focus({get preventScroll(){return A=!0,!0}})}catch(e){}}return A}())e.focus({preventScroll:a});else if(e.focus(),a)!function(e){for(var{element:r,scrollTop:n,scrollLeft:t}of e)r.scrollTop=n,r.scrollLeft=t}(function(e){var r,n=(0,c.lZ)(e),t=null!=(r=n.defaultView)?r:window,a=e.parentNode,o=[],l=n.scrollingElement||n.documentElement;for(;a instanceof t.HTMLElement&&a!==l;)(a.offsetHeight<a.scrollHeight||a.offsetWidth<a.scrollWidth)&&o.push({element:a,scrollTop:a.scrollTop,scrollLeft:a.scrollLeft}),a=a.parentNode;l instanceof t.HTMLElement&&o.push({element:l,scrollTop:l.scrollTop,scrollLeft:l.scrollLeft});return o}(e));(function(e){return(0,c.Re)(e)&&"input"===e.tagName.toLowerCase()&&"select"in e})(e)&&o&&e.select()}else(0,S.ZK)({condition:!0,message:"[chakra-ui]: can't call focus() on `null` or `undefined` element"})}return t?requestAnimationFrame(l):(l(),-1)}var A=null;var H=n(5415);function K(){return(K=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e}).apply(this,arguments)}function U(e){void 0===e&&(e={});var{defaultIsChecked:r,defaultChecked:n=r,isChecked:t,isFocusable:a,isDisabled:o,isReadOnly:l,isRequired:i,onChange:s,isIndeterminate:f,isInvalid:d,name:v,value:p,id:h,onBlur:m,onFocus:y,tabIndex:b,"aria-label":g,"aria-labelledby":k,"aria-invalid":w,"aria-describedby":x}=e,O=function(e,r){if(null==e)return{};var n,t,a={},o=Object.keys(e);for(t=0;t<o.length;t++)n=o[t],r.indexOf(n)>=0||(a[n]=e[n]);return a}(e,["defaultIsChecked","defaultChecked","isChecked","isFocusable","isDisabled","isReadOnly","isRequired","onChange","isIndeterminate","isInvalid","name","value","id","onBlur","onFocus","tabIndex","aria-label","aria-labelledby","aria-invalid","aria-describedby"]),E=T(s),C=T(m),P=T(y),[_,j]=M(),[L,B]=M(),[R,A]=M(),U=(0,u.useRef)(null),[F,G]=(0,u.useState)(!0),[q,W]=(0,u.useState)(!!n),[Z,z]=function(e,r){var n=void 0!==e;return[n,n&&"undefined"!==typeof e?e:r]}(t,q);(0,S.ZK)({condition:!!r,message:'The "defaultIsChecked" prop has been deprecated and will be removed in a future version. Please use the "defaultChecked" prop instead, which mirrors default React checkbox behavior.'});var V=(0,u.useCallback)((e=>{l||o?e.preventDefault():(Z||W(z?e.target.checked:!!f||e.target.checked),null==E||E(e))}),[l,o,z,Z,f,E]);N((()=>{U.current&&(U.current.indeterminate=Boolean(f))}),[f]);var X=o&&!a,J=(0,u.useCallback)((e=>{" "===e.key&&A.on()}),[A]),Q=(0,u.useCallback)((e=>{" "===e.key&&A.off()}),[A]);N((()=>{U.current&&(U.current.checked!==z&&W(U.current.checked))}),[U.current]);var Y=(0,u.useCallback)((function(e,r){void 0===e&&(e={}),void 0===r&&(r=null);return K({},e,{ref:r,"data-active":(0,c.PB)(R),"data-hover":(0,c.PB)(L),"data-checked":(0,c.PB)(z),"data-focus":(0,c.PB)(_),"data-indeterminate":(0,c.PB)(f),"data-disabled":(0,c.PB)(o),"data-invalid":(0,c.PB)(d),"data-readonly":(0,c.PB)(l),"aria-hidden":!0,onMouseDown:(0,S.v0)(e.onMouseDown,(e=>{e.preventDefault(),A.on()})),onMouseUp:(0,S.v0)(e.onMouseUp,A.off),onMouseEnter:(0,S.v0)(e.onMouseEnter,B.on),onMouseLeave:(0,S.v0)(e.onMouseLeave,B.off)})}),[R,z,o,_,L,f,d,l,A,B.off,B.on]),ee=(0,u.useCallback)((function(e,r){return void 0===e&&(e={}),void 0===r&&(r=null),K({},O,e,{ref:I(r,(e=>{e&&G("LABEL"===e.tagName)})),onClick:(0,S.v0)(e.onClick,(()=>{var e;F||(null==(e=U.current)||e.click(),D(U.current,{nextTick:!0}))})),"data-disabled":(0,c.PB)(o),"data-checked":(0,c.PB)(z),"data-invalid":(0,c.PB)(d)})}),[O,o,z,d,F]),re=(0,u.useCallback)((function(e,r){return void 0===e&&(e={}),void 0===r&&(r=null),K({},e,{ref:I(U,r),type:"checkbox",name:v,value:p,id:h,tabIndex:b,onChange:(0,S.v0)(e.onChange,V),onBlur:(0,S.v0)(e.onBlur,C,j.off),onFocus:(0,S.v0)(e.onFocus,P,j.on),onKeyDown:(0,S.v0)(e.onKeyDown,J),onKeyUp:(0,S.v0)(e.onKeyUp,Q),required:i,checked:z,disabled:X,readOnly:l,"aria-label":g,"aria-labelledby":k,"aria-invalid":w?Boolean(w):d,"aria-describedby":x,"aria-disabled":o,style:H.NL})}),[v,p,h,V,j.off,j.on,C,P,J,Q,i,z,X,l,g,k,w,d,x,o,b]),ne=(0,u.useCallback)((function(e,r){return void 0===e&&(e={}),void 0===r&&(r=null),K({},e,{ref:r,onMouseDown:(0,S.v0)(e.onMouseDown,$),onTouchStart:(0,S.v0)(e.onTouchStart,$),"data-disabled":(0,c.PB)(o),"data-checked":(0,c.PB)(z),"data-invalid":(0,c.PB)(d)})}),[z,o,d]);return{state:{isInvalid:d,isFocused:_,isChecked:z,isActive:R,isHovered:L,isIndeterminate:f,isDisabled:o,isReadOnly:l,isRequired:i},getRootProps:ee,getCheckboxProps:Y,getInputProps:re,getLabelProps:ne,htmlProps:O}}function $(e){e.preventDefault(),e.stopPropagation()}function F(){return(F=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e}).apply(this,arguments)}var G=(0,a.G)(((e,r)=>{var n=(0,o.j)("Switch",e),t=(0,l.Lr)(e),{spacing:a="0.5rem",children:s}=t,f=function(e,r){if(null==e)return{};var n,t,a={},o=Object.keys(e);for(t=0;t<o.length;t++)n=o[t],r.indexOf(n)>=0||(a[n]=e[n]);return a}(t,["spacing","children"]),{state:d,getInputProps:v,getCheckboxProps:p,getRootProps:h,getLabelProps:m}=U(f),y=u.useMemo((()=>F({display:"inline-block",position:"relative",verticalAlign:"middle",lineHeight:"normal"},n.container)),[n.container]),b=u.useMemo((()=>F({display:"inline-flex",flexShrink:0,justifyContent:"flex-start",boxSizing:"content-box",cursor:"pointer"},n.track)),[n.track]),g=u.useMemo((()=>F({userSelect:"none",marginStart:a},n.label)),[a,n.label]);return u.createElement(i.m$.label,F({},h(),{className:(0,c.cx)("chakra-switch",e.className),__css:y}),u.createElement("input",F({className:"chakra-switch__input"},v({},r))),u.createElement(i.m$.span,F({},p(),{className:"chakra-switch__track",__css:b}),u.createElement(i.m$.span,{__css:n.thumb,className:"chakra-switch__thumb","data-checked":(0,c.PB)(d.isChecked),"data-hover":(0,c.PB)(d.isHovered)})),s&&u.createElement(i.m$.span,F({className:"chakra-switch__label"},m(),{__css:g}),s))}));s.Ts&&(G.displayName="Switch");var q=function(){var e=(0,L.useColorMode)(),r=e.colorMode,n=e.toggleColorMode;return(0,t.jsx)(G,{position:"fixed",top:"1rem",right:"1rem",color:"green",isChecked:"dark"===r,onChange:n})};function W(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}var Z=function(e){return(0,t.jsx)(P.xu,function(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{},t=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),t.forEach((function(r){W(e,r,n[r])}))}return e}({},e))},z=function(){return(0,t.jsxs)(j.W,{height:"100%",children:[(0,t.jsx)(Z,{display:["box","flex"],padding:["3rem 1rem","1rem"],height:"100%",children:(0,t.jsxs)(P.xu,{width:["100%","50%"],height:["auto","100%"],overflow:"auto",marginBottom:"2rem",children:[(0,t.jsx)(d,{as:"h3",size:"md",children:"Tensorflow playground"}),(0,t.jsx)(w,{spacing:"4px",paddingTop:"1rem",children:(0,t.jsx)(x,{children:(0,t.jsx)(C,{as:_.default,href:"/bodypix",children:"BodyPix"})})})]})}),(0,t.jsx)(q,{})]})}},5063:function(e,r,n){e.exports=n(8418)}},function(e){e.O(0,[902,774,888,179],(function(){return r=5301,e(e.s=r);var r}));var r=e.O();_N_E=r}]);