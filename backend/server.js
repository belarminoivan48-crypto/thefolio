// backend/server.js
require('dotenv').config();

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

// ── Global Middleware ──────────────────────────────────────────
app.use(cors({
  origin: function (origin, callback) {
    if (
      !origin ||                                  // allow server-to-server / Postman
      origin === 'http://localhost:3000' ||
      origin === 'http://localhost:3001' ||
      /\.vercel\.app$/.test(origin)               // accept ALL *.vercel.app domains
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

// Serve uploaded images as public static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── API Routes ────────────────────────────────────────────────
app.use('/api/auth',     authRoutes);
app.use('/api/posts',    postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/admin',    adminRoutes);

// ── Health Check ──────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'ChessRealm API is running ♔' });
});

// ── Start Server ──────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});