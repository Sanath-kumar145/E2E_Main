const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["violation", "incident"],
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    severity: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "low",
    },

    camera: {
      type: String,
    },

    location: {
      type: String,
      required: true,
    },

    plateNumber: {
      type: String,
    },

    status: {
      type: String,
      enum: ["open", "investigating", "resolved"],
      default: "open",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);