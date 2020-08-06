
const express = require("express");

const { login, traininglogin, logout } = require("../controller/adminController");
const {
  topAnalytics,
  internMentorTrackStats,
} = require("../controller/analytics");

const router = express.Router();

// Admin routes
router.post("/auth", login);
router.post('/traininglogin', traininglogin);
router.get("/logout", logout);
// router.post('/admin/create', newAdminValidationRules(), createAdmin);

router.get("/analytics/toplevel", topAnalytics);
// router.get("/analytics/lowerlevel/intern-mentor-status")
router.get(
  "/analytics/lowerlevel/intern-mentor-tracks",
  internMentorTrackStats
);
module.exports = router;
