const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "The username is required"],
    },
    email: {
      type: String,
      required: [true, "The email is required"],
      unique: [true, "This email is already on our database"],
    },
    password: {
      type: String,
      require: [true, "THe password is required"],
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("User", userSchema);
