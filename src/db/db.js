const knex = require('knex')
const configMariaDB ={
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'Desafio8'
    },
    pool: { min: 0, max: 7 }
} 

const configSQLite3 = {
    client: 'sqlite',
    connection: {
        filename: 'ecommerce.sqlite'
    },
    useNullAsDefault : true
}

const connectionMariaDB = knex(configMariaDB)
const connectionSQLite = knex(configSQLite3)
module.exports = {
    MariaDB: connectionMariaDB,
    SQLite: connectionSQLite
}