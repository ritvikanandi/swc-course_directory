const FAQ = require("../models/faq");
const Course = require("../models/course");
const User = require("../models/user");
const fs = require("fs");

exports.getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find({ course_id: req.params.courseid });
    const courses_data = await Course.findOne({ course_id: req.params.courseid });
    res.render("admin/faqs/index", {
      user: req.user,
      courses_data: courses_data,
      faqs: faqs,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.addFAQForm = async (req, res) => {
  try {
    const courses_data = await Course.findOne({ course_id: req.params.courseid });
    return res.render("admin/faqs/add", {
      user: req.user,
      courses_data: courses_data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.postFAQ = async (req, res) => {
  try {
    var course_id = req.params.courseid;
    var { question, answer } = req.body;
    const newFAQ = await new FAQ({
      course_id,
      question,
      answer,
    }).save();
    if (!newFAQ) {
      console.log("FAQ Not added");
      const url = "/coursedirectory/admin/" + course_id + "/faqs";
      res.redirect(url);
    }
    console.log("Successfully added new faq");
    const url = "/coursedirectory/admin/" + course_id + "/faqs";
    return res.redirect(url);
  } catch (error) {
    console.log(error.message);
    const url = "/coursedirectory/admin/" + course_id + "/faqs";
    return res.redirect(url);
  }
};

exports.getEditForm = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.faqid);
    const courses_data = await Course.findOne({ course_id: req.params.courseid });
    console.log(courses_data);
    return res.render("admin/faqs/edit", {
      user: req.user,
      courses_data: courses_data,
      faq: faq,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.postEditForm = async (req, res) => {
  try {
    var course_id = req.params.courseid;
    var name = req.params.faqid;
    var { answer } = req.body;
    await FAQ.findOneAndUpdate({ _id: name }, { answer: answer });
    console.log("successfully updated");
    const url = "/coursedirectory/admin/" + course_id + "/faqs";
    return res.redirect(url);
  } catch (error) {
    console.log(error.message);
    const url = "/coursedirectory/admin/" + course_id + "/faqs";
    return res.redirect(url);
  }
};

exports.deleteFAQ = async (req, res) => {
  try {
    var course_id = req.params.courseid;
    const id = req.params.faqid;
    await FAQ.findByIdAndRemove(id);
    console.log("successfully deleted!");
    await FAQ.findByIdAndRemove(id);
    const url = "/coursedirectory/admin/" + course_id + "/faqs";
    return res.redirect(url);
  } catch (err) {
    console.log(err);
    const url = "/coursedirectory/admin/" + course_id + "/faqs";
    return res.redirect(url);
  }
};
