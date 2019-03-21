require('dotenv').config();

const mongoose = require('mongoose');

const {DATABASE_URL} = require('../config');

const {quotes} = require('./quotes-data');

mongoose.connect(DATABASE_URL, {useNewUrlParser:true})
  .then(() => {
    console.info('dropping database')
    mongoose.connection.db.dropDatabase()
  })
  .then(() => mongoose.connection.db.collection('quotes').insertMany(quotes))
  .then(results => {
    console.info(`Inserted ${results.insertedCount} quotes`);
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error(err);
  });