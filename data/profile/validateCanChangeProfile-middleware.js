const bcrypt = require("bcryptjs");

const database = require("./profile-model");

module.exports = (req, res, next) => {
    
    if (!req.body || !req.body.currentPassword)
        { res.status(400).json({message: "You must enter your old password to make any changes to your profile."}) }
    else
        {
            // verify that the current password is correct before making any changes.
            database.getUserByID(req.decodedToken.id)
                .then(existingUser => {
                    
                    // password is incorrect; stop updating
                    if (!bcrypt.compareSync(req.body.currentPassword, existingUser.password))
                        { res.status(401).json({message: "Password incorrect. Could not update profile."}); }

                    else
                        {
                            next();
                        }
                })
                .catch(({stack, call, message, name}) => {

                    res.status(500).json({message: "Server error in validating credentials.", stack, call, message, name})
                })
        }
}