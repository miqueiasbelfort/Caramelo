const User = require("../models/User")
const InsurancesHel = require("../models/InsurancesHel")

module.exports = class InsuranceController {

    static allHealthInsurance(req, res){
        res.render("insurance/all")
    }

    static async createInsurance(req, res){
        const userid = req.session.userid

        const user = await User.findOne({
            raw: true,
            where: {id: userid}
        })
        const insurance = await InsurancesHel.findAll({raw: true, where: {UserId: userid}})

        //console.log(user.name)
        let isCompany = user.isCompany

        if(isCompany === 1){
            isCompany = true
        } else {
            isCompany = false
        }


        res.render("insurance/create", {isCompany, user, insurance})
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
            req.session.save(() => {
                res.redirect("/insurance/create")
            })

        } catch(err) {console.log(err)}
    }

    static myInsurances(req, res){
        res.render("insurance/my")
    }

    static async updateInsurance(req, res){
        const id = req.params.id

        const insurances = await InsurancesHel.findOne({raw: true, where: {id: id}})

        res.render("insurance/update", {insurances})
    }

    static async updateInsurancePost(req, res){
        let {namePlam, price, comment, description, check, id} = req.body

        if(check === "on"){
            check = true
        } else {
            check = false
        }

        const insurance = {
            name: namePlam,
            price,
            comment,
            description,
            isActive: check
        }

        try {

            await InsurancesHel.update(insurance, {where: {id: id}})
            req.flash("message", "Plano Atualizado com sucesso!")
            req.session.save(() => {
                res.redirect("/insurance/create")
            })

        } catch(err) {console.log(err)}
    }

}

