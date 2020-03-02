const database = require("../db-config");

module.exports = {
    getAllUsers,
    getAllSleepData
}

function getAllUsers() {

    return database("users")
        .select("id", "email", "first_name", "last_name");
}

function getAllSleepData() {

    return database("sleep_data")
        
}