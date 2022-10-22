const loginForm = document.getElementById('login-form')

const userInput = document.getElementById('user-input')
const passwordInput = document.getElementById('password-input')
const warnP = document.getElementById('warn-p')

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
    let username = userInput.value
    let password = passwordInput.value

    // Realizamos a requisição para o backend para verificar se
    // o usuário e a senha estão corretos

    try {
        let response = await makePostRequest('/users/authenticate', 
        {
            username,
            password
        })

        if(response.status === 200) {
            // Aqui o usuário foi autenticado com sucesso

            // Instanciando o token
            let { accessToken } = await response.json();

            // Armazenando o token no localStorage
            localStorage.setItem("username", username)
            localStorage.setItem("token", accessToken)

            // Redirecionamos o usuário para a página do album
            window.location.replace(`${proxy}/album.html`)

        } else {
            failedLoginNotification()
        }

    } catch(e) {
        failedLoginNotification()
    }

    // Handle Login Failure
    // Limpamos o input de senha
    passwordInput.value =  ""

}

loginForm.addEventListener('submit', loginHandler)