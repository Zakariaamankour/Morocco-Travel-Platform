import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Heart, Compass, Users, Sparkles, Globe, Award, ArrowRight } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background z-10" />
        <Image
          src="/morocco-landscape-atlas-mountains-golden-hour.jpg"
          alt="Morocco landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-balance">
            About Our
            <br />
            <span className="text-primary">Morocco Journey</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Connecting travelers with the authentic soul of Morocco through technology and local expertise
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              We believe that travel should be transformative, accessible, and authentic. Our platform combines
              cutting-edge AI technology with deep local knowledge to help you discover Morocco in ways that guidebooks
              never could. From the bustling souks of Marrakech to the serene Sahara dunes, we're here to make your
              Moroccan adventure unforgettable.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-3">Authentic Experiences</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We curate real, local experiences that go beyond tourist traps, helping you connect with Morocco's
                  true spirit.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-3">AI-Powered Planning</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our intelligent trip planner creates personalized itineraries based on your interests, budget, and
                  travel style.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-3">Community Driven</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Built by travelers, for travelers. Our community shares hidden gems and insider tips that make every
                  trip special.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
              <Image
                src="/chefchaouen-blue-streets-morocco.jpg"
                alt="Chefchaouen blue streets"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">How We Started</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  It all began with a simple question: Why is planning a trip to Morocco so overwhelming? With countless
                  destinations, experiences, and cultural nuances, travelers were spending weeks researching instead of
                  dreaming.
                </p>
                <p>
                  We set out to change that. By combining advanced AI technology with insights from local experts and
                  seasoned travelers, we created a platform that makes Morocco accessible to everyone—whether you're a
                  first-time visitor or a returning explorer.
                </p>
                <p>
                  Today, we've helped thousands of travelers discover Morocco's magic, from the imperial cities to
                  hidden mountain villages. But we're just getting started. Every day, our community grows stronger,
                  sharing new discoveries and making Morocco more accessible for everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">What We Offer</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to plan and experience an unforgettable journey through Morocco
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <Compass className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-serif font-semibold mb-3">50+ Destinations</h3>
                <p className="text-muted-foreground">
                  From major cities to hidden oases, explore Morocco's diverse landscapes and cultural treasures with
                  detailed guides.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Sparkles className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-serif font-semibold mb-3">AI Trip Planner</h3>
                <p className="text-muted-foreground">
                  Get personalized day-by-day itineraries tailored to your preferences, complete with timing and
                  recommendations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Globe className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-serif font-semibold mb-3">500+ Places</h3>
                <p className="text-muted-foreground">
                  Discover riads, restaurants, activities, and attractions vetted by our community and local experts.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Users className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-serif font-semibold mb-3">Community Insights</h3>
                <p className="text-muted-foreground">
                  Real reviews and recommendations from travelers who've been there, sharing hidden gems and local
                  favorites.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Award className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-serif font-semibold mb-3">Curated Experiences</h3>
                <p className="text-muted-foreground">
                  Hand-picked experiences that showcase authentic Moroccan culture, from cooking classes to desert
                  camps.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Heart className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-serif font-semibold mb-3">Local Connections</h3>
                <p className="text-muted-foreground">
                  Connect with local guides, artisans, and hosts who bring Morocco's stories and traditions to life.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Our Values</h2>
            <p className="text-lg opacity-90 mb-12 text-pretty">
              These principles guide everything we do, from the features we build to the experiences we recommend
            </p>

            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div>
                <h3 className="text-xl font-serif font-semibold mb-3">Authenticity First</h3>
                <p className="opacity-90 leading-relaxed">
                  We prioritize genuine experiences and local perspectives over mass tourism, ensuring every
                  recommendation honors Moroccan culture.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-serif font-semibold mb-3">Traveler-Centric</h3>
                <p className="opacity-90 leading-relaxed">
                  Your needs, preferences, and dreams drive our platform. We build tools that make planning effortless
                  and traveling joyful.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-serif font-semibold mb-3">Continuous Learning</h3>
                <p className="opacity-90 leading-relaxed">
                  Morocco is ever-evolving, and so are we. We constantly update our guides, learn from our community,
                  and improve our AI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Ready to Explore Morocco?</h2>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              Join thousands of travelers who've discovered Morocco with our platform. Start planning your adventure
              today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/plan-trip">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Plan Your Trip
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/destinations">
                  Browse Destinations
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
