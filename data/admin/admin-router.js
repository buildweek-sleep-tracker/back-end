const router = require("express").Router();

const database = require("./admin-model");

// GET: get all users
router.get("/allusers", (req, res) => {
    
    database.getAllUsers()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json({message: "Could not get users.", error})
        })    
})

// GET: get all sleepdata
router.get("/allsleepdata", (req, res) => {
    
    database.getAllSleepData()
        .then(sleepdata => {
            res.status(200).json(sleepdata);
        })
        .catch(error => {
            res.status(500).json({message: "Could not get sleep data.", error})
        })    
})


module.exports = router;