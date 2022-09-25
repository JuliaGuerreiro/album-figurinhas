const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;

// Roteamento da pasta pública
app.use("/", express.static(path.join(__dirname, '/Public')))

// Inicio do servidor
app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`))