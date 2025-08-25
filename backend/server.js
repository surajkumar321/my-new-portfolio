const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ["https://frontend-rt64.onrender.com"], // ✅ sirf apna frontend allow
  credentials: true,
}));
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/contact', require('./routes/contact'));

// Test route
app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "backend", time: new Date().toISOString() });
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
