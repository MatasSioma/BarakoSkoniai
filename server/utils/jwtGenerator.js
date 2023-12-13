const jwt = require("jsonwebtoken");
require("dotenv").config();


function jwtGenerator(id, username) {
    const payload = {
        user: id,
        nick: username
    };

    return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "10s" });
}

module.exports = jwtGenerator;
