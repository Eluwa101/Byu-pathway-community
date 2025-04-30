const sqlite3 = require('sqlite3').verbose();

// Open or create a database file
const db = new sqlite3.Database('./submissions.db');

// Create the submissions table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      location TEXT,
      question TEXT
    )
  `);
});

module.exports = db;
