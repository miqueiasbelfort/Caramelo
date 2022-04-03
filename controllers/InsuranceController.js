const User = require("../models/User")
const InsurancesHel = require("../models/InsurancesHel")
const MyInsurances = require("../models/MyInsurances")

module.exports = class InsuranceController {

    static async allHealthInsurance(req, res){
        const userId = req.session.userid
        //console.log(userId)

        const insurancesData = await InsurancesHel.findAll({include: User})
        const insurances = insurancesData.map(result => result.get({plain: true})) 

        res.render("insurance/all", {insurances})
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

    static async myInsurancesPost(req, res){
        const {id, name, price, description, userid} = req.body
        console.log(id, name, price, userid)
        const UserId = req.session.userid

        const myInsurance = {
            name,
            price,
            idCompany: userid,
            description,
            UserId: UserId
        }

        try {

            await MyInsurances.create(myInsurance)

            req.flash("message", "Parabéns por comprar um plano para seu PET")
            req.session.save(() => {
                res.redirect("/insurance/my-insurance")
            })

        } catch(err){console.log(err)}

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

    static async InformationInsurance(req, res){
        const id = req.params.id
        
        const insurance = await InsurancesHel.findOne({
            include: User,
            where: {id: id},
            raw: true
        })

        //console.log(insurance.UserId)
        const user = await User.findOne({
            raw: true,
            where: {id: insurance.UserId}
        })
        
        res.render("insurance/info", {insurance, user})
    }
}

