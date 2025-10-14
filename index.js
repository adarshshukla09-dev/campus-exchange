require("dotenv").config();
const flash = require("connect-flash");

const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const ExpressError = require("./utils/ExpressError.js");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const showRoutes = require("./routes/show.js");
const createRoutes = require("./routes/create.js");
const updateRoutes = require("./routes/update.js");
const deleteRoutes = require("./routes/destory.js");
const authRoutes = require("./routes/users.js");

const User = require("./models/s.js");
const mongourl = process.env.MONGO_URI;
main()
  .then(() => {
    console.log("connection sucessful");
  })
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongourl);
}
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(flash());

app.use(express.static(path.join(__dirname, "public")));
const store = MongoStore.create({
  mongoUrl: mongourl,
  touchAfter: 24 * 3600,
  crypto: {
    secret: process.env.SECRET,
  },
});

app.use(
  session({
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
store.on("error", () => {
  console.log("the error is in session store ", err);
});
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Custom Middleware to expose current user to all views
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// Routes
app.use("/sh", authRoutes); // Signup/Login routes
app.use("/sh", createRoutes); // Create Note
app.use("/sh", showRoutes); // Read/Show Notes
app.use("/sh", updateRoutes); // Update Note
app.use("/sh", deleteRoutes); // Delete Note

// 404 Handler
app.all("*", (req, res, next) => {
  const error = new ExpressError("Page Not Found", 404);
  next(error);
});

// General Error Handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("./error/error.ejs", { message, statusCode });
});

// Server start
app.listen(3000, () => {
  console.log("🚀 Server is listening on port 3000");
});
