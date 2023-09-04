(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[39],{1498:function(e,r,t){"use strict";t.d(r,{E:function(){return g}});var a=t(1667),n=t(1125),c=t(9091),o=t(8336),i=t(6539);let l=e=>e===Object(e)&&!Array.isArray(e)&&"function"!=typeof e;function s(e,r){let t=(0,o.z)(e=>e.gl),a=(0,o.D)(c.TextureLoader,l(e)?Object.values(e):e);if((0,n.useLayoutEffect)(()=>{null==r||r(a)},[r]),(0,n.useEffect)(()=>{let e=Array.isArray(a)?a:[a];e.forEach(t.initTexture)},[t,a]),!l(e))return a;{let r=Object.keys(e),t={};return r.forEach(e=>Object.assign(t,{[e]:a[r.indexOf(e)]})),t}}s.preload=e=>o.D.preload(c.TextureLoader,e),s.clear=e=>o.D.clear(c.TextureLoader,e);let u=(0,i.g)({color:new c.Color("white"),scale:[1,1],imageBounds:[1,1],map:null,zoom:1,grayscale:0,opacity:1},`
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
    #include <${parseInt(c.REVISION.replace(/\D+/g,""))>=154?"colorspace_fragment":"encodings_fragment"}>
  }
`),f=n.forwardRef(({children:e,color:r,segments:t=1,scale:c=1,zoom:i=1,grayscale:l=0,opacity:s=1,texture:f,toneMapped:m,transparent:v,...g},d)=>{(0,o.e)({ImageMaterial:u});let y=Array.isArray(c)?[c[0],c[1]]:[c,c],p=[f.image.width,f.image.height];return n.createElement("mesh",(0,a.Z)({ref:d,scale:Array.isArray(c)?[...c,1]:c},g),n.createElement("planeGeometry",{args:[1,1,t,t]}),n.createElement("imageMaterial",{color:r,map:f,zoom:i,grayscale:l,opacity:s,scale:y,imageBounds:p,toneMapped:m,transparent:v}),e)}),m=n.forwardRef(({url:e,...r},t)=>{let c=s(e);return n.createElement(f,(0,a.Z)({},r,{texture:c,ref:t}))}),v=n.forwardRef(({url:e,...r},t)=>n.createElement(f,(0,a.Z)({},r,{ref:t}))),g=n.forwardRef((e,r)=>{if(e.url)return n.createElement(m,(0,a.Z)({},e,{ref:r}));if(e.texture)return n.createElement(v,(0,a.Z)({},e,{ref:r}));throw Error("<Image /> requires a url or texture")})},6539:function(e,r,t){"use strict";t.d(r,{g:function(){return n}});var a=t(9091);function n(e,r,t,n){let c=class extends a.ShaderMaterial{constructor(c={}){let o=Object.entries(e);super({uniforms:o.reduce((e,[r,t])=>{let n=a.UniformsUtils.clone({[r]:{value:t}});return{...e,...n}},{}),vertexShader:r,fragmentShader:t}),this.key="",o.forEach(([e])=>Object.defineProperty(this,e,{get:()=>this.uniforms[e].value,set:r=>this.uniforms[e].value=r})),Object.assign(this,c),n&&n(this)}};return c.key=a.MathUtils.generateUUID(),c}},7454:function(e,r,t){Promise.resolve().then(t.bind(t,7808)),Promise.resolve().then(t.bind(t,1615))},7808:function(e,r,t){"use strict";t.r(r),t.d(r,{Container:function(){return o}});var a=t(9816),n=t(8712),c=t(7435);let o=e=>{let{colorMode:r}=(0,n.If)();return(0,a.jsx)(c.xu,{bg:{light:"gray.50",dark:"gray.700"}[r],color:{light:"black",dark:"white"}[r],...e})}},1615:function(e,r,t){"use strict";t.r(r),t.d(r,{ScrollEffectHorizontal:function(){return d}});var a=t(9816),n=t(1701),c=t(1498),o=t(8336),i=t(7420),l=t(1125),s=t(9091),u=t(4983);let f=s.MathUtils.damp,m=[1,2,3,4,5,6,7,8,9,10,11,12,1,5,7,8,2,4,9,6].map(e=>"".concat(u.u,"/img/scroll-effect-horizontal/").concat(e,".jpg"));function v(e){let{index:r,position:t,scale:i,c:u=new s.Color,...v}=e,g=(0,l.useRef)(null),d=(0,n.vO)(),[y,p]=(0,l.useState)(!1);return(0,o.A)((e,t)=>{var a;let n=Math.sin(d.range(r/m.length-.08,4/m.length)*Math.PI);g.current.material.scale[1]=g.current.scale.y=f(g.current.scale.y,4+n,8,t),g.current.material.scale[0]=g.current.scale.x=f(g.current.scale.x,i[0],6,t),g.current.material.grayscale=f(g.current.material.grayscale,y?0:Math.max(0,1-n),6,t),null===(a=g.current.material.color)||void 0===a||a.lerp(u.set(y?"white":"#ccc"),y?.3:.1)}),(0,a.jsx)(c.E,{ref:g,...v,position:t,scale:i,onPointerOver:()=>p(!0),onPointerOut:()=>p(!1)})}function g(e){let{w:r=.7,gap:t=.15}=e,{width:c}=(0,o.z)(e=>e.viewport),i=r+t;return(0,a.jsx)(n.Fq,{horizontal:!0,pages:(c-i+m.length*i)/c,children:(0,a.jsx)(n.Xs,{children:m.map((e,t)=>(0,a.jsx)(v,{index:t,position:[t*i,0,0],scale:[r,4,1],url:e},t))})})}let d=()=>(0,a.jsx)(i.Xz,{gl:{antialias:!1},dpr:[1,1.5],children:(0,a.jsx)(l.Suspense,{fallback:null,children:(0,a.jsx)(g,{})})})},4983:function(e,r,t){"use strict";t.d(r,{u:function(){return a}});let a="/showroom/nextjs-playground"}},function(e){e.O(0,[89,146,643,701,414,934,744],function(){return e(e.s=7454)}),_N_E=e.O()}]);