"use client"

export interface HospitalData {
  id: number
  name: string
  location: string
  phone: string
  email?: string
  services?: string[]
  emergency: boolean
  cached?: boolean
}

const STORAGE_KEY = "medfind_cached_hospitals"
const CACHE_TIMESTAMP_KEY = "medfind_cache_timestamp"
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days

export function cacheHospitalData(hospitals: HospitalData[]) {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(hospitals))
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString())
    console.log("[v0] Cached hospital data successfully")
  } catch (error) {
    console.error("[v0] Failed to cache hospital data:", error)
  }
}

export function getCachedHospitalData(): HospitalData[] | null {
  if (typeof window === "undefined") return null

  try {
    const cached = localStorage.getItem(STORAGE_KEY)
    const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY)

    if (!cached || !timestamp) return null

    // Check if cache is still valid
    const cacheAge = Date.now() - Number.parseInt(timestamp)
    if (cacheAge > CACHE_DURATION) {
      console.log("[v0] Cache expired, clearing...")
      clearHospitalCache()
      return null
    }

    const hospitals = JSON.parse(cached) as HospitalData[]
    console.log("[v0] Retrieved cached hospital data:", hospitals.length, "hospitals")
    return hospitals.map((h) => ({ ...h, cached: true }))
  } catch (error) {
    console.error("[v0] Failed to retrieve cached data:", error)
    return null
  }
}

export function clearHospitalCache() {
  if (typeof window === "undefined") return

  try {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(CACHE_TIMESTAMP_KEY)
    console.log("[v0] Cleared hospital cache")
  } catch (error) {
    console.error("[v0] Failed to clear cache:", error)
  }
}

export function isOnline(): boolean {
  if (typeof window === "undefined") return true
  return navigator.onLine
}
