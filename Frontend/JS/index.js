const loginForm = document.getElementById('login-form')

const userInput = document.getElementById('user-input')
const passwordInput = document.getElementById('password-input')

const formDataFecther = () => {
    let formData = {
        "user": userInput.value,
        "password": passwordInput.value
    }

    return formData
}

const loginHandler = (event) => {
    // Impede o comportamento padrão do formulário
    event.preventDefault();

    // Instanciamos os dados do frontend
    let userData = formDataFecther()

    // Realizamos a requisição para o backend para verificar se
    // o usuário e a senha estão corretos

    // ...


    // Limpamos o input de senha
    passwordInput.value =  ""
}

loginForm.addEventListener('submit', loginHandler)