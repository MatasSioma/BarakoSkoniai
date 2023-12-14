const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
    try {
        const jwtToken = req.header("token");

        if (!jwtToken) {
            return res.status(403).json("Not authorized");
        }

        try {
            // Verify the token, even if it's expired
            const payload = jwt.verify(jwtToken, process.env.jwtSecret, { ignoreExpiration: true });
            req.user = payload.user;
            next();
        } catch (err) {
            console.error(err.message);
            return res.status(403).json("Token is not valid");
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json("Server Error");
    }
};
