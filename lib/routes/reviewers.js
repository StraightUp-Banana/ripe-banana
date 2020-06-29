const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()
  .post('/', (req, res, next) => {
    Reviewer
      .create(req.body)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Reviewer
      .find(req.query)
      .select({ name: true, company: true })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Reviewer
      .findById(req.params.id)
      // .select({ name: true, company: true })
      .populate('reviews', {
        rating: true,
        review: true,
        film: true
      })
      .populate('reviews.film', {
        title: true
      })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Reviewer
      .findOneAndUpdate(
        { _id: req.params.id },
        { company: req.body.company },
        { new: true }
      )
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Reviewer
      // only delete if there are no reviews
      .onlyDeleteIfNoReviews(req.params.id)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  });
