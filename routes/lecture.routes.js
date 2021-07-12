const express = require("express");
const router = express.Router({ mergeParams: true });
const { isAdmin, isLoggedIn } = require("../middleware");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/lectures");
  },
  filename: (req, file, cb) => {
    const fileName1 = req.params.courseid + req.body.name + ".pdf";
    const fileName = fileName1.replace(/\s/g, "");
    cb(null, fileName);
  },
});
const lectureController = require("../controllers/lecture.controller");
const upload = multer({ storage: storage });

router.get("/", isLoggedIn, isAdmin, lectureController.getLectures);

router.post(
  "/",
  isLoggedIn,
  isAdmin,
  lectureController.searchLecture
);

router.get("/add", isLoggedIn, isAdmin, lectureController.addLectureForm);

router.post(
  "/add",
  isLoggedIn,
  isAdmin,
  upload.single("lecture"),
  lectureController.postLecture
);

router.get("/:lectureid", isLoggedIn, isAdmin, lectureController.getEditForm);

router.put(
  "/:lectureid",
  isLoggedIn,
  isAdmin,
  upload.single("lecture"),
  lectureController.postEditForm
);

router.delete(
  "/:lectureid",
  isLoggedIn,
  isAdmin,
  lectureController.deleteLecture
);

router.get(
  "/pdf/:lectureid",
  isLoggedIn,
  isAdmin,
  lectureController.getOneLecture
);

module.exports = router;
