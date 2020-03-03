const bcrypt = require("bcryptjs");

const router = require("express").Router();

const database = require("./sleepdata-model");

const validateCanChangeProfile = require("./validateCanChangeProfile-middleware");
const validateCanChangeEmail = require("./validateCanChangeEmail-middleware");

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
router.put("/profile", validateCanChangeProfile, validateCanChangeEmail, (req, res) => {

    let dataToInsert = {};

    if (req.body.newEmail)
        { dataToInsert.email = req.body.newEmail; }

    if (req.body.newPassword)
        { dataToInsert.password = bcrypt.hashSync(req.body.newPassword, 14); }   

    if (req.body.newFirstName)
        { dataToInsert.first_name = req.body.newFirstName; }
    
    if (req.body.newLastName)
        { dataToInsert.last_name = req.body.newLastName; }

    if (Object.entries(dataToInsert).length > 0)
        {
            database.updateUser(req.decodedToken.id, dataToInsert)
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