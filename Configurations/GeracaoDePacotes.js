// Definições para a geração do pacote de figurinhas
// Número de figurinhas Super Raras possíveis
const numSupRareFigs = 5;
// Número de figurinhas Raras possíveis
const numRareFigs = 11;
// Número de figurinhas Comuns possíveis
const numComonFigs = 20;

// Último índice de figurinhas
// Assumimos que os ids são contínuos
const lastIndice = 30;

// Número de figurinhas por pacote gerado
const packageSize = 6;
// Número máximo de figurinhas raras por pacote
const packageRaraCapacity = 2;
// Assumimos que somente uma figurinha super rara 
// pode aparecer por pacote

// Probabilidades de obtenção de figurinhas
const probabilities = {
    "SuperRare": 1,
    "Rare": 1,
}

// Índices das figurinhas por tipo de raridade
const indices = {
    "SuperRare": [1,2,3,4,5],
    "Rare": [6,7,8,9,10,11,12,13,14,15,16],
    "Comon": [17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]
}

module.exports = {
    numSupRareFigs,
    numRareFigs,
    numComonFigs,
    lastIndice,
    packageSize,
    packageRaraCapacity,
    probabilities,
    indices
}