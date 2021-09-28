const express = require('express')
const router = express.Router()
const { getUserById, getUser, updateUser,userPurchaseList, getAllUser } = require('../controllers/user.controller')
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth.controller')

router.param("userId", getUserById)

//READ
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser)
router.get("/user/:userId/all",isSignedIn,isAuthenticated,isAdmin, getAllUser)

//UPDATE
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser)
router.put("/order/user/:userId", isSignedIn, isAuthenticated, userPurchaseList)

module.exports =  router 