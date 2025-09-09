const sqlite3 = require("sqlite3").verbose();

// const db = new sqlite3.Database("./notes_app.db", (err) => {
//   if (err) console.error("DB connection error:", err.message);
//   else console.log("✅ Connected to SQLite database.");
// });

// In-memory DB (fresh every restart)
const db = new sqlite3.Database(":memory:", (err) => {
  if (err) console.error("❌ DB error:", err.message);
  else console.log("✅ In-memory SQLite running.");
});

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      content TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);
});

module.exports = db;
