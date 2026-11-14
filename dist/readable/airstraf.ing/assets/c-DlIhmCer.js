import { $ as e, Ar as n, Br as t, Ct as s, Hr as r, It as a, Rr as i, b as c, lr as o, nn as v, qt as u, tt as l, ur as h, zr as m } from "./three-Bi9Yyrpt.js";
import { c as x } from "./c-C_iq9rgQ.js";
import { x as p } from "./c-j2W5q53j.js";
import { i as f, r as d } from "./c-D-iNDOV5.js";
function _(e, n, t) {
  return t && t in e.profiles ? t : e.maps[n] ?? null;
}
var g = e => .2126 * e[0] + .7152 * e[1] + .0722 * e[2],
  w = e => {
    const n = g(e);
    return [0, 1, 2].map(item => e[item] - n + e[3]);
  },
  y = e => {
    const n = g(e);
    return [0, 1, 2].map(item => e[item] - n + e[3] + 1);
  },
  C = e => {
    const n = g(e);
    return [0, 1, 2].map(item => 1 / Math.max(e[item] - n + e[3] + 1, .001));
  };
function M(e, n) {
  const t = e / 60,
    s = .31271 - t * (t < 0 ? .1 : .05),
    r = 2.87 * s - 3 * s * s - .27509507 + n / 60 * .05,
    a = s / r,
    i = (1 - s - r) / r;
  return [.949237 / (.7328 * a + .4296 - .1624 * i), 1.03542 / (-.7036 * a + 1.6975 + .0061 * i), 1.08728 / (.003 * a + .0136 + .9834 * i)];
}
function b(e) {
  const n = e.mixer.map(item => item / 100);
  return {
    _Brightness: (e.brightness + 100) / 100,
    _HueSatCon: [e.hueShift / 360, e.saturation / 100 + 1, e.contrast / 100 + 1],
    _ColorBalance: M(e.temperature, e.tint),
    _ColorFilter: [...e.colorFilter],
    _ChannelMixerRed: n.slice(0, 3),
    _ChannelMixerGreen: n.slice(3, 6),
    _ChannelMixerBlue: n.slice(6, 9),
    _Lift: w(e.lift),
    _InvGamma: C(e.gamma),
    _Gain: y(e.gain)
  };
}
function L(e) {
  const float32Values = new Float32Array(128);
  for (let t = 0; t < 128; t++) float32Values[t] = "identity" === e ? t / 128 : "number" == typeof e ? e : e[t];
  return float32Values;
}
var F = "\nout vec2 vUv;\nvoid main() {\n  vUv = uv;\n  gl_Position = vec4(position.xy, 0.0, 1.0);\n}",
  R = "\nuniform vec4 _Lut2D_Params;\nuniform vec3 _ColorBalance;\nuniform vec3 _ColorFilter;\nuniform vec3 _HueSatCon;\nuniform float _Brightness;\nuniform vec3 _ChannelMixerRed;\nuniform vec3 _ChannelMixerGreen;\nuniform vec3 _ChannelMixerBlue;\nuniform vec3 _Lift;\nuniform vec3 _InvGamma;\nuniform vec3 _Gain;\nuniform mediump sampler2D _Curves;\nin vec2 vUv;\nout highp vec4 outColor;\nconst vec3 LUM = vec3(0.212672904, 0.715152204, 0.0721750036);\nvec3 rgbToHsv(vec3 c) {\n  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);\n  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));\n  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));\n  float d = q.x - min(q.w, q.y);\n  float e = 1.0e-4;\n  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);\n}\nvec3 hsvToRgb(vec3 c) {\n  vec3 p = abs(fract(c.xxx + vec3(1.0, 2.0 / 3.0, 1.0 / 3.0)) * 6.0 - 3.0);\n  return c.z * mix(vec3(1.0), clamp(p - 1.0, 0.0, 1.0), c.y);\n}\nfloat rotateHue(float value) {\n  return value < 0.0 ? value + 1.0 : (value > 1.0 ? value - 1.0 : value);\n}\nvoid main() {\n  // GetLutStripValue\n  vec2 uv = vUv - _Lut2D_Params.yz;\n  vec3 c;\n  c.r = fract(uv.x * _Lut2D_Params.x);\n  c.b = uv.x - c.r / _Lut2D_Params.x;\n  c.g = uv.y;\n  c *= _Lut2D_Params.w;\n  // ColorGradeLDR\n  c *= _Brightness;\n  c = (c - 0.217637643) * _HueSatCon.z + 0.217637643;\n  vec3 lms = vec3(\n    dot(vec3(0.390404999, 0.549941003, 0.00892631989), c),\n    dot(vec3(0.070841603, 0.963172019, 0.00135775004), c),\n    dot(vec3(0.0231081992, 0.128021002, 0.936245024), c)) * _ColorBalance;\n  c = vec3(\n    dot(vec3(2.85846996, -1.62879002, -0.0248910002), lms),\n    dot(vec3(-0.210181996, 1.15820003, 0.000324280991), lms),\n    dot(vec3(-0.0418119989, -0.118169002, 1.06867003), lms));\n  c *= _ColorFilter;\n  c = vec3(dot(c, _ChannelMixerRed), dot(c, _ChannelMixerGreen), dot(c, _ChannelMixerBlue));\n  c = c * _Gain + _Lift;\n  c = sign(c) * exp2(log2(abs(c)) * _InvGamma);\n  c = max(c, vec3(0.0));\n  vec3 hsv = rgbToHsv(c);\n  float luma = dot(c, LUM);\n  float satMult = clamp(textureLod(_Curves, vec2(hsv.x, 0.25), 0.0).y, 0.0, 1.0) * 2.0;\n  satMult *= clamp(textureLod(_Curves, vec2(hsv.y, 0.25), 0.0).z, 0.0, 1.0) * 2.0;\n  satMult *= clamp(textureLod(_Curves, vec2(luma, 0.25), 0.0).w, 0.0, 1.0) * 2.0;\n  float hue = hsv.x + _HueSatCon.x;\n  float offset = clamp(textureLod(_Curves, vec2(hue, 0.25), 0.0).x, 0.0, 1.0) - 0.5;\n  hsv.x = rotateHue(hue + offset);\n  c = hsvToRgb(hsv);\n  float l2 = dot(c, LUM);\n  c = clamp(l2 + _HueSatCon.y * satMult * (c - l2), 0.0, 1.0);\n  // YrgbCurve (half texel 1/256)\n  c += 0.00390625;\n  c = clamp(vec3(\n    texture(_Curves, vec2(c.r, 0.75)).w,\n    texture(_Curves, vec2(c.g, 0.75)).w,\n    texture(_Curves, vec2(c.b, 0.75)).w), 0.0, 1.0);\n  c += 0.00390625;\n  c = vec3(\n    texture(_Curves, vec2(c.r, 0.75)).x,\n    texture(_Curves, vec2(c.g, 0.75)).y,\n    texture(_Curves, vec2(c.b, 0.75)).z);\n  outColor = vec4(clamp(c, 0.0, 1.0), 1.0);\n}",
  z = [32, .5 / 1024, .5 / 32, 32 / 31],
  D = [1 / 1024, 1 / 32, 31],
  T = "\nvec3 kourApplyLut2D(sampler2D lut, vec3 params, vec3 color) {\n  vec3 c = clamp(color, 0.0, 1.0);\n  vec3 uvw = c.zxy * params.zzz;\n  float shift = floor(uvw.x);\n  vec2 xy = uvw.yz * params.xy + params.xy * 0.5;\n  xy.x += shift * params.y;\n  vec3 a = texture(lut, xy).rgb;\n  vec3 b = texture(lut, xy + vec2(params.y, 0.0)).rgb;\n  return mix(a, b, uvw.x - shift);\n}",
  q = [1, 1, 1],
  U = [1, .78, .5],
  P = "\nuniform vec4 uFlash;\nvec3 kourFlash(vec3 c) {\n  return c * uFlash.a + uFlash.rgb;\n}\n",
  B = {
    near: 25,
    far: 180,
    farShare: .6,
    hidden: .45,
    hiddenFar: .25
  },
  k = new m();
