

// routes/tourist.js
const express = require("express");
const router = express.Router();
const Touristspot=require('../models/TouristSpot');

router.get("/", async (req, res) => {
  try {
    // Assumes you have exactly one document in this collection
    const collection = await Touristspot.findOne();
    if (!collection) {
      return res
        .status(404)
        .json({ error: "No FeatureCollection found in database." });
    }
    res.json(collection);
  } catch (err) {
    console.error("Error loading FeatureCollection:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
