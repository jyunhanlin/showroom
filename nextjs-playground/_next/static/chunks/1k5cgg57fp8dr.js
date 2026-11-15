(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,64085,e=>{"use strict";var r=e.i(6350),t=e.i(5524),a=e.i(71880),i=e.i(46282),s=e.i(20023),o=e.i(87976),n=e.i(38995),c=e.i(88177),l=e.i(77164);let u=c.rB.damp,f=[1,2,3,4,5,6,7,8,9,10,11,12,1,5,7,8,2,4,9,6].map(e=>`${l.f}/img/scroll-effect-horizontal/${e}.jpg`);function m({index:e,position:i,scale:o,c:l=new c.Es,...v}){let g=(0,n.useRef)(null),p=(0,t.n)(),[y,d]=(0,n.useState)(!1);return(0,s.f)((r,t)=>{let a=Math.sin(p.range(e/f.length-.08,4/f.length)*Math.PI);g.current.material.scale[1]=g.current.scale.y=u(g.current.scale.y,4+a,8,t),g.current.material.scale[0]=g.current.scale.x=u(g.current.scale.x,o[0],6,t),g.current.material.grayscale=u(g.current.material.grayscale,y?0:Math.max(0,1-a),6,t),g.current.material.color?.lerp(l.set(y?"white":"#ccc"),y?.3:.1)}),(0,r.jsx)(a.f,{ref:g,...v,position:i,scale:o,onPointerOver:()=>d(!0),onPointerOut:()=>d(!1)})}function v({w:e=.7,gap:a=.15}){let{width:i}=(0,o.f)(e=>e.viewport),s=e+a;return(0,r.jsx)(t.g,{horizontal:!0,pages:(i-s+f.length*s)/i,children:(0,r.jsx)(t.A,{children:f.map((t,a)=>(0,r.jsx)(m,{index:a,position:[a*s,0,0],scale:[e,4,1],url:t},a))})})}e.s(["ScrollEffectHorizontal",0,()=>(0,r.jsx)(i.f,{gl:{antialias:!1},dpr:[1,1.5],children:(0,r.jsx)(n.Suspense,{fallback:null,children:(0,r.jsx)(v,{})})})])},77164,e=>{"use strict";e.i(70051),e.s(["f",0,"/showroom/nextjs-playground"])},6399,e=>{"use strict";function r(){return(r=Object.assign.bind()).apply(null,arguments)}e.s(["f",()=>r])},71880,e=>{"use strict";var r=e.i(6399),t=e.i(38995),a=e.i(88177),i=e.i(41124),s=e.i(87976),o=e.i(52741),n=e.i(56591);let c=e=>e===Object(e)&&!Array.isArray(e)&&"function"!=typeof e;function l(e,r){let i=(0,s.f)(e=>e.gl),o=(0,n.f)(a.H5,c(e)?Object.values(e):e);return(0,t.useLayoutEffect)(()=>{null==r||r(o)},[r]),(0,t.useEffect)(()=>{if("initTexture"in i){let e=[];Array.isArray(o)?e=o:o instanceof a.Sk?e=[o]:c(o)&&(e=Object.values(o)),e.forEach(e=>{e instanceof a.Sk&&i.initTexture(e)})}},[i,o]),(0,t.useMemo)(()=>{if(!c(e))return o;{let r={},t=0;for(let a in e)r[a]=o[t++];return r}},[e,o])}l.preload=e=>n.f.preload(a.H5,e),l.clear=e=>n.f.clear(a.H5,e);let u=parseInt(a.Tu.replace(/\D+/g,"")),f=(0,o.f)({color:new a.Es("white"),scale:new a.wq(1,1),imageBounds:new a.wq(1,1),resolution:1024,map:null,zoom:1,radius:0,grayscale:0,opacity:1},`
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
`),m=t.forwardRef(({children:e,color:a,segments:o=1,scale:n=1,zoom:c=1,grayscale:l=0,opacity:u=1,radius:m=0,texture:v,toneMapped:g,transparent:p,side:y,...d},h)=>{(0,i.f)({ImageMaterial:f});let x=t.useRef(null),w=(0,s.f)(e=>e.size),b=Array.isArray(n)?[n[0],n[1]]:[n,n],j=[v.image.width,v.image.height],z=Math.max(w.width,w.height);return t.useImperativeHandle(h,()=>x.current,[]),t.useLayoutEffect(()=>{x.current.geometry.parameters&&x.current.material.scale.set(b[0]*x.current.geometry.parameters.width,b[1]*x.current.geometry.parameters.height)},[b[0],b[1]]),t.createElement("mesh",(0,r.f)({ref:x,scale:Array.isArray(n)?[...n,1]:n},d),t.createElement("planeGeometry",{args:[1,1,o,o]}),t.createElement("imageMaterial",{color:a,map:v,zoom:c,grayscale:l,opacity:u,scale:b,imageBounds:j,resolution:z,radius:m,toneMapped:g,transparent:p,side:y,key:f.key}),e)}),v=t.forwardRef(({url:e,...a},i)=>{let s=l(e);return t.createElement(m,(0,r.f)({},a,{texture:s,ref:i}))}),g=t.forwardRef(({url:e,...a},i)=>t.createElement(m,(0,r.f)({},a,{ref:i}))),p=t.forwardRef((e,a)=>{if(e.url)return t.createElement(v,(0,r.f)({},e,{ref:a}));if(e.texture)return t.createElement(g,(0,r.f)({},e,{ref:a}));throw Error("<Image /> requires a url or texture")});e.s(["f",0,p],71880)},52741,e=>{"use strict";var r=e.i(88177);e.s(["f",0,function(e,t,a,i){var s;return(s=class extends r.Zg{constructor(s){for(let i in super({vertexShader:t,fragmentShader:a,...s}),e)this.uniforms[i]=new r.MY(e[i]),Object.defineProperty(this,i,{get(){return this.uniforms[i].value},set(e){this.uniforms[i].value=e}});this.uniforms=r.SP.clone(this.uniforms),null==i||i(this)}}).key=r.rB.generateUUID(),s}])},87976,e=>{"use strict";var r=e.i(88766);e.s(["f",()=>r.D])},56591,e=>{"use strict";var r=e.i(88766);e.s(["f",()=>r.H])},41124,e=>{"use strict";var r=e.i(88766);e.s(["f",()=>r.e])}]);