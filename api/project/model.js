// build your `Project` model here
const db = require('./../../data/dbConfig')

function find() {
  return db('projects as p')
}

function add(project) {
  return db('projects').insert(project)
}

module.exports = {find, add}
