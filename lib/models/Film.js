const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
  role: {
    type: String
  },
  actor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Actor',
    required: true,
  }
});

const filmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  studio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Studio',
    required: true,
  },
  released: {
    type: Number,
    required: true
  },
  cast: {
    type: [castSchema]
  }
}, { 
  toJSON: { virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    } 
  }
});

filmSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'film'
});

module.exports = mongoose.model('Film', filmSchema);
