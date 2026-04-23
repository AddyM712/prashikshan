const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");        // ← LINE ADDED

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));   // ← LINE CHANGED

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

// Serve frontend for all other routes   // ← LINE ADDED
app.get("*", (req, res) => {             // ← LINE ADDED
  res.sendFile(path.join(__dirname, "public", "index.html"));  // ← LINE ADDED
});                                      // ← LINE ADDED

// For local dev only                   // ← LINE CHANGED (was app.listen directly)
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
}
module.exports = app;                   // ← LINE ADDED