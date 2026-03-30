const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectDB = require("../config/db");

const Signal = require("../models/Signal");
const Camera = require("../models/Camera");
const Event = require("../models/Event");

dotenv.config();

connectDB();

const seedData = async () => {

  try {

    await Signal.deleteMany();
    await Camera.deleteMany();
    await Event.deleteMany();

    await Signal.insertMany([
      { junction: "Vyttila Hub", mode: "AI", cycleTime: 60, status: "busy" },
      { junction: "MG Road", mode: "Manual", cycleTime: 70, status: "optimal" },
      { junction: "Edappally Junction", mode: "AI", cycleTime: 80, status: "busy" }
    ]);

    await Camera.insertMany([
      { cameraId: "CAM001", location: "Vyttila Hub", status: "online" },
      { cameraId: "CAM002", location: "MG Road", status: "online" },
      { cameraId: "CAM003", location: "Edappally", status: "offline" }
    ]);

    await Event.insertMany([
      {
        type: "violation",
        category: "overspeed",
        severity: "high",
        location: "MG Road"
      },
      {
        type: "incident",
        category: "accident",
        severity: "critical",
        location: "Vyttila Hub"
      }
    ]);

    console.log("Database seeded successfully");

    process.exit();

  } catch (error) {

    console.error(error);

    process.exit(1);

  }
};

seedData();