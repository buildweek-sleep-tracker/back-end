const router = require("express").Router();

const database = require("./admin-model");
const sleepDataHelpers = require("../utils/sleepDataHelpers");

// GET: get all users
router.get("/users", (req, res) => {
    
    database.getAllUsers()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json({message: "Could not get users.", error})
        })    
})

// GET: get info from a user by user ID
router.get("/users/:id", (req, res) => {
    
    const id = req.params.id;

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

// GET: get sleep data from a user by user ID
router.get("/users/:id/sleepdata", (req, res) => {
    
    const id = req.params.id;

    database.getSleepDataByUserID(id)
        .then(sleepdata => {

             // if user found, return user's sleep data. Otherwise, return an error message.
             if (sleepdata)
                { res.status(200).json(sleepdata); }

            else
                { res.status(404).json({message: "Could not find a user with id " + id + "."}) }
        })
        .catch(error => {
            res.status(404).json({message: "Could not find a user with id " + id + "."})
        })    
})


// GET: get all sleepdata
router.get("/sleepdata", (req, res) => {
    
    database.getAllSleepData()
        .then(sleepdata => {
            res.status(200).json(sleepdata);
        })
        .catch(error => {
            res.status(500).json({message: "Could not get sleep data.", error})
        })    
})


// GET: generate sleepdata entry or entries with specified user ID number
router.get("/sleepdata/generate", (req, res) => {
    
    if (!req.query || (req.query && !req.query.user_id))
        { res.status(400).json({message: "Required user_id missing."}) }

    else if (req.query.entries && req.query.entries > 10000)
        { res.status(400).json({message: "Too many sleep entries requested."}) }

    else
        {
            let entriesToGenerate = req.query.entries || 1;
            let user_id = req.query.user_id;

            let sleepEntries = [];

            for (let daysBeforeCurrentDate = entriesToGenerate; daysBeforeCurrentDate > 0; daysBeforeCurrentDate--)
                {
                    sleepEntries.push(sleepDataHelpers.generateSleepEntry(user_id, daysBeforeCurrentDate, new Date()));
                }
            res.status(200).json(sleepEntries);
        }
})


// GET: sleepdata entry with specified ID number
router.get("/sleepdata/:id", (req, res) => {
    
    let id = req.params.id;

    database.getSleepDataByID(id)
        .then(sleepdata => {
            if (sleepdata)
                { res.status(200).json(sleepdata); }
            else
                { res.status(404).json({message: "Could not find a sleep entry with id " + id + "."}) }
        })
        .catch(error => {
            res.status(500).json({message: "Could not get sleep data.", error})
        })    
})


module.exports = router;