function G(e, n, t) {
  const s = k.copy(n).setY(n.y + 2).sub(e),
    r = s.length();
  return r < 1 ? 1 : (s.divideScalar(r), function (e, n) {
    const t = B,
      s = Math.min(1, Math.max(0, (e - t.near) / (t.far - t.near))),
      r = s * s * (3 - 2 * s);
    return n ? 1 - (1 - t.farShare) * r : t.hidden + (t.hiddenFar - t.hidden) * r;
  }(r, !t?.raycast(e, s, r - .5)));
}
var H = new t(0, 0, 0, 1),
  S = `\nuniform sampler2D _MainTex;\nin vec2 vUv;\nout highp vec4 outColor;\n${P}\nvoid main() {\n  vec4 c = texture(_MainTex, vUv);\n  outColor = vec4(kourFlash(clamp(c.rgb, 0.0, 1.0)), 1.0);\n}`,
  $ = class {
    scene = new o();
    camera = new c();
    material;
    target = null;
    width = 1;
    height = 1;
    start = -1 / 0;
    armed = !1;
    $_3qk = !1;
    exposure = H.clone();
    visibility = 1;
    constructor() {
      this.material = new h({
        name: "NukeFlash composite",
        vertexShader: "\nout vec2 vUv;\nvoid main() {\n  vUv = uv;\n  gl_Position = vec4(position.xy, 0.0, 1.0);\n}",
        fragmentShader: S,
        glslVersion: e,
        uniforms: {
          _MainTex: {
            value: null
          },
          uFlash: {
            value: this.exposure
          }
        },
        depthTest: !1,
        depthWrite: !1,
        toneMapped: !1
      });
      const n = new a(new v(2, 2), this.material);
      n.frustumCulled = !1, this.scene.add(n);
    }
    trigger(e = performance.now(), n = 1) {
      this.start = e, this.visibility = Math.min(1, Math.max(0, n));
    }
    stop() {
      this.start = -1 / 0, this.armed = !1, this.$_3qk = !1;
    }
    strength(e = performance.now()) {
      return x(e - this.start);
    }
    arm(e) {
      this.armed = e;
    }
    frame(e = performance.now()) {
      const n = this.strength(e);
      return function (e, n) {
        if (!(e > 0)) return n.copy(H);
        const t = 1 - e,
          s = .38 * e * e;
        n.set(s * (q[0] + (U[0] - q[0]) * t), s * (q[1] + (U[1] - q[1]) * t), s * (q[2] + (U[2] - q[2]) * t), 1 + 4 * e);
      }(n * this.visibility, this.exposure), this.armed || this.$_3qk || n > 0;
    }
    resize(e, n) {
      this.width = Math.max(1, e), this.height = Math.max(1, n), this.target && this.target.setSize(this.width, this.height);
    }
    own(e) {
      return this.target || this.prepare(e), this.target;
    }
    prepare(e) {
      if (!this.target) {
        this.target = new r(this.width, this.height, {
          type: l,
          depthBuffer: !0,
          samples: 0,
          minFilter: u,
          magFilter: u,
          generateMipmaps: !1
        }), p(!0);
        try {
          e.initRenderTarget(this.target);
        } finally {
          p(!1);
        }
      }
    }
    release() {
      this.target?.dispose(), this.target = null;
    }
    prime(e) {
      const n = e.getRenderTarget(),
        t = new r(1, 1, {
          depthBuffer: !1
        });
      p(!0);
      try {
        e.setRenderTarget(t), e.render(this.scene, this.camera);
      } finally {
        p(!1), e.setRenderTarget(n), t.dispose();
      }
    }
    composite(e) {
      this.target && (this.material.uniforms._MainTex.value = this.target.texture, e.setRenderTarget(null), e.render(this.scene, this.camera));
    }
  },
  A = 1.2;
