const express = require('express')
const router = express.Router()

const InsuranceController = require("../controllers/InsuranceController")

const checkAuth = require("../helpers/auth").checkAuth

router.get("/healthInsurance", checkAuth, InsuranceController.allHealthInsurance)
router.get("/create", checkAuth, InsuranceController.createInsurance)
router.post("/create", checkAuth, InsuranceController.createInsurancePost)
router.get("/my-insurance", checkAuth, InsuranceController.myInsurances)


module.exports = router