const Course = require("../models/course");

exports.getCourses = async (req, res) => {
  const courses = await Course.find();
  return res.render("admin/AllCourse/index", {
    user: req.user,
    courses_data: courses,
  });
};

exports.getAddCourse = async (req, res) => {
  return res.render("admin/AllCourse/add", { user: req.user });
};

exports.postAddCourse = async (req, res) => {
  cou_id = req.body.course_id.toUpperCase();
  cou_name = req.body.course_name.toUpperCase();
  credits = req.body.credits;
  cou_des = req.body.course_desc;
  professor = req.body.professor;
  branch = req.body.branch;
  level = req.body.level;
  const courses = await Course.find({ course_id: cou_id });
  if (courses.length != 0) {
    // if admin try to use course id that is already given then it returns to the same page
    return res.redirect("/coursedirectory/admin/add");
  } else {
    const course = await new Course({
      course_id: cou_id,
      name: cou_name,
      credits: credits,
      description: cou_des,
      professor,
      branch,
      level: level,
    }).save();
    return res.redirect("/coursedirectory/admin");
  }
};

exports.getEditCourse = async (req, res) => {
  const courses = await Course.find({ course_id: req.params.courseid });
  return res.render("admin/AllCourse/edit", {
    user: req.user,
    courses_data: courses,
  });
};

exports.editCourse = async (req, res) => {
  cou_id = req.body.course_id.toUpperCase();
  cou_name = req.body.course_name.toUpperCase();
  credits = req.body.credits;
  cou_des = req.body.course_desc;
  level = req.body.level;
  branch = req.body;
  professor = req.body;

  const data = {
    course_id: cou_id,
    name: cou_name,
    credits: credits,
    description: cou_des,
    level: level,
    branch,
    professor,
  };
  await Course.findOneAndUpdate({ course_id: req.params.courseid }, data, {
    new: true,
  });
  return res.redirect("/coursedirectory/admin");
};

exports.deleteCourse = async (req, res) => {
  await Course.findOneAndRemove({ course_id: req.params.courseid });
  return res.redirect("/coursedirectory/admin");
};

exports.getOneCourseDetails = async (req, res) => {
  const courses = await Course.find({ course_id: req.params.courseid });
  return res.render("admin/home/index", {
    user: req.user,
    courses_data: courses,
  });
};
