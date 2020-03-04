const router = require("express").Router();

const database = require("./admin-model");

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