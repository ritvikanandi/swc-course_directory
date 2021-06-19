const express = require("express");
const router = express.Router();
const { isAdmin, isLoggedIn } = require("../middleware");

const usercontroller = require("../controllers/user.controller");

router.get("/", usercontroller.getHomePage);
router.get("/citation", isLoggedIn, usercontroller.getCitationPage);

router.post("/citation", isLoggedIn, usercontroller.postcitereq);

router.get("/ask", usercontroller.getAskQueryPage);

router.post("/ask", isLoggedIn, usercontroller.postQuery);
router.post("/contribute", isLoggedIn, usercontroller.postContribute);
router.get("/contribute", isLoggedIn, usercontroller.getContributePage);

router.get("/professor", isLoggedIn, (req, res) => {
  res.render("user/profpage", { user: req.user });
});
router.get("/mylearning", isLoggedIn, usercontroller.getMyLearningPage);
router.get("/course", isLoggedIn, usercontroller.getCoursePage);
router.get("/:courseid", isLoggedIn, usercontroller.getOneCoursePage);


module.exports = router;
