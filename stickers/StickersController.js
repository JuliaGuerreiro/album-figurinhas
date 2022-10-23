const express = require('express')
const router = express.Router()
const BD = require('../DataBase/queries')

//retorna as figurinhas de um usuário
router.get('/stickers/user/:username', async (req, res) =>{

    const username = req.params.username

    try {
        
        let stickers = await BD.getStickersByUsername(username)
        res.status(200).json(stickers.rows)

    } catch (e) {
        res.status(400).json({msg:"Invalid user"})
    }
})

//cola a figurinha com base no id da própria
router.post('/stickers/glue_sticker', async (req,res) => {

  const sticker_id = parseInt(req.body.sticker_id)

  try{
      await BD.glueSticker(sticker_id)
      res.status(200).json({msg : "Sticker glued"})
  } catch(e){
      console.log(e)
      res.status(400).json({msg: "Sticker not found"})
  }
})

module.exports = router