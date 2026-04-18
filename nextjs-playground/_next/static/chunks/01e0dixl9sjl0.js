(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,77164,e=>{"use strict";e.s(["assetPath",0,"/showroom/nextjs-playground"])},9251,e=>{"use strict";var t=e.i(36734);e.s(["useLoader",()=>t.G])},57436,e=>{"use strict";var t=e.i(36734);e.s(["useThree",()=>t.C])},71611,e=>{"use strict";function t(){return(t=Object.assign.bind()).apply(null,arguments)}e.s(["default",()=>t])},67187,e=>{"use strict";var t=e.i(44501),a=e.i(77658),o=e.i(71611),i=e.i(1685),n=e.i(21348),r=e.i(54387),s=Object.defineProperty,c=(e,t,a)=>{let o;return(o="symbol"!=typeof t?t+"":t)in e?s(e,o,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[o]=a,a};let l=(()=>{let e={uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new n.Vector3},up:{value:new n.Vector3(0,1,0)}},vertexShader:`
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
      #include <${r.version>=154?"colorspace_fragment":"encodings_fragment"}>

      }
    `},t=new n.ShaderMaterial({name:"SkyShader",fragmentShader:e.fragmentShader,vertexShader:e.vertexShader,uniforms:n.UniformsUtils.clone(e.uniforms),side:n.BackSide,depthWrite:!1});class a extends n.Mesh{constructor(){super(new n.BoxGeometry(1,1,1),t)}}return c(a,"SkyShader",e),c(a,"material",t),a})();function u(e,t,a=new n.Vector3){let o=Math.PI*(e-.5),i=2*Math.PI*(t-.5);return a.x=Math.cos(i),a.y=Math.sin(o),a.z=Math.sin(i),a}let f=i.forwardRef(({inclination:e=.6,azimuth:t=.1,distance:a=1e3,mieCoefficient:r=.005,mieDirectionalG:s=.8,rayleigh:c=.5,turbidity:f=10,sunPosition:v=u(e,t),...h},m)=>{let d=i.useMemo(()=>new n.Vector3().setScalar(a),[a]),[p]=i.useState(()=>new l);return i.createElement("primitive",(0,o.default)({object:p,ref:m,"material-uniforms-mieCoefficient-value":r,"material-uniforms-mieDirectionalG-value":s,"material-uniforms-rayleigh-value":c,"material-uniforms-sunPosition-value":v,"material-uniforms-turbidity-value":f,scale:d},h))});var v=e.i(250),h=e.i(1859),m=e.i(55029),d=e.i(77164);function p({...e}){let o=(0,a.useScroll)(),{scene:r,nodes:s,animations:c}=(0,v.useGLTF)(`${d.assetPath}/3d-model/LittlestTokyo-transformed.glb`),{actions:l}=function(e,t){let a=i.useRef(null),[o]=i.useState(()=>t?t instanceof n.Object3D?{current:t}:t:a),[r]=i.useState(()=>new n.AnimationMixer(void 0));i.useLayoutEffect(()=>{t&&(o.current=t instanceof n.Object3D?t:t.current),r._root=o.current});let s=i.useRef({}),c=i.useMemo(()=>{let t={};return e.forEach(e=>Object.defineProperty(t,e.name,{enumerable:!0,get(){if(o.current)return s.current[e.name]||(s.current[e.name]=r.clipAction(e,o.current))},configurable:!0})),{ref:o,clips:e,actions:t,names:e.map(e=>e.name),mixer:r}},[e]);return(0,h.useFrame)((e,t)=>r.update(t)),i.useEffect(()=>{let e=o.current;return()=>{s.current={},r.stopAllAction(),Object.values(c.actions).forEach(t=>{e&&r.uncacheAction(t,e)})}},[e]),c}(c,r);return(0,i.useLayoutEffect)(()=>Object.values(s).forEach(e=>e.receiveShadow=e.castShadow=!0)),(0,i.useEffect)(()=>{l&&"Take 001"in l&&l["Take 001"]?.play()},[l]),(0,h.useFrame)((e,t)=>{let a=l["Take 001"],i=1-o.offset;a&&(a.time=n.MathUtils.damp(a.time,a.getClip().duration/2*i,100,t)),e.camera.position.set(-10*Math.sin(i),5*Math.atan(i*Math.PI*2),-10*Math.cos(i*Math.PI/3)),e.camera.lookAt(0,0,0)}),(0,t.jsx)("primitive",{object:r,...e})}v.useGLTF.preload(`${d.assetPath}/3d-model/LittlestTokyo-transformed.glb`),e.s(["LittlestTokyo",0,()=>(0,t.jsxs)(m.Canvas,{dpr:[1,2],shadows:!0,camera:{position:[0,0,10],near:.1,far:1e3},children:[(0,t.jsx)("ambientLight",{intensity:.03}),(0,t.jsx)("fog",{attach:"fog",args:["#ff5020",5,18]}),(0,t.jsx)("spotLight",{angle:.14,color:"#ffd0d0",penumbra:1,position:[25,50,-20],"shadow-mapSize":[2048,2048],"shadow-bias":-1e-4,castShadow:!0}),(0,t.jsx)(f,{sunPosition:[2,.4,10]}),(0,t.jsx)(i.Suspense,{fallback:null,children:(0,t.jsx)(a.ScrollControls,{pages:3,children:(0,t.jsx)(p,{scale:.02,position:[0,2.5,0]})})})]})],67187)}]);