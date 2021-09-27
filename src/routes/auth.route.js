const express = require("express");
const router = express.Router()
const { check } = require('express-validator');
const { signup, signin, isSignedIn } = require("../controllers/auth.controller")

// use validation after the route, befor the controller
router.post(
    "/signup",
    check("email").isEmail().withMessage("Invalid email"),
    check("password").isLength({ min: 5 }).withMessage("Password should be atleast 5 chars"),
    signup
)

router.post(
    "/signin",
    check("email").isEmail().withMessage("Invalid email"),
    check("password").isLength({ min: 5 }).withMessage("Password should be atleast 5 chars"),
    signin
)


router.get("/testroute", isSignedIn, (req, res) => {
    res.json({
        status:"OK"
    })
})


module.exports = router;