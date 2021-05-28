exports.isLoggedIn = function (req, res, next) {
  if (req.user) {
    return next();
  }
  console.log("You need to login first");
  return res.redirect("/coursedirectory");
};

exports.isAdmin = function (req, res, next) {
  if (req.user.isAdmin) {
    console.log("You are authorized");
    return next();
  }
  console.log("info", "You are unauthorized!");
  //req.logout();
  return res.redirect("/coursedirectory");
};
