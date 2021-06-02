const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  course_id: { type: String, required: true },
  name: { type: String, required: true },
  link: { type: String, required: true },
});

module.exports = mongoose.model("Video", VideoSchema);
