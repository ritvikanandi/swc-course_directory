const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  topic: { type: String, required: true },
  askto: { type: String, required: true },
  query: { type: String, required: true },
});

module.exports = mongoose.model("query", querySchema);
