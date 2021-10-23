(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5],{2326:function(e,t,r){"use strict";r.d(t,{j:function(){return g},m:function(){return v}});var n=r(5505),o=r(8554),i=r.n(o),s=r(658),c=r(7294),a=r(9590),l=r.n(a),u=r(4738),f=r(9676);function p(){return(p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function d(){return p({},(0,u.If)(),{theme:(0,f.Fg)()})}function v(e,t,r){var o;void 0===t&&(t={}),void 0===r&&(r={});var{styleConfig:a}=t,u=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(t,["styleConfig"]),{theme:f,colorMode:p}=d(),v=(0,n.Wf)(f,"components."+e),g=a||v,h=i()({theme:f,colorMode:p},null!=(o=null==g?void 0:g.defaultProps)?o:{},(0,n.YU)((0,n.CE)(u,["children"]))),m=(0,c.useRef)({});if(g){var y,x,j,b,w,O,E=(0,s.Pu)(null!=(y=g.baseStyle)?y:{},h),z=(0,s.Pu)(null!=(x=null==(j=g.variants)?void 0:j[h.variant])?x:{},h),P=(0,s.Pu)(null!=(b=null==(w=g.sizes)?void 0:w[h.size])?b:{},h),_=i()({},E,P,z);null!=(O=r)&&O.isMultiPart&&g.parts&&g.parts.forEach((e=>{var t;_[e]=null!=(t=_[e])?t:{}})),l()(m.current,_)||(m.current=_)}return m.current}function g(e,t){return v(e,t,{isMultiPart:!0})}},9584:function(e,t,r){"use strict";r.d(t,{E:function(){return f}});var n=r(7462),o=r(7294),i=r(5648),s=r(9137),c=r(2212);const a=e=>e===Object(e)&&!Array.isArray(e)&&"function"!==typeof e;function l(e){const t=(0,i.Ky)((e=>e.gl)),r=(0,i.U2)(c.TextureLoader,a(e)?Object.values(e):e);if((0,o.useEffect)((()=>{(Array.isArray(r)?r:[r]).forEach(t.initTexture)}),[t,r]),a(e)){const t=Object.keys(e),n={};return t.forEach((e=>Object.assign(n,{[e]:r[t.indexOf(e)]}))),n}return r}l.preload=e=>i.U2.preload(c.TextureLoader,e),l.clear=e=>i.U2.clear(c.TextureLoader,e);const u=(0,s.g)({scale:[1,1],imageBounds:[1,1],map:null,zoom:1,grayscale:0},"\n  varying vec2 vUv;\n  void main() {\n    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);\n    vUv = uv;\n  }\n","\n  // mostly from https://gist.github.com/statico/df64c5d167362ecf7b34fca0b1459a44\n  varying vec2 vUv;\n  uniform vec2 scale;\n  uniform vec2 imageBounds;\n  uniform sampler2D map;\n  uniform float zoom;\n  uniform float grayscale;\n  const vec3 luma = vec3(.299, 0.587, 0.114);\n  vec4 toGrayscale(vec4 color, float intensity) {\n    return vec4(mix(color.rgb, vec3(dot(color.rgb, luma)), intensity), color.a);\n  }\n  vec2 aspect(vec2 size) {\n    return size / min(size.x, size.y);\n  }\n  void main() {\n    vec2 s = aspect(scale);\n    vec2 i = aspect(imageBounds);\n    float rs = s.x / s.y;\n    float ri = i.x / i.y;\n    vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);\n    vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;\n    vec2 uv = vUv * s / new + offset;\n    vec2 zUv = (uv - vec2(0.5, 0.5)) / zoom + vec2(0.5, 0.5);\n    gl_FragColor = toGrayscale(texture2D(map, zUv), grayscale);\n  }\n"),f=o.forwardRef((({segments:e=1,scale:t=1,zoom:r=1,grayscale:s=0,url:c,...a},f)=>{(0,i.l7)({ImageMaterial:u});const p=l(c),d=Array.isArray(t)?[t[0],t[1]]:[t,t],v=[p.image.width,p.image.height];return o.createElement("mesh",(0,n.Z)({ref:f,scale:t},a),o.createElement("planeGeometry",{args:[1,1,e,e]}),o.createElement("imageMaterial",{map:p,zoom:r,grayscale:s,scale:d,imageBounds:v}))}))},9137:function(e,t,r){"use strict";r.d(t,{g:function(){return o}});var n=r(2212);function o(e,t,r,o){return class extends n.ShaderMaterial{constructor(){const i=Object.entries(e);super({uniforms:i.reduce(((e,[t,r])=>({...e,...n.UniformsUtils.clone({[t]:{value:r}})})),{}),vertexShader:t,fragmentShader:r}),i.forEach((([e])=>Object.defineProperty(this,e,{get:()=>this.uniforms[e].value,set:t=>this.uniforms[e].value=t}))),o&&o(this)}}}},1758:function(e,t,r){"use strict";r.d(t,{Xs:function(){return p},Fq:function(){return f},vO:function(){return u}});var n=r(7462),o=r(2212),i=r(7294),s=r(3935),c=r(5648),a=r(5878);const l=i.createContext(null);function u(){return i.useContext(l)}function f({eps:e=1e-5,infinite:t,horizontal:r,pages:n=1,distance:s=1,damping:a=4,children:u}){const f=(0,c.Ky)((e=>e.gl)),p=(0,c.Ky)((e=>e.invalidate)),d=(0,c.Ky)((e=>e.events)),v=(0,c.Ky)((e=>e.raycaster)),[g]=i.useState((()=>document.createElement("div"))),[h]=i.useState((()=>document.createElement("div"))),[m]=i.useState((()=>document.createElement("div"))),y=f.domElement.parentNode,x=i.useRef(0),j=i.useMemo((()=>({el:g,eps:e,fill:h,fixed:m,horizontal:r,damping:a,offset:0,delta:0,scroll:x,pages:n,range(e,t){const r=e+t;return this.offset<e?0:this.offset>r?1:(this.offset-e)/(r-e)},visible(e,t){const r=e+t;return this.offset>=e&&this.offset<=r}})),[e,a,r,n]);i.useEffect((()=>{g.style.position="absolute",g.style.width="100%",g.style.height="100%",g.style[r?"overflowX":"overflowY"]="auto",g.style.top="0px",g.style.left="0px",m.style.position="sticky",m.style.top="0px",m.style.left="0px",g.appendChild(m),h.style.height=r?"100%":n*s*100+"%",h.style.width=r?n*s*100+"%":"100%",h.style.pointerEvents="none",g.appendChild(h);const e=e=>{if(p(),x.current=r?e.target.scrollLeft/(e.target.scrollWidth-e.target.clientWidth):e.target.scrollTop/(e.target.scrollHeight-e.target.clientHeight),t)if(1===x.current){const t=1-j.offset;e.target[r?"scrollLeft":"scrollTop"]=0,x.current=j.offset=-t}else if(0===x.current){const t=1+j.offset;e.target[r?"scrollLeft":"scrollTop"]=e.target[r?"scrollWidth":"scrollHeight"],x.current=j.offset=t}};return g.addEventListener("scroll",e,{passive:!0}),y.appendChild(g),requestAnimationFrame((()=>null==d.connect?void 0:d.connect(g))),v.computeOffsets=({clientX:e,clientY:t})=>({offsetX:e,offsetY:t}),()=>{y.removeChild(g),g.removeEventListener("scroll",e)}}),[t,j,p,s,a,n,r]);let b=0;return(0,c.xQ)(((t,r)=>{j.offset=o.MathUtils.damp(b=j.offset,x.current,a,r),j.delta=o.MathUtils.damp(j.delta,Math.abs(b-j.offset),a,r),j.delta>e&&p()})),i.createElement(l.Provider,{value:j},u)}const p=i.forwardRef((({html:e,...t},r)=>{const o=e?v:d;return i.createElement(o,(0,n.Z)({ref:r},t))})),d=i.forwardRef((({children:e},t)=>{const r=i.useRef(null),n=u(),{width:o,height:s}=(0,c.Ky)((e=>e.viewport));return(0,c.xQ)((()=>{r.current.position.x=n.horizontal?-o*(n.pages-1)*n.offset:0,r.current.position.y=n.horizontal?0:s*(n.pages-1)*n.offset})),i.createElement("group",{ref:(0,a.Z)([t,r])},e)})),v=i.forwardRef((({children:e,style:t,...r},o)=>{const f=u(),p=i.useRef(null),{width:d,height:v}=(0,c.Ky)((e=>e.size)),g=i.useContext(c.Do);return(0,c.xQ)((()=>{f.delta>f.eps&&(p.current.style.transform=`translate3d(${f.horizontal?-d*(f.pages-1)*f.offset:0}px,${f.horizontal?0:v*(f.pages-1)*-f.offset}px,0)`)})),s.render(i.createElement("div",(0,n.Z)({ref:(0,a.Z)([o,p]),style:{...t,position:"absolute",top:0,left:0,willChange:"transform"}},r),i.createElement(l.Provider,{value:f},i.createElement(c.Do.Provider,{value:g},e))),f.fixed),null}))},5647:function(e,t,r){"use strict";r.d(t,{W:function(){return a}});var n=r(2809),o=r(980),i=r(8017),s=r(5893);function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var a=function(e){var t=(0,o.useColorMode)().colorMode;return(0,s.jsx)(i.xu,function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({bg:{light:"gray.50",dark:"gray.700"}[t],color:{light:"black",dark:"white"}[t]},e))}},4779:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return O}});var n=r(5647),o=r(63),i=r(2326),s=r(5284),c=r(9384),a=r(5505),l=r(4461),u=r(3808),f=r(7294);function p(){return(p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var d=(0,o.G)(((e,t)=>{var r=(0,i.m)("Text",e),n=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}((0,s.Lr)(e),["className","align","decoration","casing"]),o=(0,a.YU)({textAlign:e.align,textDecoration:e.decoration,textTransform:e.casing});return f.createElement(c.m$.p,p({ref:t,className:(0,l.cx)("chakra-text",e.className)},o,n,{__css:r}))}));u.Ts&&(d.displayName="Text");var v=r(1758),g=r(9584),h=r(2212),m=r(5648);function y({all:e,scene:t,camera:r}){const n=(0,m.Ky)((({gl:e})=>e)),o=(0,m.Ky)((({camera:e})=>e)),i=(0,m.Ky)((({scene:e})=>e));return f.useLayoutEffect((()=>{const s=[];e&&(t||i).traverse((e=>{!1===e.visible&&(s.push(e),e.visible=!0)})),n.compile(t||i,r||o);const c=new h.WebGLCubeRenderTarget(128);new h.CubeCamera(.01,1e5,c).update(n,t||i),c.dispose(),s.forEach((e=>e.visible=!1))}),[]),null}var x=r(5893),j="/showroom/r3f-playground",b=function(){var e=(0,m.Ky)((function(e){return e.viewport})),t=e.width,r=e.height,n=(0,v.vO)(),o=(0,f.useRef)();return(0,m.xQ)((function(){o.current.children[0].material.zoom=1+n.range(0,1/3)/3,o.current.children[1].material.zoom=1+n.range(0,1/3)/3,o.current.children[2].material.zoom=1+n.range(1.15/3,1/3)/3,o.current.children[3].material.zoom=1+n.range(1.15/3,1/3)/2,o.current.children[4].material.zoom=1+n.range(1.25/3,1/3)/1,o.current.children[5].material.zoom=1+n.range(.6,1/3)/3,o.current.children[5].material.grayscale=1-n.range(1.6/3,1/3),o.current.children[6].material.zoom=1+(1-n.range(2/3,1/3))/3})),(0,x.jsxs)("group",{ref:o,children:[(0,x.jsx)(g.E,{position:[-2,0,0],scale:[4,r,1],url:"".concat(j,"/img/scroll-effect/1.jpeg")}),(0,x.jsx)(g.E,{position:[2,0,1],scale:3,url:"".concat(j,"/img/scroll-effect/2.jpeg")}),(0,x.jsx)(g.E,{position:[-2.3,-r,2],scale:[1,3,1],url:"".concat(j,"/img/scroll-effect/3.jpeg")}),(0,x.jsx)(g.E,{position:[-.6,-r,3],scale:[1,2,1],url:"".concat(j,"/img/scroll-effect/4.jpeg")}),(0,x.jsx)(g.E,{position:[.75,-r,3.5],scale:1.5,url:"".concat(j,"/img/scroll-effect/5.jpeg")}),(0,x.jsx)(g.E,{position:[0,1.5*-r,2.5],scale:[1.5,3,1],url:"".concat(j,"/img/scroll-effect/6.jpeg")}),(0,x.jsx)(g.E,{position:[0,2*-r-r/4,0],scale:[t,r/2,1],url:"".concat(j,"/img/scroll-effect/7.jpeg")})]})},w=function(){return(0,x.jsx)(m.Xz,{gl:{antialias:!1},dpr:[1,1.5],children:(0,x.jsxs)(f.Suspense,{fallback:null,children:[(0,x.jsxs)(v.Fq,{damping:4,pages:3,children:[(0,x.jsx)(v.Xs,{children:(0,x.jsx)(b,{})}),(0,x.jsxs)(v.Xs,{html:!0,children:[(0,x.jsx)(d,{as:"h1",position:"absolute",top:"60vh",left:"1em",children:"First"}),(0,x.jsx)(d,{position:"absolute",top:"120vh",left:"60vw",children:"Second"}),(0,x.jsx)(d,{as:"h1",position:"absolute",top:"220vh",left:"10vw",fontSize:"25vw",color:"white",children:"TITLE"})]})]}),(0,x.jsx)(y,{})]})})},O=function(){return(0,x.jsx)(n.W,{height:"100%",children:(0,x.jsx)(w,{})})}},8100:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/scroll-effect",function(){return r(4779)}])},9590:function(e){var t="undefined"!==typeof Element,r="function"===typeof Map,n="function"===typeof Set,o="function"===typeof ArrayBuffer&&!!ArrayBuffer.isView;function i(e,s){if(e===s)return!0;if(e&&s&&"object"==typeof e&&"object"==typeof s){if(e.constructor!==s.constructor)return!1;var c,a,l,u;if(Array.isArray(e)){if((c=e.length)!=s.length)return!1;for(a=c;0!==a--;)if(!i(e[a],s[a]))return!1;return!0}if(r&&e instanceof Map&&s instanceof Map){if(e.size!==s.size)return!1;for(u=e.entries();!(a=u.next()).done;)if(!s.has(a.value[0]))return!1;for(u=e.entries();!(a=u.next()).done;)if(!i(a.value[1],s.get(a.value[0])))return!1;return!0}if(n&&e instanceof Set&&s instanceof Set){if(e.size!==s.size)return!1;for(u=e.entries();!(a=u.next()).done;)if(!s.has(a.value[0]))return!1;return!0}if(o&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(s)){if((c=e.length)!=s.length)return!1;for(a=c;0!==a--;)if(e[a]!==s[a])return!1;return!0}if(e.constructor===RegExp)return e.source===s.source&&e.flags===s.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===s.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===s.toString();if((c=(l=Object.keys(e)).length)!==Object.keys(s).length)return!1;for(a=c;0!==a--;)if(!Object.prototype.hasOwnProperty.call(s,l[a]))return!1;if(t&&e instanceof Element)return!1;for(a=c;0!==a--;)if(("_owner"!==l[a]&&"__v"!==l[a]&&"__o"!==l[a]||!e.$$typeof)&&!i(e[l[a]],s[l[a]]))return!1;return!0}return e!==e&&s!==s}e.exports=function(e,t){try{return i(e,t)}catch(r){if((r.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw r}}}},function(e){e.O(0,[737,328,648,774,888,179],(function(){return t=8100,e(e.s=t);var t}));var t=e.O();_N_E=t}]);