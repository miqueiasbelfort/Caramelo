const express = require('express')
const router = express.Router()

const InsuranceController = require("../controllers/InsuranceController")

const checkAuth = require("../helpers/auth").checkAuth

router.get("/healthInsurance", checkAuth, InsuranceController.allHealthInsurance)
router.get("/create", checkAuth, InsuranceController.createInsurance)
router.post("/create", checkAuth, InsuranceController.createInsurancePost)
router.get("/update-insurances/:id", checkAuth, InsuranceController.updateInsurance)
router.post("/update-insurances", checkAuth, InsuranceController.updateInsurancePost)
router.get("/my-insurance", checkAuth, InsuranceController.myInsurances)
router.post("/my-insurance", checkAuth, InsuranceController.myInsurancesPost)
router.get("/insurance-information/:id", checkAuth, InsuranceController.InformationInsurance)


module.exports = router