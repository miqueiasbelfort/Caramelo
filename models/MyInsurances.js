const {DataTypes} = require("sequelize")

const db = require('../db/conn') //conexão com o banco de dados

const User = require("./User")

const MyInsurances = db.define("myInsurance", {
    name: {
        type: DataTypes.STRING,
        require: true
    },
    price: {
        type: DataTypes.DOUBLE,
        require: true
    },
    idCompany: {
        type: DataTypes.INTEGER,
        require: true,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        require: true
    }
})

MyInsurances.belongsTo(User)
User.hasMany(MyInsurances)

module.exports = MyInsurances