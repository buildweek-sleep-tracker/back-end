const database = require("./auth-model");

module.exports = (req, res, next) => {

    database.getUserBy({ email: req.body.email })
        // do not allow a single email adress to be used to register more than one account
        .then(existingUser => {

            if (existingUser.length === 0)
                { next(); }
            else
                { res.status(400).json({message: "An account already exists with this email address."}) }
        })
        // email has not been seen before; continue processing.
        .catch(error => {
            res.status(500).json({message: "Server error in retrieving users."})
        })
}