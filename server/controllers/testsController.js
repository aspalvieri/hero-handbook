const rolePermissionQueries = require("../db/queries/role_permissions");
const roleQueries = require("../db/queries/roles");
const permissionQueries = require("../db/queries/permissions");

exports.rolePermissions = (req, res) => {
  const db = req.database;
  rolePermissionQueries.getAllRolePermissions(db).then(rolePermissions => {
    return res.status(200).json(rolePermissions.rows);
  }).catch(err => {
    console.log(err);
    return res.status(400).json({ message: err });
  });
};

exports.roles = (req, res) => {
  const db = req.database;
  roleQueries.getAllRoles(db).then(roles => {
    return res.status(200).json(roles.rows);
  }).catch(err => {
    console.log(err);
    return res.status(400).json({ message: err });
  });
};

exports.permissions = (req, res) => {
  const db = req.database;
  permissionQueries.getAllPermissions(db).then(permissions => {
    return res.status(200).json(permissions.rows);
  }).catch(err => {
    console.log(err);
    return res.status(400).json({ message: err });
  });
};
