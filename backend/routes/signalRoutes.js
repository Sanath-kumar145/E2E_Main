const express = require("express");
const router = express.Router();

const {
  getSignals,
  updateSignal
} = require("../controllers/signalController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", getSignals);

// Protected route
router.put("/:id", protect, updateSignal);

module.exports = router;