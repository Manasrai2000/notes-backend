const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');

const userRoutes = require('./routes/user.routes');

const notesRoutes = require("./routes/notes.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);

app.use('/user', userRoutes);

app.use("/notes", notesRoutes);

module.exports = app;