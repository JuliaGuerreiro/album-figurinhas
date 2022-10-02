const express = require("express")
const app = express()
const bodyParser = require("body-parser")

// Módulo responsável por construir diretório de arquivos
const path = require("path")

const PORT = 3000;

// Servidor de arquivos estáticos
// Serve os arquivos do Frontend
app.use("/", express.static(path.join(__dirname, "Frontend")))

// Body parser
app.use(bodyParser.urlencoded({extends: false}))
app.use(bodyParser.json())


app.listen(PORT, () => {
    console.log("O servidor está rodando!")
})