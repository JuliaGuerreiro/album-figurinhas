const express = require('express')
const generatePackage = require("../Algorithms/Pacotes")
const router = express.Router()
const BD = require('../DataBase/queries')
const tokenVerify = require("../Middleware/Token")

//retorna as figurinhas de um usuário
router.post('/stickers/user/', tokenVerify, async (req, res) =>{
    
    const username = req.body.username

    try {
        
        let stickers = await BD.getStickersByUsername(username)
        res.status(200).json(stickers.rows)

    } catch (e) {
        res.status(400).json({msg:"Invalid user"})
    }
})

//cola a figurinha com base no id da própria
router.post('/stickers/glue_sticker', tokenVerify, async (req,res) => {

  const sticker_id = parseInt(req.body.sticker_id)

    try{
        await BD.glueSticker(sticker_id)
        res.status(200).json({msg : "Sticker glued"})
    } catch(e){
        res.status(400).json({msg: "Sticker not found"})
    }

})

router.post('/stickers/package', tokenVerify, async (req, res) => {
    const username = req.body.username;

    figs = generatePackage();

    let novas = [];
    let feedback = [];
    let aux;
    
    // Tentamos inserir cada figurinha
    try {
        let figsResult = await BD.getStickersByUsername(username);
        userFigs = figsResult.rows;
        
        let userResult = await BD.getUserByUsername(username)
        let user = userResult.rows[0]
        
        let userId = user.user_id
        
        let allFigsResult = await BD.getObjects()
        let allFigs = allFigsResult.rows

        let currentDate = new Date()
        let lastPackageDate = new Date(user.user_last_package)
        
        // Verificando se o usuário pode abrir o pacote
        if((lastPackageDate.getMonth() == currentDate.getMonth()) && 
            (lastPackageDate.getDate() == currentDate.getDate()))
                return res.status(400).json({msg:'Pacote Diário já Aberto'});


        // Verificamos quais figurinhas são novas e quais são repetidas
        // Repetidas são marcadas com -1
        for(let i=0; i<figs.length; i++) {
            for(userFig of userFigs) {
                if(userFig.id === figs[i]) {
                    figs[i] = -1;
                    feedback.push(userFig)
                    break;
                }
            }
        }

        // Agora descobrimos quais figurinhas são novas
        for(let i=0; i<figs.length; i++) {
            if(figs[i] != -1) {
                novas.push(figs[i])

                // Novas figurinhas certamente não estão coladas
                // Depende absurdamente dos índices das figurinhas
                aux = allFigs[figs[i]-1];
                aux.colada = false;
                feedback.push(aux)
            }
        }

        // Iremos ignorar as figurinhas repetidas
        // Iremos adicionar as novas figurinhas
        for(fig of novas) {
            await BD.createSticker(userId, fig);
        }

        // Atualizamos a data do último pacote
        await BD.updateUserLastPackage(userId)

        res.status(200).json(feedback)
    } catch(e) {
        console.log(e)
        res.status(400).json({msg:'Falha ao gerar pacote'})
    }
})

module.exports = router