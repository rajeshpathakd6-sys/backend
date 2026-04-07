const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: String,
    email: String,
    brand: String,
    collab_type: String,
    idea: String,
    resume: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Work", schema);
