(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5],{9212:function(g,d,a){"use strict";a.d(d,{E:function(){return o}});var h=a(7462),b=a(7294),e=a(9477),i=a(4609),f=a(9137);let j=a=>a===Object(a)&&!Array.isArray(a)&&"function"!=typeof a;function c(a,d){let f=(0,i.w)(a=>a.gl),c=(0,i.z)(e.TextureLoader,j(a)?Object.values(a):a);if((0,b.useLayoutEffect)(()=>{null==d||d(c)},[d]),(0,b.useEffect)(()=>{let a=Array.isArray(c)?c:[c];a.forEach(f.initTexture)},[f,c]),!j(a))return c;{let g=Object.keys(a),h={};return g.forEach(a=>Object.assign(h,{[a]:c[g.indexOf(a)]})),h}}c.preload=a=>i.z.preload(e.TextureLoader,a),c.clear=a=>i.z.clear(e.TextureLoader,a);let k=(0,f.g)({color:new e.Color("white"),scale:[1,1],imageBounds:[1,1],map:null,zoom:1,grayscale:0,opacity:1},`
  varying vec2 vUv;
  void main() {
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);
    vUv = uv;
  }
`,`
  // mostly from https://gist.github.com/statico/df64c5d167362ecf7b34fca0b1459a44
  varying vec2 vUv;
  uniform vec2 scale;
  uniform vec2 imageBounds;
  uniform vec3 color;
  uniform sampler2D map;
  uniform float zoom;
  uniform float grayscale;
  uniform float opacity;
  const vec3 luma = vec3(.299, 0.587, 0.114);
  vec4 toGrayscale(vec4 color, float intensity) {
    return vec4(mix(color.rgb, vec3(dot(color.rgb, luma)), intensity), color.a);
  }
  vec2 aspect(vec2 size) {
    return size / min(size.x, size.y);
  }
  void main() {
    vec2 s = aspect(scale);
    vec2 i = aspect(imageBounds);
    float rs = s.x / s.y;
    float ri = i.x / i.y;
    vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
    vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
    vec2 uv = vUv * s / new + offset;
    vec2 zUv = (uv - vec2(0.5, 0.5)) / zoom + vec2(0.5, 0.5);
    gl_FragColor = toGrayscale(texture2D(map, zUv) * vec4(color, opacity), grayscale);
    
    #include <tonemapping_fragment>
    #include <encodings_fragment>
  }
`),l=b.forwardRef(({children:e,color:f,segments:d=1,scale:a=1,zoom:g=1,grayscale:j=0,opacity:l=1,texture:c,toneMapped:m,transparent:n,...o},p)=>{(0,i.e)({ImageMaterial:k});let q=(0,i.w)(a=>a.gl),r=Array.isArray(a)?[a[0],a[1]]:[a,a],s=[c.image.width,c.image.height];return b.createElement("mesh",(0,h.Z)({ref:p,scale:a},o),b.createElement("planeGeometry",{args:[1,1,d,d]}),b.createElement("imageMaterial",{color:f,map:c,"map-encoding":q.outputEncoding,zoom:g,grayscale:j,opacity:l,scale:r,imageBounds:s,toneMapped:m,transparent:n}),e)}),m=b.forwardRef(({url:a,...d},e)=>{let f=c(a);return b.createElement(l,(0,h.Z)({},d,{texture:f,ref:e}))}),n=b.forwardRef(({url:d,...a},c)=>b.createElement(l,(0,h.Z)({},a,{ref:c}))),o=b.forwardRef((a,c)=>{if(a.url)return b.createElement(m,(0,h.Z)({},a,{ref:c}));if(a.texture)return b.createElement(n,(0,h.Z)({},a,{ref:c}));throw new Error("<Image /> requires a url or texture")})},9137:function(c,b,a){"use strict";a.d(b,{g:function(){return e}});var d=a(9477);function e(b,c,e,f){let a=class extends d.ShaderMaterial{constructor(){let a=Object.entries(b);super({uniforms:a.reduce((a,[b,c])=>{let e=d.UniformsUtils.clone({[b]:{value:c}});return{...a,...e}},{}),vertexShader:c,fragmentShader:e}),this.key="",a.forEach(([a])=>Object.defineProperty(this,a,{get:()=>this.uniforms[a].value,set:b=>this.uniforms[a].value=b})),f&&f(this)}};return a.key=d.MathUtils.generateUUID(),a}},1758:function(d,c,a){"use strict";a.d(c,{Fq:function(){return l},Xs:function(){return o},vO:function(){return k}});var e=a(7462),f=a(9477),b=a(7294),g=a(745),h=a(4609),i=a(5878);let j=b.createContext(null);function k(){return b.useContext(j)}function l({eps:g=1e-5,enabled:i=!0,infinite:k,horizontal:a,pages:c=1,distance:l=1,damping:m=4,style:v={},children:n}){let{get:w,setEvents:x,gl:o,size:p,invalidate:q,events:r}=(0,h.w)(),[d]=b.useState(()=>document.createElement("div")),[s]=b.useState(()=>document.createElement("div")),[t]=b.useState(()=>document.createElement("div")),u=o.domElement.parentNode,y=b.useRef(0),e=b.useMemo(()=>{let b={el:d,eps:g,fill:s,fixed:t,horizontal:a,damping:m,offset:0,delta:0,scroll:y,pages:c,range(d,e,b=0){let a=d-b,c=a+e+2*b;return this.offset<a?0:this.offset>c?1:(this.offset-a)/(c-a)},curve(a,b,c=0){return Math.sin(this.range(a,b,c)*Math.PI)},visible(c,d,a=0){let b=c-a;return this.offset>=b&&this.offset<=b+d+2*a}};return b},[g,m,a,c]);b.useEffect(()=>{for(let b in d.style.position="absolute",d.style.width="100%",d.style.height="100%",d.style[a?"overflowX":"overflowY"]="auto",d.style[a?"overflowY":"overflowX"]="hidden",d.style.top="0px",d.style.left="0px",v)d.style[b]=v[b];t.style.position="sticky",t.style.top="0px",t.style.left="0px",t.style.width="100%",t.style.height="100%",t.style.overflow="hidden",d.appendChild(t),s.style.height=a?"100%":`${c*l*100}%`,s.style.width=a?`${c*l*100}%`:"100%",s.style.pointerEvents="none",d.appendChild(s),u.appendChild(d),d[a?"scrollLeft":"scrollTop"]=1;let e=r.connected||o.domElement;requestAnimationFrame(()=>null==r.connect?void 0:r.connect(d));let f=w().events.compute;return x({compute(b,a){let c=b.clientX-u.offsetLeft,d=b.clientY-u.offsetTop;a.pointer.set(c/a.size.width*2-1,-(2*(d/a.size.height))+1),a.raycaster.setFromCamera(a.pointer,a.camera)}}),()=>{u.removeChild(d),x({compute:f}),null==r.connect||r.connect(e)}},[c,l,a,d,s,t,u]),b.useEffect(()=>{if(r.connected===d){let b=p[a?"width":"height"],c=d[a?"scrollWidth":"scrollHeight"],h=c-b,j=0,l=!0,m=!0,f=()=>{if(i&&!m&&(q(),j=d[a?"scrollLeft":"scrollTop"],y.current=j/h,k)){if(!l){if(j>=h){let b=1-e.offset;d[a?"scrollLeft":"scrollTop"]=1,y.current=e.offset=-b,l=!0}else if(j<=0){let f=1+e.offset;d[a?"scrollLeft":"scrollTop"]=c,y.current=e.offset=f,l=!0}}l&&setTimeout(()=>l=!1,40)}};d.addEventListener("scroll",f,{passive:!0}),requestAnimationFrame(()=>m=!1);let g=a=>d.scrollLeft+=a.deltaY/2;return a&&d.addEventListener("wheel",g,{passive:!0}),()=>{d.removeEventListener("scroll",f),a&&d.removeEventListener("wheel",g)}}},[d,r,p,k,e,q,a,i]);let z=0;return(0,h.x)((b,a)=>{e.offset=f.MathUtils.damp(z=e.offset,y.current,m,a),e.delta=f.MathUtils.damp(e.delta,Math.abs(z-e.offset),m,a),e.delta>g&&q()}),b.createElement(j.Provider,{value:e},n)}let m=b.forwardRef(({children:a},c)=>{let d=b.useRef(null),e=k(),{width:f,height:g}=(0,h.w)(a=>a.viewport);return(0,h.x)(()=>{d.current.position.x=e.horizontal?-f*(e.pages-1)*e.offset:0,d.current.position.y=e.horizontal?0:g*(e.pages-1)*e.offset}),b.createElement("group",{ref:(0,i.Z)([c,d])},a)}),n=b.forwardRef(({children:c,style:d,...f},l)=>{let a=k(),m=b.useRef(null),{width:p,height:q}=(0,h.w)(a=>a.size),n=b.useContext(h.f),o=b.useMemo(()=>g.createRoot(a.fixed),[a.fixed]);return(0,h.x)(()=>{a.delta>a.eps&&(m.current.style.transform=`translate3d(${a.horizontal?-p*(a.pages-1)*a.offset:0}px,${a.horizontal?0:-(q*(a.pages-1)*a.offset)}px,0)`)}),o.render(b.createElement("div",(0,e.Z)({ref:(0,i.Z)([l,m]),style:{...d,position:"absolute",top:0,left:0,willChange:"transform"}},f),b.createElement(j.Provider,{value:a},b.createElement(h.f.Provider,{value:n},c)))),null}),o=b.forwardRef(({html:a,...c},d)=>b.createElement(a?n:m,(0,e.Z)({ref:d},c)))},9941:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/scroll-effect",function(){return c(3075)}])},2439:function(c,b,a){"use strict";a.d(b,{W:function(){return h}});var d=a(5893),e=a(949),f=a(8527);function g(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}var h=function(b){var a=(0,e.If)().colorMode;return(0,d.jsx)(f.xu,function(d){for(var a=1;a<arguments.length;a++){var c=null!=arguments[a]?arguments[a]:{},b=Object.keys(c);"function"==typeof Object.getOwnPropertySymbols&&(b=b.concat(Object.getOwnPropertySymbols(c).filter(function(a){return Object.getOwnPropertyDescriptor(c,a).enumerable}))),b.forEach(function(a){g(d,a,c[a])})}return d}({bg:{light:"gray.50",dark:"gray.700"}[a],color:{light:"black",dark:"white"}[a]},b))}},3075:function(c,b,a){"use strict";a.r(b),a.d(b,{"default":function(){return q}});var d=a(5893),e=a(2439),f=a(8527),g=a(1758),h=a(9212),i=a(9477),j=a(7294),k=a(4609);function l({all:a,scene:b,camera:c}){let d=(0,k.w)(({gl:a})=>a),e=(0,k.w)(({camera:a})=>a),f=(0,k.w)(({scene:a})=>a);return j.useLayoutEffect(()=>{let h=[];a&&(b||f).traverse(a=>{!1===a.visible&&(h.push(a),a.visible=!0)}),d.compile(b||f,c||e);let g=new i.WebGLCubeRenderTarget(128),j=new i.CubeCamera(.01,1e5,g);j.update(d,b||f),g.dispose(),h.forEach(a=>a.visible=!1)},[]),null}var m=a(6135),n=a(5508),o=function(){var b=(0,k.w)(function(a){return a.viewport}),c=b.width,a=b.height,f=(0,g.vO)(),e=(0,j.useRef)();return(0,k.x)(function(){e.current.children[0].material.zoom=1+f.range(0,1/3)/3,e.current.children[1].material.zoom=1+f.range(0,1/3)/3,e.current.children[2].material.zoom=1+f.range(1.15/3,1/3)/3,e.current.children[3].material.zoom=1+f.range(1.15/3,1/3)/2,e.current.children[4].material.zoom=1+f.range(1.25/3,1/3)/1,e.current.children[5].material.zoom=1+f.range(.6,1/3)/3,e.current.children[5].material.grayscale=1-f.range(1.6/3,1/3),e.current.children[6].material.zoom=1+(1-f.range(2/3,1/3))/3}),(0,d.jsxs)("group",{ref:e,children:[(0,d.jsx)(h.E,{position:[-2,0,0],scale:[4,a,1],url:"".concat(n.u,"/img/scroll-effect/1.jpeg")}),(0,d.jsx)(h.E,{position:[2,0,1],scale:3,url:"".concat(n.u,"/img/scroll-effect/2.jpeg")}),(0,d.jsx)(h.E,{position:[-2.3,-a,2],scale:[1,3,1],url:"".concat(n.u,"/img/scroll-effect/3.jpeg")}),(0,d.jsx)(h.E,{position:[-0.6,-a,3],scale:[1,2,1],url:"".concat(n.u,"/img/scroll-effect/4.jpeg")}),(0,d.jsx)(h.E,{position:[.75,-a,3.5],scale:1.5,url:"".concat(n.u,"/img/scroll-effect/5.jpeg")}),(0,d.jsx)(h.E,{position:[0,-(1.5*a),2.5],scale:[1.5,3,1],url:"".concat(n.u,"/img/scroll-effect/6.jpeg")}),(0,d.jsx)(h.E,{position:[0,-(2*a)-a/4,0],scale:[c,a/2,1],url:"".concat(n.u,"/img/scroll-effect/7.jpeg")})]})},p=function(){return(0,d.jsx)(m.Xz,{gl:{antialias:!1},dpr:[1,1.5],children:(0,d.jsxs)(j.Suspense,{fallback:null,children:[(0,d.jsxs)(g.Fq,{damping:4,pages:3,children:[(0,d.jsx)(g.Xs,{children:(0,d.jsx)(o,{})}),(0,d.jsxs)(g.Xs,{html:!0,children:[(0,d.jsx)(f.xv,{as:"h1",position:"absolute",top:"60vh",left:"1em",children:"First"}),(0,d.jsx)(f.xv,{position:"absolute",top:"120vh",left:"60vw",children:"Second"}),(0,d.jsx)(f.xv,{as:"h1",position:"absolute",top:"220vh",left:"10vw",fontSize:"25vw",color:"white",children:"TITLE"})]})]}),(0,d.jsx)(l,{})]})})},q=function(){return(0,d.jsx)(e.W,{height:"100%",children:(0,d.jsx)(p,{})})}},5508:function(c,a,b){"use strict";b.d(a,{u:function(){return d}});var d="/showroom/r3f-playground"}},function(a){a.O(0,[737,527,135,774,888,179],function(){return a(a.s=9941)}),_N_E=a.O()}])