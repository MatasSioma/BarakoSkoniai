const router = require("express").Router();
const db = require("../database");
const authorization = require('../middleware/authorization');

router.get("/Users", authorization, async (req, res) => {
    try{
        const user = await db.one("SELECT username FROM users WHERE id = $1", [req.user]);
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

module.exports = router;