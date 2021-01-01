const router = require("express").Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect("/auth/login");
  } else {
    next();
  }
};

router.get("/", authCheck, (req, res) => {
  if (req.user.admin) {
    res.render("profile", { user: req.user });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
