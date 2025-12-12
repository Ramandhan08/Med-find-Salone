import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MobileHeader } from "@/components/mobile-header"
import { MobileNav } from "@/components/mobile-nav"
import { ArrowRight, Users, Heart, Target, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <MobileHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 to-background">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-xs font-medium shadow-sm">
              <Heart className="h-3 w-3 text-primary" />
              About MED-FIND SALONE
            </div>
            <h1 className="mb-4 text-balance text-3xl font-bold leading-tight tracking-tight md:text-5xl">
              Connecting Sierra Leone to{" "}
              <span className="bg-gradient-to-r from-primary to-chart-3 bg-clip-text text-transparent">
                Better Healthcare
              </span>
            </h1>
            <p className="mb-8 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              We're on a mission to make healthcare accessible to everyone in Sierra Leone through technology,
              innovation, and compassion.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Cards */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-balance text-2xl font-bold tracking-tight md:text-4xl">Our Core Values</h2>
            <p className="mx-auto max-w-2xl text-pretty text-sm text-muted-foreground md:text-base">
              The principles that guide our work and shape our commitment to Sierra Leone's healthcare
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {/* Mission Card */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-lime-400 to-lime-500 p-8 shadow-lg transition-transform hover:scale-[1.02]">
              <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div className="mb-32">
                <div className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  Our Mission
                </div>
                <h3 className="mb-3 text-2xl font-bold text-white">Accessible Healthcare</h3>
                <p className="text-sm leading-relaxed text-white/90">
                  To provide every person in Sierra Leone with instant access to medical facilities and emergency
                  services.
                </p>
              </div>
              <Link
                href="/hospitals"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-gap hover:gap-3"
              >
                Explore Hospitals <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Vision Card */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-400 to-purple-500 p-8 shadow-lg transition-transform hover:scale-[1.02]">
              <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div className="mb-32">
                <div className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  Our Vision
                </div>
                <h3 className="mb-3 text-2xl font-bold text-white">Healthcare Excellence</h3>
                <p className="text-sm leading-relaxed text-white/90">
                  To become the leading healthcare technology platform across West Africa, saving lives through
                  innovation.
                </p>
              </div>
              <Link
                href="/assistant"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-gap hover:gap-3"
              >
                Try AI Assistant <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Values Card */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-400 to-cyan-500 p-8 shadow-lg transition-transform hover:scale-[1.02]">
              <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div className="mb-32">
                <div className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  Our Values
                </div>
                <h3 className="mb-3 text-2xl font-bold text-white">Community First</h3>
                <p className="text-sm leading-relaxed text-white/90">
                  We prioritize community needs, ensuring reliable, compassionate, and equitable healthcare access for
                  all.
                </p>
              </div>
              <Link
                href="/?emergency=true"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-gap hover:gap-3"
              >
                Emergency Contacts <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-muted/30 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <h2 className="mb-3 text-balance text-2xl font-bold tracking-tight md:text-4xl">Our Story</h2>
              <p className="mx-auto max-w-2xl text-pretty text-sm text-muted-foreground md:text-base">
                How we're transforming healthcare accessibility in Sierra Leone
              </p>
            </div>

            <div className="space-y-6 text-sm leading-relaxed text-foreground md:text-base">
              <p>
                MED-FIND SALONE was born from a simple observation: finding medical care in Sierra Leone shouldn't be
                difficult or time-consuming, especially in emergencies. Our founders recognized that while mobile
                technology had transformed many aspects of daily life, healthcare access remained largely disconnected
                and fragmented.
              </p>

              <p>
                We started by mapping every hospital, clinic, and medical facility across the country, creating the most
                comprehensive healthcare directory in Sierra Leone. But we didn't stop there. We integrated AI
                technology to provide instant medical guidance, built offline capabilities for areas with limited
                connectivity, and designed the platform to work seamlessly on any device.
              </p>

              <p>
                Today, MED-FIND SALONE serves thousands of Sierra Leoneans daily, connecting patients to the care they
                need when they need it most. From emergency situations to routine medical visits, we're proud to be part
                of Sierra Leone's healthcare infrastructure, working alongside medical professionals and institutions to
                improve health outcomes across the nation.
              </p>

              <p>
                Our commitment goes beyond technology. We're building partnerships with hospitals, training healthcare
                workers in digital tools, and continuously improving our platform based on real user feedback. Every
                feature we build, every improvement we make, is driven by one goal: making healthcare accessible,
                reliable, and effective for everyone in Sierra Leone.
              </p>
            </div>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/hospitals">Find a Hospital</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent" asChild>
                <Link href="/assistant">Get Medical Guidance</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-balance text-2xl font-bold tracking-tight md:text-4xl">Our Impact</h2>
            <p className="mx-auto max-w-2xl text-pretty text-sm text-muted-foreground md:text-base">
              Real numbers that reflect our commitment to Sierra Leone's healthcare
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary md:text-5xl">50+</div>
              <div className="text-sm font-medium text-foreground">Medical Facilities</div>
              <div className="mt-1 text-xs text-muted-foreground">Across all regions</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary md:text-5xl">24/7</div>
              <div className="text-sm font-medium text-foreground">Support Available</div>
              <div className="mt-1 text-xs text-muted-foreground">Emergency access</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary md:text-5xl">100%</div>
              <div className="text-sm font-medium text-foreground">Coverage</div>
              <div className="mt-1 text-xs text-muted-foreground">All of Sierra Leone</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary md:text-5xl">AI</div>
              <div className="text-sm font-medium text-foreground">Powered</div>
              <div className="mt-1 text-xs text-muted-foreground">Medical assistant</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-chart-3 p-8 text-center text-white shadow-2xl md:p-12">
            <h2 className="mb-4 text-balance text-2xl font-bold md:text-4xl">Join Us in Our Mission</h2>
            <p className="mx-auto mb-8 max-w-2xl text-pretty text-sm opacity-90 md:text-base">
              Whether you're seeking medical care or want to partner with us, we're here to help make healthcare
              accessible to all
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto" asChild>
                <Link href="/hospitals">Get Started</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-white text-white hover:bg-white/10 sm:w-auto bg-transparent"
                asChild
              >
                <Link href="/assistant">Try AI Assistant</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <MobileNav />
    </div>
  )
}
