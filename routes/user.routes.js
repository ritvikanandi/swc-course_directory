const express = require("express");
const router = express.Router();
const { isAdmin, isLoggedIn } = require("../middleware");

const usercontroller = require("../controllers/user.controller");

router.get("/", (req, res) => {
  res.render("user/home", { user: req.user });
});

router.get("/citation", isLoggedIn, (req, res) => {
  res.render("user/citation", { user: req.user });
});

router.post("/citation", usercontroller.postcitereq);
router.get("/ask", (req, res) => {
  res.render("user/askQuery", { user: req.user });
});
router.post("/ask", usercontroller.postQuery);
router.get("/contribute", (req, res) => {
  res.render("user/contribute", { user: req.user });
});

router.get("/mylearning", (req, res) => {
  res.render("user/mylearning", { user: req.user });
});

module.exports = router;
