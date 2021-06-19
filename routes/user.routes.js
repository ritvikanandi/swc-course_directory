const express = require("express");
const router = express.Router();
const { isAdmin, isLoggedIn } = require("../middleware");

const usercontroller = require("../controllers/user.controller");

router.get("/", (req, res) => {
  res.render("user/index", { user: req.user });
});

router.get("/citation", isLoggedIn, (req, res) => {
  res.render("user/citation", { user: req.user });
});

router.post("/citation", isLoggedIn, usercontroller.postcitereq);
router.get("/ask", (req, res) => {
  res.render("user/askQuery", { user: req.user });
});
router.post("/ask",isLoggedIn,  usercontroller.postQuery);
router.post("/contribute",isLoggedIn,  usercontroller.postContribute);
router.get("/contribute",isLoggedIn,  (req, res) => {
  res.render("user/contribute", { user: req.user });
});

router.get("/mylearning",isLoggedIn,  (req, res) => {
  res.render("user/mylearning", { user: req.user });
});

module.exports = router;
