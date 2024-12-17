const express = require("express");
const Package = require("../models/packages");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const fetchAllPackages = await Package.find();
    res.json({
      packages: fetchAllPackages,
      success: true,
      message: fetchAllPackages.length ? "Packages found" : "No packages found",
    });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
});

router.get("/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ message: "Package id is required", success: false });
    }
    const fetchPackage = await Package.findById(req.params.id);

    res.json({
      packages: fetchPackage,
      success: true,
      message: fetchPackage ? "Package found" : "No package found",
    });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
});

module.exports = router;
