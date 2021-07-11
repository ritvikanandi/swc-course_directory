const Professor = require("../models/professor");
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.status(401).json({
      status: "Not authenticated",
      msg: "You are not authenticated !",
    });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    return next();
  } else {
    return res.status(401).json({
      status: "Not authorized",
      msg: "You are not authorized !",
    });
  }
};

const isProfessor = async (req, res, next) => {
  const professor = await Professor.findOne({ email: req.user.email });
  if (professor) {
    return next();
  } else {
    return res.redirect("/coursedirectory/admin/professor/profile");
  }
};
module.exports = { isLoggedIn, isAdmin, isProfessor };
