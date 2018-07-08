const express = require('express')
const router = express.Router()
const firebase = require('firebase')
const moment = require('moment')
const uuidv4 = require('uuid/v1')
const Joi = require('joi')
const { promisify } = require('util')
const exec = promisify(require('child_process').exec)
const config = {
  apiKey: 'AIzaSyDIpabXAOtnYE0XFMz4hSzhBj7v_fFzrxc',
  authDomain: 'tdh-monitor.firebaseapp.com',
  databaseURL: 'https://tdh-monitor.firebaseio.com',
  projectId: 'tdh-monitor',
  storageBucket: 'tdh-monitor.appspot.com',
  messagingSenderId: '1029367526620',
}
firebase.initializeApp(config)

router.post('/', async function(req, res, next) {
  const schema = Joi.object().keys({
    user: Joi.string().required(),
    subject: Joi.string().required(),
    origin_host: Joi.string().required(),
    destination_host: Joi.string().required(),
    file: Joi.any().required(),
  })

  const result = Joi.validate({ ...req.body, file: req.files.file }, schema)

  if (result.error) {
    res.send({ error: '400', message: 'Invalid Payload something is missing!' })
    return null
  }

  const file = req.files.file
  const database = firebase.database()
  const uuid = uuidv4()
  const originHost = req.body.origin_host
  const destinationHost = req.body.destination_host

  await file.mv(`${__dirname}/user.txt`)
  const jobId = await exec(
    `tsp node ${__dirname}/status.js ` +
      `${uuid} ${originHost} ${destinationHost}`
  )

  database.ref('mail-migration/' + uuid).set({
    username: req.body.user,
    subject: req.body.subject,
    status: 'In Queued',
    date: moment()
      .utc()
      .toString(),
    timestamp: Date.now(),
    jobId: null,
  })
  res.send({ message: 'Done!!' })
})

module.exports = router
