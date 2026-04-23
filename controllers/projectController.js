const Project = require("../models/project");
const Application = require("../models/application");

exports.getProjects = async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
};

exports.applyProject = async (req, res) => {
  try {
    const { projectId } = req.body;
    const studentId = req.student.id;

    const already = await Application.findOne({ student: studentId, project: projectId });
    if (already) return res.status(400).json({ message: "Already applied" });

    const app = new Application({ student: studentId, project: projectId });
    await app.save();

    res.status(201).json({ message: "Application submitted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};