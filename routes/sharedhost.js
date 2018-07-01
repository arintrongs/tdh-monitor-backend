const util = require('util')
const exec = util.promisify(require('child_process').exec)

var express = require('express')
var router = express.Router()

async function get_everything() {
  let server = ['01', '03', '05', '07', '09', '11', '13', '15']
  let load = []
  var i

  for (i = 0; i < server.length; i++) {
    try {
      let temp = ''
      var { stdout, stderr } = await exec(
        'curl cloud-linux' +
          server[i] +
          '.thaidatahosting.com/than-status | grep -oP "((?<=Server load: ).*(?=<))|((?<=Total accesses: ).*(?= -))"'
      )
      temp += stdout
      var { stdout, stderr } = await exec(
        'curl cloud-linux' + server[i] + '.thaidatahosting.com/uptime.txt'
      )
      temp += stdout
      load.push('Cloud-linux' + server[i] + ' ' + temp)
    } catch (err) {
      load.push('Error!')
    }
  }
  return load
}
router.get('/', async function(req, res, next) {
  let load = await get_everything()
  res.send({ status: load })
  console.log(load)
})

module.exports = router
