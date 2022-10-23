const BD = require("../DataBase/queries.js")


const tokenVerify = async (req, res, next) => {
    const username = req.body.username
    const token = req.body.token

    if(!username || !token)
        return res.status(400).json({msg:"Request Sem Credenciais"})

    try {
        let userResult = await BD.getUserByUsername(username)
        let user = userResult.rows[0]
    
        if(token == user.user_token)
            next()
        else
            res.status(400).json({msg:"Credencial Inválida"})
            
        } catch(e) {
            res.status(400).json({msg:"Falha ao Processar Requisição"})
    }
}

module.exports = tokenVerify