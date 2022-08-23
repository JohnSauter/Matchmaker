const { UserInputError } = require('apollo-server-express');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const PotentialSchema = new Schema({
  User1: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  User2: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: true
  },
  rated: {
    type: Boolean,
    required: true,
  }
});

const PotentialMatch = mongoose.model('PotentialMatch', PotentialSchema);

module.exports = PotentialMatch;
