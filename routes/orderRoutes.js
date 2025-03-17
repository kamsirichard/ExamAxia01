const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Create Order
router.post("/", async (req, res) => {
  const { userId, products, totalPrice } = req.body;
  const order = new Order({ user: userId, products, totalPrice });

  await order.save();
  res.status(201).json(order);
});

// Get Orders (Admin)
router.get("/", async (req, res) => {
  const orders = await Order.find().populate("user").populate("products.product");
  res.json(orders);
});

module.exports = router;
