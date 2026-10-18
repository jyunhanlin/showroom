(()=>{"use strict";(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,67187,e=>{var t=e.i(70010),o=e.i(21e3),n=e.i(6399),i=e.i(14516),a=e.i(8359),r=e.i(16366),s=Object.defineProperty,l=(e,t,o)=>{let n;return(n="symbol"!=typeof t?t+"":t)in e?s(e,n,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[n]=o,o};let c=(()=>{let e={uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new a.cE},up:{value:new a.cE(0,1,0)}},vertexShader:`
      uniform vec3 sunPosition;
      uniform float rayleigh;
      uniform float turbidity;
      uniform float mieCoefficient;
      uniform vec3 up;

      varying vec3 vWorldPosition;
      varying vec3 vSunDirection;
      varying float vSunfade;
      varying vec3 vBetaR;
      varying vec3 vBetaM;
      varying float vSunE;

      // constants for atmospheric scattering
      const float e = 2.71828182845904523536028747135266249775724709369995957;
      const float pi = 3.141592653589793238462643383279502884197169;

      // wavelength of used primaries, according to preetham
      const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
      // this pre-calcuation replaces older TotalRayleigh(vec3 lambda) function:
      // (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
      const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

      // mie stuff
      // K coefficient for the primaries
      const float v = 4.0;
      const vec3 K = vec3( 0.686, 0.678, 0.666 );
      // MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
      const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

      // earth shadow hack
      // cutoffAngle = pi / 1.95;
      const float cutoffAngle = 1.6110731556870734;
      const float steepness = 1.5;
      const float EE = 1000.0;

      float sunIntensity( float zenithAngleCos ) {
        zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
        return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
      }

      vec3 totalMie( float T ) {
        float c = ( 0.2 * T ) * 10E-18;
        return 0.434 * c * MieConst;
      }

      void main() {

        vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
        vWorldPosition = worldPosition.xyz;

        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        gl_Position.z = gl_Position.w; // set z to camera.far

        vSunDirection = normalize( sunPosition );

        vSunE = sunIntensity( dot( vSunDirection, up ) );

        vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

        float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

      // extinction (absorbtion + out scattering)
      // rayleigh coefficients
        vBetaR = totalRayleigh * rayleighCoefficient;

      // mie coefficients
        vBetaM = totalMie( turbidity ) * mieCoefficient;

      }
    `,fragmentShader:`
      varying vec3 vWorldPosition;
      varying vec3 vSunDirection;
      varying float vSunfade;
      varying vec3 vBetaR;
      varying vec3 vBetaM;
      varying float vSunE;

      uniform float mieDirectionalG;
      uniform vec3 up;

      const vec3 cameraPos = vec3( 0.0, 0.0, 0.0 );

      // constants for atmospheric scattering
      const float pi = 3.141592653589793238462643383279502884197169;

      const float n = 1.0003; // refractive index of air
      const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

      // optical length at zenith for molecules
      const float rayleighZenithLength = 8.4E3;
      const float mieZenithLength = 1.25E3;
      // 66 arc seconds -> degrees, and the cosine of that
      const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

      // 3.0 / ( 16.0 * pi )
      const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
      // 1.0 / ( 4.0 * pi )
      const float ONE_OVER_FOURPI = 0.07957747154594767;

      float rayleighPhase( float cosTheta ) {
        return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
      }

      float hgPhase( float cosTheta, float g ) {
        float g2 = pow( g, 2.0 );
        float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
        return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
      }

      void main() {

        vec3 direction = normalize( vWorldPosition - cameraPos );

      // optical length
      // cutoff angle at 90 to avoid singularity in next formula.
        float zenithAngle = acos( max( 0.0, dot( up, direction ) ) );
        float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
        float sR = rayleighZenithLength * inverse;
        float sM = mieZenithLength * inverse;

      // combined extinction factor
        vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

      // in scattering
        float cosTheta = dot( direction, vSunDirection );

        float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
        vec3 betaRTheta = vBetaR * rPhase;

        float mPhase = hgPhase( cosTheta, mieDirectionalG );
        vec3 betaMTheta = vBetaM * mPhase;

        vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
        Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );

      // nightsky
        float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
        float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
        vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
        vec3 L0 = vec3( 0.1 ) * Fex;

      // composition + solar disc
        float sundisk = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta );
        L0 += ( vSunE * 19000.0 * Fex ) * sundisk;

        vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

        vec3 retColor = pow( texColor, vec3( 1.0 / ( 1.2 + ( 1.2 * vSunfade ) ) ) );

        gl_FragColor = vec4( retColor, 1.0 );

      #include <tonemapping_fragment>
      #include <${r.f>=154?"colorspace_fragment":"encodings_fragment"}>

      }
    `},t=new a.Zg({name:"SkyShader",fragmentShader:e.fragmentShader,vertexShader:e.vertexShader,uniforms:a.SP.clone(e.uniforms),side:a.tw,depthWrite:!1});class o extends a.kE{constructor(){super(new a.kG(1,1,1),t)}}return l(o,"SkyShader",e),l(o,"material",t),o})();function f(e,t,o=new a.cE){let n=Math.PI*(e-.5),i=2*Math.PI*(t-.5);return o.x=Math.cos(i),o.y=Math.sin(n),o.z=Math.sin(i),o}let u=i.forwardRef(({inclination:e=.6,azimuth:t=.1,distance:o=1e3,mieCoefficient:r=.005,mieDirectionalG:s=.8,rayleigh:l=.5,turbidity:u=10,sunPosition:v=f(e,t),...h},m)=>{let g=i.useMemo(()=>new a.cE().setScalar(o),[o]),[d]=i.useState(()=>new c);return i.createElement("primitive",(0,n.f)({object:d,ref:m,"material-uniforms-mieCoefficient-value":r,"material-uniforms-mieDirectionalG-value":s,"material-uniforms-rayleigh-value":l,"material-uniforms-sunPosition-value":v,"material-uniforms-turbidity-value":u,scale:g},h))});var v=e.i(71215),h=e.i(94010),m=e.i(64622),g=e.i(77164);function d({...e}){let n=(0,o.n)(),{scene:r,nodes:s,animations:l}=(0,v.f)(`${g.f}/3d-model/LittlestTokyo-transformed.glb`),{actions:c}=function(e,t){let o=i.useRef(null),[n]=i.useState(()=>t?t instanceof a.t?{current:t}:t:o),[r]=i.useState(()=>new a.EV(void 0));i.useLayoutEffect(()=>{t&&(n.current=t instanceof a.t?t:t.current),r._root=n.current});let s=i.useRef({}),l=i.useMemo(()=>{let t={};return e.forEach(e=>Object.defineProperty(t,e.name,{enumerable:!0,get(){if(n.current)return s.current[e.name]||(s.current[e.name]=r.clipAction(e,n.current))},configurable:!0})),{ref:n,clips:e,actions:t,names:e.map(e=>e.name),mixer:r}},[e]);return(0,h.f)((e,t)=>r.update(t)),i.useEffect(()=>{let e=n.current;return()=>{s.current={},r.stopAllAction(),Object.values(l.actions).forEach(t=>{e&&r.uncacheAction(t,e)})}},[e]),l}(l,r);return(0,i.useLayoutEffect)(()=>Object.values(s).forEach(e=>e.receiveShadow=e.castShadow=!0)),(0,i.useEffect)(()=>{c&&"Take 001"in c&&c["Take 001"]?.play()},[c]),(0,h.f)((e,t)=>{let o=c["Take 001"],i=1-n.offset;o&&(o.time=a.rB.damp(o.time,o.getClip().duration/2*i,100,t)),e.camera.position.set(-10*Math.sin(i),5*Math.atan(i*Math.PI*2),-10*Math.cos(i*Math.PI/3)),e.camera.lookAt(0,0,0)}),(0,t.jsx)("primitive",{object:r,...e})}v.f.preload(`${g.f}/3d-model/LittlestTokyo-transformed.glb`),e.s(["LittlestTokyo",0,()=>(0,t.jsxs)(m.f,{dpr:[1,2],shadows:!0,camera:{position:[0,0,10],near:.1,far:1e3},children:[(0,t.jsx)("ambientLight",{intensity:.03}),(0,t.jsx)("fog",{attach:"fog",args:["#ff5020",5,18]}),(0,t.jsx)("spotLight",{angle:.14,color:"#ffd0d0",penumbra:1,position:[25,50,-20],"shadow-mapSize":[2048,2048],"shadow-bias":-1e-4,castShadow:!0}),(0,t.jsx)(u,{sunPosition:[2,.4,10]}),(0,t.jsx)(i.Suspense,{fallback:null,children:(0,t.jsx)(o.g,{pages:3,children:(0,t.jsx)(d,{scale:.02,position:[0,2.5,0]})})})]})],67187)},77164,e=>{e.i(4339),e.s(["f",0,"/showroom/nextjs-playground"])},6399,e=>{function t(){return(t=Object.assign.bind()).apply(null,arguments)}e.s(["f",()=>t])},17867,e=>{var t=e.i(14487);e.s(["f",()=>t.D])},53590,e=>{var t=e.i(14487);e.s(["f",()=>t.H])},16366,e=>{let t=parseInt(e.i(8359).Tu.replace(/\D+/g,""));e.s(["f",0,t])},53669,e=>{var t=e.i(8359);e.s(["Z",0,function(e,o=Math.PI/3){let n=Math.cos(o),i=(1+1e-10)*100,a=[new t.cE,new t.cE,new t.cE],r=new t.cE,s=new t.cE,l=new t.cE,c=new t.cE;function f(e){let t=~~(e.x*i),o=~~(e.y*i),n=~~(e.z*i);return`${t},${o},${n}`}let u=e.index?e.toNonIndexed():e,v=u.attributes.position,h={};for(let e=0,o=v.count/3;e<o;e++){let o=3*e,n=a[0].fromBufferAttribute(v,o+0),i=a[1].fromBufferAttribute(v,o+1),l=a[2].fromBufferAttribute(v,o+2);r.subVectors(l,i),s.subVectors(n,i);let c=new t.cE().crossVectors(r,s).normalize();for(let e=0;e<3;e++){let t=f(a[e]);t in h||(h[t]=[]),h[t].push(c)}}let m=new Float32Array(3*v.count),g=new t.f5(m,3,!1);for(let e=0,t=v.count/3;e<t;e++){let t=3*e,o=a[0].fromBufferAttribute(v,t+0),i=a[1].fromBufferAttribute(v,t+1),u=a[2].fromBufferAttribute(v,t+2);r.subVectors(u,i),s.subVectors(o,i),l.crossVectors(r,s).normalize();for(let e=0;e<3;e++){let o=h[f(a[e])];c.set(0,0,0);for(let e=0,t=o.length;e<t;e++){let t=o[e];l.dot(t)>n&&c.add(t)}c.normalize(),g.setXYZ(t+e,c.x,c.y,c.z)}}return u.setAttribute("normal",g),u},"v",0,function(e,o){if(o===t.pV)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),e;if(o!==t.wD&&o!==t.ol)return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",o),e;{let n=e.getIndex();if(null===n){let t=[],o=e.getAttribute("position");if(void 0===o)return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),e;for(let e=0;e<o.count;e++)t.push(e);e.setIndex(t),n=e.getIndex()}let i=n.count-2,a=[];if(n)if(o===t.wD)for(let e=1;e<=i;e++)a.push(n.getX(0)),a.push(n.getX(e)),a.push(n.getX(e+1));else for(let e=0;e<i;e++)e%2==0?(a.push(n.getX(e)),a.push(n.getX(e+1)),a.push(n.getX(e+2))):(a.push(n.getX(e+2)),a.push(n.getX(e+1)),a.push(n.getX(e)));a.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=e.clone();return r.setIndex(a),r.clearGroups(),r}}],53669)}])})();