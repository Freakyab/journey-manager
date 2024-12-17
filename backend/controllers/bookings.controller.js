const express = require("express");
const Booking = require("../models/booking");
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { name, email, phone, packageId, date, travelers } = req.body;
    console.log(req.body);
    if (!name || !email || !phone || !packageId || !date || !travelers) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const newBooking = new Booking({
      name,
      travelers,
      email,
      phone,
      packageId,
      date,
    });
    await newBooking.save();
    res.json({
      data: newBooking,
      success: true,
      message: "Booking created successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
});

router.get("/", async (req, res) => {
  try {
    const fetchAllBookings = await Booking.find();
    res.json({
      bookings: fetchAllBookings,
      success: true,
      message: fetchAllBookings.length ? "Bookings found" : "No bookings found",
    });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
});

module.exports = router;
