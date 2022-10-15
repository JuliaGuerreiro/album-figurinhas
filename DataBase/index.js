const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })

app.get('/users',db.getUsers)
app.get('/users/:id',db.getUserById)
app.get('/objects',db.getOjects)
app.get('/objects/:id',db.getObjectById)
app.get('/stickers',db.getStickers)
app.get('/stickers/user/id:',db.getStickersByUserId)
app.get('/stickers/:id',db.getStickers)


app.post('/users',db.createUser)
app.post('/objects',db.createObject)
app.post('/stickers',db.createSticker)


app.put('/users/:id',db.updateUser)
app.put('/objects/:id',db.updateObject)
app.put('/stickers/:id',db.updateSticker)


app.delete('/users/:id',db.deleteUser)
app.delete('/objects/:id',db.deleteObject)
app.delete('/stickers/:id',db.deleteSticker)
