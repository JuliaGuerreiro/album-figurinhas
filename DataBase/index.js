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

app.get('/users',db.getUsers)//testado
app.get('/users/id/:id',db.getUserById)//testado
app.get('/users/name/:username',db.getUserByUsername)//testado
app.get('/objects',db.getOjects)//testado
app.get('/objects/id/:id',db.getObjectById)//testado
app.get('/stickers',db.getStickers)//testado
app.get('/stickers/user_id/:id',db.getStickersByUserId)//testado
app.get('/stickers/user_name/:username',db.getStickersByUsername)//testado
app.get('/stickers/id/:id',db.getStickerById)//testado


app.post('/users',db.createUser)//testado
app.post('/objects',db.createObject)//testado
app.post('/stickers',db.createSticker)//testado


app.put('/users/id/:id',db.updateUserById)//testado
app.put('/users/user_lp/:id',db.updateUserLastPackage)//testado
app.put('/objects/id/:id',db.updateObject)//testado
app.put('/stickers/id/:id',db.updateSticker)//testado


app.delete('/users/id/:id',db.deleteUserById)//testadio
app.delete('/users/name/:username',db.deleteUserByUsername)//testado
app.delete('/objects/id/:id',db.deleteObject)//testado
app.delete('/stickers/id/:id',db.deleteSticker)//testado
