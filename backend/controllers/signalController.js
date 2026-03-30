const Signal = require("../models/Signal");

// Get all signals
exports.getSignals = async (req, res) => {
  try {
    const signals = await Signal.find();
    res.json(signals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update signal
exports.updateSignal = async (req, res) => {
  try {
    const signal = await Signal.findById(req.params.id);

    if (!signal) {
      return res.status(404).json({ message: "Signal not found" });
    }

    signal.mode = req.body.mode || signal.mode;
    signal.cycleTime = req.body.cycleTime || signal.cycleTime;
    signal.status = req.body.status || signal.status;

    const updatedSignal = await signal.save();

    res.json(updatedSignal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};