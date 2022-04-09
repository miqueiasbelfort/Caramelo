const {DataTypes} = require("sequelize")

const db = require("../db/conn")

const InsurancesHel = require("./InsurancesHel")

const LikesOfInsurances = db.define("LikesOfInsurances", {
    nameUser: {
        type: DataTypes.STRING,
        require: true
    },
    nameInsurance: {
        type: DataTypes.STRING,
        require: true
    },
    isLiked: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    }
})

LikesOfInsurances.belongsTo(InsurancesHel)
InsurancesHel.hasMany(LikesOfInsurances)

module.exports = LikesOfInsurances