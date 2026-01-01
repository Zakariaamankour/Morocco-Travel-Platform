"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { destinations } from "@/lib/data/destinations"
import { Sparkles, Calendar, Users, Heart, Loader2, ArrowRight, MapPin, Clock } from "lucide-react"

interface TripPreferences {
  destinations: string[]
  duration: number
  travelers: string
  interests: string[]
  pace: string
  budget: string
}

interface ItineraryDay {
  day: number
  location: string
  activities: { time: string; activity: string; description: string }[]
}

export default function PlanTripPage() {
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [preferences, setPreferences] = useState<TripPreferences>({
    destinations: [],
    duration: 7,
    travelers: "solo",
    interests: [],
    pace: "moderate",
    budget: "moderate",
  })
  const [itinerary, setItinerary] = useState<ItineraryDay[] | null>(null)

  const interestOptions = [
    { id: "culture", label: "Culture & History", icon: "🏛️" },
    { id: "food", label: "Food & Cuisine", icon: "🍽️" },
    { id: "adventure", label: "Adventure", icon: "⛰️" },
    { id: "nature", label: "Nature & Landscapes", icon: "🌄" },
    { id: "shopping", label: "Shopping & Markets", icon: "🛍️" },
    { id: "relaxation", label: "Relaxation", icon: "🧘" },
  ]

  const handleDestinationToggle = (slug: string) => {
    setPreferences((prev) => ({
      ...prev,
      destinations: prev.destinations.includes(slug)
        ? prev.destinations.filter((d) => d !== slug)
        : [...prev.destinations, slug],
    }))
  }

  const handleInterestToggle = (interest: string) => {
    setPreferences((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const generateItinerary = async () => {
    setIsGenerating(true)

    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Generate mock itinerary based on preferences
    const selectedDestinations = destinations.filter((d) => preferences.destinations.includes(d.slug))
    const daysPerDestination = Math.floor(preferences.duration / selectedDestinations.length)

    const mockItinerary: ItineraryDay[] = []
    let currentDay = 1

    selectedDestinations.forEach((dest, index) => {
      const days =
        index === selectedDestinations.length - 1 ? preferences.duration - currentDay + 1 : daysPerDestination

      for (let i = 0; i < days; i++) {
        mockItinerary.push({
          day: currentDay++,
          location: dest.name,
          activities: [
            {
              time: "9:00 AM",
              activity: `Explore ${dest.highlights[0] || "the medina"}`,
              description: "Start your day discovering the historic heart of the city with a guided tour.",
            },
            {
              time: "1:00 PM",
              activity: "Traditional Moroccan Lunch",
              description: "Savor authentic local cuisine at a highly-rated restaurant.",
            },
            {
              time: "3:00 PM",
              activity: `Visit ${dest.highlights[1] || "local attractions"}`,
              description: "Continue exploring the cultural landmarks and hidden gems.",
            },
            {
              time: "7:00 PM",
              activity: "Sunset & Dinner",
              description: "Watch the sunset from a scenic viewpoint and enjoy dinner with a view.",
            },
          ],
        })
      }
    })

    setItinerary(mockItinerary)
    setIsGenerating(false)
    setStep(4)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
                <h1 className="text-4xl md:text-5xl font-serif font-bold">AI Trip Planner</h1>
              </div>
              <p className="text-lg text-muted-foreground">
                Answer a few questions and get a personalized Morocco itinerary
              </p>
            </div>

            {/* Progress Indicator */}
            {step < 4 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Step {step} of 3</span>
                  <span className="text-sm text-muted-foreground">{Math.round((step / 3) * 100)}% Complete</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${(step / 3) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Step 1: Destinations */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Where do you want to go?
                  </CardTitle>
                  <CardDescription>Select one or more destinations to visit in Morocco</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {destinations.map((dest) => (
                      <div
                        key={dest.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          preferences.destinations.includes(dest.slug)
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => handleDestinationToggle(dest.slug)}
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox checked={preferences.destinations.includes(dest.slug)} className="mt-1" />
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{dest.name}</h3>
                            <p className="text-sm text-muted-foreground">{dest.shortDescription}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end pt-4">
                    <Button onClick={() => setStep(2)} disabled={preferences.destinations.length === 0} size="lg">
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Trip Details */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Trip Details
                  </CardTitle>
                  <CardDescription>Tell us about your travel plans</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Duration */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">
                      How many days? ({preferences.duration} days)
                    </Label>
                    <Slider
                      value={[preferences.duration]}
                      onValueChange={(value) => setPreferences((prev) => ({ ...prev, duration: value[0] }))}
                      min={3}
                      max={21}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>3 days</span>
                      <span>21 days</span>
                    </div>
                  </div>

                  {/* Travelers */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">
                      <Users className="inline h-4 w-4 mr-1" />
                      Who's traveling?
                    </Label>
                    <RadioGroup
                      value={preferences.travelers}
                      onValueChange={(value) => setPreferences((prev) => ({ ...prev, travelers: value }))}
                    >
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { value: "solo", label: "Solo" },
                          { value: "couple", label: "Couple" },
                          { value: "family", label: "Family" },
                          { value: "friends", label: "Friends" },
                        ].map((option) => (
                          <div key={option.value} className="flex items-center space-x-2 p-3 border rounded-lg">
                            <RadioGroupItem value={option.value} id={option.value} />
                            <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                              {option.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Budget */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Budget Level</Label>
                    <RadioGroup
                      value={preferences.budget}
                      onValueChange={(value) => setPreferences((prev) => ({ ...prev, budget: value }))}
                    >
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: "budget", label: "Budget" },
                          { value: "moderate", label: "Moderate" },
                          { value: "luxury", label: "Luxury" },
                        ].map((option) => (
                          <div key={option.value} className="flex items-center space-x-2 p-3 border rounded-lg">
                            <RadioGroupItem value={option.value} id={`budget-${option.value}`} />
                            <Label htmlFor={`budget-${option.value}`} className="flex-1 cursor-pointer">
                              {option.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button onClick={() => setStep(1)} variant="outline" size="lg">
                      Back
                    </Button>
                    <Button onClick={() => setStep(3)} size="lg">
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Interests & Preferences */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    Your Interests
                  </CardTitle>
                  <CardDescription>What would you like to experience in Morocco?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Interests */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Select your interests</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {interestOptions.map((interest) => (
                        <div
                          key={interest.id}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all text-center ${
                            preferences.interests.includes(interest.id)
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                          onClick={() => handleInterestToggle(interest.id)}
                        >
                          <div className="text-3xl mb-2">{interest.icon}</div>
                          <div className="text-sm font-medium">{interest.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pace */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">
                      <Clock className="inline h-4 w-4 mr-1" />
                      Travel Pace
                    </Label>
                    <RadioGroup
                      value={preferences.pace}
                      onValueChange={(value) => setPreferences((prev) => ({ ...prev, pace: value }))}
                    >
                      <div className="space-y-3">
                        {[
                          { value: "relaxed", label: "Relaxed", desc: "Take it easy, plenty of downtime" },
                          { value: "moderate", label: "Moderate", desc: "Balanced mix of activities and rest" },
                          { value: "fast", label: "Fast-paced", desc: "See and do as much as possible" },
                        ].map((option) => (
                          <div key={option.value} className="flex items-start space-x-3 p-4 border rounded-lg">
                            <RadioGroupItem value={option.value} id={`pace-${option.value}`} className="mt-1" />
                            <Label htmlFor={`pace-${option.value}`} className="flex-1 cursor-pointer">
                              <div className="font-medium">{option.label}</div>
                              <div className="text-sm text-muted-foreground">{option.desc}</div>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button onClick={() => setStep(2)} variant="outline" size="lg">
                      Back
                    </Button>
                    <Button
                      onClick={generateItinerary}
                      disabled={preferences.interests.length === 0 || isGenerating}
                      size="lg"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Generate Itinerary
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Generated Itinerary */}
            {step === 4 && itinerary && (
              <div className="space-y-6">
                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Sparkles className="h-8 w-8 mt-1" />
                      <div className="flex-1">
                        <h2 className="text-2xl font-serif font-bold mb-2">Your Personalized Morocco Itinerary</h2>
                        <p className="opacity-90">
                          A {preferences.duration}-day {preferences.budget} journey through{" "}
                          {preferences.destinations.length} destination{preferences.destinations.length > 1 ? "s" : ""}{" "}
                          tailored to your interests
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {itinerary.map((day) => (
                  <Card key={day.day}>
                    <CardHeader className="bg-muted/30">
                      <CardTitle className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                          {day.day}
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground font-normal">Day {day.day}</div>
                          <div>{day.location}</div>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        {day.activities.map((activity, idx) => (
                          <div key={idx} className="flex gap-4">
                            <div className="flex-shrink-0 w-20 text-sm font-semibold text-primary">{activity.time}</div>
                            <div className="flex-1">
                              <h4 className="font-semibold mb-1">{activity.activity}</h4>
                              <p className="text-sm text-muted-foreground">{activity.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="flex gap-4">
                  <Button
                    onClick={() => {
                      setStep(1)
                      setItinerary(null)
                    }}
                    variant="outline"
                    size="lg"
                    className="flex-1"
                  >
                    Create New Plan
                  </Button>
                  <Button asChild size="lg" className="flex-1">
                    <Link href="/community">Share Your Experience</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
