const express = require('express');
const path = require('path');
const db = require('./database'); // <-- Import our database setup

const app = express();
const port = 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to BYU-Pathway Community Server with Database 📦');
});

app.post('/submit', (req, res) => {
  const { name, email, location, question } = req.body;

  const stmt = db.prepare('INSERT INTO submissions (name, email, location, question) VALUES (?, ?, ?, ?)');
  stmt.run(name, email, location, question, function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error saving to database.');
    } else {
      res.send('✅ Your submission has been saved to the database!');
    }
  });
  stmt.finalize();
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
