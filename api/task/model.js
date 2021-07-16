// build your `Task` model here
const db = require('./../../data/dbConfig')

function find() {
  return db('tasks as t')
    .leftJoin('projects as p', 'p.project_id', 't.project_id')
    .select('t.*', 'p.project_name', 'p.project_description')
}

async function add(task) {
  const [task_id] = await db('tasks').insert(task)
  console.log(task_id)
  return find().where({ task_id }).first()
}

async function findById(task_id) {
  const rows = await db('tasks as t')
    .where('task_id', task_id)
    .leftJoin('projects as p', 'p.project_id', 't.project_id')
    .select('t.*', 'p.project_name', 'p.project_description')

  const result = {
    task_id: rows[0].task_id,
    task_description: rows[0].task_description,
    task_notes: rows[0].task_notes,
    task_completed: rows[0].task_completed,
    projects: []
  }
  rows.forEach(row => {
    if (row.project_id) {
      result.projects.push({
        project_id: row.project_id,
        project_name: row.project_name,
        project_description: row.project_description
      })
    }
  })
  return result
}

module.exports = {find, add, findById}
