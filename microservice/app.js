const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const os = require('os')
const checkDiskSpace = require('check-disk-space')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.get('/', (req, res) => {
  return res.send('Hiiiiiiii')
})

app.get('/status', async (req, res) => {
  try {
    const { free, size } = await checkDiskSpace('/disk')
    const detail = {
      cpu: os.cpus(),
      total_mem: os.totalmem(),
      free_mem: os.freemem(),
      load_avg: os.loadavg(),
      uptime: os.uptime(),
      disk_used: size - free,
      disk_avail: free,
      disk_total: size,
    }
    return res.send(detail)
  } catch (e) {
    console.log(e)
    return res.status(400).send('Something went wrong')
  }
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`)
})
