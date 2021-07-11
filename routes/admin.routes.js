const express = require("express");
const router = express.Router();
const adminCourseCont = require("../controllers/admin.controller");
const middleware = require("../middleware/index");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/professorImages");
  },
  filename: (req, file, cb) => {
    const fileName1 = req.user.email + ".jpg";
    const fileName = fileName1.replace(/\s/g, "");
    console.log(fileName);
    console.log("nkk");
    console.lo;
    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });
router.get(
  "/",
  middleware.isLoggedIn,
  middleware.isAdmin,
  middleware.isProfessor,
  adminCourseCont.getCourses
);
router.get(
  "/professor/profile",
  middleware.isLoggedIn,
  middleware.isAdmin,

  adminCourseCont.getProfForm
);
router.post(
  "/professor/profile",
  middleware.isLoggedIn,
  middleware.isAdmin,
  upload.single("image"),
  adminCourseCont.postProfessor
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
