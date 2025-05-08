const { Timestamp } = require('bson');
const mongoose = require('mongoose');
const bookingSchema = mongoose.Schema({

    venue : {
        type: String, required: true
    },
    venueid : {
        type: String, required: true
    },
    userid : {
        type: String, required: true
    },
    fromdate : {
        type: String, required: true
    },
    todate : {
        type: String, required: true
    },
    totalamount : {
        type: Number, required: true
    },
    totaldays : {
        type: Number, required: true
    },
    transactionid : {
        type: String, required: true
    },
    status : {
        type: String, required: true, default: 'booked'
    }

}, {
    timestamps: true
})

const bookingmodel = mongoose.model('Bookings', bookingSchema)
module.exports = bookingmodel