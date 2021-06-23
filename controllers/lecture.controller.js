const Lecture = require("../models/lecture");
const Course = require("../models/course");
const User = require("../models/user");
const fs = require("fs");

exports.getLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find({ course_id: req.params.courseid });
    const courses_data = await Course.find({ course_id: req.params.courseid });
    res.render("admin/lectures/index", {
      user: req.user,
      courses_data: courses_data,
      lectures: lectures,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.addLectureForm = async (req, res) => {
  try {
    const lectures = await Lecture.find({ course_id: req.params.courseid });
    const courses_data = await Course.find({ course_id: req.params.courseid });
    return res.render("admin/lectures/add", {
      user: req.user,
      courses_data: courses_data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.postLecture = async (req, res) => {
  try {
    var course_id = req.params.courseid;
    var { name, number } = req.body;
    name = name.toUpperCase();
    const path = req.file ? req.file.filename : filepath;
    if (!path) {
      console.log("path not added");
      return res.redirect("/coursedirectory/admin");
    }
    const newLecture = await new Lecture({
      course_id,
      name,
      filepath: path,
      number,
    }).save();
    if (!newLecture) {
      console.log("Lecture Not added");
      const url = "/coursedirectory/admin/" + course_id + "/lectures";
      res.redirect(url);
    }
    console.log("Successfully added new lecture");
    const url = "/coursedirectory/admin/" + course_id + "/lectures";
    return res.redirect(url);
  } catch (error) {
    console.log(error.message);
  }
};

exports.getEditForm = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.lectureid);
    const courses_data = await Course.find({ course_id: req.params.courseid });
    console.log(courses_data);
    return res.render("admin/lectures/edit", {
      user: req.user,
      courses_data: courses_data,
      lecture: lecture,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.postEditForm = async (req, res) => {
  try {
    var course_id = req.params.courseid;
    var lecture_id = req.params.lectureid;
    var { name, number } = req.body;
    name = name.toUpperCase();
    const path = req.file ? req.file.filename : filepath;
    if (!path) {
      console.log("path not added");
      return res.redirect("/coursedirectory/admin/" + course_id + "/lectures");
    } else {
      data = { course_id, name, filepath: path, number };
    }
    const updatedLecture = await Lecture.findByIdAndUpdate(lecture_id, data);
    if (!updatedLecture) {
      console.log("unable to update Lecture");
    }
    const url = "/coursedirectory/admin/" + course_id + "/lectures";
    return res.redirect(url);
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteLecture = async (req, res) => {
  try {
    var course_id = req.params.courseid;
    const id = req.params.lectureid;
    const lecture = await Lecture.findById(id);
    fs.unlinkSync(`uploads/lectures/${lecture.filepath}`);
    console.log("successfully deleted!");
    await Lecture.findByIdAndRemove(id);
    const url = "/coursedirectory/admin/" + course_id + "/lectures";
    return res.redirect(url);
  } catch (err) {
    console.log(err);
    const url = "/coursedirectory/admin/" + course_id + "/lectures";
    return res.redirect(url);
  }
};

exports.getOneLecture = async (req, res) => {
  try {
    const id = req.params.lectureid;
    const lecture = await Lecture.findById(id);
    console.log(lecture.filepath);
    const filePath = "uploads/lectures/" + lecture.filepath;
    console.log(filePath);
    fs.readFile(filePath, (err, data) => {
      res.contentType("application/pdf");
      return res.send(data);
    });
  } catch (error) {
    console.log(error.message);
  }
};
