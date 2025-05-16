const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Venue = require("../models/venue");
const stripe = require('stripe')('sk_test_51RMlG33EWaLSoTWPWf7h6MiY48k4dbN9ZrDkmpqIvE6v7v7ZFbaVneLNHiLwfp0KpU0mbre4l9jXGC984vwGhZ1p007vLlfgHe')
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

router.post('/getbookingsbyuserid', async (req, res) => {
  const { userid } = req.body;

  try {
    const bookings = await Booking.find({ userid }); 
    res.send(bookings);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching bookings', error });
  }
});

router.post("/cancelbooking", async (req, res) => {
  const { bookingid, venueid } = req.body;

  try {
  
    const booking = await Booking.findOne({ _id: bookingid });
    booking.status = "cancelled";
    await booking.save();

   
    const venue = await Venue.findOne({ _id: venueid });
    venue.currentbookings = venue.currentbookings.filter(
      b => b.bookingid.toString() !== bookingid
    );
    await venue.save();

    res.send("Booking cancelled successfully");
  } catch (error) {
    console.error("Cancel Booking Error:", error);
    res.status(400).json({ error: "Cancel failed", details: error.message });
  }
});

router.get("/getallbookings", async(req,res) =>{
  try {
    const bookings = await Booking.find()
    res.send(bookings)
  } catch (error) {
    return res.status(400).json({error});
  }
})


module.exports = router;
