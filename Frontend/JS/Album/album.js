// Componentes de navegação do Frontend
const btnPrev = document.getElementById("btn-prev")
const btnNext = document.getElementById("btn-next")
const pageNumberP = document.getElementById("page-number")


// Variáveis de navegação da página
const FIG_PER_PAGE = 12
const MAX_PAGE = 1
const FIRST_PAGE = 0
let pageCount = 0

// Variáveis que representam os slots de figurinhas na página
let slots = []
// Instanciamos as referências
for(let i=1; i<=FIG_PER_PAGE; i++){
    slots.push(document.getElementById(`f${i}`))
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

// Função que gera a div de uma figurinha não colada
const geraFigFaltante = (figId) => {
    // Cria a div externa
    const outerDiv = document.createElement("div")
    outerDiv.classList.add("card-cell")
    outerDiv.classList.add("fig-missed")

    // Cria o parágrafo
    const figIdParagraph = document.createElement("p")
    figIdParagraph.classList.add("fig-missed-warn")
    figIdParagraph.innerHTML = figId

    // Adiciona o parágrafo à div
    outerDiv.appendChild(figIdParagraph)
    
    return outerDiv
}

const geraFigNaoColada = (figId, figs) => {
    // Cria a div externa
    const outerDiv = document.createElement("div")
    outerDiv.classList.add("card-cell")
    outerDiv.classList.add("fig-to-paste")
    outerDiv.figId = figId
    
    // Cria o parágrafo
    const figIdParagraph = document.createElement("p")
    figIdParagraph.classList.add("fig-to-paste-warn")
    figIdParagraph.innerHTML = figId
    figIdParagraph.figId = figId
    
    // Adiciona o parágrafo à div
    outerDiv.appendChild(figIdParagraph)

    // Adiciona o evento de colar figurinha
    outerDiv.addEventListener('click', (e)=> colaFigurinha(e.target.figId, figs))

    return outerDiv
}

const geraFigColada = (figId, figs) => {
    const outerDiv = document.createElement("div")
    outerDiv.classList.add("card-cell")
    outerDiv.classList.add("fig-filled")
    
    // Cria a imagem
    const img = document.createElement("img")
    img.classList.add("fig-img")
    img.src = figs[figId - 1].url

    // Adiciona o img à div
    outerDiv.appendChild(img)

    return outerDiv
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