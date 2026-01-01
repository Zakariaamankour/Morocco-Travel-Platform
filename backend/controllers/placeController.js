import pool from "../config/database.js"

// Get all places with optional filters
export const getAllPlaces = async (req, res) => {
  try {
    const { destination_id, category, price_range } = req.query

    let query = "SELECT * FROM places WHERE 1=1"
    const params = []

    if (destination_id) {
      query += " AND destination_id = ?"
      params.push(destination_id)
    }

    if (category) {
      query += " AND category = ?"
      params.push(category)
    }

    if (price_range) {
      query += " AND price_range = ?"
      params.push(price_range)
    }

    query += " ORDER BY rating DESC"

    const [places] = await pool.query(query, params)
    res.json(places)
  } catch (error) {
    console.error("Error fetching places:", error)
    res.status(500).json({ error: "Failed to fetch places" })
  }
}

// Get place by ID
export const getPlaceById = async (req, res) => {
  try {
    const { id } = req.params

    const [places] = await pool.query(
      "SELECT p.*, d.name as destination_name, d.slug as destination_slug FROM places p LEFT JOIN destinations d ON p.destination_id = d.id WHERE p.id = ?",
      [id],
    )

    if (places.length === 0) {
      return res.status(404).json({ error: "Place not found" })
    }

    res.json(places[0])
  } catch (error) {
    console.error("Error fetching place:", error)
    res.status(500).json({ error: "Failed to fetch place" })
  }
}

// Get nearby places based on coordinates
export const getNearbyPlaces = async (req, res) => {
  try {
    const { id } = req.params
    const radius = req.query.radius || 5 // Default 5km radius

    // First get the place coordinates
    const [places] = await pool.query("SELECT latitude, longitude FROM places WHERE id = ?", [id])

    if (places.length === 0) {
      return res.status(404).json({ error: "Place not found" })
    }

    const { latitude, longitude } = places[0]

    // Find nearby places using Haversine formula
    const [nearbyPlaces] = await pool.query(
      `
      SELECT *, 
        (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * 
        cos(radians(longitude) - radians(?)) + sin(radians(?)) * 
        sin(radians(latitude)))) AS distance 
      FROM places 
      WHERE id != ? 
      HAVING distance < ? 
      ORDER BY distance ASC 
      LIMIT 10
    `,
      [latitude, longitude, latitude, id, radius],
    )

    res.json(nearbyPlaces)
  } catch (error) {
    console.error("Error fetching nearby places:", error)
    res.status(500).json({ error: "Failed to fetch nearby places" })
  }
}

// Create new place (admin only)
export const createPlace = async (req, res) => {
  try {
    const {
      destination_id,
      name,
      slug,
      description,
      category,
      image_url,
      price_range,
      rating,
      address,
      latitude,
      longitude,
      phone,
      website,
      opening_hours,
      features,
    } = req.body

    const [result] = await pool.query(
      `INSERT INTO places (destination_id, name, slug, description, category, image_url, 
       price_range, rating, address, latitude, longitude, phone, website, opening_hours, features) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        destination_id,
        name,
        slug,
        description,
        category,
        image_url,
        price_range,
        rating,
        address,
        latitude,
        longitude,
        phone,
        website,
        opening_hours,
        JSON.stringify(features),
      ],
    )

    res.status(201).json({
      id: result.insertId,
      message: "Place created successfully",
    })
  } catch (error) {
    console.error("Error creating place:", error)
    res.status(500).json({ error: "Failed to create place" })
  }
}

// Update place (admin only)
export const updatePlace = async (req, res) => {
  try {
    const { id } = req.params
    const {
      destination_id,
      name,
      slug,
      description,
      category,
      image_url,
      price_range,
      rating,
      address,
      latitude,
      longitude,
      phone,
      website,
      opening_hours,
      features,
    } = req.body

    const [result] = await pool.query(
      `UPDATE places SET destination_id = ?, name = ?, slug = ?, description = ?, category = ?, 
       image_url = ?, price_range = ?, rating = ?, address = ?, latitude = ?, longitude = ?, 
       phone = ?, website = ?, opening_hours = ?, features = ? WHERE id = ?`,
      [
        destination_id,
        name,
        slug,
        description,
        category,
        image_url,
        price_range,
        rating,
        address,
        latitude,
        longitude,
        phone,
        website,
        opening_hours,
        JSON.stringify(features),
        id,
      ],
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Place not found" })
    }

    res.json({ message: "Place updated successfully" })
  } catch (error) {
    console.error("Error updating place:", error)
    res.status(500).json({ error: "Failed to update place" })
  }
}

// Delete place (admin only)
export const deletePlace = async (req, res) => {
  try {
    const { id } = req.params

    const [result] = await pool.query("DELETE FROM places WHERE id = ?", [id])

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Place not found" })
    }

    res.json({ message: "Place deleted successfully" })
  } catch (error) {
    console.error("Error deleting place:", error)
    res.status(500).json({ error: "Failed to delete place" })
  }
}
