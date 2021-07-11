const mongoose = require("mongoose");

const ProfessorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  post: { type: String, required: true },
  contact: { type: Number, required: true },
  email: { type: String, required: true },
  imagepath: { type: String, required: true },
  area: { type: String, required: true },
});

module.exports = mongoose.model("Professor", ProfessorSchema);
