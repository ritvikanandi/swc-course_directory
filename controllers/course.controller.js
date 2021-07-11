const Course = require("../models/course");

exports.getCourses = async (req, res) => {
  const courses = await Course.find();
  res.render("courses", { user: req.user, courses_data: courses });
};

exports.getCourseContent = async (req, res) => {
  const course = await Course.findOne({ course_id: req.params.courseid });
  if (!course) {
    res.send("Sorry!!, Not an available course");
  } else {
    res.render("coursecontent", { user: req.user, courses_data: course });
  }
};

exports.getSyllabus = async (req, res) => {
  const course = await Course.findOne({ course_id: req.params.courseid });
  if (!course) {
    res.send("Sorry!!, Not an available course");
  } else {
    res.render("syllabus", { user: req.user, courses_data: course });
  }
};

exports.getLectureVideos = async (req, res) => {
  const course = await Course.findOne({ course_id: req.params.courseid });
  if (!course) {
    res.send("Sorry!!, Not an available course");
  } else {
    res.render("lecture-videos", { user: req.user, courses_data: course });
  }
};

exports.getLectureNotes = async (req, res) => {
  const course = await Course.findOne({ course_id: req.params.courseid });
  if (!course) {
    res.send("Sorry!!, Not an available course");
  } else {
    res.render("lecture-notes", { user: req.user, courses_data: course });
  }
};

exports.getAssignments = async (req, res) => {
  const course = await Course.findOne({ course_id: req.params.courseid });
  if (!course) {
    res.send("Sorry!!, Not an available course");
  } else {
    res.render("assignment", { user: req.user, courses_data: course });
  }
};

exports.getFaq = async (req, res) => {
  const course = await Course.findOne({ course_id: req.params.courseid });
  if (!course) {
    res.send("Sorry!!, Not an available course");
  } else {
    res.render("faq", { user: req.user, courses_data: course });
  }
};
