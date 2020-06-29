require('../db/data-helpers');
const { prepare } = require('../db/data-helpers');
const chance = require('chance').Chance();
const Film = require('../lib/models/Film');
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const request = require('supertest');
const app = require('../lib/app');

describe('the film routes', () => {

  let studio, actor;
  beforeEach(async() => {
    studio = prepare(await Studio.findOne().select({ _id: true }));
    actor = prepare(await Actor.findOne().select({ _id: true }));
  });

  it('can create a film', () => {
    return request(app)
      .post('/api/v1/films')
      .send({
        title: 'Dune',
        studio: studio._id,
        released: 2020,
        cast: [{
          role: 'Director',
          actor: actor._id
        }]
      })
      .then(res => expect(res.body).toEqual({
        _id: expect.anything(),
        title: 'Dune',
        studio: studio._id,
        released: 2020,
        cast: [{
          _id: expect.anything(),
          role: 'Director',
          actor: actor._id
        }],
        __v: 0
      }));
  });
  it('can get all films', async() => {
    const films = prepare(await Film.find().select({ title: true, released: true,
      studio: true }).populate('studio', { name: true }));

    return request(app)
      .get('/api/v1/films')
      .then(res => expect(res.body).toEqual(films));
  });
  it('can get a film by id with studio and cast', async() => {
    const film = prepare(await Film.findOne()
      .populate('studio', { name: true })
      .populate('cast.actor', { name: true })
      .populate({
        path: 'reviews',
        select: {
          rating: true,
          review: true,
          reviewer: true
        },
        populate: {
          path: 'reviewer',
          select: {
            name: true
          }
        }
      }));

    return request(app)
      .get(`/api/v1/films/${film._id}`)
      .then(res => expect(res.body).toEqual(
        film
      ));
  });
});
