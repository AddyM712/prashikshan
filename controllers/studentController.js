const Student = require("../models/student");
const Application = require("../models/application");

exports.getProfile = async (req, res) => {
  const student = await Student.findById(req.student.id).select("-password");
  res.json(student);
};

exports.getApplications = async (req, res) => {
  const apps = await Application.find({ student: req.student.id }).populate("project");
  res.json(apps);
};