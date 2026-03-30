const mongoose = require("mongoose");

const signalSchema = new mongoose.Schema(
  {
    junction: {
      type: String,
      required: true,
    },

    mode: {
      type: String,
      enum: ["AI", "Manual"],
      default: "AI",
    },

    cycleTime: {
      type: Number,
      default: 60,
    },

    status: {
      type: String,
      enum: ["optimal", "busy", "offline"],
      default: "optimal",
    },

    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Signal", signalSchema);