const generatePackage = require("./Algorithms/Pacotes.js")
const BD = require("./DataBase/queries.js")

const GeraPacotes = async (username) => {
    figs = generatePackage();

    let novas = [];

    // Tentamos inserir cada figurinha
    try {
        let figsResult = await BD.getStickersByUsername(username);
        userFigs = figsResult.rows;

        let userResult = await BD.getUserByUsername(username)
        let user = userResult.rows[0]

        let userId = user.user_id
        
        // Verificamos quais figurinhas são novas e quais são repetidas
        // Repetidas são marcadas com -1
        for(let i=0; i<figs.length; i++) {
            for(userFig of userFigs) {
                if(userFig.id === figs[i]) {
                    figs[i] = -1;
                    break;
                }
            }
        }

        // Agora descobrimos quais figurinhas são novas
        for(let i=0; i<figs.length; i++) {
            if(figs[i] != -1) {
                novas.push(figs[i])
            }
        }

        // Iremos ignorar as figurinhas repetidas
        // Iremos adicionar as novas figurinhas
        for(fig of novas) {
            await BD.createSticker(userId, fig);
        }
    } catch(e) {
        console.log(e)
    }
}

GeraPacotes('MATHIAS')