//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const methodOverride = require("method-override");
require("dotenv").config();
const { MONGO_URL, COOKIE_KEY } = process.env;

const urlcloud = MONGO_URL;
const urllocal = "mongodb://localhost:27017/swccoursedirectory";

const passportSetup = require("./config/user.passportsetup");
const middleware = require("./middleware/index");
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const courseRoutes = require("./routes/course.routes");
const lectureRoutes = require("./routes/lecture.routes");
const assignmentRoutes = require("./routes/assignment.routes");
const videoRoutes = require("./routes/video.routes");
const faqRoutes = require("./routes/faq.routes");
const userRoutes = require("./routes/user.routes");
const professorRoutes = require("./routes/professor.routes");

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
app.use("/coursedirectory", express.static(__dirname + "/public"));
app.use("/coursedirectory/uploads", express.static(__dirname + "/uploads"));

// set up session cookies
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [COOKIE_KEY],
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
app.use("/coursedirectory", userRoutes);
app.use("/coursedirectory/admin/professor", professorRoutes);

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
