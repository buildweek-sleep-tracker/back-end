const database = require("../db-config");

module.exports = {
    getAllUsers,
    getUserByID,
    getAllSleepData,
    getSleepDataByUserID

}

function getAllUsers() {

    return database("users")
        .select("id", "email", "first_name", "last_name");
}

function getUserByID(id) {

    return database("users")
        .where({id})
        .select("id", "email", "first_name", "last_name")
        .first()
}

function getAllSleepData() {

    return database("sleep_data")
        
}

function getSleepDataByUserID(id) {

    return database("sleep_data")
        .where({user_id: id})
        .first()
        
}