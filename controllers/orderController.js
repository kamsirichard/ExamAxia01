const Order = require("../models/Order");

// ✅ Place an Order (User Only)
const placeOrder = async (req, res) => {
  try {
    const { products, totalPrice } = req.body;
    
    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products in order" });
    }

    const order = new Order({ user: req.user.id, products, totalPrice });
    await order.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Order creation failed", error: error.message });
  }
};

// ✅ Get User-Specific Orders (Only Logged-in User)
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate("products.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
};

// ✅ Get All Orders (Admin Only)
const getAllOrders = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied, admin only" });
    }

    const orders = await Order.find().populate("user").populate("products.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all orders", error: error.message });
  }
};

// ✅ Update Order Status (Admin Only)
const updateOrderStatus = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied, admin only" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = req.body.status || order.status;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Failed to update order", error: error.message });
  }
};

module.exports = { placeOrder, getUserOrders, updateOrderStatus, getAllOrders };
