// Componentes de navegação do Frontend
const btnPrev = document.getElementById("btn-prev")
const btnNext = document.getElementById("btn-next")
const pageNumberP = document.getElementById("page-number")


// Variáveis de navegação da página
const MAX_PAGE = 5
const FIRST_PAGE = 1
let pageCount = 1

// Eventos de navegação das páginas do albúm
btnNext.addEventListener('click', ()=> {
    // Incrementa o contador
    pageCount += 1
    // Atualiza a interface
    pageNumberP.innerHTML = pageCount

    // Habilitamos o botão de decremento
    btnPrev.disabled = false

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
    pageNumberP.innerHTML = pageCount

    // Habilitamos o botão de incremento
    btnNext.disabled = false

    // Verificação de limites
    if(pageCount === FIRST_PAGE) {
        // Desabilita o botão
        btnPrev.disabled = true
    }
})