const CACHE_NAME = 'toolpixa-v2';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/logo.png',
  '/categories',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/disclaimer',
  '/profile'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== 'GET') return;

  const isStaticAsset = 
    url.pathname.startsWith('/_next/') ||
    url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|json|woff2)$/) ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com');

  if (isStaticAsset) {
    // Cache First strategy
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Fetch new version in background to update cache
          fetch(request).then((networkResponse) => {
            if (networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse));
            }
          }).catch(() => {});
          return cachedResponse;
        }
        return fetch(request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
          }
          return networkResponse;
        });
      })
    );
  } else {
    // Network First, fallback to cache for page routes/documents
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
          }
          return networkResponse;
        })
        .catch(() => {
          // If offline, serve from cache
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;
            // Fallback to offline index if not cached
            return caches.match('/');
          });
        })
    );
  }
});
