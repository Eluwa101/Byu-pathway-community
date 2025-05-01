// models/submissionModel.js
import db from '../database/index.js';

export const createSubmission = (name, email, location, question) => {
  return new Promise((resolve, reject) => {
    const stmt = `INSERT INTO submissions (name, email, location, question) VALUES (?, ?, ?, ?)`;
    db.run(stmt, [name, email, location, question], function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID });
    });
  });
};

export const getAllSubmissions = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM submissions ORDER BY id DESC`, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};
