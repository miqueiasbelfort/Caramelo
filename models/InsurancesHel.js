const {DataTypes} = require("sequelize")

const db = require('../db/conn') //conexão com o banco de dados

//User
const User = require("./User")

const InsurancesHel = db.define('InsurancesHel', {
    name: {
        type: DataTypes.STRING,
        require: true
    },
    price: {
        type: DataTypes.DOUBLE,
        require: true
    },
    comment: {
        type: DataTypes.STRING,
        require: true
    },
    description: {
        type: DataTypes.STRING,
        require: true
    },
    localization: {
        type: DataTypes.STRING,
        require: true
    },
    likes: {
        type: DataTypes.INTEGER,
    },
    isActive: {
        type: DataTypes.BOOLEAN
    }
})

InsurancesHel.belongsTo(User)
User.hasMany(InsurancesHel)

module.exports = InsurancesHel