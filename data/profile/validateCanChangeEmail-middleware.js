const database = require("./profile-model");

module.exports = (req, res, next) => {

    if (!req.body.newEmail)
        { next(); }
    else
        {
            database.getUserBy({email: req.body.newEmail})
                .then(userWithExistingEmail => {

                    // verify that the email address isn't being used by someone else (if in use, should be current account).
                    // Check by comparing ID of account associated with email with the ID in the token
                    if (!userWithExistingEmail || userWithExistingEmail.id === req.decodedToken.id)
                        { next(); }

                    // email address is in use by another user
                    else
                        { res.status(400).json({message: "Email address already in use."}) }
                })
                .catch(error => {
                    res.status(500).json({message: "Server error in validating credentials.", error})
                })
        }
}