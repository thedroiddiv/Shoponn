const Product = require("../models/product.schema")
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")


/************************ create ***********************/
function createProduct(req, res) {
    let form = new formidable.IncomingForm();
    form.keepExtension = true;
    form.parse(req, (err, fields, file) => {
        if (err) {
            console.log(err);
            return res.status(406).json({ error: "error" });
        }
        
        // destructure 
        const { name, description, price, category, stock } = fields
        if (!name || !description || !price || !category || !stock) {
            console.log("controllers/product/createProduct/Required fields missing");
            return res.status(406).json({
                error: "Required fields missing"
            })
        }
        let product = new Product(fields);
        // photo

        if (file.photo) {
            if (file.size > 3000000) {
                res.status(406).json({
                    error:
                        "Image size exceeded"
                });
            } else {
                product.photo.data = fs.readFileSync(file.photo.path)
                product.photo.contentType = file.photo.type
            }
        } else {
            return res.status(406)
                .json({
                    error: "No photo provided"
                })
        }
        product.save(function (err, product) {
            if (err) {
                console.log("controllers/product/createProduct/", err);
                return res.status(400).json({ error: err });
            }
            res.status(200).json({ product })
        })
    })
}
/************************ create ***********************/


/************************ read ***********************/
function getProductById(req, res, next, id) {
    Product.findById(id).exec((err, product) => {
        if (err || !product) return res.status(400).json({ error: err })
        req.product = product;
        next();
    })
}
function getProduct(req, res) {
    req.product.photo = undefined;
    return res.json(req.product)
}

function getAllProducts(req, res) {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8
    let sort = req.query.sort ? req.query.sort : "_id"
    Product.find()
        .select("-photo")
        .populate("category")
        .sort([[sort, "asc"]])
        .limit(limit)
        .exec(function (err, products) {
            if (err) return res.status(400).json({ error: err })
            return res.status(200).json(products)
        })

}

function photo(req, res, next) {
    if (req.product.photo.data) {
        res.set("Content-type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next();
}

function getAllProductCategories(req, res) {
    Product.distinct("category", {}, (err, category) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        return res.json(category);
    })
}
/************************ read ***********************/


/************************ update ***********************/
function updateProduct(req, res) {
    let form = new formidable.IncomingForm();
    form.keepExtension = true;
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({ error: "" });
        }
        // updation of the product
        let product = req.product;
        product = _.extend(product, fields)

        // photo
        if (file.photo) {
            if (file.size < 3000000) {
                console.log("Image size exceeded");
                res.status(400).json({
                    error:
                        "Image size exceeded"
                });
            } else {
                product.photo.data = fs.readFileSync(file.photo.path)
                product.photo.contentType = file.photo.type
            }
        }

        product.save(function (err, product) {
            if (err) {
                console.log(err);
                return res.status(400).json({ error: "Updation failed" });
            }
            res.status(200).json({ product })
        })
    })
}
function updateStock(req, res, next) {
    let myOperations = req.body.order.products.map(function (product) {
        return {
            updateOne: {
                filter: { _id: product._id },
                update: {
                    $inc: { stock: -product.count, sold: +product.count }
                }
            }
        }
    })
    Product.bulkWrite(myOperations, {}, (err, result) => {
        if (err || !product) {
            return res.status(400).json({ error: err });
        }
        next();
    })
}
/************************ update ***********************/


/************************ delete ***********************/
function removeProduct(req, res) {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({ error: err })
        }
        return res.json({
            success: "Deleted",
            product: deletedProduct
        })
    })
}
/************************ delete ***********************/


module.exports = { createProduct, getProductById, getProduct, updateProduct, removeProduct, getAllProducts, photo, getAllProductCategories, updateStock }