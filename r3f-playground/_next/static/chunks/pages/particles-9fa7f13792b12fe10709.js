(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[129],{8129:function(t,r,e){"use strict";e.d(r,{W:function(){return s}});var n=e(2809),o=e(980),c=e(8017),a=e(5893);function i(t,r){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable}))),e.push.apply(e,n)}return e}var s=function(t){var r=(0,o.useColorMode)().colorMode;return(0,a.jsx)(c.xu,function(t){for(var r=1;r<arguments.length;r++){var e=null!=arguments[r]?arguments[r]:{};r%2?i(Object(e),!0).forEach((function(r){(0,n.Z)(t,r,e[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):i(Object(e)).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(e,r))}))}return t}({bg:{light:"gray.50",dark:"gray.700"}[r],color:{light:"black",dark:"white"}[r]},t))}},6061:function(t,r,e){"use strict";e.r(r),e.d(r,{default:function(){return h}});var n=e(3260),o=e(7294),c=e(8129),a=e(2212),i=e(5893),s=1e3,u=function(t){var r=t.mouse,e=(0,o.useRef)(),c=(0,o.useRef)(),u=(0,n.Ky)(),h=u.size,f=u.viewport,d=h.width/f.width,l=(0,o.useMemo)((function(){return new a.Object3D}),[]),p=(0,o.useMemo)((function(){for(var t=[],r=0;r<s;r++){var e=100*Math.random(),n=20+100*Math.random(),o=.01+Math.random()/200,c=100*Math.random()-50,a=100*Math.random()-50,i=100*Math.random()-50;t.push({t:e,factor:n,speed:o,xFactor:c,yFactor:a,zFactor:i,mx:0,my:0})}return t}),[s]);return(0,n.xQ)((function(){c.current&&c.current.position.set(r[0]/d,-r[1]/d,0),p.forEach((function(t,n){var o=t.factor,c=t.speed,a=t.xFactor,i=t.yFactor,s=t.zFactor,u=t.t;u=t.t+=c/2;var h=Math.cos(u)+Math.sin(1*u)/10,f=Math.sin(u)+Math.cos(2*u)/10,d=Math.cos(u);t.mx+=.01*(r[0]-t.mx),t.my+=.01*(-1*r[1]-t.my),l.position.set(t.mx/10*h+a+Math.cos(u/10*o)+Math.sin(1*u)*o/10,t.my/10*f+i+Math.sin(u/10*o)+Math.cos(2*u)*o/10,t.my/10*f+s+Math.cos(u/10*o)+Math.sin(3*u)*o/10),l.scale.set(d,d,d),l.rotation.set(5*d,5*d,5*d),l.updateMatrix(),e.current.setMatrixAt(n,l.matrix)})),e.current.instanceMatrix.needsUpdate=!0})),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("pointLight",{ref:c,distance:40,intensity:8,color:"lightblue"}),(0,i.jsxs)("instancedMesh",{ref:e,args:[null,null,s],children:[(0,i.jsx)("dodecahedronBufferGeometry",{args:[.2,0]}),(0,i.jsx)("meshPhongMaterial",{color:"#050505"})]})]})},h=function(){var t=(0,o.useRef)([0,0]),r=(0,o.useCallback)((function(r){var e=r.clientX,n=r.clientY;return t.current=[e-window.innerWidth/2,n-window.innerHeight/2]}),[]);return(0,i.jsx)(c.W,{height:"100%",children:(0,i.jsx)(n.Xz,{onMouseMove:r,children:(0,i.jsx)(u,{mouse:t.current})})})}},2021:function(t,r,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/particles",function(){return e(6061)}])}},function(t){t.O(0,[737,328,260,774,888,179],(function(){return r=2021,t(t.s=r);var r}));var r=t.O();_N_E=r}]);