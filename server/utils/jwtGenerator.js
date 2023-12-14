const jwt = require("jsonwebtoken");
require("dotenv").config();


function jwtGenerator(id, username) {
    const payload = {
        user: id,
        nick: username
    };

    return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" });
}

module.exports = jwtGenerator;
