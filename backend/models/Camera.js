const mongoose = require("mongoose");

const cameraSchema = new mongoose.Schema(
  {
    cameraId: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["online", "offline", "maintenance"],
      default: "online",
    },

    streamUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Camera", cameraSchema);