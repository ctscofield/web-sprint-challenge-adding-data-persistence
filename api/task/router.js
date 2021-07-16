// build your `/api/projects` router here
const express = require('express')
const Tasks = require('./model')

const router = express.Router()


// `[GET] /api/tasks`
router.get('/', (req, res, next) => {
  Tasks.find()
    .then(tasks => {
      if (!tasks) {
        res.status(404).json({
          message: "can't find task"
        })
      } else {
        res.json(tasks)
      }
    })
    .catch(next)
})

// `[POST] /api/tasks`
router.post('/', (req, res, next) => {
  const {task_description, task_notes, task_completed} = req.body
  console.log(req.body)
  if (task_description === undefined || typeof task_description !== 'string' || !task_description.trim()) {
    res.status(400).json({
      message: "missing task description"
    })
  } else {
    Tasks.add({task_description, task_notes, task_completed})
      .then(({task_id}) => {
        return Tasks.findById(task_id)
      })
      .then(task => {
        res.status(201).json(task)
      })
      .catch(next)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    sageAdvice: 'Finding the real error is 90% of the bug fix',
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;