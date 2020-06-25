const chance = require('chance').Chance();
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');

module.exports = async({ studios = 17, actors = 25 } = {}) => {
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

};
