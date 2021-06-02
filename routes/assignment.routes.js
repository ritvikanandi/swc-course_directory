const express = require("express");
const router = express.Router({ mergeParams: true });
const { isAdmin, isLoggedIn } = require("../middleware");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/assignments");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.replace(/\s/g, "");
    cb(null, Date.now().toString() + fileName);
  },
});
const assignmentController = require("../controllers/assignment.controller");
const upload = multer({ storage: storage });

router.get("/", isLoggedIn, isAdmin, assignmentController.getAssignments);

router.get("/add", isLoggedIn, isAdmin, assignmentController.addAssignmentForm);

router.post(
  "/",
  isLoggedIn,
  isAdmin,
  upload.single("assignment"),
  assignmentController.postAssignment
);

router.get("/:assignmentid", assignmentController.getEditForm);

router.put(
  "/:assignmentid",
  upload.single("assignment"),
  assignmentController.postEditForm
);

router.delete("/:assignmentid", assignmentController.deleteAssignment);

router.get("/pdf/:assignmentid", assignmentController.getOneAssignment);

module.exports = router;
