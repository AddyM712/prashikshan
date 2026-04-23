const mongoose = require("mongoose");
const announcementSchema = new mongoose.Schema({
  guide: { type: mongoose.Schema.Types.ObjectId, ref: "Guide", required: true },
  type: { type: String, enum: ["info","warning","deadline","success","event"], default: "info" },
  title: { type: String, required: true },
  body: { type: String, required: true },
  audience: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  allStudents: { type: Boolean, default: true },
  pinned: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Announcement", announcementSchema);
