const Video = require("../models/video");
const Course = require("../models/course");
const User = require("../models/user");
const fs = require("fs");

exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find({ course_id: req.params.courseid });
    const courses_data = await Course.findOne({
      course_id: req.params.courseid,
    });
    res.render("admin/videos/index", {
      user: req.user,
      courses_data: courses_data,
      videos: videos,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.searchVideo = async (req, res) => {
  try {
    var val = req.body.videoSearch;
    if(val == null) {
      return res.redirect("/coursedirectory/admin/" + req.params.courseid + "/videos");
    }
    const videos = await Video.find({
      $and: [
        { name: { $regex: val, $options: "i" } },
        { course_id: { $regex: req.params.courseid, $options: "i" } },
      ],
    });
    const courses_data = await Course.findOne({
      course_id: req.params.courseid,
    });
    return res.render("admin/videos/index", {
      user: req.user,
      courses_data: courses_data,
      videos: videos,
    });
  } catch (error) {
    console.log(error.message);
  }
}

exports.addVideoForm = async (req, res) => {
  try {
    const courses_data = await Course.findOne({
      course_id: req.params.courseid,
    });
    return res.render("admin/videos/add", {
      user: req.user,
      courses_data: courses_data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.postVideo = async (req, res) => {
  try {
    var course_id = req.params.courseid;
    var name = req.body.name;
    var video = req.body.video;
    var number = req.body.number;
    console.log(name);
    if (!video) {
      console.log("path not added");
      return res.redirect("/coursedirectory/admin/" + course_id + "/videos");
    }
    const newVideo = await new Video({
      course_id,
      name,
      link: video,
      number,
    }).save();
    if (!newVideo) {
      console.log("Video Not added");
      const url = "/coursedirectory/admin/" + course_id + "/videos";
      res.redirect(url);
    }
    console.log("Successfully added new video");
    const url = "/coursedirectory/admin/" + course_id + "/videos";
    return res.redirect(url);
  } catch (error) {
    console.log(error.message);
  }
};

exports.getEditForm = async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoid);
    const courses_data = await Course.findOne({
      course_id: req.params.courseid,
    });
    console.log(courses_data);
    return res.render("admin/videos/edit", {
      user: req.user,
      courses_data: courses_data,
      video: video,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.postEditForm = async (req, res) => {
  try {
    var course_id = req.params.courseid;
    var name = req.params.videoid;
    var { video, number } = req.body;
    await Video.findOneAndUpdate({ _id: name }, { link: video }, number);
    console.log("successfully updated");
    const url = "/coursedirectory/admin/" + course_id + "/videos";
    return res.redirect(url);
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    var course_id = req.params.courseid;
    const id = req.params.videoid;
    await Video.findByIdAndRemove(id);
    console.log("successfully deleted!");
    const url = "/coursedirectory/admin/" + course_id + "/videos";
    return res.redirect(url);
  } catch (err) {
    console.log(err);
    const url = "/coursedirectory/admin/" + course_id + "/videos";
    return res.redirect(url);
  }
};
