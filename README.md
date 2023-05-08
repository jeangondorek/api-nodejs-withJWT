# GitHub Codespaces

Necessário criar um arquivo na pasta `Config` chamado `config.js` com as seguntes configurações.

- `bd_string` - String de conexão com o mongo
- `jwt_pass` - Token/senha do jwt
- `jwt_expires` - Tempo de expiração do token

EXEMPLO: 

```
const env = process.env.NODE_ENV || 'dev';

const config = () =>{
    switch (env){
        case 'dev':
        return{
            bd_string: "mongodb+srv://user:senha@cluster",
            jwt_pass: "123",
            jwt_expires: "7d"
        }
    }
}

console.log(`Iniciado api em ambiente ${env.toUpperCase()}`);

module.exports = config();
```

### Rodando o projeto

Projeto com 
- EXPRESS
- NODEMON
- NODEJS
- MONGOOSE
- MONGO
- BODYPARSER
- BCRYPT
- jsonwebtoken
- SWAGGER

Swagger implementado na rota `/docs`

Comando para instalar dependecias

```
npm i
```

comando para rodar projeto 

```
npm start
```
