(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,9251,e=>{"use strict";var t=e.i(36734);e.s(["useLoader",()=>t.G])},77164,e=>{"use strict";e.s(["assetPath",0,"/showroom/nextjs-playground"])},44720,e=>{"use strict";var t=e.i(36734);e.s(["extend",()=>t.e])},9991,e=>{"use strict";var t=e.i(21348);e.s(["shaderMaterial",0,function(e,r,u,i){var n;return(n=class extends t.ShaderMaterial{constructor(n){for(const i in super({vertexShader:r,fragmentShader:u,...n}),e)this.uniforms[i]=new t.Uniform(e[i]),Object.defineProperty(this,i,{get(){return this.uniforms[i].value},set(e){this.uniforms[i].value=e}});this.uniforms=t.UniformsUtils.clone(this.uniforms),null==i||i(this)}}).key=t.MathUtils.generateUUID(),n}])},68125,e=>{"use strict";var t=e.i(44501),r=e.i(9991),u=e.i(55029),i=e.i(9251),n=e.i(1859),s=e.i(44720),o=e.i(1685),l=e.i(21348),a=e.i(77164);let c=(0,r.shaderMaterial)({u_tex_1:null,u_tex_2:null,u_duration:2,u_time:0},`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
  `,`
  #define PI 3.141592653589
  #define PI2 6.28318530718

  uniform vec2 u_mouse;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_duration;
  uniform sampler2D u_tex_1;
  uniform sampler2D u_tex_2;

  varying vec2 vUv;

  void main (void)
  {
    vec2 p = -1.0 + 2.0 * vUv;
    float len = length(p);
    vec2 ripple = vUv + (p/len)*cos(len*12.0-u_time*4.0)*0.03;
    float delta = u_time/u_duration;
    vec2 uv = mix(ripple, vUv, delta);
    vec3 col1 = texture2D(u_tex_1, uv).rgb;
    vec3 col2 = texture2D(u_tex_2, uv).rgb;
    float fade = smoothstep(delta*1.4, delta*2.5, len);
    vec3 color = mix(col2, col1, fade);
    gl_FragColor = vec4(color, 1.0);
  }
  `);function v(){let e=(0,o.useRef)(1),r=(0,o.useRef)(null),u=(0,i.useLoader)(l.TextureLoader,`${a.assetPath}/img/ripple-blend/ripple1.jpeg`),s=(0,i.useLoader)(l.TextureLoader,`${a.assetPath}/img/ripple-blend/ripple2.jpeg`);return(0,o.useEffect)(()=>{r.current&&(r.current.u_tex_1=u,r.current.u_tex_2=s)},[r,u,s]),(0,n.useFrame)((e,t)=>{r.current.u_time<r.current.u_duration&&(r.current.u_time+=t)}),(0,t.jsxs)("mesh",{onClick:()=>{r.current.u_time=0,1===e.current?(r.current.u_tex_1=s,r.current.u_tex_2=u,e.current=2):(r.current.u_tex_1=u,r.current.u_tex_2=s,e.current=1)},children:[(0,t.jsx)("planeGeometry",{args:[10,7.5]}),(0,t.jsx)("rippleImageMaterial",{ref:r})]})}(0,s.extend)({RippleImageMaterial:c}),e.s(["RippleBlend",0,function(){return(0,t.jsx)(u.Canvas,{children:(0,t.jsx)(o.Suspense,{fallback:null,children:(0,t.jsx)(v,{})})})}])}]);