const CACHE_NAME = "bmw-waste-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "file_00000000b2d471f 891e27f78d95d5b81.pn

g",
  "https://cdn-icons-png.flaticon.com/512/3209/3209265.png",
  "https://cdn-icons-png.flaticon.com/512/4320/4320371.png",
  "https://cdn-icons-png.flaticon.com/512/6195/6195700.png",
  "https://cdn-icons-png.flaticon.com/512/2785/2785819.png"
];

// Install Service Worker and Cache Assets
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activate Service Worker and clear old caches
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Fetch Offline Support
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
