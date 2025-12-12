"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Building2, MessageSquare, Phone, Menu, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"

const navigationItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
    description: "Return to homepage",
  },
  {
    title: "Hospitals",
    href: "/hospitals",
    icon: Building2,
    description: "Browse all medical facilities",
  },
  {
    title: "AI Assistant",
    href: "/assistant",
    icon: MessageSquare,
    description: "Get medical guidance",
  },
  {
    title: "About",
    href: "/about",
    icon: Info,
    description: "Learn more about us",
  },
  {
    title: "Emergency",
    href: "/?emergency=true",
    icon: Phone,
    description: "Quick access to emergency contacts",
    isEmergency: true,
  },
]

export function MobileHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/80">
      <div className="flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/medfind-logo.png" alt="MED-FIND SALONE" width={40} height={40} className="h-10 w-auto" />
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-tight">MED-FIND</span>
            <span className="text-xs text-muted-foreground">SALONE</span>
          </div>
        </Link>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] p-0">
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex items-center gap-3">
                <Image src="/medfind-logo.png" alt="MED-FIND SALONE" width={36} height={36} className="h-9 w-auto" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold leading-tight">MED-FIND</span>
                  <span className="text-xs text-muted-foreground">SALONE</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col py-4">
              <div className="px-3 pb-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Navigation</p>
              </div>

              <nav className="space-y-1 px-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href || (item.href.includes("emergency") && pathname === "/")

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`
                        flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all
                        ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : item.isEmergency
                              ? "text-destructive hover:bg-destructive/10"
                              : "text-foreground hover:bg-accent"
                        }
                      `}
                    >
                      <Icon className={`h-5 w-5 shrink-0 ${item.isEmergency ? "text-destructive" : ""}`} />
                      <div className="flex flex-col">
                        <span className="leading-none">{item.title}</span>
                        <span className="mt-1 text-xs text-muted-foreground">{item.description}</span>
                      </div>
                    </Link>
                  )
                })}
              </nav>
            </div>

            <Separator className="my-4" />

            <div className="px-6 pb-6">
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="text-xs font-medium leading-relaxed text-muted-foreground">
                  Find hospitals, emergency services, and medical assistance across Sierra Leone
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
