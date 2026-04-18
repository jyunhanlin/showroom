(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,57436,e=>{"use strict";var r=e.i(36734);e.s(["useThree",()=>r.C])},71611,e=>{"use strict";function r(){return(r=Object.assign.bind()).apply(null,arguments)}e.s(["default",()=>r])},77164,e=>{"use strict";e.s(["assetPath",0,"/showroom/nextjs-playground"])},9251,e=>{"use strict";var r=e.i(36734);e.s(["useLoader",()=>r.G])},44720,e=>{"use strict";var r=e.i(36734);e.s(["extend",()=>r.e])},9991,e=>{"use strict";var r=e.i(21348);e.s(["shaderMaterial",0,function(e,t,s,a){var i;return(i=class extends r.ShaderMaterial{constructor(i){for(const a in super({vertexShader:t,fragmentShader:s,...i}),e)this.uniforms[a]=new r.Uniform(e[a]),Object.defineProperty(this,a,{get(){return this.uniforms[a].value},set(e){this.uniforms[a].value=e}});this.uniforms=r.UniformsUtils.clone(this.uniforms),null==a||a(this)}}).key=r.MathUtils.generateUUID(),i}])},73516,e=>{"use strict";var r=e.i(71611),t=e.i(1685),s=e.i(21348),a=e.i(44720),i=e.i(57436),o=e.i(9991),l=e.i(9251);let n=e=>e===Object(e)&&!Array.isArray(e)&&"function"!=typeof e;function c(e,r){let a=(0,i.useThree)(e=>e.gl),o=(0,l.useLoader)(s.TextureLoader,n(e)?Object.values(e):e);return(0,t.useLayoutEffect)(()=>{null==r||r(o)},[r]),(0,t.useEffect)(()=>{if("initTexture"in a){let e=[];Array.isArray(o)?e=o:o instanceof s.Texture?e=[o]:n(o)&&(e=Object.values(o)),e.forEach(e=>{e instanceof s.Texture&&a.initTexture(e)})}},[a,o]),(0,t.useMemo)(()=>{if(!n(e))return o;{let r={},t=0;for(let s in e)r[s]=o[t++];return r}},[e,o])}c.preload=e=>l.useLoader.preload(s.TextureLoader,e),c.clear=e=>l.useLoader.clear(s.TextureLoader,e);let u=parseInt(s.REVISION.replace(/\D+/g,"")),f=(0,o.shaderMaterial)({color:new s.Color("white"),scale:new s.Vector2(1,1),imageBounds:new s.Vector2(1,1),resolution:1024,map:null,zoom:1,radius:0,grayscale:0,opacity:1},`
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
    #include <${u>=154?"colorspace_fragment":"encodings_fragment"}>
  }
`),m=t.forwardRef(({children:e,color:s,segments:o=1,scale:l=1,zoom:n=1,grayscale:c=0,opacity:u=1,radius:m=0,texture:v,toneMapped:d,transparent:g,side:h,...p},y)=>{(0,a.extend)({ImageMaterial:f});let x=t.useRef(null),j=(0,i.useThree)(e=>e.size),b=Array.isArray(l)?[l[0],l[1]]:[l,l],w=[v.image.width,v.image.height],T=Math.max(j.width,j.height);return t.useImperativeHandle(y,()=>x.current,[]),t.useLayoutEffect(()=>{x.current.geometry.parameters&&x.current.material.scale.set(b[0]*x.current.geometry.parameters.width,b[1]*x.current.geometry.parameters.height)},[b[0],b[1]]),t.createElement("mesh",(0,r.default)({ref:x,scale:Array.isArray(l)?[...l,1]:l},p),t.createElement("planeGeometry",{args:[1,1,o,o]}),t.createElement("imageMaterial",{color:s,map:v,zoom:n,grayscale:c,opacity:u,scale:b,imageBounds:w,resolution:T,radius:m,toneMapped:d,transparent:g,side:h,key:f.key}),e)}),v=t.forwardRef(({url:e,...s},a)=>{let i=c(e);return t.createElement(m,(0,r.default)({},s,{texture:i,ref:a}))}),d=t.forwardRef(({url:e,...s},a)=>t.createElement(m,(0,r.default)({},s,{ref:a}))),g=t.forwardRef((e,s)=>{if(e.url)return t.createElement(v,(0,r.default)({},e,{ref:s}));if(e.texture)return t.createElement(d,(0,r.default)({},e,{ref:s}));throw Error("<Image /> requires a url or texture")});e.s(["Image",0,g],73516)},46983,e=>{"use strict";var r=e.i(44501),t=e.i(46154),s=e.i(21348),a=e.i(1685),i=e.i(57436);function o({all:e,scene:r,camera:l}){let n=(0,i.useThree)(({gl:e})=>e),c=(0,i.useThree)(({camera:e})=>e),u=(0,i.useThree)(({scene:e})=>e);return a.useLayoutEffect(()=>{let a=[];e&&(r||u).traverse(e=>{!1===e.visible&&(a.push(e),e.visible=!0)}),n.compile(r||u,l||c);let i=new t.WebGLCubeRenderTarget(128);new s.CubeCamera(.01,1e5,i).update(n,r||u),i.dispose(),a.forEach(e=>e.visible=!1)},[]),null}var l=e.i(77658),n=e.i(73516),c=e.i(55029),u=e.i(1859),f=e.i(77164);let m=()=>{let{width:e,height:t}=(0,i.useThree)(e=>e.viewport),s=(0,l.useScroll)(),o=(0,a.useRef)(null);return(0,u.useFrame)(()=>{o.current&&(o.current.children[0].material.zoom=1+s.range(0,1/3)/3,o.current.children[1].material.zoom=1+s.range(0,1/3)/3,o.current.children[2].material.zoom=1+s.range(1.15/3,1/3)/3,o.current.children[3].material.zoom=1+s.range(1.15/3,1/3)/2,o.current.children[4].material.zoom=1+s.range(1.25/3,1/3)/1,o.current.children[5].material.zoom=1+s.range(.6,1/3)/3,o.current.children[5].material.grayscale=1-s.range(1.6/3,1/3),o.current.children[6].material.zoom=1+(1-s.range(2/3,1/3))/3)}),(0,r.jsxs)("group",{ref:o,children:[(0,r.jsx)(n.Image,{position:[-2,0,0],scale:[4,t],url:`${f.assetPath}/img/scroll-effect/1.jpeg`}),(0,r.jsx)(n.Image,{position:[2,0,1],scale:3,url:`${f.assetPath}/img/scroll-effect/2.jpeg`}),(0,r.jsx)(n.Image,{position:[-2.3,-t,2],scale:[1,3],url:`${f.assetPath}/img/scroll-effect/3.jpeg`}),(0,r.jsx)(n.Image,{position:[-.6,-t,3],scale:[1,2],url:`${f.assetPath}/img/scroll-effect/4.jpeg`}),(0,r.jsx)(n.Image,{position:[.75,-t,3.5],scale:1.5,url:`${f.assetPath}/img/scroll-effect/5.jpeg`}),(0,r.jsx)(n.Image,{position:[0,-(1.5*t),2.5],scale:[1.5,3],url:`${f.assetPath}/img/scroll-effect/6.jpeg`}),(0,r.jsx)(n.Image,{position:[0,-(2*t)-t/4,0],scale:[e,t/2],url:`${f.assetPath}/img/scroll-effect/7.jpeg`})]})};e.s(["ScrollEffect",0,()=>(0,r.jsx)(c.Canvas,{gl:{antialias:!1},dpr:[1,1.5],children:(0,r.jsxs)(a.Suspense,{fallback:null,children:[(0,r.jsxs)(l.ScrollControls,{pages:3,children:[(0,r.jsx)(l.Scroll,{children:(0,r.jsx)(m,{})}),(0,r.jsxs)(l.Scroll,{html:!0,children:[(0,r.jsx)("h1",{style:{position:"absolute",top:"60vh",left:"1em"},children:"First"}),(0,r.jsx)("p",{style:{position:"absolute",top:"120vh",left:"60vw"},children:"Second"}),(0,r.jsx)("h1",{style:{position:"absolute",top:"220vh",left:"10vw",fontSize:"25vw"},children:"TITLE"})]})]}),(0,r.jsx)(o,{})]})})],46983)}]);