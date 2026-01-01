export interface Place {
  id: string
  name: string
  destinationId: string
  destinationSlug: string
  category: "restaurant" | "hotel" | "activity" | "attraction" | "shopping"
  description: string
  image: string
  rating: number
  priceLevel: number
  location: {
    lat: number
    lng: number
    address: string
  }
  features: string[]
  openingHours?: string
}

export const places: Place[] = [
  // Marrakech places
  {
    id: "p1",
    name: "Le Jardin",
    destinationId: "1",
    destinationSlug: "marrakech",
    category: "restaurant",
    description:
      "A hidden garden oasis in the heart of the medina serving contemporary Moroccan cuisine with a French twist.",
    image: "/moroccan-garden-restaurant-interior.jpg",
    rating: 4.7,
    priceLevel: 2,
    location: { lat: 31.6295, lng: -7.9811, address: "32 Souk Jeld, Sidi Abdelaziz, Marrakech" },
    features: ["Garden Seating", "Vegetarian Options", "Local Ingredients", "Historic Building"],
    openingHours: "12:00 PM - 11:00 PM",
  },
  {
    id: "p2",
    name: "Riad Yasmine",
    destinationId: "1",
    destinationSlug: "marrakech",
    category: "hotel",
    description:
      "Boutique riad featuring traditional Moroccan architecture with modern comforts and a rooftop terrace.",
    image: "/moroccan-riad-courtyard-pool.jpg",
    rating: 4.8,
    priceLevel: 3,
    location: { lat: 31.6317, lng: -7.9894, address: "92 Derb Sidi Bouloukat, Marrakech" },
    features: ["Rooftop Pool", "Hammam", "Traditional Decor", "Breakfast Included"],
  },
  {
    id: "p3",
    name: "Hot Air Balloon Ride",
    destinationId: "1",
    destinationSlug: "marrakech",
    category: "activity",
    description: "Soar above the Atlas Mountains at sunrise for breathtaking views of Marrakech and Berber villages.",
    image: "/hot-air-balloon-morocco-sunrise.jpg",
    rating: 4.9,
    priceLevel: 3,
    location: { lat: 31.6, lng: -8.0, address: "Palm Grove, Marrakech" },
    features: ["Sunrise Flight", "Berber Breakfast", "Hotel Pickup", "Professional Pilot"],
  },
  // Chefchaouen places
  {
    id: "p4",
    name: "Casa Hassan",
    destinationId: "2",
    destinationSlug: "chefchaouen",
    category: "hotel",
    description: "Traditional guesthouse in the blue medina with stunning mountain views and authentic hospitality.",
    image: "/chefchaouen-blue-hotel-terrace-view.jpg",
    rating: 4.6,
    priceLevel: 2,
    location: { lat: 35.1688, lng: -5.2686, address: "22 Rue Targhi, Chefchaouen" },
    features: ["Mountain Views", "Traditional Decor", "Terrace", "Family Run"],
  },
  {
    id: "p5",
    name: "Hiking in Rif Mountains",
    destinationId: "2",
    destinationSlug: "chefchaouen",
    category: "activity",
    description: "Guided hiking tours through the beautiful Rif Mountains with local Berber guides.",
    image: "/rif-mountains-morocco-hiking-trail.jpg",
    rating: 4.8,
    priceLevel: 1,
    location: { lat: 35.18, lng: -5.25, address: "Rif Mountains, Chefchaouen Region" },
    features: ["Local Guides", "Various Difficulty Levels", "Packed Lunch", "Small Groups"],
  },
  // Sahara places
  {
    id: "p6",
    name: "Luxury Desert Camp",
    destinationId: "4",
    destinationSlug: "sahara-desert",
    category: "hotel",
    description:
      "Glamping experience in the heart of the Sahara with comfortable tents, traditional cuisine, and stargazing.",
    image: "/luxury-desert-camp-sahara-morocco-night.jpg",
    rating: 4.9,
    priceLevel: 3,
    location: { lat: 31.0801, lng: -4.0048, address: "Erg Chebbi Dunes, Merzouga" },
    features: ["Private Tents", "Traditional Dinner", "Camel Trek", "Campfire & Music"],
  },
]
