const User = require('../models/User')

// Chamando o Module para criptografar a senha
const bcrypt = require('bcryptjs')

module.exports = class AuthController {

    static home(req, res){
        res.render('home')
    }

    static login(req, res){
        res.render('auth/login')
    }

    static async loginPost(req, res){

        const {email, password} = req.body

        //Pegando usuario do banco
        const user = await User.findOne({raw: true, where: {email: email}})

        //chacando se o usuário existe
        if(!user){
            req.flash("message", "Usuário não encontrado!")
            res.render("auth/login")
            return
        }

        //checando a senha
        const passwordMacth = bcrypt.compareSync(password, user.password)
        if(!passwordMacth){
            req.flash("message", "Senha incorreta!")
            res.render("auth/login")
            return
        }

        //inicando a session
        req.session.userid = user.id

        let isCompany = false
        if(user.isCompany === 1){
            isCompany = true
        }
        req.session.company = isCompany 

        req.flash("message", "Usuário conectado!")
        req.session.save(() => res.redirect("/insurance/healthInsurance"))

    }

    static register(req, res){
        res.render('auth/register')
    }

    static async registerPost(req, res){
        const {name, email, city, password, reptiPasswod} = req.body
        let company = req.body.company
        const person = req.body.person

        //validando a senha
        if(password != reptiPasswod){
            // adiciona uma mensagem
            req.flash("message", "As senha não são iguais, Tente novamente!")
            res.render("auth/register")
            return
        } 

        //Checando se o email do usuriao já existe
        const checkUserExist = await User.findOne({raw: true, where: {email: email}})
        if(checkUserExist){
            req.flash("message", "Usuário já cadastrado!")
            res.render("auth/register")
            return
        }

        //Checando se é empresa
        if(company === "on"){
            company = true
        } else {
            company = false
        }

        //criando cryptografia
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)
        
        //Objeto com as respotas do body
        const user = {
            name,
            email,
            localization: city,
            password: hashedPassword,
            isCompany: company
        }

        try{

            const createUser = await User.create(user)

            //iniciar a session
            req.session.userid = createUser.id

            req.flash("message", "Cadastro realizado com sucesso!")

            req.session.save(() => {
                res.redirect("/healthInsurance")
            })

        }catch(err){console.log(err)}
        
    }

    static allHealthInsurance(req, res){
        res.render("auth/all")
    }

    static logout(req, res){
        req.session.destroy()
        res.redirect("/login")
    }
}