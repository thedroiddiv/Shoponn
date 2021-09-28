const User = require('../models/user.schema')
const Order = require('../models/order.schema')

/*********************************** READ ***************************************/
function getUserById(req, res, next, id) {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found"
            })
        }
        req.profile = user
        next();
    })
}

function getUser(req, res) {
    req.profile.salt = undefined
    req.profile.encry_password = undefined
    req.profile.createdAt = undefined
    req.profile.updatedAt = undefined
    return res.json(req.profile);
}

function getAllUser(req, res) {
    User.find().exec((err, users) => {
        const resUser = users.map(user => {
            user.encry_password = undefined;
            user.salt = undefined;
            return user
        })
        if (err || !users) {
            return res.status(400).json({ error: "No user" })
        }
        return res.json(resUser)
    })
}

function userPurchaseList(req, res) {
    Order.find({ user: req.profile._id })
        .populate("user", "_id email")
        .exec((err, order) => {
            if (err) {
                return res.status(400).json({ err })
            }
            return res.json(order)
        })
}
/*********************************** READ ***************************************/


/*********************************** UPDATE ***************************************/
function updateUser(req, res) {
    User.findByIdAndUpdate(
        req.profile._id, //id
        { $set: req.body },   // query
        { new: true, useFindAndModify: false },  // options
        (err, user) => {    // callback
            if (err || !user) {
                return res.status(400).json({ error: err })
            }
            user.salt = undefined
            user.encry_password = undefined
            user.createdAt = undefined
            user.updatedAt = undefined
            return res.json(user)
        }
    )
}

function pushOrdersInPurchaseList(req, res, next) {

    let purchases = []
    req.body.order.products.forEach(
        product => {
            purchases.push(
                {
                    _id: product._id,
                    name: product.name,
                    description: product.description,
                    category: product.category,
                    quantity: product.quantity,
                    amount: req.body.order.amount,
                    transaction_id: req.body.order.transaction_id
                }
            )
        }
    )

    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: { purchases: purchases } },
        { new: true },
        (err, purchases) => {
            if (err || !purchases) {
                return res.status(400).json({ err })
            }
            next();

        }
    )
}
/*********************************** UPDATE ***************************************/


module.exports = { getUserById, getUser, getAllUser, updateUser, userPurchaseList, pushOrdersInPurchaseList }