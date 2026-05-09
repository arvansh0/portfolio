const CACHE_NAME = 'vansh-portfolio-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/ENERGY%20MUSEUM/1.png',
  '/VIRASAT%20-%20E-%20HARYANA/RENDER%2014%20-2.jpg',
  '/DESIGN%20VILLAGE/1.png',
  '/SPORTS%20ARENA/VIEW%201.png',
  '/GROUP%20HOUSING%20SHEETS/VIEW%201.png',
  '/RECREATIONAL%20CLUB%20SHEETS/VIEW%201.jpg',
  '/WORKING%20DRAWINGS/0.png',
  '/SOCIETY%20DESIGN/7.jpg'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});