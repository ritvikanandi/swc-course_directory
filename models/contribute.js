const mongoose = require("mongoose");

const contributeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  course_name: { type: String, required: true },
  topic: { type: String, required: true },
  link: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("contribute", contributeSchema);
