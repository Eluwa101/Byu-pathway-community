// server.js
import express from 'express';
import path from 'path';
import session from 'express-session';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Load environment variables
dotenv.config();

// Route Imports
import publicRoutes from './routes/publicRoutes.js';
import submissionRoutes from './routes/submissionRoutes.js';
import adminRoutes from './routes/adminroutes.js';
import contentRoutes from './routes/contentRoutes.js';

// Setup app and directory
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET || 'byu_secret',
  resave: false,
  saveUninitialized: false
}));

// Routes
app.use('/', publicRoutes);
app.use('/submit', submissionRoutes);
app.use('/admin', adminRoutes);
app.use('/content', contentRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
