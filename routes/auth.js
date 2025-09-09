require('dotenv').config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
    console.error("❌ SECRET_KEY is not set in .env file!");
    // Optionally, you can exit the process:
    // process.exit(1);
}

// Signup
router.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
        if (row) return res.status(400).json({ message: "Email already exists" });

        const hashed = bcrypt.hashSync(password, 10);
        db.run(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashed],
            function (err) {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ id: this.lastID, name, email });
            }
        );
    });
});

// Login
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        if (!bcrypt.compareSync(password, user.password))
            return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "8h" });
        res.json({ token });
    });
});

module.exports = router;
