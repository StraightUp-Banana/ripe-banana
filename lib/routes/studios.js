const { Router } = require('express');
const Studio = require('../models/Studio');

module.exports = Router()
  .post('/', (req, res, next) => {
    Studio
      .create(req.body)
      .then(studio => res.send(studio))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Studio
      .find(req.query)
      .select({ name: true })
      .then(studio => res.send(studio))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Studio
      .findById(req.params.id)
      .select({ name: true, address: true })
      //.populate('films')
      .then(studio => res.send(studio))
      .catch(next);
  });
