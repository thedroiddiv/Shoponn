const express = require('express')
const router = express.Router()

const { getCategoryById, getAllCategories, getCategory, createCategory, updateCategory, removeCategory } = require('../controllers/category.controller')
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth.controller')
const { getUserById } = require('../controllers/user.controller')

//  params
router.param("userId", getUserById)
router.param("categoryId", getCategoryById)

// create
router.post('/category/create/:userId', isSignedIn, isAuthenticated, isAdmin, createCategory)

// read
router.get('/category/:categoryId', getCategory)
router.get('/category/get/all', getAllCategories)

// update
router.put('/category/update/:categoryId/:userId', isSignedIn, isAuthenticated, isAdmin, updateCategory)

//delete
router.delete('/category/:categoryId/:userId', isSignedIn, isAuthenticated, isAdmin, removeCategory)

module.exports = router