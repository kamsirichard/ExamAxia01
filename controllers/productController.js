const Product = require("../models/Product");

// @desc Get all products
// @route GET /api/products
// @access Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    console.log("📦 Retrieved Products:", products); // Debugging
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Error Fetching Products:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// @desc Get a single product
// @route GET /api/products/:id
// @access Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Create a new product (Admin only)
// @route POST /api/products
// @access Private (Admin)
const createProduct = async (req, res) => {
  try {
    const { name, price, category, stock } = req.body;

    if (!name || !price || !category || stock === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = new Product({ name, price, category, stock });
    await product.save();

    res.status(201).json({
      message: "Product successfully added",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Update a product (Admin only)
// @route PUT /api/products/:id
// @access Private (Admin)
const updateProduct = async (req, res) => {
  try {
    const { name, price, category, stock } = req.body;

    if (!name || !price || !category || stock === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, category, stock },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product successfully updated",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Delete a product (Admin only)
// @route DELETE /api/products/:id
// @access Private (Admin)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
