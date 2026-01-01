import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { destinations } from "@/lib/data/destinations"
import { ArrowRight, Sparkles, Users, MapPin, Star } from "lucide-react"

export default function HomePage() {
  const featuredDestinations = destinations.slice(0, 3)
  const topRatedDestinations = [...destinations].sort((a, b) => b.popularityScore - a.popularityScore).slice(0, 6)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background z-10" />
        <Image src="/morocco-landscape-atlas-mountains-golden-hour.jpg" alt="Morocco landscape" fill className="object-cover" priority />
        <div className="relative z-20 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-balance">
            Discover the Magic
            <br />
            <span className="text-primary">of Morocco</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            From ancient medinas to endless dunes, experience Morocco like never before with AI-powered planning and
            local insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-base">
              <Link href="/plan-trip">
                <Sparkles className="mr-2 h-5 w-5" />
                Plan with AI
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base bg-transparent">
              <Link href="/destinations">
                Explore Destinations
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">Featured Destinations</h2>
              <p className="text-muted-foreground">Start your journey in Morocco's most iconic locations</p>
            </div>
            <Button asChild variant="ghost">
              <Link href="/destinations">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredDestinations.map((destination) => (
              <Link key={destination.id} href={`/destinations/${destination.slug}`} className="group">
                <Card className="overflow-hidden border-2 hover:border-primary transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-serif font-bold text-white mb-1">{destination.name}</h3>
                      <p className="text-sm text-white/90">{destination.region}</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4">{destination.shortDescription}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-primary fill-primary" />
                      <span className="font-semibold">{destination.popularityScore}%</span>
                      <span className="text-muted-foreground">Traveler Favorite</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI Trip Planner CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Sparkles className="h-12 w-12 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-balance">
              Let AI Plan Your Perfect Morocco Adventure
            </h2>
            <p className="text-lg mb-8 opacity-90 text-pretty max-w-2xl mx-auto">
              Answer a few questions and get a personalized itinerary tailored to your interests, budget, and travel
              style.
            </p>
            <Button asChild size="lg" variant="secondary" className="text-base">
              <Link href="/plan-trip">
                Start Planning Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* All Destinations Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">All Destinations</h2>
            <p className="text-muted-foreground">Explore every corner of Morocco</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topRatedDestinations.map((destination) => (
              <Link key={destination.id} href={`/destinations/${destination.slug}`} className="group">
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-serif font-semibold">{destination.name}</h3>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-3 w-3 text-primary fill-primary" />
                        <span className="font-semibold">{destination.popularityScore}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{destination.shortDescription}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {destination.region}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Users className="h-12 w-12 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Share Your Morocco Experience</h2>
            <p className="text-lg text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              Discovered a hidden gem? Found an amazing restaurant? Share your favorite places and help fellow travelers
              discover Morocco.
            </p>
            <Button asChild size="lg" variant="outline">
              <Link href="/community">
                Contribute to Community
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Destinations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Places to Visit</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">Travelers Helped</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">AI</div>
              <div className="text-sm text-muted-foreground">Powered Planning</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
