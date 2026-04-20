// backend/server.js

// ── Fix DNS resolution on Render (must come before everything else) ──
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); // Force Google DNS so Render can find MongoDB Atlas

require('dotenv').config(); // Load .env variables

const express    = require('express');
const cors       = require('cors');
const path       = require('path');
const connectDB  = require('./config/db');

// ── Routes ────────────────────────────────────────────────────
const authRoutes    = require('./routes/auth.routes');
const postRoutes    = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const adminRoutes   = require('./routes/admin.routes');

const app = express();

connectDB(); // Connect to MongoDB

// ── Middleware ─────────────────────────────────────────────────
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://thefolio.vercel.app',
    'https://thefolio-rouge.vercel.app',  // no trailing slash
  ],
  credentials: true,
}));

app.use(express.json());

// Serve uploaded images as public static files
// e.g. http://localhost:5000/uploads/my-image.jpg
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── API Routes ────────────────────────────────────────────────
app.use('/api/auth',     authRoutes);
app.use('/api/posts',    postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/admin',    adminRoutes);

// ── Start Server ──────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});