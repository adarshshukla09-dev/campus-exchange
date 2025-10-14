const express = require("express");
const router = express.Router();
const sat = require("../models/sat");
const Note = require("../models/notes");
const Book = require("../models/books");
const wrapAsync = require("../utils/wrapAsync");

router.get("/", (req, res) => {
  res.render("./show/homepage.ejs");
});
router.get(
  "/note",
  wrapAsync(async (req, res) => {
    const notes = await Note.find().populate("owner", "username");
    // populate("owner", "name");
    res.render("./show/Notes.ejs", { notes });
  })
);
router.get(
  "/book",
  wrapAsync(async (req, res) => {
    const books = await Book.find().populate("owner", "username");
    // populate("owner", "name");
    res.render("./show/Books.ejs", { books });
  })
);
router.get(
  "/stationary",
  wrapAsync(async (req, res) => {
    const sats = await sat.find().populate("owner", "username");
    // populate("owner", "name");
    res.render("./show/stationary.ejs", { sats });
  })
);

module.exports = router;
