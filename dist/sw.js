var CACHE_NAME = 'price-the-vintage-cache-v1.3';
var urlsToCache = [
  '/offline.html',
  '/images/library.png',
  '/images/wine-icon-32.png',
  '/images/wine-icon-48.png',
  '/images/wine-icon-64.png',
  '/images/wine-icon-192.png'
];

self.addEventListener('install', function(event) {
  self.skipWaiting(); 

  console.log('Installing: '+CACHE_NAME);
  
  // Populate cache
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log(`Removing cache SW ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  // always try to get an up-to-date version of index.html
  var path = event.request.url.replace(location.origin, '');
  if( path === '/' || path === '/index.html' ) {
    event.respondWith(
      fetch(event.request).catch(function() {
        return caches.match('/offline.html');
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) { // cache hit
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});