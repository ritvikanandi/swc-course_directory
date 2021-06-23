const Citation = require("../models/citation");
const Query = require("../models/query");
const Contribute = require("../models/contribute");
const Course = require("../models/course");
const Video = require("../models/video");
const Lecture = require("../models/lecture");
const Assignment = require("../models/assignment");
const fs = require("fs");

exports.getHomePage = async (req, res) => {
  try {
    courses = await Course.find();
    return res.render("user/index", { courses, user: req.user });
  } catch (error) {
    console.log(error);
  }
};

exports.showSearch = async (req, res) => {
  const searchValue = req.body.category.toUpperCase();
  console.log(searchValue);
  const result = await Course.findOne({ course_id: searchValue });
  const result1 = await Course.findOne({ name: searchValue });
  console.log(result);
  console.log(result1);
  if (result) {
    res.redirect("/coursedirectory/course/" + result.course_id);
  } else if (result1) {
    res.redirect("/coursedirectory/course/" + result1.course_id);
  } else {
    res.send("Course does not exist in directory.");
  }
};

exports.postcitereq = async (req, res) => {
  try {
    const name = req.user.username;
    const email = req.user.outlookID;
    const { course_name, professor, reason } = req.body;
    const newCitation = await new Citation({
      name,
      email,
      course_name,
      professor,
      reason,
    }).save();
    if (!newCitation) {
      console.log("not saved");
    } else {
      console.log("Successfully requested");
    }
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
};

exports.postQuery = async (req, res) => {
  try {
    const name = req.user.username;
    const email = req.user.outlookID;
    const { topic, askto, query } = req.body;
    const newQuery = await new Query({
      name,
      email,
      topic,
      askto,
      query,
    }).save();
    if (!newQuery) {
      console.log("not saved");
    } else {
      console.log("Query Successfully Submitted");
    }
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

exports.postContribute = async (req, res) => {
  try {
    const name = req.user.username;
    const email = req.user.outlookID;
    const { course_name, topic, link, description } = req.body;
    const newContribute = await new Contribute({
      name,
      email,
      topic,
      course_name,
      link,
      description,
    }).save();
    if (!newContribute) {
      console.log("not saved");
    } else {
      console.log("Contribution Successfully Submitted");
    }
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

exports.getMyLearningPage = async (req, res) => {
  try {
    return res.render("user/mylearning", { user: req.user });
  } catch (error) {
    console.log(error);
  }
};

exports.getCitationPage = async (req, res) => {
  try {
    courses = await Course.find();
    return res.render("user/citation", { user: req.user, courses });
  } catch (error) {
    console.log(error);
  }
};

exports.getAskQueryPage = async (req, res) => {
  try {
    courses = await Course.find();
    return res.render("user/askQuery", { user: req.user, courses });
  } catch (error) {
    console.log(error);
  }
};

exports.getContributePage = async (req, res) => {
  try {
    courses = await Course.find();
    return res.render("user/contribute", { user: req.user, courses });
  } catch (error) {
    console.log(error);
  }
};

exports.getCoursePage = async (req, res) => {
  try {
    courses = await Course.find();
    return res.render("user/coursepage", { user: req.user, courses });
  } catch (error) {
    console.log(error);
  }
};

exports.getOneCoursePage = async (req, res) => {
  try {
    const course = await Course.find({ course_id: req.params.courseid });
    if (course.length == 0) {
      return res.send("Not any course");
    } else {
      const videos = await Video.find({ course_id: req.params.courseid });
      const lectures = await Lecture.find({ course_id: req.params.courseid });
      const assignments = await Assignment.find({
        course_id: req.params.courseid,
      });
      courses = await Course.find();
      return res.render("user/coursepage", {
        user: req.user,
        courses_data: course,
        videos: videos,
        lectures: lectures,
        assignments: assignments,
        courseid: req.params.courseid,
        professor: null,
        courses,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.professorPage = async (req, res) => {
  try {
    const course = await Course.find({ course_id: req.params.courseid });
    console.log(course);
    if (course.length == 0) {
      return res.send(" any course");
    } else {
      const videos = await Video.find({ course_id: req.params.courseid });
      const lectures = await Lecture.find({ course_id: req.params.courseid });
      const profdata = {
        name: "Rahul Aggarwal",
      };
      const assignments = await Assignment.find({
        course_id: req.params.courseid,
      });
      courses = await Course.find();
      return res.render("user/coursepage", {
        user: req.user,
        courses_data: course,
        videos: videos,
        lectures: lectures,
        assignments: assignments,
        courseid: req.params.courseid,
        professor: profdata,
        courses,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getOneLecture = async (req, res) => {
  try {
    const lecture_id = req.params.lectureid;
    const lecture = await Lecture.findById(lecture_id);
    const filePath = "uploads/lectures/" + lecture.filepath;
    fs.readFile(filePath, (err, data) => {
      res.contentType("application/pdf");
      return res.send(data);
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getOneAssignment = async (req, res) => {
  try {
    const assignment_id = req.params.assignmentid;
    const assignment = await Assignment.findById(assignment_id);
    const filePath = "uploads/assignments/" + assignment.filepath;
    fs.readFile(filePath, (err, data) => {
      res.contentType("application/pdf");
      return res.send(data);
    });
  } catch (error) {
    console.log(error);
  }
};
