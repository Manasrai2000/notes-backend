const db = require("../database/db");

async function getAllNotes(userId) {
  return await db.allAsync("SELECT * FROM notes WHERE user_id = ?", [userId]);
}

async function addNote(userId, title, content) {
  const result = await db.runAsync(
    "INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)",
    [userId, title, content]
  );
  return { id: result.lastID, title, content };
}

async function updateNote(userId, noteId, title, content) {
  const result = await db.runAsync(
    "UPDATE notes SET title=?, content=?, updated_at=CURRENT_TIMESTAMP WHERE id=? AND user_id=?",
    [title, content, noteId, userId]
  );
  return result.changes;
}

async function deleteNote(userId, noteId) {
  const result = await db.runAsync(
    "DELETE FROM notes WHERE id=? AND user_id=?",
    [noteId, userId]
  );
  return result.changes;
}

module.exports = { getAllNotes, addNote, updateNote, deleteNote };
