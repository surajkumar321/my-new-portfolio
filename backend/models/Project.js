const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  github: String,
  demo: String,
  image: String // ✅ Cloudinary URL save hoga
});

module.exports = mongoose.model("Project", projectSchema);
