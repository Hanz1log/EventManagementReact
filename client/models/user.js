const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const userSchema = mongoose.Schema({

    name : {
        type: String,
        required: true
    },                                               
    email : {
        type: String,
        required: true
    },
    password : {
        type: String, 
        required: true
    },
    contact : {
        type: String,
        required: true
    },

    isAdmin: {
        type: Boolean,
        default: false
      }
      


}, {
    timestamps: true,
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel