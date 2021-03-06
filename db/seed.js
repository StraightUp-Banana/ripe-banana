const chance = require('chance').Chance();
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Reviewer = require('../lib/models/Reviewer');
const Film = require('../lib/models/Film');
const Review = require('../lib/models/Review');

module.exports = async({ studios = 10, actors = 200, reviewers = 25, films = 50, reviews = 250 } = {}) => {
  const createdStudios = await Studio.create([...Array(studios)].map(() => ({
    name: chance.company(),
    phone: chance.phone({ country: 'us' }),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }
  }))); 

  const createdActors = await Actor.create([...Array(actors)].map(() => ({
    name: chance.name(),
    dob: chance.birthday(),
    pob: chance.country()
  })));

  const createdReviewers = await Reviewer.create([...Array(reviewers)].map(() => ({
    name: chance.name(),
    company: chance.company()
  })));

  const createdFilms = await Film.create([...Array(films)].map(() => ({
    title: chance.suffix() + ' ' + chance.last({ nationality: 'en' }),
    studio: chance.pickone(createdStudios)._id,
    released: chance.year({ min: 1950, max: 2020 }),
    cast: chance.pickset(createdActors, chance.natural({ min: 1, max: 10 }))
      .map(({ _id }) => ({
        actor: _id,
        role: chance.profession({ rank: true })
      }))
  })));

  await Review.create([...Array(reviews)].map(() => ({
    rating: chance.integer({ min: 1, max: 5 }),
    reviewer: chance.pickone(createdReviewers)._id,
    review: chance.sentence({ words: 5 }),
    film: chance.pickone(createdFilms)._id
  })));

};
