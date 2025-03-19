const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Import routes
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes")

// Define API routes
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", require("./routes/cartRoutes"));

// Default route
app.get("/", (req, res) => {
  res.send("Oyanauhhhh!");
});

// Database Connection
mongoose.connect("mongodb://localhost:27017/pinkheart", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

mongoose.connection.once("open", () => {
    console.log("✅ MongoDB Connected!");
});
  
mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB Connection Error:", err);
});
  


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
