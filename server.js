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

const adminPassword = 'byu123'; // Change this to something secure

app.get('/admin', (req, res) => {
  res.send(`
    <form method="POST" action="/admin-login">
      <h2>Admin Login</h2>
      <input type="password" name="password" placeholder="Enter admin password" required />
      <button type="submit">Login</button>
    </form>
  `);
});

app.post('/admin-login', (req, res) => {
  const { password } = req.body;
  if (password === adminPassword) {
    req.session = { isAdmin: true }; // Fake session for now
    res.redirect('/submissions');
  } else {
    res.send('❌ Incorrect password. <a href="/admin">Try again</a>.');
  }
});

// Protect the submissions page
app.get('/submissions', (req, res, next) => {
  if (req.session && req.session.isAdmin) {
    next();
  } else {
    res.redirect('/admin');
  }
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
  
  // Temporary in-memory session mock
app.use((req, res, next) => {
    if (!req.session) req.session = {};
    next();
  });
  


// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
