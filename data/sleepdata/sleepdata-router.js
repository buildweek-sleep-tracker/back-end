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

// POST: adds a new sleep entry for the logged-in user
router.post("/sleepdata", (req, res) => {
    
    const user_id = req.decodedToken.id;
    const entry = req.body;

    database.addSleepEntry(entry)
        .then(sleepdata => {

            if (sleepdata)
                { res.status(200).json(sleepdata); }
            else
                { res.status(200).json([]); }
        })
        .catch(error => {
            res.status(500).json({message: "Could not add new sleep entry."})
        })    
})

// GET: get the sleep entry with the specified ID
router.get("/sleepdata/:id", (req, res) => {
    
    const user_id = req.decodedToken.id;
    const sleep_entry_id = req.params.id;

    database.getSleepEntry(user_id, sleep_entry_id)
        .then(sleepdata => {

            if (sleepdata)
                { res.status(200).json(sleepdata); }
            else
                { res.status(200).json([]); }
        })
        .catch(error => {
            res.status(404).json({message: "Could not get sleep entry with id " + sleep_entry_id + "."})
        })    
})

// PUT: edits an existing sleep entry for the logged-in user
router.put("/sleepdata/:id", (req, res) => {
    
    const user_id = req.decodedToken.id;
    const sleep_entry_id = req.params.id;
    const entry = req.body;

    database.editSleepEntry(user_id, entry, sleep_entry_id)
        .then(sleepdata => {

            if (sleepdata)
                { res.status(200).json(sleepdata); }
            else
                { res.status(200).json([]); }
        })
        .catch(error => {
            res.status(500).json({message: "Could not add new sleep entry."})
        })    
})

// DELETE: deletes the sleep entry with the specified ID
router.delete("/sleepdata/:id", (req, res) => {
    
    const user_id = req.decodedToken.id;
    const sleep_entry_id = req.params.id;

    database.deleteSleepEntry(user_id, sleep_entry_id)
        .then(sleepdata => {

            if (sleepdata)
                { res.status(200).json(sleepdata); }
            else
                { res.status(200).json([]); }
        })
        .catch(error => {
            res.status(500).json({message: "Could not delete sleep entry with ID " + sleep_entry_id + "."})
        })    
})

module.exports = router;