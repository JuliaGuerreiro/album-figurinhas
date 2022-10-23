const btnPacote = document.getElementById("btn-pacote")
const figDiv = document.getElementById("fig-div")
const lastPackageMsg = document.getElementById("last-package-msg")
const sairLink = document.getElementById("sair-link")

const FIG_PER_PACKAGE = 6

let fig = []

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

// Selecionando os dados necessários
const parseResponse = (figsResponse) => {
    for(let i=0; i<FIG_PER_PACKAGE; i++) {
        fig.push({
            "id": figsResponse[i].id,
            "url": `${proxy}${figsResponse[i].img_url}`
        })
    }
}


btnPacote.addEventListener('click', async ()=> {
    // Desabilitamos o botão de requisição de pacotes
    btnPacote.disabled = true;
    
    try {
        // Instanciando os dados do usuário
        let username = localStorage.getItem("username")
        let token = localStorage.getItem("token")
        
        let response = await makePostRequest('/stickers/package', {
            username,
            token
        });

        let figsResponse = await response.json()

        parseResponse(figsResponse)
    } catch(e) {
        console.log(e)
        btnPacote.disabled = false
        return;
    }
    
    // Após o request
    // Atualizamos a interface com as figurinhas obtidas
    renderNewPackage(fig)

    // Atualizamos a data do último pacote
    const currentDate = new Date()
    lastPackageMsg.innerHTML = `Data do Último Pacote: ${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`


    // Monstramos a div com as figurinhas
    figDiv.hidden = false

})

const enableButton = async () => {
    try {
        // Instanciando dados do usuário
        let username = localStorage.getItem("username")
        let token = localStorage.getItem("token")
        
        let response = await makePostRequest('/users/last_package/', {
            username,
            token
        })

        const {last_package} = await response.json()

        let lastPackageDate = new Date(last_package)
        let currentDate = new Date()

        // Setamos a data do último pacote na página
        if(last_package)
            lastPackageMsg.innerHTML = `Data do Último Pacote: ${lastPackageDate.getDate()}/${lastPackageDate.getMonth() + 1}/${lastPackageDate.getFullYear()}`

        if((lastPackageDate.getMonth() == currentDate.getMonth()) && 
        (lastPackageDate.getDate() == currentDate.getDate()))
            return;

        // Habilita o botão
        btnPacote.disabled = false

    } catch(e) {
        console.log(e)
    }
}

sairLink.addEventListener('click', (e)=> {
    // Impede o redirecionamento
    e.preventDefault();

    // Remove os registros de autenticação do localStorage
    localStorage.setItem("username", '')
    localStorage.setItem("token", '')

    // Redireciona para a página de login
    window.location.replace(`${proxy}/index.html`)
})

// Verificamos se o usuário pode fazer um request
enableButton()