const express = require("express");
const router = express.Router();
const db = require("../database");
const crypto = require("crypto");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validinfo");
const authorization = require("../middleware/authorization"); 

//registering

router.post("/register", validInfo, async (req, res) => {
    try {
        // 1. Destructure the req.body (name, email, password)
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json("Please provide a username, password, and email");
        }

        // 2. Check if user exists (if user exists then throw an error)
        const user = await db.oneOrNone("SELECT * FROM users WHERE email = $1", [email]);

        if (user) { // Check if user is truthy (not null)
            return res.status(401).json("User already exists");
        }

        // 3. SHA256 the user password
        const sha256Password = crypto.createHash("sha256").update(password).digest("hex");

        // 4. Enter the new user inside our database
        let newUser = await db.one("INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *", [username, sha256Password, email]);

        // 5. Redirect the user to the login page (no need to generate a new token)
        res.json({ message: "Registration successful." });

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
            console.log(user.id);
            await db.none("UPDATE users SET is_online = true WHERE id = $1", [user.id])
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

router.post("/logout", authorization, async (req, res) => {
    try {
        console.log("User ID to logout:", req.user);
        await db.none("UPDATE users SET is_online = false WHERE id = $1", [req.user]);
        res.json({ message: "Logout successful" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
