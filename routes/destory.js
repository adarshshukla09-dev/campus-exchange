const express = require("express");
const router = express.Router();
const sat = require("../models/sat");
const Note = require("../models/notes");
const wrapAsync = require("../utils/wrapAsync");

const Book = require("../models/books");

router.delete(
  "/note/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    res.redirect("/sh/note");
  })
);

// Delete Book
router.delete(
  "/book/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    res.redirect("/sh/book");
  })
);

// Delete Stationary
router.delete(
  "/stationary/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await sat.findByIdAndDelete(id);
    res.redirect("/sh/stationary");
  })
);

module.exports = router;
