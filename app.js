const express = require('express')
const app = express()
const port = 3050

const categories = ['war', 'world', 'politic']

const writes = [
  {
    writeId: 0,
    writeAuthor: 'jaeger-dvlp',
    writeContent:
      'Duo prompta dolorem consequat ne, id vis feugait cotidieque? Antiopam partiendo mea ad. Nam agam contentiones ad, odio quodsi sea no, nam ex quod brute disputationi.',
    writeCategories: ['war'],
    writeDate: '01/01/2021',
    writeTime: '00:00'
  },
  {
    writeId: 1,
    writeAuthor: 'lynicis',
    writeContent:
      'Has dicit pericula ea, sed at debitis facilis, nibh placerat eu sea. Aperiam ornatus signiferumque cum in.',
    writeCategories: ['world', 'war', 'politic'],
    writeDate: '01/01/2021',
    writeTime: '00:00'
  },
  {
    writeId: 2,
    writeAuthor: 'cartApp',
    writeContent:
      'Vim id option recteque, epicuri nominavi ne vim. Nam ad vero ferri, has ne homero munere deserunt, munere nusquam et sea.',
    writeCategories: ['politic'],
    writeDate: '01/01/2021',
    writeTime: '00:00'
  },
  {
    writeId: 3,
    writeAuthor: 'Anonym',
    writeContent:
      'Qui summo habemus nominavi et, no simul nostrum vel. Vim alienum delicatissimi id. Ut postea hendrerit scriptorem ius, nam omnis oblique id.',
    writeCategories: ['world'],
    writeDate: '01/01/2021',
    writeTime: '00:00'
  },
  {
    writeId: 4,
    writeAuthor: 'schiesseGuy',
    writeContent:
      'Sonet timeam invenire mei te, cum officiis adipisci mediocritatem ei! Denique referrentur ut nec, ut soleat aeterno menandri duo, euismod nonumes adipiscing ad eos!',
    writeCategories: ['world'],
    writeDate: '01/01/2021',
    writeTime: '00:00'
  },
  {
    writeId: 5,
    writeAuthor: 'JohnDoe',
    writeContent:
      'Has dicit pericula ea, sed at debitis facilis, nibh placerat eu sea. Aperiam ornatus signiferumque cum in.',
    writeCategories: ['world', 'war', 'politic'],
    writeDate: '01/01/2021',
    writeTime: '00:00'
  },
  {
    writeId: 6,
    writeAuthor: 'Anonym',
    writeContent:
      'Vim id option recteque, epicuri nominavi ne vim. Nam ad vero ferri, has ne homero munere deserunt, munere nusquam et sea.',
    writeCategories: ['world'],
    writeDate: '01/01/2021',
    writeTime: '00:00'
  },
  {
    writeId: 7,
    writeAuthor: 'Anonym',
    writeContent:
      'Qui summo habemus nominavi et, no simul nostrum vel. Vim alienum delicatissimi id. Ut postea hendrerit scriptorem ius, nam omnis oblique id.',
    writeCategories: ['world'],
    writeDate: '01/01/2021',
    writeTime: '00:00'
  },
  {
    writeId: 8,
    writeAuthor: 'Anonym',
    writeContent:
      'Sonet timeam invenire mei te, cum officiis adipisci mediocritatem ei! Denique referrentur ut nec, ut soleat aeterno menandri duo, euismod nonumes adipiscing ad eos!',
    writeCategories: ['world', 'war', 'politic'],
    writeDate: '01/01/2021',
    writeTime: '00:00'
  }
]

let allowCrossDomain = function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Credentials', true)

  next()
}
app.use(allowCrossDomain)

app.get('/getWrites', (req, res) => {
  setTimeout(() => {
    res.json(writes)
  }, 3000)
})

app.get('/getWrites/category/:categoryName', (req, res) => {
  let writesToSendByCategory = []
  writes.map((write) => {
    if (write.writeCategories.includes(req.params.categoryName) === true) {
      writesToSendByCategory.push(write)
    }
  })
  setTimeout(() => {
    res.json(writesToSendByCategory)
  }, 2000)
})

app.get('/getCategories', (req, res) => {
  res.json(categories)
})

app.listen(port, (err) => {
  console.log(`Server is runing at ${port}!`)
})
