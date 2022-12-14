const mongoose = require("mongoose");

const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
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
  profile_specified: {
    type: Boolean,
    required: true,
  },
  gender: {
    type: String,
  },
  age: {
    type: Number,
  },
  height: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  eyes: {
    type: String,
  },
  hair: {
    type: String,
  },
  aboutMe: {
    type: String,
  },
  contactInfo: {
    type: String,
  },
  /* Wish List */
  wishlist_specified: {
    type: Boolean,
    required: true,
  },
  wishgen_male: {
    type: Boolean,
  },
  wishgen_female: {
    type: Boolean,
  },
  wishgen_nonbinary: {
    type: Boolean,
  },

  minage: {
    type: Number,
  },
  maxage: {
    type: Number,
  },
  minheight: {
    type: Number,
  },
  maxheight: {
    type: Number,
  },
  minweight: {
    type: Number,
  },
  maxweight: {
    type: Number,
  },
  wisheye_brown: {
    type: Boolean,
  },
  wisheye_blue: {
    type: Boolean,
  },
  wisheye_gray: {
    type: Boolean,
  },
  wisheye_green: {
    type: Boolean,
  },
  wisheye_hazel: {
    type: Boolean,
  },
  wishhair_black: {
    type: Boolean,
  },
  wishhair_brown: {
    type: Boolean,
  },
  wishhair_blond: {
    type: Boolean,
  },
    wishhair_red: {
    type: Boolean,
  },
  paid: {
    type: Boolean,
    required: true,
  },
  match_found: {
    type: Boolean,
    required: true,
  },
  found_match: {
    type: Schema.Types.ObjectId,
    ref: "User",
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
