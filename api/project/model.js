// build your `Project` model here
const db = require('./../../data/dbConfig')

function find() {
  return db('projects as p')
    .select('p.*')
}

async function add(project) {
  const [project_id] = await db('projects').insert(project)
  return find().where({ project_id }).first()
}

function findById(project_id) {
  return db('projects as pr')
    .where('project_id', project_id)
    .select('pr.*')
}

module.exports = {find, add, findById}
