import{Gn as e,_ as t,sr as n,wt as r}from"./three.core-CRphnWGP.js";var i=`
  #ifdef USE_FOG
    #ifdef FOG_EXP2
      float fogFactor = 1.0 - exp(-fogDensity * fogDensity * vFogDepth * vFogDepth);
    #else
      float fogFactor = smoothstep(fogNear, fogFar, vFogDepth);
    #endif
    gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, fogFactor * .88);
  #endif
`,a=new t(8959172);function o(t){let a=new n().load(`./assets/fx/${t}.png`);a.colorSpace=e;let o=new r({map:a,transparent:!0,depthWrite:!1,side:2,fog:!0});return o.onBeforeCompile=e=>{e.fragmentShader=e.fragmentShader.replace(`#include <fog_fragment>`,`
      #ifdef USE_FOG
        gl_FragColor.rgb = mix(fogColor, gl_FragColor.rgb, smoothstep(.10, .28, vMapUv.y));
      #endif
      ${i}
    `)},o.customProgramCacheKey=()=>`horizon-picture-vis1`,o}export{a as n,o as r,i as t};