const Citation = require("../models/citation");
const Query = require("../models/query");
const Contribute = require("../models/contribute");
const Course = require("../models/course");
const Video = require("../models/video");
const Lecture = require("../models/lecture");
const Assignment = require("../models/assignment");

exports.getHomePage = async (req, res) => {
  try {
    return res.render("user/index", { user: req.user });
  } catch(error) {
    console.log(error);
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
  } catch(error) {
    console.log(error);
  }
};

exports.getCitationPage = async (req, res) => {
  try {
    return res.render("user/citation", { user: req.user });
  } catch(error) {
    console.log(error);
  }
}

exports.getAskQueryPage = async (req, res) => {
  try {
    return res.render("user/askQuery", { user: req.user });
  } catch(error) {
    console.log(error);
  }
}

exports.getContributePage = async (req, res) => {
  try{
    return res.render("user/contribute", { user: req.user });
  } catch(error) {
    console.log(error);
  }
}

exports.getCoursePage = async (req, res) => {
  try {
    return res.render("user/coursepage", { user: req.user });
  } catch(error) {
    console.log(error);
  }
};

exports.getOneCoursePage = async (req, res) => {
  try {
    const course = await Course.find({course_id : req.params.courseid});
    if(course.length == 0) {
      return res.send("Not any course");
    }
    else {
      const videos = await Video.find({course_id: req.params.courseid});
      const lectures = await Lecture.find({course_id: req.params.courseid});
      const assignments = await Assignment.find({course_id: req.params.courseid});
      return res.render("user/coursepage", {
        user: req.user,
        courses_data: course,
        videos: videos,
        lectures: lectures,
        assignments: assignments});
    }
  } catch(error) {
    console.log(error);
  }
};
