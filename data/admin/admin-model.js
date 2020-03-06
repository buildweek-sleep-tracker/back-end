const database = require("../db-config");

const { getUserByID } = require("../profile/profile-model");
const { getSleepDataByUserID } = require("../sleepdata/sleepdata-model");

const queryHelpers = require("../utils/sqlQueryHelpers");

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
        .select("*")
        // .select(database.raw(queryHelpers.rating_average
            // queryHelpers.rating_average + ", " +
            // queryHelpers.sleeptime_hours + ", " +            // removed due to Postgres issues
            // queryHelpers.sleeptime_extra_minutes + ", " +
            // queryHelpers.sleeptime_total_minutes
        // ))
}


function getSleepDataByID(sleep_entry_id) {

    return database("sleep_data")
        .select("*")
        .select(database.raw(queryHelpers.rating_average
            // queryHelpers.rating_average + ", " +
            // queryHelpers.sleeptime_hours + ", " +            // removed due to Postgres issues
            // queryHelpers.sleeptime_extra_minutes + ", " +
            // queryHelpers.sleeptime_total_minutes
        ))
        .where({id: sleep_entry_id})
        .first()
}
