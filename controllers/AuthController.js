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

    static register(req, res){
        res.render('auth/register')
    }

    static allHealthInsurance(req, res){
        res.render("auth/all")
    }
}