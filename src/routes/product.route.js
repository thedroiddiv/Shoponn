const express = require('express')
const router = express.Router()

const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth.controller')
const { getUserById } = require('../controllers/user.controller')
const { getProductById, createProduct, getProduct, updateProduct, getAllProducts, removeProduct, photo, getAllProductCategories } = require('../controllers/product.controller')


router.param("productId", getProductById)
router.param("userId", getUserById)

// create
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct)

// read
router.get("/product/:productId", getProduct)
router.get("/product/photo/:productId", photo)
router.get("/product/get/all", getAllProducts)
router.get("/product/categories",getAllProductCategories)

// update
router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct)

// delete
router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, removeProduct)

module.exports = router;