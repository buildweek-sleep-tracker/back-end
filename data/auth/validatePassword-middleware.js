const bcrypt = require("bcryptjs");
const database = require("./auth-model");

module.exports = (req, res, next) => {

    database.getUserBy({ email: req.body.email })
        
        .then(existingUser => {

            console.log('existing', existingUser)

            if ((existingUser.length === 1) && bcrypt.compareSync(req.body.password, existingUser[0].password))
                { next(); }
            else
                { res.status(401).json({message: "Invalid Credentials."})}

        })
        .catch(error => {
            res.status(500).json({message: "Server error in validating credentials.", error})
        })
}