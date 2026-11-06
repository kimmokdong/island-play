import{s as e}from"./sky-B_pxsBIg.js";import{Cr as t,D as n,In as r,Ln as i,Tt as a,Ut as o,Xn as s,_ as c,mr as l,ut as u,wr as d}from"./three.core-D_8iNREF.js";import{t as f}from"./three.module-CCqvmHwe.js";import{A as p,s as m}from"./terrain--t0Sd_Of.js";import{t as h}from"./camera-DonbSokU.js";var g=256,_=[...p.coastline,...p.tidalIsland,...p.raftIsland,...p.wreckShore,...p.jungleShore,...p.highlandShore],v=70,y=Math.min(..._.map(e=>e[0]))-v,b=Math.min(..._.map(e=>e[1]))-v,x=Math.max(Math.max(..._.map(e=>e[0]))+v-y,Math.max(..._.map(e=>e[1]))+v-b),S=`
  #include <fog_pars_vertex>
  varying vec3 vWorld;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    vec4 mvPosition = viewMatrix * world;
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
  }`,C=`
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
    ${e}
  }`,w=`
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
    ${e}
  }`;function T(e=m){let r=p.jungle.pond,h=`float purple = (1.0 - smoothstep(0.0, ${r.tintRadius.toFixed(1)}, distance(p, vec2(${r.tintX.toFixed(1)}, ${r.tintZ.toFixed(1)})))) * ${r.tintStrength.toFixed(2)};
    col = mix(col, vec3(${new c(r.tint).toArray().map(e=>e.toFixed(5)).join(`,`)}), purple);`,_=new Uint8Array(g*g),v=x/g;for(let t=0;t<g;t++)for(let n=0;n<g;n++){let r=e(y+(n+.5)*v,b+(t+.5)*v);_[t*g+n]=Math.max(0,Math.min(255,Math.round(-r/10*255)))}let T=new n(_,g,g,i);T.magFilter=T.minFilter=u,T.needsUpdate=!0;let E=new s({uniforms:l.merge([f.fog,{depthMap:{value:null},origin:{value:new t(y,b)},span:{value:x},time:{value:0},rain:{value:0},sunDir:{value:new d(.3,.8,.5).normalize()},sunColor:{value:new c(1,.95,.85)},sunPower:{value:1},ambient:{value:new c(.55,.62,.62)}}]),vertexShader:S,fragmentShader:(new URLSearchParams(globalThis.location?.search).get(`sea`)===`v1`?C:w).replace(`vec3 viewDir =`,`${h}\nvec3 viewDir =`),fog:!0});E.uniforms.depthMap.value=T,E.addEventListener(`dispose`,()=>T.dispose());let D=new a(new o(p.terrain.seaSize,p.terrain.seaSize),E);return D.rotation.x=-Math.PI/2,{mesh:D,setLight(e,t,n,r,i){E.uniforms.sunDir.value.set(e.x,Math.max(.05,e.y),e.z).normalize(),E.uniforms.sunColor.value.copy(t).multiplyScalar(Math.min(1.2,n/2)),E.uniforms.sunPower.value=Math.max(0,Math.min(1,e.y*2)),E.uniforms.ambient.value.copy(r).multiplyScalar(i*.32)},update(e,t=0){E.uniforms.time.value=e,E.uniforms.rain.value=t}}}var E={...h},D=[{id:`close35`,label:`가깝게 35°`,pitchDeg:35,distance:8,fov:48},{id:`low25`,label:`낮게 25°(풍경)`,pitchDeg:25,distance:9,fov:50},{id:`mid45`,label:`추천 45°(지금 기본)`,pitchDeg:45,distance:12,fov:40},{id:`far45`,label:`멀리 45°`,pitchDeg:45,distance:16,fov:38},{id:`high55`,label:`높게 55°(건설)`,pitchDeg:55,distance:14,fov:38}],O=`island-camera-preset`,k={pitchDeg:[3,89],distance:[1.5,80]},A=`island-camera-view`,j=(e,t)=>({pitchDeg:Math.min(k.pitchDeg[1],Math.max(k.pitchDeg[0],e)),distance:Math.min(k.distance[1],Math.max(k.distance[0],t))}),M={distance:[1.5,80,.5],pitchDeg:[3,89,1],yawDeg:[0,359,1],fov:[10,120,1],lookHeight:[0,10,.1]};function N(e,t,n){let r=n*Math.PI/180,i=Math.cos(r),a=Math.sin(r);return{x:e*i+t*a,z:-e*a+t*i}}function P(e){let t=e.pitchDeg*Math.PI/180,n=e.yawDeg*Math.PI/180,r=e.distance*Math.cos(t);return{x:r*Math.sin(n),y:e.distance*Math.sin(t),z:r*Math.cos(n)}}function F(e){let t=e=>Math.round(e*100)/100;return JSON.stringify({distance:t(e.distance),pitchDeg:t(e.pitchDeg),yawDeg:t(e.yawDeg),fov:t(e.fov),lookHeight:t(e.lookHeight)})}var I=(e,t,n)=>t<.98&&n*t<(e?2.3:1.8);function L(){let e=new r,t=new d,n=new d,i=new d,a=new d,o=[],s=[[0,0],[-1,-1],[-1,1],[1,-1],[1,1]],c=1;return{get fraction(){return c},reset(){c=1},update(r,l,u,d,f){t.subVectors(r.position,l);let p=t.length();if(p<.001)return;t.divideScalar(p),n.set(t.z,0,-t.x),n.lengthSq()<1e-6?n.set(1,0,0):n.normalize(),i.crossVectors(t,n).normalize();let m=r.near*Math.tan(r.fov*Math.PI/360)+.2,h=(m-.2)*r.aspect+.2,g=p;if(f){let e=Math.max(.6,p/14);for(let[r,o]of s){a.copy(l).addScaledVector(n,r*h).addScaledVector(i,o*m);let s=e=>a.y+t.y*e-f(a.x+t.x*e,a.z+t.z*e),c=!1,u=0;for(let t=0,n=g+.3;t<=n;t=t>=n?n+1:Math.min(n,t+e)){if(s(t)>0){c=!0,u=t;continue}if(!c)continue;let e=u,n=t;for(let t=0;t<4;t++){let t=(e+n)/2;s(t)>0?e=t:n=t}g=Math.min(g,Math.max(.05,e-.3));break}}}else for(let r of u)for(let[c,u]of s){a.copy(l).addScaledVector(n,c*h).addScaledVector(i,u*m),e.set(a,t),e.near=0,e.far=g+.3,o.length=0,r.terrain?.raycast(e,o);for(let e of o)g=Math.min(g,Math.max(.05,e.distance-.3))}c=Math.min(g/p,c+(1-c)*(1-Math.exp(-4*Math.max(0,d)))),r.position.copy(l).addScaledVector(t,p*c),r.lookAt(l)}}}export{A as a,L as c,N as d,T as f,O as i,F as l,M as n,P as o,D as r,j as s,E as t,I as u};