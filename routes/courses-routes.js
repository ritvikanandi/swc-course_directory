var express = require("express");
var router = express.Router();
var Course = require("../models/courses-model");
const crypto = require("crypto");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const keys = require("../config/keys");

//const mongoURI = keys.mongodb.dburi;
const mongoURI = "mongodb://localhost:27017/userdata";
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
        get_filename=filename;
      });
    });
  }
});

const upload = multer({
  storage,
});

const qandaschema = {
  ques: String,
  ans: String
};

const videoschema = {
  name: String,
  link: String
};

const assignschema = {
  name: String,
  filename: String
}

const Assignment = mongoose.model("Assignment", assignschema);
const Question = mongoose.model("Question", qandaschema);
const Video = mongoose.model("Video", videoschema);

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
    console.log(course);
    res.redirect("/courses");
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

router.delete("/:courseid",function(req,res) {
  Course.find({ course_id: req.params.courseid}, function (err, courses) {
    courses[0].lecture_notes.forEach( function(file) {
      gfs.delete(new mongoose.Types.ObjectId(file._id), (err, data) => {
        if (err) return res.status(404).json({ err: err.message });
      });
    });
    courses[0].assignments.forEach( function(file) {
      gfs.delete(new mongoose.Types.ObjectId(file._id), (err, data) => {
        if (err) return res.status(404).json({ err: err.message });
      });
    });
  });
  Course.findOneAndRemove({course_id: req.params.courseid}, function(err) {
    if(err) {
      console.log(err);
    }
    else{
      res.redirect("/courses");
    }
  });
});

router.put("/:courseid", function(req,res) {
  cou_id = req.body.course_id;
  cou_name = req.body.course_name;
  credits = req.body.credits;
  cou_des = req.body.course_desc;
  instructur = req.body.instructur;
  level = req.body.level;

  const data = {
    course_id: cou_id,
    name: cou_name,
    credits: credits,
    description: cou_des,
    instructur: instructur,
    level: level
  };
  Course.findOneAndUpdate({course_id: req.params.courseid}, data, {new: true}, function(err) {
    if(err) {
      console.log(err);
    }
    else{
      res.redirect("/courses");
    }
  });
});

router.get("/edit/:courseid", function(req,res) {
  Course.find( {course_id: req.params.courseid}, function(err, course) {
    if(err) {
      res.send("Sorry !!!");
    }
    else {
      res.render('editcourse', { user: req.user, courses_data: course });
    }
  });
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

router.get("/:courseid/faq", function(req, res) {

  Course.find({ course_id: req.params.courseid}, function(err, courses) {
    if(!err) {
      if(!courses) {
        const newcourse = new Course({
          course_id: req.params.courseid
        });
        newcourse.save();
        res.redirect("/course/" + req.params.courseid +"/faq");
      }
      else {
        res.render("faq", {user: req.user, courses_data: courses});
      }
    }
  })
});

router.post("/:courseid/faq", function (req,res) {
    const newqanda = new Question({
      ques: req.body.ques,
      ans: req.body.ans
    });

    Course.findOne({course_id: req.params.courseid}, function (err, course) {
      course.questions.push(newqanda);
      course.save();
      console.log(course);
      res.redirect("/courses/" + req.params.courseid +"/faq");
    });
});

router.delete("/:courseid/faq", function (req,res) {
  Course.findOneAndUpdate({course_id: req.params.courseid}, {$pull: {questions: {_id: req.body.id}}}, function(err, course){
      if (!err){
        res.redirect("/courses/" + req.params.courseid +"/faq");
      }
    });
});

router.get("/:courseid/lecture-videos", function (req, res) {
  if (req.user) {
    Course.find({ course_id: req.params.courseid }, function (err, courses) {
      if (err) {
        res.send("Sorry !!!");
      } else {
        res.render("lecture-videos", { user: req.user, courses_data: courses });
      }
    });
  }
});

router.post("/:courseid/lecture-videos", function (req,res) {
  if(req.user) {
    const newvideo = new Video({
      name: req.body.name,
      link: req.body.link
    });

    Course.findOne({ course_id: req.params.courseid }, function (err, course) {
      course.lecture_videos.push(newvideo);
      course.save();
      res.redirect("/courses/" + req.params.courseid +"/lecture-videos");
    });
  }
});

router.delete("/:courseid/lecture-videos", function (req,res) {
  Course.findOneAndUpdate({course_id: req.params.courseid}, {$pull: {lecture_videos: {_id: req.body.id}}}, function(err, course){
      if (!err){
        res.redirect("/courses/" + req.params.courseid +"/lecture-videos");
      }
    });
});

router.get("/:courseid/:where", (req, res) => {
  if (req.user) {
    Course.find({ course_id: req.params.courseid }, function (err, courses) {
        if (req.params.where == "lecture-notes")
          return res.render("lecture-notes", { user: req.user, courses_data: courses });
        else if (req.params.where == "assignment")
          return res.render("assignment", { user: req.user, courses_data: courses});
        else return res.send("Page not found");
      }
    );
  }
});

router.post("/:courseid/:where/upload", upload.single("file"), (req, res) => {
  if (req.user.admin) {
    gfs.find({filename: get_filename}).toArray((err, files) => {
      const f = files.map((file) => {
        return file;
      });
      console.log(f[0]._id);
      const newpdf = new Assignment({
          _id : f[0]._id,
          name: req.body.name,
          filename: get_filename
      });

      if(req.params.where == "lecture-notes") {
        Course.findOne({ course_id: req.params.courseid }, function (err, course) {
          course.lecture_notes.push(newpdf);
          course.save();
        });
      }
      else {
        Course.findOne({ course_id: req.params.courseid }, function (err, course) {
          course.assignments.push(newpdf);
          course.save();
        });
      }
    });
    res.redirect("/courses/" + req.params.courseid + "/" + req.params.where);
  }
});

router.get("/:courseid/:where/pdf/:filename", (req, res) => {
  // console.log('id', req.params.id)
  if (req.user) {
    const file = gfs.find({filename: req.params.filename}).toArray((err, files) => {
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
    });
    if(req.params.where == "lecture-notes") {
      Course.findOneAndUpdate({course_id: req.params.courseid}, {$pull: {lecture_notes: {_id: req.params.id}}}, function(err, course){
        if (!err){
          res.redirect("/courses/" + req.params.courseid +"/lecture-notes");
        }
      });
    }
    else if(req.params.where == "assignment") {
      Course.findOneAndUpdate({course_id: req.params.courseid}, {$pull: {assignments: {_id: req.params.id}}}, function(err, course){
        if (!err){
          res.redirect("/courses/" + req.params.courseid +"/assignment");
        }
      });
    }
  }
});

module.exports = router;
