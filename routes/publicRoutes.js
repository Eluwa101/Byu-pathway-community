import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

router.get('/form', (req, res) => {
  res.sendFile('form.html', { root: 'public' });
});

router.get('/faq', (req, res) => {
  res.sendFile('faq.html', { root: 'public' });
});

router.get('/resources', (req, res) => {
  res.sendFile('resources.html', { root: 'public' });
});

router.get('/jobs', (req, res) => {
  res.sendFile('jobs.html', { root: 'public' });
});

router.get('/contact', (req, res) => {
  res.sendFile('contact.html', { root: 'public' });
});

export default router;
