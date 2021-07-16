// build your `Resource` model here

const db = require('./../../data/dbConfig')

function find() {
  return db('resources as r')
    .select('r.*')
}

async function add(resource) {
  const [resource_id] = await db('resources').insert(resource)
  return find().where({ resource_id}).first()
}

function findById(resource_id) {
  return db('resources as r')
    .where('resource_id', resource_id)
    .select('r.*')
}

module.exports = {find, add, findById}
