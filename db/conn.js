const { Sequelize } = require('sequelize')

//Conceção com o banco de dados mysql sequelize
const sequelize = new Sequelize('caramelo', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('Banco de dados conectado!')
} catch(err){
    console.log(`Erro ao conectar o banco de dados: ${err}`)
}

module.exports = sequelize