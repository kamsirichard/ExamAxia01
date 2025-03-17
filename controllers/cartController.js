const Cart = require("../models/Cart");
const Product = require("../models/Product");

// @desc Get user cart
// @route GET /api/cart
// @access Private (Logged-in user)
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
    if (!cart) return res.json({ message: "Your cart is empty" });

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to get cart", error: error.message });
  }
};

// @desc Add item to cart
// @route POST /api/cart
// @access Private (Logged-in user)
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity; // Update quantity if product exists
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to add to cart", error: error.message });
  }
};

// @desc Remove item from cart
// @route DELETE /api/cart/:id
// @access Private (Logged-in user)
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item.product.toString() !== req.params.id);
    await cart.save();

    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove item", error: error.message });
  }
};

module.exports = { getCart, addToCart, removeFromCart };
