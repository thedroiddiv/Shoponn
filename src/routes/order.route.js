const express = require('express')
const router = express.Router()

const { isSignedIn, isAuthenticated , isAdmin} = require('../controllers/auth.controller')
const { getUserById, pushOrdersInPurchaseList } = require('../controllers/user.controller')
const { createOrder, getOrderById,getAllOrders,getStatus,updateStatus } = require('../controllers/order.controller')
const { updateStock } = require('../controllers/order.controller')

// params
router.param("userId", getUserById)
router.param("orderId", getOrderById)

//create
router.post('/orders/create/:userId',isSignedIn, isAuthenticated,pushOrdersInPurchaseList, updateStock,createOrder)

//read
router.get('/orders/all/:userId',isSignedIn,isAuthenticated,isAdmin,getAllOrders)
router.get('/orders/status/:userId',isSignedIn,isAuthenticated,isAdmin,getStatus)

//update
router.put('/orders/:orderId/status/:userId',isSignedIn,isAuthenticated,updateStatus)

module.exports = router