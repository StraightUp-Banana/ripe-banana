const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reviewer',
    required: true
  },
  review: {
    type: String,
    maxlength: 140,
    required: true
  },
  film: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Film',
    required: true
  }
});

reviewSchema.statics.getTopReviews = function() {
  return this.aggregate(
    [
      {
        '$sort': {
          'rating': -1
        }
      }, {
        '$limit': 100
      }
    ]
  );
};

module.exports = mongoose.model('Review', reviewSchema);
