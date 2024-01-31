// Query for selecting all columns (excluding password). 
// Place WHERE clause between selectAll and SelectAllGroupBy
const selectAll = `
	SELECT
		users.id,
		users.username,
		users.email,
		roles.name AS role_name,
		roles.id AS role_id,
		jsonb_agg(jsonb_build_object('id', permissions.id, 'name', permissions.name)) AS permissions
	FROM
		users
	INNER JOIN
		roles ON users.role_id = roles.id
	INNER JOIN
		role_permissions ON roles.id = role_permissions.role_id
	INNER JOIN
		permissions ON role_permissions.permission_id = permissions.id
`;
const selectAllGroupBy = `
	GROUP BY
		users.id, roles.id
`;

// Get all users
exports.getAllUsers = (db) => {
	return db.query(`
		${selectAll}
		${selectAllGroupBy}
	`);
};

// Get user by the given username or email
exports.getUserByAccount = (db, username, email) => {
	return db.query(`
		${selectAll}
		WHERE 
			users.username ILIKE $1 
		OR 
			users.email ILIKE $2
		${selectAllGroupBy}
		LIMIT 1
	`, [username, email]);
};

// Get user by the given username or email
exports.getUserById = (db, id) => {
	return db.query(`
		${selectAll}
		WHERE 
			users.id = $1
		${selectAllGroupBy}
		LIMIT 1
	`, [id]);
};

// Get the user's password by their id
exports.getUserPasswordById = (db, id) => {
	return db.query(`
		SELECT
			users.password
		FROM
			users
		WHERE
			users.id = $1
		LIMIT 1
	`, [id]);
};

// Create a new user and return it's id
exports.createNewUser = (db, username, email, passwordHash, roleId) => {
	return db.query(`
		INSERT INTO users(username, email, password, role_id) 
		VALUES($1, $2, $3, $4) 
		RETURNING id
	`, [username, email, passwordHash, roleId]);
}
