// build your `/api/resources` router here
const express = require('express')
const Resources = require('./model')

const router = express.Router()

// `[GET] /api/resources`
router.get('/', (req, res, next) => {
  Resources.find()
    .then(resources => {
      res.json(resources)
    })
    .catch(next)
})


// `[POST] /api/resources`
router.post('/', (req, res, next) => {
  const {resource_name, resource_description} = req.body
  if (!resource_name) {
    res.status(400).json({message: "missing name of resource"})
  } else {
    Resources.add({resource_name, resource_description})
      .then(({resource_id}) => {
        return Resources.findById(resource_id)
      })
      .then(resource => {
        res.status(201).json(resource)
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

module.exports = router