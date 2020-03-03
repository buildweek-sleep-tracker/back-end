const database = require("../db-config");

module.exports = {
    getUserByID,
    getSleepDataByUserID

}

function getUserByID(id) {

    return database("users")
        .where({id})
        .select("id", "email", "first_name", "last_name")
        .first()
}

function getSleepDataByUserID(id) {

    return database("sleep_data")
        .where({user_id: id})
        .first()
        
}