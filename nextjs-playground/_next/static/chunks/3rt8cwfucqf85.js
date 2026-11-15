(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,70574,e=>{"use strict";var u=e.i(6350),l=e.i(46282),t=e.i(56591),i=e.i(20023),r=e.i(38995),o=e.i(88177),a=e.i(77164);let n=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`,v=`
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
`;function s(){let e=(0,r.useRef)(1),l=(0,r.useRef)(),s=(0,t.f)(o.H5,`${a.f}/img/ripple-blend/ripple1.jpeg`),_=(0,t.f)(o.H5,`${a.f}/img/ripple-blend/ripple2.jpeg`),c=(0,r.useMemo)(()=>({u_tex_1:{value:null},u_tex_2:{value:null},u_duration:{value:2},u_time:{value:0},u_mouse:{value:{x:0,y:0}},u_resolution:{value:{x:0,y:0}}}),[]);return(0,r.useEffect)(()=>{l.current&&(c.u_tex_1.value=s,c.u_tex_2.value=_)},[l,s,_]),(0,i.f)((e,u)=>{c.u_time.value<c.u_duration.value&&(c.u_time.value+=u)}),(0,u.jsxs)("mesh",{onClick:()=>{c.u_time.value=0,1===e.current?(c.u_tex_1.value=_,c.u_tex_2.value=s,e.current=2):(c.u_tex_1.value=s,c.u_tex_2.value=_,e.current=1)},children:[(0,u.jsx)("planeGeometry",{args:[10,7.5]}),(0,u.jsx)("shaderMaterial",{ref:l,uniforms:c,vertexShader:n,fragmentShader:v})]})}e.s(["RippleBlend",0,function(){return(0,u.jsx)(l.f,{children:(0,u.jsx)(r.Suspense,{fallback:null,children:(0,u.jsx)(s,{})})})}])},77164,e=>{"use strict";e.i(70051),e.s(["f",0,"/showroom/nextjs-playground"])},56591,e=>{"use strict";var u=e.i(88766);e.s(["f",()=>u.H])}]);