function j() {
  return {
    uResample: {
      value: new t(0, 0, 0, .6)
    },
    uResampleTexel: {
      value: new i(1, 1)
    }
  };
}
var I = `\nuniform vec4 uResample;\nuniform vec2 uResampleTexel;\nvec4 kourResample(sampler2D tex, vec2 uv) {\n  // source texels per screen pixel (panini: the edges are reduced)\n  vec2 fx = dFdx(uv);\n  vec2 fy = dFdy(uv);\n  float footprint = max(length(fx / uResampleTexel), length(fy / uResampleTexel));\n  vec4 c;\n  if (uResample.z > 0.5 && footprint > ${1.2.toFixed(2)}) {\n    // four taps on a rotated grid inside the pixel's footprint\n    c = 0.25 * (textureLod(tex, uv - fx * 0.125 - fy * 0.375, 0.0)\n      + textureLod(tex, uv + fx * 0.375 - fy * 0.125, 0.0)\n      + textureLod(tex, uv + fx * 0.125 + fy * 0.375, 0.0)\n      + textureLod(tex, uv - fx * 0.375 + fy * 0.125, 0.0));\n  } else c = textureLod(tex, uv, 0.0);\n  if (uResample.x > 0.0) {\n    // contrast adaptive sharpening across (FidelityFX CAS, the horizontal pair): soft where the\n    // neighbourhood is already contrasty or near black / white, none on HDR values\n    vec2 dx = vec2(uResampleTexel.x, 0.0);\n    vec3 b = textureLod(tex, uv - dx, 0.0).rgb;\n    vec3 d = textureLod(tex, uv + dx, 0.0).rgb;\n    vec3 e = c.rgb;\n    vec3 mn = min(min(b, d), e);\n    vec3 mx = max(max(b, d), e);\n    vec3 amp = sqrt(clamp(min(mn, 1.0 - mx) / max(mx, vec3(1e-4)), 0.0, 1.0));\n    vec3 w = amp * (-1.0 / mix(8.0, 5.0, uResample.w)) * uResample.x;\n    c.rgb = max((e + (b + d) * w) / (1.0 + 2.0 * w), vec3(0.0));\n  }\n  return c;\n}\n`,
  K = j();
