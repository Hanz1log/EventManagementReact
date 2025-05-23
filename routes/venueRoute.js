const express = require("express");
const router = express.Router();
const Venue = require("../models/venue");

router.get("/getallvenues", async (req, res) => {
  try {
    const venues = await Venue.find({});
    res.send(venues);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/getvenuebyid", async (req, res) => {
  const venueid = req.body.venueid;
  try {
    const venue = await Venue.findOne({ _id: venueid });
    res.send(venue);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});
router.post('/addvenue', async (req, res) => {
  try {
    const newvenue = new Venue(req.body);
    await newvenue.save();
    res.send('Venue Added Successfully');
  } catch (error) {
    return res.status(400).json({ error });
  }
});


module.exports = router;
