var CACHE_NAME = "gearwise-cache-v1";
const DATA_CACHE_NAME = "gearwise-data-cache-v1";

// All our static files to cache

// "/views/layouts/main.handlebars",
// "/views/partials/trips-details.handlebars",
// "/views/dashboard.handlebars",
// "/views/index.handlebars",
// "/views/trips.handlebars",
// "manifest.json",

var urlsToCache = [
  "/",
  "db.js",
  "/js/chart.js",
  "/js/script.js",
  "/js/dashscript.js",
  "/js/tripscript.js",
  "/images/dashbackground.jpg",
  "/images/LogoMakr-7NT913.png",
  "/images/Mountian_cover_opacity_lower.JPG",
  "/css/style.css",
  "/css/trips.css",
  '/css/dash.css'
];

// Install the service worker, and add all of the static files to the cache.
self.addEventListener('install', event => {
  console.log(`Service worker installed`);

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        console.log("Caching files!");
        cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  )
})

// Activate service worker, and then update the cache to newest files.
self.addEventListener('activate', event => {
  console.log(`Service worker activated`);
  event.waitUntil(
    caches.keys()
    .then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME && cache !== DATA_CACHE_NAME) {
            console.log('Service worker: clearing old cache');
            return caches.delete(cache);
          }
        })
        )
    })
  )
})

// Cache will respond with matching files upon fetch request
self.addEventListener('fetch', event => {
  console.log("Service worker: fetching");
  if (event.request.url.includes("/api/")) {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const resClone = response.clone();
        caches
          .open(DATA_CACHE_NAME)
          .then(cache => {
            // Add response to cache
            cache.put(event.request, resClone);
          })
          return response;
      })
      .catch(err => caches.match(event.request))
      .then(response => response)
    )
    return;
  }
  event.respondWith(
    fetch(event.request).catch(function() {
      console.log(event.request);
      
      return caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        } else if (event.request.headers.get("accept").includes("text/html")) {
          return caches.match("/");
        }
      });
    })
  )
})
