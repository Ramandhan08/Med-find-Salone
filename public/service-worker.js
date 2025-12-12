const CACHE_NAME = "medfind-salone-v1"
const OFFLINE_URL = "/offline"

// Assets to cache on install
const STATIC_ASSETS = [
  "/",
  "/offline",
  "/hospitals",
  "/assistant",
  "/icon-192.png",
  "/icon-512.png",
  "/medfind-logo.png",
]

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("[v0] Service Worker installing...")
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[v0] Caching static assets")
      return cache.addAll(STATIC_ASSETS)
    }),
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[v0] Service Worker activating...")
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("[v0] Deleting old cache:", cacheName)
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
  self.clients.claim()
})

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return
  }

  // Skip chrome extensions
  if (event.request.url.startsWith("chrome-extension://")) {
    return
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response if found
      if (cachedResponse) {
        console.log("[v0] Serving from cache:", event.request.url)
        return cachedResponse
      }

      // Otherwise fetch from network
      return fetch(event.request)
        .then((response) => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type === "error") {
            return response
          }

          // Clone the response
          const responseToCache = response.clone()

          // Cache the new response for HTML, JS, CSS, and images
          if (
            event.request.url.match(/\.(html|js|css|png|jpg|jpeg|svg|gif|webp)$/) ||
            event.request.url.includes("/hospitals") ||
            event.request.url.includes("/assistant")
          ) {
            caches.open(CACHE_NAME).then((cache) => {
              console.log("[v0] Caching new resource:", event.request.url)
              cache.put(event.request, responseToCache)
            })
          }

          return response
        })
        .catch(() => {
          // If both cache and network fail, show offline page
          console.log("[v0] Network failed, showing offline page")
          return caches.match(OFFLINE_URL)
        })
    }),
  )
})
