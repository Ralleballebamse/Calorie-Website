const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes.cjs");
const weightRoutes = require("./routes/weightRoutes.cjs");
const dashboardRoutes = require("./routes/dashboardRoutes.cjs");
const goalRoutes = require("./routes/goalRoutes.cjs");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/weights", weightRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/goals", goalRoutes);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB error:", err));