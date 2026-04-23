const Announcement = require("../models/announcement");

exports.getAnnouncements = async (req, res) => {
  const anns = await Announcement.find().sort({ pinned: -1, createdAt: -1 }).populate("guide", "fullName");
  res.json(anns);
};

exports.createAnnouncement = async (req, res) => {
  const { type, title, body, allStudents, audience, pinned } = req.body;
  const ann = new Announcement({ guide: req.guide?.id || req.student?.id, type, title, body, allStudents, audience: audience || [], pinned });
  await ann.save();
  res.status(201).json(ann);
};

exports.deleteAnnouncement = async (req, res) => {
  await Announcement.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
