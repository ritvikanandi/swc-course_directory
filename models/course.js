const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  course_id: String,
  name: String,
  credits: Number,
  description: String,
  level: String,
  branch: String,
  professor: String,
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
