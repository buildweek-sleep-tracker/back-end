const bcrypt = require("bcryptjs");
const router = require("express").Router();

const validateUserExists = require("./validateUserExists-middleware");
const validateRequestBody = require("./validateRequestBody-middleware");

const database = require("./auth-model");

router.post("/register", validateRequestBody, validateUserExists, (req, res) => {
    res.status(200).json({message: "Register endpoint reached."})
})

router.post("/login", validateRequestBody, (req, res) => {
    res.status(200).json({message: "Login endpoint reached."})
})

module.exports = router;