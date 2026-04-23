const Guide = require("../models/guide");
const Application = require("../models/application");
const Project = require("../models/project");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.guideLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const guide = await Guide.findOne({ email });
    if (!guide) return res.status(400).json({ message: "Invalid credentials" });
    const match = await bcrypt.compare(password, guide.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { id: guide._id, email: guide.email, fullName: guide.fullName, role: "guide" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({ token, guide: { fullName: guide.fullName, email: guide.email } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const totalApplications = await Application.countDocuments();
    const pendingApplications = await Application.countDocuments({ status: "Applied" });
    const shortlisted = await Application.countDocuments({ status: "Shortlisted" });
    const rejected = await Application.countDocuments({ status: "Rejected" });
    const totalProjects = await Project.countDocuments();
    res.json({ totalApplications, pendingApplications, shortlisted, rejected, totalProjects });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId, status } = req.body;
    if (!["Applied", "Shortlisted", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const app = await Application.findByIdAndUpdate(applicationId, { status }, { new: true });
    if (!app) return res.status(404).json({ message: "Application not found" });
    res.json({ message: "Status updated", application: app });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllApplications = async (req, res) => {
  try {
    const apps = await Application.find()
      .populate("student", "-password")
      .populate("project");
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
