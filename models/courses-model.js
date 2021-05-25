const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const qandaschema = {
  ques: String,
  ans: String
};

const videoschema = {
  name: String,
  link: String
};

const assignschema = {
	name: String,
	filename: String
}

const courseSchema = new Schema ({
	course_id: String,
	name: String,
	credits: String,
	description: String,
	instructur: String,
	level: String,
	lecture_notes: [ assignschema ],
	assignments: [ assignschema ],
	lecture_videos: [ videoschema ],
	questions: [qandaschema]
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
