(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[684],{2633:function(e,t,o){Promise.resolve().then(o.bind(o,4198)),Promise.resolve().then(o.bind(o,8404))},4198:function(e,t,o){"use strict";o.r(t),o.d(t,{Container:function(){return r}});var a=o(2771),i=o(8712),n=o(7435);let r=e=>{let{colorMode:t}=(0,i.If)();return(0,a.jsx)(n.xu,{bg:{light:"gray.50",dark:"gray.700"}[t],color:{light:"black",dark:"white"}[t],...e})}},8404:function(e,t,o){"use strict";o.r(t),o.d(t,{LittlestTokyo:function(){return x}});var a=o(2771),i=o(6170),n=o(9492),r=o(5754),c=o(207),s=o(6227),l=o(1667),f=Object.defineProperty,u=(e,t,o)=>t in e?f(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,v=(e,t,o)=>(u(e,"symbol"!=typeof t?t+"":t,o),o);let h={uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new c.Vector3},up:{value:new c.Vector3(0,1,0)}},vertexShader:`
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
      #include <encodings_fragment>

      }
    `},m=new c.ShaderMaterial({name:"SkyShader",fragmentShader:h.fragmentShader,vertexShader:h.vertexShader,uniforms:c.UniformsUtils.clone(h.uniforms),side:c.BackSide,depthWrite:!1});class d extends c.Mesh{constructor(){super(new c.BoxGeometry(1,1,1),m)}}function g(e,t,o=new c.Vector3){let a=2*Math.PI*(t-.5);return o.x=Math.cos(a),o.y=Math.sin(Math.PI*(e-.5)),o.z=Math.sin(a),o}v(d,"SkyShader",h),v(d,"material",m);let p=r.forwardRef(({inclination:e=.6,azimuth:t=.1,distance:o=1e3,mieCoefficient:a=.005,mieDirectionalG:i=.8,rayleigh:n=.5,turbidity:s=10,sunPosition:f=g(e,t),...u},v)=>{let h=r.useMemo(()=>new c.Vector3().setScalar(o),[o]),[m]=r.useState(()=>new d);return r.createElement("primitive",(0,l.Z)({object:m,ref:v,"material-uniforms-mieCoefficient-value":a,"material-uniforms-mieDirectionalG-value":i,"material-uniforms-rayleigh-value":n,"material-uniforms-sunPosition-value":f,"material-uniforms-turbidity-value":s,scale:h},u))});var y=o(4946),E=o(8811);function b(e){let{...t}=e,o=(0,i.vO)(),{scene:l,nodes:f,animations:u}=(0,n.L)("".concat(E.u,"/3d-model/LittlestTokyo-transformed.glb")),{actions:v}=function(e,t){let o=r.useRef(),[a]=r.useState(()=>t?t instanceof c.Object3D?{current:t}:t:o),[i]=r.useState(()=>new c.AnimationMixer(void 0));r.useLayoutEffect(()=>void(i._root=a.current),[i,t]);let n=r.useRef({}),[l]=r.useState(()=>{let t={};return e.forEach(e=>Object.defineProperty(t,e.name,{enumerable:!0,get(){if(a.current)return n.current[e.name]||(n.current[e.name]=i.clipAction(e,a.current))},configurable:!0})),{ref:a,clips:e,actions:t,names:e.map(e=>e.name),mixer:i}});return(0,s.A)((e,t)=>i.update(t)),r.useEffect(()=>{let e=a.current;return()=>{n.current={},Object.values(l.actions).forEach(t=>{e&&i.uncacheAction(t,e)})}},[e]),r.useEffect(()=>()=>{i.stopAllAction()},[i]),l}(u,l);return(0,r.useLayoutEffect)(()=>Object.values(f).forEach(e=>e.receiveShadow=e.castShadow=!0)),(0,r.useEffect)(()=>{if(v&&"Take 001"in v){var e;null===(e=v["Take 001"])||void 0===e||e.play()}},[v]),(0,s.A)((e,t)=>{let a=v["Take 001"],i=1-o.offset;a&&(a.time=c.MathUtils.damp(a.time,a.getClip().duration/2*i,100,t)),e.camera.position.set(-10*Math.sin(i),5*Math.atan(i*Math.PI*2),-10*Math.cos(i*Math.PI/3)),e.camera.lookAt(0,0,0)}),(0,a.jsx)("primitive",{object:l,...t})}n.L.preload("".concat(E.u,"/3d-model/LittlestTokyo-transformed.glb"));let x=()=>(0,a.jsxs)(y.Xz,{dpr:[1,2],shadows:!0,camera:{position:[0,0,10],near:.1,far:1e3},children:[(0,a.jsx)("ambientLight",{intensity:.03}),(0,a.jsx)("fog",{attach:"fog",args:["#ff5020",5,18]}),(0,a.jsx)("spotLight",{angle:.14,color:"#ffd0d0",penumbra:1,position:[25,50,-20],"shadow-mapSize":[2048,2048],"shadow-bias":-.0001,castShadow:!0}),(0,a.jsx)(p,{sunPosition:[2,.4,10]}),(0,a.jsx)(r.Suspense,{fallback:null,children:(0,a.jsx)(i.Fq,{pages:3,children:(0,a.jsx)(b,{scale:.02,position:[0,2.5,0]})})})]})},8811:function(e,t,o){"use strict";o.d(t,{u:function(){return i}});var a=o(1517);let i=a.env.NEXT_PUBLIC_BASE_PATH}},function(e){e.O(0,[72,71,617,918,492,304,958,744],function(){return e(e.s=2633)}),_N_E=e.O()}]);