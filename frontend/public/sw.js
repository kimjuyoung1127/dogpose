// Public API for the service worker
// This is a basic service worker for PWA functionality

const CACHE_NAME = 'dogpose-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/static/css/main.css',
  '/static/js/main.js',
  '/manifest.json'
];

// Install a service worker
self.addEventListener('install', (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch from cache or network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version if found
        if (response) {
          return response;
        }
        // Clone the request to handle it properly
        return fetch(event.request.clone())
          .then((networkResponse) => {
            // If the response is valid, clone it and add it to the cache
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
            }
            return networkResponse;
          })
          .catch((error) => {
            // In case of network error, try to return something appropriate
            console.error('Fetch failed:', error);
            // For assets that are missing, return a fallback or just let it fail normally
            return fetch(event.request);
          });
      }
    )
  );
});