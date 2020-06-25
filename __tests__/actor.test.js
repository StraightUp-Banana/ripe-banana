require('../db/data-helpers');
const { prepare } = require('../db/data-helpers');
const chance = require('chance').Chance();
const Actor = require('../lib/models/Actor');
const request = require('supertest');
const app = require('../lib/app');

describe('actor routes', () => {
  it('can make an actor', () => {
    const date = chance.birthday();
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'The Actor',
        dob: date,
        pob: 'Here'
      })
      .then(res => expect(res.body).toEqual({
        _id: expect.anything(),
        name: 'The Actor',
        dob: new Date(date).toISOString(),
        pob: 'Here',
        __v: 0
      }));
  });

  it('can get all actors', async() => {
    const actors = prepare(await Actor.find().select({ name: true }));

    return request(app)
      .get('/api/v1/actors')
      .then(res => expect(res.body).toEqual(actors));
  });

  it('can get an actor by id', async() => {
    const actor = prepare(await Actor.findOne().select({ name: true }));

    return request(app)
      .get(`/api/v1/actors/${actor._id}`)
      .then(res => expect(res.body).toEqual({
        ...actor,
      // films: []
      }));
  });

});
