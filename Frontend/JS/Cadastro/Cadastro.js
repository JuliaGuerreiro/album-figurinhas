const form = document.getElementById("cadastro-form")
const userInput = document.getElementById("user-input") 
const passworInput = document.getElementById("password-input") 
const confirmPassworInput = document.getElementById("confirm-password-input") 
const warnP = document.getElementById("warn-p")

const toggleWarn = (msg) => {
    warnP.innerHTML = msg;
    warnP.hidden = false

    setTimeout(() => {
        warnP.hidden = true
    }, 2000)
}

form.addEventListener("submit", async (e) => {
    // Evita a submissão da requisição
    e.preventDefault()

    let username = userInput.value
    let password = passworInput.value
    let confirmPassword = confirmPassworInput.value

    if(password != confirmPassword)
        return toggleWarn("Senhas Não Conferem")

    
    try{
        let response = await makePostRequest('/users/create', 
        {
            username,
            password
        })

        if(response.status === 200) {
            // Aqui o usuário foi criado com sucesso
            window.location.replace(`${proxy}/index.html`)
        } else {
            toggleWarn("Usuário Já Existe")
        }

    } catch(e) {
        toggleWarn("Falha ao Cadastrar Usuário")
        console.log(e)
    }  
})