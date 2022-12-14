const express = require('express')
const router = express.Router()
//const Users = require('./Users')
const bcrypt = require('bcryptjs')
//const fs = require('fs')
const jwt = require('jsonwebtoken')

const BD = require('../DataBase/queries')

const tokenVerify = require('../Middleware/Token')

// Variáveis Bcrypt
var salt = bcrypt.genSaltSync(10)

require('dotenv').config()

/*
Vai precisar de uma rota para criar usuários, a requisição vai ser do tipo post e o BackEnd vai receber como parâmetro o nome de usuário e a senha do usuário.
Caso o usuário seja criado com sucesso, basta retornar status:OK
Do contrário deve ser retornado que ocorreu um erro (Deve ser especificado se esse erro ocorreu porque o nome de usuário já estava em uso
*/
router.post('/users/create', async (req, res) => {
    var username = req.body.username
    var password = req.body.password
    
    if(!username || !password) {
        return res.status(400).json({ msg: 'Please include a username and password'})
    }
    
    var hash = bcrypt.hashSync(password, salt)

    try {
        await BD.createUser(username, hash, '')

        res.status(200).json({msg: "Sucess"})
    } catch(e) {
        res.status(400).json({msg: "Error on create user"})
    }
})

/*
Vai precisar de uma rota para autenticação de usuários, essa rota vai ser do tipo post e ela recebe usuário e senha. 
Caso não seja possível autenticar, ele retorna erro e caso seja possível autenticar ele retorna um token pro usuário  
O papel desse token vai ser garantir que o usuário está logado e garantir que a requisição de um usuário é autêntica sem precisar ficar passando a senha pra todo lado.
*/
router.post('/users/authenticate', async (req, res) => {
    // Authenticate User

    const username = req.body.username
    const password = req.body.password

    try {
        let result = await BD.getUserByUsername(username)
        let user = result.rows[0]

        var correct = bcrypt.compareSync(password, user.user_password)

        if (correct) {
            const accessToken = jwt.sign(user.user_name, process.env.ACCESS_TOKEN_SECRET)

            // Atualizando o token do usuário no Banco de Dados
            await BD.updateUserTokenById(user.user_id, accessToken)
    
            res.status(200).json({ accessToken: accessToken })
        } else {
            res.status(400).json({ msg: 'Incorrect password' })
        }
    } catch(e) {
        console.log(e)
        return res.status(400).json({ msg: 'Error while trying to autenticate' })
        
    }

})

/*
Vai precisar de uma rota só pra verificar se um usuário de fato está logado, 
pra isso vai precisar de uma rota post que recebe o nome do usuário e o token,
o BackEnd verifica no BD se o token está certo e responde Ok ou token inválido
*/
router.post('/users/checktoken', async (req, res) =>  {

    const username = req.body.username
    const token = req.body.token
    try {
        let result = await BD.getUserByUsername(username)
        let user = result.rows[0]

        if(token == user.user_token) {
            res.status(200).json({ msg: 'OK' })
        } else {
            res.status(400).json({ msg: 'Invalid token' })
        }
    } catch (e) {
        res.status(400).json({ msg: 'Invalid user' })
    }
})

router.post('/users/last_package/', tokenVerify, async (req,res) => {
    const username = req.body.username

    try {
        let user = await BD.getUserByUsername(username)
        let lastPackage = user.rows[0].user_last_package
        
        res.status(200).json({last_package : lastPackage})
    } catch (e) {
        res.status(400).json({msg:'Fail to Handle Request'})
    }
})

module.exports = router