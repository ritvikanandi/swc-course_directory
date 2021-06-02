//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const methodOverride = require("method-override");

const keys = require("./config/keys");
const urlcloud = keys.mongodb.dburi;
const urllocal = "mongodb://localhost:27017/swccoursedirectory";

const passportSetup = require("./config/passport-setup");
const middleware = require("./middleware/index");
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const courseRoutes = require("./routes/course.routes");
const lectureRoutes = require("./routes/lecture.routes");
const assignmentRoutes = require("./routes/assignment.routes");
const videoRoutes = require("./routes/video.routes");
const faqRoutes = require("./routes/faq.routes");

//Database Connection
mongoose.connect(
  urlcloud,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) console.log(err.message);
    else console.log("Successfully connected to DB!");
  }
);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/public", express.static("public"));

// set up session cookies
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
  })
);

app.use(methodOverride("_method"));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.use("/coursedirectory/auth", authRoutes);
app.use("/coursedirectory/admin", adminRoutes);
app.use("/coursedirectory/courses", courseRoutes);
app.use("/coursedirectory/admin/:courseid/lectures", lectureRoutes);
app.use("/coursedirectory/admin/:courseid/assignments", assignmentRoutes);
app.use("/coursedirectory/admin/:courseid/videos", videoRoutes);
app.use("/coursedirectory/admin/:courseid/faqs", faqRoutes);

//home page
app.get("/coursedirectory", (req, res) => {
  res.render("user/home", { user: req.user });
});

app.get("/", (req, res) => {
  res.redirect("/coursedirectory");
});

// Server Connection
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Server started Successfully");
});
