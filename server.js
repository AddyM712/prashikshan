const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("DB Error:", err));

// Routes
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const projectRoutes = require("./routes/projectRoutes");
const guideRoutes = require("./routes/guideRoutes");
const journalRoutes = require("./routes/journalRoutes");
const announcementRoutes = require("./routes/announcementRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/guide", guideRoutes);
app.use("/api/journal", journalRoutes);
app.use("/api/announcements", announcementRoutes);

app.listen(3000, () => console.log("Server on http://localhost:3000"));