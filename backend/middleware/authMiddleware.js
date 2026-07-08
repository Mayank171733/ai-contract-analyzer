const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    // Get token
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Find user
    const user = await User.findById(decoded.id)
      .select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // Attach user
    req.user = user;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = protect;