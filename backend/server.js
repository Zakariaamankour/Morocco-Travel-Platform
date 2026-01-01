import express from "express"
import cors from "cors"
import dotenv from "dotenv"

// Import routes
import destinationRoutes from "./routes/destinations.js"
import placeRoutes from "./routes/places.js"
import submissionRoutes from "./routes/submissions.js"
import tripPlanRoutes from "./routes/tripPlans.js"
import authRoutes from "./routes/auth.js"

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Morocco Travel API is running" })
})

// API Routes
app.use("/api/auth", authRoutes)
app.use("/api/destinations", destinationRoutes)
app.use("/api/places", placeRoutes)
app.use("/api/submissions", submissionRoutes)
app.use("/api/trip-plans", tripPlanRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    error: "Something went wrong!",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`)
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`)
  console.log(`🌐 API URL: http://localhost:${PORT}`)
})
