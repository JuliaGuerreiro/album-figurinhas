# Album de Figurinhas (Objetos de Messier)
Projeto em desenvolvimento para a disciplina Engenharia de Software - DCC/UFMG.

## Objetivo
Incentivar o aprendizado dos objetos de Messier e aumentar o interesse pela astronomia.

## Features
- Sistema de cadastro e login.
- Abrir pacotes de figurinhas.
- "Colar" figurinhas no álbum.

## Equipe
- Diego Pereira - Backend.
- Henrique - Banco de dados.
- Julia Guerreiro - Frontend.
- Mathias Oliveira - Fullstack.

## Tecnologias
- Banco de Dados: PostgreSQL. 
- Backend: Express.js (Node.js).
- Frontend:  HTML, CSS, JS com uso de Materialize ou Bootstrap.

## Histórias de Usuário

- Tarefas Técnicas
	- Instalar banco de dados (Postgress) [Diego, Henrique, Julia, Mathias]
	- Preparar ambiente de desenvolvimento (Backend -> Instalar Node.js) [Diego, Henrique, Julia, Mathias]
  
- História 1: Eu como usuário comum gostaria de me cadastrar/autenticar no sistema.
	- Modelar a representação de usuários no banco de dados [Henrique]
	- Construir rotas de autenticação [Diego]
	- Construir rotas de cadastro de usuário [Diego] 
	- Construir a interface com o banco de dados referente a dados do usuário [Henrique, Diego]
	- Construir a interface da página de login [Júlia]
	- Construir as requisições de login/cadastro para o Backend [Mathias]

- História 2: Eu como usuário comum gostaria de abrir pacotes de figurinhas
	- Modelar a representação de figurinhas no banco de dados [Henrique]
	- Modelar a representação de pertencimento de figurinhas e usuários no banco de dados [Henrique]
	- Escrever algorimto de geração de pacotes [Mathias]
	- Implementar o sistema de rotas de pacotes [Diego]
	- Construir a interface com o banco de dados referente a dados das figurinhas e do usuário [Diego, Henrique]
	- Verificação de consistência de requisitos (24 horas) [Diego, Mathias]
	- Implementar a interface de requisição de figurinhas [Julia, Mathias]
	- Implementar a interface de exibição do pacote obtido [Julia, Mathias]

- História 3: Eu como usuário comum gostaria de Visualizar o meu albúm de figurinhas
	- Implementar as rotas de obtenção das figurinhas do usuário [Henrique, Diego]
	- Construir a interface com o banco de dados referente a dados das figurinhas do usuário [Henrique, Diego]
	- Implementar a interface de exibição do albúm de figurinhas [Julia, Mathias]

- História 4: Eu como usuário comum gostaria de colar minhas figurinhas no albúm
	- Construir no banco de dados a estruturação de figurinhas coladas [Henrique]
	- Implementação de rotas de atualização das informações das figurinhas do usuário [Diego]
	- Implementação da interface de colagem de figurinhas [Julia, Mathias]

- História 5: Eu como usuário comum gostaria de trocar figurinhas (Opcional)
