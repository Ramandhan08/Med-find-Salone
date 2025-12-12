"use client"

export function registerServiceWorker() {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("[v0] Service Worker registered:", registration.scope)

          // Check for updates every 60 seconds
          setInterval(() => {
            registration.update()
          }, 60000)
        })
        .catch((error) => {
          console.error("[v0] Service Worker registration failed:", error)
        })
    })

    // Listen for controller change (new service worker activated)
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      console.log("[v0] New service worker activated")
      window.location.reload()
    })
  }
}
