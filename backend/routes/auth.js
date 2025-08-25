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

// TEMP: force-promote & reset password for admin user
router.post("/force-admin", async (req, res) => {
  try {
    const { username, password } = req.body; // e.g., admin / Admin@123
    if (!username || !password) {
      return res.status(400).json({ message: "username & password required" });
    }

    const bcrypt = require("bcryptjs");
    let user = await User.findOne({ username });

    if (!user) {
      // create fresh admin
      const hash = await bcrypt.hash(password, 10);
      user = await User.create({ username, password: hash, isAdmin: true });
      return res.json({ ok: true, created: true, id: user._id });
    }

    // promote existing + reset password
    const hash = await bcrypt.hash(password, 10);
    await User.updateOne(
      { _id: user._id },
      { $set: { isAdmin: true, password: hash } }
    );
    return res.json({ ok: true, promoted: true, id: user._id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
