
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const qandaSchema = {
  ques: String,
  ans: String,
};

const videoSchema = {
  name: String,
  link: String,
};

const assignSchema = {
  name: String,
  filename: String,
};

const courseSchema = new Schema({
  course_id: String,
  name: String,
  credits: String,
  description: String,
  instructur: String,
  level: String,
  lecture_notes: [assignSchema],
  assignments: [assignSchema],
  lecture_videos: [videoSchema],
  questions: [qandaSchema],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
