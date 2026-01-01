import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { places } from "@/lib/data/places"
import { destinations } from "@/lib/data/destinations"
import {
  MapPin,
  Star,
  Clock,
  DollarSign,
  ArrowLeft,
  Navigation,
  Hotel,
  UtensilsCrossed,
  ActivityIcon,
  MapPinned,
  ShoppingBag,
} from "lucide-react"

export function generateStaticParams() {
  return places.map((place) => ({
    id: place.id,
  }))
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export default function PlaceDetailPage({ params }: { params: { id: string } }) {
  const place = places.find((p) => p.id === params.id)

  if (!place) {
    notFound()
  }

  const destination = destinations.find((d) => d.id === place.destinationId)

  // Find nearby places (within 5km)
  const nearbyPlaces = places
    .filter((p) => {
      if (p.id === place.id) return false
      const distance = calculateDistance(place.location.lat, place.location.lng, p.location.lat, p.location.lng)
      return distance <= 5
    })
    .map((p) => ({
      ...p,
      distance: calculateDistance(place.location.lat, place.location.lng, p.location.lat, p.location.lng),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 6)

  const categoryInfo = {
    hotel: { icon: Hotel, label: "Accommodation", color: "bg-blue-500" },
    restaurant: { icon: UtensilsCrossed, label: "Restaurant", color: "bg-orange-500" },
    activity: { icon: ActivityIcon, label: "Activity", color: "bg-green-500" },
    attraction: { icon: MapPinned, label: "Attraction", color: "bg-purple-500" },
    shopping: { icon: ShoppingBag, label: "Shopping", color: "bg-pink-500" },
  }

  const categoryData = categoryInfo[place.category]
  const CategoryIcon = categoryData.icon

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] pt-16">
        <Image src={place.image || "/placeholder.svg"} alt={place.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <Button asChild variant="ghost" size="sm" className="mb-4 text-white hover:text-white hover:bg-white/20">
              <Link href={`/destinations/${place.destinationSlug}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to {destination?.name}
              </Link>
            </Button>
            <div className="flex items-center gap-2 mb-3">
              <Badge className={`${categoryData.color} text-white border-0`}>
                <CategoryIcon className="mr-1 h-3 w-3" />
                {categoryData.label}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-3">{place.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-primary text-primary" />
                <span className="font-semibold text-lg">{place.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-5 w-5" />
                <span className="font-semibold">{"$".repeat(place.priceLevel)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{destination?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div>
                <h2 className="text-2xl font-serif font-bold mb-4">About</h2>
                <p className="text-lg leading-relaxed text-muted-foreground">{place.description}</p>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-2xl font-serif font-bold mb-4">Features & Amenities</h2>
                <div className="grid grid-cols-2 gap-3">
                  {place.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Opening Hours */}
              {place.openingHours && (
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-4">Opening Hours</h2>
                  <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="font-medium">{place.openingHours}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Location Card */}
            <div>
              <Card className="sticky top-20">
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Location</h3>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                      <span>{place.location.address}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="bg-muted rounded-lg h-48 flex items-center justify-center mb-4">
                      <MapPin className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <Button asChild className="w-full bg-transparent" variant="outline">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${place.location.lat},${place.location.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Navigation className="mr-2 h-4 w-4" />
                        Get Directions
                      </a>
                    </Button>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="font-semibold">{place.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Price Level</span>
                      <div className="flex items-center gap-1 text-primary">
                        {"$".repeat(place.priceLevel)}
                        <span className="text-muted-foreground">{"$".repeat(3 - place.priceLevel)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Places */}
      {nearbyPlaces.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold mb-8">Nearby Places</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearbyPlaces.map((nearbyPlace) => {
                const CategoryIcon = categoryInfo[nearbyPlace.category].icon
                return (
                  <Link key={nearbyPlace.id} href={`/places/${nearbyPlace.id}`} className="group">
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={nearbyPlace.image || "/placeholder.svg"}
                          alt={nearbyPlace.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge
                          className={`absolute top-3 right-3 ${categoryInfo[nearbyPlace.category].color} text-white border-0`}
                        >
                          <CategoryIcon className="mr-1 h-3 w-3" />
                          {categoryInfo[nearbyPlace.category].label}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold line-clamp-1">{nearbyPlace.name}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-primary fill-primary" />
                            <span className="text-sm font-semibold">{nearbyPlace.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{nearbyPlace.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1 text-primary">
                            {"$".repeat(nearbyPlace.priceLevel)}
                            <span className="text-muted-foreground">{"$".repeat(3 - nearbyPlace.priceLevel)}</span>
                          </div>
                          <div className="text-muted-foreground">{nearbyPlace.distance.toFixed(1)} km away</div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
