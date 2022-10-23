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