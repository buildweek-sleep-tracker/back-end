const router = require("express").Router();

const database = require("./sleepdata-model");

const validateSleepEntry = require("./validateSleepEntry-middleware");

// GET: get all sleep entries for the logged-in user
router.get("/", (req, res) => {
    
    const id = req.decodedToken.id;

    database.getSleepDataByUserID(id)
        .then(sleepdata => {

            if (sleepdata)
                { res.status(200).json(sleepdata); }
            else
                { res.status(200).json([]); }
        })
        .catch(error => {
            res.status(404).json({message: "Could not get sleep data."})
        })    
})

// POST: adds a new sleep entry for the logged-in user
router.post("/", validateSleepEntry, (req, res) => {
    
    // add current user id to request body
    req.body.user_id = req.decodedToken.id;
    const entry = req.body;

    database.addSleepEntry(entry)
        .then(sleepdata => {

            if (sleepdata)
                { res.status(201).json(sleepdata); }
            else
                { res.status(200).json([]); }
        })
        .catch(error => {
            res.status(500).json({message: "Could not add new sleep entry."})
        })    
})

// GET: get the sleep entry with the specified ID
router.get("/:id", (req, res) => {
    
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
router.put("/:id", validateSleepEntry, (req, res) => {
    
    const user_id = req.decodedToken.id;
    const sleep_entry_id = req.params.id;
    const entry = req.body;

    database.editSleepEntry(user_id, sleep_entry_id, entry)
        .then(sleepdata => {

            if (sleepdata)
                { res.status(200).json({message: "Sleep entry #" + sleep_entry_id + " updated."}); }
            else
                { res.status(403).json({message: "Sleep entry #" + sleep_entry_id + " is not an entry you can edit."}); }
        })
        .catch(error => {
            res.status(500).json({message: "Could not edit sleep entry."})
        })    
})

// DELETE: deletes the sleep entry with the specified ID
router.delete("/:id", (req, res) => {
    
    const user_id = req.decodedToken.id;
    const sleep_entry_id = req.params.id;

    database.deleteSleepEntry(user_id, sleep_entry_id)
        .then(sleepdata => {

            if (sleepdata)
                { res.status(200).json({message: "Sleep entry #" + sleep_entry_id + " deleted."}); }
            else
            { res.status(403).json({message: "Sleep entry #" + sleep_entry_id + " is not an entry you can delete."}); }
        })
        .catch(error => {
            res.status(500).json({message: "Could not delete sleep entry with ID " + sleep_entry_id + "."})
        })    
})

module.exports = router;