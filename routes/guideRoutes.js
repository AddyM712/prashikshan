const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const guideCtrl = require("../controllers/guideController");

router.post("/login", guideCtrl.guideLogin);
router.get("/dashboard-stats", auth, guideCtrl.getDashboardStats);
router.get("/applications", auth, guideCtrl.getAllApplications);
router.patch("/application-status", auth, guideCtrl.updateApplicationStatus);

module.exports = router;
