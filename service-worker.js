const CACHE_NAME = `infoliga-v1.2`;
const urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/detail.html",
  "/pages/home.html",
  "/pages/teams.html",
  "/pages/standings.html",
  "/pages/favorites.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/js/materialize.min.js",
  "/manifest.json",
  "/js/nav.js",
  "/js/api.js",
  "/js/db.js",
  "/js/idb.js",
  "/js/notifikasi.js",
  "/js/register-sw.js",
  "/js/request-api.js",
  "/img/back.png",
  "/img/banner.jpg",
  "/img/bg.jpg",
  "/img/clothes.png",
  "/img/icon.png",
  "/img/icon-192.png",
  "/img/player.png",
  "/img/primer.png",
  "/img/stadium.png",
  "/img/main-icon.png",
  "./font/Poppins-Regular.ttf",
  "./font/Poppins-Black.ttf",
  "./font/Poppins-Bold.ttf"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  var base_url = "https://api.football-data.org/";
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  }  else {
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then(function(response) {
            return response || fetch (event.request);
        })
    )
}
});


self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName != CACHE_NAME) {
            console.log(`ServiceWorker: cache ${cacheName} dihapus`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('push', event => {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = `Push message no payload`;
  }
  const options = {
    body: body,
    icon: 'img/icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
