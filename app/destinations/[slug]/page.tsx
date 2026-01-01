import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { destinations } from "@/lib/data/destinations"
import { places } from "@/lib/data/places"
import {
  MapPin,
  Star,
  Calendar,
  Sparkles,
  ArrowLeft,
  Hotel,
  UtensilsCrossed,
  ActivityIcon,
  MapPinned,
} from "lucide-react"

export function generateStaticParams() {
  return destinations.map((destination) => ({
    slug: destination.slug,
  }))
}

export default function DestinationDetailPage({ params }: { params: { slug: string } }) {
  const destination = destinations.find((d) => d.slug === params.slug)

  if (!destination) {
    notFound()
  }

  const destinationPlaces = places.filter((p) => p.destinationSlug === destination.slug)
  const hotels = destinationPlaces.filter((p) => p.category === "hotel")
  const restaurants = destinationPlaces.filter((p) => p.category === "restaurant")
  const activities = destinationPlaces.filter((p) => p.category === "activity")
  const attractions = destinationPlaces.filter((p) => p.category === "attraction")

  const categoryIcon = {
    hotel: Hotel,
    restaurant: UtensilsCrossed,
    activity: ActivityIcon,
    attraction: MapPinned,
    shopping: MapPinned,
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[70vh] pt-16">
        <Image
          src={destination.image || "/placeholder.svg"}
          alt={destination.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <Button asChild variant="ghost" size="sm" className="mb-4 text-white hover:text-white hover:bg-white/20">
              <Link href="/destinations">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Destinations
              </Link>
            </Button>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-4">{destination.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{destination.region}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-primary text-primary" />
                <span className="font-semibold">{destination.popularityScore}% Traveler Favorite</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>Best: {destination.bestTimeToVisit}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg leading-relaxed mb-8">{destination.description}</p>
            <div>
              <h2 className="text-2xl font-serif font-semibold mb-4">Highlights</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {destination.highlights.map((highlight) => (
                  <div key={highlight} className="bg-muted px-4 py-3 rounded-lg text-center">
                    <span className="font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Places Sections */}
      {hotels.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold mb-8 flex items-center gap-2">
              <Hotel className="h-7 w-7 text-primary" />
              Where to Stay
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((place) => (
                <Link key={place.id} href={`/places/${place.id}`} className="group">
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={place.image || "/placeholder.svg"}
                        alt={place.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold">{place.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-primary fill-primary" />
                          <span className="text-sm font-semibold">{place.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{place.description}</p>
                      <div className="flex items-center gap-1 text-sm text-primary">
                        {"$".repeat(place.priceLevel)}
                        <span className="text-muted-foreground">{"$".repeat(3 - place.priceLevel)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {restaurants.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold mb-8 flex items-center gap-2">
              <UtensilsCrossed className="h-7 w-7 text-primary" />
              Where to Eat
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((place) => (
                <Link key={place.id} href={`/places/${place.id}`} className="group">
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={place.image || "/placeholder.svg"}
                        alt={place.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold">{place.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-primary fill-primary" />
                          <span className="text-sm font-semibold">{place.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{place.description}</p>
                      <div className="flex items-center gap-1 text-sm text-primary">
                        {"$".repeat(place.priceLevel)}
                        <span className="text-muted-foreground">{"$".repeat(3 - place.priceLevel)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {activities.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold mb-8 flex items-center gap-2">
              <ActivityIcon className="h-7 w-7 text-primary" />
              Things to Do
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map((place) => (
                <Link key={place.id} href={`/places/${place.id}`} className="group">
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={place.image || "/placeholder.svg"}
                        alt={place.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold">{place.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-primary fill-primary" />
                          <span className="text-sm font-semibold">{place.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{place.description}</p>
                      <div className="flex items-center gap-1 text-sm text-primary">
                        {"$".repeat(place.priceLevel)}
                        <span className="text-muted-foreground">{"$".repeat(3 - place.priceLevel)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* AI Trip Planner CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Sparkles className="h-10 w-10 mx-auto mb-4" />
            <h2 className="text-3xl font-serif font-bold mb-4">Plan Your Visit to {destination.name}</h2>
            <p className="text-lg mb-6 opacity-90">
              Let AI create a personalized itinerary for your {destination.name} adventure.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href={`/plan-trip?destination=${destination.slug}`}>Create Itinerary</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
