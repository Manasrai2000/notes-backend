const db = require("../database/db");

async function getProfileById(id) {
  const row = await db.getAsync(
    "SELECT id, name, email FROM users WHERE id = ?", [id]);
  return row;
}

async function updateProfileById(id, name, email) {
  const result = await db.runAsync(
    "UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, id]);
  return result.changes;
}

module.exports = { getProfileById, updateProfileById };
