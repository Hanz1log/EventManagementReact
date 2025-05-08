const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Venue = require("../models/venue");

router.post("/bookvenue", async (req, res) => {
  const {
    venue,
    userid,
    fromdate,
    todate,
    totalamount,
    totaldays
  } = req.body;

  try {
    const newbooking = new Booking({
      venue: venue.name,
      venueid: venue._id,
      userid: userid,
      fromdate,
      todate,
      totalamount,
      totaldays,
      transactionid: '1234'
    });

    const booking = await newbooking.save();

    const venuetemp = await Venue.findOne({ _id: venue._id });
    venuetemp.currentbookings.push({
      bookingid: booking._id,
      fromdate,
      todate,
      userid: userid,
      status: booking.status
    });

    await venuetemp.save();

    res.status(200).json({ message: 'Room Booked Successfully' });

  } catch (error) {
    console.error("Booking Error:", error);
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
