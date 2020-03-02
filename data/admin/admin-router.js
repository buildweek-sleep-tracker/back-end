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
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json({message: "Could not find a user with id " + id + ".", error})
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

// GET: get sleep data from a user by user ID
router.get("/sleepdata/:id", (req, res) => {
    
    const id = req.params.id;

    database.getSleepDataByUserID(id)
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json({message: "Could not find a user with id " + id + ".", error})
        })    
})



module.exports = router;