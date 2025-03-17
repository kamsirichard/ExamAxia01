const express = require("express");
const { 
    placeOrder, 
    getUserOrders, 
    updateOrderStatus, 
    getAllOrders 
} = require("../controllers/orderController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, placeOrder); // Place an order (User)
router.get("/", protect, getUserOrders); // Get user-specific orders
router.get("/all", protect, getAllOrders); // Get all orders (Admin Only)
router.put("/:id", protect, updateOrderStatus); // Update order status (Admin Only)

module.exports = router;
