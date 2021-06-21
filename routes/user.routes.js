const express = require("express");
const router = express.Router();
const { isAdmin, isLoggedIn } = require("../middleware");

const usercontroller = require("../controllers/user.controller");

router.get("/", usercontroller.getHomePage);
router.post("/", usercontroller.showSearch);
router.get("/citation", isLoggedIn, usercontroller.getCitationPage);

router.post("/citation", isLoggedIn, usercontroller.postcitereq);

router.get("/ask", usercontroller.getAskQueryPage);

router.post("/ask", isLoggedIn, usercontroller.postQuery);
router.post("/contribute", isLoggedIn, usercontroller.postContribute);
router.get("/contribute", isLoggedIn, usercontroller.getContributePage);

router.get("/mylearning", isLoggedIn, usercontroller.getMyLearningPage);
router.get("/course", isLoggedIn, usercontroller.getCoursePage);
router.get("/course/:courseid", isLoggedIn, usercontroller.getOneCoursePage);
router.get(
  "/course/:courseid/professor",
  isLoggedIn,
  usercontroller.professorPage
);

module.exports = router;
