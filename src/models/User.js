const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    minLength: [5, "username is too short"],
    match: [/^[A-Za-z0-9]+$/, "user is not with english letters and digits"],
    unqiue: {
      value: true,
      message: "username alredy exists",
    },
  },
  password: {
    type: String,
    minLength: [8, "password is too short"],
    validate: {
      validator: function (value) {
        return /^[A-Za-z0-9]+$/.test(value);
      },
      message: "password is not with english leeter and digits",
    },
  },
});

userSchema.path('username').validate(function(username) {
    const user = mongoose.model('User').findOne(username)
    return !!user;
},'username already exists')

//!TODO:if user already exist throw error
userSchema.virtual("repeatPassword").set(function (value) {
  if (value !== this.password) {
    throw new Error("password missmatch");
  }
});

userSchema.pre("save", async function () {
  //                             word         salt rounds()
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
