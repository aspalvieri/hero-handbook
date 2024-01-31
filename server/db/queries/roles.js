// Query for selecting all columns
const selectAll = `
	SELECT
		roles.id,
		roles.name,
		jsonb_agg(jsonb_build_object('id', permissions.id, 'name', permissions.name)) AS permissions
	FROM
		roles
	INNER JOIN
		role_permissions ON roles.id = role_permissions.role_id
	INNER JOIN
		permissions ON role_permissions.permission_id = permissions.id
`;
const selectAllGroupBy = `
	GROUP BY
		roles.id
`;

exports.getAllRoles = (db) => {
	return db.query(`
		${selectAll}
		${selectAllGroupBy}
	`);
};

exports.getRoleByName = (db, name) => {
	return db.query(`
		${selectAll}
		WHERE
			roles.name = $1
		${selectAllGroupBy}
	`, [name]);
};
