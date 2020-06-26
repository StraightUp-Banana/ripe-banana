const mongoose = require('mongoose');

let d = new Date();
let n = d.getFullYear() + 5;

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
    required: true,
    min: 1900,
    max: n
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

module.exports = mongoose.model('Film', filmSchema);
