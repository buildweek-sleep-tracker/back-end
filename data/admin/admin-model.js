const database = require("../db-config");

const { getUserByID, getSleepDataByUserID } = require("../sleepdata/sleepdata-model");;

module.exports = {
    getAllUsers,
    getAllSleepData,
    getUserByID,
    getSleepDataByUserID
}

function getAllUsers() {

    return database("users")
        .select("id", "email", "first_name", "last_name");
}

function getAllSleepData() {

    return database("sleep_data")
        
}
