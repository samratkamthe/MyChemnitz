// models/TouristCollection.js
const mongoose = require("mongoose");


const FeatureSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["Feature"],
  },
  properties: {
    
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  id: String, 
});

// Main FeatureCollection schema
const TouristspotSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["FeatureCollection"],
  },
  generator: String,
  copyright: String,
  timestamp: String,
  features: {
    type: [FeatureSchema],
    required: true,
  },
});

module.exports = mongoose.model(
  "touristspot",
  TouristspotSchema
);
