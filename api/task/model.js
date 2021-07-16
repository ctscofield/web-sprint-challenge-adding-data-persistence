// build your `Task` model here
const db = require('./../../data/dbConfig')

function find() {
  return db('tasks')
}

function add(task) {
  return db('tasks').insert(task)
}

module.exports = {find, add}
