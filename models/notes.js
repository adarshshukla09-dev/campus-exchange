const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema(
  {
    title: {
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
    branch: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    whatsapp: {
      type: String,
    },
  },
  { timestamps: true }
);

NotesSchema.index({ owner: 1 });

module.exports = mongoose.model("Note", NotesSchema);
