// Query for selecting all columns
const selectAll = `
  SELECT
    role_permissions.id,
    role_permissions.role_id,
    roles.name AS role_name,
    role_permissions.permission_id,
    permissions.name AS permission_name
  FROM
    role_permissions
  INNER JOIN
    roles ON role_permissions.role_id = roles.id
  INNER JOIN
    permissions ON role_permissions.permission_id = permissions.id
`;

exports.getAllRolePermissions = (db) => {
	return db.query(`
		${selectAll}
	`);
};

exports.getRolePermissionsByRoleName = (db, name) => {
	return db.query(`
		${selectAll}
		WHERE
			roles.name = $1
	`, [name]);
};
