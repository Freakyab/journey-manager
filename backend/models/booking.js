const mongoose = require("mongoose");
const client = require("../config");

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    travelers: {
      type: Number,
      required: true,
    },
    specialRequest: {
      type: String,
      required: false,
    },
    date: {
      type: String,
      required: true,
    },
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = client.model("Booking", bookingSchema);

module.exports = Booking;
