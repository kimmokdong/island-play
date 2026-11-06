import{Bt as e,Cr as t,D as n,Ln as r,M as i,Mt as a,Or as o,Pt as s,Tt as c,Ut as l,Xn as u,Yn as d,_r as f,j as p}from"./three.core-D_8iNREF.js";function m(m){let h=new n(new Uint8Array([45,110,185,255]),4,1,r);h.minFilter=h.magFilter=s,h.needsUpdate=!0;let g=new WeakMap,_=new i(1,1,f);_.format=p;let v=new o(1,1,{depthTexture:_,stencilBuffer:!0}),y=new u({depthTest:!1,depthWrite:!1,uniforms:{colorMap:{value:v.texture},depthMap:{value:v.depthTexture},texel:{value:new t(1,1)},near:{value:.1},far:{value:180},outline:{value:1}},vertexShader:`varying vec2 vUv;
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
      }`}),b=new d;b.add(new c(new l(2,2),y));let x=new e(-1,1,1,-1,0,1);return{apply(e){e.traverse(e=>{if(!(e instanceof c)||e.geometry.hasAttribute(`terrainWeights`))return;let t=e=>{if(e instanceof a)return e;let t=g.get(e);if(!t){let n=e;if(![`MeshLambertMaterial`,`MeshStandardMaterial`,`MeshPhongMaterial`].includes(e.type))return e;let r=n.map?.image,i=r instanceof HTMLImageElement?r.src:``;t=new a({color:n.color,map:n.map,vertexColors:n.vertexColors,side:n.side,transparent:n.transparent,opacity:n.opacity,alphaTest:n.alphaTest,gradientMap:h,depthWrite:n.depthWrite}),t.defines={...t.defines,FLAT_SHADED:``},t.onBeforeCompile=(e,t)=>{n.onBeforeCompile(e,t),i.includes(`/terrain/`)&&(e.vertexShader=`varying vec2 vStudyGround;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
vStudyGround = (modelMatrix * vec4(position, 1.)).xz;`),e.fragmentShader=`varying vec2 vStudyGround;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace(`#include <map_fragment>`,`#include <map_fragment>
                vec3 grain = diffuseColor.rgb / max(diffuse, vec3(.001));
                float detail = dot(grain, vec3(.3, .5, .2));
                float mottling = sin(vStudyGround.x * .33 + sin(vStudyGround.y * .21) * 1.6) * sin(vStudyGround.y * .27);
                diffuseColor.rgb = diffuse * (.83 + detail * .45 + mottling * .055);`),e.fragmentShader=e.fragmentShader.replace(`#include <opaque_fragment>`,`#include <opaque_fragment>
gl_FragColor.a = 0.;`))},t.customProgramCacheKey=()=>`study-${n.customProgramCacheKey()}-${i.includes(`/terrain/`)}`,i.includes(`/terrain/`)&&t.color.set(i.includes(`grass`)?10399614:15191211),g.set(e,t)}return t};e.material=Array.isArray(e.material)?e.material.map(t):t(e.material)})},setOutline(e){y.uniforms.outline.value=Number(e)},render(e,t,n,r,i,a=()=>m.render(e,t)){let o=m.getPixelRatio(),s=Math.floor(r*o),c=Math.floor(i*o);(v.width!==s||v.height!==c)&&v.setSize(s,c),y.uniforms.texel.value.set(1/s,1/c),y.uniforms.near.value=t.near,y.uniforms.far.value=t.far,m.setScissorTest(!1),m.setRenderTarget(v),m.clear(),a(),m.setRenderTarget(null),m.setScissorTest(!0),m.setViewport(n,0,r,i),m.setScissor(n,0,r,i),m.clear(),m.render(b,x)}}}export{m as t};