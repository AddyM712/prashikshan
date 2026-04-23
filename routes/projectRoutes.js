const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getProjects, applyProject } = require("../controllers/projectController");

router.get("/", getProjects);              // public — anyone can browse
router.post("/apply", auth, applyProject); // protected — must be logged in

module.exports = router;