require('dotenv').config();
require('./lib/utils/connect')();

const app = require('./lib/app');

const PORT = process.env.PORT || 7890;

// uncomment to seed data
const seed = require('./db/seed');
seed();

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on ${PORT}`);
});
