const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getProfile, getApplications } = require("../controllers/studentController");

router.get("/profile", auth, getProfile);
router.get("/applications", auth, getApplications);

module.exports = router;