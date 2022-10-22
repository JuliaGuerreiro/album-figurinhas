// Função que verifica se o usuário está logado
// Realizando uma requisição para o backend
const isLogged = async () => {
    // Obtendo os dados da seção
    let username = localStorage.getItem('username');
    let token = localStorage.getItem('token');

    // Se não tiver registros, o usuário não está autenticado
    if(!username || !token)
        window.location.replace(`${proxy}/index.html`)
        
    try {
        let response = await makePostRequest('/users/checktoken', 
        {
            username,
            token
        })
        
    // Se o token for inválido, redirecionamos 
    // o usuário para a página de login
        if(response.status === 400)
            window.location.replace(`${proxy}/index.html`)
            
    } catch(e) {
            window.location.replace(`${proxy}/index.html`)
    }
}

// Chamamos a função para verificar se o usuário está autenticado
isLogged()