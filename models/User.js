const { DataTypes } = require('sequelize')

const db = require('../db/conn') //conexão com o banco de dados

// Criar a tabela do banco
const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        require: true
    },
    email: {
        type: DataTypes.STRING,
        require: true
    },
    password: {
        type: DataTypes.STRING,
        require: true
    },
    localization: {
        type: DataTypes.STRING,
        require: true
    },
    isCompany: {
        type: DataTypes.BOOLEAN,
        require: true,
    }
})

module.exports = User