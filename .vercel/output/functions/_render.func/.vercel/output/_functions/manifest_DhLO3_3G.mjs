import { d as decodeKey } from './chunks/astro/server_Gheuiwyq.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_x8A6mEwa.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/sergio/workspace/el-rincon-landing-page/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@4.16.19_@types+node@25.5.0_rollup@4.60.1_typescript@5.1.6/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/contact","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/contact\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/contact.ts","pathname":"/api/contact","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"setTimeout(()=>{const s=document.querySelector(\"#homeCard\"),c=document.querySelectorAll(\".homeImage\"),r=document.querySelector(\"#homeInfo\");function a(t,n){t.forEach(e=>{e.isIntersecting&&(e.target.classList.add(\"animate-fadeIn\"),e.target.classList.toggle(\"opacity-1\"),e.target.classList.toggle(\"opacity-0\"),n.unobserve(e.target))})}const o=new IntersectionObserver(a);c.forEach(t=>o.observe(t)),o.observe(s),o.observe(r)},400);\n"}],"styles":[{"type":"external","src":"/_astro/index.CR28Wou-.css"},{"type":"external","src":"/_astro/Opinions.DV8PrLMj.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/sergio/workspace/el-rincon-landing-page/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/api/contact@_@ts":"pages/api/contact.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/.pnpm/astro@4.16.19_@types+node@25.5.0_rollup@4.60.1_typescript@5.1.6/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","/Users/sergio/workspace/el-rincon-landing-page/node_modules/.pnpm/astro@4.16.19_@types+node@25.5.0_rollup@4.60.1_typescript@5.1.6/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","\u0000@astrojs-manifest":"manifest_DhLO3_3G.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.eMgro2ae.js","@astrojs/react/client.js":"_astro/client.CiPjNfOZ.js","/Users/sergio/workspace/el-rincon-landing-page/src/components/Contact":"_astro/Contact.DmgDEH9z.js","/Users/sergio/workspace/el-rincon-landing-page/src/components/Menu":"_astro/Menu.DGPb0xxp.js","/Users/sergio/workspace/el-rincon-landing-page/src/components/MobileMenu":"_astro/MobileMenu.C0XEVbjK.js","/Users/sergio/workspace/el-rincon-landing-page/src/components/Opinions":"_astro/Opinions.NWXwTmiJ.js","/Users/sergio/workspace/el-rincon-landing-page/src/components/Gallery":"_astro/Gallery.Gu0gsx9Z.js","sonner":"_astro/_astro-entry_sonner.DRlfzwne.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.CR28Wou-.css","/favicon.svg","/_astro/Combination.BtJpximd.js","/_astro/Contact.DmgDEH9z.js","/_astro/Gallery.Gu0gsx9Z.js","/_astro/Menu.DGPb0xxp.js","/_astro/MobileMenu.C0XEVbjK.js","/_astro/Opinions.DV8PrLMj.css","/_astro/Opinions.NWXwTmiJ.js","/_astro/_astro-entry_sonner.Bq7HDkXc.js","/_astro/_astro-entry_sonner.DRlfzwne.js","/_astro/chunk-25GTHDOF.CIl65MLq.js","/_astro/chunk-7Z6GJEAZ.DhAilDsP.js","/_astro/chunk-CAFRINWI.mdA9ycgL.js","/_astro/chunk-EB2I5ZVA.C0BfBZDu.js","/_astro/chunk-FYJF2TF7.BvCNm1z7.js","/_astro/chunk-HBCH5SF5.Bd4-Av0S.js","/_astro/client.CiPjNfOZ.js","/_astro/import.BLXr2GUR.js","/_astro/index.ChJviBFT.js","/_astro/index.D1B4VyY8.js","/_astro/objectWithoutPropertiesLoose.Ef4hjkMG.js","/assets/img/home.webp","/assets/img/image-1.webp","/assets/img/image-2.webp","/assets/img/image-3.webp","/assets/img/image-4.webp","/assets/img/image-5.webp","/assets/img/image-6.webp","/assets/img/image-7.webp","/assets/img/image-8.webp","/assets/img/image-9.webp"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"b8ZbsUxSUHdh22PE7XBvexSNIAybwkZVq2fWH5B596g=","experimentalEnvGetSecretEnabled":false});

export { manifest };
