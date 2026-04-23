const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  status: { type: String, enum: ["Applied", "Shortlisted", "Rejected"], default: "Applied" },
  appliedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Application", applicationSchema);