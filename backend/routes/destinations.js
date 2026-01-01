import express from "express"
import { body } from "express-validator"
import {
  getAllDestinations,
  getDestinationBySlug,
  createDestination,
  updateDestination,
  deleteDestination,
} from "../controllers/destinationController.js"
import { authenticateToken, isAdmin } from "../middleware/auth.js"
import { validate } from "../middleware/validation.js"

const router = express.Router()

// Public routes
router.get("/", getAllDestinations)
router.get("/:slug", getDestinationBySlug)

// Protected routes (admin only)
router.post(
  "/",
  authenticateToken,
  isAdmin,
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("slug").trim().notEmpty().withMessage("Slug is required"),
    body("description").trim().notEmpty().withMessage("Description is required"),
    validate,
  ],
  createDestination,
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
  updateDestination,
)

router.delete("/:id", authenticateToken, isAdmin, deleteDestination)

export default router
