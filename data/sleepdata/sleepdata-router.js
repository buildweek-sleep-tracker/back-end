const router = require("express").Router();

const database = require("./sleepdata-model");

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
router.get("/sleepdata/:id", (req, res) => {
    
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


module.exports = router;