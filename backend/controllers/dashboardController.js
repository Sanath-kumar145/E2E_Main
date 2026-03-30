const Signal = require("../models/Signal");
const Event = require("../models/Event");
const Camera = require("../models/Camera");

exports.getDashboardStats = async (req, res) => {
  try {
    const signals = await Signal.countDocuments();
    const cameras = await Camera.countDocuments();
    const events = await Event.countDocuments();

    res.json({
      totalSignals: signals,
      totalCameras: cameras,
      totalEvents: events,
      vehiclesToday: 1200
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};