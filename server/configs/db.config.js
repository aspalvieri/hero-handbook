// Database connections
const { Pool } = require("pg");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;

const pool = new Pool({
	user: DB_USER,
	password: DB_PASSWORD,
	host: DB_HOST,
	port: DB_PORT,
	database: DB_DATABASE,
});

pool.connect().then(() => {
	console.log("Database connection established.");
}).catch(e => {
	throw new Error(e);
});

module.exports = pool;
