const { UserInputError } = require('apollo-server-express');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  
  Match: {
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
      type: integer
    }
  }
});

const Category = mongoose.model('PotentialMatch', potentialSchema);

module.exports = Category;
