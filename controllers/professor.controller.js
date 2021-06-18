const Professor = require("../models/professor");

exports.getprofessors = async (req, res) => {
  try {
    const professors = await Professor.find();
    res.render("admin/professor/index", { user: req.user, professors });
  } catch (error) {
    console.log(error.message);
  }
};
