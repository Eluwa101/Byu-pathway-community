// routes/submissionRoutes.js
import express from 'express';
import { submitForm, showSubmissions } from '../controllers/submissionController.js';

const router = express.Router();

function isAdmin(req, res, next) {
  if (req.session?.isAdmin) {
    next();
  } else {
    res.redirect('/admin');
  }
}

router.post('/submit', submitForm);
router.get('/submissions', isAdmin, showSubmissions);

export default router;
