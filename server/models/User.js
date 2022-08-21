const mongoose = require("mongoose");

const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  matchmaker: {
    type: Boolean,
    required: true,
  },
  /* Profile */
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  eyes: {
    type: String,
    required: true,
  },
  hair: {
    type: String,
    required: true,
  },
  aboutMe: {
    type: String,
    required: true,
  },
  contactInfo: {
    type: String,
    required: true,
  },
  /* Wish List */
  wishgen_male: {
    type: Boolean,
    required: true,
  },
  wishgen_female: {
    type: Boolean,
    required: true,
  },
  minage: {
    type: Number,
    required: false,
  },
  maxage: {
    type: Number,
    required: false,
  },
  minheight: {
    type: String,
    required: true,
  },
  maxheight: {
    type: String,
    required: true,
  },
  minweight: {
    type: String,
    required: true,
  },
  maxweight: {
    type: String,
    required: true,
  },
  wisheye_brown: {
    type: Boolean,
    required: true,
  }, 
  wisheye_blue: {
    type: Boolean,
    required: true,
  },
  wishhair_dark: {
    type: Boolean,
    required: true,
  },
  wishhair_blond: {
    type: Boolean,
    required: true,
  },
  wishhair_red: {
    type: Boolean,
    required: true,
  },
});

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
