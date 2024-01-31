// Query for selecting all columns
const selectAll = `
	SELECT
		permissions.id, 
		permissions.name
	FROM
		permissions
`;

exports.getAllPermissions = (db) => {
	return db.query(`
		${selectAll}
	`);
};

exports.getPermissionByName = (db, name) => {
	return db.query(`
		${selectAll}
		WHERE
			permissions.name = $1
	`, [name]);
};
