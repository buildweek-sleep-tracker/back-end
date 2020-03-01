const database = require("./auth-model");

module.exports = (req, res, next) => {

    // stop processing if missing a request body, email, or password
    if (!req.body || !req.body.email || !req.body.password)
        { res.status(400).json({message: "Email and password are both required."}) }
    
    // continue processing
    else
        { next(); }
}