const mongoose = require("mongoose");

const ProfessorSchema = new mongoose.Schema({
  name: { type: string, required: true },
  department: { type: string, required: true },
  post: { type: string, required: true },
  contact_no: { type: number, required: true },
  email: { type: string, required: true },
  imagepath: { type: string, required: true },
});

module.exports = mongoose.model("Professor", ProfessorSchema);
