require('../db/data-helpers');
const { prepare } = require('../db/data-helpers');
const Reviewer = require('../lib/models/Reviewer');
const request = require('supertest');
const app = require('../lib/app');

describe('reviewer routes', () => {
  it('can make an reviewer', () => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'The Reviewer',
        company: 'Best review company'
      })
      .then(res => expect(res.body).toEqual({
        _id: expect.anything(),
        name: 'The Reviewer',
        company: 'Best review company',
        __v: 0
      }));
  });

  it('can get all reviewers', async() => {
    const reviewers = prepare(await Reviewer.find().select({ name: true, company: true }));

    return request(app)
      .get('/api/v1/reviewers')
      .then(res => expect(res.body).toEqual(reviewers));
  });

  it('can get a reviewer by id', async() => {
    const reviewer = prepare(await Reviewer.findOne().select({ name: true, company: true }));

    return request(app)
      .get(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => expect(res.body).toEqual({
        ...reviewer,
      // reviews: []
      }));
  });

  it('can update reviewers', async() => {
    const reviewer = prepare(await Reviewer.findOne().select({ name: true, company: true }));
    return request(app)
      .patch(`/api/v1/reviewers/${reviewer._id}`)
      .send({
        company: 'my new company'
      })
      .then(res => expect(res.body).toEqual({
        __v: 0,
        _id: expect.anything(),
        name: reviewer.name,
        company: 'my new company'
      // reviews: []
      }));
  });

  it('can throws an error when trying to delete reviewer with reviews', async() => {
    const reviewer = await Reviewer.create({
      name: 'The Reviewer',
      company: 'Best review company'
    });
    return request(app)
      .delete(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => expect(res.body).toEqual({
        message: 'Reviewer has reviews',
        status: 500
      }));
  });


  it('can delete reviewers', async() => {
    const reviewer = prepare(await Reviewer.findOne().select({ name: true, company: true }));
    return request(app)
      .delete(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => expect(res.body).toEqual({
        __v: 0,
        ...reviewer,
      // reviews: []
      }));
  });

});
