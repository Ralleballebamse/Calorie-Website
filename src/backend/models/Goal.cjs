const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        startWeight: {
            type: Number,
            required: true,
            min: 30,
            max: 300,
        },

        targetWeight: {
            type: Number,
            required: true,
            min: 30,
            max: 300,
        },

        targetDate: {
            type: Date,
            required: true,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

goalSchema.index({ userId: 1, isActive: 1 });

module.exports = mongoose.model("Goal", goalSchema);