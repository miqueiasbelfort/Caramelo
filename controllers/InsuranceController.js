const User = require("../models/User")

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

}

