const mongoose = require("mongoose");
const client = require("../config");

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    availableDates: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Package = client.model("Package", packageSchema);

module.exports = Package;
