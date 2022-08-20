const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
  match: {
    seeker1: id,
    seeker2: id,
    trim: true
  },
  rating: {
    type: integer
  }
});

const Category = mongoose.model('PotentialMatch', potentialSchema);

module.exports = Category;
