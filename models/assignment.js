const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema({
    course_id: {type:String, required:true},
    name: {type:String, required:true},
    filepath: {type:String, required:true},
  });
  
module.exports = mongoose.model("Assignment",AssignmentSchema);