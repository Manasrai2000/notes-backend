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


// Get all notes
router.get("/", auth, (req, res) => {
  db.all("SELECT * FROM notes WHERE user_id = ?", [req.userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add new note
router.post("/", auth, (req, res) => {
  const { title, content } = req.body;
  db.run(
    "INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)",
    [req.userId, title, content],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, title, content });
    }
  );
});

// Update note
router.put("/:id", auth, (req, res) => {
  const { title, content } = req.body;
  db.run(
    "UPDATE notes SET title=?, content=?, updated_at=CURRENT_TIMESTAMP WHERE id=? AND user_id=?",
    [title, content, req.params.id, req.userId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Note updated" });
    }
  );
});

// Delete note
router.delete("/:id", auth, (req, res) => {
  db.run(
    "DELETE FROM notes WHERE id=? AND user_id=?",
    [req.params.id, req.userId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Note deleted" });
    }
  );
});

module.exports = router;
