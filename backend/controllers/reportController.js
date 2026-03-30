const Event = require("../models/Event");

exports.getTrafficReport = async (req, res) => {
  try {
    const events = await Event.countDocuments();

    res.json({
      trafficFlow: "Normal",
      totalEvents: events,
      peakHour: "6 PM"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getViolationReport = async (req, res) => {
  try {
    const violations = await Event.countDocuments({ type: "violation" });

    res.json({
      totalViolations: violations,
      commonViolation: "Overspeed"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};