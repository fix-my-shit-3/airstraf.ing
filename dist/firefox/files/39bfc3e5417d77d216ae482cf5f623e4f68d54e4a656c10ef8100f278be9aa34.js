var e = [{
    limit: "maxBindGroups",
    min: 2,
    why: "object and render groups"
  }, {
    limit: "maxColorAttachments",
    min: 2,
    why: "g-buffer of SSCC / motion blur"
  }, {
    limit: "maxColorAttachmentBytesPerSample",
    min: 16,
    why: "world colour + g-buffer"
  }, {
    limit: "maxVertexBuffers",
    min: 5,
    why: "skinned, instanced meshes"
  }, {
    limit: "maxVertexAttributes",
    min: 7,
    why: "skinned, instanced meshes"
  }, {
    limit: "maxInterStageShaderVariables",
    min: 6,
    why: "Unity port with motion vectors"
  }, {
    limit: "maxSampledTexturesPerShaderStage",
    min: 5,
    why: "Unity port, image effects"
  }, {
    limit: "maxSamplersPerShaderStage",
    min: 4,
    why: "Unity port, image effects"
  }, {
    limit: "maxUniformBuffersPerShaderStage",
    min: 5,
    why: "uniform groups of a draw"
  }],
  r = {
    core: {
      maxBindGroups: 4,
      maxColorAttachments: 8,
      maxColorAttachmentBytesPerSample: 32,
      maxVertexBuffers: 8,
      maxVertexAttributes: 16,
      maxInterStageShaderVariables: 16,
      maxSampledTexturesPerShaderStage: 16,
      maxSamplersPerShaderStage: 16,
      maxUniformBuffersPerShaderStage: 12,
      maxStorageBuffersPerShaderStage: 8,
      maxStorageTexturesPerShaderStage: 4
    },
    compatibility: {
      maxBindGroups: 4,
      maxColorAttachments: 4,
      maxColorAttachmentBytesPerSample: 32,
      maxVertexBuffers: 8,
      maxVertexAttributes: 16,
      maxInterStageShaderVariables: 15,
      maxSampledTexturesPerShaderStage: 16,
      maxSamplersPerShaderStage: 16,
      maxUniformBuffersPerShaderStage: 11,
      maxStorageBuffersPerShaderStage: 4,
      maxStorageTexturesPerShaderStage: 4
    }
  },
  t = [],
  a = "not used on this GPU";
function i(i, s = {}) {
  const n = {};
  if (i.fallback && !s.allowSoftware) return {
    refuse: `${a}: software adapter (no graphics card)`,
    requiredLimits: n
  };
  const m = s.userAgent ?? "";
  for (const e of s.blocklist ?? t) if ((!e.vendor || e.vendor.test(i.vendor)) && (!e.architecture || e.architecture.test(i.architecture)) && (!e.description || e.description.test(i.description)) && (!e.userAgent || e.userAgent.test(m))) return {
    refuse: `${a}: ${e.reason}`,
    requiredLimits: n
  };
  const o = r[i.core ? "core" : "compatibility"];
  for (const r of s.needs ?? e) {
    const e = i.limits[r.limit];
    if (void 0 !== e && e < r.min) return {
      refuse: `${a}: ${r.limit} ${e} < ${r.min} (${r.why})`,
      requiredLimits: n
    };
    r.min > (o[r.limit] ?? 1 / 0) && (n[r.limit] = r.min);
  }
  return {
    refuse: null,
    requiredLimits: n
  };
}
function s(r, t = e) {
  const a = r.info ?? {},
    i = {};
  for (const e of t) {
    const t = r.limits[e.limit];
    i[e.limit] = "number" == typeof t ? t : void 0;
  }
  return {
    vendor: a.vendor ?? "",
    architecture: a.architecture ?? "",
    device: a.device ?? "",
    description: a.description ?? "",
    fallback: !!(a.isFallbackAdapter ?? r.isFallbackAdapter),
    core: r.features.has("core-features-and-limits"),
    limits: i
  };
}
function n(e) {
  return ([e.vendor, e.architecture, e.description || e.device].filter(Boolean).join(" ") || "unknown adapter") + (e.fallback ? " (software)" : "");
}
function m(e, r, t = "") {
  return {
    at: Date.now(),
    ok: !1,
    step: "browser",
    reason: "",
    adapter: null,
    requiredLimits: {},
    device: null,
    selfTest: null,
    ms: {
      adapter: 0,
      init: 0,
      selfTest: 0
    },
    browser: e,
    three: r,
    build: t,
    later: null
  };
}
function o(e, r, t) {
  return e.step = r, e.reason = t, e.ok = !t, e;
}
function u(e, r) {
  return e.later = r, e.ok = !1, e.step = "drawing", e.reason = r, e;
}
function d(e) {
  const r = [e.ok ? "WebGPU draws" : `WebGPU not used (${e.step}): ${e.reason || "unknown"}`],
    t = e.adapter;
  t && r.push(`adapter: ${t.label}${t.core ? "" : " (compatibility level)"}`), e.device && r.push(`device: ${e.device.compatibility ? "compatibility mode" : "core"}, canvas ${e.device.canvasFormat}, ${e.device.features.length} features` + (Object.keys(e.requiredLimits).length ? `, asked limits ${JSON.stringify(e.requiredLimits)}` : ""));
  const a = e.selfTest;
  return a && r.push(`start check: ${a.ok ? a.off?.length ? `passed ${a.note}` : "passed" : `failed - ${a.note}`}; ` + (a.detail ?? []).map(item => {
    return item.skipped ? `${item.name} skipped` : `${item.name} ${item.ok ? "ok" : "BAD"} (${r = item.share, `${Math.round(100 * r)}%`} > px, mean ${item.mean.toFixed(1)}, max ${item.max})`;
    var r;
  }).join(", ")), r.push(`times: adapter ${Math.round(e.ms.adapter)} ms, init ${Math.round(e.ms.init)} ms, check ${Math.round(e.ms.selfTest)} ms`), e.later && r.push(`failed while drawing: ${e.later}`), r.push(`browser: ${e.browser}`, `three.js r${e.three}${e.build ? `, build ${e.build}` : ""}`), r.join("\n");
}
export { a, i as c, o as i, m as n, s as o, d as r, n as s, u as t };
