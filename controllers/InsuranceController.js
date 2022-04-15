const User = require("../models/User")
const InsurancesHel = require("../models/InsurancesHel")
const MyInsurances = require("../models/MyInsurances")
const LikesOfInsurances = require("../models/LikesOfInsurances")

module.exports = class InsuranceController {

    static async allHealthInsurance(req, res){
        const userId = req.session.userid
        //console.log(userId)

        const user =  await User.findOne({raw: true, where: {id: userId}})
        const localizationOfUser = user.localization
        const isCompany = user.isCompany


        const insurancesData = await InsurancesHel.findAll({
            include: User,
            where: {localization: localizationOfUser, isActive: true}
        })
        const insurancesAll = insurancesData.map(result => result.get({plain: true}))

        //the insurances with likes more of the 100
        const likesThePopulary = await InsurancesHel.findAll({include: User, where: {likes: 100}})
        const likesPopulary = likesThePopulary.map(result => result.get({plain: true}))

        let lessThenThree = true
        if(likesPopulary.length > 3){
            lessThenThree = false
        }

        res.render("insurance/all", {insurancesAll, isCompany, likesPopulary, lessThenThree})
    }

    static async createInsurance(req, res){

        const userid = req.session.userid

        const user = await User.findOne({
            raw: true,
            where: {id: userid}
        })
        const insurance = await InsurancesHel.findAll({raw: true, where: {UserId: userid}})
        //console.log(insurance)

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
        const { namePlam, price, comment, description, localization } = req.body

        const insurance = {
            name: namePlam,
            price,
            comment,
            description,
            localization,
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

    static async myInsurances(req, res){

        const userId = req.session.userid
        const company = req.session.company

        const user = await User.findOne({where: {id: userId}})
        if(user.isCompany == 1){
            req.session.save(() => {
                res.redirect("/insurance/healthInsurance")
            })
            return
        }
        const myInsurances = await MyInsurances.findAll({raw: true, where: {UserId: userId}})

        res.render("insurance/my", {myInsurances})
    }

    static async myInsurancesPost(req, res){
        const {id, name, price, description, userid} = req.body
        console.log(id, name, price, userid)
        const UserId = req.session.userid

        const myInsurance = {
            name,
            price,
            idCompany: userid,
            idInsurance: id,
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

    static async myInsurancesDelete(req, res){
        const id = req.body.id

        try {

            await MyInsurances.destroy({where: {id: id}})
            req.flash("message", "Plano Veterinario removido com sucesso!")
            req.session.save(() => {
                res.redirect("/insurance/my-insurance")
            })

        } catch (err) {
            console.log(err)
        }
    }

    static async updateInsurance(req, res){
        const id = req.params.id

        const insurances = await InsurancesHel.findOne({raw: true, where: {id: id}})
        let thereAreInsurances = true

        res.render("insurance/update", {insurances, thereAreInsurances})
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

    static async updateInsuranceRemove(req, res){
        const id = req.body.id
        
        try {

            await InsurancesHel.destroy({raw: true, where: {id: id}})
            req.flash("message", "Plano Veterinario deletado")
            req.session.save(() => {
                res.redirect("/insurance/create")
            })

        } catch(err) {console.log(err)}
    }

    static async InformationInsurance(req, res){
        const id = req.params.id
        const userId = req.session.userid
        const company = req.session.company
        
        const insurance = await InsurancesHel.findOne({ // O plano veterinarico
            include: User,
            where: {id: id},
            raw: true
        })

        const user = await User.findOne({raw: true, where: {id: userId}}) //Usuário que está conectado

        //console.log(insurance.UserId)
        const userCompany = await User.findOne({ //Usuário que criou o plano veterinarico 
            raw: true,
            where: {id: insurance.UserId}
        })

        let insuranceLikes = insurance.likes
        if(insuranceLikes >= 1){
            insuranceLikes = true
        } else {
            insuranceLikes = false
        }
        
        res.render("insurance/info", {insurance, userCompany, company, insuranceLikes, user})
    }

    static async liked(req, res){
        
        const id = req.body.id
        const userId = req.session.userid

        // db like
        const {insuranceName, userName} = req.body
        
        let likeData = await InsurancesHel.findOne({raw: true, where: {id: id}})

        const user = await User.findOne({raw: true, where: {id: userId}})

        const isLikedDB = await LikesOfInsurances.findOne({raw: true, where: {nameUser: userName, nameInsurance: insuranceName}})

        let like = likeData.likes + 1
        const insurance = {
            likes: like
        }

        const dbLike = {
            nameUser: userName,
            nameInsurance: insuranceName,
            InsurancesHelId: id
        }

        try {
            
            
            if(isLikedDB){
                req.flash("message", "Não é possivel da like novamente!")
                req.session.save(() => {
                    res.redirect(`/insurance/insurance-information/${id}`)
                })
                return
            } else {
                await LikesOfInsurances.create(dbLike)
            }

            await InsurancesHel.update(insurance, {where: {id: id}})

            req.session.save(() => {
                res.redirect(`/insurance/insurance-information/${id}`)
            })


        } catch (err) {console.log(err)}

    }
}

