const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  image: {
    url: String,
    filename: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  whatsapp: {
    type: String,
  },
});

module.exports = mongoose.model("Book", BookSchema);
