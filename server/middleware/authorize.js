const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const bearerToken = req.headers["x-access-token"] || req.headers["Authorization"] || req.headers["authorization"];

  if (!bearerToken) {
    return res.status(403).json({ message: "A token is required for authentication" });
  }
  
  const token = bearerToken.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
  return next();
};

module.exports = verifyToken;
