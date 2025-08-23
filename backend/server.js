const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());
// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));
// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/contact', require('./routes/contact'));



// React frontend serve karna
if (process.env.NODE_ENV === "production"){
app.use(express.static(path.join(__dirname, "..", "frontend" , "build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "frontend", "build", "index.html"));
});
} 


// Start Server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});