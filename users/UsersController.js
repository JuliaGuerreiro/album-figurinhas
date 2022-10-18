const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

// Constantes do Bcrypt
var salt = bcrypt.genSaltSync(10)

// Import do banco de dados
const BD = require("../DB/db")

router.post('/users/create', async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    
    if(!username || !password) {
        return res.status(400).json({ msg: 'Please include a username and password'})
    }
    
    let hash = bcrypt.hashSync(password, salt)
    
    
    // Tentando inserir o usuário no BD
    try {
        let userId = await BD.createUser(username, hash, '');
        
        res.status(200).json({msg: "Usuário adicionado com sucesso"});
    } catch(e) {
        return res.status(400).json({ msg: 'Erro ao adicionar o usuário' })
    }
})

module.exports = router