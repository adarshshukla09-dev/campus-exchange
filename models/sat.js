const mongoose = require("mongoose");

let StationarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  subject: {
    type: String,
    required: true,
  },
  image: {
    url: String,
    filename: String,
  },
  branch: {
    type: String,
    required: true,
  },
  whatsapp: {
    type: String,
  },
});

module.exports = mongoose.model("sat", StationarySchema);
