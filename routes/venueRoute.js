const express = require("express");
const router = express.Router();

const Venue = require('../models/venue')


router.get("/getallvenues", async(req, res)=>{

    try {
        const venues = await Venue.find({})
        res.send(venues)
    } catch (error) {
        return res.status(400).json({message: error})
    }
         
})

module.exports = router;