function V(e, n) {
  e.uResample.value.copy(n.uResample.value), e.uResampleTexel.value.copy(n.uResampleTexel.value);
}
function W(e, n) {
  const t = e.uResample.value;
  var s;
  t.x = n.sharpen ? (s = n.narrow, Math.min(1, Math.max(0, (s - 1) / (4 / 3 - 1)))) : 0, t.z = n.paniniEdges ? 1 : 0, e.uResampleTexel.value.set(1 / Math.max(1, n.width), 1 / Math.max(1, n.height));
}
var N = "\nvec2 kourPanini(vec2 uv, vec4 p) {\n  vec2 view_pos = (2.0 * uv - 1.0) * p.xy * p.w;\n  float d = p.z;\n  float view_dist = 1.0 + d;\n  float view_hyp_sq = view_pos.x * view_pos.x + view_dist * view_dist;\n  float isect_D = view_pos.x * d;\n  float isect_discrim = view_hyp_sq - isect_D * isect_D;\n  float cyl_dist_minus_d = (-isect_D * view_pos.x + view_dist * sqrt(isect_discrim)) / view_hyp_sq;\n  float cyl_dist = cyl_dist_minus_d + d;\n  vec2 cyl_pos = view_pos * (cyl_dist / view_dist);\n  return cyl_pos / (cyl_dist - d) / p.xy * 0.5 + 0.5;\n}\n";
function X(e, n, t) {
  const s = e.projectionMatrix.elements,
    r = 1 / s[0],
    a = 1 / s[5];
  return t.set(r, a, n, d(r, n));
}
var Y = `\nuniform sampler2D _MainTex;\n/** view extents (tan of the half field of view) x, y; panini distance; crop scale */\nuniform vec4 _Params;\nin vec2 vUv;\nout highp vec4 outColor;\n${N}\n${P}\n${I}\nvoid main() {\n  vec4 c = kourResample(_MainTex, kourPanini(vUv, _Params));\n  // the nuke flash's gain / lift before the 8-bit canvas (nuke-flash.ts)\n  outColor = vec4(kourFlash(clamp(c.rgb, 0.0, 1.0)), c.a);\n}`,
  E = class {
    renderer;
    enabled = !1;
    strength = .5;
    sharp = !0;
    scene = new o();
    camera = new c();
    material;
    target = null;
    width = 1;
    height = 1;
    drawing = !1;
    resample = j();
    constructor(n) {
      this.renderer = n, this.material = new h({
        vertexShader: "\nout vec2 vUv;\nvoid main() {\n  vUv = uv;\n  gl_Position = vec4(position.xy, 0.0, 1.0);\n}",
        fragmentShader: Y,
        uniforms: {
          _MainTex: {
            value: null
          },
          _Params: {
            value: new t(1, 1, 0, 1)
          },
          uFlash: {
            value: H.clone()
          },
          ...this.resample
        },
        glslVersion: e,
        depthTest: !1,
        depthWrite: !1,
        toneMapped: !1
      });
      const s = new a(new v(2, 2), this.material);
      s.frustumCulled = !1, this.scene.add(s);
    }
    get active() {
      return this.enabled && this.strength > 0;
    }
    $_6nz7(e) {
      return this.active && this.sharp ? f(e, this.strength) : 1;
    }
    resize(e, n) {
      this.width = Math.max(1, e), this.height = Math.max(1, n), this.target?.dispose(), this.target = null;
    }
    hdr = !1;
    $_7jiz(e) {
      e !== this.hdr && (this.hdr = e, this.target && this.resize(this.width, this.height));
    }
    begin(e) {
      return this.drawing = this.active, this.drawing && e ? (this.target ??= new r(this.width, this.height, {
        type: this.hdr ? l : n,
        depthBuffer: !0,
        samples: 0,
        minFilter: s,
        magFilter: s,
        generateMipmaps: !1
      }), this.target) : (this.target && this.resize(this.width, this.height), null);
    }
    get running() {
      return this.drawing;
    }
    get ownPass() {
      return this.drawing && null !== this.target;
    }
    render(e, n = H) {
      const t = this.target?.texture;
      this.drawing && t && (this.material.uniforms._MainTex.value = t, this.material.uniforms.uFlash.value.copy(n), X(e, this.strength, this.material.uniforms._Params.value), this.renderer.setRenderTarget(null), this.renderer.render(this.scene, this.camera));
    }
  };
export { z as _, I as a, b, j as c, H as d, $ as f, R as g, D as h, A as i, W as l, T as m, E as n, V as o, G as p, X as r, K as s, N as t, P as u, F as v, _ as x, L as y };
