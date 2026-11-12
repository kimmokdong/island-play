import{m as e}from"./sky-CCoD_Mgt.js";import{$ as t,At as n,Bn as r,Er as i,Et as a,Jn as o,K as s,O as c,Q as l,Rn as u,Tr as d,Tt as f,W as p,Wt as m,Z as h,Zn as g,_,dt as v,ft as y,gr as b,hr as x,k as S,l as C,nn as w,q as T,rr as E,s as D,u as O,ur as k,v as A,wr as j,zt as M}from"./three.core-0f7uhkgs.js";import{t as N}from"./three.module-BKO4KJp_.js";import{a as P,c as F,d as I}from"./view-gate-DFjjTm6H.js";var L={low:{pixelRatio:.92,antialias:!1,mapScale:2,lod:[42,109],nearStep:2,detailNormal:!1,triplanar:!0,grass:{near:23,nearCell:.78,nearQuads:1,far:38,farCell:1.4},treeLod:[27,95],leafCards:78,farLeafCards:28,decoReach:31,shadow:{size:1024,reach:20},caustics:!0,waterDetail:1,view:290},medium:{pixelRatio:1,antialias:!1,mapScale:1,lod:[48,128],nearStep:2,detailNormal:!0,triplanar:!0,grass:{near:26,nearCell:.62,nearQuads:2,far:52,farCell:1.25},treeLod:[34,120],leafCards:170,farLeafCards:46,decoReach:40,shadow:{size:1024,reach:42},caustics:!0,waterDetail:1,view:340},high:{pixelRatio:1,antialias:!0,mapScale:1,lod:[64,160],nearStep:1,detailNormal:!0,triplanar:!0,grass:{near:34,nearCell:.48,nearQuads:2,far:84,farCell:.95},treeLod:[50,170],leafCards:170,farLeafCards:46,decoReach:64,shadow:{size:2048,reach:72},caustics:!0,waterDetail:2,view:460}},R=[`기존 게임`,`1 지형`,`2 표면`,`3 식생`,`4 통합`,`5 바다`,`6 조명`],z=e=>({baseline:e===0,newMaterial:e>=2,grassCards:e>=3,integration:e>=4,newWater:e>=5,atmosphere:e>=6}),B={play:{label:`플레이 시점`,pos:[0,0,0],look:[0,0,0],fov:48,follow:[-236,56]},meadow:{label:`들판 눈높이`,pos:[-208,7.4,44],look:[-268,13,-20],fov:55},hill:{label:`언덕과 숲`,pos:[-160,18,60],look:[-262,12,-28],fov:55},coast:{label:`해안`,pos:[-296,4.2,150],look:[-248,7,40],fov:55},over:{label:`바다 내려보기`,pos:[-262,27,24],look:[-300,0,135],fov:60},path:{label:`오솔길`,pos:[-226.5,6.2,66],look:[-258,7.2,22],fov:55},shore:{label:`물가`,pos:[-268,3,92],look:[-238,.2,112],fov:55},edge:{label:`숲 가장자리`,pos:[-180,9,-18],look:[-204,6,-66],fov:55}};function V(e=location.search){let t=new URLSearchParams(e),n=Math.max(0,Math.min(R.length-1,Number(t.get(`stage`)??R.length-1)|0)),r=t.get(`q`),i=r===`lowplus`?`low`:r===`low`||r===`medium`||r===`high`?r:H();return{stage:n,quality:i,qualityPicked:r===i,camera:B[t.get(`cam`)??``]?t.get(`cam`):`hill`,hour:Number(t.get(`hour`)??10),freeze:t.get(`freeze`)===`1`,panel:t.get(`panel`)!==`0`}}function H(){try{let e=document.createElement(`canvas`).getContext(`webgl2`),t=e?.getExtension(`WEBGL_debug_renderer_info`),n=t?String(e.getParameter(t.UNMASKED_RENDERER_WEBGL)):``,r=navigator.hardwareConcurrency??2;return/UHD Graphics 6\d\d|HD Graphics [456]\d\d|Mali|PowerVR|Adreno [1-5]|SwiftShader|llvmpipe/i.test(n)||r<=4?`low`:/NVIDIA|RTX|GTX|Radeon|Arc|Apple M/i.test(n)?`high`:`medium`}catch{return`low`}}async function U(e,t){let n=await fetch(`./assets/${e}/${t}`);if(!n.ok||!n.body)throw Error(`${t}을 받지 못했어요.`);return new Response(n.body.pipeThrough(new DecompressionStream(`gzip`))).arrayBuffer()}var W=1024;function G(e,t){let n=t/2,r=new Uint8Array(n*n*4);for(let i=0;i<n;i++)for(let a=0;a<n;a++)for(let o=0;o<4;o++){let s=(i*2*t+a*2)*4+o;r[(i*n+a)*4+o]=e[s]+e[s+4]+e[s+t*4]+e[s+t*4+4]+2>>2}return r}function K(e,t){let n=new c(e,t,t,w,b);return n.wrapS=n.wrapT=_,n.magFilter=v,n.minFilter=y,n.generateMipmaps=!0,n.needsUpdate=!0,n}async function ee(e,t=`lab`){let n=performance.now(),[r,a,o,s,l]=await Promise.all([U(t,`height.dat`),U(t,`map-a.dat`),U(t,`map-b.dat`),U(t,`map-c.dat`),fetch(`./assets/${t}/scatter.json`).then(e=>e.json())]),d=new Uint16Array(r),f=Math.round(Math.sqrt(d.length)),p=new Float32Array(f*f),m=new Uint16Array(f*f);for(let e=0;e<d.length;e++)p[e]=d[e]/65535*128-16,m[e]=S.toHalfFloat(p[e]);let h=new c(m,f,f,u,T);h.magFilter=h.minFilter=v,h.needsUpdate=!0;let g=t===`lab`?e.mapScale:1,_=W/g,y=e=>g===2?G(new Uint8Array(e),W):new Uint8Array(e),b=K(y(a),_),x=K(y(o),_),C=K(y(s),_),w=l.region,E=(e,t)=>{let n=Math.max(0,Math.min(f-1.001,(e-w.x)/w.size*(f-1))),r=Math.max(0,Math.min(f-1.001,(t-w.z)/w.size*(f-1))),i=Math.floor(n),a=Math.floor(r),o=n-i,s=r-a,c=a*f+i;return p[c]*(1-o)*(1-s)+p[c+1]*o*(1-s)+p[c+f]*(1-o)*s+p[c+f+1]*o*s},D=new Uint8Array(a);return{region:w,heightN:f-1,heightTex:h,mapA:b,mapB:x,mapC:C,scatter:l,heightAt:E,grassAt:(e,t)=>D[(Math.floor((t-w.z)*2)*W+Math.floor((e-w.x)*2))*4+1]/255,inside:(e,t)=>e>=w.x&&t>=w.z&&e<=w.x+w.size&&t<=w.z+w.size,regionVec:new i(w.x,w.z,1/w.size,w.size),loadMs:performance.now()-n}}function te(){let e=new Uint8Array(262144),t=(e,t)=>{let n=new Float32Array(e*e),r=t*7919+13;for(let e=0;e<n.length;e++)r=r*16807%2147483647,n[e]=r/2147483647;return n},n=(e,t,n,r)=>{let i=e/256*n,a=t/256*n,o=Math.floor(i),s=Math.floor(a),c=i-o,l=a-s,u=c*c*(3-2*c),d=l*l*(3-2*l),f=(e,t)=>r[(t+n)%n*n+(e+n)%n];return f(o,s)*(1-u)*(1-d)+f(o+1,s)*u*(1-d)+f(o,s+1)*(1-u)*d+f(o+1,s+1)*u*d},i=[[4,8,16],[12,24,48],[32,64,128],[6,12,24]].map((e,n)=>e.map((e,r)=>({p:e,g:t(e,n*10+r+1),w:1/2**r})));for(let t=0,r=0;t<256;t++)for(let a=0;a<256;a++)for(let o=0;o<4;o++,r++){let s=0,c=0;for(let e of i[o])s+=n(a,t,e.p,e.g)*e.w,c+=e.w;e[r]=Math.round(Math.max(0,Math.min(1,(s/c-.5)*1.7+.5))*255)}let a=new c(e,256,256,w,b);return a.wrapS=a.wrapT=r,a.magFilter=v,a.minFilter=y,a.generateMipmaps=!0,a.needsUpdate=!0,a}function ne(){let e=256/10,t=new Float32Array(65536),n=new Uint8Array(262144),i=9173,a=()=>(i=i*16807%2147483647)/2147483647,o=Array.from({length:40},(t,n)=>({x:(n%10+.2+a()*.6)*e,y:(Math.floor(n/10)+n%10%2*.5+a()*.5)*64,tone:.72+a()*.28})),s=Array.from({length:64},a);for(let n=0;n<256;n++)for(let r=0;r<256;r++){let i=1e9,a=1e9,c=1,l=Math.floor(r/e),u=Math.floor(n/64);for(let t=-2;t<=2;t++)for(let s=-1;s<=1;s++){let d=o[(u+t+8)%4*10+(l+s+10)%10],f=Math.abs(d.x-r),p=Math.abs(d.y-n);f=Math.min(f,256-f)/e,p=Math.min(p,256-p)/64;let m=Math.hypot(f,p*.8);m<i?(a=i,i=m,c=d.tone):m<a&&(a=m)}let d=Math.min(1,(a-i)/.22),f=d*d*(3-2*d),p=r/256*64,m=s[Math.floor(p)%64],h=m+(s[(Math.floor(p)+1)%64]-m)*(p%1);t[n*256+r]=f*c*(.82+h*.18)*(1-i*.18)}let l=(e,n)=>t[(n+256)%256*256+(e+256)%256];for(let e=0;e<256;e++)for(let r=0;r<256;r++){let i=(e*256+r)*4,a=l(r+1,e)-l(r-1,e),o=l(r,e+1)-l(r,e-1);n[i]=Math.round(Math.max(0,Math.min(1,t[e*256+r]))*255),n[i+1]=Math.max(0,Math.min(255,127.5-a*300)),n[i+2]=Math.max(0,Math.min(255,127.5-o*300)),n[i+3]=255}let u=new c(n,256,256,w,b);return u.wrapS=u.wrapT=r,u.magFilter=v,u.minFilter=y,u.generateMipmaps=!0,u.anisotropy=4,u.needsUpdate=!0,u}function re(){let e=new Uint8Array(262144),t=[],n=4242,i=()=>(n=n*16807%2147483647)/2147483647;for(let e=0;e<26;e++){let n=1+Math.floor(i()*3+e/3.2),r=i()*Math.PI*2;t.push([Math.round(Math.cos(r)*n*2),Math.round(Math.sin(r)*n*2),i()*6.28,1/(1+n*.6)])}for(let n=0;n<256;n++)for(let r=0;r<256;r++){let i=0,a=0;for(let[e,o,s,c]of t){let t=(e*r+o*n)/256*Math.PI*2+s,l=Math.cos(t)*Math.exp(Math.sin(t)*.9-.9);i+=e*l*c,a+=o*l*c}let o=(n*256+r)*4;e[o]=Math.max(0,Math.min(255,127.5+i*9)),e[o+1]=Math.max(0,Math.min(255,127.5+a*9)),e[o+2]=255,e[o+3]=255}let a=new c(e,256,256,w,b);return a.wrapS=a.wrapT=r,a.magFilter=v,a.minFilter=y,a.generateMipmaps=!0,a.needsUpdate=!0,a}async function ie(e,t){let n=new k,i=t??await Promise.all([`sand`,`grass`,`dirt`,`rock`].map(e=>n.loadAsync(`./assets/textures/terrain/${e}-v2-512.webp`))),a=[],s=[],l=document.createElement(`canvas`);l.width=l.height=512;let u=l.getContext(`2d`,{willReadFrequently:!0});for(let t of i){t.wrapS=t.wrapT=r,t.colorSpace=o,t.generateMipmaps=!0,t.minFilter=y,t.magFilter=v,t.anisotropy=4,u.drawImage(t.image,0,0,512,512);let n=u.getImageData(0,0,512,512).data,i=[0,0,0];for(let e=0;e<n.length;e+=4)for(let t=0;t<3;t++)i[t]+=(n[e+t]/255)**2.2;if(a.push(i.map(e=>e/262144)),!e)continue;let l=new Float32Array(262144),d=new Uint8Array(1048576);for(let e=0;e<l.length;e++)l[e]=(n[e*4]*.3+n[e*4+1]*.5+n[e*4+2]*.2)/255;let f=(e,t)=>l[(t+512)%512*512+(e+512)%512];for(let e=0;e<512;e++)for(let t=0;t<512;t++){let n=f(t+1,e)-f(t-1,e)+(f(t+2,e)-f(t-2,e))*.5,r=f(t,e+1)-f(t,e-1)+(f(t,e+2)-f(t,e-2))*.5,i=(e*512+t)*4;d[i]=Math.max(0,Math.min(255,127.5-n*170)),d[i+1]=Math.max(0,Math.min(255,127.5-r*170)),d[i+2]=Math.round(l[e*512+t]*255),d[i+3]=255}let p=new c(d,512,512,w,b);p.wrapS=p.wrapT=r,p.magFilter=v,p.minFilter=y,p.generateMipmaps=!0,p.anisotropy=4,p.needsUpdate=!0,s.push(p)}return{albedo:i,normals:s,average:a}}function ae(e,t){return{uHeight:{value:e.heightTex},uMapA:{value:e.mapA},uMapB:{value:e.mapB},uMapC:{value:e.mapC},uNoise:{value:t},uRegion:{value:e.regionVec},uTime:{value:0},uWindDir:{value:new j(.86,.5)},uSunDir:{value:new d(.5,.73,.47)},uSunColor:{value:new A(1,1,1)},uHemiSky:{value:new A(1,1,1)},uHemiGround:{value:new A(.5,.5,.5)},uAirColor:{value:new A(.6,.75,.85)},uAirSun:{value:new A(1,.9,.75)},uAirDensity:{value:.00135},uCloud:{value:0},uGrassBase:{value:new A(.3,.45,.15)},uCheap:{value:!1},uPlayer:{value:new d(1e5,0,1e5)},uHeightN:{value:e.heightN},uAlpineLevel:{value:1e5},uAlpineZ:{value:0},uAlpineTone:{value:new A(1,1,1)},uJungle:{value:new i(0,0,0,0)},uJungleTone:{value:new A(1,1,1)},uTide:{value:0},uTideBox:{value:new i(0,0,0,0)},uTideMask:{value:t}}}var q=`
  uniform sampler2D uHeight, uMapA, uMapB, uMapC, uNoise;
  uniform vec4 uRegion; uniform float uTime; uniform vec2 uWindDir; uniform float uCloud;
  uniform vec3 uSunDir, uSunColor, uHemiSky, uHemiGround, uAirColor, uAirSun; uniform float uAirDensity; uniform vec3 uGrassBase;
  uniform float uHeightN, uAlpineLevel, uAlpineZ; uniform vec3 uAlpineTone; uniform vec4 uJungle; uniform vec3 uJungleTone;
  uniform float uTide; uniform vec4 uTideBox; uniform sampler2D uTideMask;
  // 썰물 길이 잠긴 깊이(m). 평소에는 표본을 읽지 않는다.
  float tideSink(vec2 p) {
    if (uTide <= 0.) return 0.;
    vec2 q = (p - uTideBox.xy) * uTideBox.zw;
    return q.x < 0. || q.y < 0. || q.x > 1. || q.y > 1. ? 0. : uTide * textureLod(uTideMask, q, 0.).r;
  }
  vec2 regionUv(vec2 p) { return (p - uRegion.xy) * uRegion.z; }
  vec2 heightUv(vec2 uv) { return uv * (uHeightN / (uHeightN + 1.)) + .5 / (uHeightN + 1.); }
  // 정글의 짙은 녹색: 바닥·풀·나무·덤불이 같은 값을 쓴다. 실험장은 톤이 흰색이라 그대로다.
  vec3 jungleTint(vec3 c, vec3 world) {
    float r = length((world.xz - uJungle.xy) * uJungle.zw);
    return c * mix(vec3(1.), uJungleTone, 1. - smoothstep(.86, 1.06, r));
  }
  // 게임 고원의 차가운 풀색(HIGHLAND-COLOR-1). 실험장은 uAlpineLevel이 커서 언제나 원래 색이다.
  vec3 alpineTint(vec3 c, vec3 world) {
    float a = smoothstep(uAlpineLevel - 2., uAlpineLevel + 1., world.y) * step(world.z, uAlpineZ);
    return jungleTint(mix(c, mix(vec3(dot(c, vec3(.3, .5, .2))), c, .45) * uAlpineTone, a), world);
  }
  // 푸른 초록 ↔ 마른 황록. 땅과 풀이 같은 함수를 써서 경계가 사라진다.
  vec3 meadowTint(float dry, float n) {
    float t = clamp(dry + (n - .5) * .55, 0., 1.);
    vec3 lush = vec3(.68, .84, .75), mid = vec3(.84, .86, .76), parched = vec3(1.05, .93, .72);
    return t < .5 ? mix(lush, mid, t * 2.) : mix(mid, parched, t * 2. - 1.);
  }
  // 구름 그늘: 큰 무늬가 땅 위로 흘러간다.
  float cloudShade(vec2 p) {
    #ifdef LAB_CHEAP
      float c = texture2D(uNoise, p * .0021 + uWindDir * uTime * .0011).a;
    #else
      float c = texture2D(uNoise, p * .0021 + uWindDir * uTime * .0011).a * .6 + texture2D(uNoise, p * .0057 + uWindDir * uTime * .0017).r * .4;
    #endif
    return mix(1., 1. - smoothstep(.5, .72, c) * .46, uCloud);
  }
  // 공기 원근: 고도가 낮을수록 짙고, 해 쪽은 따뜻하게 번진다.
  vec4 airAt(vec3 world, vec3 eye) {
    vec3 ray = world - eye; float d = length(ray); vec3 dir = ray / max(d, .001);
    float avgY = max(0., (world.y + eye.y) * .5), amount = 1. - exp(-d * uAirDensity * exp(-avgY * .018));
    return vec4(mix(uAirColor, uAirSun, pow(max(dot(dir, uSunDir), 0.), 7.) * .55), amount);
  }
  vec3 airPerspective(vec3 color, vec3 world, vec3 eye) { vec4 air = airAt(world, eye); return mix(color, air.rgb, air.a); }
`,J=(e,t)=>{Object.assign(e,t)},Y=64;function oe(e){let t=Math.round(Y/e),n=(t+1)**2,r=n+4*(t+1),i=new Float32Array(r*3),a=new Float32Array(r),o=new Uint32Array(6*t*t+24*t),s=0;for(let n=0;n<=t;n++)for(let r=0;r<=t;r++){let a=n*(t+1)+r;if(i.set([r*e,0,n*e],a*3),r<t&&n<t){let e=a,n=a+t+1;o.set([e,n,e+1,e+1,n,n+1],s),s+=6}}let c=n;for(let[e,n]of[[0,1],[t,t+1],[t*(t+1)+t,-1],[t*(t+1),-(t+1)]])for(let r=0;r<=t;r++){let l=e+r*n;i.set([i[l*3],0,i[l*3+2]],c*3),a[c]=1,r<t&&(o.set([l,l+n,c,c,l+n,c+1],s),s+=6),c++}let l=new O;return l.setAttribute(`position`,new C(i,3)),l.setAttribute(`aSkirt`,new C(a,1)),l.setIndex(new C(o,1)),l}function se(e,r,i,a,o){let c=new s,l=new n;l.defines={...l.defines??{},...i.newMaterial?{LAB_MATERIAL:1}:{},...r.detailNormal&&i.newMaterial?{LAB_DETAIL:1}:{},...r.triplanar?{LAB_TRIPLANAR:1}:{},...i.atmosphere?{LAB_AIR:1}:{},...i.newWater?{LAB_SEA:1}:{},...r.caustics?{LAB_CAUSTICS:1}:{},...r.mapScale===2?{LAB_CHEAP:1}:{}},l.onBeforeCompile=e=>{J(e.uniforms,a),o.albedo.forEach((t,n)=>{e.uniforms[`uTile${n}`]={value:t}}),o.normals.forEach((t,n)=>{e.uniforms[`uTileN${n}`]={value:t}}),e.vertexShader=`${q}\nattribute float aSkirt; varying vec3 vLabWorld;\n#ifdef LAB_CHEAP\nvarying vec4 vLabAir;\n#endif\n${e.vertexShader}`.replace(`#include <begin_vertex>`,`
        vec3 transformed = vec3(position);
        vec2 labXZ = (instanceMatrix * vec4(position, 1.)).xz;
        transformed.y = texture2D(uHeight, heightUv(regionUv(labXZ))).r - aSkirt * 3. - tideSink(labXZ);
        vLabWorld = vec3(labXZ, transformed.y).xzy;
        #ifdef LAB_CHEAP
          vLabAir = airAt(vLabWorld, cameraPosition);
        #endif`),e.fragmentShader=`${q}\nvarying vec3 vLabWorld;
      #ifdef LAB_CHEAP
        varying vec4 vLabAir;
        #define LAB_AIR_MIX(c) mix(c, vLabAir.rgb, vLabAir.a)
      #else
        #define LAB_AIR_MIX(c) airPerspective(c, vLabWorld, cameraPosition)
      #endif
      uniform sampler2D uTile0, uTile1, uTile2, uTile3;
      #ifdef LAB_DETAIL
      uniform sampler2D uTileN1, uTileN2, uTileN3, uTileN0;
      #endif
      vec3 labWorldNormal; float labAO = 1.;
      float labLuma(vec3 c) { return dot(c, vec3(.3, .5, .2)); }
      \n${e.fragmentShader}`.replace(`#include <color_fragment>`,`
        vec2 labUv = regionUv(vLabWorld.xz);
        vec4 mA = texture2D(uMapA, labUv), mB = texture2D(uMapB, labUv);
        vec2 nxz = mB.xy * 2. - 1.; labWorldNormal = normalize(vec3(nxz.x, sqrt(max(.04, 1. - dot(nxz, nxz))), nxz.y));
        vec2 labP = vLabWorld.xz;
        #ifndef LAB_MATERIAL
          // 1단계: 게임 그림·같은 크기 그대로(형태만 비교).
          vec2 oldUv = labP / 2.4;
          diffuseColor.rgb *= texture2D(uTile0, oldUv).rgb * mA.r + texture2D(uTile1, oldUv).rgb * mA.g + texture2D(uTile2, oldUv).rgb * mA.b + texture2D(uTile3, oldUv).rgb * mA.a;
        #else
          // 저사양: 5m 넘게 깊은 바닥은 물이 거의 다 가려 물빛과 같은 색만 준다(질감·빛그물 표본을 읽지 않는다).
          #ifdef LAB_CHEAP
          if (vLabWorld.y < -5.) diffuseColor.rgb = vec3(.1, .48, .48); else
          #endif
          {
          vec4 mC = texture2D(uMapC, labUv);
          float labDist = length(vViewPosition);
          float nearT = 1. - smoothstep(14., 58., labDist);
          // 큰 얼룩(수십 m)·중간(수 m): 반복을 지우고 초원에 군락을 만든다.
          float macro = texture2D(uNoise, labP * .0061).r, mid = texture2D(uNoise, labP * .037).g;
          #ifdef LAB_CHEAP
            float fine = mid; // 저사양: 표본을 아낀다
          #else
            float fine = texture2D(uNoise, labP * .19).b;
          #endif
          // 두 크기 표본: 가까이 3.1m, 멀리 회전한 13m. 멀리 있을수록 큰 표본을 믿어 격자 반복이 안 보인다.
          #ifdef LAB_CHEAP
            // 저사양: 재질마다 표본 1회. 반복은 큰 얼룩(macro·mid)이 가린다.
            vec2 uvN = labP / 4.3, dxN = dFdx(uvN), dyN = dFdy(uvN);
            #define TILE(tex) textureGrad(tex, uvN, dxN, dyN).rgb
          #else
            vec2 uvN = labP / 3.1, uvF = mat2(.8, -.6, .6, .8) * labP / 13.3 + vec2(.37, .61);
            vec2 dxN = dFdx(uvN), dyN = dFdy(uvN), dxF = dFdx(uvF), dyF = dFdy(uvF);
            #define TILE(tex) mix(textureGrad(tex, uvF, dxF, dyF).rgb, textureGrad(tex, uvN, dxN, dyN).rgb, nearT * .75 + .25)
          #endif
          vec3 cSand = mA.r > .004 ? TILE(uTile0) : vec3(.6), cGrass = mA.g > .004 ? TILE(uTile1) : vec3(.3), cDirt = mA.b > .004 ? TILE(uTile2) : vec3(.3);
          // 바위: 비탈에서 늘어나지 않게 가장 넓게 보이는 면으로 투영을 바꾼다(표본 1회, 줄무늬 층을 더한다).
          vec3 cRock = vec3(.4);
          if (mA.a > .004) {
            #ifdef LAB_TRIPLANAR
              vec3 absN = abs(labWorldNormal); vec2 rockUv = (absN.y > .62 ? labP : absN.x > absN.z ? vec2(labP.y, vLabWorld.y * 1.25) : vec2(labP.x, vLabWorld.y * 1.25)) / 7.4;
            #else
              vec2 rockUv = labP / 7.4;
            #endif
            cRock = textureGrad(uTile3, rockUv, dFdx(rockUv), dFdy(rockUv)).rgb;
            float strata = sin(vLabWorld.y * 4.2 + labP.x * .21 + mid * 5.) * .5 + .5;
            cRock *= mix(.86, 1.08, strata) * mix(vec3(.96, .97, 1.02), vec3(1.07, 1.0, .9), macro);
          }
          // 높이 혼합: 그림의 밝은(솟은) 부분이 먼저 올라와 재질 경계가 맞물린다. 직선 번짐이 사라진다.
          vec4 lum = vec4(labLuma(cSand), labLuma(cGrass) * 1.4, labLuma(cDirt) * 1.25, labLuma(cRock));
          vec4 wgt = mA + (lum - .32 + (fine - .5) * .5) * .42 * step(.004, mA);
          float top = max(max(wgt.x, wgt.y), max(wgt.z, wgt.w)) - .2;
          wgt = max(wgt - top, 0.) * step(.004, mA); wgt /= max(dot(wgt, vec4(1.)), .0001);
          // 풀 땅: 같은 색 함수로 물들이고, 바람 물결이 느리게 지나간다.
          vec3 tint = meadowTint(mC.b, macro * .7 + mid * .3);
          vec2 gustUv = labP * .013 - uWindDir * uTime * .055;
          float gust = texture2D(uNoise, gustUv).g;
          vec3 grassCol = alpineTint(cGrass * tint * (.82 + mid * .36) * (1. + (gust - .5) * .16), vLabWorld);
          // 흙: 물길은 더 짙고 축축하게. 모래: 큰 물결·젖은 띠.
          vec3 dirtCol = mix(vec3(labLuma(cDirt)), cDirt, .72) * mix(vec3(1.2, 1.12, .98), vec3(.72, .68, .6), mB.a) * (.85 + macro * .3);
          float sdf = mC.a * (255. / 4.) - 32.;
          vec3 sandCol = cSand * (.93 + mid * .14);
          #ifdef LAB_SEA
            float swash = sin(labP.x * .07 + labP.y * .05 + uTime * .55) * .5 + sin(labP.x * .19 - labP.y * .13 - uTime * .37) * .22 + (mid - .5) * .9;
            float line = 1.05 + swash * .85;
            float wet = (1. - smoothstep(line, line + 2.4, sdf)) * step(0., sdf + 1.);
            sandCol *= mix(vec3(1.), vec3(.60, .60, .62), wet);
            sandCol = mix(sandCol, vec3(.86, .92, .90), (1. - smoothstep(0., .28, abs(sdf - line + .12))) * smoothstep(.34, .62, fine * .6 + mid * .6) * .75);
          #endif
          diffuseColor.rgb *= sandCol * wgt.x + grassCol * wgt.y + dirtCol * wgt.z + cRock * wgt.w;
          #ifdef LAB_SEA
            // 물속: 해저에 빛그물을 그리고, 물 층이 붉은빛부터 먹는다(수면은 위에서 비칠 뿐).
            if (vLabWorld.y < .02) {
              float under = max(0., -vLabWorld.y);
              #ifdef LAB_CAUSTICS
                vec2 cp = labP * .34 + texture2D(uNoise, labP * .024 + uTime * .006).rg * 2.4;
                float c1 = texture2D(uNoise, cp * .22 + vec2(uTime * .017, 0.)).b, c2 = texture2D(uNoise, cp * .17 - vec2(0., uTime * .021)).b;
                float web = pow(1. - abs(c1 - c2) * 2.2, 7.);
                diffuseColor.rgb += vec3(.34, .42, .34) * clamp(web, 0., 1.) * smoothstep(.1, 1.2, under) * exp(-under * .45);
              #endif
              diffuseColor.rgb *= exp(-vec3(.62, .135, .074) * under * 1.2);
              diffuseColor.rgb = mix(diffuseColor.rgb, vec3(.10, .50, .50), 1. - exp(-under * .62));
            }
          #endif
          // 잔 법선: 그림 밝기에서 만든 지도. 멀리서는 없앤다.
          #ifdef LAB_DETAIL
            if (nearT > .01) {
              vec2 d = vec2(0.);
              if (wgt.y > .05) d += (texture2D(uTileN1, uvN).rg * 2. - 1.) * wgt.y * 1.1;
              if (wgt.z > .05) d += (texture2D(uTileN2, uvN).rg * 2. - 1.) * wgt.z * 1.25;
              if (wgt.w > .05) d += (texture2D(uTileN3, labP / 7.4).rg * 2. - 1.) * wgt.w * 2.0;
              if (wgt.x > .05) d += (texture2D(uTileN0, uvN).rg * 2. - 1.) * wgt.x * .8;
              labWorldNormal = normalize(labWorldNormal + vec3(d.x, 0., d.y) * nearT);
            }
          #endif
          // 지표 AO: 지형 오목·나무 밑 + 풀 자리 사이 잔 그늘.
          labAO = mix(1., mB.b, .88) * (1. - wgt.y * (1. - fine) * .16);
          }
        #endif
      `).replace(`#include <normal_fragment_maps>`,`normal = normalize((viewMatrix * vec4(labWorldNormal, 0.)).xyz);`).replace(`#include <lights_fragment_end>`,`#include <lights_fragment_end>
        reflectedLight.indirectDiffuse *= labAO; reflectedLight.directDiffuse *= mix(1., labAO, .5);
        #ifdef LAB_AIR
          reflectedLight.directDiffuse *= cloudShade(vLabWorld.xz);
        #endif`).replace(`#include <fog_fragment>`,`
        #ifdef LAB_AIR
          gl_FragColor.rgb = LAB_AIR_MIX(gl_FragColor.rgb);
        #else
          #include <fog_fragment>
        #endif`),i.atmosphere&&(e.fragmentShader=e.fragmentShader.replace(`#include <tonemapping_fragment>`,`gl_FragColor.rgb = LAB_AIR_MIX(gl_FragColor.rgb);
#include <tonemapping_fragment>`).replace(`gl_FragColor.rgb = LAB_AIR_MIX(gl_FragColor.rgb);
        #else`,`#else`))},l.customProgramCacheKey=()=>`lab-terrain-${JSON.stringify(l.defines)}`;let u=[r.nearStep,Math.max(4,r.nearStep*2),8],m=Math.round(e.region.size/Y),h=Array.from({length:m*m},(t,n)=>({x:e.region.x+n%m*Y,z:e.region.z+Math.floor(n/m)*Y})),g=u.map(e=>{let n=new t(oe(e),l,h.length);return n.frustumCulled=!1,n.receiveShadow=!0,n.castShadow=!1,c.add(n),n}),_=new D,v=new p,y=new f,b=new f,x=new d,S=new d,C=-1;return{root:c,meshes:g,update(e){y.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),v.setFromProjectionMatrix(y);let t=[0,0,0],n=0;for(let i=0;i<h.length;i++){let a=h[i];if(x.set(a.x,-16,a.z),S.set(a.x+Y,120,a.z+Y),_.set(x,S),!v.intersectsBox(_))continue;let o=Math.hypot(Math.max(a.x-e.position.x,0,e.position.x-a.x-Y),Math.max(a.z-e.position.z,0,e.position.z-a.z-Y)),s=o<r.lod[0]?0:o<r.lod[1]?1:2;b.makeTranslation(a.x,0,a.z),g[s].setMatrixAt(t[s]++,b),n=Math.imul(n,31)+i*3+s|0}n!==C&&(C=n,g.forEach((e,n)=>{e.count=t[n],e.visible=t[n]>0,e.instanceMatrix.needsUpdate=!0}))}}}var X={"tree.standing":`standing-a`,"tree.standing.b":`standing-b`,"tree.standing.c":`standing-c`,"tree.pine":`pine`,"tree.palm":`palm`,"tree.camellia":`camellia`,"tree.big":`big`},ce=Object.values(X);function Z(e,t,n,r,i,a,o=[0,0,1,1],s){let c=e.getAttribute(`position`),l=e.getAttribute(`color`),u=e.index,f=(u?u.count:c.count)/3,p=new Float32Array(f),m=new d,h=new d,g=new d,_=(e,t)=>u?u.getX(e*3+t):e*3+t,v=0;for(let e=0;e<f;e++){m.fromBufferAttribute(c,_(e,0)),h.fromBufferAttribute(c,_(e,1)),g.fromBufferAttribute(c,_(e,2));let t=_(e,0);(!l||l.getY(t)>l.getX(t)*1.05&&l.getY(t)>l.getZ(t))&&(v+=h.sub(m).cross(g.sub(m)).length()),p[e]=v}let y=1234567+t,b=()=>(y=y*16807%2147483647)/2147483647,x=new Float32Array(t*12),S=new Float32Array(t*12),w=new Float32Array(t*12),T=new Float32Array(t*16),E=new Float32Array(t*8),D=new Uint16Array(t*6);for(let e=0;e<t;e++){let t=0,u=f-1,d=b()*v;for(;t<u;){let e=t+u>>1;p[e]<d?t=e+1:u=e}let m=_(t,0),h=_(t,1),g=_(t,2),y=b(),C=b();y+C>1&&(y=1-y,C=1-C);let O=1-y-C,k=c.getX(m)*O+c.getX(h)*y+c.getX(g)*C,A=c.getY(m)*O+c.getY(h)*y+c.getY(g)*C,j=c.getZ(m)*O+c.getZ(h)*y+c.getZ(g)*C,M=i*n*(.75+b()*.5),N=b()*6.283,P=l?l.getX(m)*O+l.getX(h)*y+l.getX(g)*C:.3,F=l?l.getY(m)*O+l.getY(h)*y+l.getY(g)*C:.5,I=l?l.getZ(m)*O+l.getZ(h)*y+l.getZ(g)*C:.2,L=Math.hypot(k-r.x,A-r.y,j-r.z)||1,R=s?s.cells[e%s.cells.length]:a,z=s?s.trims[R]:o,B=s?.cols??2,V=s?.rows??1,H=R%B,U=V-1-Math.floor(R/B);for(let t=0;t<4;t++){let n=e*4+t,i=z[t===1||t===2?2:0],a=z[t>=2?3:1];x.set([k,A,j],n*3),S.set([(k-r.x)/L,(A-r.y)/L,(j-r.z)/L],n*3),w.set([P,F,I],n*3),T.set([i*2-1,a*2-1,M,N],n*4),E.set([(H+i)/B,(U+a)/V],n*2)}D.set([e*4,e*4+1,e*4+2,e*4,e*4+2,e*4+3],e*6)}let k=new O;return k.setAttribute(`position`,new C(x,3)),k.setAttribute(`normal`,new C(S,3)),k.setAttribute(`color`,new C(w,3)),k.setAttribute(`aCard`,new C(T,4)),k.setAttribute(`uv`,new C(E,2)),k.setIndex(new C(D,1)),k}function le(e,t,n,r,i,a,o,s){let c=e.getAttribute(`position`),l=e.getAttribute(`color`),u=e.getAttribute(`normal`),f=e.index,p=[],m=[],h=[];for(let e=0;e<f.count;e+=3){let t=[f.getX(e),f.getX(e+1),f.getX(e+2)];if(t.every(e=>l.getY(e)>l.getX(e)))for(let e of t)p.push(c.getX(e),c.getY(e),c.getZ(e)),m.push(l.getX(e),l.getY(e),l.getZ(e)),h.push(u.getX(e),u.getY(e),u.getZ(e))}let g=new O;g.setAttribute(`position`,new C(new Float32Array(p),3)),g.setAttribute(`color`,new C(new Float32Array(m),3)),g.computeBoundingBox(),r.computeBoundingBox();let _=g.boundingBox,v=r.boundingBox,y=v.getCenter(new d),b=Math.max(.2,v.getSize(new d).length()*.5),x=Z(r,a,.44,y,b,i,s),S=(e,t)=>{let n=0,r=0;for(let i=t;i<e.length;i+=3)n+=e[i],r++;return n/Math.max(1,r)};for(let e=0;e<3;e++){let t=S(x.getAttribute(`color`).array,e)/Math.max(.001,S(m,e));for(let n=e;n<m.length;n+=3)m[n]*=t}let w=t.getAttribute(`position`),T=t.getAttribute(`color`),E=e=>[...e].sort((e,t)=>e-t)[e.length>>1]??0,D=1/0,k=-1/0;for(let e=0;e<w.count;e++)D=Math.min(D,w.getY(e)),k=Math.max(k,w.getY(e));let A=Math.max(k+n,_.min.y)+(_.max.y-_.min.y)*.12,j=D+n-.3,M=[];for(let e=0;e<o;e++){let t=j+(A-j)*e/(o-1),r=(A-j)/o,i=[],a=[];for(let e=0;e<w.count;e++)Math.abs(w.getY(e)+n-t)<r&&(i.push(w.getX(e)),a.push(w.getZ(e)));let s=M[e-1],c=i.length?E(i):s?.x??0,l=a.length?E(a):s?.z??0,u=i.length?E(i.map((e,t)=>Math.hypot(e-c,a[t]-l))):(s?.r??.3)*.8;M.push({x:c,y:t,z:l,r:Math.min(s?.r??1/0,Math.max(.2,u*1.25))})}let N=[0,1,2].map(e=>E(Array.from({length:T?.count??0},(t,n)=>e===0?T.getX(n):e===1?T.getY(n):T.getZ(n)))||[.2,.13,.08][e]),P=p.length/3,F=o*5,I=x.getAttribute(`position`).count,L=P+F+I,R=new Float32Array(L*3),z=new Float32Array(L*3),B=new Float32Array(L*3),V=new Float32Array(L*4),H=new Float32Array(L*2),U=new Float32Array(L),W=[];R.set(p),B.set(m),z.set(h),U.fill(.5,0,P);for(let e=0;e<P;e++)W.push(e);M.forEach((e,t)=>{for(let n=0;n<5;n++){let r=n/5*Math.PI*2,i=P+t*5+n;if(R.set([e.x+Math.cos(r)*e.r,e.y,e.z+Math.sin(r)*e.r],i*3),z.set([Math.cos(r),0,Math.sin(r)],i*3),B.set(N,i*3),U[i]=1,t<o-1){let e=P+t*5+(n+1)%5;W.push(i,i+5,e,e,i+5,e+5)}}});let G=P+F;R.set(x.getAttribute(`position`).array,G*3),z.set(x.getAttribute(`normal`).array,G*3),B.set(x.getAttribute(`color`).array,G*3),V.set(x.getAttribute(`aCard`).array,G*4),H.set(x.getAttribute(`uv`).array,G*2);for(let e=0,t=x.index;e<t.count;e++)W.push(t.getX(e)+G);let K=new O;return K.setAttribute(`position`,new C(R,3)),K.setAttribute(`normal`,new C(z,3)),K.setAttribute(`color`,new C(B,3)),K.setAttribute(`aCard`,new C(V,4)),K.setAttribute(`uv`,new C(H,2)),K.setAttribute(`aSolid`,new C(U,1)),K.setIndex(W),{geometry:K,center:y,radius:b}}var Q={"tree.standing":`tree.standing.far`,"tree.standing.b":`tree.standing.b.far`,"tree.standing.c":`tree.standing.c.far`,"tree.pine":`tree.pine.far`,"tree.palm":`tree.palm.far`,"tree.camellia":`tree.camellia.far`,"tree.big":`tree.big.far`};function $(t,n,r,i,a,o,s,c){let l=r.uCheap.value,u=!!c&&n===`core`&&!s,d=!!c&&(n===`trunk`?!!c.bark:n===`rock`?!!s&&!!c.rockNormal:!!s),f=t.clone();return f.defines={...f.defines??{},[`LAB_${n===`core`?`LEAF`:n.toUpperCase()}`]:1,...n===`core`?{LAB_CORE:1}:{},...i.atmosphere?{LAB_AIR:1}:{},...s?{[n===`rock`?`LAB_ROCK_TILE`:`LAB_CARD`]:1}:{},...l?{LAB_CHEAP:1}:{},...d?{LAB_RICH:1}:{},...u?{LAB_RICH_CORE:1}:{}},s&&n!==`rock`&&(f.vertexColors=!0),d&&s&&n!==`rock`&&c.smoothEdge&&(f.alphaToCoverage=!0),f.onBeforeCompile=e=>{J(e.uniforms,r),e.uniforms.uCenter={value:a},e.uniforms.uRadius={value:o},s&&(e.uniforms[n===`rock`?`uRockTile`:`uLeafAtlas`]={value:s}),d&&(e.uniforms.uBark={value:c.bark??null},e.uniforms.uRockTileN={value:c.rockNormal??null},e.uniforms.uCardScale={value:c.cardScale??1}),e.vertexShader=`${q}\nuniform vec3 uCenter; uniform float uRadius; varying vec3 vObj; varying vec3 vObjWorld; varying vec3 vGround; varying vec3 vWorldUp;\n#ifdef LAB_CHEAP\nvarying vec4 vLabAir; varying vec3 vLabLight;\n#endif\n#ifdef LAB_CARD\nattribute vec4 aCard; varying vec2 vCardUv;\n#endif\n#ifdef LAB_RICH\nuniform float uCardScale;\n#endif\n#ifdef LAB_FAR\nattribute float aSolid; varying float vSolid;\n#endif\n#ifdef LAB_ROCK_TILE\nvarying vec3 vRockNormal;\n#endif\n${e.vertexShader}`.replace(`#include <beginnormal_vertex>`,`
        vec3 objectNormal = vec3(normal);
        #ifdef LAB_LEAF
          // 잎 덩어리를 공처럼 칠해 삼각형 면이 안 보이게 한다.
          objectNormal = normalize(mix(normal, normalize(position - uCenter), .78));
          #ifdef LAB_FAR
            if (aSolid > .75) objectNormal = normal;
          #endif
        #endif
        #ifdef LAB_ROCK
          // 바위는 덩어리 모양을 살리되 삼각형 면이 또렷이 갈리지 않게 한다.
          objectNormal = normalize(mix(normal, normalize(position - uCenter), .65));
        #endif
      `).replace(`#include <begin_vertex>`,`
        vec3 transformed = vec3(position);
        #ifdef LAB_FAR
          vSolid = aSolid;
          if (aSolid > .25 && aSolid < .75) transformed = uCenter + (transformed - uCenter) * .84; // 심지를 줄여 잎 카드가 겉에 보이게(가까운 모양과 같은 방식)
        #endif
        #ifdef LAB_SHRINK
          // 초록 심지를 줄여 표면의 잎 카드가 묻히지 않게 하고, 꽃·열매는 잎 바깥으로 내민다. 줄기는 그대로 둔다.
          #ifdef USE_COLOR
            #ifdef LAB_RICH_CORE
              float shrinkBy = color.g > color.r * 1.05 && color.g > color.b ? .66 : color.r > color.g * 1.8 ? 1.14 : 1.;
            #else
            float shrinkBy = color.g > color.r * 1.05 && color.g > color.b ? .8 : color.r > color.g * 1.8 ? 1.14 : 1.;
            #endif
          #else
            float shrinkBy = .8;
          #endif
          transformed = uCenter + (transformed - uCenter) * shrinkBy;
        #endif
        #ifdef LAB_ROCK_TILE
          vRockNormal = normalize(mat3(instanceMatrix) * objectNormal);
        #endif
        vec4 instBase = instanceMatrix * vec4(0., 0., 0., 1.);
        vObj = vec3(length(position - uCenter) / uRadius, (position.y - uCenter.y) / uRadius, fract(instBase.x * .37 + instBase.z * .71));
        #ifdef LAB_LEAF
          float swayT = uTime * 1.4 + instBase.x * .21 + instBase.z * .17 + position.y * .6;
          float gustA = textureLod(uNoise, instBase.xz * .013 - uWindDir * uTime * .055, 0.).g;
          vec2 windLocal = vec2(dot(normalize(instanceMatrix[0].xz), uWindDir), dot(normalize(instanceMatrix[2].xz), uWindDir));
          float reach = clamp(vObj.x, 0., 1.2);
          #ifdef LAB_FAR
            if (aSolid > .75) reach = 0.; // 줄기는 흔들리지 않는다
          #endif
          transformed.xz += windLocal * (sin(swayT) * .06 + gustA * .16) * reach;
          transformed += normalize(position - uCenter + vec3(.001)) * sin(uTime * 2.7 + dot(position, vec3(3.1, 2.3, 4.7)) + instBase.x) * .025 * reach;
        #endif
        vec4 objWorld = instanceMatrix * vec4(transformed, 1.);
        vObjWorld = objWorld.xyz;
        vec2 objUv = regionUv(objWorld.xz);
        float groundY = textureLod(uHeight, heightUv(objUv), 0.).r;
        vec4 g = textureLod(uMapA, objUv, 2.);
        // 밑동 번짐에 쓸 땅 평균색.
        vGround = vec3(.62, .55, .38) * g.r + uGrassBase * g.g + vec3(.2, .15, .09) * g.b + vec3(.33, .33, .35) * g.a;
        vWorldUp = vec3(objWorld.y - groundY, g.g, 0.);
        #ifdef LAB_CHEAP
          // 저사양: 공기 원근·구름 그늘·역광·정글 톤은 큰 무늬라 꼭짓점에서 계산한다(땅과 같은 방식). 잎 카드는 겹쳐 그리는 픽셀이 많아 조각 셰이더를 가볍게 둔다.
          vLabAir = airAt(objWorld.xyz, cameraPosition);
          vLabLight = vec3(1., 0., 0.);
          #ifdef LAB_AIR
            vLabLight.x = cloudShade(objWorld.xz);
          #endif
          #ifdef LAB_LEAF
            vLabLight.y = pow(max(dot(-normalize(cameraPosition - objWorld.xyz), uSunDir), 0.), 3.) * smoothstep(.45, 1., vObj.x);
            vLabLight.z = 1. - smoothstep(.86, 1.06, length((objWorld.xz - uJungle.xy) * uJungle.zw));
          #endif
        #endif
        #ifdef LAB_CARD
          vCardUv = uv;
        #endif`).replace(`#include <project_vertex>`,`
        vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(transformed, 1.);
        #ifdef LAB_CARD
          #ifdef LAB_RICH
            // 잔가지 그림은 방향이 있다. 나무 바깥쪽(카드 자리의 바깥 방향을 화면에 비춘 것)과 위쪽으로 뻗게 돌리고 카드마다 조금씩 흩는다. 밑동이 카드 자리에 오게 위로 민다.
            vec3 cardOut = mat3(modelViewMatrix) * (mat3(instanceMatrix) * normal);
            vec2 cardDir = cardOut.xy / max(length(cardOut), .001) + (viewMatrix * vec4(0., 1., 0., 0.)).xy * .55 + vec2(sin(aCard.w), cos(aCard.w)) * .03;
            float cardTurn = atan(-cardDir.x, cardDir.y) + (fract(aCard.w * 1.618) - .5) * 1.5 + sin(uTime * .9 + aCard.w * 7.) * .08;
            float cs = cos(cardTurn), sn = sin(cardTurn);
            mvPosition.xy += mat2(cs, sn, -sn, cs) * ((aCard.xy + vec2(0., .3)) * aCard.z * uCardScale) * length(instanceMatrix[0].xyz);
          #else
          float cs = cos(aCard.w + sin(uTime * .9 + aCard.w * 7.) * .08), sn = sin(aCard.w + sin(uTime * .9 + aCard.w * 7.) * .08);
          mvPosition.xy += mat2(cs, sn, -sn, cs) * aCard.xy * aCard.z * length(instanceMatrix[0].xyz);
          #endif
        #endif
        gl_Position = projectionMatrix * mvPosition;`),e.fragmentShader=`${q}\nvarying vec3 vObj; varying vec3 vObjWorld; varying vec3 vGround; varying vec3 vWorldUp; float labObjAO = 1.;\n#ifdef LAB_CHEAP\nvarying vec4 vLabAir; varying vec3 vLabLight;\n#endif\n#ifdef LAB_FAR\nvarying float vSolid;\n#endif\n#ifdef LAB_CARD\nuniform sampler2D uLeafAtlas; varying vec2 vCardUv;\n#endif\n#ifdef LAB_ROCK_TILE\nuniform sampler2D uRockTile; varying vec3 vRockNormal;\n#endif\n#ifdef LAB_RICH\nuniform sampler2D uBark, uRockTileN; vec3 labBump = vec3(0.);\n#endif\n${e.fragmentShader}`.replace(`#include <color_fragment>`,`#include <color_fragment>
        float above = vWorldUp.x;
        #ifdef LAB_CARD
          vec4 cardTex = texture2D(uLeafAtlas, vCardUv);
          #ifdef LAB_FAR
            if (vSolid > .25) cardTex = vec4(.56, 0., 0., 1.); // 줄기·심지는 카드 그림을 쓰지 않는다(톤은 그림 평균)
          #endif
          #ifdef ALPHA_TO_COVERAGE
            float cardEdge = max(fwidth(cardTex.a), .0001) * .5;
            diffuseColor.a = smoothstep(.46 - cardEdge, .46 + cardEdge, cardTex.a);
            if (diffuseColor.a <= 0.) discard;
          #else
            if (cardTex.a < .46) discard;
          #endif
          #ifdef LAB_RICH
            // R 명암(잎맥·뒤쪽 잎) · G 잎마다 다른 값: 한 카드 안에서도 잎 색이 조금씩 다르다.
            diffuseColor.rgb *= (.7 + cardTex.r * .62) * mix(vec3(.9, 1., .86), vec3(1.16, 1.08, .76), cardTex.g) * mix(1., .8, smoothstep(.25, .95, vObj.y));
          #else
          diffuseColor.rgb *= (.74 + cardTex.r * .46) * mix(1., .8, smoothstep(.25, .95, vObj.y)); // 꼭대기가 연두색 점으로 튀지 않게
          #endif
        #endif
        #ifdef LAB_LEAF
          // 개체마다 색이 조금씩 다르고, 안쪽·아래쪽은 그늘, 바깥 위쪽은 빛을 받는다.
          #ifdef LAB_FAR
          if (vSolid < .75) {
          #endif
          vec3 hueA = vec3(.98, 1.08, .86), hueB = vec3(1.34, 1.16, .80);
          diffuseColor.rgb *= mix(hueA, hueB, vObj.z);
          float leafLuma = dot(diffuseColor.rgb, vec3(.3, .5, .2));
          #ifdef LAB_CHEAP
            diffuseColor.rgb = mix(vec3(leafLuma), diffuseColor.rgb, .86) * 1.42 * mix(vec3(1.), uJungleTone, vLabLight.z);
          #else
            diffuseColor.rgb = jungleTint(mix(vec3(leafLuma), diffuseColor.rgb, .86) * 1.42, vObjWorld);
          #endif
          #ifdef LAB_CORE
            diffuseColor.rgb *= .74; // 심지는 안쪽 그늘. 잎 카드가 위에서 빛을 받아 깊이가 생긴다.
          #endif
          labObjAO = mix(.76, 1.06, smoothstep(.2, .95, vObj.x)) * mix(.86, 1.08, smoothstep(-.7, .6, vObj.y));
          #if defined(LAB_CARD) && defined(LAB_RICH)
            diffuseColor.rgb = mix(diffuseColor.rgb, vec3(.2, .15, .09) * (.55 + cardTex.r), cardTex.b * .8); // B 잔가지
          #endif
          #ifdef LAB_FAR
            if (vSolid > .25) diffuseColor.rgb *= .9; // 심지는 안쪽 그늘. 멀면 카드가 적어 가까운 모양(.74)보다 밝게 둬 전체 밝기를 맞춘다
          } else labObjAO = .82;
          #endif
        #endif
        #ifdef LAB_TRUNK
          #ifdef LAB_RICH
            // 껍질 무늬: 면이 향한 쪽에 맞춰 옆에서 두 번 입힌다(R 높이: 조각은 밝고 갈라진 틈은 어둡다, GB 기울기).
            vec3 barkFace = normalize(cross(dFdx(vObjWorld), dFdy(vObjWorld)));
            float barkSide = abs(barkFace.x) / (abs(barkFace.x) + abs(barkFace.z) + .0001);
            vec4 barkA = texture2D(uBark, vObjWorld.zy * vec2(1.1, .5)), barkB = texture2D(uBark, vObjWorld.xy * vec2(1.1, .5));
            float bark = mix(barkB.r, barkA.r, barkSide) * 1.15 - .12;
            labBump = (vec3(0., barkA.b * 2. - 1., barkA.g * 2. - 1.) * barkSide + vec3(barkB.g * 2. - 1., barkB.b * 2. - 1., 0.) * (1. - barkSide)) * 1.5;
          #else
          float bark = texture2D(uNoise, vec2((vObjWorld.x + vObjWorld.z) * 1.7, vObjWorld.y * .16)).b;
          #endif
          float barkLuma = dot(diffuseColor.rgb, vec3(.3, .5, .2));
          diffuseColor.rgb = mix(vec3(barkLuma) * vec3(1.05, .95, .82), diffuseColor.rgb, .62) * (.72 + bark * .56);
          diffuseColor.rgb = mix(mix(vGround * 1.05, diffuseColor.rgb, .45), diffuseColor.rgb, smoothstep(.0, .55, above));
          labObjAO = mix(.5, 1., smoothstep(.0, 1.1, above));
        #endif
        #ifdef LAB_ROCK
          diffuseColor.rgb *= mix(vec3(.94, .96, 1.), vec3(1.1, 1.04, .92), vObj.z);
          float rockN = texture2D(uNoise, vObjWorld.xz * .42).g;
          // 결과 얼룩: 납작한 단색 면이 돌처럼 보이게 한다. y를 섞어 옆면에도 무늬가 생긴다.
          float rockGrain = texture2D(uNoise, vec2(vObjWorld.x + vObjWorld.z, vObjWorld.y * 1.7) * .23).b * .6 + texture2D(uNoise, (vObjWorld.xz + vObjWorld.y) * 1.3).g * .4;
          #ifdef LAB_ROCK_TILE
            // 절벽과 같은 바위 그림을 세 방향에서 입혀 늘어나지 않게 하고, 절벽처럼 층을 넣는다.
            vec3 rockBlend = pow(abs(normalize(vRockNormal)), vec3(4.)); rockBlend /= rockBlend.x + rockBlend.y + rockBlend.z;
            vec3 rockTile = texture2D(uRockTile, vObjWorld.zy / 4.2).rgb * rockBlend.x + texture2D(uRockTile, vObjWorld.xz / 4.2).rgb * rockBlend.y + texture2D(uRockTile, vObjWorld.xy / 4.2).rgb * rockBlend.z;
            float rockStrata = sin(vObjWorld.y * 4.2 + vObjWorld.x * .21 + rockN * 5.) * .5 + .5;
            diffuseColor.rgb = mix(diffuseColor.rgb, rockTile * 1.12, .9) * mix(.84, 1.1, rockStrata) * (.86 + rockGrain * .28);
            #ifdef LAB_RICH
              // 잔 요철: 땅의 바위 그림에서 만든 기울기 지도를 더 촘촘하게 세 방향에서 입힌다. 패인 곳(어두운 곳)은 조금 더 어둡게.
              vec3 rnA = texture2D(uRockTileN, vObjWorld.zy / 1.7).rgb, rnB = texture2D(uRockTileN, vObjWorld.xz / 1.7).rgb, rnC = texture2D(uRockTileN, vObjWorld.xy / 1.7).rgb;
              labBump = (vec3(0., rnA.g * 2. - 1., rnA.r * 2. - 1.) * rockBlend.x + vec3(rnB.r * 2. - 1., 0., rnB.g * 2. - 1.) * rockBlend.y + vec3(rnC.r * 2. - 1., rnC.g * 2. - 1., 0.) * rockBlend.z) * 2.2;
              diffuseColor.rgb *= mix(.78, 1.1, smoothstep(.22, .62, rnA.b * rockBlend.x + rnB.b * rockBlend.y + rnC.b * rockBlend.z));
            #endif
          #else
            diffuseColor.rgb *= .74 + rockGrain * .52;
          #endif
          float mossy = smoothstep(.45, .82, vNormal.y * 0. + rockN) * vWorldUp.y;
          diffuseColor.rgb = mix(diffuseColor.rgb, uGrassBase * .9, mossy * .55);
          diffuseColor.rgb = mix(vGround, diffuseColor.rgb, smoothstep(.0, .34, above + (rockN - .5) * .22));
          labObjAO = mix(.42, 1., smoothstep(.0, .7, above));
        #endif
        #ifdef LAB_DECO
          diffuseColor.rgb = mix(vGround * .82, diffuseColor.rgb, smoothstep(.0, .24, above));
          labObjAO = mix(.55, 1., smoothstep(.0, .35, above));
        #endif
      `).replace(`#include <normal_fragment_maps>`,`#include <normal_fragment_maps>
        #ifdef LAB_RICH
          normal = normalize(normal + mat3(viewMatrix) * labBump);
        #endif`).replace(`#include <lights_fragment_end>`,`#include <lights_fragment_end>
        reflectedLight.indirectDiffuse *= labObjAO; reflectedLight.directDiffuse *= mix(1., labObjAO, .6);
        #ifdef LAB_AIR
          #ifdef LAB_CHEAP
            reflectedLight.directDiffuse *= vLabLight.x;
          #else
            reflectedLight.directDiffuse *= cloudShade(vObjWorld.xz);
          #endif
        #endif
        #ifdef LAB_LEAF
          // 역광일 때 잎 가장자리가 빛난다(얇은 잎 투과).
          #ifdef LAB_CHEAP
            float back = vLabLight.y;
          #else
            vec3 toEye = normalize(cameraPosition - vObjWorld);
            float back = pow(max(dot(-toEye, uSunDir), 0.), 3.) * smoothstep(.45, 1., vObj.x);
          #endif
          reflectedLight.directDiffuse += diffuseColor.rgb * uSunColor * back * .28;
        #endif`),i.atmosphere&&(e.fragmentShader=e.fragmentShader.replace(`#include <tonemapping_fragment>`,`gl_FragColor.rgb = ${l?`mix(gl_FragColor.rgb, vLabAir.rgb, vLabAir.a)`:`airPerspective(gl_FragColor.rgb, vObjWorld, cameraPosition)`};\n#include <tonemapping_fragment>`))},f.customProgramCacheKey=()=>e(`program`)?`lab-obj-${n}-${i.atmosphere}-${!!s}-${l}${d?`-rich`:u?`-richcore`:``}`:`lab-obj-${n}-${i.atmosphere}-${!!s}-${l}-${t.uuid}-${a.toArray().join()}`,f}function ue(e,n,r,i,a,o){o&&(o.minFilter=y,o.magFilter=v,o.generateMipmaps=!0);let c=new s,l=[],u=new M,{scatter:m}=e,h=r.integration?m.trees:m.trees.filter(e=>!e.scenery),g=r.integration?m.rocks:m.rocks.slice(0,m.rocks.findIndex(e=>e.id!==`rock.whole`)),_=(e,n,a,o,s,u,f=n.length,p=-1)=>{n.length&&F(e)&&P(e).forEach((e,m)=>{if(p>=0&&m!==p)return;e.geometry.computeBoundingBox();let h=e.geometry.boundingBox,g=h.getCenter(new d),_=Math.max(.2,h.getSize(new d).length()*.5),v=I(e),y=r.integration?$(v,a(m),i,r,g,_):v,b=new t(e.geometry,y,Math.max(1,f));b.frustumCulled=!1,b.castShadow=u,b.receiveShadow=!0,b.count=0,c.add(b),l.push({geometry:e.geometry,material:y,mesh:b,list:n,minDist:o,maxDist:s,y:e.y,shadow:u})})},b=new Map;for(let e of h)(b.get(e.id)??b.set(e.id,[]).get(e.id)).push(e);let x=(e,n,r,i,a,o,s)=>{let u=new t(e,n,Math.max(1,r.length));u.frustumCulled=!1,u.castShadow=s,u.receiveShadow=!0,u.count=0,c.add(u),l.push({geometry:e,material:n,mesh:u,list:r,minDist:i,maxDist:a,y:o,shadow:s})};for(let[e,t]of b){let s=e=>e===0?`trunk`:r.integration?`core`:`leaf`,c=Q[e];if(!r.integration||!c||!F(c)||!o){_(e,t,s,0,c?n.treeLod[0]:9999,!0),c&&_(c,t,s,n.treeLod[0],9999,!0);continue}let l=n.treeLod[0],u=n.treeLod[1],f=P(e)[1]??P(c)[1];_(e,t,s,0,l,!0,t.length,0),_(c,t,s,0,l,!0,t.length,1),_(c,t,s,l,u,!0),f.geometry.computeBoundingBox();let p=f.geometry.boundingBox,m=p.getCenter(new d),h=Math.max(.2,p.getSize(new d).length()*.5),g=+(e===`tree.pine`),v=$(I(f),`leaf`,i,r,m,h,o);x(Z(f.geometry,n.leafCards,.19,m,h,g),v,t,0,l,f.y,!1),x(Z(f.geometry,n.farLeafCards,.34,m,h,g),v,t,l,u,f.y,!1);let y=a.get(X[e]);if(y){y.computeBoundingBox();let e=y.boundingBox,n=e.getCenter(new d);n.y+=e.getSize(new d).y*.2,x(y,$(I(P(c)[1]),`leaf`,i,r,n,e.getSize(new d).length()*.5),t,u,9999,0,!1)}}if(r.atmosphere){let e=new Map;for(let t of m.farTrees??[])(e.get(t.id)??e.set(t.id,[]).get(t.id)).push(t);for(let[t,n]of e){let e=a.get(X[t]),o=F(Q[t])?P(Q[t])[1]:null;if(!e||!o)continue;e.computeBoundingBox();let s=e.boundingBox,c=s.getCenter(new d);c.y+=s.getSize(new d).y*.2,x(e,$(I(o),`leaf`,i,r,c,s.getSize(new d).length()*.5),n,0,9999,0,!1)}}let S=new Map;for(let e of g)(S.get(e.id)??S.set(e.id,[]).get(e.id)).push(e);for(let[e,t]of S)_(e,t,()=>`rock`,0,9999,!0);if(r.grassCards)for(let[e,t]of Object.entries(m.deco)){let r=[];for(let n=0;n<t.length;n+=5)r.push({x:t[n],y:t[n+1],z:t[n+2],a:t[n+3],s:t[n+4],id:e});_(e,r,()=>`deco`,0,n.decoReach*(e===`deco.bush`||e===`deco.shrub`?1.4:1),!1)}let C=()=>{if(r.grassCards)return;let t=(e,t,n)=>{let r=Math.sin(e*127.1+t*311.7+n*74.7)*43758.5453;return r-Math.floor(r)},n=[[`deco.grass`,.32],[`deco.tallgrass`,.08],[`deco.flowers`,.07],[`deco.bush`,.012],[`deco.shrub`,.006],[`deco.pebbles`,.008]],i=new Map(n.map(([e])=>[e,[]])),a=1.5;return(r,o,s)=>{i.forEach(e=>{e.length=0});for(let c=-60;c<60;c+=a)for(let l=-60;l<60;l+=a){let u=Math.floor((r+c)/a),d=Math.floor((o+l)/a),f=(u+t(u,d,1))*a,p=(d+t(u,d,2))*a;if(Math.hypot(f-r,p-o)>60||!e.inside(f,p)||s(f,p)<.5)continue;let m=t(u,d,3);for(let[r,a]of n){if(m<a){i.get(r).push({x:f,y:e.heightAt(f,p),z:p,a:t(u,d,4)*6.28,s:.8+t(u,d,5)*.5,id:r});break}m-=a}}for(let[e,t]of i)_(e,t,()=>`deco`,0,60,!1,t.length)}},w=new p,T=new f,D=new E,O=new d(1e9,0,0),k=new d,j=new d,N=e=>{T.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),w.setFromProjectionMatrix(T);let t=e.position.x,n=e.position.z;for(let e of l){let r=0;for(let i of e.list){let a=Math.hypot(i.x-t,i.z-n);a<e.minDist||a>=e.maxDist||w.intersectsSphere(D.set(D.center.set(i.x,i.y+2.5,i.z),9*i.s).clone())&&(u.position.set(i.x,i.y+e.y*i.s,i.z),u.rotation.set(0,i.a,0),u.scale.setScalar(i.s),u.updateMatrix(),e.mesh.setMatrixAt(r++,u.matrix))}e.mesh.count=r,e.mesh.visible=r>0,e.mesh.instanceMatrix.needsUpdate=!0}};return{root:c,sets:l,legacyCover:C,update(e,t=!1){e.getWorldDirection(j),!(!t&&O.distanceTo(e.position)<2&&k.dot(j)>.995)&&(O.copy(e.position),k.copy(j),N(e))},color:new A}}function de(e,t){let n=e*3*2,r=e*2*2,i=new Float32Array(n*3),a=new Uint16Array(r*3),o=0,s=0;for(let t=0;t<e;t++){let e=o;for(let e=0;e<=2;e++)for(let n of[0,1])i.set([n,e/2,t],o++*3);for(let t=0;t<2;t++){let n=e+t*2;a.set([n,n+1,n+2,n+1,n+3,n+2],s),s+=6}}let c=new l;c.setAttribute(`position`,new C(i,3)),c.setIndex(new C(a,1));let u=[],d=Math.ceil(t);for(let e=-d;e<=d;e++)for(let t=-d;t<=d;t++)t*t+e*e<=d*d&&u.push(t,e);return c.setAttribute(`aCell`,new h(new Float32Array(u),2)),c.instanceCount=u.length/2,c}var fe=`
  ${q}
  #include <fog_pars_vertex>
  #include <shadowmap_pars_vertex>
  attribute vec2 aCell;
  uniform float uCell, uReach, uFadeNear, uWidth, uQuads, uThin; uniform vec3 uEyeFlat; uniform vec2 uViewFlat; uniform float uPitch;
  uniform vec2 uAtlasRows; uniform vec3 uPlayer;
  varying vec2 vUv; varying vec3 vColor; varying float vFade; varying vec3 vFlower;
  vec3 hash3(vec2 p) { vec3 q = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973)); q += dot(q, q.yxz + 33.33); return fract((q.xxy + q.yzz) * q.zyx); }
  void main() {
    vec2 snapped = floor((uEyeFlat.xz + uViewFlat * uReach * .72) / uCell) * uCell;
    vec2 cellPos = snapped + aCell * uCell;
    vec3 h = hash3(floor(cellPos / uCell + .5));
    vec2 root = cellPos + (h.xy - .5) * uCell * 1.2;
    vec2 uv = regionUv(root);
    vec4 mC = texture2D(uMapC, uv);
    float dist = distance(root, uEyeFlat.xz), edge = 1. - smoothstep(uReach * .74, uReach, dist), inner = smoothstep(uFadeNear * .85, uFadeNear * 1.15, dist);
    // 지도 밀도 + 먼 쪽 솎기. 탈락하면 삼각형을 접어 화면 비용을 없앤다.
    float keep = mC.r * edge * inner;
    if (uv.x < 0. || uv.y < 0. || uv.x > 1. || uv.y > 1. || h.z > keep * 1.6) { gl_Position = vec4(2., 2., 2., 1.); vUv = vec2(0.); vColor = vec3(0.); vFlower = vec3(0.); vFade = 0.; return; }
    float groundY = texture2D(uHeight, heightUv(uv)).r - tideSink(root);
    vec4 mB = texture2D(uMapB, uv);
    vec2 nxz = mB.xy * 2. - 1.; vec3 groundN = vec3(nxz.x, sqrt(max(.04, 1. - dot(nxz, nxz))), nxz.y);
    float tall = mC.g, size = mix(.42, 1.12, tall) * (.74 + h.y * .5) * mix(.45, 1., smoothstep(.0, .35, keep));
    float heightM = uWidth * .78 * size * mix(.62, 1.5, tall) * mix(.2, 1., smoothstep(.3, 1., distance(root, uPlayer.xz))); // 발밑 풀은 눕는다. 다리를 가리면 '가려진 캐릭터' 색이 비친다
    float widthM = uWidth * size * (1. + smoothstep(uReach * .4, uReach, dist) * .5);
    // 카드는 카메라를 향해 ±각으로 벌리고, 위에서 내려다볼수록 뒤로 눕혀 위에서도 빽빽하게 보인다.
    float yaw = atan(uEyeFlat.x - root.x, uEyeFlat.z - root.y) + (position.z - (uQuads - 1.) * .5) * 1.05 + (h.x - .5) * .9;
    vec2 across = vec2(cos(yaw), -sin(yaw)), back = normalize(root - uEyeFlat.xz + vec2(.001));
    float y = position.y, lean = uPitch * .85;
    vec2 gustUv = root * .013 - uWindDir * uTime * .055;
    float gust = textureLod(uNoise, gustUv, 0.).g, ripple = sin(uTime * 2.6 + root.x * 1.3 + root.y * 1.1 + h.x * 6.) * .05;
    vec2 bend = uWindDir * (smoothstep(.3, .85, gust) * .42 + .06 + ripple) * heightM * y * y;
    vec3 world = vec3(root.x + across.x * (position.x - .5) * widthM + bend.x + back.x * lean * heightM * y * y, groundY - .04 + heightM * y * (1. - lean * .45), root.y + across.y * (position.x - .5) * widthM + bend.y + back.y * lean * heightM * y * y);
    vec4 mv = viewMatrix * vec4(world, 1.);
    gl_Position = projectionMatrix * mv;
    // 아틀라스: 4칸 중 하나.
    float flowerZone = smoothstep(.6, .74, textureLod(uNoise, root * .017 + 3.7, 0.).a) * (1. - mC.b * .5);
    float col = h.x < flowerZone * .3 ? 3. : floor(h.y * 2.999);
    vUv = vec2((position.x + col) * .25, position.y);
    // 색: 뿌리는 땅과 같고 끝으로 밝아진다. 군락·마른 정도는 땅과 같은 함수.
    float macro = textureLod(uNoise, root * .0061, 0.).r, midN = textureLod(uNoise, root * .037, 0.).g;
    vec3 tint = meadowTint(mC.b, macro * .7 + midN * .3) * (.82 + midN * .36);
    vec3 tip = uGrassBase * tint * mix(vec3(1.10, 1.14, 1.04), vec3(1.26, 1.20, .92), mC.b) * (.92 + h.x * .2);
    vec3 albedo = alpineTint(mix(uGrassBase * tint * .78, tip, smoothstep(.0, .95, y)), world);
    albedo *= 1. + (gust - .5) * .34;
    // 땅과 같은 빛 모델: 반구광 + 해. 저 위쪽 잎은 위 법선 쪽으로.
    vec3 n = normalize(mix(groundN, vec3(0., 1., 0.), .35 + y * .3));
    vec3 hemi = mix(uHemiGround, uHemiSky, n.y * .5 + .5);
    float ao = mix(1., mB.b, .88), sun = max(dot(n, uSunDir), 0.);
    vec3 toEye = normalize(cameraPosition - world);
    float trans = pow(max(dot(-toEye, uSunDir), 0.), 3.) * y * .55;
    vColor = albedo / 3.14159 * (hemi * ao * mix(.72, 1., y) + uSunColor * (sun * mix(1., ao, .5) * cloudShade(root) + trans));
    // 꽃 색: 흰·노랑·연보라 중 하나. 잎과 같은 빛을 받는다.
    vec3 petal = h.y < .45 ? vec3(.95, .93, .82) : h.y < .78 ? vec3(.95, .72, .18) : vec3(.62, .52, .88);
    vFlower = petal / 3.14159 * (hemi * ao + uSunColor * max(uSunDir.y, 0.) * cloudShade(root));
    #ifdef LAB_AIR
      vColor = airPerspective(vColor, world, cameraPosition);
      vFlower = airPerspective(vFlower, world, cameraPosition);
    #endif
    vFade = 1.;
    #if defined(USE_SHADOWMAP) && NUM_DIR_LIGHT_SHADOWS > 0
      vec4 shadowWorld = vec4(world + groundN * .05, 1.);
      vDirectionalShadowCoord[0] = directionalShadowMatrix[0] * shadowWorld;
    #endif
    #ifdef USE_FOG
      vFogDepth = -mv.z;
    #endif
  }`,pe=`
  #include <common>
  #include <packing>
  #include <lights_pars_begin>
  #include <shadowmap_pars_fragment>
  #include <fog_pars_fragment>
  uniform sampler2D uAtlas; uniform float uCut;
  varying vec2 vUv; varying vec3 vColor; varying float vFade; varying vec3 vFlower;
  void main() {
    if (vFade < .5) discard;
    vec4 t = texture2D(uAtlas, vUv);
    if (t.a < uCut) discard;
    vec3 c = t.g > .5 ? vFlower : vColor * (.62 + t.r * .66);
    #if defined(USE_SHADOWMAP) && NUM_DIR_LIGHT_SHADOWS > 0
      DirectionalLightShadow s = directionalLightShadows[0];
      c *= mix(.56, 1., getShadow(directionalShadowMap[0], s.shadowMapSize, s.shadowIntensity, s.shadowBias, s.shadowRadius, vDirectionalShadowCoord[0]));
    #endif
    gl_FragColor = vec4(c, 1.);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    #ifndef LAB_AIR
      #include <fog_fragment>
    #endif
  }`;function me(e,t,n,r){r.minFilter=y,r.magFilter=v,r.generateMipmaps=!0,r.anisotropy=2;let i=new s,o=new d,c={value:new j(0,1)},l={value:.3},u={value:o},f=[],p=(o,s,d,p,m,h)=>{let _=new g({uniforms:x.merge([N.lights,N.fog,{uCell:{value:s},uReach:{value:o},uFadeNear:{value:p},uWidth:{value:m},uQuads:{value:d},uThin:{value:1},uPitch:{value:0},uCut:{value:h},uAtlas:{value:null}}]),vertexShader:fe,fragmentShader:pe,side:2,lights:!0,fog:!t.atmosphere,defines:{...t.atmosphere?{LAB_AIR:1}:{},...e.mapScale===2?{LAB_CHEAP:1}:{}}});J(_.uniforms,n),_.uniforms.uAtlas.value=r,_.uniforms.uEyeFlat=u,_.uniforms.uViewFlat=c,_.uniforms.uPitch=l,_.alphaToCoverage=e.antialias;let v=new a(de(d,o*.9/s),_);v.frustumCulled=!1,v.receiveShadow=!0,v.castShadow=!1,v.renderOrder=-1,i.add(v),f.push(v)};p(e.grass.near,e.grass.nearCell,e.grass.nearQuads,0,1.15,.42),e.grass.far&&p(e.grass.far,e.grass.farCell,1,e.grass.near*.7,2,.36);let m=new d;return{root:i,rings:f,update(e){o.copy(e.position),e.getWorldDirection(m);let t=Math.hypot(m.x,m.z)||1;c.value.set(m.x/t,m.z/t),l.value=Math.max(0,Math.min(1,-m.y))}}}var he=`
  #include <fog_pars_vertex>
  varying vec3 vWorld;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.); vWorld = world.xyz;
    vec4 mvPosition = viewMatrix * world; gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
  }`,ge=`
  ${q}
  #include <fog_pars_fragment>
  uniform sampler2D uRipple; uniform vec3 uSkyZenith, uSkyHorizon;
  varying vec3 vWorld;
  void main() {
    vec2 p = vWorld.xz, uv = regionUv(p);
    float inside = step(0., uv.x) * step(0., uv.y) * step(uv.x, 1.) * step(uv.y, 1.);
    vec2 edge = min(uv, 1. - uv);
    float rim = inside * smoothstep(0., .015, min(edge.x, edge.y));
    float depthM = mix(16., max(0., -texture2D(uHeight, heightUv(clamp(uv, 0., 1.))).r), rim);
    vec4 mC = texture2D(uMapC, clamp(uv, 0., 1.));
    float sdf = mix(-40., mC.a * (255. / 4.) - 32., rim);
    float tideDepth = tideSink(p); depthM += tideDepth; sdf -= tideDepth * 16.; // 잠긴 썰물 길은 얕은 바다로 보인다
    float dist = length(cameraPosition - vWorld);
    // 잔물결: 큰 무늬·잔 무늬 두 겹을 서로 다른 방향으로 흘린다. 수심이 얕으면 기울기를 줄인다.
    float farF = smoothstep(40., 260., dist);
    vec2 r1 = texture2D(uRipple, p * .071 + vec2(.018, .011) * uTime).rg * 2. - 1.;
    #if WATER_DETAIL >= 1
      // 멀리서는 잔 무늬 몫이 거의 0이라 읽지 않는다.
      vec2 r2 = dist < 250. ? texture2D(uRipple, p * .163 * vec2(1., .9) + vec2(-.024, .031) * uTime).rg * 2. - 1. : vec2(0.);
      vec2 r3 = texture2D(uRipple, p * .019 + vec2(.006, -.004) * uTime).rg * 2. - 1.;
    #else
      vec2 r2 = r1.yx * .6, r3 = vec2(0.);
    #endif
    vec2 slope = (r1 * .55 * (1. - farF * .7) + r2 * .34 * (1. - farF * .9) + r3 * .75) * .2;
    float stillness = smoothstep(.0, 1.6, depthM);
    vec3 n = normalize(vec3(slope.x * stillness, 1., slope.y * stillness));
    vec3 toEye = normalize(cameraPosition - vWorld);
    // 큰 얼룩: 먼 바다도 한 장의 판으로 안 보이게 넓은 물빛 띠를 깐다.
    float bands = texture2D(uNoise, p * .0039 + uWindDir * uTime * .0006).r;
    #if WATER_DETAIL >= 1
      float blotch = texture2D(uNoise, p * .0015).a;
    #else
      float blotch = bands;
    #endif
    // 흡수: 붉은빛이 먼저 사라져 얕은 옥색 → 청록 → 군청으로 간다(수심에 대한 지수 함수).
    float d = depthM + (bands - .5) * 1.4 * smoothstep(1., 6., depthM);
    vec3 absorb = exp(-vec3(.5, .105, .062) * d * 1.05);
    vec3 deep = mix(vec3(.012, .115, .235), vec3(.008, .17, .27), blotch);
    vec3 body = deep + (vec3(.26, .80, .74) - deep) * absorb;
    // 비치는 정도: 얕을수록 해저가 그대로 보인다.
    float opacity = 1. - exp(-d * .62);
    opacity = clamp(opacity * .94, .04, 1.);
    // 빛: 물속은 해·반구광을 함께 받는다.
    float sunUp = max(uSunDir.y, 0.);
    float shade = cloudShade(p);
    vec3 lit = body * (uHemiSky * .24 + uSunColor * sunUp * .21) * shade;
    // 프레넬 하늘 반사: 먼 바다일수록 하늘을 비춘다. 수평선으로 녹아드는 공간감의 핵심.
    float fres = .025 + .975 * pow(1. - max(dot(n, toEye), 0.), 5.);
    vec3 reflDir = reflect(-toEye, n);
    vec3 skyCol = mix(uSkyHorizon, uSkyZenith, smoothstep(.0, .42, max(reflDir.y, 0.)));
    vec3 color = mix(lit, skyCol, clamp(fres * .92, 0., .72) * mix(.25, 1., smoothstep(.4, 5., depthM)));
    // 해 반짝임: 두 겹. 뾰족한 점(가까이) + 넓은 빛길.
    float sd = max(dot(reflect(-uSunDir, n), toEye), 0.);
    vec3 sunTint = uSunColor * .32;
    float sparkle = pow(sd, 420.) * 7. * (1. - farF * .6) + pow(sd, 42.) * .24;
    color += sunTint * sparkle;
    // 얕은 물의 빛그물은 지형 쪽(LAB_CAUSTICS)에서 해저에 그린다. 포말: 해안선 거리장을 따라 밀려오는 줄 + 물가에 붙은 흰 테.
    // 포말 줄은 해안에서 15m 안에만 생긴다. 먼 바다는 노이즈를 읽지 않는다.
    float foam = 0., foamN = .5;
    if (sdf > -15.) {
      #if WATER_DETAIL >= 1
        foamN = texture2D(uNoise, p * .19 + vec2(.012, -.008) * uTime).g * .55 + texture2D(uNoise, p * .47 - vec2(.02, .014) * uTime).b * .45;
      #else
        foamN = texture2D(uNoise, p * .24 + vec2(.012, -.008) * uTime).g;
      #endif
      float wavesPhase = sdf * .92 + uTime * .62 + (texture2D(uNoise, p * .012).r - .5) * 7.;
      float crest = smoothstep(.58, .96, sin(wavesPhase)) * smoothstep(-15., -3., sdf);
      float breakup = smoothstep(.33, .66, foamN);
      float shoreFoam = (1. - smoothstep(.1, 2.1 + foamN * 2.2, -sdf + sin(uTime * .6 + p.x * .07 + p.y * .05) * .55)) * smoothstep(.2, .5, foamN + .16);
      foam = clamp(crest * breakup * .78 + shoreFoam, 0., 1.);
      vec3 foamCol = (uHemiSky * .34 + uSunColor * sunUp * .30) * shade;
      color = mix(color, foamCol, foam * .92);
    }
    float alpha = clamp(max(opacity, foam * .95) + fres * .34 * smoothstep(.3, 2.4, depthM), 0., 1.);
    // 물가의 얇은 끝은 조금 더 비치게 해서 모래로 스며든다.
    alpha *= smoothstep(-.02, -.5 - foamN * .3, sdf) * .35 + .65;
    #ifdef LAB_AIR
      color = airPerspective(color, vWorld, cameraPosition);
    #endif
    gl_FragColor = vec4(color, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    #ifndef LAB_AIR
      #include <fog_fragment>
    #endif
  }`;function _e(e,t,n,r,i){let o=new g({uniforms:x.merge([N.fog,{uSkyZenith:{value:new A},uSkyHorizon:{value:new A},uRipple:{value:null}}]),vertexShader:he,fragmentShader:ge,transparent:!0,depthWrite:!1,fog:!t.atmosphere,defines:{WATER_DETAIL:e.waterDetail,...t.atmosphere?{LAB_AIR:1}:{},...e.waterDetail===0?{LAB_CHEAP:1}:{}}});J(o.uniforms,n),o.uniforms.uRipple.value=r;let s=new a(new m(i,i),o);return s.rotation.x=-Math.PI/2,s.frustumCulled=!1,s.renderOrder=3,{mesh:s,setSky(e,t){o.uniforms.uSkyZenith.value.copy(e),o.uniforms.uSkyHorizon.value.copy(t)}}}export{z as C,V as S,te as _,X as a,L as b,$ as c,q as d,J as f,ie as g,ee as h,ce as i,Z as l,ne as m,me as n,ue as o,ae as p,Q as r,le as s,_e as t,se as u,re as v,R as x,B as y};