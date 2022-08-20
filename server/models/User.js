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
    type: Int,
    required: true,
  },
  height: {
    type: String,
    required: true
  },
  weight: {
    type: Int,
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
    wishgen:{
      type: String,
      required: true
    },
    minage: {
      type: Int,
      required: false
    },
    maxage: {
      type: Int,
      required: false
    },
    minheight: {
      type: String,
      required: true
    },
    maxheight: {
      type: String,
      required: true
    },
    minweight: {
      type: String,
      required: true
    },
    maxweight: {
      type: String,
      required: true
    },
    wisheye: {
      type: String,
      required: true
    },
    wishhair: {
      type: String,
      required: true
    },
      potentialmatches: [PotentialMatch.schema]

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
