// build your `/api/projects` router here
const express = require('express')
const Projects = require('./model')

const router = express.Router()


// `[GET] /api/projects`
router.get('/', (req, res, next) => {
  Projects.find()
    .then(projects => {
      res.json(projects)
    })
    .catch(next)
})

// `[POST] /api/projects`
router.post('/', (req, res, next) => {
  const { project_name, project_description, project_completed} = req.body
  if (!project_name) {
    res.status(400).json({
      message: "missing project name"
    })
  } else {
    Projects.add({project_name, project_description, project_completed})
      .then(({project_id}) => {
        return Projects.findById(project_id)
      })
      .then(project => {
        res.status(201).json(project)
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