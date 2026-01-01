import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import pool from "../config/database.js"

// Admin login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body

    // Find user
    const [users] = await pool.query("SELECT * FROM admin_users WHERE username = ?", [username])

    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const user = users[0]

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password_hash)
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    // Update last login
    await pool.query("UPDATE admin_users SET last_login = NOW() WHERE id = ?", [user.id])

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    })

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ error: "Login failed" })
  }
}

// Register new admin (protected - admin only)
export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body

    // Check if user already exists
    const [existing] = await pool.query("SELECT id FROM admin_users WHERE username = ? OR email = ?", [username, email])

    if (existing.length > 0) {
      return res.status(400).json({ error: "Username or email already exists" })
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10)

    // Create user
    const [result] = await pool.query(
      "INSERT INTO admin_users (username, email, password_hash, role) VALUES (?, ?, ?, ?)",
      [username, email, password_hash, role || "moderator"],
    )

    res.status(201).json({
      id: result.insertId,
      message: "Admin user created successfully",
    })
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ error: "Registration failed" })
  }
}

// Get current user info
export const getCurrentUser = async (req, res) => {
  try {
    const [users] = await pool.query(
      "SELECT id, username, email, role, created_at, last_login FROM admin_users WHERE id = ?",
      [req.user.id],
    )

    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json(users[0])
  } catch (error) {
    console.error("Error fetching user:", error)
    res.status(500).json({ error: "Failed to fetch user info" })
  }
}
