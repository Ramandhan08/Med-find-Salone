"use client"

import { Button } from "@/components/ui/button"
import { Share2, Navigation } from "lucide-react"

export function ShareButton({ hospital }: { hospital: any }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: hospital.name,
          text: `${hospital.name} - ${hospital.address}`,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleShare}>
      <Share2 className="h-4 w-4" />
    </Button>
  )
}

export function DirectionsButton({
  coordinates,
  variant = "outline",
  size = "lg",
  className = "flex-1 bg-transparent",
}: {
  coordinates: { lat: number; lng: number }
  variant?: "outline" | "default"
  size?: "sm" | "lg"
  className?: string
}) {
  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`
    window.open(url, "_blank")
  }

  return (
    <Button variant={variant} className={className} size={size} onClick={handleGetDirections}>
      <Navigation className="mr-2 h-5 w-5" />
      {size === "lg" ? "Get Directions" : "Open in Maps"}
    </Button>
  )
}
