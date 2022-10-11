const express = require('express')
const uuid = require('uuid')
const router = express.Router()
const Users = require('./Users')
const bcrypt = require('bcryptjs')
const fs = require('fs')

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
        password: hash
    }

    Users.push(newUser)

    fs.writeFile('./users/Users.js', 'Users = ' + JSON.stringify(Users) + ';module.exports = Users', err => { if (err) throw err; console.log('Saved!') })

    res.json(Users)
})

module.exports = router