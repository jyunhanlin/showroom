(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[338],{9137:function(e,r,n){"use strict";n.d(r,{g:function(){return u}});var t=n(2212);function u(e,r,n,u){return class extends t.ShaderMaterial{constructor(){const o=Object.entries(e);super({uniforms:o.reduce(((e,[r,n])=>({...e,...t.UniformsUtils.clone({[r]:{value:n}})})),{}),vertexShader:r,fragmentShader:n}),o.forEach((([e])=>Object.defineProperty(this,e,{get:()=>this.uniforms[e].value,set:r=>this.uniforms[e].value=r}))),u&&u(this)}}}},5647:function(e,r,n){"use strict";n.d(r,{W:function(){return l}});var t=n(2809),u=n(980),o=n(8017),i=n(5893);function c(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}var l=function(e){var r=(0,u.useColorMode)().colorMode;return(0,i.jsx)(o.xu,function(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?c(Object(n),!0).forEach((function(r){(0,t.Z)(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}({bg:{light:"gray.50",dark:"gray.700"}[r],color:{light:"black",dark:"white"}[r]},e))}},5244:function(e,r,n){"use strict";n.r(r),n.d(r,{default:function(){return _}});var t=n(5647),u=n(9137),o=n(5648),i=n(7294),c=n(2212),l=n(5893),a=(0,u.g)({u_tex_1:null,u_tex_2:null,u_duration:2,u_time:0},"\n  varying vec2 vUv;\n  void main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n  }\n  ","\n  #define PI 3.141592653589\n  #define PI2 6.28318530718\n\n  uniform vec2 u_mouse;\n  uniform vec2 u_resolution;\n  uniform float u_time;\n  uniform float u_duration;\n  uniform sampler2D u_tex_1;\n  uniform sampler2D u_tex_2;\n\n  varying vec2 vUv;\n\n  void main (void)\n  {\n    vec2 p = -1.0 + 2.0 * vUv;\n    float len = length(p);\n    vec2 ripple = vUv + (p/len)*cos(len*12.0-u_time*4.0)*0.03;\n    float delta = u_time/u_duration;\n    vec2 uv = mix(ripple, vUv, delta);\n    vec3 col1 = texture2D(u_tex_1, uv).rgb;\n    vec3 col2 = texture2D(u_tex_2, uv).rgb;\n    float fade = smoothstep(delta*1.4, delta*2.5, len);\n    vec3 color = mix(col2, col1, fade);\n    gl_FragColor = vec4(color, 1.0);\n  }\n  ");(0,o.l7)({RippleImageMaterial:a});var s="/showroom/r3f-playground";function f(){var e=(0,i.useRef)(1),r=(0,i.useRef)(),n=(0,o.U2)(c.TextureLoader,"".concat(s,"/ripple1.jpeg")),t=(0,o.U2)(c.TextureLoader,"".concat(s,"/ripple2.jpeg"));return(0,i.useEffect)((function(){r.current&&(r.current.u_tex_1=n,r.current.u_tex_2=t)}),[r,n,t]),(0,o.xQ)((function(e,n){r.current.u_time<r.current.u_duration&&(r.current.u_time+=n)})),(0,l.jsxs)("mesh",{onClick:function(){r.current.u_time=0,1===e.current?(r.current.u_tex_1=t,r.current.u_tex_2=n,e.current=2):(r.current.u_tex_1=n,r.current.u_tex_2=t,e.current=1)},children:[(0,l.jsx)("planeGeometry",{args:[10,7.5]}),(0,l.jsx)("rippleImageMaterial",{ref:r})]})}function v(){return(0,l.jsx)(o.Xz,{children:(0,l.jsx)(i.Suspense,{fallback:null,children:(0,l.jsx)(f,{})})})}var _=function(){return(0,l.jsx)(t.W,{height:"100%",children:(0,l.jsx)(v,{})})}},2588:function(e,r,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/ripple-blend",function(){return n(5244)}])}},function(e){e.O(0,[737,328,648,774,888,179],(function(){return r=2588,e(e.s=r);var r}));var r=e.O();_N_E=r}]);