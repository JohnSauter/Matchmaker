const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const PotentialMatch = require('./PotentialMatch');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  gender: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
  },
  height: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  eyes: {
    type: String,
    required: true
  },
  hair: {
    type: String, 
    required: true
  },
  likes:{
    type: String,
    required: true
  },
  dislikes:{
    type: String,
    required: true
  },
    wishGen:{
      type: String,
      required: true
    },
    minAge: {
      type: Number,
      required: false
    },
    maxAge: {
      type: Number,
      required: false
    },
    minHeight: {
      type: String,
      required: true
    },
    maxHeight: {
      type: String,
      required: true
    },
    minWeight: {
      type: String,
      required: true
    },
    maxWeight: {
      type: String,
      required: true
    },
    wishEye: {
      type: String,
      required: true
    },
    wishHair: {
      type: String,
      required: true
    },
      potentialMatches: [PotentialMatch.schema]

});

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
