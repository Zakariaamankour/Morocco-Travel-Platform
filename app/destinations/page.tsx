import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { destinations } from "@/lib/data/destinations"
import { MapPin, Star, Calendar, ArrowRight } from "lucide-react"

export default function DestinationsPage() {
  const sortedDestinations = [...destinations].sort((a, b) => b.popularityScore - a.popularityScore)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-balance">
              Explore Morocco's Destinations
            </h1>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              From imperial cities to mountain villages, discover the diverse landscapes and rich culture that make
              Morocco unforgettable.
            </p>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedDestinations.map((destination) => (
              <Link key={destination.id} href={`/destinations/${destination.slug}`} className="group">
                <Card className="overflow-hidden border-2 hover:border-primary hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                      <Star className="h-3 w-3 text-primary fill-primary" />
                      <span className="text-sm font-semibold">{destination.popularityScore}</span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h2 className="text-3xl font-serif font-bold text-white mb-1">{destination.name}</h2>
                      <div className="flex items-center gap-1 text-white/90 text-sm">
                        <MapPin className="h-3 w-3" />
                        {destination.region}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <p className="text-muted-foreground mb-4 flex-1">{destination.shortDescription}</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">Best time:</span>
                        <span className="font-medium">{destination.bestTimeToVisit}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {destination.highlights.slice(0, 3).map((highlight) => (
                          <span key={highlight} className="text-xs bg-muted px-2 py-1 rounded-md">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      Explore {destination.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Not sure where to go?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Let our AI trip planner create a personalized itinerary based on your interests and travel style.
            </p>
            <Button asChild size="lg">
              <Link href="/plan-trip">Plan My Trip</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
