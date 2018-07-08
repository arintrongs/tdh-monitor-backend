const express = require('express')
const router = express.Router()
const firebase = require('firebase')
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

router.post('/', async function(req, res, next) {
  const schema = Joi.object().keys({
    uuid: Joi.string().required(),
    jobId: Joi.number().required(),
  })

  const v = Joi.validate({ ...req.body }, schema)

  if (v.error) {
    res.send({ error: '400', message: 'Invalid Payload something is missing!' })
    return null
  }

  const database = firebase.database()

  const jobId = req.body.jobId
  const uuid = req.body.uuid
  const { stdout, stderr } = await exec(`tsp -p ${jobId}`)
  const PID = parseInt(stdout)
  const { stdout: resultOut, stderr: resultError } = await exec(
    `kill -9 ${PID}`
  )
  if (!resultError) {
    await database
      .ref('mail-migration')
      .child(uuid)
      .child('status')
      .set('Killed')
    res.send({ message: 'killed!' })
  } else {
    res.send({ message: 'Something went Wrong!' })
  }
})

module.exports = router
