const express   = require('express');
const router    = express.Router();
const { Users } = require('../models');
const bcrypt    = require("bcrypt");
const { sign }        = require("jsonwebtoken");

// Create a new post
router.post("/", async (req, res) => {
    const { username, password } = req.body;
    try {
        const hash = await bcrypt.hash(password, 9);
        await Users.create({
            username: username,
            password: hash,
        });
        res.json("Success");
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//Login route
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Users.findOne({ where: { username: username }});

        if (!user) {
            return res.json({ error: "User does not exist!" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.json({ error: "Wrong password" });
        }

        const accessToken = sign({
            username: user.username,
            id      : user.id
        }, "importantsecret");

        res.json(accessToken);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
