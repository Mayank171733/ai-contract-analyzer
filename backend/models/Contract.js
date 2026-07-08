const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    filepath: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    extractedText: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "uploaded",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Contract",
  contractSchema
);