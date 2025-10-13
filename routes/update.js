const express = require("express");
const router = express.Router();
const sat = require("../models/sat");
const Note = require("../models/notes");
const Book = require("../models/books");
const wrapAsync = require("../utils/wrapAsync");
const multer = require("multer");
const { storage } = require("../cloudconfig"); // If using Cloudinary
const upload = multer({ storage });
// all get form request

router.get(
  "/note/:id/edit",
  wrapAsync(async (req, res) => {
    const { id } = req.params;

    const note = await Note.findById(id);
    res.render("./edits/editn", {
      note,
      title: "Edit Note | Campus Exchange",
    });
  })
);

router.get(
  "/book/:id/edit",
  wrapAsync(async (req, res) => {
    const { id } = req.params;

    const book = await Book.findById(id);
    res.render("./edits/editb.ejs", {
      book,
      title: "Edit Book | Campus Exchange",
    });
  })
);

router.get(
  "/stationary/:id/edit",
  wrapAsync(async (req, res) => {
    const { id } = req.params;

    const sats = await sat.findById(id);
    res.render("./edits/edits.ejs", {
      sats,
      title: "Edit Stationary | Campus Exchange",
    });
  })
);

// all put requests
router.put(
  "/book/:id",
  upload.single("image"), // handle file upload
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);

    // Update book fields
    book.title = req.body.title;
    book.subject = req.body.subject;
    book.branch = req.body.branch;
    book.price = req.body.price;

    // Handle image removal
    if (req.body.removeImage && book.image && book.image.filename) {
      // Assuming you're using Cloudinary
      const cloudinary = require("cloudinary").v2;
      await cloudinary.uploader.destroy(book.image.filename);
      book.image = undefined;
    }

    // Handle new image upload
    if (req.file) {
      book.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    await book.save();
    res.redirect("/sh/book");
  })
);

router.put(
  "/note/:id",
  upload.single("image"),
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const note = await Note.findById(id);

    note.title = req.body.title;
    note.subject = req.body.subject;
    note.branch = req.body.branch;

    // Remove old image if checkbox is selected
    if (req.body.removeImage && note.image && note.image.filename) {
      await cloudinary.uploader.destroy(note.image.filename);
      note.image = undefined;
    }

    // Add new image
    if (req.file) {
      note.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    await note.save();
    res.redirect("/sh/note");
  })
);

router.put(
  "/stationary/:id",
  upload.single("image"),
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const stationary = await sat.findById(id);

    stationary.title = req.body.title;
    stationary.subject = req.body.subject;
    stationary.branch = req.body.branch;
    stationary.price = req.body.price;

    // Remove old image if checkbox selected
    if (req.body.removeImage && stationary.image && stationary.image.filename) {
      await cloudinary.uploader.destroy(stationary.image.filename);
      stationary.image = undefined;
    }

    // If new image is uploaded
    if (req.file) {
      stationary.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    await stationary.save();
    res.redirect("/sh/stationary");
  })
);

module.exports = router;
