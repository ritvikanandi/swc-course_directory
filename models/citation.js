const mongoose = require("mongoose");

const CitationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  course_name: { type: String, required: true },
  professor: { type: String, required: true },
  reason: { type: String, required: true },
});

module.exports = mongoose.model("Citation", CitationSchema);
