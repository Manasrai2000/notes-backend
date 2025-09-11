const express = require('express');
const { getNotes, addNote, updateNote, deleteNote } = require('../controllers/notes.controller');
const auth = require("../middleware/auth.middleware")

const router = express.Router();

router.get('/', auth, getNotes);
router.post('/', auth, addNote);
router.put('/:id', auth, updateNote);
router.delete('/:id', auth, deleteNote);

module.exports = router;