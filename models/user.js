const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  accessToken: { type: String, required: true, select: false },
  outlookId: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
