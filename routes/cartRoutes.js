const express = require("express");
const { getCart, addToCart, removeFromCart } = require("../controllers/cartController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getCart);  // Get user cart
router.post("/", protect, addToCart);  // Add to cart
router.delete("/:id", protect, removeFromCart);  // Remove from cart

module.exports = router;
