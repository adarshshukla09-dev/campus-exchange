const express = require("express");
const router = express.Router();
const sat = require("../models/sat");
const Note = require("../models/notes");
const Book = require("../models/books");
const { cloudinary } = require("../cloudconfig");

const { isLoggedIn } = require("../middleware/log");
const multer = require("multer");
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });
// get
router.get("/add", isLoggedIn, (req, res) => {
  res.render("./create/create.ejs", { title: "Add Item" });
});

router.get("/add/stationary", isLoggedIn, (req, res) => {
  res.render("./create/create_stationary.ejs", { title: "Add Stationary" });
});

router.get("/add/note", isLoggedIn, (req, res) => {
  res.render("./create/create_notes.ejs", { title: "Add Note" });
});

router.get("/add/book", isLoggedIn, (req, res) => {
  res.render("./create/create_books.ejs", { title: "Add Book" });
});

router.post(
  "/createb",
  isLoggedIn,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, price, subject, branch, whatsapp } = req.body;
      const { path: url, filename } = req.file;

      const newBook = new Book({
        title,
        price,
        subject,
        branch,
        whatsapp,
        owner: req.user._id,
        image: { url, filename },
      });

      await newBook.save();
      res.redirect("/sh/book");
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to save stationary item.");
    }
  }
);

router.post(
  "/createn",
  isLoggedIn,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, price, subject, branch, whatsapp } = req.body;
      const { path: url, filename } = req.file;

      const newNote = new Note({
        title,
        subject,
        branch,
        whatsapp,
        owner: req.user._id,
        image: { url, filename },
      });

      await newNote.save();
      res.redirect("/sh/stationary");
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to save stationary item.");
    }
  }
);

// Stationary creation
router.post(
  "/createsta",
  isLoggedIn,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, price, subject, branch, whatsapp } = req.body;
      const { path: url, filename } = req.file;

      const newSat = new sat({
        title,
        price,
        subject,
        branch,
        whatsapp,
        owner: req.user._id,
        image: { url, filename },
      });

      await newSat.save();
      res.redirect("/sh/stationary");
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to save stationary item.");
    }
  }
);

module.exports = router;
