<h1 align="center">FPF - Desafio técnico</h1>

## Descrição do Projeto
<p align="center">Sistema para gerenciar os cadastros de projetos, seu tempo de duração e realizar uma simulação do cálculo de retorno do investimento.</p>

## Tecnologias utilizadas
- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [React](https://pt-br.reactjs.org/)
- [Knex.js](http://knexjs.org/)
- [Bootstrap](https://getbootstrap.com/)

## Pré-requisitos e como rodar a aplicação
Antes de começar, você vai precisar ter intalado em sua máquina as seguintes ferramentas:

- Node.js
- PostgreSQL
- React

Após ter as instalações, crie um banco chamado "fpf_db" e depois siga os passo abaixo:

### Caso seja necessário altere as credenciais para o acesso ao banco de dados neste arquivo knexfile.js na pasta backend/

### Clone este repositório
$ git clone < >

### Acesse a pasta do projeto via terminal/cmd
$ cd fpf_desafio

# Frontend

### Vá para a pasta frontend/
$ cd frontend/

### Instale as dependências
$ npm i ou npm install

### Execute a aplicação
$ npm start

## A aplicação iniciará na porta:3000 - acesse <http://localhost:3000>

# Backend

### Vá para a pasta backend/

$ cd backend/

### Instale as dependências

$ npm i ou npm install

### Execute a migration (Para criar a tabela no banco de dados)

$ npm run migrate 

### Execute a api 

$ npm start

## A api iniciará na porta:3333 - acesse <http://localhost:3333>
