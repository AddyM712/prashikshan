const mongoose = require("mongoose");

const guideSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: { type: String },
  expertise: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Guide", guideSchema);
