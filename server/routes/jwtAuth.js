const express = require("express");
const router = express.Router();
const db = require("../database");
const crypto = require("crypto");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validinfo");
const authorization = require("../middleware/authorization"); 

//registering

router.post("/register", validInfo, async (req, res) => {
    const { username, password, email } = req.body;

    try{

        //1. destructure the req.body (name, email, password)
        

        //2. check if user exists (if user exists then throw error)

        const user = await db.oneOrNone("SELECT * FROM users WHERE email = $1", [
            email
        ]);

        if (user) { // Check if user is truthy (not null)
            return res.status(401).json("User already exists");
        }

        //3. SHA256 the user password

        const sha256Password = crypto.createHash("sha256").update(password).digest("hex");

        //4. enter the new user inside our database

        let newUser = await db.one("INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *", [username, sha256Password, email]);

        //5. generating our jwt token

        const token = jwtGenerator(newUser.id);

        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//login route

router.post("/login", validInfo, async (req, res) => {
    const { password, email } = req.body;

    try {
        //2. check if user doesn't exist (if not then we throw error)

        const user = await db.oneOrNone("SELECT * FROM users WHERE email = $1", [email]);

        if(!user) {
            return res.status(401).json("Password or Email is Incorrect");
        }
        // Hash the provided password with SHA-256
        const sha256Password = crypto.createHash("sha256").update(password).digest("hex");

        // Check if the hashed password matches the database password
        if (sha256Password === user.password) {
            // Generate the JWT token
            const token = jwtGenerator(user.id);
            res.json({ token });
        } else {
            res.status(401).json("Password or Email is incorrect");
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.get("/home", authorization, async (req,res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;
