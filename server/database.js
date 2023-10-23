require("dotenv").config();
const Pool = require("pg").Pool;

const pool = new Pool({
    user: "chefas",
    host: '194.31.55.150',
    database: "bs",
    password: process.env.db_pass,
    port: 5432,
});

module.exports = pool;