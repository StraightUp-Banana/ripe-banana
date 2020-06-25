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

  // it('can get an actor by id', async() => {
  //   const actor = prepare(await Actor.findOne().select({ name: true }));

  //   return request(app)
  //     .get(`/api/v1/actors/${actor._id}`)
  //     .then(res => expect(res.body).toEqual({
  //       ...actor,
  //     // films: []
  //     }));
  // });

});