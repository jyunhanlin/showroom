(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,77164,e=>{"use strict";e.s(["assetPath",0,"/showroom/nextjs-playground"])},9251,e=>{"use strict";var u=e.i(36734);e.s(["useLoader",()=>u.G])},70574,e=>{"use strict";var u=e.i(44501),t=e.i(55029),r=e.i(9251),l=e.i(1859),i=e.i(1685),a=e.i(21348),o=e.i(77164);let n=`
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
`;function s(){let e=(0,i.useRef)(1),t=(0,i.useRef)(),s=(0,r.useLoader)(a.TextureLoader,`${o.assetPath}/img/ripple-blend/ripple1.jpeg`),_=(0,r.useLoader)(a.TextureLoader,`${o.assetPath}/img/ripple-blend/ripple2.jpeg`),c=(0,i.useMemo)(()=>({u_tex_1:{value:null},u_tex_2:{value:null},u_duration:{value:2},u_time:{value:0},u_mouse:{value:{x:0,y:0}},u_resolution:{value:{x:0,y:0}}}),[]);return(0,i.useEffect)(()=>{t.current&&(c.u_tex_1.value=s,c.u_tex_2.value=_)},[t,s,_]),(0,l.useFrame)((e,u)=>{c.u_time.value<c.u_duration.value&&(c.u_time.value+=u)}),(0,u.jsxs)("mesh",{onClick:()=>{c.u_time.value=0,1===e.current?(c.u_tex_1.value=_,c.u_tex_2.value=s,e.current=2):(c.u_tex_1.value=s,c.u_tex_2.value=_,e.current=1)},children:[(0,u.jsx)("planeGeometry",{args:[10,7.5]}),(0,u.jsx)("shaderMaterial",{ref:t,uniforms:c,vertexShader:n,fragmentShader:v})]})}e.s(["RippleBlend",0,function(){return(0,u.jsx)(t.Canvas,{children:(0,u.jsx)(i.Suspense,{fallback:null,children:(0,u.jsx)(s,{})})})}])}]);