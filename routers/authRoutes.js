const express = require('express')
const router = express.Router()


// Chamando os controllers
const AuthControllers = require("../controllers/AuthController")

router.get('/login', AuthControllers.login)
router.post('/login', AuthControllers.loginPost)
router.get('/register', AuthControllers.register)
router.post("/register", AuthControllers.registerPost)
router.get("/healthInsurance", AuthControllers.allHealthInsurance)
router.get('/', AuthControllers.home)

module.exports = router