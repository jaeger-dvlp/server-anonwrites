const MongoClient = require('mongodb').MongoClient
const requestIp = require('request-ip')
const express = require('express')
const cors = require('cors')
const app = express()

require('dotenv').config()

const port = process.env.PORT || 5000
const uri = process.env.DB

const categories = [
  'world',
  'war',
  'politic',
  'religion',
  'europe',
  'science',
  'tech'
]

const allowCrossDomain = function (req, res, next) {
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
    try {
      await res.json(await anonDB.find().toArray().reverse())
    } catch (error) {
      await res.status(400).json({message: 'An error occurred'})
    }
    await client.close()
  })
}

const getWritesByCategory = (res, category) => {
  MongoClient.connect(uri, async (err, client) => {
    let anonDB = client.db('anonwrites').collection('writes')
    try {
      await res.json(
        await anonDB.find({writeCategories: category}).toArray().reverse()
      )
    } catch (error) {
      await res.status(400).json({message: 'An error occurred'})
    }
    await client.close()
  })
}

const getAllWriteCategories = (res) => {
  MongoClient.connect(uri, async (err, client) => {
    let anonDB = client.db('anonwrites').collection('categories')
    try {
      await res.json(await anonDB.find().toArray())
    } catch (error) {
      await res.status(400).json({message: 'An error occurred'})
    }
    await client.close()
  })
}

const pushNewWrite = (data, res) => {
  MongoClient.connect(uri, async (err, client) => {
    let anonDB = client.db('anonwrites').collection('writes')
    try {
      await anonDB.insertOne({
        writeAuthor: data.writeAuthor,
        writeContent: data.write,
        writeCategories: data.categories
      })
    } catch (error) {
      await res.status(400).json({message: 'An error occurred'})
    } finally {
      await res.status(200).res.json({message: 'Success'})
    }
    await client.close()
  })
}

const pushNewRequest = async (reqIp, reqUrl) => {
  MongoClient.connect(uri, async (err, client) => {
    let anonDB = client.db('anonwrites').collection('requests')
    try {
      await anonDB.insertOne({
        requestIp: reqIp,
        requestUrl: reqUrl
      })
    } catch (error) {
      await console.log(`\n[ ! ERR ! ]\n|\n| Error : ${error}\n|\n[ ! ]`)
    } finally {
      await console.log(
        `\n[ ! ]\n|\n| New Request is pushed to database.\n|\n[ ! ]`
      )
    }
    await client.close()
  })
}

app.all('*', (req, res, next) => {
  console.log(
    `\n[ ! ]\n|\n| Request : ${req.url}\n|\n| From :${requestIp.getClientIp(
      req
    )}\n|\n[ ! ]`
  )
  //pushNewRequest(requestIp.getClientIp(req), req.url)
  next()
})

app.get('/api/getWrites', async (req, res) => {
  setTimeout(() => {
    getAllWrites(res)
  }, 2000)
})

app.get('/api/getWrites/category/:categoryName', (req, res) => {
  if (categories.includes(req.params.categoryName) === true) {
    setTimeout(() => {
      getWritesByCategory(res, req.params.categoryName)
    }, 2000)
  }
})

app.get('/api/getCategories', (req, res) => {
  setTimeout(() => {
    getAllWriteCategories(res)
  })
})

app.post('/api/newWrite', (req, res) => {
  req.body !== undefined
    ? setTimeout(() => {
        pushNewWrite(req.body, res)
      }, 2000)
    : res.json({status: 400, message: 'error'})
})

app.listen(port, (err) => {
  console.log(`Server is runing at ${port}!`)
})
