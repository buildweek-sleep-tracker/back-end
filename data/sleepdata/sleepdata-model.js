const database = require("../db-config");

module.exports = {
    getUserBy,
    getUserByID,
    getSleepDataByUserID,

    updateUser,
    deleteUser,

    getSleepEntry,
    addSleepEntry,
    editSleepEntry,
    deleteSleepEntry
}


function getUserBy(query) {

    return database("users")
        .where(query)
        .select("id", "email", "first_name", "last_name", "password")
        .first()
}


function getUserByID(id) {

    return database("users")
        .where({id})
        .select("id", "email", "first_name", "last_name", "password")
        .first()
}

function updateUser(id, profile) {

    return database("users")
        .where({id})
        .update(profile)
}

function deleteUser(id) {

    return database("users")
        .where({id})
        .del()
}


function getSleepDataByUserID(id) {

    return database("sleep_data")
        .where({user_id: id})
}

function getSleepEntry(user_id, sleep_entry_id) {

    return database("sleep_data")
        .where({user_id, sleep_entry_id})
}

function addSleepEntry(entry) {

    return database("sleep_data")
        .insert(entry)
}

function editSleepEntry(id, user_id, sleep_entry_id) {

    return database("sleep_data")
        .where({id})
        .where({user_id, sleep_entry_id})
}

function deleteSleepEntry(user_id, sleep_entry_id) {

    return database("sleep_data")
        .where({user_id, sleep_entry_id})
        .del()
}