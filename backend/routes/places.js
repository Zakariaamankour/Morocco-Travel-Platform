import express from "express"
import { body } from "express-validator"
import {
  getAllPlaces,
  getPlaceById,
  getNearbyPlaces,
  createPlace,
  updatePlace,
  deletePlace,
} from "../controllers/placeController.js"
import { authenticateToken, isAdmin } from "../middleware/auth.js"
import { validate } from "../middleware/validation.js"

const router = express.Router()

// Public routes
router.get("/", getAllPlaces)
router.get("/:id", getPlaceById)
router.get("/:id/nearby", getNearbyPlaces)

// Protected routes (admin only)
router.post(
  "/",
  authenticateToken,
  isAdmin,
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("slug").trim().notEmpty().withMessage("Slug is required"),
    body("description").trim().notEmpty().withMessage("Description is required"),
    body("category").isIn(["hotel", "restaurant", "activity", "attraction", "shopping"]),
    validate,
  ],
  createPlace,
)

router.put(
  "/:id",
  authenticateToken,
  isAdmin,
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("slug").trim().notEmpty().withMessage("Slug is required"),
    body("description").trim().notEmpty().withMessage("Description is required"),
    validate,
  ],
  updatePlace,
)

router.delete("/:id", authenticateToken, isAdmin, deletePlace)

export default router
