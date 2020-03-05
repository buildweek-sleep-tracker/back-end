const bcrypt = require("bcryptjs");
const router = require("express").Router();

const validateUserExists = require("./validateUserExists-middleware");
const validateRequestBody = require("./validateRequestBody-middleware");
const validatePassword = require("./validatePassword-middleware");
const generateToken = require("./generateToken");

const database = require("./auth-model");

// POST: create a user account
router.post("/register", validateRequestBody, validateUserExists, (req, res) => {
    
    let passwordHash = bcrypt.hashSync(req.body.password, 14);
    req.body.password = passwordHash;

    database.addUser(req.body)
        .then(addedUser => {
            
            const userID = addedUser[0];
            req.body.id = userID;

            const token = generateToken(req.body);

            res.status(201).json({message: "Created account for " + req.body.email, token});
        })
        .catch(error => {
            res.status(500).json({message: "Could not add user", error})
        })    
})

// POST: log in a user
router.post("/login", validateRequestBody, validatePassword, (req, res) => {
    
    const token = generateToken(req.body);

    res.status(200).json({message: "Logged in " + req.body.email + ".", token});
})

module.exports = router;