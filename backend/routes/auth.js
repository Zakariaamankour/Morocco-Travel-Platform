import express from "express"
import { body } from "express-validator"
import { login, register, getCurrentUser } from "../controllers/authController.js"
import { authenticateToken, isAdmin } from "../middleware/auth.js"
import { validate } from "../middleware/validation.js"

const router = express.Router()

router.post(
  "/login",
  [
    body("username").trim().notEmpty().withMessage("Username is required"),
    body("password").trim().notEmpty().withMessage("Password is required"),
    validate,
  ],
  login,
)

router.post(
  "/register",
  authenticateToken,
  isAdmin,
  [
    body("username").trim().notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    validate,
  ],
  register,
)

router.get("/me", authenticateToken, getCurrentUser)

export default router
