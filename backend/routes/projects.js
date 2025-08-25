// backend/routes/projects.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const Project = require("../models/Project");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadToCloudinary = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "portfolio_projects" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
};

// ✅ Public: Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ projects });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Admin: Add project
router.post("/", protect, adminOnly, upload.single("image"), async (req, res) => {
  try {
    let imageUrl = "";
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer);
    }
    const project = new Project({ ...req.body, image: imageUrl });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Admin: Update
router.put("/:id", protect, adminOnly, upload.single("image"), async (req, res) => {
  try {
    let updateData = { ...req.body };
    if (req.file) {
      updateData.image = await uploadToCloudinary(req.file.buffer);
    }
    const project = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!project) return res.status(404).json({ message: "Not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Admin: Delete
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
