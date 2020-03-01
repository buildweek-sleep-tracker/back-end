const bcrypt = require("bcryptjs");
const database = require("./auth-model");

module.exports = (req, res, next) => {

    database.getUserBy({ email: req.body.email })
        
        .then(existingUser => {

            if (existingUser && bcrypt.compareSync(req.body.password, existingUser.password))
                { next(); }
            else
                { res.status(401).json({message: "Invalid Credentials."})}

        })
        .catch(error => {
            res.status(500).json({message: "Server error in validating credentials.", error})
        })
}