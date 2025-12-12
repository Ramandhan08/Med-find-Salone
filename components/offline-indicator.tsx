"use client"

import { useOnlineStatus } from "@/hooks/use-online-status"
import { WifiOff } from "lucide-react"

export function OfflineIndicator() {
  const isOnline = useOnlineStatus()

  if (isOnline) return null

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 animate-in slide-in-from-bottom">
      <div className="mx-auto max-w-md rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 shadow-lg backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <WifiOff className="h-5 w-5 shrink-0 text-destructive" />
          <div className="flex-1">
            <p className="text-sm font-medium text-destructive">You're offline</p>
            <p className="text-xs text-destructive/80">Some features may be limited</p>
          </div>
        </div>
      </div>
    </div>
  )
}
