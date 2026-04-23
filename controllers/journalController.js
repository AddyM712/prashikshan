const JournalEntry = require("../models/journalEntry");

exports.getEntries = async (req, res) => {
  const entries = await JournalEntry.find({ student: req.student.id }).sort({ createdAt: -1 });
  res.json(entries);
};

exports.createEntry = async (req, res) => {
  const { text, mood, milestone, tags, sharedWithGuide } = req.body;
  const entry = new JournalEntry({ student: req.student.id, text, mood, milestone, tags, sharedWithGuide });
  await entry.save();
  res.status(201).json(entry);
};

exports.deleteEntry = async (req, res) => {
  await JournalEntry.findOneAndDelete({ _id: req.params.id, student: req.student.id });
  res.json({ message: "Deleted" });
};
