// - POST /admin/packages: Add a new package.
//  - PUT /admin/packages/:id: Update an existing package.
//  - DELETE /admin/packages/:id: Delete a package.

const express = require("express");
const router = express.Router();
const Package = require("../models/packages");

// Add a new package
router.post("/add", async (req, res) => {
  try {
    const { title, description, price, image, location, availableDates } =
      req.body;

    if (
      !title ||
      !description ||
      !price ||
      !image ||
      !location ||
      !availableDates
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const package = new Package({
      title,
      description,
      price,
      image,
      location,
      availableDates,
    });

    await package.save();

    if (package) {
      return res.status(201).json({
        success: true,
        message: "Package added successfully",
      });
    }
    return res.status(500).json({
      success: false,
      error: "Failed to add package",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

// Update an existing package 
router.put("/update/:id", async (req, res) => {
  try {
    const { title, description, price, image, location, availableDates } =
      req.body;
    if (
      !title ||
      !description ||
      !price ||
      !image ||
      !location ||
      !availableDates
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const package = await Package.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        price,
        image,
        location,
        availableDates,
      },
      { new: true }
    );

    if (package) {
      return res.status(200).json({
        success: true,
        message: "Package updated successfully",
      });
    }
    return res.status(404).json({
      success: false,
      error: "Package not found",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

// Delete a package
router.delete("/delete/:id", async (req, res) => {
  try {
    const packageId = req.params.id;
    if (!packageId) {
      return res.status(400).json({
        success: false,
        message: "Package ID is required",
      });
    }

    const package = await Package.findOneAndDelete({ _id: packageId });

    if (package) {
      return res.status(200).json({
        success: true,
        message: "Package deleted successfully",
      });
    }

    return res.status(404).json({
      success: false,
      error: "Package not found",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});


module.exports = router;