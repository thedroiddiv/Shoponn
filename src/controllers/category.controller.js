const Category = require("../models/category.schema")

/************************ create ***********************/
function createCategory(req, res) {
    const category = new Category(req.body);
    category.save((err, category) => {
        if (err || !category) {
            return res.status(400).json({ error: err })
        }
        return res.status(200).json({ category: category })
    })
}
/************************ create ***********************/


/************************ read ***********************/
function getCategoryById(req, res, next, id) {
    Category.findById(id).exec((err, category) => {
        if (err) return res.status(400).json({ error: err })
        req.category = category
        next()
    })
}
function getCategory(req, res) {
    return res.json(req.category)
}
function getAllCategories(req, res) {
    Category.find().exec((err, categories) => {
        if (err || !categories) {
            console.log(err);
            return res.status(400).json({ error: "No categories found" })
        }
        return res.json(categories)
    })
}
/************************ read ***********************/


/************************ update ***********************/
function updateCategory(req, res) {
    const category = req.category;
    category.name = req.body.name;
    category.save((err, updatedCategory) => {
        if (err || !updatedCategory) {
            return res.status(400).json({ error: "No categories found" })
        }
        return res.json(updatedCategory)
    })
}
/************************ update ***********************/


/************************ delete ***********************/
function removeCategory(req, res) {
    const category = req.category
    category.remove(
        (err, category) => {
            if (err) {
                return res.status(400).json({ err })
            }
            return res.status(200).json({
                message: `Successfully deleted ${category.name}`
            })
        }
    )
}
/************************ update ***********************/


module.exports = { getCategoryById, createCategory, getAllCategories, getCategory, updateCategory, removeCategory }