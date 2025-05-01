import express from 'express';
const router = express.Router();

const adminPassword = 'byu123'; // Replace with something secure later

// Admin login form
router.get('/', (req, res) => {
  res.send(`
    <h2>Admin Login</h2>
    <form method="POST" action="/admin/login">
      <input type="password" name="password" placeholder="Enter admin password" required />
      <button type="submit">Login</button>
    </form>
  `);
});

// Handle login
router.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === adminPassword) {
    req.session.isAdmin = true;
    res.redirect('/submissions');
  } else {
    res.send('❌ Incorrect password. <a href="/admin">Try again</a>.');
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

export default router;
