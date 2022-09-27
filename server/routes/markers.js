const router = require('express').Router()
const Marker = require('../models/markerModel')

// Create a marker

router.post('/', async (req, res) => {
  const createdMarker = new Marker(req.body)
  try {
    const savedMarker = await createdMarker.save()
    res.status(200).json(savedMarker)
  } catch (err) {
    res.status(500).json(err)
  }
})

// GET all markers

router.get('/', async (req, res) => {
  try {
    const markers = await Marker.find()
    res.status(200).json(markers)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
