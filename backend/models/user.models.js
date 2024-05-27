const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please add a name"],
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Please add an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please ass a valid email",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Please add a password"],
      minlength: [6, "Password must have at least six(6) characters"],
      match: [
        /^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]+$/,
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special character",
      ],
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model("User", userSchema);
