const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  city: String,
  state: String,
  country: String
});

const studioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: { addressSchema }
  }
}, { 
  toJSON: { virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    } 
  }
});

studioSchema.virtual('films', {
  ref: 'Film',
  localField: '_id',
  foreignField: 'studio'
});


module.exports = mongoose.model('Studio', studioSchema);
