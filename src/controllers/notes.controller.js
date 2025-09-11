const notesModel = require("../models/notes.model");

/**
 * Get all notes for the authenticated user
 */
async function getNotes(req, res) {
  try {
    const notes = await notesModel.getAllNotes(req.userId);
    return res.json(notes);
  } catch (error) {
    console.error("Get Notes error:", error.message);
    return res.status(500).json({ error: "Server error" });
  }
}

/**
 * Add a new note for the authenticated user
 */
async function addNote(req, res) {
  try {
    const { title, content } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const note = await notesModel.addNote(req.userId, title, content || "");
    return res.status(201).json(note);
  } catch (error) {
    console.error("Add Note error:", error.message);
    return res.status(500).json({ error: "Server error" });
  }
}

/**
 * Update an existing note for the authenticated user
 */
async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const { id } = req.params;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const changes = await notesModel.updateNote(req.userId, id, title, content || "");
    if (changes === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.json({ message: "Note updated" });
  } catch (error) {
    console.error("Update Note error:", error.message);
    return res.status(500).json({ error: "Server error" });
  }
}

/**
 * Delete a note for the authenticated user
 */
async function deleteNote(req, res) {
  try {
    const { id } = req.params;
    const changes = await notesModel.deleteNote(req.userId, id);

    if (changes === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.json({ message: "Note deleted" });
  } catch (error) {
    console.error("Delete Note error:", error.message);
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = { getNotes, addNote, updateNote, deleteNote };