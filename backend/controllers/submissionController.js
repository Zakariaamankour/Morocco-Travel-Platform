import pool from "../config/database.js"

// Get all submissions with optional status filter
export const getAllSubmissions = async (req, res) => {
  try {
    const { status } = req.query

    let query = `
      SELECT s.*, d.name as destination_name 
      FROM submissions s 
      LEFT JOIN destinations d ON s.destination_id = d.id 
      WHERE 1=1
    `
    const params = []

    if (status) {
      query += " AND s.status = ?"
      params.push(status)
    }

    query += " ORDER BY s.submitted_at DESC"

    const [submissions] = await pool.query(query, params)
    res.json(submissions)
  } catch (error) {
    console.error("Error fetching submissions:", error)
    res.status(500).json({ error: "Failed to fetch submissions" })
  }
}

// Get submission by ID
export const getSubmissionById = async (req, res) => {
  try {
    const { id } = req.params

    const [submissions] = await pool.query(
      `SELECT s.*, d.name as destination_name 
       FROM submissions s 
       LEFT JOIN destinations d ON s.destination_id = d.id 
       WHERE s.id = ?`,
      [id],
    )

    if (submissions.length === 0) {
      return res.status(404).json({ error: "Submission not found" })
    }

    res.json(submissions[0])
  } catch (error) {
    console.error("Error fetching submission:", error)
    res.status(500).json({ error: "Failed to fetch submission" })
  }
}

// Create new submission (public)
export const createSubmission = async (req, res) => {
  try {
    const {
      destination_id,
      place_name,
      category,
      description,
      location,
      submitter_name,
      submitter_email,
      why_special,
      image_url,
    } = req.body

    const [result] = await pool.query(
      `INSERT INTO submissions (destination_id, place_name, category, description, 
       location, submitter_name, submitter_email, why_special, image_url, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [
        destination_id,
        place_name,
        category,
        description,
        location,
        submitter_name,
        submitter_email,
        why_special,
        image_url,
      ],
    )

    res.status(201).json({
      id: result.insertId,
      message: "Submission created successfully",
    })
  } catch (error) {
    console.error("Error creating submission:", error)
    res.status(500).json({ error: "Failed to create submission" })
  }
}

// Update submission status (admin only)
export const updateSubmissionStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status, admin_notes } = req.body

    const [result] = await pool.query(
      "UPDATE submissions SET status = ?, admin_notes = ?, reviewed_at = NOW() WHERE id = ?",
      [status, admin_notes, id],
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Submission not found" })
    }

    res.json({ message: "Submission status updated successfully" })
  } catch (error) {
    console.error("Error updating submission:", error)
    res.status(500).json({ error: "Failed to update submission" })
  }
}

// Get submission statistics (admin only)
export const getSubmissionStats = async (req, res) => {
  try {
    const [stats] = await pool.query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved,
        SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected
      FROM submissions
    `)

    res.json(stats[0])
  } catch (error) {
    console.error("Error fetching submission stats:", error)
    res.status(500).json({ error: "Failed to fetch submission stats" })
  }
}

// Delete submission (admin only)
export const deleteSubmission = async (req, res) => {
  try {
    const { id } = req.params

    const [result] = await pool.query("DELETE FROM submissions WHERE id = ?", [id])

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Submission not found" })
    }

    res.json({ message: "Submission deleted successfully" })
  } catch (error) {
    console.error("Error deleting submission:", error)
    res.status(500).json({ error: "Failed to delete submission" })
  }
}
