const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.cjs");

const {
    createWeightEntry,
    getWeightDashboard,
} = require("../controllers/weightController.cjs");

const router = express.Router();

router.post("/", authMiddleware, createWeightEntry);
router.get("/dashboard", authMiddleware, getWeightDashboard);

module.exports = router;