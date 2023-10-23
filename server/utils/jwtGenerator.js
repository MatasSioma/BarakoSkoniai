const jwt = require("jsonwebtoken");
require("dotenv").config();


function jwtGenerator(username) {
    const payload = {
        user: username
    };

    return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" });
}

module.exports = jwtGenerator;
