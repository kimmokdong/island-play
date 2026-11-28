import{s as e}from"./sky-971sUhhq.js";import{Er as t,Et as n,O as r,Qn as i,Rn as a,Tr as o,V as s,Wt as c,dt as l,gr as u,u as d,v as f,zn as p}from"./three.core-BDQyDQbO.js";import{t as m}from"./three.module-DfFrjeIo.js";import{N as h,i as g,s as _}from"./terrain-GASA5vir.js";import{t as v}from"./camera-DonbSokU.js";var y=`
  float waterHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float waterNoise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3. - 2. * f);
    return mix(mix(waterHash(i), waterHash(i + vec2(1, 0)), f.x),
               mix(waterHash(i + vec2(0, 1)), waterHash(i + vec2(1, 1)), f.x), f.y);
  }`;function b(e,t){let{points:r,width:a}=h.river,o=[],c=[],l=[],f=e=>{let t=r[e],n=r[e+1],i=n[0]-t[0],a=n[1]-t[1],o=Math.hypot(i,a);return{x:i/o,z:a/o,length:o}},p=r.slice(1).map((e,t)=>f(t)),_=p.reduce((e,t)=>e+t.length,0),v=0;for(let e=0;e<r.length;e++){let t=p[Math.max(0,e-1)],n=p[Math.min(e,p.length-1)],i=1+t.x*n.x+t.z*n.z,s=(t.z+n.z)/i,u=-(t.x+n.x)/i,[d,f]=r[e],m=g(d,f);for(let e of[-1.16,1.16])o.push(d+e*s*a/2,.035,f+e*u*a/2),c.push(v,e,m);if(e<p.length){let t=e*2;l.push(t,t+2,t+1,t+1,t+2,t+3),v+=n.length}}let b=new d;b.setAttribute(`position`,new s(o,3)),b.setAttribute(`riverUv`,new s(c,3)),b.setIndex(l);let x=new i({uniforms:{...u.clone(m.fog),time:e,light:t,end:{value:_}},transparent:!0,fog:!0,depthWrite:!1,vertexShader:`
      #include <fog_pars_vertex>
      attribute vec3 riverUv; varying vec3 vRiver;
      void main() {
        vRiver = riverUv;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.);
        gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
      }`,fragmentShader:`
      #include <fog_pars_fragment>
      ${y}
      uniform float time, light, end; varying vec3 vRiver;
      void main() {
        float along = vRiver.x, across = vRiver.y, bank = abs(across);
        float rapids = 1. - smoothstep(4., 33., along);
        float fast = along - time * 1.75, slow = along - time * .52;
        float shore = smoothstep(.38, .91, bank);
        float detail = 1. - smoothstep(.2, 1.25, fwidth(along));
        float patches = waterNoise(vec2(fast * .24, across * 4.3));
        float eddy = waterNoise(vec2(slow * .41, across * 7.8));
        float ripples = .5 + .5 * mix(sin(fast * 1.6 + across * 6.9 + patches * 5.),
                                      sin(slow * 1.3 + across * 6.9 + eddy * 5.), shore);
        float broken = waterNoise(vec2(fast * .43, across * 16. + patches * 1.8));
        float streak = smoothstep(.49, .79, broken) * (.46 + .54 * ripples) * detail * (1. - shore);
        float bankSide = sign(across);
        float gaps = waterNoise(vec2(slow * .31, bankSide * 8.4));
        float wander = waterNoise(vec2(slow * .53, bankSide * 11.2));
        float d = abs(bank - (.95 + (wander - .5) * .27));
        float rim = 1. - smoothstep(.016 + gaps * .033, .059 + gaps * .08, d);
        float bankFoam = rim * smoothstep(.34, .62, gaps) * (.72 + .28 * eddy);
        float foam = clamp(bankFoam + streak * (.19 + .56 * rapids), 0., 1.);
        float glint = pow(max(0., sin(fast * 1.34 + patches * 7.)), 14.) * streak * light;
        vec3 water = mix(vec3(.031, .29, .34), vec3(.08, .47, .48), ripples * .62);
        vec3 col = mix(water, vec3(.87, .96, .99), foam) + glint * .12;
        col *= mix(vec3(.19, .24, .34), vec3(1.), light);
        float edge = (1. - smoothstep(1.06, 1.16, bank)) * smoothstep(0., 3., along);
        edge *= (1. - smoothstep(end - 14., end, along)) * smoothstep(-4., 12., vRiver.z);
        gl_FragColor = vec4(col, (.78 + foam * .20) * edge);
        #include <colorspace_fragment>
        #include <fog_fragment>
      }`}),S=new n(b,x);return S.name=`river-flow`,S.renderOrder=4,S}var x=256,S=[...h.coastline,...h.tidalIsland,...h.raftIsland,...h.wreckShore,...h.jungleShore,...h.highlandShore],C=70,w=Math.min(...S.map(e=>e[0]))-C,T=Math.min(...S.map(e=>e[1]))-C,E=Math.max(Math.max(...S.map(e=>e[0]))+C-w,Math.max(...S.map(e=>e[1]))+C-T),D=`
  #include <fog_pars_vertex>
  varying vec3 vWorld;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    vec4 mvPosition = viewMatrix * world;
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
  }`,O=`
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
  }`,k=`
  #include <fog_pars_fragment>
  uniform sampler2D depthMap; uniform vec2 origin; uniform float span; uniform float time; uniform float rain;
  uniform vec3 sunDir; uniform vec3 sunColor; uniform float sunPower; uniform vec3 ambient;
  varying vec3 vWorld;
  ${y}
  void main() {
    vec2 uv = (vWorld.xz - origin) / span, p = vWorld.xz;
    float inside = smoothstep(0.0, .025, uv.x) * smoothstep(0.0, .025, 1.0 - uv.x) * smoothstep(0.0, .025, uv.y) * smoothstep(0.0, .025, 1.0 - uv.y);
    float depth = mix(1.0, texture2D(depthMap, clamp(uv, 0.0, 1.0)).r, inside);
    float t = time, colorNoise = waterNoise(p * .018), breakup = waterNoise(p * .24 + vec2(t * .025, -t * .018));
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
  }`;function A(e=_){let a=h.jungle.pond,s=`float purple = (1.0 - smoothstep(0.0, ${a.tintRadius.toFixed(1)}, distance(p, vec2(${a.tintX.toFixed(1)}, ${a.tintZ.toFixed(1)})))) * ${a.tintStrength.toFixed(2)};
    col = mix(col, vec3(${new f(a.tint).toArray().map(e=>e.toFixed(5)).join(`,`)}), purple);`,d=new Uint8Array(x*x),g=E/x;for(let t=0;t<x;t++)for(let n=0;n<x;n++){let r=e(w+(n+.5)*g,T+(t+.5)*g);d[t*x+n]=Math.max(0,Math.min(255,Math.round(-r/10*255)))}let v=new r(d,x,x,p);v.magFilter=v.minFilter=l,v.needsUpdate=!0;let y=new i({uniforms:u.merge([m.fog,{depthMap:{value:null},origin:{value:new o(w,T)},span:{value:E},time:{value:0},rain:{value:0},sunDir:{value:new t(.3,.8,.5).normalize()},sunColor:{value:new f(1,.95,.85)},sunPower:{value:1},ambient:{value:new f(.55,.62,.62)}}]),vertexShader:D,fragmentShader:(new URLSearchParams(globalThis.location?.search).get(`sea`)===`v1`?O:k).replace(`vec3 viewDir =`,`${s}\nvec3 viewDir =`),fog:!0});y.uniforms.depthMap.value=v,y.addEventListener(`dispose`,()=>v.dispose());let S=new n(new c(h.terrain.seaSize,h.terrain.seaSize),y);S.rotation.x=-Math.PI/2;let C={value:1};return{mesh:S,river:b(y.uniforms.time,C),setLight(e,t,n,r,i){y.uniforms.sunDir.value.set(e.x,Math.max(.05,e.y),e.z).normalize(),y.uniforms.sunColor.value.copy(t).multiplyScalar(Math.min(1.2,n/2)),y.uniforms.sunPower.value=Math.max(0,Math.min(1,e.y*2)),y.uniforms.ambient.value.copy(r).multiplyScalar(i*.32),C.value=Math.min(1,n/.85)},update(e,t=0){y.uniforms.time.value=e,y.uniforms.rain.value=t}}}var j={...v},M=[{id:`close35`,label:`가깝게 35°`,pitchDeg:35,distance:8,fov:48},{id:`low25`,label:`낮게 25°(풍경)`,pitchDeg:25,distance:9,fov:50},{id:`mid45`,label:`추천 45°(지금 기본)`,pitchDeg:45,distance:12,fov:40},{id:`far45`,label:`멀리 45°`,pitchDeg:45,distance:16,fov:38},{id:`high55`,label:`높게 55°(건설)`,pitchDeg:55,distance:14,fov:38}],N=`island-camera-preset`,P={pitchDeg:[3,89],distance:[1.5,80]},F=`island-camera-view`,I=(e,t)=>({pitchDeg:Math.min(P.pitchDeg[1],Math.max(P.pitchDeg[0],e)),distance:Math.min(P.distance[1],Math.max(P.distance[0],t))}),L={distance:[1.5,80,.5],pitchDeg:[3,89,1],yawDeg:[0,359,1],fov:[10,120,1],lookHeight:[0,10,.1]};function R(e,t,n){let r=n*Math.PI/180,i=Math.cos(r),a=Math.sin(r);return{x:e*i+t*a,z:-e*a+t*i}}function z(e){let t=e.pitchDeg*Math.PI/180,n=e.yawDeg*Math.PI/180,r=e.distance*Math.cos(t);return{x:r*Math.sin(n),y:e.distance*Math.sin(t),z:r*Math.cos(n)}}function B(e){let t=e=>Math.round(e*100)/100;return JSON.stringify({distance:t(e.distance),pitchDeg:t(e.pitchDeg),yawDeg:t(e.yawDeg),fov:t(e.fov),lookHeight:t(e.lookHeight)})}var V=(e,t,n)=>t<.98&&n*t<(e?2.3:1.8);function H(){let e=new a,n=new t,r=new t,i=new t,o=new t,s=[],c=[[0,0],[-1,-1],[-1,1],[1,-1],[1,1]],l=1;return{get fraction(){return l},reset(){l=1},update(t,a,u,d,f){n.subVectors(t.position,a);let p=n.length();if(p<.001)return;n.divideScalar(p),r.set(n.z,0,-n.x),r.lengthSq()<1e-6?r.set(1,0,0):r.normalize(),i.crossVectors(n,r).normalize();let m=t.near*Math.tan(t.fov*Math.PI/360)+.2,h=(m-.2)*t.aspect+.2,g=p;if(f){let e=Math.max(.6,p/14);for(let[t,s]of c){o.copy(a).addScaledVector(r,t*h).addScaledVector(i,s*m);let c=e=>o.y+n.y*e-f(o.x+n.x*e,o.z+n.z*e),l=!1,u=0;for(let t=0,n=g+.3;t<=n;t=t>=n?n+1:Math.min(n,t+e)){if(c(t)>0){l=!0,u=t;continue}if(!l)continue;let e=u,n=t;for(let t=0;t<4;t++){let t=(e+n)/2;c(t)>0?e=t:n=t}g=Math.min(g,Math.max(.05,e-.3));break}}}else for(let t of u)for(let[l,u]of c){o.copy(a).addScaledVector(r,l*h).addScaledVector(i,u*m),e.set(o,n),e.near=0,e.far=g+.3,s.length=0,t.terrain?.raycast(e,s);for(let e of s)g=Math.min(g,Math.max(.05,e.distance-.3))}l=Math.min(g/p,l+(1-l)*(1-Math.exp(-4*Math.max(0,d)))),t.position.copy(a).addScaledVector(n,p*l),t.lookAt(a)}}}export{F as a,H as c,R as d,A as f,N as i,B as l,L as n,z as o,y as p,M as r,I as s,j as t,V as u};