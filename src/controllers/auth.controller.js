require('dotenv').config()
const User = require('../models/user.schema')
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

/********************************** CREATE *********************************/

const signup = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({
            message:"validation failed"
        })
    }
    const user = new User(req.body)
    return user.save((error, user) => {
        if (error) {
            console.log(error);
            return res.status(400).json({message:"User not created"})
        }
        return res.json({
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            id: user._id,
        })
    })
}
/***************************** CREATE ********************************/


/******************************* READ **********************************/
const signin = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()
        })
    }
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "Email does not exist"
            })
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Incorrect password"
            })
        }

        // a random string as seed for token generation
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY)
        res.cookie("token", token, {
            expire: new Date() + 9999
        })
        // send response to front-end
        const { _id, firstName, lastName, email, role } = user;

        return res.json({
            token,
            user: { _id, firstName, lastName, email, role }
        })

    })
}
/********************************** READ ****************************/



/******************************** UPDATE *********************************/
const signout = (req, res) => {
    req.clearCookie("token")
    res.json({
        user: "signed out successfully"
    })
}
/********************************** UPDATE ********************************/



/********************************** MIDDLEWARES ******************************/
const isSignedIn = expressJwt(
    {
        secret: process.env.SECRET_KEY,
        userProperty: "auth",
        algorithms: ['HS256']
    }
);

const isAuthenticated = (req, res, next) => {
    let checker = (req.profile && req.auth._id == req.profile._id)
    if (!checker) {
        return res.status(403).json({
            error: 'Authentication failed'
        })
    }
    next();
}

const isAdmin = (req, res, next) => {
    if (req.profile.role == 0) {
        return res.status(403).json({
            error: "Not Admin"
        })
    }
    next();
}
/****************************** MIDDLEWARES **********************************/


module.exports = { signup, signin, signout, isSignedIn, isAuthenticated, isAdmin }