import pool from "../config/database.js"

// Get all destinations
export const getAllDestinations = async (req, res) => {
  try {
    const [destinations] = await pool.query("SELECT * FROM destinations ORDER BY name ASC")
    res.json(destinations)
  } catch (error) {
    console.error("Error fetching destinations:", error)
    res.status(500).json({ error: "Failed to fetch destinations" })
  }
}

// Get destination by slug
export const getDestinationBySlug = async (req, res) => {
  try {
    const { slug } = req.params

    const [destinations] = await pool.query("SELECT * FROM destinations WHERE slug = ?", [slug])

    if (destinations.length === 0) {
      return res.status(404).json({ error: "Destination not found" })
    }

    res.json(destinations[0])
  } catch (error) {
    console.error("Error fetching destination:", error)
    res.status(500).json({ error: "Failed to fetch destination" })
  }
}

// Create new destination (admin only)
export const createDestination = async (req, res) => {
  try {
    const { name, slug, description, image_url, region, highlights, best_time_to_visit } = req.body

    const [result] = await pool.query(
      "INSERT INTO destinations (name, slug, description, image_url, region, highlights, best_time_to_visit) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, slug, description, image_url, region, highlights, best_time_to_visit],
    )

    res.status(201).json({
      id: result.insertId,
      message: "Destination created successfully",
    })
  } catch (error) {
    console.error("Error creating destination:", error)
    res.status(500).json({ error: "Failed to create destination" })
  }
}

// Update destination (admin only)
export const updateDestination = async (req, res) => {
  try {
    const { id } = req.params
    const { name, slug, description, image_url, region, highlights, best_time_to_visit } = req.body

    const [result] = await pool.query(
      "UPDATE destinations SET name = ?, slug = ?, description = ?, image_url = ?, region = ?, highlights = ?, best_time_to_visit = ? WHERE id = ?",
      [name, slug, description, image_url, region, highlights, best_time_to_visit, id],
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Destination not found" })
    }

    res.json({ message: "Destination updated successfully" })
  } catch (error) {
    console.error("Error updating destination:", error)
    res.status(500).json({ error: "Failed to update destination" })
  }
}

// Delete destination (admin only)
export const deleteDestination = async (req, res) => {
  try {
    const { id } = req.params

    const [result] = await pool.query("DELETE FROM destinations WHERE id = ?", [id])

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Destination not found" })
    }

    res.json({ message: "Destination deleted successfully" })
  } catch (error) {
    console.error("Error deleting destination:", error)
    res.status(500).json({ error: "Failed to delete destination" })
  }
}
