const mongoose = require("mongoose");

const mongoURL = 'mongodb+srv://johanssen:hanssen1357@cluster0.w1kmjra.mongodb.net/EventHorizon';

mongoose.connect(mongoURL);

const connection = mongoose.connection;

connection.on("error", () => {
  console.log("Mongo DB Connection Failed");
});

connection.on("connected", () => {
  console.log("Mongo DB Connection Successful");
});

module.exports = mongoose;
