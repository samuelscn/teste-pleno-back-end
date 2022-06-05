Esse projeto foi criado por Samuel Silva Costa Nascimento

## Teste Pleno utilizando Arquitetura Limpa

## ✦ Projeto
<br>
<div style="text-align: justify">
A automação foi implementada como meio de testar a evolução na produção de API e Automações em NodeJS, utilizando TypeScript como linguagem principal e aplicando SOLID, Clean Architecture, TDD First e Design Patterns.
</div>

## ✦ Tecnologias
<br>
<div style="text-align: justify">
Esse projeto foi desenvolvido com as seguintes tecnologias:

**Linguagem:**
- [TypeScript]

**Software:**
- [MongoDB](https://www.mongodb.com/)
- [Jest](https://pt-br.reactjs.org/)
- [Node](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)

**Software Design:**
- [CleanArchitecture]
- [TDDFirst]
- [SOLID]
</div>

## ✦ Objetivo

Desenvolver uma automação agendada em NodeJs para realizar o consumo de dados dos usuários
em uma API, converter a estrutura de cada usuário e envia-lo para um banco de dados MongoDB na
collection “users“.

## ✦ Observações importantes

Antes de executar o script de start algumas observações devem ser feitas:
1. O Mongo utilizado como padrão, está utilizando o serviço do MongoDB Atlas.
2. Caso queira criar o banco a partir do docker será necessário rodar o comando a seguir:
    ```bash
    docker-compose up
    ```
3. Após rodar o docker-compose será necessário abrir o arquivo .env e descomentar a única linha lá disponível


## ✦ Instalação

Use o npm para instalar as dependências do projeto

```bash
npm install
```

Use o script a seguir para iniciar a execução do projeto

```bash
npm start
```

Abra o mongo utilizando algum software como Mongo Atlas para acompanhar a inserção dos dados.

## Copyrigth
Samuel Silva Costa Nascimento
