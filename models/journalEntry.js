const mongoose = require("mongoose");
const journalSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  text: { type: String, required: true },
  mood: { type: String, enum: ["great","good","okay","hard","stuck"], default: "good" },
  milestone: String,
  tags: [String],
  sharedWithGuide: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("JournalEntry", journalSchema);
