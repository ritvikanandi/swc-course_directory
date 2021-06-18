const Citation = require("../models/citation");
const Query = require("../models/query");
const Contribute = require("../models/contribute");
exports.postcitereq = async (req, res) => {
  try {
    const name = req.user.username;
    const email = req.user.outlookID;
    const { course_name, professor, reason } = req.body;
    const newCitation = await new Citation({
      name,
      email,
      course_name,
      professor,
      reason,
    }).save();
    if (!newCitation) {
      console.log("not saved");
    } else {
      console.log("Successfully requested");
    }
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
};

exports.postQuery = async (req, res) => {
  try {
    const name = req.user.username;
    const email = req.user.outlookID;
    const { topic, askto, query } = req.body;
    const newQuery = await new Query({
      name,
      email,
      topic,
      askto,
      query,
    }).save();
    if (!newQuery) {
      console.log("not saved");
    } else {
      console.log("Query Successfully Submitted");
    }
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

exports.postContribute = async (req, res) => {
  try {
    const name = req.user.username;
    const email = req.user.outlookID;
    const { course_name, topic, link, description } = req.body;
    const newContribute = await new Contribute({
      name,
      email,
      topic,
      course_name,
      link,
      description,
    }).save();
    if (!newContribute) {
      console.log("not saved");
    } else {
      console.log("Contribution Successfully Submitted");
    }
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};
