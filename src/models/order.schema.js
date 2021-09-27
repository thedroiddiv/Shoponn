const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema

const ProductCartSchema = new mongoose.Schema(
    {
        product: {
            type: ObjectId,
            ref: "Product"
        },
        name: String,
        count: Number,
        price: Number
    }
)

const OrderSchema = new mongoose.Schema(
    {
        products: [ProductCartSchema],
        transaction_id: { type: String },
        amount: { type: Number },
        address: String,
        status:{
            type:String,
            default:"Received",
            enum : ["Cancelled","Delivered","Shipped","Processing","Received"]
        },
        updated: Date,
        user: { type: ObjectId, ref:"User" }
    },
    { timeStamp: true }
)

const Order = mongoose.model("Order", OrderSchema)
const ProductCart = mongoose.model("ProductCart", ProductCartSchema)

module.exports = { Order, ProductCart }