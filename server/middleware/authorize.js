exports.authorize = ({role, permission}) => (req, res, next) => {
  if (req.sessionID && req.session.user) {
    if ((!role || req.session.user.role === role) && (!permission || req.session.user.permissions.includes(permission))) {
      return next();
    }
    return res.status(403).json({ message: `Missing${role ? ` Role: ${role}` : "" }${permission ? ` Permission: ${permission}` : ""}` });
  }
  return res.status(403).json({ message: "Invalid Session" });
};
