(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[61],{5452:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"addLocale",{enumerable:!0,get:function(){return r}}),n(5179);let r=function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return e};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2480:function(e,t,n){"use strict";function r(e,t,n,r){return!1}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getDomainLocale",{enumerable:!0,get:function(){return r}}),n(5179),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},112:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"hasBasePath",{enumerable:!0,get:function(){return o}});let r=n(1609);function o(e){return(0,r.pathHasPrefix)(e,"/nextjs-playground")}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1213:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return P}});let r=n(5024),o=r._(n(5754)),i=n(428),a=n(5324),u=n(8869),l=n(5505),s=n(5452),c=n(6512),f=n(4418),d=n(5166),p=n(2480),h=n(159),m=n(5140),y=new Set;function v(e,t,n,r,o,i){if(!i&&!(0,a.isLocalURL)(t))return;if(!r.bypassPrefetchedCheck){let o=void 0!==r.locale?r.locale:"locale"in e?e.locale:void 0,i=t+"%"+n+"%"+o;if(y.has(i))return;y.add(i)}let u=i?e.prefetch(t,o):e.prefetch(t,n,r);Promise.resolve(u).catch(e=>{})}function b(e){return"string"==typeof e?e:(0,u.formatUrl)(e)}let g=o.default.forwardRef(function(e,t){let n,r;let{href:u,as:y,children:g,prefetch:P=null,passHref:x,replace:_,shallow:k,scroll:j,locale:C,onClick:O,onMouseEnter:w,onTouchStart:E,legacyBehavior:S=!1,...M}=e;n=g,S&&("string"==typeof n||"number"==typeof n)&&(n=o.default.createElement("a",null,n));let R=o.default.useContext(c.RouterContext),L=o.default.useContext(f.AppRouterContext),N=null!=R?R:L,B=!R,I=!1!==P,T=null===P?m.PrefetchKind.AUTO:m.PrefetchKind.FULL,{href:A,as:U}=o.default.useMemo(()=>{if(!R){let e=b(u);return{href:e,as:y?b(y):e}}let[e,t]=(0,i.resolveHref)(R,u,!0);return{href:e,as:y?(0,i.resolveHref)(R,y):t||e}},[R,u,y]),F=o.default.useRef(A),D=o.default.useRef(U);S&&(r=o.default.Children.only(n));let G=S?r&&"object"==typeof r&&r.ref:t,[W,$,q]=(0,d.useIntersection)({rootMargin:"200px"}),z=o.default.useCallback(e=>{(D.current!==U||F.current!==A)&&(q(),D.current=U,F.current=A),W(e),G&&("function"==typeof G?G(e):"object"==typeof G&&(G.current=e))},[U,G,A,q,W]);o.default.useEffect(()=>{N&&$&&I&&v(N,A,U,{locale:C},{kind:T},B)},[U,A,$,C,I,null==R?void 0:R.locale,N,B,T]);let K={ref:z,onClick(e){S||"function"!=typeof O||O(e),S&&r.props&&"function"==typeof r.props.onClick&&r.props.onClick(e),N&&!e.defaultPrevented&&function(e,t,n,r,i,u,l,s,c,f){let{nodeName:d}=e.currentTarget,p="A"===d.toUpperCase();if(p&&(function(e){let t=e.currentTarget,n=t.getAttribute("target");return n&&"_self"!==n||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)||!c&&!(0,a.isLocalURL)(n)))return;e.preventDefault();let h=()=>{let e=null==l||l;"beforePopState"in t?t[i?"replace":"push"](n,r,{shallow:u,locale:s,scroll:e}):t[i?"replace":"push"](r||n,{forceOptimisticNavigation:!f,scroll:e})};c?o.default.startTransition(h):h()}(e,N,A,U,_,k,j,C,B,I)},onMouseEnter(e){S||"function"!=typeof w||w(e),S&&r.props&&"function"==typeof r.props.onMouseEnter&&r.props.onMouseEnter(e),N&&(I||!B)&&v(N,A,U,{locale:C,priority:!0,bypassPrefetchedCheck:!0},{kind:T},B)},onTouchStart(e){S||"function"!=typeof E||E(e),S&&r.props&&"function"==typeof r.props.onTouchStart&&r.props.onTouchStart(e),N&&(I||!B)&&v(N,A,U,{locale:C,priority:!0,bypassPrefetchedCheck:!0},{kind:T},B)}};if((0,l.isAbsoluteUrl)(U))K.href=U;else if(!S||x||"a"===r.type&&!("href"in r.props)){let e=void 0!==C?C:null==R?void 0:R.locale,t=(null==R?void 0:R.isLocaleDomain)&&(0,p.getDomainLocale)(U,e,null==R?void 0:R.locales,null==R?void 0:R.domainLocales);K.href=t||(0,h.addBasePath)((0,s.addLocale)(U,e,null==R?void 0:R.defaultLocale))}return S?o.default.cloneElement(r,K):o.default.createElement("a",{...M,...K},n)}),P=g;("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},7873:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{requestIdleCallback:function(){return n},cancelIdleCallback:function(){return r}});let n="undefined"!=typeof self&&self.requestIdleCallback&&self.requestIdleCallback.bind(window)||function(e){let t=Date.now();return self.setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-t))}})},1)},r="undefined"!=typeof self&&self.cancelIdleCallback&&self.cancelIdleCallback.bind(window)||function(e){return clearTimeout(e)};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},5166:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useIntersection",{enumerable:!0,get:function(){return l}});let r=n(5754),o=n(7873),i="function"==typeof IntersectionObserver,a=new Map,u=[];function l(e){let{rootRef:t,rootMargin:n,disabled:l}=e,s=l||!i,[c,f]=(0,r.useState)(!1),d=(0,r.useRef)(null),p=(0,r.useCallback)(e=>{d.current=e},[]);(0,r.useEffect)(()=>{if(i){if(s||c)return;let e=d.current;if(e&&e.tagName){let r=function(e,t,n){let{id:r,observer:o,elements:i}=function(e){let t;let n={root:e.root||null,margin:e.rootMargin||""},r=u.find(e=>e.root===n.root&&e.margin===n.margin);if(r&&(t=a.get(r)))return t;let o=new Map,i=new IntersectionObserver(e=>{e.forEach(e=>{let t=o.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)})},e);return t={id:n,observer:i,elements:o},u.push(n),a.set(n,t),t}(n);return i.set(e,t),o.observe(e),function(){if(i.delete(e),o.unobserve(e),0===i.size){o.disconnect(),a.delete(r);let e=u.findIndex(e=>e.root===r.root&&e.margin===r.margin);e>-1&&u.splice(e,1)}}}(e,e=>e&&f(e),{root:null==t?void 0:t.current,rootMargin:n});return r}}else if(!c){let e=(0,o.requestIdleCallback)(()=>f(!0));return()=>(0,o.cancelIdleCallback)(e)}},[s,n,t,c,d.current]);let h=(0,r.useCallback)(()=>{f(!1)},[]);return[p,c,h]}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8998:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"escapeStringRegexp",{enumerable:!0,get:function(){return o}});let n=/[|\\{}()[\]^$+*?.-]/,r=/[|\\{}()[\]^$+*?.-]/g;function o(e){return n.test(e)?e.replace(r,"\\$&"):e}},6512:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"RouterContext",{enumerable:!0,get:function(){return i}});let r=n(5024),o=r._(n(5754)),i=o.default.createContext(null)},8869:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{formatUrl:function(){return a},urlObjectKeys:function(){return u},formatWithValidation:function(){return l}});let r=n(3690),o=r._(n(27)),i=/https?|ftp|gopher|file/;function a(e){let{auth:t,hostname:n}=e,r=e.protocol||"",a=e.pathname||"",u=e.hash||"",l=e.query||"",s=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?s=t+e.host:n&&(s=t+(~n.indexOf(":")?"["+n+"]":n),e.port&&(s+=":"+e.port)),l&&"object"==typeof l&&(l=String(o.urlQueryToSearchParams(l)));let c=e.search||l&&"?"+l||"";return r&&!r.endsWith(":")&&(r+=":"),e.slashes||(!r||i.test(r))&&!1!==s?(s="//"+(s||""),a&&"/"!==a[0]&&(a="/"+a)):s||(s=""),u&&"#"!==u[0]&&(u="#"+u),c&&"?"!==c[0]&&(c="?"+c),""+r+s+(a=a.replace(/[?#]/g,encodeURIComponent))+(c=c.replace("#","%23"))+u}let u=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function l(e){return a(e)}},9290:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"interpolateAs",{enumerable:!0,get:function(){return i}});let r=n(2218),o=n(5500);function i(e,t,n){let i="",a=(0,o.getRouteRegex)(e),u=a.groups,l=(t!==e?(0,r.getRouteMatcher)(a)(t):"")||n;i=e;let s=Object.keys(u);return s.every(e=>{let t=l[e]||"",{repeat:n,optional:r}=u[e],o="["+(n?"...":"")+e+"]";return r&&(o=(t?"":"/")+"["+o+"]"),n&&!Array.isArray(t)&&(t=[t]),(r||e in l)&&(i=i.replace(o,n?t.map(e=>encodeURIComponent(e)).join("/"):encodeURIComponent(t))||"/")})||(i=""),{params:s,result:i}}},4084:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isDynamicRoute",{enumerable:!0,get:function(){return r}});let n=/\/\[[^/]+?\](?=\/|$)/;function r(e){return n.test(e)}},5324:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isLocalURL",{enumerable:!0,get:function(){return i}});let r=n(5505),o=n(112);function i(e){if(!(0,r.isAbsoluteUrl)(e))return!0;try{let t=(0,r.getLocationOrigin)(),n=new URL(e,t);return n.origin===t&&(0,o.hasBasePath)(n.pathname)}catch(e){return!1}}},9623:function(e,t){"use strict";function n(e,t){let n={};return Object.keys(e).forEach(r=>{t.includes(r)||(n[r]=e[r])}),n}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"omit",{enumerable:!0,get:function(){return n}})},1609:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"pathHasPrefix",{enumerable:!0,get:function(){return o}});let r=n(3830);function o(e,t){if("string"!=typeof e)return!1;let{pathname:n}=(0,r.parsePath)(e);return n===t||n.startsWith(t+"/")}},27:function(e,t){"use strict";function n(e){let t={};return e.forEach((e,n)=>{void 0===t[n]?t[n]=e:Array.isArray(t[n])?t[n].push(e):t[n]=[t[n],e]}),t}function r(e){return"string"!=typeof e&&("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)}function o(e){let t=new URLSearchParams;return Object.entries(e).forEach(e=>{let[n,o]=e;Array.isArray(o)?o.forEach(e=>t.append(n,r(e))):t.set(n,r(o))}),t}function i(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return n.forEach(t=>{Array.from(t.keys()).forEach(t=>e.delete(t)),t.forEach((t,n)=>e.append(n,t))}),e}Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{searchParamsToUrlQuery:function(){return n},urlQueryToSearchParams:function(){return o},assign:function(){return i}})},428:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"resolveHref",{enumerable:!0,get:function(){return f}});let r=n(27),o=n(8869),i=n(9623),a=n(5505),u=n(5179),l=n(5324),s=n(4084),c=n(9290);function f(e,t,n){let f;let d="string"==typeof t?t:(0,o.formatWithValidation)(t),p=d.match(/^[a-zA-Z]{1,}:\/\//),h=p?d.slice(p[0].length):d;if((h.split("?")[0]||"").match(/(\/\/|\\)/)){console.error("Invalid href '"+d+"' passed to next/router in page: '"+e.pathname+"'. Repeated forward-slashes (//) or backslashes \\ are not valid in the href.");let t=(0,a.normalizeRepeatedSlashes)(h);d=(p?p[0]:"")+t}if(!(0,l.isLocalURL)(d))return n?[d]:d;try{f=new URL(d.startsWith("#")?e.asPath:e.pathname,"http://n")}catch(e){f=new URL("/","http://n")}try{let e=new URL(d,f);e.pathname=(0,u.normalizePathTrailingSlash)(e.pathname);let t="";if((0,s.isDynamicRoute)(e.pathname)&&e.searchParams&&n){let n=(0,r.searchParamsToUrlQuery)(e.searchParams),{result:a,params:u}=(0,c.interpolateAs)(e.pathname,e.pathname,n);a&&(t=(0,o.formatWithValidation)({pathname:a,hash:e.hash,query:(0,i.omit)(n,u)}))}let a=e.origin===f.origin?e.href.slice(e.origin.length):e.href;return n?[a,t||a]:a}catch(e){return n?[d]:d}}},2218:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getRouteMatcher",{enumerable:!0,get:function(){return o}});let r=n(5505);function o(e){let{re:t,groups:n}=e;return e=>{let o=t.exec(e);if(!o)return!1;let i=e=>{try{return decodeURIComponent(e)}catch(e){throw new r.DecodeError("failed to decode param")}},a={};return Object.keys(n).forEach(e=>{let t=n[e],r=o[t.pos];void 0!==r&&(a[e]=~r.indexOf("/")?r.split("/").map(e=>i(e)):t.repeat?[i(r)]:i(r))}),a}}},5500:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{getRouteRegex:function(){return l},getNamedRouteRegex:function(){return f},getNamedMiddlewareRegex:function(){return d}});let r=n(8068),o=n(8998),i=n(7439);function a(e){let t=e.startsWith("[")&&e.endsWith("]");t&&(e=e.slice(1,-1));let n=e.startsWith("...");return n&&(e=e.slice(3)),{key:e,repeat:n,optional:t}}function u(e){let t=(0,i.removeTrailingSlash)(e).slice(1).split("/"),n={},u=1;return{parameterizedRoute:t.map(e=>{let t=r.INTERCEPTION_ROUTE_MARKERS.find(t=>e.startsWith(t)),i=e.match(/\[((?:\[.*\])|.+)\]/);if(t&&i){let{key:e,optional:r,repeat:l}=a(i[1]);return n[e]={pos:u++,repeat:l,optional:r},"/"+(0,o.escapeStringRegexp)(t)+"([^/]+?)"}if(!i)return"/"+(0,o.escapeStringRegexp)(e);{let{key:e,repeat:t,optional:r}=a(i[1]);return n[e]={pos:u++,repeat:t,optional:r},t?r?"(?:/(.+?))?":"/(.+?)":"/([^/]+?)"}}).join(""),groups:n}}function l(e){let{parameterizedRoute:t,groups:n}=u(e);return{re:RegExp("^"+t+"(?:/)?$"),groups:n}}function s(e){let t,n,{segment:r,routeKeys:o,keyPrefix:i}=e,u=(t=97,n=1,()=>{let e="";for(let r=0;r<n;r++)e+=String.fromCharCode(t),++t>122&&(n++,t=97);return e}),{key:l,optional:s,repeat:c}=a(r),f=l.replace(/\W/g,"");i&&(f=""+i+f);let d=!1;return(0===f.length||f.length>30)&&(d=!0),isNaN(parseInt(f.slice(0,1)))||(d=!0),d&&(f=u()),i?o[f]=""+i+l:o[f]=""+l,c?s?"(?:/(?<"+f+">.+?))?":"/(?<"+f+">.+?)":"/(?<"+f+">[^/]+?)"}function c(e,t){let n=(0,i.removeTrailingSlash)(e).slice(1).split("/"),a={};return{namedParameterizedRoute:n.map(e=>{let n=r.INTERCEPTION_ROUTE_MARKERS.some(t=>e.startsWith(t)),i=e.match(/\[((?:\[.*\])|.+)\]/);return n&&i?s({segment:i[1],routeKeys:a,keyPrefix:t?"nxtI":void 0}):i?s({segment:i[1],routeKeys:a,keyPrefix:t?"nxtP":void 0}):"/"+(0,o.escapeStringRegexp)(e)}).join(""),routeKeys:a}}function f(e,t){let n=c(e,t);return{...l(e),namedRegex:"^"+n.namedParameterizedRoute+"(?:/)?$",routeKeys:n.routeKeys}}function d(e,t){let{parameterizedRoute:n}=u(e),{catchAll:r=!0}=t;if("/"===n)return{namedRegex:"^/"+(r?".*":"")+"$"};let{namedParameterizedRoute:o}=c(e,!1);return{namedRegex:"^"+o+(r?"(?:(/.*)?)":"")+"$"}}},5505:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{WEB_VITALS:function(){return n},execOnce:function(){return r},isAbsoluteUrl:function(){return i},getLocationOrigin:function(){return a},getURL:function(){return u},getDisplayName:function(){return l},isResSent:function(){return s},normalizeRepeatedSlashes:function(){return c},loadGetInitialProps:function(){return f},SP:function(){return d},ST:function(){return p},DecodeError:function(){return h},NormalizeError:function(){return m},PageNotFoundError:function(){return y},MissingStaticPage:function(){return v},MiddlewareNotFoundError:function(){return b},stringifyError:function(){return g}});let n=["CLS","FCP","FID","INP","LCP","TTFB"];function r(e){let t,n=!1;return function(){for(var r=arguments.length,o=Array(r),i=0;i<r;i++)o[i]=arguments[i];return n||(n=!0,t=e(...o)),t}}let o=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,i=e=>o.test(e);function a(){let{protocol:e,hostname:t,port:n}=window.location;return e+"//"+t+(n?":"+n:"")}function u(){let{href:e}=window.location,t=a();return e.substring(t.length)}function l(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function s(e){return e.finished||e.headersSent}function c(e){let t=e.split("?"),n=t[0];return n.replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?"?"+t.slice(1).join("?"):"")}async function f(e,t){let n=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await f(t.Component,t.ctx)}:{};let r=await e.getInitialProps(t);if(n&&s(n))return r;if(!r){let t='"'+l(e)+'.getInitialProps()" should resolve to an object. But found "'+r+'" instead.';throw Error(t)}return r}let d="undefined"!=typeof performance,p=d&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class h extends Error{}class m extends Error{}class y extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message="Cannot find module for page: "+e}}class v extends Error{constructor(e,t){super(),this.message="Failed to load static file for page: "+e+" "+t}}class b extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function g(e){return JSON.stringify({message:e.message,stack:e.stack})}},5291:function(e,t,n){e.exports=n(1213)},5720:function(e){var t="undefined"!=typeof Element,n="function"==typeof Map,r="function"==typeof Set,o="function"==typeof ArrayBuffer&&!!ArrayBuffer.isView;e.exports=function(e,i){try{return function e(i,a){if(i===a)return!0;if(i&&a&&"object"==typeof i&&"object"==typeof a){var u,l,s,c;if(i.constructor!==a.constructor)return!1;if(Array.isArray(i)){if((u=i.length)!=a.length)return!1;for(l=u;0!=l--;)if(!e(i[l],a[l]))return!1;return!0}if(n&&i instanceof Map&&a instanceof Map){if(i.size!==a.size)return!1;for(c=i.entries();!(l=c.next()).done;)if(!a.has(l.value[0]))return!1;for(c=i.entries();!(l=c.next()).done;)if(!e(l.value[1],a.get(l.value[0])))return!1;return!0}if(r&&i instanceof Set&&a instanceof Set){if(i.size!==a.size)return!1;for(c=i.entries();!(l=c.next()).done;)if(!a.has(l.value[0]))return!1;return!0}if(o&&ArrayBuffer.isView(i)&&ArrayBuffer.isView(a)){if((u=i.length)!=a.length)return!1;for(l=u;0!=l--;)if(i[l]!==a[l])return!1;return!0}if(i.constructor===RegExp)return i.source===a.source&&i.flags===a.flags;if(i.valueOf!==Object.prototype.valueOf&&"function"==typeof i.valueOf&&"function"==typeof a.valueOf)return i.valueOf()===a.valueOf();if(i.toString!==Object.prototype.toString&&"function"==typeof i.toString&&"function"==typeof a.toString)return i.toString()===a.toString();if((u=(s=Object.keys(i)).length)!==Object.keys(a).length)return!1;for(l=u;0!=l--;)if(!Object.prototype.hasOwnProperty.call(a,s[l]))return!1;if(t&&i instanceof Element)return!1;for(l=u;0!=l--;)if(("_owner"!==s[l]&&"__v"!==s[l]&&"__o"!==s[l]||!i.$$typeof)&&!e(i[s[l]],a[s[l]]))return!1;return!0}return i!=i&&a!=a}(e,i)}catch(e){if((e.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw e}}},1348:function(e,t,n){"use strict";n.d(t,{J:function(){return s}});var r=n(2273),o=n(2102),i=n(1721),a=n(2348),u=n(2771),l={path:(0,u.jsxs)("g",{stroke:"currentColor",strokeWidth:"1.5",children:[(0,u.jsx)("path",{strokeLinecap:"round",fill:"none",d:"M9,9a3,3,0,1,1,4,2.829,1.5,1.5,0,0,0-1,1.415V14.25"}),(0,u.jsx)("path",{fill:"currentColor",strokeLinecap:"round",d:"M12,17.25a.375.375,0,1,0,.375.375A.375.375,0,0,0,12,17.25h0"}),(0,u.jsx)("circle",{fill:"none",strokeMiterlimit:"10",cx:"12",cy:"12",r:"11.25"})]}),viewBox:"0 0 24 24"},s=(0,r.G)((e,t)=>{let{as:n,viewBox:r,color:s="currentColor",focusable:c=!1,children:f,className:d,__css:p,...h}=e,m=(0,a.cx)("chakra-icon",d),y=(0,o.mq)("Icon",e),v={w:"1em",h:"1em",display:"inline-block",lineHeight:"1em",flexShrink:0,color:s,...p,...y},b={ref:t,focusable:c,className:m,__css:v},g=null!=r?r:l.viewBox;if(n&&"string"!=typeof n)return(0,u.jsx)(i.m.svg,{as:n,...b,...h});let P=null!=f?f:l.path;return(0,u.jsx)(i.m.svg,{verticalAlign:"middle",viewBox:g,...b,...h,children:P})});s.displayName="Icon"},4705:function(e,t,n){"use strict";n.d(t,{HC:function(){return m},QI:function(){return h}});var r=n(1348),o=n(7601),i=n(5754),a=n(2273),u=n(2102),l=n(9660),s=n(1721),c=n(2771),[f,d]=(0,o.k)({name:"ListStylesContext",errorMessage:"useListStyles returned is 'undefined'. Seems you forgot to wrap the components in \"<List />\" "}),p=(0,a.G)(function(e,t){let n=(0,u.jC)("List",e),{children:r,styleType:o="none",stylePosition:a,spacing:d,...p}=(0,l.Lr)(e),h=i.Children.toArray(r).filter(e=>(0,i.isValidElement)(e));return(0,c.jsx)(f,{value:n,children:(0,c.jsx)(s.m.ul,{ref:t,listStyleType:o,listStylePosition:a,role:"list",__css:{...n.container,...d?{"& > *:not(style) ~ *:not(style)":{mt:d}}:{}},...p,children:h})})});p.displayName="List",(0,a.G)((e,t)=>{let{as:n,...r}=e;return(0,c.jsx)(p,{ref:t,as:"ol",styleType:"decimal",marginStart:"1em",...r})}).displayName="OrderedList";var h=(0,a.G)(function(e,t){let{as:n,...r}=e;return(0,c.jsx)(p,{ref:t,as:"ul",styleType:"initial",marginStart:"1em",...r})});h.displayName="UnorderedList";var m=(0,a.G)(function(e,t){let n=d();return(0,c.jsx)(s.m.li,{ref:t,...e,__css:n.item})});m.displayName="ListItem",(0,a.G)(function(e,t){let n=d();return(0,c.jsx)(r.J,{ref:t,role:"presentation",...e,__css:n.icon})}).displayName="ListIcon"},9599:function(e,t,n){"use strict";n.d(t,{X:function(){return s}});var r=n(2273),o=n(2102),i=n(9660),a=n(1721),u=n(2348),l=n(2771),s=(0,r.G)(function(e,t){let n=(0,o.mq)("Heading",e),{className:r,...s}=(0,i.Lr)(e);return(0,l.jsx)(a.m.h2,{ref:t,className:(0,u.cx)("chakra-heading",e.className),...s,__css:n})});s.displayName="Heading"},1312:function(e,t,n){"use strict";n.d(t,{r:function(){return s}});var r=n(2273),o=n(2102),i=n(9660),a=n(1721),u=n(2348),l=n(2771),s=(0,r.G)(function(e,t){let n=(0,o.mq)("Link",e),{className:r,isExternal:s,...c}=(0,i.Lr)(e);return(0,l.jsx)(a.m.a,{target:s?"_blank":void 0,rel:s?"noopener":void 0,ref:t,className:(0,u.cx)("chakra-link",r),...c,__css:n})});s.displayName="Link"},7435:function(e,t,n){"use strict";n.d(t,{xu:function(){return a}});var r=n(1721),o=n(2273),i=n(2771),a=(0,r.m)("div");a.displayName="Box";var u=(0,o.G)(function(e,t){let{size:n,centerContent:r=!0,...o}=e;return(0,i.jsx)(a,{ref:t,boxSize:n,__css:{...r?{display:"flex",alignItems:"center",justifyContent:"center"}:{},flexShrink:0,flexGrow:0},...o})});u.displayName="Square",(0,o.G)(function(e,t){let{size:n,...r}=e;return(0,i.jsx)(u,{size:n,ref:t,borderRadius:"9999px",...r})}).displayName="Circle"},7601:function(e,t,n){"use strict";n.d(t,{k:function(){return o}});var r=n(5754);function o(e={}){let{name:t,strict:n=!0,hookName:o="useContext",providerName:i="Provider",errorMessage:a,defaultValue:u}=e,l=(0,r.createContext)(u);return l.displayName=t,[l.Provider,function e(){var t;let u=(0,r.useContext)(l);if(!u&&n){let n=Error(null!=a?a:`${o} returned \`undefined\`. Seems you forgot to wrap component within ${i}`);throw n.name="ContextError",null==(t=Error.captureStackTrace)||t.call(Error,n,e),n}return u},l]}},2125:function(e,t,n){"use strict";n.d(t,{W:function(){return o}});var r=n(5754);function o(e,t=[]){let n=(0,r.useRef)(e);return(0,r.useEffect)(()=>{n.current=e}),(0,r.useCallback)((...e)=>{var t;return null==(t=n.current)?void 0:t.call(n,...e)},t)}},3366:function(e,t,n){"use strict";n.d(t,{G:function(){return o}});var r=n(5754),o=(null==globalThis?void 0:globalThis.document)?r.useLayoutEffect:r.useEffect},9048:function(e,t,n){"use strict";n.d(t,{r:function(){return o}});var r=n(5754);function o(e,t){let n=(0,r.useRef)(!1),o=(0,r.useRef)(!1);(0,r.useEffect)(()=>{let t=n.current,r=t&&o.current;if(r)return e();o.current=!0},t),(0,r.useEffect)(()=>(n.current=!0,()=>{n.current=!1}),[])}},9909:function(e,t,n){"use strict";n.d(t,{r:function(){return I}});var r=n(7601),o=n(5754);function i(...e){return t=>{e.forEach(e=>{!function(e,t){if(null!=e){if("function"==typeof e){e(t);return}try{e.current=t}catch(n){throw Error(`Cannot assign value '${t}' to ref '${e}'`)}}}(e,t)})}}var a=n(2273),u=n(2102),l=n(9660),s=n(1721),c=n(2348),f=n(2771),[d,p]=(0,r.k)({name:"FormControlStylesContext",errorMessage:"useFormControlStyles returned is 'undefined'. Seems you forgot to wrap the components in \"<FormControl />\" "}),[h,m]=(0,r.k)({strict:!1,name:"FormControlContext"});(0,a.G)(function(e,t){let n=(0,u.jC)("Form",e),r=(0,l.Lr)(e),{getRootProps:a,htmlProps:p,...m}=function(e){let{id:t,isRequired:n,isInvalid:r,isDisabled:a,isReadOnly:u,...l}=e,s=(0,o.useId)(),f=t||`field-${s}`,d=`${f}-label`,p=`${f}-feedback`,h=`${f}-helptext`,[m,y]=(0,o.useState)(!1),[v,b]=(0,o.useState)(!1),[g,P]=(0,o.useState)(!1),x=(0,o.useCallback)((e={},t=null)=>({id:h,...e,ref:i(t,e=>{e&&b(!0)})}),[h]),_=(0,o.useCallback)((e={},t=null)=>({...e,ref:t,"data-focus":(0,c.PB)(g),"data-disabled":(0,c.PB)(a),"data-invalid":(0,c.PB)(r),"data-readonly":(0,c.PB)(u),id:void 0!==e.id?e.id:d,htmlFor:void 0!==e.htmlFor?e.htmlFor:f}),[f,a,g,r,u,d]),k=(0,o.useCallback)((e={},t=null)=>({id:p,...e,ref:i(t,e=>{e&&y(!0)}),"aria-live":"polite"}),[p]),j=(0,o.useCallback)((e={},t=null)=>({...e,...l,ref:t,role:"group"}),[l]),C=(0,o.useCallback)((e={},t=null)=>({...e,ref:t,role:"presentation","aria-hidden":!0,children:e.children||"*"}),[]);return{isRequired:!!n,isInvalid:!!r,isReadOnly:!!u,isDisabled:!!a,isFocused:!!g,onFocus:()=>P(!0),onBlur:()=>P(!1),hasFeedbackText:m,setHasFeedbackText:y,hasHelpText:v,setHasHelpText:b,id:f,labelId:d,feedbackId:p,helpTextId:h,htmlProps:l,getHelpTextProps:x,getErrorMessageProps:k,getRootProps:j,getLabelProps:_,getRequiredIndicatorProps:C}}(r),y=(0,c.cx)("chakra-form-control",e.className);return(0,f.jsx)(h,{value:m,children:(0,f.jsx)(d,{value:n,children:(0,f.jsx)(s.m.div,{...a({},t),className:y,__css:n.container})})})}).displayName="FormControl",(0,a.G)(function(e,t){let n=m(),r=p(),o=(0,c.cx)("chakra-form__helper-text",e.className);return(0,f.jsx)(s.m.div,{...null==n?void 0:n.getHelpTextProps(e,t),__css:r.helperText,className:o})}).displayName="FormHelperText";var y=n(3366),v=n(9048),b=n(2125),g={border:"0",clip:"rect(0, 0, 0, 0)",height:"1px",width:"1px",margin:"-1px",padding:"0",overflow:"hidden",whiteSpace:"nowrap",position:"absolute"};let P=()=>"undefined"!=typeof document,x=!1,_=null,k=!1,j=!1,C=new Set;function O(e,t){C.forEach(n=>n(e,t))}let w="undefined"!=typeof window&&null!=window.navigator&&/^Mac/.test(window.navigator.platform);function E(e){k=!0,e.metaKey||!w&&e.altKey||e.ctrlKey||"Control"===e.key||"Shift"===e.key||"Meta"===e.key||(_="keyboard",O("keyboard",e))}function S(e){if(_="pointer","mousedown"===e.type||"pointerdown"===e.type){k=!0;let t=e.composedPath?e.composedPath()[0]:e.target,n=!1;try{n=t.matches(":focus-visible")}catch{}n||O("pointer",e)}}function M(e){(0===e.mozInputSource&&e.isTrusted||0===e.detail&&!e.pointerType)&&(k=!0,_="virtual")}function R(e){e.target!==window&&e.target!==document&&(k||j||(_="virtual",O("virtual",e)),k=!1,j=!1)}function L(){k=!1,j=!0}function N(){return"pointer"!==_}function B(e){e.preventDefault(),e.stopPropagation()}var I=(0,a.G)(function(e,t){let n=(0,u.jC)("Switch",e),{spacing:r="0.5rem",children:a,...d}=(0,l.Lr)(e),{getIndicatorProps:p,getInputProps:h,getCheckboxProps:_,getRootProps:j,getLabelProps:O}=function(e={}){let t=function(e){var t,n,r;let o=m(),{id:i,disabled:a,readOnly:u,required:l,isRequired:s,isInvalid:f,isReadOnly:d,isDisabled:p,onFocus:h,onBlur:y,...v}=e,b=e["aria-describedby"]?[e["aria-describedby"]]:[];return(null==o?void 0:o.hasFeedbackText)&&(null==o?void 0:o.isInvalid)&&b.push(o.feedbackId),(null==o?void 0:o.hasHelpText)&&b.push(o.helpTextId),{...v,"aria-describedby":b.join(" ")||void 0,id:null!=i?i:null==o?void 0:o.id,isDisabled:null!=(t=null!=a?a:p)?t:null==o?void 0:o.isDisabled,isReadOnly:null!=(n=null!=u?u:d)?n:null==o?void 0:o.isReadOnly,isRequired:null!=(r=null!=l?l:s)?r:null==o?void 0:o.isRequired,isInvalid:null!=f?f:null==o?void 0:o.isInvalid,onFocus:(0,c.v0)(null==o?void 0:o.onFocus,h),onBlur:(0,c.v0)(null==o?void 0:o.onBlur,y)}}(e),{isDisabled:n,isReadOnly:r,isRequired:a,isInvalid:u,id:l,onBlur:s,onFocus:f,"aria-describedby":d}=t,{defaultChecked:p,isChecked:h,isFocusable:_,onChange:j,isIndeterminate:O,name:w,value:I,tabIndex:T,"aria-label":A,"aria-labelledby":U,"aria-invalid":F,...D}=e,G=function(e,t=[]){let n=Object.assign({},e);for(let e of t)e in n&&delete n[e];return n}(D,["isDisabled","isReadOnly","isRequired","isInvalid","id","onBlur","onFocus","aria-describedby"]),W=(0,b.W)(j),$=(0,b.W)(s),q=(0,b.W)(f),[z,K]=(0,o.useState)(!1),[H,V]=(0,o.useState)(!1),[Q,J]=(0,o.useState)(!1),[Z,X]=(0,o.useState)(!1);(0,o.useEffect)(()=>(function(e){!function(){if(!P()||x)return;let{focus:e}=HTMLElement.prototype;HTMLElement.prototype.focus=function(...t){k=!0,e.apply(this,t)},document.addEventListener("keydown",E,!0),document.addEventListener("keyup",E,!0),document.addEventListener("click",M,!0),window.addEventListener("focus",R,!0),window.addEventListener("blur",L,!1),"undefined"!=typeof PointerEvent?(document.addEventListener("pointerdown",S,!0),document.addEventListener("pointermove",S,!0),document.addEventListener("pointerup",S,!0)):(document.addEventListener("mousedown",S,!0),document.addEventListener("mousemove",S,!0),document.addEventListener("mouseup",S,!0)),x=!0}(),e(N());let t=()=>e(N());return C.add(t),()=>{C.delete(t)}})(K),[]);let Y=(0,o.useRef)(null),[ee,et]=(0,o.useState)(!0),[en,er]=(0,o.useState)(!!p),eo=void 0!==h,ei=eo?h:en,ea=(0,o.useCallback)(e=>{if(r||n){e.preventDefault();return}eo||(ei?er(e.target.checked):er(!!O||e.target.checked)),null==W||W(e)},[r,n,ei,eo,O,W]);(0,y.G)(()=>{Y.current&&(Y.current.indeterminate=!!O)},[O]),(0,v.r)(()=>{n&&V(!1)},[n,V]),(0,y.G)(()=>{let e=Y.current;if(!(null==e?void 0:e.form))return;let t=()=>{er(!!p)};return e.form.addEventListener("reset",t),()=>{var n;return null==(n=e.form)?void 0:n.removeEventListener("reset",t)}},[]);let eu=n&&!_,el=(0,o.useCallback)(e=>{" "===e.key&&X(!0)},[X]),es=(0,o.useCallback)(e=>{" "===e.key&&X(!1)},[X]);(0,y.G)(()=>{if(!Y.current)return;let e=Y.current.checked!==ei;e&&er(Y.current.checked)},[Y.current]);let ec=(0,o.useCallback)((e={},t=null)=>({...e,ref:t,"data-active":(0,c.PB)(Z),"data-hover":(0,c.PB)(Q),"data-checked":(0,c.PB)(ei),"data-focus":(0,c.PB)(H),"data-focus-visible":(0,c.PB)(H&&z),"data-indeterminate":(0,c.PB)(O),"data-disabled":(0,c.PB)(n),"data-invalid":(0,c.PB)(u),"data-readonly":(0,c.PB)(r),"aria-hidden":!0,onMouseDown:(0,c.v0)(e.onMouseDown,e=>{H&&e.preventDefault(),X(!0)}),onMouseUp:(0,c.v0)(e.onMouseUp,()=>X(!1)),onMouseEnter:(0,c.v0)(e.onMouseEnter,()=>J(!0)),onMouseLeave:(0,c.v0)(e.onMouseLeave,()=>J(!1))}),[Z,ei,n,H,z,Q,O,u,r]),ef=(0,o.useCallback)((e={},t=null)=>({...e,ref:t,"data-active":(0,c.PB)(Z),"data-hover":(0,c.PB)(Q),"data-checked":(0,c.PB)(ei),"data-focus":(0,c.PB)(H),"data-focus-visible":(0,c.PB)(H&&z),"data-indeterminate":(0,c.PB)(O),"data-disabled":(0,c.PB)(n),"data-invalid":(0,c.PB)(u),"data-readonly":(0,c.PB)(r)}),[Z,ei,n,H,z,Q,O,u,r]),ed=(0,o.useCallback)((e={},t=null)=>({...G,...e,ref:i(t,e=>{e&&et("LABEL"===e.tagName)}),onClick:(0,c.v0)(e.onClick,()=>{var e;ee||(null==(e=Y.current)||e.click(),requestAnimationFrame(()=>{var e;null==(e=Y.current)||e.focus({preventScroll:!0})}))}),"data-disabled":(0,c.PB)(n),"data-checked":(0,c.PB)(ei),"data-invalid":(0,c.PB)(u)}),[G,n,ei,u,ee]),ep=(0,o.useCallback)((e={},t=null)=>({...e,ref:i(Y,t),type:"checkbox",name:w,value:I,id:l,tabIndex:T,onChange:(0,c.v0)(e.onChange,ea),onBlur:(0,c.v0)(e.onBlur,$,()=>V(!1)),onFocus:(0,c.v0)(e.onFocus,q,()=>V(!0)),onKeyDown:(0,c.v0)(e.onKeyDown,el),onKeyUp:(0,c.v0)(e.onKeyUp,es),required:a,checked:ei,disabled:eu,readOnly:r,"aria-label":A,"aria-labelledby":U,"aria-invalid":F?!!F:u,"aria-describedby":d,"aria-disabled":n,style:g}),[w,I,l,ea,$,q,el,es,a,ei,eu,r,A,U,F,u,d,n,T]),eh=(0,o.useCallback)((e={},t=null)=>({...e,ref:t,onMouseDown:(0,c.v0)(e.onMouseDown,B),"data-disabled":(0,c.PB)(n),"data-checked":(0,c.PB)(ei),"data-invalid":(0,c.PB)(u)}),[ei,n,u]);return{state:{isInvalid:u,isFocused:H,isChecked:ei,isActive:Z,isHovered:Q,isIndeterminate:O,isDisabled:n,isReadOnly:r,isRequired:a},getRootProps:ed,getCheckboxProps:ec,getIndicatorProps:ef,getInputProps:ep,getLabelProps:eh,htmlProps:G}}(d),w=(0,o.useMemo)(()=>({display:"inline-block",position:"relative",verticalAlign:"middle",lineHeight:0,...n.container}),[n.container]),I=(0,o.useMemo)(()=>({display:"inline-flex",flexShrink:0,justifyContent:"flex-start",boxSizing:"content-box",cursor:"pointer",...n.track}),[n.track]),T=(0,o.useMemo)(()=>({userSelect:"none",marginStart:r,...n.label}),[r,n.label]);return(0,f.jsxs)(s.m.label,{...j(),className:(0,c.cx)("chakra-switch",e.className),__css:w,children:[(0,f.jsx)("input",{className:"chakra-switch__input",...h({},t)}),(0,f.jsx)(s.m.span,{..._(),className:"chakra-switch__track",__css:I,children:(0,f.jsx)(s.m.span,{__css:n.thumb,className:"chakra-switch__thumb",...p()})}),a&&(0,f.jsx)(s.m.span,{className:"chakra-switch__label",...O(),__css:T,children:a})]})});I.displayName="Switch"},2102:function(e,t,n){"use strict";n.d(t,{jC:function(){return d},mq:function(){return f}});var r=n(4227),o=n(5754),i=n(8712),a=n(9660),u=n(4295),l=n(5918),s=n(5720);function c(e,t={}){var n;let{styleConfig:c,...f}=t,{theme:d,colorMode:p}=function(){let e=(0,i.If)(),t=function(){let e=(0,o.useContext)(r.T);if(!e)throw Error("useTheme: `theme` is undefined. Seems you forgot to wrap your app in `<ChakraProvider />` or `<ThemeProvider />`");return e}();return{...e,theme:t}}(),h=e?(0,u.Wf)(d,`components.${e}`):void 0,m=c||h,y=l({theme:d,colorMode:p},null!=(n=null==m?void 0:m.defaultProps)?n:{},(0,u.YU)((0,u.CE)(f,["children"]))),v=(0,o.useRef)({});if(m){let e=(0,a.Ud)(m),t=e(y),n=s(v.current,t);n||(v.current=t)}return v.current}function f(e,t={}){return c(e,t)}function d(e,t={}){return c(e,t)}}}]);