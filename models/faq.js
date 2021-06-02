const mongoose = require("mongoose");

const FAQSchema = new mongoose.Schema({
  course_id: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

module.exports = mongoose.model("FAQ", FAQSchema);
