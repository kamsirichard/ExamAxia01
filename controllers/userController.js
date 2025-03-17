const User = require("../models/User");

const makeAdmin = async (req, res) => {
  try {
    if (!req.user.isAdmin) return res.status(403).json({ message: "Access denied" });

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isAdmin = true;
    await user.save();

    res.json({ message: "User promoted to admin", user });
  } catch (error) {
    res.status(500).json({ message: "Error promoting user", error: error.message });
  }
};

module.exports = { makeAdmin };
