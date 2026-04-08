const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    brand: {
      type: String,
      trim: true,
    },
    collab_type: {
      type: String,
      trim: true,
    },
    idea: {
      type: String,
      trim: true,
    },
    resume: {
      type: String, // store file URL or filename
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("WorkWithUs", schema);
