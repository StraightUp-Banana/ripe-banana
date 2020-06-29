const { Router } = require('express');
const Review = require('../models/Review');

module.exports = Router()
  .post('/', (req, res, next) => {
    Review
      .create(req.body)
      .then(review => res.send(review))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Review
      .find(req.query)
      .populate('reviewer', { _id: true, name: true })
      .populate('film', { _id: true, title: true })
      .sort({ rating: -1 })
      .limit(100)
      .then(films => res.send(films))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Review
      .findById(req.params.id)
      .then(review => res.send(review))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Review
      .findByIdAndDelete(req.params.id)
      .then(review => res.send(review))
      .catch(next);
  });


