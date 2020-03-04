const database = require("../db-config");

module.exports = {

    getSleepDataByUserID,
    getSleepEntry,
    addSleepEntry,
    editSleepEntry,
    deleteSleepEntry
}

function getSleepDataByUserID(id) {

    return database("sleep_data")
        .where({user_id: id})
}

function getSleepEntry(user_id, sleep_entry_id) {

    return database("sleep_data")
        .where({user_id, id: sleep_entry_id})
}

function addSleepEntry(entry) {

    return database("sleep_data")
        .insert(entry)
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