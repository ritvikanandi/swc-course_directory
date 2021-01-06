var express = require("express");
var router = express.Router();
var Course = require("../models/courses-model");
const crypto = require("crypto");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const keys = require("../config/keys");

const mongoURI = keys.mongodb.dburi;

const conn = mongoose.connection;

conn.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

var get_filename = "";

let gfs;
conn.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
});

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        get_filename = req.body.name;
        const fileInfo = {
          filename: filename,
          metadata: {
            name: get_filename,
            course: req.params.courseid,
            where: req.params.where,
          },
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({
  storage,
});

router.get("/", function (req, res) {
  if (req.user.admin) {
    Course.find(function (err, courses) {
      if (!courses) {
        res.send("Sorry !!!");
      } else {
        res.render("courses", { user: req.user, courses_data: courses });
      }
    });
  }
});

router.get("/add-course", function (req, res) {
  //if admin
  if (req.user.admin) {
    res.render("form", { user: req.user });
  }
  //else
});

router.post("/add-course", function (req, res) {
  if (req.user.admin) {
    cou_id = req.body.course_id;
    cou_name = req.body.course_name;
    credits = req.body.credits;
    cou_des = req.body.course_desc;
    instructur = req.body.instructur;
    level = req.body.level;

    const course = new Course({
      course_id: cou_id,
      name: cou_name,
      credits: credits,
      description: cou_des,
      instructur: instructur,
      level: level,
    });
    course.save();
    res.redirect("/courses");
  }
});

router.post("/del/:courseid", function (req, res) {
  if (req.user.admin) {
    Course.findOneAndRemove(
      { course_id: req.params.courseid },
      function (err, courses) {
        res.redirect("/courses");
      }
    );
  }
});

router.get("/:courseid", function (req, res) {
  if (req.user) {
    Course.find({ course_id: req.params.courseid }, function (err, courses) {
      if (err) {
        res.send("Sorry !!!");
      } else {
        res.render("coursecontent", { user: req.user, courses_data: courses });
      }
    });
  }
});

router.get("/:courseid/syllabus", function (req, res) {
  if (req.user) {
    Course.find({ course_id: req.params.courseid }, function (err, courses) {
      if (err) {
        res.send("Sorry !!!");
      } else {
        res.render("syllabus", { user: req.user, courses_data: courses });
      }
    });
  }
});

router.get("/:courseid/:where", (req, res) => {
  if (req.user) {
    if (!gfs) {
      console.log("some error occured, check connection to db");
      res.send("some error occured, check connection to db");
      process.exit(0);
    }
    gfs.find().toArray((err, files) => {
      // check if files
      if (!files || files.length === 0) {
        Course.find(
          { course_id: req.params.courseid },
          function (err, courses) {
            if (req.params.where == "lecture-notes")
              return res.render("lecture-notes", {
                user: req.user,
                files: false,
                courses_data: courses,
              });
            else if (req.params.where == "assignment")
              return res.render("assignment", {
                user: req.user,
                files: false,
                courses_data: courses,
              });
            else return res.send("Page not found");
          }
        );
      } else {
        const f = files
          .map((file) => {
            if (file.contentType === "application/pdf") {
              file.isPdf = true;
              file.coursename = req.params.courseid;
            } else {
              file.isPdf = false;
            }
            return file;
          })
          .sort((a, b) => {
            return (
              new Date(b["uploadDate"]).getTime() -
              new Date(a["uploadDate"]).getTime()
            );
          });
        Course.find(
          { course_id: req.params.courseid },
          function (err, courses) {
            if (req.params.where == "lecture-notes")
              return res.render("lecture-notes", {
                user: req.user,
                files: f,
                courses_data: courses,
              });
            else if (req.params.where == "assignment")
              return res.render("assignment", {
                user: req.user,
                files: f,
                courses_data: courses,
              });
            else return res.send("Page not found");
          }
        );
      }
    });
  }
});

router.post("/:courseid/:where/upload", upload.single("file"), (req, res) => {
  if (req.user.admin) {
    res.redirect("/courses/" + req.params.courseid + "/" + req.params.where);
  }
});

router.get("/:courseid/:where/pdf/:filename", (req, res) => {
  // console.log('id', req.params.id)
  if (req.user) {
    const file = gfs
      .find({
        filename: req.params.filename,
      })
      .toArray((err, files) => {
        if (!files || files.length === 0) {
          return res.status(404).json({
            err: "no files exist",
          });
        }
        gfs.openDownloadStreamByName(req.params.filename).pipe(res);
      });
  }
});

router.post("/:courseid/:where/files/del/:id", (req, res) => {
  if (req.user.admin) {
    gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
      if (err) return res.status(404).json({ err: err.message });
      res.redirect("/courses/" + req.params.courseid + "/" + req.params.where);
    });
  }
});

module.exports = router;
