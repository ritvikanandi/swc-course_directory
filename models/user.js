const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  outlookID: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
