(()=>{"use strict";(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,46983,e=>{var r=e.i(70010),t=e.i(27919),i=e.i(8359),o=e.i(14516),s=e.i(17867);function a({all:e,scene:r,camera:l}){let n=(0,s.f)(({gl:e})=>e),c=(0,s.f)(({camera:e})=>e),f=(0,s.f)(({scene:e})=>e);return o.useLayoutEffect(()=>{let o=[];e&&(r||f).traverse(e=>{!1===e.visible&&(o.push(e),e.visible=!0)}),n.compile(r||f,l||c);let s=new t.P(128);new i.pg(.01,1e5,s).update(n,r||f),s.dispose(),o.forEach(e=>e.visible=!1)},[]),null}var l=e.i(21e3),n=e.i(8262),c=e.i(64622),f=e.i(94010),u=e.i(77164);let m=()=>{let{width:e,height:t}=(0,s.f)(e=>e.viewport),i=(0,l.n)(),a=(0,o.useRef)(null);return(0,f.f)(()=>{a.current&&(a.current.children[0].material.zoom=1+i.range(0,1/3)/3,a.current.children[1].material.zoom=1+i.range(0,1/3)/3,a.current.children[2].material.zoom=1+i.range(1.15/3,1/3)/3,a.current.children[3].material.zoom=1+i.range(1.15/3,1/3)/2,a.current.children[4].material.zoom=1+i.range(1.25/3,1/3)/1,a.current.children[5].material.zoom=1+i.range(.6,1/3)/3,a.current.children[5].material.grayscale=1-i.range(1.6/3,1/3),a.current.children[6].material.zoom=1+(1-i.range(2/3,1/3))/3)}),(0,r.jsxs)("group",{ref:a,children:[(0,r.jsx)(n.f,{position:[-2,0,0],scale:[4,t],url:`${u.f}/img/scroll-effect/1.jpeg`}),(0,r.jsx)(n.f,{position:[2,0,1],scale:3,url:`${u.f}/img/scroll-effect/2.jpeg`}),(0,r.jsx)(n.f,{position:[-2.3,-t,2],scale:[1,3],url:`${u.f}/img/scroll-effect/3.jpeg`}),(0,r.jsx)(n.f,{position:[-.6,-t,3],scale:[1,2],url:`${u.f}/img/scroll-effect/4.jpeg`}),(0,r.jsx)(n.f,{position:[.75,-t,3.5],scale:1.5,url:`${u.f}/img/scroll-effect/5.jpeg`}),(0,r.jsx)(n.f,{position:[0,-(1.5*t),2.5],scale:[1.5,3],url:`${u.f}/img/scroll-effect/6.jpeg`}),(0,r.jsx)(n.f,{position:[0,-(2*t)-t/4,0],scale:[e,t/2],url:`${u.f}/img/scroll-effect/7.jpeg`})]})};e.s(["ScrollEffect",0,()=>(0,r.jsx)(c.f,{gl:{antialias:!1},dpr:[1,1.5],children:(0,r.jsxs)(o.Suspense,{fallback:null,children:[(0,r.jsxs)(l.g,{pages:3,children:[(0,r.jsx)(l.A,{children:(0,r.jsx)(m,{})}),(0,r.jsxs)(l.A,{html:!0,children:[(0,r.jsx)("h1",{style:{position:"absolute",top:"60vh",left:"1em"},children:"First"}),(0,r.jsx)("p",{style:{position:"absolute",top:"120vh",left:"60vw"},children:"Second"}),(0,r.jsx)("h1",{style:{position:"absolute",top:"220vh",left:"10vw",fontSize:"25vw"},children:"TITLE"})]})]}),(0,r.jsx)(a,{})]})})],46983)},77164,e=>{e.i(4339),e.s(["f",0,"/showroom/nextjs-playground"])},6399,e=>{function r(){return(r=Object.assign.bind()).apply(null,arguments)}e.s(["f",()=>r])},8262,e=>{var r=e.i(6399),t=e.i(14516),i=e.i(8359),o=e.i(55493),s=e.i(17867),a=e.i(33715),l=e.i(53590);let n=e=>e===Object(e)&&!Array.isArray(e)&&"function"!=typeof e;function c(e,r){let o=(0,s.f)(e=>e.gl),a=(0,l.f)(i.H5,n(e)?Object.values(e):e);return(0,t.useLayoutEffect)(()=>{null==r||r(a)},[r]),(0,t.useEffect)(()=>{if("initTexture"in o){let e=[];Array.isArray(a)?e=a:a instanceof i.Sk?e=[a]:n(a)&&(e=Object.values(a)),e.forEach(e=>{e instanceof i.Sk&&o.initTexture(e)})}},[o,a]),(0,t.useMemo)(()=>{if(!n(e))return a;{let r={},t=0;for(let i in e)r[i]=a[t++];return r}},[e,a])}c.preload=e=>l.f.preload(i.H5,e),c.clear=e=>l.f.clear(i.H5,e);let f=parseInt(i.Tu.replace(/\D+/g,"")),u=(0,a.f)({color:new i.Es("white"),scale:new i.wq(1,1),imageBounds:new i.wq(1,1),resolution:1024,map:null,zoom:1,radius:0,grayscale:0,opacity:1},`
  varying vec2 vUv;
  varying vec2 vPos;
  void main() {
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);
    vUv = uv;
    vPos = position.xy;
  }
`,`
  // mostly from https://gist.github.com/statico/df64c5d167362ecf7b34fca0b1459a44
  varying vec2 vUv;
  varying vec2 vPos;
  uniform vec2 scale;
  uniform vec2 imageBounds;
  uniform float resolution;
  uniform vec3 color;
  uniform sampler2D map;
  uniform float radius;
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
  
  const float PI = 3.14159265;
    
  // from https://iquilezles.org/articles/distfunctions
  float udRoundBox( vec2 p, vec2 b, float r ) {
    return length(max(abs(p)-b+r,0.0))-r;
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

    vec2 res = vec2(scale * resolution);
    vec2 halfRes = 0.5 * res;
    float b = udRoundBox(vUv.xy * res - halfRes, halfRes, resolution * radius);    
	  vec3 a = mix(vec3(1.0,0.0,0.0), vec3(0.0,0.0,0.0), smoothstep(0.0, 1.0, b));
    gl_FragColor = toGrayscale(texture2D(map, zUv) * vec4(color, opacity * a), grayscale);
    
    #include <tonemapping_fragment>
    #include <${f>=154?"colorspace_fragment":"encodings_fragment"}>
  }
`),m=t.forwardRef(({children:e,color:i,segments:a=1,scale:l=1,zoom:n=1,grayscale:c=0,opacity:f=1,radius:m=0,texture:v,toneMapped:g,transparent:p,side:d,...h},y)=>{(0,o.f)({ImageMaterial:u});let x=t.useRef(null),j=(0,s.f)(e=>e.size),w=Array.isArray(l)?[l[0],l[1]]:[l,l],b=[v.image.width,v.image.height],z=Math.max(j.width,j.height);return t.useImperativeHandle(y,()=>x.current,[]),t.useLayoutEffect(()=>{x.current.geometry.parameters&&x.current.material.scale.set(w[0]*x.current.geometry.parameters.width,w[1]*x.current.geometry.parameters.height)},[w[0],w[1]]),t.createElement("mesh",(0,r.f)({ref:x,scale:Array.isArray(l)?[...l,1]:l},h),t.createElement("planeGeometry",{args:[1,1,a,a]}),t.createElement("imageMaterial",{color:i,map:v,zoom:n,grayscale:c,opacity:f,scale:w,imageBounds:b,resolution:z,radius:m,toneMapped:g,transparent:p,side:d,key:u.key}),e)}),v=t.forwardRef(({url:e,...i},o)=>{let s=c(e);return t.createElement(m,(0,r.f)({},i,{texture:s,ref:o}))}),g=t.forwardRef(({url:e,...i},o)=>t.createElement(m,(0,r.f)({},i,{ref:o}))),p=t.forwardRef((e,i)=>{if(e.url)return t.createElement(v,(0,r.f)({},e,{ref:i}));if(e.texture)return t.createElement(g,(0,r.f)({},e,{ref:i}));throw Error("<Image /> requires a url or texture")});e.s(["f",0,p],8262)},33715,e=>{var r=e.i(8359);e.s(["f",0,function(e,t,i,o){var s;return(s=class extends r.Zg{constructor(s){for(let o in super({vertexShader:t,fragmentShader:i,...s}),e)this.uniforms[o]=new r.MY(e[o]),Object.defineProperty(this,o,{get(){return this.uniforms[o].value},set(e){this.uniforms[o].value=e}});this.uniforms=r.SP.clone(this.uniforms),null==o||o(this)}}).key=r.rB.generateUUID(),s}])},17867,e=>{var r=e.i(14487);e.s(["f",()=>r.D])},53590,e=>{var r=e.i(14487);e.s(["f",()=>r.H])},55493,e=>{var r=e.i(14487);e.s(["f",()=>r.e])}])})();