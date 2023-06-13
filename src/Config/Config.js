const env = process.env.NODE_ENV || 'dev';

const config = () =>{
    switch (env){
        case 'dev':
        return{
            bd_string: 'mongodb://127.0.0.1:27017/databasedev',
            jwt_pass: '123',
            jwt_expires: '7d'
        }
        case 'prod':
        return{
            bd_string: 'mongodb://127.0.0.1:27017/databaseprod',
            jwt_pass: '123456',
            jwt_expires: '1d'
        }
    }
}

console.log(`Iniciado api em ambiente ${env.toUpperCase()}`);

module.exports = config();