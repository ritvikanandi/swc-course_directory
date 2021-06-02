const express = require("express");
const router = express.Router({ mergeParams: true });
const { isAdmin, isLoggedIn } = require("../middleware");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/lectures");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.replace(/\s/g, "");
    cb(null, Date.now().toString() + fileName);
  },
});
const lectureController = require("../controllers/lecture.controller");
const upload = multer({ storage: storage });

router.get("/", isLoggedIn, isAdmin, lectureController.getLectures);

router.get("/add", isLoggedIn, isAdmin, lectureController.addLectureForm);

router.post(
  "/",
  isLoggedIn,
  isAdmin,
  upload.single("lecture"),
  lectureController.postLecture
);

router.get("/:lectureid", lectureController.getEditForm);

router.put(
  "/:lectureid",
  upload.single("lecture"),
  lectureController.postEditForm
);

router.delete("/:lectureid", lectureController.deleteLecture);

router.get("/pdf/:lectureid", lectureController.getOneLecture);

module.exports = router;
