const dotenv = require("dotenv");
const pgp = require("pg-promise")();

dotenv.config();

try {
  const db = pgp({
    user: "chefas",
    host: "194.31.55.150",
    database: "bs",
    password: process.env.db_pass,
    port: 5432,
  });

  module.exports = db;
} catch (error) {
  console.error("Error connecting to the database:", error);
}
