const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getAnnouncements, createAnnouncement, deleteAnnouncement } = require("../controllers/announcementController");
router.get("/", getAnnouncements);
router.post("/", auth, createAnnouncement);
router.delete("/:id", auth, deleteAnnouncement);
module.exports = router;
