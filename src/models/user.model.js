const db = require("../database/db");

async function findUserByEmail(email) {
  const row = await db.getAsync(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return row;
}

async function createUser(name, email, hashedPassword) {
  const result = await db.runAsync(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword]
  );
  return result.lastID;
}

module.exports = { findUserByEmail, createUser };
