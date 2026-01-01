import pool from "../config/database.js"

// Generate AI trip plan
export const generateTripPlan = async (req, res) => {
  try {
    const { destinations, duration, traveler_type, budget, interests, pace } = req.body

    // Fetch places for selected destinations
    const destinationIds = await getDestinationIds(destinations)
    const places = await getPlacesForDestinations(destinationIds, interests, budget)

    // Generate itinerary based on parameters
    const itinerary = generateItinerary(destinations, duration, traveler_type, budget, interests, pace, places)

    // Save the trip plan
    const [result] = await pool.query(
      `INSERT INTO trip_plans (destinations, duration, traveler_type, budget, interests, pace, itinerary) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        JSON.stringify(destinations),
        duration,
        traveler_type,
        budget,
        JSON.stringify(interests),
        pace,
        JSON.stringify(itinerary),
      ],
    )

    res.status(201).json({
      id: result.insertId,
      itinerary,
      message: "Trip plan generated successfully",
    })
  } catch (error) {
    console.error("Error generating trip plan:", error)
    res.status(500).json({ error: "Failed to generate trip plan" })
  }
}

// Get trip plan by ID
export const getTripPlanById = async (req, res) => {
  try {
    const { id } = req.params

    const [plans] = await pool.query("SELECT * FROM trip_plans WHERE id = ?", [id])

    if (plans.length === 0) {
      return res.status(404).json({ error: "Trip plan not found" })
    }

    res.json(plans[0])
  } catch (error) {
    console.error("Error fetching trip plan:", error)
    res.status(500).json({ error: "Failed to fetch trip plan" })
  }
}

// Helper function to get destination IDs from names
async function getDestinationIds(destinationNames) {
  const [destinations] = await pool.query("SELECT id FROM destinations WHERE name IN (?)", [destinationNames])
  return destinations.map((d) => d.id)
}

// Helper function to fetch places for destinations
async function getPlacesForDestinations(destinationIds, interests, budget) {
  const [places] = await pool.query(
    `SELECT * FROM places 
     WHERE destination_id IN (?) 
     AND price_range = ? 
     ORDER BY rating DESC`,
    [destinationIds, budget],
  )
  return places
}

// Helper function to generate itinerary
function generateItinerary(destinations, duration, traveler_type, budget, interests, pace, places) {
  const daysPerDestination = Math.ceil(duration / destinations.length)
  const itinerary = []

  let currentDay = 1

  destinations.forEach((destination, index) => {
    const destinationPlaces = places.filter((p) => p.destination_id === index + 1)

    for (let day = 0; day < daysPerDestination && currentDay <= duration; day++) {
      const dayPlan = {
        day: currentDay,
        destination: destination,
        activities: generateDayActivities(destinationPlaces, interests, pace, traveler_type),
      }

      itinerary.push(dayPlan)
      currentDay++
    }
  })

  return itinerary
}

// Helper function to generate activities for a day
function generateDayActivities(places, interests, pace, traveler_type) {
  const activities = []
  const activitiesPerDay = pace === "relaxed" ? 2 : pace === "moderate" ? 3 : 4

  // Morning activity
  const morningPlace = places.find((p) => p.category === "attraction" || p.category === "activity")
  if (morningPlace) {
    activities.push({
      time: "09:00",
      activity: `Visit ${morningPlace.name}`,
      description: morningPlace.description,
      duration: "2-3 hours",
    })
  }

  // Lunch
  const lunchPlace = places.find((p) => p.category === "restaurant")
  if (lunchPlace) {
    activities.push({
      time: "12:30",
      activity: `Lunch at ${lunchPlace.name}`,
      description: lunchPlace.description,
      duration: "1-2 hours",
    })
  }

  // Afternoon activity
  if (activitiesPerDay >= 3) {
    const afternoonPlace = places.find(
      (p) => (p.category === "shopping" || p.category === "attraction") && p.id !== morningPlace?.id,
    )
    if (afternoonPlace) {
      activities.push({
        time: "15:00",
        activity: `Explore ${afternoonPlace.name}`,
        description: afternoonPlace.description,
        duration: "2 hours",
      })
    }
  }

  // Dinner
  const dinnerPlace = places.find((p) => p.category === "restaurant" && p.id !== lunchPlace?.id)
  if (dinnerPlace) {
    activities.push({
      time: "19:00",
      activity: `Dinner at ${dinnerPlace.name}`,
      description: dinnerPlace.description,
      duration: "2 hours",
    })
  }

  return activities
}
