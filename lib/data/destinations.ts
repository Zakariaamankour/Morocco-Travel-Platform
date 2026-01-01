export interface Destination {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  image: string
  region: string
  popularityScore: number
  bestTimeToVisit: string
  highlights: string[]
}

export const destinations: Destination[] = [
  {
    id: "1",
    name: "Marrakech",
    slug: "marrakech",
    description:
      "The Red City captivates with its bustling souks, stunning palaces, and vibrant energy. Experience the magic of Jemaa el-Fnaa square, explore ancient medinas, and discover world-class riads.",
    shortDescription: "Ancient medinas, vibrant souks, and timeless charm",
    image: "/marrakech-medina-sunset-orange-red-colors.jpg",
    region: "Central Morocco",
    popularityScore: 98,
    bestTimeToVisit: "October to April",
    highlights: ["Jemaa el-Fnaa", "Majorelle Garden", "Bahia Palace", "Souks"],
  },
  {
    id: "2",
    name: "Chefchaouen",
    slug: "chefchaouen",
    description:
      "The Blue Pearl of Morocco nestled in the Rif Mountains. Wander through blue-washed streets, discover local crafts, and enjoy the peaceful mountain atmosphere.",
    shortDescription: "Enchanting blue city in the mountains",
    image: "/chefchaouen-blue-streets-morocco.jpg",
    region: "Northern Morocco",
    popularityScore: 92,
    bestTimeToVisit: "April to October",
    highlights: ["Blue Streets", "Kasbah Museum", "Ras El Maa", "Spanish Mosque"],
  },
  {
    id: "3",
    name: "Fes",
    slug: "fes",
    description:
      "Morocco's spiritual and cultural heart, home to the world's oldest university. Navigate the UNESCO-listed medina, witness traditional crafts, and step back in time.",
    shortDescription: "Medieval medina and cultural heritage",
    image: "/fes-morocco-medina-ancient-streets.jpg",
    region: "Northern Morocco",
    popularityScore: 89,
    bestTimeToVisit: "March to May, September to November",
    highlights: ["Fes el-Bali", "Al Quaraouiyine", "Chouara Tannery", "Bou Inania"],
  },
  {
    id: "4",
    name: "Sahara Desert",
    slug: "sahara-desert",
    description:
      "Experience the vast beauty of golden dunes, starlit nights, and Berber hospitality. Ride camels, sleep under the stars, and witness unforgettable sunrises.",
    shortDescription: "Endless dunes and desert adventures",
    image: "/sahara-sunset-dunes.png",
    region: "Southern Morocco",
    popularityScore: 95,
    bestTimeToVisit: "October to April",
    highlights: ["Erg Chebbi", "Camel Treks", "Desert Camps", "Star Gazing"],
  },
  {
    id: "5",
    name: "Essaouira",
    slug: "essaouira",
    description:
      "A coastal gem with Portuguese fortifications, fresh seafood, and Atlantic breezes. Perfect for water sports, art galleries, and relaxed beachside living.",
    shortDescription: "Charming coastal town with artistic flair",
    image: "/essaouira-morocco-blue-boats-port.jpg",
    region: "Atlantic Coast",
    popularityScore: 87,
    bestTimeToVisit: "Year-round",
    highlights: ["Medina", "Port", "Beaches", "Wind Surfing"],
  },
  {
    id: "6",
    name: "Casablanca",
    slug: "casablanca",
    description:
      "Morocco's cosmopolitan hub blending Art Deco architecture with modern energy. Visit the stunning Hassan II Mosque and experience contemporary Moroccan culture.",
    shortDescription: "Modern metropolis meets traditional charm",
    image: "/casablanca-morocco-hassan-ii-mosque.jpg",
    region: "Atlantic Coast",
    popularityScore: 85,
    bestTimeToVisit: "March to May, September to November",
    highlights: ["Hassan II Mosque", "Corniche", "Rick's Café", "Old Medina"],
  },
]
