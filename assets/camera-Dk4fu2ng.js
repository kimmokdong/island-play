import{$t as e,C as t,Ct as n,It as r,J as i,Lt as a,Mt as o,Qt as s,Rt as c,Yt as l,bt as u,ct as d,en as f,ft as p,g as m,in as h,jt as g,mt as _,st as v,t as y,tn as b,w as x,x as S}from"./three.module-DnkIFw1D.js";import{Hs as C,tc as w}from"./bridge-BXSrfjjE.js";import{t as T}from"./camera-D0TO9ZXr.js";function E(r){let i=new S(new Uint8Array([45,110,185,255]),4,1,o);i.minFilter=i.magFilter=_,i.needsUpdate=!0;let s=new WeakMap,l=new x(1,1,e);l.format=t;let d=new h(1,1,{depthTexture:l,stencilBuffer:!0}),m=new c({depthTest:!1,depthWrite:!1,uniforms:{colorMap:{value:d.texture},depthMap:{value:d.depthTexture},texel:{value:new f(1,1)},near:{value:.1},far:{value:180},outline:{value:1}},vertexShader:`varying vec2 vUv;
      void main() { vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }`,fragmentShader:`
      uniform sampler2D colorMap, depthMap;
      uniform vec2 texel;
      uniform float near, far, outline;
      varying vec2 vUv;
      float depth(vec2 uv) {
        float z = texture2D(depthMap, uv).r;
        return near * far / (far - z * (far - near));
      }
      void main() {
        vec3 color = texture2D(colorMap, vUv).rgb;
        float gray = dot(color, vec3(.2126, .7152, .0722));
        color = mix(vec3(gray), color, .72) * vec3(1.03, 1.01, .94);
        float c = depth(vUv);
        float l = depth(vUv - vec2(texel.x, 0.));
        float r = depth(vUv + vec2(texel.x, 0.));
        float u = depth(vUv + vec2(0., texel.y));
        float d = depth(vUv - vec2(0., texel.y));
        // 평평한 경사면 대신 깊이가 꺾이는 모서리와 외곽에 선을 긋는다.
        // 역깊이는 평면 위에서 선형이다. 가파른 경사면의 가짜 대각선을 막는다.
        float edge = max(abs(1. / l + 1. / r - 2. / c), abs(1. / u + 1. / d - 2. / c)) * c;
        // 바닥의 알파 0은 지형 조각 연결부를 제외하는 마스크다. 이웃 사물의 외곽선은 살린다.
        float objectMask = max(texture2D(colorMap, vUv).a,
          max(max(texture2D(colorMap, vUv - vec2(texel.x, 0.)).a, texture2D(colorMap, vUv + vec2(texel.x, 0.)).a),
              max(texture2D(colorMap, vUv - vec2(0., texel.y)).a, texture2D(colorMap, vUv + vec2(0., texel.y)).a)));
        float line = smoothstep(.0015, .009, edge) * .82 * outline * smoothstep(.8, 1., objectMask);
        gl_FragColor = vec4(mix(color, vec3(.035, .055, .044), line), 1.);
        #include <colorspace_fragment>
      }`}),g=new a;g.add(new v(new n(2,2),m));let y=new u(-1,1,1,-1,0,1);return{apply(e){e.traverse(e=>{if(!(e instanceof v)||e.geometry.hasAttribute(`terrainWeights`))return;let t=e=>{if(e instanceof p)return e;let t=s.get(e);if(!t){let n=e;if(![`MeshLambertMaterial`,`MeshStandardMaterial`,`MeshPhongMaterial`].includes(e.type))return e;let r=n.map?.image,a=r instanceof HTMLImageElement?r.src:``;t=new p({color:n.color,map:n.map,vertexColors:n.vertexColors,side:n.side,transparent:n.transparent,opacity:n.opacity,alphaTest:n.alphaTest,gradientMap:i,depthWrite:n.depthWrite}),t.defines={...t.defines,FLAT_SHADED:``},t.onBeforeCompile=(e,t)=>{n.onBeforeCompile(e,t),a.includes(`/terrain/`)&&(e.vertexShader=`varying vec2 vStudyGround;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
vStudyGround = (modelMatrix * vec4(position, 1.)).xz;`),e.fragmentShader=`varying vec2 vStudyGround;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace(`#include <map_fragment>`,`#include <map_fragment>
                vec3 grain = diffuseColor.rgb / max(diffuse, vec3(.001));
                float detail = dot(grain, vec3(.3, .5, .2));
                float mottling = sin(vStudyGround.x * .33 + sin(vStudyGround.y * .21) * 1.6) * sin(vStudyGround.y * .27);
                diffuseColor.rgb = diffuse * (.83 + detail * .45 + mottling * .055);`),e.fragmentShader=e.fragmentShader.replace(`#include <opaque_fragment>`,`#include <opaque_fragment>
gl_FragColor.a = 0.;`))},t.customProgramCacheKey=()=>`study-${n.customProgramCacheKey()}-${a.includes(`/terrain/`)}`,a.includes(`/terrain/`)&&t.color.set(a.includes(`grass`)?10399614:15191211),s.set(e,t)}return t};e.material=Array.isArray(e.material)?e.material.map(t):t(e.material)})},setOutline(e){m.uniforms.outline.value=Number(e)},render(e,t,n,i,a,o=()=>r.render(e,t)){let s=r.getPixelRatio(),c=Math.floor(i*s),l=Math.floor(a*s);(d.width!==c||d.height!==l)&&d.setSize(c,l),m.uniforms.texel.value.set(1/c,1/l),m.uniforms.near.value=t.near,m.uniforms.far.value=t.far,r.setScissorTest(!1),r.setRenderTarget(d),r.clear(),o(),r.setRenderTarget(null),r.setScissorTest(!0),r.setViewport(n,0,i,a),r.setScissor(n,0,i,a),r.clear(),r.render(g,y)}}}var D=`
  #ifdef USE_FOG
    #ifdef FOG_EXP2
      float fogFactor = 1.0 - exp(-fogDensity * fogDensity * vFogDepth * vFogDepth);
    #else
      float fogFactor = smoothstep(fogNear, fogFar, vFogDepth);
    #endif
    gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, fogFactor * .88);
  #endif
`,O=new m(8959172);function k(e){let t=new l().load(`./assets/fx/${e}.png`);t.colorSpace=r;let n=new d({map:t,transparent:!0,depthWrite:!1,side:2,fog:!0});return n.onBeforeCompile=e=>{e.fragmentShader=e.fragmentShader.replace(`#include <fog_fragment>`,`
      #ifdef USE_FOG
        gl_FragColor.rgb = mix(fogColor, gl_FragColor.rgb, smoothstep(.10, .28, vMapUv.y));
      #endif
      ${D}
    `)},n.customProgramCacheKey=()=>`horizon-picture-vis1`,n}var A=256,j=[...w.coastline,...w.tidalIsland,...w.raftIsland,...w.wreckShore],M=70,N=Math.min(...j.map(e=>e[0]))-M,P=Math.min(...j.map(e=>e[1]))-M,F=Math.max(Math.max(...j.map(e=>e[0]))+M-N,Math.max(...j.map(e=>e[1]))+M-P),I=`
  #include <fog_pars_vertex>
  varying vec3 vWorld;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    vec4 mvPosition = viewMatrix * world;
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
  }`,L=`
  #include <fog_pars_fragment>
  uniform sampler2D depthMap; uniform vec2 origin; uniform float span; uniform float time; uniform float rain;
  uniform vec3 sunDir; uniform vec3 sunColor; uniform float sunPower; uniform vec3 ambient;
  varying vec3 vWorld;
  void main() {
    vec2 uv = (vWorld.xz - origin) / span;
    // 먼 바다 장면에서 수심 지도 끝이 사각 띠로 드러나지 않게 깊은 물로 부드럽게 잇는다.
    float inside = smoothstep(0.0, .025, uv.x) * smoothstep(0.0, .025, 1.0 - uv.x) * smoothstep(0.0, .025, uv.y) * smoothstep(0.0, .025, 1.0 - uv.y);
    float depth = mix(1.0, texture2D(depthMap, clamp(uv, 0.0, 1.0)).r, inside); // 0 = 물가, 1 = 깊음
    vec2 p = vWorld.xz;
    // 잔물결: 여러 방향 사인파의 기울기로 법선을 만든다.
    float t = time;
    vec2 g = vec2(0.0);
    g += vec2(0.30, 0.10) * cos(dot(p, vec2(0.30, 0.10)) + t * 1.10) * 0.55;
    g += vec2(-0.12, 0.42) * cos(dot(p, vec2(-0.12, 0.42)) + t * 1.45) * 0.35;
    g += vec2(0.85, -0.6) * cos(dot(p, vec2(0.85, -0.6)) - t * 2.20) * 0.12;
    g += rain * vec2(cos(p.x * 9.0 + t * 14.0), sin(p.y * 8.0 - t * 16.0)) * 0.08; // [가정치] 비 잔물결, 그리기 호출 추가 없음
    vec3 n = normalize(vec3(-g.x * 0.35, 1.0, -g.y * 0.35));
    // 색은 화면(sRGB) 값으로 고르고 계산은 선형 공간에서(안개·하늘과 같은 공간) 한다.
    vec3 shallow = pow(vec3(0.47, 0.86, 0.80), vec3(2.2)), mid = pow(vec3(0.20, 0.63, 0.74), vec3(2.2)), deep = pow(vec3(0.09, 0.38, 0.58), vec3(2.2));
    vec3 col = mix(shallow, mid, smoothstep(0.02, 0.35, depth));
    col = mix(col, deep, smoothstep(0.35, 0.95, depth));
    // 물가 거품: 해안으로 밀려오는 띠 두세 줄 + 물가에 붙은 흰 테.
    float shore = 1.0 - smoothstep(0.0, 0.16, depth);
    float bands = smoothstep(0.55, 0.95, sin(depth * 70.0 - t * 1.6 + sin(p.x * 0.05) * 2.0)) * shore;
    float rim = 1.0 - smoothstep(0.0, 0.025, depth);
    float foam = clamp(bands * 0.7 + rim, 0.0, 1.0);
    // 빛: 반구광(ambient) + 해 방향 + 반짝임.
    vec3 viewDir = normalize(cameraPosition - vWorld);
    float diffuse = 0.55 + 0.45 * max(dot(n, sunDir), 0.0);
    float glint = pow(max(dot(reflect(-sunDir, n), viewDir), 0.0), 90.0) * sunPower;
    vec3 lit = col * (ambient + sunColor * diffuse * 0.55) + sunColor * glint * 0.9;
    lit = mix(lit, (ambient + sunColor * 0.6) * 1.05, foam * 0.85);
    lit *= mix(0.5, 1.0, clamp(sunPower * 2.0, 0.0, 1.0)); // 밤바다는 땅만큼 어둡게
    gl_FragColor = vec4(lit, 1.0);
    #include <colorspace_fragment>
    ${D}
  }`,R=`
  #include <fog_pars_fragment>
  uniform sampler2D depthMap; uniform vec2 origin; uniform float span; uniform float time; uniform float rain;
  uniform vec3 sunDir; uniform vec3 sunColor; uniform float sunPower; uniform vec3 ambient;
  varying vec3 vWorld;
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
  }
  void main() {
    vec2 uv = (vWorld.xz - origin) / span, p = vWorld.xz;
    float inside = smoothstep(0.0, .025, uv.x) * smoothstep(0.0, .025, 1.0 - uv.x) * smoothstep(0.0, .025, uv.y) * smoothstep(0.0, .025, 1.0 - uv.y);
    float depth = mix(1.0, texture2D(depthMap, clamp(uv, 0.0, 1.0)).r, inside);
    float t = time, colorNoise = noise(p * .018), breakup = noise(p * .24 + vec2(t * .025, -t * .018));
    // 서로 다른 크기의 물결을 겹치되 먼 곳의 작은 무늬는 픽셀 크기에 맞춰 지운다.
    float detail = 1.0 - smoothstep(.15, .9, length(fwidth(p)));
    float a = dot(p, vec2(.44, .18)) - t * .85 + colorNoise * 2.0;
    float b = dot(p, vec2(-.28, .63)) - t * 1.12;
    float c = dot(p, vec2(1.35, -.74)) + t * 1.4;
    vec2 g = vec2(.44, .18) * cos(a) * .32 + vec2(-.28, .63) * cos(b) * .20;
    g += vec2(1.35, -.74) * cos(c) * .075 * detail;
    g += vec2(-2.1, -1.3) * cos(dot(p, vec2(-2.1, -1.3)) - t * 1.7) * .025 * detail;
    g += rain * vec2(cos(p.x * 9.0 + t * 14.0), sin(p.y * 8.0 - t * 16.0)) * .08 * detail;
    vec3 n = normalize(vec3(-g.x * .8, 1.0, -g.y * .8));
    vec3 sand = pow(vec3(.69, .83, .67), vec3(2.2)), shallow = pow(vec3(.27, .83, .77), vec3(2.2));
    vec3 mid = pow(vec3(.12, .62, .72), vec3(2.2)), deep = pow(vec3(.08, .37, .59), vec3(2.2));
    vec3 col = mix(sand, shallow, smoothstep(0.0, .075, depth));
    col = mix(col, mid, smoothstep(.045, .48, depth));
    col = mix(col, deep, smoothstep(.25, 1.0, depth));
    col *= .88 + colorNoise * .24 + (sin(a) * .055 + sin(b) * .035) * detail;
    // 얕은 곳에만 희미한 빛그물. 원경에서는 없애 반짝이는 점무늬를 막는다.
    float caustic = pow(max(0.0, 1.0 - abs(sin(c + sin(b)) * .65 + sin(b * 1.7 - t * .3) * .35)), 12.0);
    col += vec3(.055, .085, .065) * caustic * (1.0 - smoothstep(.06, .32, depth)) * detail;
    float shore = 1.0 - smoothstep(.025, .19, depth);
    // 위상이 커지면 같은 마루가 얕은 쪽으로 이동한다. fwidth로 거품 가장자리를 완화한다.
    float phase = depth * 72.0 + t * 1.2 + breakup * 3.0;
    float aa = max(.12, fwidth(phase));
    float bands = smoothstep(.63 - aa, .92 + aa, sin(phase)) * smoothstep(.25, .62, breakup);
    float rim = (1.0 - smoothstep(.002, .022 + fwidth(depth), depth)) * (.45 + breakup * .4);
    float foam = clamp(bands * shore * .68 + rim, 0.0, .9);
    col *= mix(.86, 1.0, smoothstep(0.0, .018, depth));
    vec3 viewDir = normalize(cameraPosition - vWorld);
    float diffuse = .55 + .45 * max(dot(n, sunDir), 0.0);
    float glint = pow(max(dot(reflect(-sunDir, n), viewDir), 0.0), 48.0) * sunPower;
    vec3 lit = col * (ambient + sunColor * diffuse * .55) + sunColor * glint * .48;
    lit = mix(lit, (ambient + sunColor * .6) * 1.05, foam * .85);
    lit *= mix(.5, 1.0, clamp(sunPower * 2.0, 0.0, 1.0));
    gl_FragColor = vec4(lit, 1.0);
    #include <colorspace_fragment>
    ${D}
  }`;function z(e=C){let t=new Uint8Array(A*A),r=F/A;for(let n=0;n<A;n++)for(let i=0;i<A;i++){let a=e(N+(i+.5)*r,P+(n+.5)*r);t[n*A+i]=Math.max(0,Math.min(255,Math.round(-a/10*255)))}let a=new S(t,A,A,o);a.magFilter=a.minFilter=i,a.needsUpdate=!0;let l=new c({uniforms:s.merge([y.fog,{depthMap:{value:null},origin:{value:new f(N,P)},span:{value:F},time:{value:0},rain:{value:0},sunDir:{value:new b(.3,.8,.5).normalize()},sunColor:{value:new m(1,.95,.85)},sunPower:{value:1},ambient:{value:new m(.55,.62,.62)}}]),vertexShader:I,fragmentShader:new URLSearchParams(globalThis.location?.search).get(`sea`)===`v1`?L:R,fog:!0});l.uniforms.depthMap.value=a,l.addEventListener(`dispose`,()=>a.dispose());let u=new v(new n(w.terrain.seaSize,w.terrain.seaSize),l);return u.rotation.x=-Math.PI/2,{mesh:u,setLight(e,t,n,r,i){l.uniforms.sunDir.value.set(e.x,Math.max(.05,e.y),e.z).normalize(),l.uniforms.sunColor.value.copy(t).multiplyScalar(Math.min(1.2,n/2)),l.uniforms.sunPower.value=Math.max(0,Math.min(1,e.y*2)),l.uniforms.ambient.value.copy(r).multiplyScalar(i*.32)},update(e,t=0){l.uniforms.time.value=e,l.uniforms.rain.value=t}}}var B={...T},V=[{id:`close35`,label:`가깝게 35°(지금 기본)`,pitchDeg:35,distance:8,fov:48},{id:`low25`,label:`낮게 25°(풍경)`,pitchDeg:25,distance:9,fov:50},{id:`mid45`,label:`추천 45°`,pitchDeg:45,distance:12,fov:40},{id:`far45`,label:`멀리 45°`,pitchDeg:45,distance:16,fov:38},{id:`high55`,label:`높게 55°(건설)`,pitchDeg:55,distance:14,fov:38}],H=`island-camera-preset`,U={pitchDeg:[3,89],distance:[1.5,80]},W=`island-camera-view`,G=(e,t)=>({pitchDeg:Math.min(U.pitchDeg[1],Math.max(U.pitchDeg[0],e)),distance:Math.min(U.distance[1],Math.max(U.distance[0],t))}),K={distance:[1.5,80,.5],pitchDeg:[3,89,1],yawDeg:[0,359,1],fov:[10,120,1],lookHeight:[0,10,.1]};function q(e,t,n){let r=n*Math.PI/180,i=Math.cos(r),a=Math.sin(r);return{x:e*i+t*a,z:-e*a+t*i}}function J(e){let t=e.pitchDeg*Math.PI/180,n=e.yawDeg*Math.PI/180,r=e.distance*Math.cos(t);return{x:r*Math.sin(n),y:e.distance*Math.sin(t),z:r*Math.cos(n)}}function Y(e){let t=e=>Math.round(e*100)/100;return JSON.stringify({distance:t(e.distance),pitchDeg:t(e.pitchDeg),yawDeg:t(e.yawDeg),fov:t(e.fov),lookHeight:t(e.lookHeight)})}function X(){let e=new g,t=new b,n=new b,r=new b,i=new b,a=[],o=[[0,0],[-1,-1],[-1,1],[1,-1],[1,1]],s=1;return{get fraction(){return s},reset(){s=1},update(c,l,u,d){t.subVectors(c.position,l);let f=t.length();if(f<.001)return;t.divideScalar(f),n.set(t.z,0,-t.x),n.lengthSq()<1e-6?n.set(1,0,0):n.normalize(),r.crossVectors(t,n).normalize();let p=c.near*Math.tan(c.fov*Math.PI/360)+.2,m=(p-.2)*c.aspect+.2,h=f;for(let s of u)for(let[c,u]of o){i.copy(l).addScaledVector(n,c*m).addScaledVector(r,u*p),e.set(i,t),e.near=0,e.far=h+.3,a.length=0,s.terrain.raycast(e,a);for(let e of a)h=Math.min(h,Math.max(.05,e.distance-.3))}s=Math.min(h/f,s+(1-s)*(1-Math.exp(-4*Math.max(0,d)))),c.position.copy(l).addScaledVector(t,f*s),c.lookAt(l)}}}export{W as a,X as c,z as d,O as f,H as i,Y as l,E as m,K as n,J as o,k as p,V as r,G as s,B as t,q as u};