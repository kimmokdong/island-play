import{A as e,At as t,Ct as n,D as r,Er as i,Fn as a,Jn as o,Mt as s,Pn as c,Rt as l,Sr as u,Vt as d,_ as f,ct as p,fr as m,hr as h,j as g,qn as _,xr as v}from"./three.core-CRphnWGP.js";import{t as y}from"./three.module-D-LNrq6Z.js";import{t as b}from"./horizon-D-BsanvY.js";import{Uo as x,cs as S}from"./player-DV7ijujK.js";import{t as C}from"./camera-D0TO9ZXr.js";function w(c){let u=new r(new Uint8Array([45,110,185,255]),4,1,a);u.minFilter=u.magFilter=s,u.needsUpdate=!0;let f=new WeakMap,p=new g(1,1,h);p.format=e;let m=new i(1,1,{depthTexture:p,stencilBuffer:!0}),y=new o({depthTest:!1,depthWrite:!1,uniforms:{colorMap:{value:m.texture},depthMap:{value:m.depthTexture},texel:{value:new v(1,1)},near:{value:.1},far:{value:180},outline:{value:1}},vertexShader:`varying vec2 vUv;
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
      }`}),b=new _;b.add(new n(new d(2,2),y));let x=new l(-1,1,1,-1,0,1);return{apply(e){e.traverse(e=>{if(!(e instanceof n)||e.geometry.hasAttribute(`terrainWeights`))return;let r=e=>{if(e instanceof t)return e;let n=f.get(e);if(!n){let r=e;if(![`MeshLambertMaterial`,`MeshStandardMaterial`,`MeshPhongMaterial`].includes(e.type))return e;let i=r.map?.image,a=i instanceof HTMLImageElement?i.src:``;n=new t({color:r.color,map:r.map,vertexColors:r.vertexColors,side:r.side,transparent:r.transparent,opacity:r.opacity,alphaTest:r.alphaTest,gradientMap:u,depthWrite:r.depthWrite}),n.defines={...n.defines,FLAT_SHADED:``},n.onBeforeCompile=(e,t)=>{r.onBeforeCompile(e,t),a.includes(`/terrain/`)&&(e.vertexShader=`varying vec2 vStudyGround;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
vStudyGround = (modelMatrix * vec4(position, 1.)).xz;`),e.fragmentShader=`varying vec2 vStudyGround;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace(`#include <map_fragment>`,`#include <map_fragment>
                vec3 grain = diffuseColor.rgb / max(diffuse, vec3(.001));
                float detail = dot(grain, vec3(.3, .5, .2));
                float mottling = sin(vStudyGround.x * .33 + sin(vStudyGround.y * .21) * 1.6) * sin(vStudyGround.y * .27);
                diffuseColor.rgb = diffuse * (.83 + detail * .45 + mottling * .055);`),e.fragmentShader=e.fragmentShader.replace(`#include <opaque_fragment>`,`#include <opaque_fragment>
gl_FragColor.a = 0.;`))},n.customProgramCacheKey=()=>`study-${r.customProgramCacheKey()}-${a.includes(`/terrain/`)}`,a.includes(`/terrain/`)&&n.color.set(a.includes(`grass`)?10399614:15191211),f.set(e,n)}return n};e.material=Array.isArray(e.material)?e.material.map(r):r(e.material)})},setOutline(e){y.uniforms.outline.value=Number(e)},render(e,t,n,r,i,a=()=>c.render(e,t)){let o=c.getPixelRatio(),s=Math.floor(r*o),l=Math.floor(i*o);(m.width!==s||m.height!==l)&&m.setSize(s,l),y.uniforms.texel.value.set(1/s,1/l),y.uniforms.near.value=t.near,y.uniforms.far.value=t.far,c.setScissorTest(!1),c.setRenderTarget(m),c.clear(),a(),c.setRenderTarget(null),c.setScissorTest(!0),c.setViewport(n,0,r,i),c.setScissor(n,0,r,i),c.clear(),c.render(b,x)}}}var T=256,E=[...S.coastline,...S.tidalIsland,...S.raftIsland,...S.wreckShore,...S.jungleShore,...S.highlandShore],D=70,O=Math.min(...E.map(e=>e[0]))-D,k=Math.min(...E.map(e=>e[1]))-D,A=Math.max(Math.max(...E.map(e=>e[0]))+D-O,Math.max(...E.map(e=>e[1]))+D-k),j=`
  #include <fog_pars_vertex>
  varying vec3 vWorld;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    vec4 mvPosition = viewMatrix * world;
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
  }`,M=`
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
    ${b}
  }`,N=`
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
    ${b}
  }`;function P(e=x){let t=S.jungle.pond,i=`float purple = (1.0 - smoothstep(0.0, ${t.tintRadius.toFixed(1)}, distance(p, vec2(${t.tintX.toFixed(1)}, ${t.tintZ.toFixed(1)})))) * ${t.tintStrength.toFixed(2)};
    col = mix(col, vec3(${new f(t.tint).toArray().map(e=>e.toFixed(5)).join(`,`)}), purple);`,s=new Uint8Array(T*T),c=A/T;for(let t=0;t<T;t++)for(let n=0;n<T;n++){let r=e(O+(n+.5)*c,k+(t+.5)*c);s[t*T+n]=Math.max(0,Math.min(255,Math.round(-r/10*255)))}let l=new r(s,T,T,a);l.magFilter=l.minFilter=p,l.needsUpdate=!0;let h=new o({uniforms:m.merge([y.fog,{depthMap:{value:null},origin:{value:new v(O,k)},span:{value:A},time:{value:0},rain:{value:0},sunDir:{value:new u(.3,.8,.5).normalize()},sunColor:{value:new f(1,.95,.85)},sunPower:{value:1},ambient:{value:new f(.55,.62,.62)}}]),vertexShader:j,fragmentShader:(new URLSearchParams(globalThis.location?.search).get(`sea`)===`v1`?M:N).replace(`vec3 viewDir =`,`${i}\nvec3 viewDir =`),fog:!0});h.uniforms.depthMap.value=l,h.addEventListener(`dispose`,()=>l.dispose());let g=new n(new d(S.terrain.seaSize,S.terrain.seaSize),h);return g.rotation.x=-Math.PI/2,{mesh:g,setLight(e,t,n,r,i){h.uniforms.sunDir.value.set(e.x,Math.max(.05,e.y),e.z).normalize(),h.uniforms.sunColor.value.copy(t).multiplyScalar(Math.min(1.2,n/2)),h.uniforms.sunPower.value=Math.max(0,Math.min(1,e.y*2)),h.uniforms.ambient.value.copy(r).multiplyScalar(i*.32)},update(e,t=0){h.uniforms.time.value=e,h.uniforms.rain.value=t}}}var F={...C},I=[{id:`close35`,label:`가깝게 35°(지금 기본)`,pitchDeg:35,distance:8,fov:48},{id:`low25`,label:`낮게 25°(풍경)`,pitchDeg:25,distance:9,fov:50},{id:`mid45`,label:`추천 45°`,pitchDeg:45,distance:12,fov:40},{id:`far45`,label:`멀리 45°`,pitchDeg:45,distance:16,fov:38},{id:`high55`,label:`높게 55°(건설)`,pitchDeg:55,distance:14,fov:38}],L=`island-camera-preset`,R={pitchDeg:[3,89],distance:[1.5,80]},z=`island-camera-view`,B=(e,t)=>({pitchDeg:Math.min(R.pitchDeg[1],Math.max(R.pitchDeg[0],e)),distance:Math.min(R.distance[1],Math.max(R.distance[0],t))}),V={distance:[1.5,80,.5],pitchDeg:[3,89,1],yawDeg:[0,359,1],fov:[10,120,1],lookHeight:[0,10,.1]};function H(e,t,n){let r=n*Math.PI/180,i=Math.cos(r),a=Math.sin(r);return{x:e*i+t*a,z:-e*a+t*i}}function U(e){let t=e.pitchDeg*Math.PI/180,n=e.yawDeg*Math.PI/180,r=e.distance*Math.cos(t);return{x:r*Math.sin(n),y:e.distance*Math.sin(t),z:r*Math.cos(n)}}function W(e){let t=e=>Math.round(e*100)/100;return JSON.stringify({distance:t(e.distance),pitchDeg:t(e.pitchDeg),yawDeg:t(e.yawDeg),fov:t(e.fov),lookHeight:t(e.lookHeight)})}function G(){let e=new c,t=new u,n=new u,r=new u,i=new u,a=[],o=[[0,0],[-1,-1],[-1,1],[1,-1],[1,1]],s=1;return{get fraction(){return s},reset(){s=1},update(c,l,u,d){t.subVectors(c.position,l);let f=t.length();if(f<.001)return;t.divideScalar(f),n.set(t.z,0,-t.x),n.lengthSq()<1e-6?n.set(1,0,0):n.normalize(),r.crossVectors(t,n).normalize();let p=c.near*Math.tan(c.fov*Math.PI/360)+.2,m=(p-.2)*c.aspect+.2,h=f;for(let s of u)for(let[c,u]of o){i.copy(l).addScaledVector(n,c*m).addScaledVector(r,u*p),e.set(i,t),e.near=0,e.far=h+.3,a.length=0,s.terrain.raycast(e,a);for(let e of a)h=Math.min(h,Math.max(.05,e.distance-.3))}s=Math.min(h/f,s+(1-s)*(1-Math.exp(-4*Math.max(0,d)))),c.position.copy(l).addScaledVector(t,f*s),c.lookAt(l)}}}export{z as a,G as c,P as d,w as f,L as i,W as l,V as n,U as o,I as r,B as s,F as t,H as u};