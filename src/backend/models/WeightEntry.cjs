const mongoose = require("mongoose");

// Schema for storing individual weight log entries
const weightEntrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WeightEntry", weightEntrySchema);