const express = require("express");
const router = express.Router();

const {
  getTrafficReport,
  getViolationReport
} = require("../controllers/reportController");

router.get("/traffic", getTrafficReport);
router.get("/violations", getViolationReport);

module.exports = router;