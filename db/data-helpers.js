require('dotenv').config();

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');
const seed = require('./seed');

const request = require('supertest');
const app = require('../lib/app');

beforeAll(async() => {
  const uri = await mongod.getUri();
  return connect(uri);
});

beforeEach(() => {
  return mongoose.connection.dropDatabase();
});

beforeEach(() => {
  return seed();
});

let agent = request.agent(app);
beforeEach(async() => {
  // agent
});

afterAll(async() => {
  await mongoose.connection.close();
  return mongod.stop();
});

module.exports = {
  agent
};
