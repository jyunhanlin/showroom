(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,57436,e=>{"use strict";var r=e.i(36734);e.s(["useThree",()=>r.C])},71611,e=>{"use strict";function r(){return(r=Object.assign.bind()).apply(null,arguments)}e.s(["default",()=>r])},77164,e=>{"use strict";e.s(["assetPath",0,"/showroom/nextjs-playground"])},9251,e=>{"use strict";var r=e.i(36734);e.s(["useLoader",()=>r.G])},44720,e=>{"use strict";var r=e.i(36734);e.s(["extend",()=>r.e])},9991,e=>{"use strict";var r=e.i(21348);e.s(["shaderMaterial",0,function(e,t,a,s){var i;return(i=class extends r.ShaderMaterial{constructor(i){for(const s in super({vertexShader:t,fragmentShader:a,...i}),e)this.uniforms[s]=new r.Uniform(e[s]),Object.defineProperty(this,s,{get(){return this.uniforms[s].value},set(e){this.uniforms[s].value=e}});this.uniforms=r.UniformsUtils.clone(this.uniforms),null==s||s(this)}}).key=r.MathUtils.generateUUID(),i}])},73516,e=>{"use strict";var r=e.i(71611),t=e.i(1685),a=e.i(21348),s=e.i(44720),i=e.i(57436),o=e.i(9991),n=e.i(9251);let l=e=>e===Object(e)&&!Array.isArray(e)&&"function"!=typeof e;function c(e,r){let s=(0,i.useThree)(e=>e.gl),o=(0,n.useLoader)(a.TextureLoader,l(e)?Object.values(e):e);return(0,t.useLayoutEffect)(()=>{null==r||r(o)},[r]),(0,t.useEffect)(()=>{if("initTexture"in s){let e=[];Array.isArray(o)?e=o:o instanceof a.Texture?e=[o]:l(o)&&(e=Object.values(o)),e.forEach(e=>{e instanceof a.Texture&&s.initTexture(e)})}},[s,o]),(0,t.useMemo)(()=>{if(!l(e))return o;{let r={},t=0;for(let a in e)r[a]=o[t++];return r}},[e,o])}c.preload=e=>n.useLoader.preload(a.TextureLoader,e),c.clear=e=>n.useLoader.clear(a.TextureLoader,e);let u=parseInt(a.REVISION.replace(/\D+/g,"")),f=(0,o.shaderMaterial)({color:new a.Color("white"),scale:new a.Vector2(1,1),imageBounds:new a.Vector2(1,1),resolution:1024,map:null,zoom:1,radius:0,grayscale:0,opacity:1},`
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
`),m=t.forwardRef(({children:e,color:a,segments:o=1,scale:n=1,zoom:l=1,grayscale:c=0,opacity:u=1,radius:m=0,texture:v,toneMapped:d,transparent:g,side:h,...p},y)=>{(0,s.extend)({ImageMaterial:f});let x=t.useRef(null),w=(0,i.useThree)(e=>e.size),b=Array.isArray(n)?[n[0],n[1]]:[n,n],j=[v.image.width,v.image.height],M=Math.max(w.width,w.height);return t.useImperativeHandle(y,()=>x.current,[]),t.useLayoutEffect(()=>{x.current.geometry.parameters&&x.current.material.scale.set(b[0]*x.current.geometry.parameters.width,b[1]*x.current.geometry.parameters.height)},[b[0],b[1]]),t.createElement("mesh",(0,r.default)({ref:x,scale:Array.isArray(n)?[...n,1]:n},p),t.createElement("planeGeometry",{args:[1,1,o,o]}),t.createElement("imageMaterial",{color:a,map:v,zoom:l,grayscale:c,opacity:u,scale:b,imageBounds:j,resolution:M,radius:m,toneMapped:d,transparent:g,side:h,key:f.key}),e)}),v=t.forwardRef(({url:e,...a},s)=>{let i=c(e);return t.createElement(m,(0,r.default)({},a,{texture:i,ref:s}))}),d=t.forwardRef(({url:e,...a},s)=>t.createElement(m,(0,r.default)({},a,{ref:s}))),g=t.forwardRef((e,a)=>{if(e.url)return t.createElement(v,(0,r.default)({},e,{ref:a}));if(e.texture)return t.createElement(d,(0,r.default)({},e,{ref:a}));throw Error("<Image /> requires a url or texture")});e.s(["Image",0,g],73516)},64085,e=>{"use strict";var r=e.i(44501),t=e.i(77658),a=e.i(73516),s=e.i(55029),i=e.i(1859),o=e.i(57436),n=e.i(1685),l=e.i(21348),c=e.i(77164);let u=l.MathUtils.damp,f=[1,2,3,4,5,6,7,8,9,10,11,12,1,5,7,8,2,4,9,6].map(e=>`${c.assetPath}/img/scroll-effect-horizontal/${e}.jpg`);function m({index:e,position:s,scale:o,c=new l.Color,...v}){let d=(0,n.useRef)(null),g=(0,t.useScroll)(),[h,p]=(0,n.useState)(!1);return(0,i.useFrame)((r,t)=>{let a=Math.sin(g.range(e/f.length-.08,4/f.length)*Math.PI);d.current.material.scale[1]=d.current.scale.y=u(d.current.scale.y,4+a,8,t),d.current.material.scale[0]=d.current.scale.x=u(d.current.scale.x,o[0],6,t),d.current.material.grayscale=u(d.current.material.grayscale,h?0:Math.max(0,1-a),6,t),d.current.material.color?.lerp(c.set(h?"white":"#ccc"),h?.3:.1)}),(0,r.jsx)(a.Image,{ref:d,...v,position:s,scale:o,onPointerOver:()=>p(!0),onPointerOut:()=>p(!1)})}function v({w:e=.7,gap:a=.15}){let{width:s}=(0,o.useThree)(e=>e.viewport),i=e+a;return(0,r.jsx)(t.ScrollControls,{horizontal:!0,pages:(s-i+f.length*i)/s,children:(0,r.jsx)(t.Scroll,{children:f.map((t,a)=>(0,r.jsx)(m,{index:a,position:[a*i,0,0],scale:[e,4,1],url:t},a))})})}e.s(["ScrollEffectHorizontal",0,()=>(0,r.jsx)(s.Canvas,{gl:{antialias:!1},dpr:[1,1.5],children:(0,r.jsx)(n.Suspense,{fallback:null,children:(0,r.jsx)(v,{})})})])}]);