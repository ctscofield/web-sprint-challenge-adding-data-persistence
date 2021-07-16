// build your `Project` model here
const db = require('./../../data/dbConfig')

function find() {
  return db('resources as r')
}

function add(resource) {
  return db('resources').insert(resource)
}

module.exports = {find, add}
