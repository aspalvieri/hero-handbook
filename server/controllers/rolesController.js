const roleQueries = require("../db/queries/roles");

exports.listRoles = (req, res) => {
  const db = req.database;
  roleQueries.getAllRoles(db).then(roles => {
    return res.status(200).json(roles.rows);
  }).catch(err => {
    console.log(err);
    return res.status(400).json({ message: err });
  });
};