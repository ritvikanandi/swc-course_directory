const router = require("express").Router();
const passport = require("passport");

// auth login
router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

// auth logout
router.get("/logout", (req, res) => {
  req.logout();
  console.log("Successfully logout!");
  res.redirect("/coursedirectory");
});

// auth with google+
router.get(
  "/outlook",
  passport.authenticate("windowslive", {
    scope: ["openid", "profile", "offline_access"],
  })
);

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get(
  "/outlook/redirect",
  passport.authenticate("windowslive", { failureRedirect: "/coursedirectory" }),
  (req, res) => {
    // res.send(req.user);
    res.redirect("/coursedirectory");
  }
);

module.exports = router;
