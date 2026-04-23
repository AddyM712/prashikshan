const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  domain: { type: String, required: true },
  guide: { type: String, required: true },
  duration: String,
  skills: String,
  teamSize: Number,
  deadline: String
});

module.exports = mongoose.model("Project", projectSchema);