const bcrypt = require("bcryptjs");

const router = require("express").Router();

const database = require("./sleepdata-model");

// GET: get info from a user by user ID (stored in token)
router.get("/profile", (req, res) => {
    
    const id = req.decodedToken.id;

    database.getUserByID(id)
        .then(users => {

            // if user found, return user data. Otherwise, return an error message.
            if (users)
                { res.status(200).json(users); }
            else
                { res.status(404).json({message: "Could not find a user with id " + id + "."}) }
        })
        .catch(error => {
            { res.status(404).json({message: "Could not find a user with id " + id + "."}) }
        })    
})

// PUT: update user profile (email and/password)
router.put("/profile", (req, res) => {
    
    if (!req.body || !req.body.currentPassword)
        { res.status(400).json({message: "You must enter your old password to make any changes to your profile."}) }
    else
        {                  
            const id = req.decodedToken.id;

            let dataToInsert = {};

            const newEmail = req.body.newEmail;
            const currentPassword = req.body.currentPassword;
            const newPassword = req.body.newPassword;
            const newFirstName = req.body.newFirstName;
            const newLastName = req.body.newLastName;

            // verify that the current password is correct before making any changes.
            database.getUserByID(id)
                .then(existingUser => {
                    
                    // password is incorrect; stop updating
                    if (!bcrypt.compareSync(currentPassword, existingUser.password))
                        { res.status(403).json({message: "Password incorrect. Could not update profile."}); }
                    else
                        {
                            let errorText = "";

                            // user is trying to update email address: make sure email address isn't being used by someone else
                            if (newEmail)
                            {
                                database.getUserBy({email: req.body.email})
                                    .then(userWithExistingEmail => {
                                
                                        // check if new email is already taken (compare ID of account associated with email with the ID in the token)
                                        if ((userWithExistingEmail.length > 0) && (userWithExistingEmail.id !== req.decodedToken.id))
                                            {
                                                errorText = "However, the requested email address is already in use, so it was not updated."

                                                res.status(401).json({message: "The requested email address is already in use."});

                                                res.end();
                                            }
                                        else
                                            { dataToInsert.email = newEmail; }
                                    })
                                    .catch(error => {
                                        res.status(500).json({message: "Server error in validating credentials.", error})
                                    })
                            }

                            // user is trying to update password:
                            if (newPassword)
                                { dataToInsert.password = bcrypt.hashSync(newPassword, 14); }   

                            if (newFirstName)
                                { dataToInsert.first_name = newFirstName; }
                            
                            if (newLastName)
                                { dataToInsert.last_name = newLastName; }
                            
                            if (Object.entries(dataToInsert).length > 0)
                            {
                                database.updateUser(id, dataToInsert)
                                    .then(users => {
                                        res.status(200).json({message: "Profile updated."})
                                    })
                                    .catch(error => {
                                        res.status(500).json({message: "Server error in updating profile.", error})
                                    })
                            }
                            else
                            {
                                res.status(200).json({message: "No changes were made to your profile."})
                            }

                        }
                })
                .catch(({stack, call, message, name}) => {

                    res.status(500).json({message: "Server error in validating credentials.", stack, call, message, name})
                })

        }
})

// PUT: update user profile
router.delete("/profile", (req, res) => {
    
    const id = req.decodedToken.id;

    database.deleteUser(id)
        .then(users => {
            res.status(200).json({message: "Account successfully deleted."})
        })
        .catch(error => {
            res.status(500).json({message: "Could not delete account."})
        })
})

// GET: get all sleep data from a user by user ID (stored in token)
router.get("/sleepdata", (req, res) => {
    
    const id = req.decodedToken.id;

    database.getSleepDataByUserID(id)
        .then(sleepdata => {

            if (sleepdata)
                { res.status(200).json(sleepdata); }
            else
                { res.status(200).json([]); }
        })
        .catch(error => {
            res.status(404).json({message: "Could not get sleep data for user ID " + id + "."})
        })    
})


module.exports = router;