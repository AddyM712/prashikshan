const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Project = require("./models/project");

const projects = [
  { title: "AI Resume Analyzer", domain: "AI", guide: "Dr. Sharma", duration: "4 Weeks", skills: "Python, ML, NLP", teamSize: 2, deadline: "30 May 2026", description: "Build an AI tool that analyzes resumes and suggests improvements." },
  { title: "Portfolio Website Builder", domain: "Web", guide: "Prof. Mehta", duration: "3 Weeks", skills: "HTML, CSS, JavaScript", teamSize: 1, deadline: "15 May 2026", description: "Develop a tool that generates professional portfolio websites." },
  { title: "Student Performance Predictor", domain: "Data", guide: "Dr. Patel", duration: "5 Weeks", skills: "Python, Data Analysis, ML", teamSize: 2, deadline: "5 June 2026", description: "Use ML to predict student performance trends." },
  { title: "Cyber Security Threat Detector", domain: "AI", guide: "Dr. Rao", duration: "6 Weeks", skills: "Python, Security, AI", teamSize: 3, deadline: "20 June 2026", description: "Create an AI model that detects suspicious network activity." }
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Project.deleteMany();
  await Project.insertMany(projects);
  console.log("Projects seeded!");
  process.exit();
});