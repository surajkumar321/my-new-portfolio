// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ✅ Only admin login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    // Sirf admin login kar paaye
    const user = await User.findOne({ username, isAdmin: true });
    if (!user) return res.status(403).json({ message: "Admin access only" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user: { name: user.username, isAdmin: user.isAdmin } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ One-time route to create admin (delete later)
router.post("/seed-admin", async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username });
    if (user) return res.json({ message: "Admin already exists" });

    const hash = await bcrypt.hash(password, 10);
    user = await User.create({ username, password: hash, isAdmin: true });
    res.json({ ok: true, id: user._id });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
