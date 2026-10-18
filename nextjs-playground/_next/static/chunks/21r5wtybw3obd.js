(()=>{"use strict";(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,68125,e=>{var r=e.i(70010),t=e.i(33715),u=e.i(64622),i=e.i(53590),n=e.i(94010),l=e.i(55493),o=e.i(14516),c=e.i(8359),s=e.i(77164);let f=(0,t.f)({u_tex_1:null,u_tex_2:null,u_duration:2,u_time:0},`
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
  `);function a(){let e=(0,o.useRef)(1),t=(0,o.useRef)(null),u=(0,i.f)(c.H5,`${s.f}/img/ripple-blend/ripple1.jpeg`),l=(0,i.f)(c.H5,`${s.f}/img/ripple-blend/ripple2.jpeg`);return(0,o.useEffect)(()=>{t.current&&(t.current.u_tex_1=u,t.current.u_tex_2=l)},[t,u,l]),(0,n.f)((e,r)=>{t.current.u_time<t.current.u_duration&&(t.current.u_time+=r)}),(0,r.jsxs)("mesh",{onClick:()=>{t.current.u_time=0,1===e.current?(t.current.u_tex_1=l,t.current.u_tex_2=u,e.current=2):(t.current.u_tex_1=u,t.current.u_tex_2=l,e.current=1)},children:[(0,r.jsx)("planeGeometry",{args:[10,7.5]}),(0,r.jsx)("rippleImageMaterial",{ref:t})]})}(0,l.f)({RippleImageMaterial:f}),e.s(["RippleBlend",0,function(){return(0,r.jsx)(u.f,{children:(0,r.jsx)(o.Suspense,{fallback:null,children:(0,r.jsx)(a,{})})})}])},77164,e=>{e.i(4339),e.s(["f",0,"/showroom/nextjs-playground"])},33715,e=>{var r=e.i(8359);e.s(["f",0,function(e,t,u,i){var n;return(n=class extends r.Zg{constructor(n){for(let i in super({vertexShader:t,fragmentShader:u,...n}),e)this.uniforms[i]=new r.MY(e[i]),Object.defineProperty(this,i,{get(){return this.uniforms[i].value},set(e){this.uniforms[i].value=e}});this.uniforms=r.SP.clone(this.uniforms),null==i||i(this)}}).key=r.rB.generateUUID(),n}])},53590,e=>{var r=e.i(14487);e.s(["f",()=>r.H])},55493,e=>{var r=e.i(14487);e.s(["f",()=>r.e])}])})();