import express from "express"
import { body } from "express-validator"
import { generateTripPlan, getTripPlanById } from "../controllers/tripPlanController.js"
import { validate } from "../middleware/validation.js"

const router = express.Router()

router.post(
  "/generate",
  [
    body("destinations").isArray().withMessage("Destinations must be an array"),
    body("duration").isInt({ min: 1 }).withMessage("Duration must be at least 1 day"),
    body("traveler_type").isIn(["solo", "couple", "family", "group"]),
    body("budget").isIn(["budget", "mid-range", "luxury"]),
    body("interests").isArray().withMessage("Interests must be an array"),
    body("pace").isIn(["relaxed", "moderate", "fast"]),
    validate,
  ],
  generateTripPlan,
)

router.get("/:id", getTripPlanById)

export default router
