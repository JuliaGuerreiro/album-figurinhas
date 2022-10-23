const btnPacote = document.getElementById("btn-pacote")
const figDiv = document.getElementById("fig-div")
const lastPackageMsg = document.getElementById("last-package-msg")
const sairLink = document.getElementById("sair-link")

const FIG_PER_PACKAGE = 6

let slots = []
for(let i=1; i<=FIG_PER_PACKAGE; i++)
    slots.push(document.getElementById(`f${i}`))

const renderNewPackage = (figs) => {
    for(let i=0; i<FIG_PER_PACKAGE; i++) {
        // Remove o conteúdo da div
        slots[i].innerHTML = "";
        
        slots[i].appendChild(geraFigColada(i+1, figs));
    }
}


btnPacote.addEventListener('click', ()=> {
    // Desabilitamos o botão de requisição de pacotes
    btnPacote.disabled = true;
    
    // Após o request
    

    // Atualizamos a interface com as figurinhas obtidas
    renderNewPackage(fig)

    // Atualizamos a data do último pacote
    const currentDate = new Date()
    lastPackageMsg.innerHTML = `Data do Último Pacote: ${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`


    // Monstramos a div com as figurinhas
    figDiv.hidden = false

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