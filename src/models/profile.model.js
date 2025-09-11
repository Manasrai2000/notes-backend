const db = require('../database/db');

async function getProfileById(id) {
  return await db.getAsync(
    'SELECT id, name, email FROM users WHERE id = ?', [id]
  );
}

async function updateProfileById(id, name, email) {
  return await db.runAsync(
    'UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]
  );
}

module.exports = { getProfileById, updateProfileById };