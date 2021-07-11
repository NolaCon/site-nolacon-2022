importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

if (workbox) {
  console.log("Yay! Workbox is loaded 🎉");

  // Cache HTML
  workbox.routing.registerRoute(/\.html$/, new workbox.strategies.NetworkFirst());

  // Cache JS
  workbox.routing.registerRoute(/\.js$/, new workbox.strategies.NetworkFirst());

  // Cache CSS
  workbox.routing.registerRoute(/\.css$/, new workbox.strategies.StaleWhileRevalidate({cacheName: 'css-cache'}));

  // Cache image
  workbox.routing.registerRoute(
    /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
    new workbox.strategies.CacheFirst({
      cacheName: 'image-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 20, // Cache only 20 images.
          maxAgeSeconds: 7 * 24 * 60 * 60, // Cache for a maximum of a week.
        })
      ]
    })
  );

  // Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    })
  );

  // Cache the underlying font files with a cache-first strategy for 1 year.
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new workbox.strategies.CacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.ExpirationPlugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        })
      ]
    })
  );


  // Workbox injection point
  workbox.precaching.precacheAndRoute([]);

} else {
  console.log("Boo! Workbox didn't load 😬");
}
