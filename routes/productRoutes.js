const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add a product (Admin Only)
router.post("/", async (req, res) => {
  const { name, price, category, stock } = req.body;
  const product = new Product({ name, price, category, stock });

  await product.save();
  res.status(201).json(product);
});

module.exports = router;
