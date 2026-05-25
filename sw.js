const CACHE_NAME = "bmw-app-v1";
const ASSETS = [
  "./index.html",
  "./manifest.json",
  "https://cdn-icons-png.flaticon.com/512/2785/2785819.png"
];

// Install Service Worker and cache core assets
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Fetch assets from cache if offline
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
