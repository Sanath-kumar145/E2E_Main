const Event = require("../models/Event");

// Get events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new event
exports.createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);

    const createdEvent = await event.save();

    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};