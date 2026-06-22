self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('toolpixa-store').then((cache) => cache.addAll([
      '/',
      '/manifest.json',
      '/logo.png'
    ]))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
