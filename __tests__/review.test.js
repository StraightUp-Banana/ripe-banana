require('../db/data-helpers');
const { prepare } = require('../db/data-helpers');
const Film = require('../lib/models/Film');
const Reviewer = require('../lib/models/Reviewer');
const Review = require('../lib/models/Review');
const request = require('supertest');
const app = require('../lib/app');

describe('review routes', () => {
 
  it('can make a new review', async() => {
    const film = prepare(await Film.findOne().populate('studio', { name: true }).populate('cast.actor', { name: true }));
    const reviewer = prepare(await Reviewer.findOne().select({ name: true, company: true }));

    return request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 2,
        reviewer: reviewer._id,
        review: 'This movie was ok',
        film: film._id
      })
      .then(res => expect(res.body).toEqual({
        _id: expect.anything(),
        rating: 2,
        reviewer: reviewer._id,
        review: 'This movie was ok',
        film: film._id,
        __v: 0
      }));
  });

  it('can get the top 100 reviews', async() => {
    const reviews = prepare(await Review.find()
      .populate('reviewer', { _id: true, name: true })
      .populate('film', { _id: true, title: true })
      .sort({ rating: -1 })
      .limit(100));
  
    return request(app)
      .get('/api/v1/reviews')
      .then(res => {
        expect(res.body).toHaveLength(100);
        expect(res.body).toEqual(reviews);
      });
  });

  it('can delete a review', async() => {
    const review = prepare(await Review.findOne());
    return request(app)
      .delete(`/api/v1/reviews/${review._id}`)
      .then(res => {
        expect(res.body).toEqual(review);
      });
  });
});
