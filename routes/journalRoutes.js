const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getEntries, createEntry, deleteEntry } = require("../controllers/journalController");
router.get("/", auth, getEntries);
router.post("/", auth, createEntry);
router.delete("/:id", auth, deleteEntry);
module.exports = router;
