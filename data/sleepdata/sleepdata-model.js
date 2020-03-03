const database = require("../db-config");

module.exports = {
    getUserByID,
    getSleepDataByUserID,

    updateUser,
    deleteUser


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