const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.cjs");

const {
    createWeightEntry,
    getWeightDashboard,
    updateWeightEntry,
    deleteWeightEntry,
} = require("../controllers/weightController.cjs");

const router = express.Router();

router.post("/", authMiddleware, createWeightEntry);
router.get("/dashboard", authMiddleware, getWeightDashboard);
router.patch("/:id", authMiddleware, updateWeightEntry);
router.delete("/:id", authMiddleware, deleteWeightEntry);

module.exports = router;