const jwt = require("jsonwebtoken");

// Middleware to verify JWT token from headers
module.exports = (req, res, next) => {
  // 1. Get token from Authorization header
  const authHeader = req.headers.authorization;

  // 2. Check if token is provided and starts with "Bearer"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  try {
    // 3. Extract token and verify it
    const token = authHeader.split(" ")[1]; // remove "Bearer "
    const decoded = jwt.verify(token, "secret-key"); // same key as in login

    // 4. Save userId to request so we can use it later
    req.userId = decoded.userId;
    next(); // allow the request to continue
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
