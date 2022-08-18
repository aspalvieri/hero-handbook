const verifySession = (req, res, next) => {
  if (req.sessionID && req.session.user) {
    return next();
  }
  return res.status(403).json({ message: "Invalid Session" });
};

module.exports = verifySession;
