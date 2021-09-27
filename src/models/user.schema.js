const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');
const { createHmac } =  require('crypto');

const userSchema = new mongoose.Schema(
    {

        firstName: {
            type: String,
            require: true,
            maxLenght: 32,
            trim: true
        },

        lastName: {
            type: String,
            require: false,
            maxLenght: 32,
            trim: true
        },

        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },

        userInfo: {
            type: String,
            required: false
        },

        encry_password: {
            type: String,
            trim: true
        },

        salt: String,

        role: {
            type: Number,
            default: 0
            // 0-user, 1-admin
        },

        purchases: {
            type: Array,
            default: []
        }
    }, { timestamps: true }
);

userSchema.virtual('password').get(function () {
    return this._password;
}).set(function (password) {
    this._password = password
    this.salt = uuidv4();
    this.encry_password = this.securePassword(password)
});

userSchema.methods = {

    authenticate: function (plainPassword) {
        return (
            this.securePassword(plainPassword)
            === this.encry_password
        )
    },

    securePassword: function (plainPassword) {
        if (!plainPassword) return ""
        try {
            return createHmac('sha256', this.salt)
                .update(plainPassword)
                .digest('hex')

        } catch (err) {
            console.log(`PROJ/USER:${err}`);
            return ""
        }
    }

}

module.exports = mongoose.model("User", userSchema)