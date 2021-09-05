(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[877],{5647:function(e,n,r){"use strict";r.d(n,{W:function(){return a}});var t=r(2809),u=r(980),o=r(8017),i=r(5893);function l(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}var a=function(e){var n=(0,u.useColorMode)().colorMode;return(0,i.jsx)(o.xu,function(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?l(Object(r),!0).forEach((function(n){(0,t.Z)(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}({bg:{light:"gray.50",dark:"gray.700"}[n],color:{light:"black",dark:"white"}[n]},e))}},9889:function(e,n,r){"use strict";r.r(n),r.d(n,{default:function(){return f}});var t=r(5647),u=r(3260),o=r(7294),i=r(2212),l=r(5893),a="/showroom/r3f-playground";function c(){var e=(0,o.useRef)(1),n=(0,o.useRef)(),r=(0,u.U2)(i.TextureLoader,"".concat(a,"/ripple1.jpeg")),t=(0,u.U2)(i.TextureLoader,"".concat(a,"/ripple2.jpeg")),c=(0,o.useMemo)((function(){return{u_tex_1:{value:null},u_tex_2:{value:null},u_duration:{value:2},u_time:{value:0},u_mouse:{value:{x:0,y:0}},u_resolution:{value:{x:0,y:0}}}}),[]);return(0,o.useEffect)((function(){n.current&&(c.u_tex_1.value=r,c.u_tex_2.value=t)}),[n,r,t]),(0,u.xQ)((function(e,n){c.u_time.value<c.u_duration.value&&(c.u_time.value+=n)})),(0,l.jsxs)("mesh",{onClick:function(){c.u_time.value=0,1===e.current?(c.u_tex_1.value=t,c.u_tex_2.value=r,e.current=2):(c.u_tex_1.value=r,c.u_tex_2.value=t,e.current=1)},children:[(0,l.jsx)("planeGeometry",{args:[10,7.5]}),(0,l.jsx)("shaderMaterial",{ref:n,args:{uniforms:c,vertexShader:"\nvarying vec2 vUv;\nvoid main() {\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}\n",fragmentShader:"\n#define PI 3.141592653589\n#define PI2 6.28318530718\n\nuniform vec2 u_mouse;\nuniform vec2 u_resolution;\nuniform float u_time;\nuniform float u_duration;\nuniform sampler2D u_tex_1;\nuniform sampler2D u_tex_2;\n\nvarying vec2 vUv;\n\nvoid main (void)\n{\n  vec2 p = -1.0 + 2.0 * vUv;\n  float len = length(p);\n  vec2 ripple = vUv + (p/len)*cos(len*12.0-u_time*4.0)*0.03;\n  float delta = u_time/u_duration;\n  vec2 uv = mix(ripple, vUv, delta);\n  vec3 col1 = texture2D(u_tex_1, uv).rgb;\n  vec3 col2 = texture2D(u_tex_2, uv).rgb;\n  float fade = smoothstep(delta*1.4, delta*2.5, len);\n  vec3 color = mix(col2, col1, fade);\n  gl_FragColor = vec4(color, 1.0);\n}\n"}})]})}function v(){return(0,l.jsx)(u.Xz,{children:(0,l.jsx)(o.Suspense,{fallback:null,children:(0,l.jsx)(c,{})})})}var f=function(){return(0,l.jsx)(t.W,{height:"100%",children:(0,l.jsx)(v,{})})}},4122:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/ripple-blend2",function(){return r(9889)}])}},function(e){e.O(0,[737,328,260,774,888,179],(function(){return n=4122,e(e.s=n);var n}));var n=e.O();_N_E=n}]);