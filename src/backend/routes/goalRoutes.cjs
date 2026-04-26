const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.cjs");

const {
    saveGoal,
    getActiveGoal,
    getAllGoals,
    deleteGoal,
} = require("../controllers/goalController.cjs");

const router = express.Router();

router.post("/", authMiddleware, saveGoal);
router.get("/active", authMiddleware, getActiveGoal);
router.get("/", authMiddleware, getAllGoals);
router.delete("/:id", authMiddleware, deleteGoal);

module.exports = router;