"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[132],{5156:function(e,n,t){t.d(n,{Vm:function(){return c},kW:function(){return f},Tt:function(){return S}});var r=t(5217),i=t(9610),o=t(8110);const{getBroadcastDims:a}=r.backend_util;function c(e,n,t){const c=[];if(e.forEach((e=>{const n=r.util.sizeFromShape(e.shapeInfo.logicalShape);if(e.shapeInfo.isUniform?c.push(`uniform float ${e.name}${n>1?`[${n}]`:""};`):(c.push(`uniform sampler2D ${e.name};`),c.push(`uniform int offset${e.name};`)),t.enableShapeUniforms){const{uniformShape:n}=S(t.packedInputs,e.shapeInfo.logicalShape,e.shapeInfo.texShape);switch(n.length){case 1:c.push(`uniform int ${e.name}Shape;`);break;case 2:c.push(`uniform ivec2 ${e.name}Shape;`);break;case 3:c.push(`uniform ivec3 ${e.name}Shape;`);break;case 4:c.push(`uniform ivec4 ${e.name}Shape;`)}c.push(`uniform ivec2 ${e.name}TexShape;`)}})),t.enableShapeUniforms){switch(n.logicalShape.length){case 1:c.push("uniform int outShape;");break;case 2:c.push("uniform ivec2 outShape;"),c.push("uniform int outShapeStrides;");break;case 3:c.push("uniform ivec3 outShape;"),c.push("uniform ivec2 outShapeStrides;");break;case 4:c.push("uniform ivec4 outShape;"),c.push("uniform ivec3 outShapeStrides;")}c.push("uniform ivec2 outTexShape;")}t.customUniforms&&t.customUniforms.forEach((e=>{c.push(`uniform ${e.type} ${e.name}${e.arrayIndex?`[${e.arrayIndex}]`:""};`)}));const $=c.join("\n"),v=e.map((e=>function(e,n,t=!1,i){let o="";o+=t?l(e,i):u(e,i);const c=e.shapeInfo.logicalShape,p=n.logicalShape;c.length<=p.length&&(o+=t?function(e,n){const t=e.name,i=t.charAt(0).toUpperCase()+t.slice(1),o="get"+i+"AtOutCoords",c=e.shapeInfo.logicalShape.length,u=n.logicalShape.length,l=a(e.shapeInfo.logicalShape,n.logicalShape),p=f(u),s=u-c;let x;const h=["x","y","z","w","u","v"];x=0===c?"":u<2&&l.length>=1?"coords = 0;":l.map((e=>`coords.${h[e+s]} = 0;`)).join("\n");let d="";d=u<2&&c>0?"coords":e.shapeInfo.logicalShape.map(((e,n)=>`coords.${h[n+s]}`)).join(", ");let $="return outputValue;";const v=1===r.util.sizeFromShape(e.shapeInfo.logicalShape),S=1===r.util.sizeFromShape(n.logicalShape);if(1!==c||v||S){if(v&&!S)$=1===u?"\n        return vec4(outputValue.x, outputValue.x, 0., 0.);\n      ":"\n        return vec4(outputValue.x);\n      ";else if(l.length){const e=c-2,n=c-1;l.indexOf(e)>-1&&l.indexOf(n)>-1?$="return vec4(outputValue.x);":l.indexOf(e)>-1?$="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":l.indexOf(n)>-1&&($="return vec4(outputValue.xx, outputValue.zz);")}}else $="\n      return vec4(outputValue.xy, outputValue.xy);\n    ";return`\n    vec4 ${o}() {\n      ${p} coords = getOutputCoords();\n      ${x}\n      vec4 outputValue = get${i}(${d});\n      ${$}\n    }\n  `}(e,n):function(e,n){const t=e.name,i=t.charAt(0).toUpperCase()+t.slice(1),o="get"+i+"AtOutCoords",c=n.texShape,u=e.shapeInfo.texShape,l=e.shapeInfo.logicalShape.length,p=n.logicalShape.length;if(!e.shapeInfo.isUniform&&l===p&&null==e.shapeInfo.flatOffset&&r.util.arraysEqual(u,c))return`\n      float ${o}() {\n        return sampleTexture(${t}, resultUV);\n      }\n    `;const s=f(p),x=a(e.shapeInfo.logicalShape,n.logicalShape),h=p-l;let d;const $=["x","y","z","w","u","v"];d=0===l?"":p<2&&x.length>=1?"coords = 0;":x.map((e=>`coords.${$[e+h]} = 0;`)).join("\n");let v="";v=p<2&&l>0?"coords":e.shapeInfo.logicalShape.map(((e,n)=>`coords.${$[n+h]}`)).join(", ");return`\n    float ${o}() {\n      ${s} coords = getOutputCoords();\n      ${d}\n      return get${i}(${v});\n    }\n  `}(e,n));return o}(e,n,t.packedInputs,t.enableShapeUniforms))).join("\n"),C=n.texShape,T=(0,i.A)(),m=function(e){return`\n    float sampleTexture(sampler2D textureSampler, vec2 uv) {\n      return ${e.texture2D}(textureSampler, uv).r;\n    }\n  `}(T);let R,g,w=function(e){return`${e.version}\n    precision highp float;\n    precision highp int;\n    precision highp sampler2D;\n    ${e.varyingFs} vec2 resultUV;\n    ${e.defineOutput}\n    const vec2 halfCR = vec2(0.5, 0.5);\n\n    struct ivec5\n    {\n      int x;\n      int y;\n      int z;\n      int w;\n      int u;\n    };\n\n    struct ivec6\n    {\n      int x;\n      int y;\n      int z;\n      int w;\n      int u;\n      int v;\n    };\n\n    uniform float NAN;\n    ${e.defineSpecialNaN}\n    ${e.defineSpecialInf}\n    ${e.defineRound}\n\n    int imod(int x, int y) {\n      return x - y * (x / y);\n    }\n\n    int idiv(int a, int b, float sign) {\n      int res = a / b;\n      int mod = imod(a, b);\n      if (sign < 0. && mod != 0) {\n        res -= 1;\n      }\n      return res;\n    }\n\n    //Based on the work of Dave Hoskins\n    //https://www.shadertoy.com/view/4djSRW\n    #define HASHSCALE1 443.8975\n    float random(float seed){\n      vec2 p = resultUV * seed;\n      vec3 p3  = fract(vec3(p.xyx) * HASHSCALE1);\n      p3 += dot(p3, p3.yzx + 19.19);\n      return fract((p3.x + p3.y) * p3.z);\n    }\n\n    ${p}\n    ${s}\n    ${x}\n  `}(T);n.isPacked?(R=function(e,n,t){switch(e.length){case 0:return d();case 1:return function(e,n,t){const r=[Math.ceil(n[0]/2),Math.ceil(n[1]/2)];if(1===r[0])return t?"\n      int getOutputCoords() {\n        return 2 * int(resultUV.x * ceil(float(outTexShape[1]) / 2.0));\n      }\n    ":`\n      int getOutputCoords() {\n        return 2 * int(resultUV.x * ${r[1]}.0);\n      }\n    `;if(1===r[1])return t?"\n      int getOutputCoords() {\n        return 2 * int(resultUV.y * ceil(float(outTexShape[0]) / 2.0));\n      }\n    ":`\n      int getOutputCoords() {\n        return 2 * int(resultUV.y * ${r[0]}.0);\n      }\n    `;if(t)return"\n    int getOutputCoords() {\n      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(packedTexShape[0], packedTexShape[1]));\n      return 2 * (resTexRC.x * packedTexShape[1] + resTexRC.y);\n    }\n  ";return`\n    int getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(${r[0]}, ${r[1]}));\n      return 2 * (resTexRC.x * ${r[1]} + resTexRC.y);\n    }\n  `}(0,n,t);case 2:return function(e,n,t){const i=[Math.ceil(n[0]/2),Math.ceil(n[1]/2)];if(r.util.arraysEqual(e,n))return t?"\n      ivec2 getOutputCoords() {\n        ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));\n        return 2 * ivec2(resultUV.yx * vec2(packedTexShape[0], packedTexShape[1]));\n      }\n    ":`\n      ivec2 getOutputCoords() {\n        return 2 * ivec2(resultUV.yx * vec2(${i[0]}, ${i[1]}));\n      }\n    `;const o=Math.ceil(e[1]/2);if(t)return"\n    ivec2 getOutputCoords() {\n      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));\n      int texelsInLogicalRow = int(ceil(float(outShape[1]) / 2.0));\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(packedTexShape[0], packedTexShape[1]));\n\n      int index = resTexRC.x * packedTexShape[1] + resTexRC.y;\n      int r = 2 * (index / texelsInLogicalRow);\n      int c = imod(index, texelsInLogicalRow) * 2;\n\n      return ivec2(r, c);\n    }\n  ";return`\n    ivec2 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(${i[0]}, ${i[1]}));\n\n      int index = resTexRC.x * ${i[1]} + resTexRC.y;\n      int r = 2 * (index / ${o});\n      int c = imod(index, ${o}) * 2;\n\n      return ivec2(r, c);\n    }\n  `}(e,n,t);case 3:return function(e,n,t){if(t)return"\n    ivec3 getOutputCoords() {\n      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));\n      int texelsInLogicalRow = int(ceil(float(outShape[2]) / 2.0));\n      int texelsInBatch = texelsInLogicalRow * int(ceil(float(outShape[1]) / 2.0));\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(packedTexShape[0], packedTexShape[1]));\n      int index = resTexRC.x * packedTexShape[1] + resTexRC.y;\n\n      int b = index / texelsInBatch;\n      index -= b * texelsInBatch;\n\n      int r = 2 * (index / texelsInLogicalRow);\n      int c = imod(index, texelsInLogicalRow) * 2;\n\n      return ivec3(b, r, c);\n    }\n  ";const r=[Math.ceil(n[0]/2),Math.ceil(n[1]/2)],i=Math.ceil(e[2]/2),o=i*Math.ceil(e[1]/2);return`\n    ivec3 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(${r[0]}, ${r[1]}));\n      int index = resTexRC.x * ${r[1]} + resTexRC.y;\n\n      int b = index / ${o};\n      index -= b * ${o};\n\n      int r = 2 * (index / ${i});\n      int c = imod(index, ${i}) * 2;\n\n      return ivec3(b, r, c);\n    }\n  `}(e,n,t);default:return function(e,n,t){if(t)return"\n    ivec4 getOutputCoords() {\n      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(packedTexShape[0], packedTexShape[1]));\n      int index = resTexRC.x * packedTexShape[1] + resTexRC.y;\n\n      int texelsInLogicalRow = int(ceil(float(outShape[3]) / 2.0));\n      int texelsInBatch = texelsInLogicalRow * int(ceil(float(outShape[2]) / 2.0));\n      int texelsInBatchN = texelsInBatch * outShape[1];\n\n      int b2 = index / texelsInBatchN;\n      index -= b2 * texelsInBatchN;\n\n      int b = index / texelsInBatch;\n      index -= b * texelsInBatch;\n\n      int r = 2 * (index / texelsInLogicalRow);\n      int c = imod(index, texelsInLogicalRow) * 2;\n\n      return ivec4(b2, b, r, c);\n    }\n  ";const r=[Math.ceil(n[0]/2),Math.ceil(n[1]/2)],i=Math.ceil(e[e.length-1]/2),o=i*Math.ceil(e[e.length-2]/2);let a=o,c="",u="b, r, c";for(let l=2;l<e.length-1;l++)a*=e[e.length-l-1],c=`\n      int b${l} = index / ${a};\n      index -= b${l} * ${a};\n    `+c,u=`b${l}, `+u;return`\n    ivec${e.length} getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(${r[0]}, ${r[1]}));\n      int index = resTexRC.x * ${r[1]} + resTexRC.y;\n\n      ${c}\n\n      int b = index / ${o};\n      index -= b * ${o};\n\n      int r = 2 * (index / ${i});\n      int c = imod(index, ${i}) * 2;\n\n      return ivec${e.length}(${u});\n    }\n  `}(e,n,t)}}(n.logicalShape,C,t.enableShapeUniforms),g=function(e){return`\n    void setOutput(vec4 val) {\n      ${e.output} = val;\n    }\n  `}(T)):(R=function(e,n,t){switch(e.length){case 0:return d();case 1:return function(e,n,t){if(1===n[0])return t?"\n      int getOutputCoords() {\n        return int(resultUV.x * float(outTexShape[1]));\n      }\n    ":`\n      int getOutputCoords() {\n        return int(resultUV.x * ${n[1]}.0);\n      }\n    `;if(1===n[1])return t?"\n      int getOutputCoords() {\n        return int(resultUV.y * float(outTexShape[0]));\n      }\n    ":`\n      int getOutputCoords() {\n        return int(resultUV.y * ${n[0]}.0);\n      }\n    `;if(t)return"\n    int getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(outTexShape[0], outTexShape[1]));\n      return resTexRC.x * outTexShape[1] + resTexRC.y;\n    }\n  ";return`\n    int getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(${n[0]}, ${n[1]}));\n      return resTexRC.x * ${n[1]} + resTexRC.y;\n    }\n  `}(0,n,t);case 2:return function(e,n,t){if(r.util.arraysEqual(e,n))return t?"\n      ivec2 getOutputCoords() {\n        return ivec2(resultUV.yx * vec2(outTexShape[0], outTexShape[1]));\n      }\n    ":`\n      ivec2 getOutputCoords() {\n        return ivec2(resultUV.yx * vec2(${n[0]}, ${n[1]}));\n      }\n    `;if(1===e[1])return t?"\n      ivec2 getOutputCoords() {\n        ivec2 resTexRC = ivec2(resultUV.yx *\n                               vec2(outTexShape[0], outTexShape[1]));\n        int index = resTexRC.x * outTexShape[1] + resTexRC.y;\n        return ivec2(index, 0);\n      }\n    ":`\n      ivec2 getOutputCoords() {\n        ivec2 resTexRC = ivec2(resultUV.yx *\n                               vec2(${n[0]}, ${n[1]}));\n        int index = resTexRC.x * ${n[1]} + resTexRC.y;\n        return ivec2(index, 0);\n      }\n    `;if(1===e[0])return t?"\n      ivec2 getOutputCoords() {\n        ivec2 resTexRC = ivec2(resultUV.yx *\n                               vec2(outTexShape[0], outTexShape[1]));\n        int index = resTexRC.x * outTexShape[1] + resTexRC.y;\n        return ivec2(0, index);\n      }\n    ":`\n      ivec2 getOutputCoords() {\n        ivec2 resTexRC = ivec2(resultUV.yx *\n                               vec2(${n[0]}, ${n[1]}));\n        int index = resTexRC.x * ${n[1]} + resTexRC.y;\n        return ivec2(0, index);\n      }\n    `;if(t)return"\n    ivec2 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(outTexShape[0], outTexShape[1]));\n      int index = resTexRC.x * outTexShape[1] + resTexRC.y;\n      int r = index / outShape[1];\n      int c = index - r * outShape[1];\n      return ivec2(r, c);\n    }\n  ";return`\n    ivec2 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(${n[0]}, ${n[1]}));\n      int index = resTexRC.x * ${n[1]} + resTexRC.y;\n      int r = index / ${e[1]};\n      int c = index - r * ${e[1]};\n      return ivec2(r, c);\n    }\n  `}(e,n,t);case 3:return function(e,n,t){if(t){return`\n  ivec3 getOutputCoords() {\n    ivec2 resTexRC = ivec2(resultUV.yx *\n                           vec2(outTexShape[0], outTexShape[1]));\n    int index = resTexRC.x * outTexShape[1] + resTexRC.y;\n    ${o.Kn(["r","c","d"],e)}\n    return ivec3(r, c, d);\n  }\n`}const r=o.RW(["r","c","d"],e);return`\n    ivec3 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(${n[0]}, ${n[1]}));\n      int index = resTexRC.x * ${n[1]} + resTexRC.y;\n      ${r}\n      return ivec3(r, c, d);\n    }\n  `}(e,n,t);case 4:return function(e,n,t){if(t){return`\n    ivec4 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n        vec2(outTexShape[0], outTexShape[1]));\n      int index = resTexRC.x * outTexShape[1] + resTexRC.y;\n      ${o.Kn(["r","c","d","d2"],e)}\n      return ivec4(r, c, d, d2);\n    }\n  `}const r=o.RW(["r","c","d","d2"],e);return`\n    ivec4 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n        vec2(${n[0]}, ${n[1]}));\n      int index = resTexRC.x * ${n[1]} + resTexRC.y;\n      ${r}\n      return ivec4(r, c, d, d2);\n    }\n  `}(e,n,t);case 5:return function(e,n){const t=o.RW(["r","c","d","d2","d3"],e);return`\n    ivec5 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx * vec2(${n[0]},\n                             ${n[1]}));\n\n      int index = resTexRC.x * ${n[1]} + resTexRC.y;\n\n      ${t}\n\n      ivec5 outShape = ivec5(r, c, d, d2, d3);\n      return outShape;\n    }\n  `}(e,n);case 6:return function(e,n){const t=o.RW(["r","c","d","d2","d3","d4"],e);return`\n    ivec6 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n        vec2(${n[0]}, ${n[1]}));\n      int index = resTexRC.x * ${n[1]} + resTexRC.y;\n\n      ${t}\n\n      ivec6 result = ivec6(r, c, d, d2, d3, d4);\n      return result;\n    }\n  `}(e,n);default:throw new Error(`${e.length}-D output sampling is not yet supported`)}}(n.logicalShape,C,t.enableShapeUniforms),g=function(e){return`\n    void setOutput(float val) {\n      ${e.output} = vec4(val, 0, 0, 0);\n    }\n  `}(T)),t.packedInputs&&(w+=h);return[w,m,g,$,R,v,t.userCode].join("\n")}function u(e,n=!1){const t=e.shapeInfo.logicalShape;switch(t.length){case 0:return function(e,n){const t=e.name,r="get"+t.charAt(0).toUpperCase()+t.slice(1);if(e.shapeInfo.isUniform)return`float ${r}() {return ${t};}`;const[i,o]=e.shapeInfo.texShape;if(1===i&&1===o)return`\n      float ${r}() {\n        return sampleTexture(${t}, halfCR);\n      }\n    `;const a=$(t);if(n)return`\n    float ${r}() {\n      vec2 uv = uvFromFlat(${t}TexShape[0], ${t}TexShape[1], ${a});\n      return sampleTexture(${t}, uv);\n    }\n  `;const[c,u]=e.shapeInfo.texShape;return`\n    float ${r}() {\n      vec2 uv = uvFromFlat(${c}, ${u}, ${a});\n      return sampleTexture(${t}, uv);\n    }\n  `}(e,n);case 1:return function(e,n){const t=e.name,r="get"+t.charAt(0).toUpperCase()+t.slice(1);if(e.shapeInfo.isUniform)return`\n      float ${r}(int index) {\n        ${v(e)}\n      }\n    `;const i=e.shapeInfo.texShape,o=i[0],a=i[1];if(1===a&&1===o)return`\n      float ${r}(int index) {\n        return sampleTexture(${t}, halfCR);\n      }\n    `;const c=$(t);if(1===a)return n?`\n      float ${r}(int index) {\n        vec2 uv = vec2(0.5, (float(index + ${c}) + 0.5) / float(${t}TexShape[0]));\n        return sampleTexture(${t}, uv);\n      }\n    `:`\n      float ${r}(int index) {\n        vec2 uv = vec2(0.5, (float(index + ${c}) + 0.5) / ${o}.0);\n        return sampleTexture(${t}, uv);\n      }\n    `;if(1===o)return n?`\n      float ${r}(int index) {\n        vec2 uv = vec2((float(index + ${c}) + 0.5) / float(${t}TexShape[1]), 0.5);\n        return sampleTexture(${t}, uv);\n      }\n    `:`\n      float ${r}(int index) {\n        vec2 uv = vec2((float(index + ${c}) + 0.5) / ${a}.0, 0.5);\n        return sampleTexture(${t}, uv);\n      }\n    `;if(n)return`\n    float ${r}(int index) {\n      vec2 uv = uvFromFlat(${t}TexShape[0], ${t}TexShape[1], index + ${c});\n      return sampleTexture(${t}, uv);\n    }\n  `;return`\n    float ${r}(int index) {\n      vec2 uv = uvFromFlat(${o}, ${a}, index + ${c});\n      return sampleTexture(${t}, uv);\n    }\n  `}(e,n);case 2:return function(e,n){const t=e.shapeInfo.logicalShape,i=e.name,o="get"+i.charAt(0).toUpperCase()+i.slice(1),a=e.shapeInfo.texShape;if(null!=a&&r.util.arraysEqual(t,a)){if(n)return`\n      float ${o}(int row, int col) {\n        vec2 uv = (vec2(col, row) + halfCR) / vec2(${i}TexShape[1], ${i}TexShape[0]);\n        return sampleTexture(${i}, uv);\n      }\n    `;const e=a[0];return`\n    float ${o}(int row, int col) {\n      vec2 uv = (vec2(col, row) + halfCR) / vec2(${a[1]}.0, ${e}.0);\n      return sampleTexture(${i}, uv);\n    }\n  `}const{newShape:c,keptDims:l}=r.util.squeezeShape(t),p=c;if(p.length<t.length){const t=["row","col"];return`\n      ${u(C(e,p),n)}\n      float ${o}(int row, int col) {\n        return ${o}(${T(t,l)});\n      }\n    `}if(e.shapeInfo.isUniform)return`\n      float ${o}(int row, int col) {\n        int index = round(dot(vec2(row, col), vec2(${t[1]}, 1)));\n        ${v(e)}\n      }\n    `;const s=a[0],x=a[1],h=$(i);if(1===x)return n?`\n      float ${o}(int row, int col) {\n        float index = dot(vec3(row, col, ${h}), vec3(${i}Shape[1], 1, 1));\n        vec2 uv = vec2(0.5, (index + 0.5) / float(${i}TexShape[0]));\n        return sampleTexture(${i}, uv);\n      }\n    `:`\n    float ${o}(int row, int col) {\n      float index = dot(vec3(row, col, ${h}), vec3(${t[1]}, 1, 1));\n      vec2 uv = vec2(0.5, (index + 0.5) / ${s}.0);\n      return sampleTexture(${i}, uv);\n    }\n  `;if(1===s)return n?`\n      float ${o}(int row, int col) {\n        float index = dot(vec3(row, col, ${h}), vec3(${i}Shape[1], 1, 1));\n        vec2 uv = vec2((index + 0.5) / float(${i}TexShape[1]), 0.5);\n        return sampleTexture(${i}, uv);\n      }\n    `:`\n    float ${o}(int row, int col) {\n      float index = dot(vec3(row, col, ${h}), vec3(${t[1]}, 1, 1));\n      vec2 uv = vec2((index + 0.5) / ${x}.0, 0.5);\n      return sampleTexture(${i}, uv);\n    }\n  `;if(n)return`\n      float ${o}(int row, int col) {\n        // Explicitly use integer operations as dot() only works on floats.\n        int index = row * ${i}Shape[1] + col + ${h};\n        vec2 uv = uvFromFlat(${i}TexShape[0], ${i}TexShape[1], index);\n        return sampleTexture(${i}, uv);\n      }\n    `;return`\n  float ${o}(int row, int col) {\n    // Explicitly use integer operations as dot() only works on floats.\n    int index = row * ${t[1]} + col + ${h};\n    vec2 uv = uvFromFlat(${s}, ${x}, index);\n    return sampleTexture(${i}, uv);\n  }\n`}(e,n);case 3:return function(e,n){const t=e.shapeInfo.logicalShape,i=e.name,o="get"+i.charAt(0).toUpperCase()+i.slice(1),a=t[1]*t[2],c=t[2],{newShape:l,keptDims:p}=r.util.squeezeShape(t),s=l;if(s.length<t.length){const t=["row","col","depth"];return`\n        ${u(C(e,s),n)}\n        float ${o}(int row, int col, int depth) {\n          return ${o}(${T(t,p)});\n        }\n      `}if(e.shapeInfo.isUniform)return`\n      float ${o}(int row, int col, int depth) {\n        int index = round(dot(vec3(row, col, depth),\n                          vec3(${a}, ${c}, 1)));\n        ${v(e)}\n      }\n    `;const x=e.shapeInfo.texShape,h=x[0],d=x[1],f=e.shapeInfo.flatOffset;if(d===a&&null==f)return n?`\n      float ${o}(int row, int col, int depth) {\n        int stride1 = ${i}Shape[2];\n        float texR = float(row);\n        float texC = dot(vec2(col, depth), vec2(stride1, 1));\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                   vec2(${i}TexShape[1], ${i}TexShape[0]);\n        return sampleTexture(${i}, uv);\n      }\n    `:`\n        float ${o}(int row, int col, int depth) {\n          float texR = float(row);\n          float texC = dot(vec2(col, depth), vec2(${c}, 1));\n          vec2 uv = (vec2(texC, texR) + halfCR) /\n                     vec2(${d}.0, ${h}.0);\n          return sampleTexture(${i}, uv);\n        }\n      `;if(d===c&&null==f)return n?`\n      float ${o}(int row, int col, int depth) {\n        float texR = dot(vec2(row, col), vec2(${i}Shape[1], 1));\n        float texC = float(depth);\n        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${i}TexShape[1], ${i}TexShape[0]);\n        return sampleTexture(${i}, uv);\n      }\n    `:`\n    float ${o}(int row, int col, int depth) {\n      float texR = dot(vec2(row, col), vec2(${t[1]}, 1));\n      float texC = float(depth);\n      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${d}.0, ${h}.0);\n      return sampleTexture(${i}, uv);\n    }\n  `;const S=$(i);if(n)return`\n    float ${o}(int row, int col, int depth) {\n      // Explicitly use integer operations as dot() only works on floats.\n      int stride0 = ${i}Shape[1] * ${i}Shape[2];\n      int stride1 = ${i}Shape[2];\n      int index = row * ${a} + col * ${c} + depth + ${S};\n      vec2 uv = uvFromFlat(${i}TexShape[0], ${i}TexShape[1], index);\n      return sampleTexture(${i}, uv);\n    }\n    `;return`\n      float ${o}(int row, int col, int depth) {\n        // Explicitly use integer operations as dot() only works on floats.\n        int index = row * ${a} + col * ${c} + depth + ${S};\n        vec2 uv = uvFromFlat(${h}, ${d}, index);\n        return sampleTexture(${i}, uv);\n      }\n  `}(e,n);case 4:return function(e,n){const t=e.shapeInfo.logicalShape,i=e.name,o="get"+i.charAt(0).toUpperCase()+i.slice(1),a=t[3],c=t[2]*a,l=t[1]*c,{newShape:p,keptDims:s}=r.util.squeezeShape(t);if(p.length<t.length){const t=["row","col","depth","depth2"];return`\n      ${u(C(e,p),n)}\n      float ${o}(int row, int col, int depth, int depth2) {\n        return ${o}(${T(t,s)});\n      }\n    `}if(e.shapeInfo.isUniform)return`\n      float ${o}(int row, int col, int depth, int depth2) {\n        int index = round(dot(vec4(row, col, depth, depth2),\n                          vec4(${l}, ${c}, ${a}, 1)));\n        ${v(e)}\n      }\n    `;const x=e.shapeInfo.flatOffset,h=e.shapeInfo.texShape,d=h[0],f=h[1],S=`int stride2 = ${i}Shape[3];`,m=`int stride1 = ${i}Shape[2] * stride2;`,R=`int stride0 = ${i}Shape[1] * stride1;`;if(f===l&&null==x)return n?`\n      float ${o}(int row, int col, int depth, int depth2) {\n        ${S}\n        ${m}\n        float texR = float(row);\n        float texC =\n            dot(vec3(col, depth, depth2),\n                vec3(stride1, stride2, 1));\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                   vec2(${i}TexShape[1], ${i}TexShape[0]);\n        return sampleTexture(${i}, uv);\n      }\n    `:`\n      float ${o}(int row, int col, int depth, int depth2) {\n        float texR = float(row);\n        float texC =\n            dot(vec3(col, depth, depth2),\n                vec3(${c}, ${a}, 1));\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                   vec2(${f}.0, ${d}.0);\n        return sampleTexture(${i}, uv);\n      }\n    `;if(f===a&&null==x)return n?`\n      float ${o}(int row, int col, int depth, int depth2) {\n        float texR = dot(vec3(row, col, depth),\n                         vec3(${i}Shape[1] * ${i}Shape[2], ${i}Shape[2], 1));\n        float texC = float(depth2);\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                  vec2(${i}TexShape[1], ${i}TexShape[0]);\n        return sampleTexture(${i}, uv);\n      }\n    `:`\n      float ${o}(int row, int col, int depth, int depth2) {\n        float texR = dot(vec3(row, col, depth),\n                         vec3(${t[1]*t[2]}, ${t[2]}, 1));\n        float texC = float(depth2);\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                  vec2(${f}.0, ${d}.0);\n        return sampleTexture(${i}, uv);\n      }\n    `;const g=$(i);if(n)return`\n    float ${o}(int row, int col, int depth, int depth2) {\n      // Explicitly use integer operations as dot() only works on floats.\n      ${S}\n      ${m}\n      ${R}\n      int index = row * stride0 + col * stride1 +\n          depth * stride2 + depth2;\n      vec2 uv = uvFromFlat(${i}TexShape[0], ${i}TexShape[1], index + ${g});\n      return sampleTexture(${i}, uv);\n    }\n  `;return`\n    float ${o}(int row, int col, int depth, int depth2) {\n      // Explicitly use integer operations as dot() only works on floats.\n      int index = row * ${l} + col * ${c} +\n          depth * ${a} + depth2;\n      vec2 uv = uvFromFlat(${d}, ${f}, index + ${g});\n      return sampleTexture(${i}, uv);\n    }\n  `}(e,n);case 5:return function(e){const n=e.shapeInfo.logicalShape,t=e.name,i="get"+t.charAt(0).toUpperCase()+t.slice(1),o=n[4],a=n[3]*o,c=n[2]*a,l=n[1]*c,{newShape:p,keptDims:s}=r.util.squeezeShape(n);if(p.length<n.length){const n=["row","col","depth","depth2","depth3"];return`\n      ${u(C(e,p))}\n      float ${i}(int row, int col, int depth, int depth2, int depth3) {\n        return ${i}(${T(n,s)});\n      }\n    `}if(e.shapeInfo.isUniform)return`\n      float ${i}(int row, int col, int depth, int depth2, int depth3) {\n        float index = dot(\n          vec4(row, col, depth, depth2),\n          vec4(${l}, ${c}, ${a}, ${o})) +\n          depth3;\n        ${v(e)}\n      }\n    `;const x=e.shapeInfo.flatOffset,h=e.shapeInfo.texShape,d=h[0],f=h[1];if(f===l&&null==x)return`\n      float ${i}(int row, int col, int depth, int depth2, int depth3) {\n        int texR = row;\n        float texC = dot(vec4(col, depth, depth2, depth3),\n                         vec4(${c}, ${a}, ${o}, 1));\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                   vec2(${f}.0, ${d}.0);\n        return sampleTexture(${t}, uv);\n      }\n    `;if(f===o&&null==x)return`\n      float ${i}(int row, int col, int depth, int depth2, int depth3) {\n        float texR = dot(\n          vec4(row, col, depth, depth2),\n          vec4(${n[1]*n[2]*n[3]},\n               ${n[2]*n[3]}, ${n[3]}, 1));\n        int texC = depth3;\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                  vec2(${f}.0, ${d}.0);\n        return sampleTexture(${t}, uv);\n      }\n    `;const S=$(t);return`\n    float ${i}(int row, int col, int depth, int depth2, int depth3) {\n      // Explicitly use integer operations as dot() only works on floats.\n      int index = row * ${l} + col * ${c} + depth * ${a} +\n          depth2 * ${o} + depth3 + ${S};\n      vec2 uv = uvFromFlat(${d}, ${f}, index);\n      return sampleTexture(${t}, uv);\n    }\n  `}(e);case 6:return function(e){const n=e.shapeInfo.logicalShape,t=e.name,i="get"+t.charAt(0).toUpperCase()+t.slice(1),{newShape:o,keptDims:a}=r.util.squeezeShape(n);if(o.length<n.length){const n=["row","col","depth","depth2","depth3","depth4"];return`\n      ${u(C(e,o))}\n      float ${i}(int row, int col, int depth,\n                    int depth2, int depth3, int depth4) {\n        return ${i}(${T(n,a)});\n      }\n    `}const c=n[5],l=n[4]*c,p=n[3]*l,s=n[2]*p,x=n[1]*s;if(e.shapeInfo.isUniform)return`\n      float ${i}(int row, int col, int depth,\n                  int depth2, int depth3, int depth4) {\n        int index = round(dot(\n          vec4(row, col, depth, depth2),\n          vec4(${x}, ${s}, ${p}, ${l})) +\n          dot(\n            vec2(depth3, depth4),\n            vec2(${c}, 1)));\n        ${v(e)}\n      }\n    `;const h=e.shapeInfo.flatOffset,d=e.shapeInfo.texShape,f=d[0],S=d[1];if(S===x&&null==h)return`\n      float ${i}(int row, int col, int depth,\n                    int depth2, int depth3, int depth4) {\n        int texR = row;\n        float texC = dot(vec4(col, depth, depth2, depth3),\n          vec4(${s}, ${p}, ${l}, ${c})) +\n               float(depth4);\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                   vec2(${S}.0, ${f}.0);\n        return sampleTexture(${t}, uv);\n      }\n    `;if(S===c&&null==h)return`\n      float ${i}(int row, int col, int depth,\n                    int depth2, int depth3, int depth4) {\n        float texR = dot(vec4(row, col, depth, depth2),\n          vec4(${n[1]*n[2]*n[3]*n[4]},\n               ${n[2]*n[3]*n[4]},\n               ${n[3]*n[4]},\n               ${n[4]})) + float(depth3);\n        int texC = depth4;\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                  vec2(${S}.0, ${f}.0);\n        return sampleTexture(${t}, uv);\n      }\n    `;const m=$(t);return`\n    float ${i}(int row, int col, int depth,\n                  int depth2, int depth3, int depth4) {\n      // Explicitly use integer operations as dot() only works on floats.\n      int index = row * ${x} + col * ${s} + depth * ${p} +\n          depth2 * ${l} + depth3 * ${c} + depth4 + ${m};\n      vec2 uv = uvFromFlat(${f}, ${S}, index);\n      return sampleTexture(${t}, uv);\n    }\n  `}(e);default:throw new Error(`${t.length}-D input sampling is not yet supported`)}}function l(e,n){switch(e.shapeInfo.logicalShape.length){case 0:return function(e){const n=e.name,t="get"+n.charAt(0).toUpperCase()+n.slice(1),r=(0,i.A)();return`\n    vec4 ${t}() {\n      return ${r.texture2D}(${n}, halfCR);\n    }\n  `}(e);case 1:return function(e,n){const t=e.name,r="get"+t.charAt(0).toUpperCase()+t.slice(1),o=e.shapeInfo.texShape,a=(0,i.A)();if(n)return`\n    vec4 ${r}(int index) {\n      ivec2 packedTexShape = ivec2(ceil(float(${t}TexShape[0]) / 2.0), ceil(float(${t}TexShape[1]) / 2.0));\n      vec2 uv = packedUVfrom1D(\n        packedTexShape[0], packedTexShape[1], index);\n      return ${a.texture2D}(${t}, uv);\n    }\n  `;const c=[Math.ceil(o[0]/2),Math.ceil(o[1]/2)];return`\n    vec4 ${r}(int index) {\n      vec2 uv = packedUVfrom1D(\n        ${c[0]}, ${c[1]}, index);\n      return ${a.texture2D}(${t}, uv);\n    }\n  `}(e,n);case 2:return function(e,n){const t=e.shapeInfo.logicalShape,o=e.name,a="get"+o.charAt(0).toUpperCase()+o.slice(1),c=e.shapeInfo.texShape,u=c[0],l=c[1],p=(0,i.A)();if(null!=c&&r.util.arraysEqual(t,c))return n?`\n      vec4 ${a}(int row, int col) {\n        vec2 uv = (vec2(col, row) + halfCR) / vec2(${o}TexShape[1], ${o}TexShape[0]);\n\n        return ${p.texture2D}(${o}, uv);\n      }\n    `:`\n      vec4 ${a}(int row, int col) {\n        vec2 uv = (vec2(col, row) + halfCR) / vec2(${l}.0, ${u}.0);\n\n        return ${p.texture2D}(${o}, uv);\n      }\n    `;if(n)return`\n    vec4 ${a}(int row, int col) {\n      ivec2 packedTexShape = ivec2(ceil(float(${o}TexShape[0]) / 2.0), ceil(float(${o}TexShape[1]) / 2.0));\n      int valuesPerRow = int(ceil(float(${o}Shape[1]) / 2.0));\n      vec2 uv = packedUVfrom2D(valuesPerRow, packedTexShape[0], packedTexShape[1], row, col);\n      return ${p.texture2D}(${o}, uv);\n    }\n  `;const s=[Math.ceil(c[0]/2),Math.ceil(c[1]/2)],x=Math.ceil(t[1]/2);return`\n    vec4 ${a}(int row, int col) {\n      vec2 uv = packedUVfrom2D(${x}, ${s[0]}, ${s[1]}, row, col);\n      return ${p.texture2D}(${o}, uv);\n    }\n  `}(e,n);case 3:return function(e,n){const t=e.shapeInfo.logicalShape,r=e.name,o="get"+r.charAt(0).toUpperCase()+r.slice(1),a=e.shapeInfo.texShape,c=[Math.ceil(a[0]/2),Math.ceil(a[1]/2)];if(1===t[0]){const r=[1,2],i=["b","row","col"];return`\n        ${l(C(e,t.slice(1)),n)}\n        vec4 ${o}(int b, int row, int col) {\n          return ${o}(${T(i,r)});\n        }\n      `}const u=(0,i.A)();if(n)return`\n    vec4 ${o}(int b, int row, int col) {\n      ivec2 packedTexShape = ivec2(ceil(float(${r}TexShape[0]) / 2.0), ceil(float(${r}TexShape[1]) / 2.0));\n      int valuesPerRow = int(ceil(float(${r}Shape[2]) / 2.0));\n      int texelsInBatch = valuesPerRow * int(ceil(float(${r}Shape[1]) / 2.0));\n      vec2 uv = packedUVfrom3D(\n        packedTexShape[0], packedTexShape[1], texelsInBatch, valuesPerRow, b, row, col);\n      return ${u.texture2D}(${r}, uv);\n    }\n  `;const p=c[0],s=c[1],x=Math.ceil(t[2]/2),h=x*Math.ceil(t[1]/2);return`\n    vec4 ${o}(int b, int row, int col) {\n      vec2 uv = packedUVfrom3D(\n        ${p}, ${s}, ${h}, ${x}, b, row, col);\n      return ${u.texture2D}(${r}, uv);\n    }\n  `}(e,n);default:return function(e,n){const t=e.name,r="get"+t.charAt(0).toUpperCase()+t.slice(1),o=(0,i.A)();if(n)return`\n    vec4 ${r}(int b2, int b, int row, int col) {\n      int valuesPerRow = int(ceil(float(${t}Shape[3]) / 2.0));\n      int texelsInBatch = valuesPerRow * int(ceil(float(${t}Shape[2]) / 2.0));\n      int index = b * texelsInBatch + (row / 2) * valuesPerRow + (col / 2);\n      texelsInBatch *= ${t}Shape[1];\n      index = b2 * texelsInBatch + index;\n      ivec2 packedTexShape = ivec2(ceil(float(${t}TexShape[0]) / 2.0), ceil(float(${t}TexShape[1]) / 2.0));\n      int texR = index / packedTexShape[1];\n      int texC = index - texR * packedTexShape[1];\n      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(packedTexShape[1], packedTexShape[0]); return ${o.texture2D}(${t}, uv);\n    }\n  `;const a=e.shapeInfo.logicalShape,c=a.length,u=e.shapeInfo.texShape,l=[Math.ceil(u[0]/2),Math.ceil(u[1]/2)],p=l[0],s=l[1],x=Math.ceil(a[c-1]/2);let h=x*Math.ceil(a[c-2]/2),d="int b, int row, int col",$=`b * ${h} + (row / 2) * ${x} + (col / 2)`;for(let i=2;i<c-1;i++)d=`int b${i}, `+d,h*=a[c-i-1],$=`b${i} * ${h} + `+$;return`\n    vec4 ${r}(${d}) {\n      int index = ${$};\n      int texR = index / ${s};\n      int texC = index - texR * ${s};\n      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${s}, ${p});\n      return ${o.texture2D}(${t}, uv);\n    }\n  `}(e,n)}}const p="\nvec2 uvFromFlat(int texNumR, int texNumC, int index) {\n  int texR = index / texNumC;\n  int texC = index - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\nvec2 packedUVfrom1D(int texNumR, int texNumC, int index) {\n  int texelIndex = index / 2;\n  int texR = texelIndex / texNumC;\n  int texC = texelIndex - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\n",s="\nvec2 packedUVfrom2D(int texelsInLogicalRow, int texNumR,\n  int texNumC, int row, int col) {\n  int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);\n  int texR = texelIndex / texNumC;\n  int texC = texelIndex - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\n",x="\nvec2 packedUVfrom3D(int texNumR, int texNumC,\n    int texelsInBatch, int texelsInLogicalRow, int b,\n    int row, int col) {\n  int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);\n  int texR = index / texNumC;\n  int texC = index - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\n",h="\n  float getChannel(vec4 frag, vec2 innerDims) {\n    vec2 modCoord = mod(innerDims, 2.);\n    return modCoord.x == 0. ?\n      (modCoord.y == 0. ? frag.r : frag.g) :\n      (modCoord.y == 0. ? frag.b : frag.a);\n  }\n  float getChannel(vec4 frag, int dim) {\n    float modCoord = mod(float(dim), 2.);\n    return modCoord == 0. ? frag.r : frag.g;\n  }\n";function d(){return"\n    int getOutputCoords() {\n      return 0;\n    }\n  "}function $(e){return`offset${e}`}function v(e){const n=e.name,t=r.util.sizeFromShape(e.shapeInfo.logicalShape);return t<2?`return ${n};`:`\n    for (int i = 0; i < ${t}; i++) {\n      if (i == index) {\n        return ${n}[i];\n      }\n    }\n  `}function f(e){if(e<=1)return"int";if(2===e)return"ivec2";if(3===e)return"ivec3";if(4===e)return"ivec4";if(5===e)return"ivec5";if(6===e)return"ivec6";throw Error(`GPU for rank ${e} is not yet supported`)}function S(e,n,t){const{newShape:i,keptDims:o}=r.util.squeezeShape(n),a=n.length,c=e&&3===a&&1===n[0],u=c?n.slice(1):i,l=!e&&a>1&&!r.util.arraysEqual(n,t)&&i.length<a||c;return{useSqueezeShape:l,uniformShape:l?u:n,keptDims:o}}function C(e,n){const t=JSON.parse(JSON.stringify(e));return t.shapeInfo.logicalShape=n,t}function T(e,n){return n.map((n=>e[n])).join(", ")}}}]);