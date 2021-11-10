const express = require('express')
const app = express()
const port = 3050

const writes = [
  {
    author: 'jaeger-dvlp',
    content: 'Lorem ipsum dolor sit amet',
    date: '01/01/2021',
    time: '00:00'
  },
  {
    author: 'jaeger-dvlp',
    content: 'Lorem ipsum dolor sit amet',
    date: '01/01/2021',
    time: '00:00'
  },
  {
    author: 'jaeger-dvlp',
    content: 'Lorem ipsum dolor sit amet',
    date: '01/01/2021',
    time: '00:00'
  },
  {
    author: 'jaeger-dvlp',
    content: 'Lorem ipsum dolor sit amet',
    date: '01/01/2021',
    time: '00:00'
  }
]

let allowCrossDomain = function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Credentials', true)

  next()
}
app.use(allowCrossDomain)

app.get('/getWrites', (req, res) => {
  res.json(writes)
})

app.listen(port, (err) => {
  console.log(`Server is runing at ${port}!`)
})
