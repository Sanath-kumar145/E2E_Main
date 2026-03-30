const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const signalRoutes = require("./routes/signalRoutes");
const cameraRoutes = require("./routes/cameraRoutes");
const eventRoutes = require("./routes/eventRoutes");
const reportRoutes = require("./routes/reportRoutes");

// Middleware
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

// Connect Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Base route
app.get("/", (req, res) => {
  res.send("Smart Traffic Management Backend Running");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/signals", signalRoutes);
app.use("/api/cameras", cameraRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/reports", reportRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});