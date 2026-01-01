"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { destinations } from "@/lib/data/destinations"
import { Users, Send, CheckCircle, Heart, MapPin, ImageIcon } from "lucide-react"

interface SubmissionForm {
  placeName: string
  destination: string
  category: string
  description: string
  address: string
  submittedBy: string
  email: string
  website: string
  imageUrl: string
}

export default function CommunityPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState<SubmissionForm>({
    placeName: "",
    destination: "",
    category: "",
    description: "",
    address: "",
    submittedBy: "",
    email: "",
    website: "",
    imageUrl: "",
  })

  const categories = [
    { value: "restaurant", label: "Restaurant" },
    { value: "hotel", label: "Hotel" },
    { value: "activity", label: "Activity" },
    { value: "attraction", label: "Attraction" },
    { value: "shopping", label: "Shopping" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSubmitted(true)
  }

  const handleReset = () => {
    setFormData({
      placeName: "",
      destination: "",
      category: "",
      description: "",
      address: "",
      submittedBy: "",
      email: "",
      website: "",
      imageUrl: "",
    })
    setSubmitted(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 pt-24 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Users className="h-8 w-8 text-primary" />
                <h1 className="text-4xl md:text-5xl font-serif font-bold">Community Contributions</h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Help fellow travelers discover Morocco by sharing your favorite places, hidden gems, and authentic
                experiences
              </p>
            </div>

            {!submitted ? (
              <Card>
                <CardHeader>
                  <CardTitle>Share a Place</CardTitle>
                  <CardDescription>
                    Tell us about a restaurant, hotel, activity, or attraction you loved in Morocco
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Place Name */}
                    <div>
                      <Label htmlFor="placeName">
                        Place Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="placeName"
                        value={formData.placeName}
                        onChange={(e) => setFormData({ ...formData, placeName: e.target.value })}
                        placeholder="e.g., Riad Yasmine, Café Clock"
                        required
                      />
                    </div>

                    {/* Destination & Category */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="destination">
                          Destination <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={formData.destination}
                          onValueChange={(value) => setFormData({ ...formData, destination: value })}
                          required
                        >
                          <SelectTrigger id="destination">
                            <SelectValue placeholder="Select a destination" />
                          </SelectTrigger>
                          <SelectContent>
                            {destinations.map((dest) => (
                              <SelectItem key={dest.id} value={dest.slug}>
                                {dest.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="category">
                          Category <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData({ ...formData, category: value })}
                          required
                        >
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.value} value={cat.value}>
                                {cat.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <Label htmlFor="description">
                        Description <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Share what makes this place special. What did you love about it? What should others know?"
                        rows={4}
                        required
                      />
                      <p className="text-xs text-muted-foreground mt-1">Minimum 50 characters</p>
                    </div>

                    {/* Address */}
                    <div>
                      <Label htmlFor="address">
                        Address <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="Full address or general location"
                          className="pl-9"
                          required
                        />
                      </div>
                    </div>

                    {/* Image URL */}
                    <div>
                      <Label htmlFor="imageUrl">Image URL (Optional)</Label>
                      <div className="relative">
                        <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="imageUrl"
                          value={formData.imageUrl}
                          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                          placeholder="https://example.com/image.jpg"
                          type="url"
                          className="pl-9"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Share a link to a photo (must be a public URL)
                      </p>
                    </div>

                    {/* Website */}
                    <div>
                      <Label htmlFor="website">Website (Optional)</Label>
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="https://example.com"
                        type="url"
                      />
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="font-semibold mb-4">Your Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="submittedBy">
                            Your Name <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="submittedBy"
                            value={formData.submittedBy}
                            onChange={(e) => setFormData({ ...formData, submittedBy: e.target.value })}
                            placeholder="First name or nickname"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">
                            Email <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="your@email.com"
                            required
                          />
                          <p className="text-xs text-muted-foreground mt-1">We'll never share your email</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button type="submit" size="lg" className="flex-1">
                        <Send className="mr-2 h-4 w-4" />
                        Submit for Review
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-2 border-primary">
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-serif font-bold mb-2">Thank You for Your Contribution!</h2>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Your submission has been received and will be reviewed by our team. We appreciate you helping fellow
                    travelers discover Morocco!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={handleReset} size="lg">
                      Submit Another Place
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <a href="/destinations">Explore Destinations</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Info Cards */}
            {!submitted && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Heart className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Share Your Favorites</h3>
                    <p className="text-sm text-muted-foreground">
                      Help others discover the places that made your trip special
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Build Community</h3>
                    <p className="text-sm text-muted-foreground">
                      Join travelers sharing authentic Morocco experiences
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <CheckCircle className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Quality Reviewed</h3>
                    <p className="text-sm text-muted-foreground">All submissions are reviewed before being published</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
