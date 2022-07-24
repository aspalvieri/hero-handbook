// reset your database
require("dotenv").config();
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const SCHEMA_PATH = "./db/schemas";
const SEEDS_PATH = "./db/seeds";

const fs = require("fs").promises;
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;

const pool = new Pool({
	user: DB_USER,
  password: DB_PASSWORD,
	host: DB_HOST,
	port: DB_PORT,
	database: DB_DATABASE,
});

const runMigrations = async db => {
	const migrations = await fs.readdir(SCHEMA_PATH);
	for (let migration of migrations) {
		const sql = await fs.readFile(`${SCHEMA_PATH}/${migration}`, "utf8");
		console.log(`\t Running ${migration}`);
		await db.query(sql);
	}
};

const runSeeds = async db => {
	const seeds = await fs.readdir(SEEDS_PATH);
	for (let seed of seeds) {
		const sql = await fs.readFile(`${SEEDS_PATH}/${seed}`, "utf8");
		console.log(`\t Running ${seed}`);
		await db.query(sql);
	}
};

const hashPasswords = async db => {
  const users = await db.query("SELECT * FROM users");
  for (let user of users.rows) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    console.log(`\t Updating ${user.email}`);
    await db.query(`UPDATE users SET password='${hash}' WHERE id=${user.id}`);
  }
};

const resetDB = async () => {
	try {
		console.log("Running DB Reset...");
		console.log("Establishing DB connection: ");
		const client = await pool.connect();
		console.log("connection established!\n");
		console.log("-- Running Migrations --\n");
		await runMigrations(client);
		console.log("\n");
		console.log("-- Running Seeds --\n");
		await runSeeds(client);
		console.log("\n");
    console.log("-- Hashing User Passwords --\n");
    await hashPasswords(client);
    console.log("\n");
		console.log("-- COMPLETED --");
		client.release();
    pool.end();
	} catch (e) {
		console.log("ERROR OCCURED:\n", e);
		pool.end();
	}
};

resetDB();