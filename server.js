const express = require('express');
const path = require('path');
const db = require('./database'); // <-- Import our database setup
const sqlite3 = require('sqlite3').verbose();

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

app.get('/submissions', (req, res) => {
    db.all('SELECT * FROM submissions ORDER BY id DESC', [], (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Error retrieving submissions.');
      } else {
        let html = `
          <h1>📝 Student Submissions</h1>
          <table border="1" cellpadding="10" cellspacing="0">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Location</th>
              <th>Question</th>
            </tr>
        `;
  
        rows.forEach(row => {
          html += `
            <tr>
              <td>${row.name}</td>
              <td>${row.email}</td>
              <td>${row.location || 'Unknown'}</td>
              <td>${row.question}</td>
            </tr>
          `;
        });
  
        html += '</table>';
        res.send(html);
      }
    });
  });
  


// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
