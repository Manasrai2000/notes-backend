require('dotenv').config();
const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;

// Middleware to protect routes
function auth(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(403).json({ message: "No token provided" });

  // Expect format: "Bearer <token>"
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Invalid token format" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    req.userId = decoded.id;
    next();
  });
}

// Get profile
router.get("/", auth, (req, res) => {
  db.get("SELECT id, name, email, created_at FROM users WHERE id = ?", [req.userId], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(user);
  });
});

// Update profile
router.put("/", auth, (req, res) => {
  const { name, email } = req.body;
  db.run("UPDATE users SET name=?, email=? WHERE id=?", [name, email, req.userId], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Profile updated" });
  });
});

module.exports = router;
