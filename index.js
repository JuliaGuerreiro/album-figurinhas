const express = require("express")
const app = express()
const bodyParser = require("body-parser")

const PORT = 3000;

// View engine
app.set('view engine', 'ejs')

// Static
app.use(express.static('public'))

// Body parser
app.use(bodyParser.urlencoded({extends: false}))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.render("index")
})

app.listen(PORT, () => {
    console.log("O servidor está rodando!")
})

app.get("/album", (req, res) => {
    res.render("album")
})