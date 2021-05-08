const router = require("express").Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect("coursedirectory/auth/login");
  } else {
    next();
  }
};

router.get("/coursedirectory", authCheck, (req, res) => {
  if (req.user.isAdmin) {
    res.render("/coursedirectory", { user: req.user });
  } else {
    res.redirect("/coursedirectory", { user: req.user });
  }
});

module.exports = router;
