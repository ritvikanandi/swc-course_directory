const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
  course_id: { type: String, required: true },
  number: { type: Number, required: true },
  name: { type: String, required: true },
  filepath: { type: String, required: true },
});

module.exports = mongoose.model("Lecture", LectureSchema);
