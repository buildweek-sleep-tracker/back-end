const database = require("../db-config");

const queryHelpers = require("../utils/sqlQueryHelpers");

module.exports = {

    getSleepDataByUserID,
    getSleepEntry,
    addSleepEntry,
    editSleepEntry,
    deleteSleepEntry
}

function getSleepDataByUserID(id) {

    return database("sleep_data")
        .select("*")
        .select(database.raw(queryHelpers.rating_average
            // queryHelpers.rating_average + ", " +
            // queryHelpers.sleeptime_hours + ", " +            // removed due to Postgres issues
            // queryHelpers.sleeptime_extra_minutes + ", " +
            // queryHelpers.sleeptime_total_minutes
        ))
        .where({user_id: id})
}

function getSleepEntry(user_id, sleep_entry_id) {

    return database("sleep_data")
        .select("*")
        .select(database.raw(queryHelpers.rating_average
            // queryHelpers.rating_average + ", " +
            // queryHelpers.sleeptime_hours + ", " +            // removed due to Postgres issues
            // queryHelpers.sleeptime_extra_minutes + ", " +
            // queryHelpers.sleeptime_total_minutes
        ))
        .where({user_id, id: sleep_entry_id})
}

function addSleepEntry(entry) {

    return database("sleep_data")
        .insert(entry, "id")
}

function editSleepEntry(user_id, sleep_entry_id, entry) {

    return database("sleep_data")
        .where({user_id, id: sleep_entry_id})
        .update(entry)
}

function deleteSleepEntry(user_id, sleep_entry_id) {

    return database("sleep_data")
        .where({user_id, id: sleep_entry_id})
        .del()
}