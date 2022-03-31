const User = require("../models/User")
const InsurancesHel = require("../models/InsurancesHel")

module.exports = class InsuranceController {

    static allHealthInsurance(req, res){
        res.render("insurance/all")
    }

    static async createInsurance(req, res){
        const userid = req.session.userid

        const user = await User.findOne({raw: true, where: {id: userid}})

        //console.log(user.name)
        let isCompany = user.isCompany

        if(isCompany === 1){
            isCompany = true
        } else {
            isCompany = false
        }

        res.render("insurance/create", {isCompany, user})
    }

    static async createInsurancePost(req, res){
        const { namePlam, price, comment, description } = req.body

        const insurance = {
            name: namePlam,
            price,
            comment,
            description,
            UserId: req.session.userid
        }

        try {

            await InsurancesHel.create(insurance)
            req.flash("message", "Seu plano PET foi criado!")
            res.render("insurance/create")

        } catch(err) {console.log(err)}
    }

    static myInsurances(req, res){
        res.render("insurance/my")
    }

}

