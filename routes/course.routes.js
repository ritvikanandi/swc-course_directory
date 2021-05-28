const express = require("express");
const router = express.Router();
const courseCont = require("../controllers/course.controller");

router.get("/", courseCont.getCourses);
router.get("/:courseid", courseCont.getCourseContent);
router.get("/:courseid/syllabus", courseCont.getSyllabus);
router.get("/:courseid/lecture-videos", courseCont.getLectureVideos);
router.get("/:courseid/lecture-notes", courseCont.getLectureNotes);
router.get("/:courseid/assignments", courseCont.getAssignments);
router.get("/:courseid/faq", courseCont.getFaq);

module.exports = router;