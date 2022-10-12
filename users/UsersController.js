const express = require('express')
const uuid = require('uuid')
const router = express.Router()
const Users = require('./Users')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const jwt = require('jsonwebtoken')

require('dotenv').config()

/*
Vai precisar de uma rota para criar usuários, a requisição vai ser do tipo post e o BackEnd vai receber como parâmetro o nome de usuário e a senha do usuário.
Caso o usuário seja criado com sucesso, basta retornar status:OK
Do contrário deve ser retornado que ocorreu um erro (Deve ser especificado se esse erro ocorreu porque o nome de usuário já estava em uso
*/
router.post('/users/create', (req, res) => {
    var username = req.body.username
    var password = req.body.password
    var confirmation = req.body.confirmation
    
    if(!username || !password) {
        return res.status(400).json({ msg: 'Please include a username and password'})
    }
    if(password != confirmation) {
        return res.json({ error: 'passwords do not match' })
    }
    if(Users.find(user => user.username == username)) {
        return res.json({ msg: 'Username already in use, please chose a different username' })
    }

    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(password, salt)

    const newUser = {
        id: uuid.v4(),
        username: req.body.username,
        password: hash,
        token: '',
        last_pack: 0
    }

    Users.push(newUser)

    fs.writeFile('./users/Users.js', 'Users = ' + JSON.stringify(Users) + ';module.exports = Users', err => { if (err) throw err; console.log('Saved!') })

    res.json(Users)
})

/*
Vai precisar de uma rota para autenticação de usuários, essa rota vai ser do tipo post e ela recebe usuário e senha. 
Caso não seja possível autenticar, ele retorna erro e caso seja possível autenticar ele retorna um token pro usuário  
O papel desse token vai ser garantir que o usuário está logado e garantir que a requisição de um usuário é autêntica sem precisar ficar passando a senha pra todo lado.
*/
router.post('/users/authenticate', (req, res) => {
    // Authenticate User

    const username = req.body.username
    const password = req.body.password

    var user = Users.find(user => user.username == username)

    if (user != undefined) {
        // Validate password
        var correct = bcrypt.compareSync(password, user.password)

        if (correct) {
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
            user.token = accessToken
            fs.writeFile('./users/Users.js', 'Users = ' + JSON.stringify(Users) + ';module.exports = Users', err => { if (err) throw err; console.log('Saved!') })

            res.json({ accessToken: accessToken })
        } else {
            res.json({ msg: 'Incorrect password' })
        }

    } else {
        return res.json({ msg: 'Username not registered' })
    }
})

/*
Vai precisar de uma rota só pra verificar se um usuário de fato está logado, 
pra isso vai precisar de uma rota post que recebe o nome do usuário e o token,
o BackEnd verifica no BD se o token está certo e responde Ok ou token inválido
*/
router.post('/users/checktoken', (req, res) => {

    const username = req.body.username
    const token = req.body.token

    var user = Users.find(user => user.username == username)

    if (user != undefined) {
        if (token == user.token) {
            res.json({ msg: 'OK' })
        } else {
            res.json({ msg: 'Invalid token' })
        }
    } else {
        res.json({ msg: 'Invalid user' })
    }
})

module.exports = router