const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  course_id: { type: String, required: true },
  course_name: { type: String, required: true },
  credits: { type: Number, required: true },
  description: { type: String, required: true },
  branch: { type: String, required: true },
  semester: { type: Number, required: true },
  professorEmail: { type: String, required: true },
  level: { type: String, required: true },
  professorName: { type: String, required: true },
  moderatorEmail: { type: String, required: true },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
