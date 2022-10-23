// Import das definições de geração de pacotes
const {
        numSupRareFigs,
        numRareFigs,
        numComonFigs,
        lastIndice,
        packageSize,
        packageRaraCapacity,
        probabilities,
        indices
    } = require("../Configurations/GeracaoDePacotes");

// Procedimento retorna um array com os ids das figurinhas
// sorteadas
let generatePackage = () => {
    // Array de figurinhas disponíveis
    let avaiables = Array(lastIndice).fill(true);

    // Contador de figurinhas escolhidas
    let choosed = 0;

    // Pacote de figurinhas
    let pacote = [];

    // Variáveis auxiliares
    let escolhida, idEscolhido;

    // Primeiro escolhemos as figurinhas Super Raras
    if(Math.random() <= probabilities["SuperRare"]) {
        // Aqui escolhemos uma figurinhas Super Rara
        // Note que não há problema de escolha redundante me figurinhas
        // Super Raras
        escolhida = Math.floor(Math.random() * numSupRareFigs);
        idEscolhido = indices["SuperRare"][escolhida];

        pacote.push(idEscolhido);
        avaiables[idEscolhido] = false;
        choosed += 1;
    }

    // Segundo escolhemos as figurinhas Raras
    for(let tentativa=0; tentativa<packageRaraCapacity; tentativa++) {
        // Verificamos se a figurinha será adicionada
        if(Math.random() <= probabilities["Rare"]) {
            // Aqui escolhemos uma figurinhas Rara
            // que não seja repetida dentro do pacote
            do{
                escolhida = Math.floor(Math.random() * numRareFigs);
                idEscolhido = indices["Rare"][escolhida];
            }
            while(!avaiables[idEscolhido]);

            pacote.push(idEscolhido);
            avaiables[idEscolhido] = false;
            choosed += 1;
        }
    } 
    
    // Completamos o pacote com figurinhas comuns
    do {
        escolhida = Math.floor(Math.random() * numComonFigs);
        idEscolhido = indices["Comon"][escolhida];

        if(avaiables[idEscolhido]) {
            pacote.push(idEscolhido);
            avaiables[idEscolhido] = false;
            choosed += 1;
        }
    } while(choosed != packageSize);

    return pacote;
}

module.exports = generatePackage;