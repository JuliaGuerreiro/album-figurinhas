const loginForm = document.getElementById('login-form')

const userInput = document.getElementById('user-input')
const passwordInput = document.getElementById('password-input')
const warnP = document.getElementById('warn-p')

const formDataFecther = () => {
    let formData = {
        "user": userInput.value,
        "password": passwordInput.value
    }

    return formData
}

const failedLoginNotification = () => {
    // Exibe o aviso
    warnP.hidden = false
    
    // Adiciona o evento que irá desabilitar o aviso
    setTimeout(()=> {
        warnP.hidden = true
    }, 2000)
}

const loginHandler = async (event) => {
    // Impede o comportamento padrão do formulário
    event.preventDefault();

    // Instanciamos os dados do frontend
    let userData = formDataFecther()

    console.log(userData)
    // Realizamos a requisição para o backend para verificar se
    // o usuário e a senha estão corretos

    // ...

    // Handle Login Failure
    failedLoginNotification()
    // Limpamos o input de senha
    passwordInput.value =  ""

}

loginForm.addEventListener('submit', loginHandler)