require('../db/data-helpers');
const Studio = require('../lib/models/Studio');
const request = require('supertest');
const app = require('../lib/app');

describe('my studio routes', () => {
  it('can add a studio', () => {
    return request(app)
      .post('/api/v1/studios')
      .send({ 
        name: 'The studio',
        phone: '555 555 5555',
        address: {
          city: 'Portland',
          state: 'OR',
          country: 'US'
        }
      })
      .then(res => expect(res.body).toEqual({
        _id: expect.anything(),
        name: 'The studio',
        phone: '555 555 5555',
        address: {
          city: 'Portland',
          state: 'OR',
          country: 'US'
        },
        __v: 0
      }));
  });
});
