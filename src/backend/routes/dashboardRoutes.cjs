const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.cjs");
const { getDashboardData } = require("../controllers/dashboardController.cjs");

const router = express.Router();

router.get("/", authMiddleware, getDashboardData);

module.exports = router;