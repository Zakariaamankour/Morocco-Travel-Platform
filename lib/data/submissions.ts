export interface Submission {
  id: string
  placeName: string
  destination: string
  destinationName: string
  category: "restaurant" | "hotel" | "activity" | "attraction" | "shopping"
  description: string
  address: string
  submittedBy: string
  email: string
  website?: string
  imageUrl?: string
  status: "pending" | "approved" | "rejected"
  submittedAt: string
}

export const mockSubmissions: Submission[] = [
  {
    id: "s1",
    placeName: "Nomad Restaurant",
    destination: "marrakech",
    destinationName: "Marrakech",
    category: "restaurant",
    description:
      "Modern Moroccan cuisine with a rooftop terrace overlooking the medina. The lamb tagine is exceptional and the atmosphere is unbeatable during sunset.",
    address: "1 Derb Aarjane, Marrakech 40000",
    submittedBy: "Sarah M.",
    email: "sarah@example.com",
    website: "https://nomadmarrakech.com",
    imageUrl: "/moroccan-rooftop-restaurant-terrace.jpg",
    status: "pending",
    submittedAt: "2025-01-15T10:30:00Z",
  },
  {
    id: "s2",
    placeName: "Atlas Hiking Tours",
    destination: "marrakech",
    destinationName: "Marrakech",
    category: "activity",
    description:
      "Best hiking experience in the Atlas Mountains. Our guide Mohammed was knowledgeable and the lunch in a Berber village was authentic and delicious.",
    address: "Atlas Mountains, Imlil",
    submittedBy: "John D.",
    email: "john@example.com",
    status: "pending",
    submittedAt: "2025-01-14T14:20:00Z",
  },
  {
    id: "s3",
    placeName: "Blue Pearl Ceramics",
    destination: "chefchaouen",
    destinationName: "Chefchaouen",
    category: "shopping",
    description:
      "Beautiful handmade ceramics and pottery. The owner is friendly and prices are reasonable. Great for authentic souvenirs.",
    address: "Rue Targui, Chefchaouen",
    submittedBy: "Emma L.",
    email: "emma@example.com",
    imageUrl: "/moroccan-ceramic-shop-blue-pottery.jpg",
    status: "approved",
    submittedAt: "2025-01-13T09:15:00Z",
  },
  {
    id: "s4",
    placeName: "Dar Yasmin",
    destination: "fes",
    destinationName: "Fes",
    category: "hotel",
    description:
      "Charming riad in the heart of the medina. The staff is incredibly helpful and breakfast on the terrace is a highlight. Highly recommend!",
    address: "14 Derb Ben Salem, Fes",
    submittedBy: "Michael R.",
    email: "michael@example.com",
    website: "https://daryasmin.com",
    status: "approved",
    submittedAt: "2025-01-12T16:45:00Z",
  },
  {
    id: "s5",
    placeName: "Random Place",
    destination: "marrakech",
    destinationName: "Marrakech",
    category: "restaurant",
    description: "Not a real place, just testing the submission system.",
    address: "Fake Street 123",
    submittedBy: "Test User",
    email: "test@example.com",
    status: "rejected",
    submittedAt: "2025-01-11T11:00:00Z",
  },
]
