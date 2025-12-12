"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Building2, MessageCircleQuestion, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Hospitals",
    href: "/hospitals",
    icon: Building2,
  },
  {
    name: "Assistant",
    href: "/assistant",
    icon: MessageCircleQuestion,
  },
  {
    name: "Emergency",
    href: "/?emergency=true",
    icon: Phone,
  },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/80 safe-area-inset-bottom">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-around px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "fill-primary/20")} />
              <span className="truncate">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
