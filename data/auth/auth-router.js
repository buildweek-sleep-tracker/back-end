const bcrypt = require("bcryptjs");
const router = require("express").Router();

const database = require("./auth-model");

router.post("/register", (req, res) => {
    res.status(200).json({message: "Register endpoint reached."})
})

router.post("/login", (req, res) => {
    res.status(200).json({message: "Login endpoint reached."})
})

module.exports = router;