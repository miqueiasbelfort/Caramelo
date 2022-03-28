const express = require('express')
const router = express.Router()


// Chamando os controllers
const AuthControllers = require("../controllers/AuthController")

router.get('/register', AuthControllers.register)
router.get('/', AuthControllers.home)
router.get('/login', AuthControllers.login)

module.exports = router