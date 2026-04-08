const mongoose = require("mongoose");
const crypto = require("crypto");

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    isSubscribed: {
      type: Boolean,
      default: true,
    },
    unsubscribeToken: {
      type: String,
      unique: true,
      default: () => crypto.randomBytes(32).toString("hex"),
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Newsletter", schema);
