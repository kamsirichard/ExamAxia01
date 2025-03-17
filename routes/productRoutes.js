const express = require("express");
const { getProducts, addProduct } = require("../controllers/productController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getProducts);
router.post("/", protect, addProduct);

module.exports = router;
