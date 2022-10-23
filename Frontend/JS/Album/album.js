// Componentes de navegação do Frontend
const btnPrev = document.getElementById("btn-prev")
const btnNext = document.getElementById("btn-next")
const pageNumberP = document.getElementById("page-number")
const sairLink = document.getElementById("sair-link")


// Variáveis de navegação da página
const FIG_PER_PAGE = 12
const MAX_PAGE = 2
const FIRST_PAGE = 0
const MAX_FIG = 36
let pageCount = 0

let fig = [];

// Variáveis que representam os slots de figurinhas na página
let slots = []
// Instanciamos as referências
for(let i=1; i<=FIG_PER_PAGE; i++){
    slots.push(document.getElementById(`f${i}`))
}

const startAlbum = async () => {
    // Instanciamos os dados do usuário
    let username = localStorage.getItem("username")
    let token = localStorage.getItem("token")

    try {
        let response = await makePostRequest('/stickers/user/', 
        {
            username,
            token
        })


        const figsResp = await response.json()
        parseResponse(figsResp)

        // Renderiza as figurinhas
        renderFigsPerPage(pageCount, fig)
    } catch(e) {
        console.log("Falha ao obter figurinhas")
    }
}

// Traduz a resposta da API para a interface do Frontend
const parseResponse = (figsResp) => {
    let i = 0
    let j = 0

    for(i=0; i<MAX_FIG; i++) {
        if(j<figsResp.length && figsResp[j].id == i) {
            // Nesse caso o usuário tem a figurinha
            fig.push({
                "id": figsResp[j].id,
                "url": `${proxy}${figsResp[j].img_url}`,
                "colada": figsResp[j].colada,
                "possui": true
            })
            j++;
        } else {
            // Nesse caso o usuário não tem a figurinha
            fig.push({
                "id": i,
                "url": ``,
                "colada": false,
                "possui": false
            })
        }
    }
}

// Procedimento para colar uma figurinha
const colaFigurinha = (figId, figs) => {
    // Faz as requisições para o backend
    // ...

    // Id do slot
    const slotId = (figId - 1) % FIG_PER_PAGE
    
    // Faz o update da interface
    let slotFig = slots[slotId]

    // Remove a div atual
    slotFig.innerHTML = ""

    // Adiciona a div da figurinha
    slotFig.appendChild(geraFigColada(figId, figs))

    // Atualiza o status da figurinha
    figs[figId - 1].colada =  true

}


// Função que renderiza as figurinhas de uma página
const renderFigsPerPage = (pageNumber, figs) => {
    // Indexação começará do zero
    const pageOffset = pageNumber;

    // Variável que controla a figurinha que está sendo atualizada
    let currentSlotIndex = 0;
    
    // Indice de figurinhas começa em 1
    for(let i=pageOffset*FIG_PER_PAGE + 1; 
        i <= (pageOffset + 1)*FIG_PER_PAGE;
        i++) {
        let currentSlot = slots[currentSlotIndex];
        
        // Apaga a div antiga
        currentSlot.innerHTML = ""

        // Indice da figurinha no array de figurinhas
        let figIndex = i - 1;

        // Adiciona a div nova
        if(fig[figIndex].possui && fig[figIndex].colada) {
            currentSlot.appendChild(geraFigColada(i, figs))
        } else if(fig[figIndex].possui && !fig[figIndex].colada) {
            currentSlot.appendChild(geraFigNaoColada(i, figs))
        } else {
            currentSlot.appendChild(geraFigFaltante(i))
        }

        // Incrementamos o índice do slot que está sendo processado
        currentSlotIndex++;
    }
}


// Eventos de navegação das páginas do albúm
btnNext.addEventListener('click', ()=> {
    // Incrementa o contador
    pageCount += 1

    // Atualiza a interface
    // Indice de páginas começa do zero
    pageNumberP.innerHTML = pageCount + 1

    // Habilitamos o botão de decremento
    btnPrev.disabled = false

    // Atualiza as figurinhas
    renderFigsPerPage(pageCount, fig)

    // Verificação de limites
    if(pageCount === MAX_PAGE) {
        // Nesse caso desabilitamos o botão
        btnNext.disabled = true
    }
})

btnPrev.addEventListener('click', () => {
    // Decrementa o contador
    pageCount -= 1

    // Atualiza a interface
    // Indice de páginas começa do zero
    pageNumberP.innerHTML = pageCount + 1

    // Habilitamos o botão de incremento
    btnNext.disabled = false

    // Atualiza as figurinhas
    renderFigsPerPage(pageCount, fig)

    // Verificação de limites
    if(pageCount === FIRST_PAGE) {
        // Desabilita o botão
        btnPrev.disabled = true
    }
})

sairLink.addEventListener('click', (e)=> {
    // Impede o redirecionamento
    e.preventDefault();

    // Remove os registros de autenticação do localStorage
    localStorage.setItem("username", '')
    localStorage.setItem("token", '')

    // Redireciona para a página de login
    window.location.replace(`${proxy}/index.html`)
})

// Inicializa o Álbum
startAlbum()