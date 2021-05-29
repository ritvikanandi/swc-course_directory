const express = require("express");
const router = express.Router();
const adminCourseCont = require("../controllers/admin.controller");
const middleware = require("../middleware/index");

router.get(
  "/",
  middleware.isLoggedIn,
  middleware.isAdmin,
  adminCourseCont.getCourses
);
router.get(
  "/add",
  middleware.isLoggedIn,
  middleware.isAdmin,
  adminCourseCont.getAddCourse
);
router.post(
  "/add",
  middleware.isLoggedIn,
  middleware.isAdmin,
  adminCourseCont.postAddCourse
);
router.get(
  "/:courseid/edit",
  middleware.isLoggedIn,
  middleware.isAdmin,
  adminCourseCont.getEditCourse
);
router.put(
  "/:courseid/edit",
  middleware.isLoggedIn,
  middleware.isAdmin,
  adminCourseCont.editCourse
);
router.delete(
  "/:courseid/edit",
  middleware.isLoggedIn,
  middleware.isAdmin,
  adminCourseCont.deleteCourse
);

router.get(
  "/:courseid/home",
  middleware.isLoggedIn,
  middleware.isAdmin,
  adminCourseCont.getOneCourseDetails
);

module.exports = router;
