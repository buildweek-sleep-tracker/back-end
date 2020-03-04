const database = require("../profile/profile-model");

module.exports = (req, res, next) => {

    if (!req.body)
        { res.status(400).json({message: "Missing required sleep entry data."}) }
    else if (!req.body.log_date)        
        { res.status(400).json({message: "Missing required log_date property."}) }
    else
        { next(); }

}