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

// PUT: update user profile
router.put("/profile", (req, res) => {
    
    const id = req.decodedToken.id;

    database.updateUser(id)
        // .then(users => {

        //     // if user found, return user data. Otherwise, return an error message.
        //     if (users)
        //         { res.status(200).json(users); }
        //     else
        //         { res.status(404).json({message: "Could not find a user with id " + id + "."}) }
        // })
        // .catch(error => {
        //     { res.status(404).json({message: "Could not find a user with id " + id + "."}) }
        // })    
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