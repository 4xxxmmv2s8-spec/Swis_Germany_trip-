const CACHE="swis-germany-trip-v2";
const ASSETS=["./","./index.html","./manifest.json","./sw.js"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener("fetch",e=>{
  e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(res=>{
    const copy=res.clone();
    caches.open(CACHE).then(c=>{ if(e.request.method==="GET") c.put(e.request,copy).catch(()=>{}); });
    return res;
  }).catch(()=>caches.match("./index.html"))));
});
