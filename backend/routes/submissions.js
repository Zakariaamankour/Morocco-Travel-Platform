import express from "express"
import { body } from "express-validator"
import {
  getAllSubmissions,
  getSubmissionById,
  createSubmission,
  updateSubmissionStatus,
  getSubmissionStats,
  deleteSubmission,
} from "../controllers/submissionController.js"
import { authenticateToken, isAdmin } from "../middleware/auth.js"
import { validate } from "../middleware/validation.js"

const router = express.Router()

// Public routes
router.post(
  "/",
  [
    body("place_name").trim().notEmpty().withMessage("Place name is required"),
    body("category").isIn(["hotel", "restaurant", "activity", "attraction", "shopping"]),
    body("description").trim().notEmpty().withMessage("Description is required"),
    body("location").trim().notEmpty().withMessage("Location is required"),
    body("submitter_name").trim().notEmpty().withMessage("Name is required"),
    body("submitter_email").isEmail().withMessage("Valid email is required"),
    body("why_special").trim().notEmpty().withMessage("Why special is required"),
    validate,
  ],
  createSubmission,
)

// Protected routes (admin only)
router.get("/", authenticateToken, isAdmin, getAllSubmissions)
router.get("/stats", authenticateToken, isAdmin, getSubmissionStats)
router.get("/:id", authenticateToken, isAdmin, getSubmissionById)
router.patch(
  "/:id/status",
  authenticateToken,
  isAdmin,
  [body("status").isIn(["pending", "approved", "rejected"]), validate],
  updateSubmissionStatus,
)
router.delete("/:id", authenticateToken, isAdmin, deleteSubmission)

export default router
