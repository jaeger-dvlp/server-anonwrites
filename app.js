const MongoClient = require('mongodb').MongoClient
const cors = require('cors')
const express = require('express')
const app = express()
const port = 3050

const uri = 'mongodb://localhost:27017'

const categories = [
  'world',
  'war',
  'politic',
  'religion',
  'usa',
  'science',
  'tech'
]

let allowCrossDomain = function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
}
app.use(cors())
app.use(allowCrossDomain)
app.use(express.urlencoded({extended: true}))
app.use(express.json())

const getAllWrites = (res) => {
  MongoClient.connect(uri, async (err, client) => {
    let anonDB = client.db('anonwrites').collection('writes')
    res.json(await anonDB.find().toArray())
    client.close()
  })
}

const getWritesByCategory = (res, category) => {
  MongoClient.connect(uri, async (err, client) => {
    let anonDB = client.db('anonwrites').collection('writes')
    res.json(await anonDB.find({writeCategories: category}).toArray())
    client.close()
  })
}

const getAllWriteCategories = (res) => {
  MongoClient.connect(uri, async (err, client) => {
    let anonDB = client.db('anonwrites').collection('categories')
    res.json(await anonDB.find().toArray())
    client.close()
  })
}

const pushNewWrite = (data, res) => {
  MongoClient.connect(uri, async (err, client) => {
    let anonDB = client.db('anonwrites').collection('writes')
    await anonDB.insertOne({
      writeContent: data.write,
      writeCategories: data.categories
    })
    await res.json('Successful!')
    await client.close()
  })
}

app.get('/getWrites', async (req, res) => {
  setTimeout(() => {
    getAllWrites(res)
  }, 2000)
})

app.get('/getWrites/category/:categoryName', (req, res) => {
  if (categories.includes(req.params.categoryName) === true) {
    setTimeout(() => {
      getWritesByCategory(res, req.params.categoryName)
    }, 2000)
  }
})

app.get('/getCategories', (req, res) => {
  setTimeout(() => {
    getAllWriteCategories(res)
  })
})

app.post('/newWrite', (req, res) => {
  req.body !== undefined
    ? setTimeout(() => {
        pushNewWrite(req.body, res)
      }, 2000)
    : ''
})

app.listen(port, (err) => {
  console.log(`Server is runing at ${port}!`)
})
