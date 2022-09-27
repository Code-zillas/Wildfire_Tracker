const mongoose = require('mongoose')

const markerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
      min: 3,
      max: 60,
    },
    desc: {
      type: String,
      required: true,
      min: 3,
    },
    power: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Marker', markerSchema)
