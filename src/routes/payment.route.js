const express = require('express')
const router = express.Router()
const { isSignedIn, isAuthenticated } = require('../controllers/auth.controller')
const { getToken, processPayment } = require('../controllers/payment.controller')
const { getUserById } = require('../controllers/user.controller')

//params
router.param("userId", getUserById)

//create
router.post("/payment/bt/:userId", isSignedIn, isAuthenticated, processPayment)

//read
router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, getToken)

module.exports = router