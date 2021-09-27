const { Order, ProductCart } = require('../models/order.schema')


/************************ create ***********************/
function createOrder(req, res) {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order)
    order.save((err, order) => {
        if (err) return res.status(400).json({ message: err })
        return res.status(200).json(order)
    })

}
/************************ create ***********************/



/************************ read ***********************/
function getOrderById(req, res, next, id) {
    Order.findById(id)
        .populate("products.product", "name price")
        .exec((err, order) => {
            if (err) return res.status(400).json({ message: err })
        })
    req.order = order;
    next();
}
function getAllOrders(req, res) {
    Order.find()
        .populate("user", "_id name")
        .exec((err, orders) => {
            if (err) return res.status(400).json({ message: err })
            return res.status(200).json(orders)
        })
}
function getStatus(req, res) {
    res.json(Order.schema.path("status").enumValues);
}
/************************ read ***********************/



/************************ update ***********************/
function updateStock(req, res, next) {
    next();
}

function updateStatus(req, res) {
    Order.update(
        {_id:req.body.orderId},
        {$set:{status:req.body.status}},
        ( err,order) => {
            if (err) return res.status(400).json({ message: err })
            return res.status(200).json(order)
        }
    
    )
}
/************************ update ***********************/



module.exports = { getOrderById, createOrder, getAllOrders, updateStock, getStatus, updateStatus }