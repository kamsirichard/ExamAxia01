const adminOnly = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: "Access denied, admin only" });
    }
  };
  
  module.exports = adminOnly;
  