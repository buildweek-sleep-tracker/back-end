const database = require("../db-config");

const { getUserByID } = require("../profile/profile-model");
const { getSleepDataByUserID } = require("../sleepdata/sleepdata-model");

module.exports = {
    getAllUsers,
    getAllSleepData,
    getUserByID,
    getSleepDataByUserID,
    getSleepDataByID

}

function getAllUsers() {

    return database("users")
        .select("id", "email", "first_name", "last_name");
}

function getAllSleepData() {

    return database("sleep_data")
        
}


function getSleepDataByID(sleep_entry_id) {

    return database("sleep_data")
        .where({id: sleep_entry_id})
        .first()
}
