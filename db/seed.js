const chance = require('chance').Chance();
const Studio = require('../lib/models/Studio');

module.exports = async({ studios = 17 } = {}) => {
  const createdStudios = await Studio.create([...Array(studios)].map(() => ({
    name: chance.company(),
    phone: chance.phone({ country: 'us' }),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }
  }))); 

};
