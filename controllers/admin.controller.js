const Course = require("../models/course");


exports.getCourses = async (req,res) => {
	const courses = await Course.find();
	return res.render("admin/AllCourse/index", { user: req.user, courses_data: courses });
}

exports.getAddCourse = async (req,res) => {
	return res.render("admin/AllCourse/add", {user: req.user});
}

exports.postAddCourse = async (req,res) => {
	cou_id = req.body.course_id;
    cou_name = req.body.course_name;
    credits = req.body.credits;
    cou_des = req.body.course_desc;
    instructur = req.body.instructur;
    level = req.body.level;
    const courses = await Course.find({course_id: cou_id});
    if(courses.length!=0) {
    	// if admin try to use course id that is already given then it returns to the same page
    	return res.redirect("/coursedirectory/admin/add");
    }
    else {
	    const course = await new Course({
	      course_id: cou_id,
	      name: cou_name,
	      credits: credits,
	      description: cou_des,
	      instructur: instructur,
	      level: level,
	    }).save();
		return res.redirect("/coursedirectory/admin");
	}
}

exports.getEditCourse = async (req,res) => {
	const courses = await Course.find({ course_id: req.params.courseid});
	return res.render("admin/AllCourse/edit", { user: req.user, courses_data: courses }); 
}

exports.editCourse = async (req,res) => {
  cou_id = req.body.course_id;
  cou_name = req.body.course_name;
  credits = req.body.credits;
  cou_des = req.body.course_desc;
  instructur = req.body.instructur;
  level = req.body.level;

  const data = {
    course_id: cou_id,
    name: cou_name,
    credits: credits,
    description: cou_des,
    instructur: instructur,
    level: level
  };
  await Course.findOneAndUpdate({course_id: req.params.courseid}, data, {new: true});
  return res.redirect("/coursedirectory/admin");
}

exports.deleteCourse = async (req,res) => {
	// await Course.find({ course_id: req.params.courseid}, function (err, courses) {
	//     courses[0].lecture_notes.forEach( function(file) {
	//       gfs.delete(new mongoose.Types.ObjectId(file._id), (err, data) => {
	//         if (err) return res.status(404).json({ err: err.message });
	//       });
	//     });
	//     courses[0].assignments.forEach( function(file) {
	//       gfs.delete(new mongoose.Types.ObjectId(file._id), (err, data) => {
	//         if (err) return res.status(404).json({ err: err.message });
	//       });
	//     });
 //  });
  	await Course.findOneAndRemove({course_id: req.params.courseid});
    return res.redirect("/coursedirectory/admin");
}

exports.getOneCourseDetails = async (req,res) => {
  const courses = await Course.find({ course_id: req.params.courseid});
  return res.render("admin/home/index", { user: req.user, courses_data: courses });
}

exports.getLectures =  async (req,res) => {
  const courses = await Course.find({ course_id: req.params.courseid});
  return res.render("admin/home/index", { user: req.user, courses_data: courses });
}

exports.getAssignments =  async (req,res) => {
  const courses = await Course.find({ course_id: req.params.courseid});
  return res.render("admin/home/index", { user: req.user, courses_data: courses });
}

exports.getVideos =  async (req,res) => {
  const courses = await Course.find({ course_id: req.params.courseid});
  return res.render("admin/home/index", { user: req.user, courses_data: courses });
}

exports.getFaq =  async (req,res) => {
  const courses = await Course.find({ course_id: req.params.courseid});
  return res.render("admin/home/index", { user: req.user, courses_data: courses });
}

