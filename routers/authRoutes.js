const express = require('express')
const router = express.Router()


// Chamando os controllers
const AuthControllers = require("../controllers/AuthController")

router.get('/login', AuthControllers.login)
router.get('/register', AuthControllers.register)
router.get("/healthInsurance", AuthControllers.allHealthInsurance)
router.get('/', AuthControllers.home)

module.exports = router