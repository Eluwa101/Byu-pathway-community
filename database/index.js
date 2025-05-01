// /database/index.js
import sqlite3 from 'sqlite3';
sqlite3.verbose();

const db = new sqlite3.Database('./data/database.db', (err) => {
  if (err) {
    console.error('❌ Failed to connect to the database:', err.message);
  } else {
    console.log('✅ Connected to the SQLite database.');
  }
});

export default db;
