const mongoose = require('mongoose');

const reviewerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  }
}, {
  toJSON: { virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    } 
  }
});

reviewerSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'reviewer'
});

reviewerSchema.statics.onlyDeleteIfNoReviews = async function(id) {
  const reviews = await this.model('Review').find({ reviewer: id });
  console.log(reviews);
  if(reviews.length === 0) {
    return await this.findByIdAndDelete(id);
  } else {
    throw new Error('Reviewer has reviews');
  }
};

module.exports = mongoose.model('Reviewer', reviewerSchema);
